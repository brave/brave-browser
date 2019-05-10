pipeline {
    agent none
    options {
        disableConcurrentBuilds()
        timeout(time: 12, unit: "HOURS")
        timestamps()
    }
    parameters {
        string(name: "BRANCH", defaultValue: "master", description: "")
        choice(name: "CHANNEL", choices: ["nightly", "dev", "beta", "release"], description: "")
        booleanParam(name: "WIPE_WORKSPACE", defaultValue: false, description: "")
        booleanParam(name: "RUN_INIT", defaultValue: false, description: "")
        booleanParam(name: "DISABLE_SCCACHE", defaultValue: false, description: "")
        // TODO: add SKIP_SIGNING
        booleanParam(name: "DEBUG", defaultValue: false, description: "")
    }
    environment {
        REFERRAL_API_KEY = credentials("REFERRAL_API_KEY")
        BRAVE_GOOGLE_API_KEY = credentials("npm_config_brave_google_api_key")
        BRAVE_ARTIFACTS_BUCKET = credentials("brave-jenkins-artifacts-s3-bucket")
        BRAVE_S3_BUCKET = credentials("brave-binaries-s3-bucket")
    }
    stages {
        stage("env") {
            steps {
                script {
                    BRANCH = params.BRANCH
                    CHANNEL = params.CHANNEL
                    CHANNEL_CAPITALIZED = CHANNEL.capitalize()
                    WIPE_WORKSPACE = params.WIPE_WORKSPACE
                    RUN_INIT = params.RUN_INIT
                    DISABLE_SCCACHE = params.DISABLE_SCCACHE
                    DEBUG = params.DEBUG
                    BUILD_TYPE = "Release"
                    OUT_DIR = "src/out/" + BUILD_TYPE
                    LINT_BRANCH = "TEMP_LINT_BRANCH_" + BUILD_NUMBER
                    RELEASE_TYPE = (env.JOB_NAME.equals("brave-browser-build") ? "release" : "ci")
                    BRANCH_TO_BUILD = (env.CHANGE_BRANCH.equals(null) ? BRANCH : env.CHANGE_BRANCH)
                    BRAVE_GITHUB_TOKEN = "brave-browser-releases-github"
                    GITHUB_API = "https://api.github.com/repos/brave"
                    GITHUB_CREDENTIAL_ID = "brave-builds-github-token-for-pr-builder"
                    BRANCH_EXISTS_IN_BC = httpRequest(url: GITHUB_API + "/brave-core/branches/" + BRANCH_TO_BUILD, validResponseCodes: '100:499', authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).status.equals(200)
                    TARGET_BRANCH = "master"
                    SKIP = false
                    if (env.CHANGE_BRANCH) {
                        TARGET_BRANCH = env.CHANGE_TARGET
                        prNumber = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls?head=brave:" + BRANCH_TO_BUILD, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)[0].number
                        prDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls/" + prNumber, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)
                        SKIP = prDetails.mergeable_state.equals("draft") or prDetails.labels.count { label -> label.name.equals("CI/Skip") }.equals(1)
                    }
                }
            }
        }
        stage("continue") {
            when {
                beforeAgent true
                expression { SKIP }
            }
            steps {
                script {
                    print "PR is in draft or has \"CI/Skip\" label, aborting build!"
                    currentBuild.result = "ABORTED"
                }
            }
        }
        stage("build-all") {
            when {
                beforeAgent true
                expression { !SKIP }
            }
            parallel {
                stage("android") {
                    agent { label "linux-${RELEASE_TYPE}" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-android-s3-bucket")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                sh """
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH_TO_BUILD}"' package.json > package.json.new
                                    mv package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                sh "npm install --no-optional"
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || RUN_INIT }
                            }
                            steps {
                                sh "npm run init -- --target_os=android"
                            }
                        }
                        stage("sync") {
                            steps {
                                sh "npm run sync -- --all --target_os=android"
                            }
                        }
                        stage("lint") {
                            steps {
                                script {
                                    try {
                                        sh """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com
                                            git -C src/brave checkout -b ${LINT_BRANCH}
                                            npm run lint -- --base=origin/${TARGET_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("sccache") {
                            when {
                                allOf {
                                    expression { !DISABLE_SCCACHE }
                                    expression { "${RELEASE_TYPE}" == "ci" }
                                }
                            }
                            steps {
                                echo "enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --target_os=android
                                """
                            }
                        }
                        stage("archive") {
                            steps {
                                withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                    s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "apks/*.apk",
                                        path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                    )
                                }
                            }
                        }
                    }
                }
                stage("linux") {
                    agent { label "linux-${RELEASE_TYPE}" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-linux-s3-bucket")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                sh """
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH_TO_BUILD}"' package.json > package.json.new
                                    mv package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                sh "npm install --no-optional"
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || RUN_INIT }
                            }
                            steps {
                                sh "npm run init"
                            }
                        }
                        stage("sync") {
                            steps {
                                sh "npm run sync -- --all"
                            }
                        }
                        stage("lint") {
                            steps {
                                script {
                                    try {
                                        sh """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com
                                            git -C src/brave checkout -b ${LINT_BRANCH}
                                            npm run lint -- --base=origin/${TARGET_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("sccache") {
                            when {
                                allOf {
                                    expression { !DISABLE_SCCACHE }
                                    expression { "${RELEASE_TYPE}" == "ci" }
                                }
                            }
                            steps {
                                echo "enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("test-security") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test-security -- --output_path=\"${OUT_DIR}/brave\""
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("test-unit") {
                            steps {
                                timeout(time: 20, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test -- brave_unit_tests ${BUILD_TYPE} --output brave_unit_tests.xml"
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_unit_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("test-browser") {
                            steps {
                                timeout(time: 20, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test -- brave_browser_tests ${BUILD_TYPE} --output brave_browser_tests.xml"
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_browser_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist") {
                            steps {
                                sh "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true"
                            }
                        }
                        stage("archive") {
                            steps {
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "*.deb",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "*.rpm",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                            }
                        }
                    }
                }
                stage("mac") {
                    agent { label "mac-${RELEASE_TYPE}" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-mac-s3-bucket")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                sh """
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH_TO_BUILD}"' package.json > package.json.new
                                    mv package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                sh "npm install --no-optional"
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || RUN_INIT }
                            }
                            steps {
                                sh "npm run init"
                            }
                        }
                        stage("sync") {
                            steps {
                                sh "npm run sync -- --all"
                            }
                        }
                        stage("lint") {
                            steps {
                                script {
                                    try {
                                        sh """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com
                                            git -C src/brave checkout -b ${LINT_BRANCH}
                                            npm run lint -- --base=origin/${TARGET_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("sccache") {
                            when {
                                allOf {
                                    expression { !DISABLE_SCCACHE }
                                    expression { "${RELEASE_TYPE}" == "ci" }
                                }
                            }
                            steps {
                                echo "enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("test-security") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test-security -- --output_path=\"${OUT_DIR}/Brave\\ Browser\\ ${CHANNEL_CAPITALIZED}.app/Contents/MacOS/Brave\\ Browser\\ ${CHANNEL_CAPITALIZED}\""
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("test-unit") {
                            steps {
                                timeout(time: 20, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test -- brave_unit_tests ${BUILD_TYPE} --output brave_unit_tests.xml"
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_unit_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("test-browser") {
                            steps {
                                timeout(time: 20, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test -- brave_browser_tests ${BUILD_TYPE} --output brave_browser_tests.xml"
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_browser_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist-ci") {
                            when {
                                expression { "${RELEASE_TYPE}" == "ci" }
                            }
                            steps {
                                sh "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --skip_signing"
                            }
                        }
                        stage("dist-release") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                sh "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true"
                            }
                        }
                        stage("archive") {
                            steps {
                                withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                    s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "unsigned_dmg/*.dmg",
                                        path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                    )
                                }
                                withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                    s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "*.dmg",
                                        path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                    )
                                }
                                withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                    s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "*.pkg",
                                        path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                    )
                                }
                            }
                        }
                    }
                }
                stage("windows-x64") {
                    agent { label "windows-${RELEASE_TYPE}" }
                    environment {
                        GIT_CACHE_PATH = "${USERPROFILE}\\cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-win-s3-bucket")
                        PATH = "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.17134.0\\x64\\;C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\Remote Debugger\\x64;${PATH}"
                        SIGNTOOL_ARGS = "sign /t http://timestamp.verisign.com/scripts/timstamp.dll /fd sha256 /sm"
                        CERT = "Brave"
                        KEY_CER_PATH = "C:\\jenkins\\digicert-key\\digicert.cer"
                        KEY_PFX_PATH = "C:\\jenkins\\digicert-key\\digicert.pfx"
                        AUTHENTICODE_PASSWORD = credentials("digicert-brave-browser-development-certificate-ps-escaped")
                        AUTHENTICODE_PASSWORD_UNESCAPED = credentials("digicert-brave-browser-development-certificate")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                powershell """
                                    \$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'
                                    jq "del(.config.projects[\\`"brave-core\\`"].branch) | .config.projects[\\`"brave-core\\`"].branch=\\`"${BRANCH_TO_BUILD}\\`"" package.json > package.json.new
                                    Move-Item -Force package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                powershell "npm install --no-optional"
                                powershell "Remove-Item ${GIT_CACHE_PATH}/*.lock"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || RUN_INIT }
                            }
                            steps {
                                powershell "npm run init"
                            }
                        }
                        stage("sync") {
                            steps {
                                powershell "npm run sync -- --all"
                            }
                        }
                        stage("lint") {
                            steps {
                                script {
                                    try {
                                        powershell """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com
                                            git -C src/brave checkout -b ${LINT_BRANCH}
                                            npm run lint -- --base=origin/${TARGET_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        // TODO: add sccache
                        stage("build") {
                            steps {
                                powershell """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("test-security") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            powershell "npm run test-security -- --output_path=\"${OUT_DIR}/brave.exe\""
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("test-unit") {
                            steps {
                                timeout(time: 20, unit: "MINUTES") {
                                    script {
                                        try {
                                            powershell "npm run test -- brave_unit_tests ${BUILD_TYPE} --output brave_unit_tests.xml"
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_unit_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        // TODO: add test-browser
                        stage("dist-ci") {
                            when {
                                expression { "${RELEASE_TYPE}" == "ci" }
                            }
                            steps {
                                powershell """
                                    Import-PfxCertificate -FilePath \"${KEY_PFX_PATH}\" -CertStoreLocation "Cert:\\LocalMachine\\My" -Password (ConvertTo-SecureString -String \"${AUTHENTICODE_PASSWORD_UNESCAPED}\" -AsPlaintext -Force)
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --skip_signing
                                """
                                powershell '(Get-Content src\\brave\\vendor\\omaha\\omaha\\hammer-brave.bat) | % { $_ -replace "10.0.15063.0\", "" } | Set-Content src\\brave\\vendor\\omaha\\omaha\\hammer-brave.bat'
                                powershell "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --build_omaha --tag_ap=x64-${CHANNEL} --target_arch=x64 --official_build=true --skip_signing"
                            }
                        }
                        stage("dist-release") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                powershell """
                                    Import-PfxCertificate -FilePath \"${KEY_PFX_PATH}\" -CertStoreLocation "Cert:\\LocalMachine\\My" -Password (ConvertTo-SecureString -String \"${AUTHENTICODE_PASSWORD_UNESCAPED}\" -AsPlaintext -Force)
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                                powershell '(Get-Content src\\brave\\vendor\\omaha\\omaha\\hammer-brave.bat) | % { $_ -replace "10.0.15063.0\", "" } | Set-Content src\\brave\\vendor\\omaha\\omaha\\hammer-brave.bat'
                                powershell "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --build_omaha --tag_ap=x64-${CHANNEL} --target_arch=x64 --official_build=true"
                            }
                        }
                        stage("archive") {
                            steps {
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "brave_installer_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowser${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserSilent${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandalone${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandaloneSilent${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandaloneUntagged${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserUntagged${CHANNEL_CAPITALIZED}Setup_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
