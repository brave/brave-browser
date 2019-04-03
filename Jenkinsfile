pipeline {
    agent none
    options {
        // 15m quiet period as described at https://jenkins.io/blog/2010/08/11/quiet-period-feature/
        // quietPeriod(900)
        disableConcurrentBuilds()
        // trying a longer timeout to queue jobs rather than fail them
        timeout(time: 12, unit: "HOURS")
        timestamps()
    }
    parameters {
        string(name: "BRANCH", defaultValue: "master")
        choice(name: "CHANNEL", choices: ["dev", "beta", "release", "nightly"])
        booleanParam(name: "WIPE_WORKSPACE", defaultValue: false)
        booleanParam(name: "RUN_INIT", defaultValue: false)
        booleanParam(name: "DISABLE_SCCACHE", defaultValue: false)
    }
    environment {
        BRANCH = "${params.BRANCH}"
        CHANNEL = "${params.CHANNEL}"
        CHANNEL_CAPITALIZED = "${CHANNEL}".capitalize()
        BUILD_TYPE = "Release"
        OUT_DIR = "src/out/${BUILD_TYPE}"
        LINT_BRANCH = "TEMP_LINT_BRANCH_${BUILD_NUMBER}"
        REFERRAL_API_KEY = credentials("REFERRAL_API_KEY")
        BRAVE_GOOGLE_API_KEY = credentials("npm_config_brave_google_api_key")
        BRAVE_ARTIFACTS_BUCKET = credentials("brave-jenkins-artifacts-s3-bucket")
        BRAVE_S3_BUCKET = credentials("brave-binaries-s3-bucket")
        BRAVE_GITHUB_TOKEN = "brave-browser-releases-github"
    }
    stages {
        stage("env") {
            steps {
                script {
                    env.BRANCH_TO_BUILD = (env.CHANGE_BRANCH == null ? env.BRANCH : env.CHANGE_BRANCH)
                    env.RELEASE_TYPE = (env.JOB_NAME == "brave-browser-build" ? "release" : "ci")
                }
            }
        }
        stage("build-all") {
            parallel {
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
                                    expression { params.WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("install") {
                            steps {
                                sh "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || params.RUN_INIT }
                            }
                            steps {
                                sh """
                                    rm -rf ${GIT_CACHE_PATH}/*.lock
                                    npm run init
                                """
                            }
                        }
                        stage("lint") {
                            steps {
                                sh "npm run sync -- --all"
                                script {
                                    try {
                                        sh """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com

                                            git -C src/brave checkout -b ${LINT_BRANCH}

                                            npm run lint

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
                                anyOf {
                                    expression { "${DISABLE_SCCACHE}" == "false" }
                                    expression { "${RELEASE_TYPE}" == "ci" }
                                }
                            }
                            steps {
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
                        stage("github-upload") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                withCredentials([[
                                    $class: "AmazonWebServicesCredentialsBinding",
                                    credentialsId: "brave-browser-binaries-upload",
                                    accessKeyVariable: "BRAVE_S3_ACCESS_KEY",
                                    secretKeyVariable: "BRAVE_S3_SECRET_KEY"
                                ]]) {
                                    sh "npm run upload"
                                }
                            }
                        }
                        stage("archive") {
                            steps {
                                // commented because it takes much longer to copy to Jenkins than to S3
                                // archiveArtifacts artifacts: "${OUT_DIR}/*.deb,${OUT_DIR}/*.rpm", fingerprint: true
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
                        SIGN_WIDEVINE_CERT = credentials("widevine_brave_prod_cert.der")
                        SIGN_WIDEVINE_KEY = credentials("widevine_brave_prod_key.pem")
                        SIGN_WIDEVINE_PASSPHRASE = credentials("447b2fa7-c989-43af-9047-8ae158fad0a3")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { params.WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("install") {
                            steps {
                                sh "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || params.RUN_INIT }
                            }
                            steps {
                                sh """
                                    rm -rf ${GIT_CACHE_PATH}/*.lock
                                    npm run init
                                """
                            }
                        }
                        stage("lint") {
                            steps {
                                sh "npm run sync -- --all"
                                script {
                                    try {
                                        sh """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com

                                            git -C src/brave checkout -b ${LINT_BRANCH}

                                            npm run lint

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
                                anyOf {
                                    expression { "${DISABLE_SCCACHE}" == "false" }
                                    expression { "${RELEASE_TYPE}" == "ci" }
                                }
                            }
                            steps {
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

                                    mkdir -p src/third_party/widevine/scripts/
                                    cp ${HOME}/signature_generator.py src/third_party/widevine/scripts/

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
                        stage("github-upload") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                withCredentials([[
                                    $class: "AmazonWebServicesCredentialsBinding",
                                    credentialsId: "brave-browser-binaries-upload",
                                    accessKeyVariable: "BRAVE_S3_ACCESS_KEY",
                                    secretKeyVariable: "BRAVE_S3_SECRET_KEY"
                                ]]) {
                                    sh "npm run upload"
                                }
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
                        SIGN_WIDEVINE_CERT = credentials("widevine_brave_prod_cert.der")
                        SIGN_WIDEVINE_KEY = credentials("widevine_brave_prod_key.pem")
                        SIGN_WIDEVINE_PASSPHRASE = credentials("447b2fa7-c989-43af-9047-8ae158fad0a3")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { params.WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("install") {
                            steps {
                                powershell "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || params.RUN_INIT }
                            }
                            steps {
                                powershell """
                                    Remove-Item ${GIT_CACHE_PATH}/*.lock
                                    npm run init
                                """
                            }
                        }
                        stage("lint") {
                            steps {
                                powershell "npm run sync -- --all"
                                script {
                                    try {
                                        powershell """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com

                                            git -C src/brave checkout -b ${LINT_BRANCH}

                                            npm run lint

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
                        // stage("sccache") {
                        //     when {
                        //         anyOf {
                        //             expression { "${DISABLE_SCCACHE}" == "false" }
                        //             expression { "${RELEASE_TYPE}" == "ci" }
                        //         }
                        //     }
                        //     steps {
                        //         powershell "npm config --userconfig=.npmrc set sccache sccache"
                        //     }
                        // }
                        stage("build") {
                            steps {
                                powershell """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken

                                    New-Item -ItemType directory -Path "src\\third_party\\widevine\\scripts"
                                    Copy-Item "C:\\jenkins\\signature_generator.py" -Destination "src\\third_party\\widevine\\scripts\\"

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
                        // // TODO: fix running browser tests in non-interactive mode
                        // stage("test-browser") {
                        //     steps {
                        //         timeout(time: 20, unit: "MINUTES") {
                        //             script {
                        //                 try {
                        //                     powershell "npm run test -- brave_browser_tests ${BUILD_TYPE} --output brave_browser_tests.xml"
                        //                     xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_browser_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                        //                 }
                        //                 catch (ex) {
                        //                     currentBuild.result = "UNSTABLE"
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
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
                        stage("github-upload") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                withCredentials([[
                                    $class: "AmazonWebServicesCredentialsBinding",
                                    credentialsId: "brave-browser-binaries-upload",
                                    accessKeyVariable: "BRAVE_S3_ACCESS_KEY",
                                    secretKeyVariable: "BRAVE_S3_SECRET_KEY"
                                ]]) {
                                    powershell "npm run upload -- --target_arch=x64"
                                }
                            }
                        }
                        stage("archive") {
                            steps {
                                // commented because it takes much longer to copy to Jenkins than to S3
                                // archiveArtifacts artifacts: "${OUT_DIR}/BraveBrowser*.exe", fingerprint: true
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
                stage("windows-ia32") {
                    when {
                        beforeAgent true
                        expression { "${RELEASE_TYPE}" == "release" }
                    }
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
                        SIGN_WIDEVINE_CERT = credentials("widevine_brave_prod_cert.der")
                        SIGN_WIDEVINE_KEY = credentials("widevine_brave_prod_key.pem")
                        SIGN_WIDEVINE_PASSPHRASE = credentials("447b2fa7-c989-43af-9047-8ae158fad0a3")
                    }
                    stages {
                        stage("checkout") {
                            when {
                                anyOf {
                                    expression { params.WIPE_WORKSPACE }
                                    expression { return !fileExists("package.json") }
                                }
                            }
                            steps {
                                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_TO_BUILD}"]], extensions: [[$class: 'WipeWorkspace']], userRemoteConfigs: [[url: 'https://github.com/brave/brave-browser.git']]])
                            }
                        }
                        stage("install") {
                            steps {
                                powershell "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || params.RUN_INIT }
                            }
                            steps {
                                powershell """
                                    Remove-Item ${GIT_CACHE_PATH}/*.lock
                                    npm run init
                                """
                            }
                        }
                        stage("lint") {
                            steps {
                                powershell "npm run sync -- --all"
                                script {
                                    try {
                                        powershell """
                                            git -C src/brave config user.name brave-builds
                                            git -C src/brave config user.email devops@brave.com

                                            git -C src/brave checkout -b ${LINT_BRANCH}

                                            npm run lint

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
                        // stage("sccache") {
                        //     when {
                        //         anyOf {
                        //             expression { "${DISABLE_SCCACHE}" == "false" }
                        //             expression { "${RELEASE_TYPE}" == "ci" }
                        //         }
                        //     }
                        //     steps {
                        //         powershell "npm config --userconfig=.npmrc set sccache sccache"
                        //     }
                        // }
                        stage("build") {
                            steps {
                                powershell """
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken

                                    New-Item -ItemType directory -Path "src\\third_party\\widevine\\scripts"
                                    Copy-Item "C:\\jenkins\\signature_generator.py" -Destination "src\\third_party\\widevine\\scripts\\"

                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --target_arch=ia32
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
                        // // TODO: fix running browser tests in non-interactive mode
                        // stage("test-browser") {
                        //     steps {
                        //         timeout(time: 20, unit: "MINUTES") {
                        //             script {
                        //                 try {
                        //                     powershell "npm run test -- brave_browser_tests ${BUILD_TYPE} --output brave_browser_tests.xml"
                        //                     xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_browser_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                        //                 }
                        //                 catch (ex) {
                        //                     currentBuild.result = "UNSTABLE"
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
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
                                powershell "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --build_omaha --tag_ap=x86-${CHANNEL} --target_arch=ia32 --official_build=true"
                            }
                        }
                        stage("github-upload") {
                            when {
                                expression { "${RELEASE_TYPE}" == "release" }
                            }
                            steps {
                                withCredentials([[
                                    $class: "AmazonWebServicesCredentialsBinding",
                                    credentialsId: "brave-browser-binaries-upload",
                                    accessKeyVariable: "BRAVE_S3_ACCESS_KEY",
                                    secretKeyVariable: "BRAVE_S3_SECRET_KEY"
                                ]]) {
                                    powershell "npm run upload -- --target_arch=ia32"
                                }
                            }
                        }
                        stage("archive") {
                            steps {
                                // commented because it takes much longer to copy to Jenkins than to S3
                                // archiveArtifacts artifacts: "${OUT_DIR}/BraveBrowser*.exe", fingerprint: true
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "brave_installer_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowser${CHANNEL_CAPITALIZED}Setup32_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserSilent${CHANNEL_CAPITALIZED}Setup32_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandalone${CHANNEL_CAPITALIZED}Setup32_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandaloneSilent${CHANNEL_CAPITALIZED}Setup32_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserStandaloneUntagged${CHANNEL_CAPITALIZED}Setup32_*.exe",
                                    path: "${JOB_NAME}/${BUILD_NUMBER}/", pathStyleAccessEnabled: true, payloadSigningEnabled: true, workingDir: "${OUT_DIR}"
                                )
                                s3Upload(acl: "Private", bucket: "${BRAVE_ARTIFACTS_BUCKET}", includePathPattern: "BraveBrowserUntagged${CHANNEL_CAPITALIZED}Setup32_*.exe",
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
