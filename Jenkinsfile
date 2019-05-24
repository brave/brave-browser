pipeline {
    agent none
    options {
        // TODO: set max. no. of concurrent builds to 2
        timeout(time: 12, unit: "HOURS")
        timestamps()
    }
    parameters {
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
        SLACK_USERNAME_MAP = credentials("github-to-slack-username-map")
    }
    stages {
        stage("env") {
            steps {
                script {
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
                    BRAVE_GITHUB_TOKEN = "brave-browser-releases-github"
                    GITHUB_API = "https://api.github.com/repos/brave"
                    GITHUB_CREDENTIAL_ID = "brave-builds-github-token-for-pr-builder"
                    SKIP = false
                    BRANCH = env.BRANCH_NAME
                    TARGET_BRANCH = "master"
                    if (env.CHANGE_BRANCH) {
                        BRANCH = env.CHANGE_BRANCH
                        TARGET_BRANCH = env.CHANGE_TARGET
                        def prNumber = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls?head=brave:" + BRANCH, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)[0].number
                        def prDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls/" + prNumber, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)
                        SKIP = prDetails.mergeable_state.equals("draft") or prDetails.labels.count { label -> label.name.equals("CI/Skip") }.equals(1)
                        env.SLACK_USERNAME = readJSON(text: SLACK_USERNAME_MAP)[env.CHANGE_AUTHOR]
                        if (env.SLACK_USERNAME) {
                            slackSend(color:null, channel: env.SLACK_USERNAME, message: "STARTED - ${JOB_NAME} #${BUILD_NUMBER} (<${BUILD_URL}/flowGraphTable/?auto_refresh=true|Open>)")
                        }
                    }
                    BRANCH_EXISTS_IN_BC = httpRequest(url: GITHUB_API + "/brave-core/branches/" + BRANCH, validResponseCodes: "100:499", authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).status.equals(200)
                    if (BRANCH_EXISTS_IN_BC) {
                        def bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls?head=brave:" + BRANCH, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)[0]
                        if (bcPrDetails) {
                            env.BC_PR_NUMBER = bcPrDetails.number
                        }
                    }
                }
            }
        }
        stage("abort") {
            steps {
                script {
                    if (SKIP) {
                        echo "Aborting build as PR is in draft or has \"CI/Skip\" label"
                        stopCurrentBuild()
                    }
                    else if (BRANCH_EXISTS_IN_BC) {
                        if (isStartedManually()) {
                            if (env.BC_PR_NUMBER) {
                                echo "Aborting build as PR exists in brave-core and build has not been started from there"
                                echo "Use " + env.JENKINS_URL + "view/ci/job/brave-core-build-pr/view/change-requests/job/PR-" + env.BC_PR_NUMBER + " to trigger"
                            }
                            else {
                                echo "Aborting build as there's a matching branch in brave-core, please create a PR there first"
                                echo "Use https://github.com/brave/brave-core/compare/" + TARGET_BRANCH + "..." + BRANCH + " to create PR"
                            }
                            SKIP = true
                            stopCurrentBuild()
                        }
                    }
                    def bb_package_json = readJSON(text: httpRequest(url: "https://raw.githubusercontent.com/brave/brave-browser/" + BRANCH + "/package.json", quiet: !DEBUG).content)
                    def bb_version = bb_package_json.version
                    def bc_branch = bb_package_json.config.projects["brave-core"].branch
                    def bc_version = readJSON(text: httpRequest(url: "https://raw.githubusercontent.com/brave/brave-core/" + bc_branch + "/package.json", quiet: !DEBUG).content).version
                    if (bb_version != bc_version) {
                        echo "Version mismatch between brave-browser (" + bb_version + ") and brave-core (" + bc_version + ") in package.json"
                        SKIP = true
                        stopCurrentBuild()
                    }
                    for (build in getBuilds()) {
                        if (build.isBuilding() && build.getNumber() < env.BUILD_NUMBER.toInteger()) {
                            echo "Aborting older running build " + build
                            build.doStop()
                            // build.finish(hudson.model.Result.ABORTED, new java.io.IOException("Aborting build"))
                        }
                    }
                    sleep(time: 1, unit: "MINUTES")
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
                    agent { label "android-${RELEASE_TYPE}" }
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
                                checkout([$class: "GitSCM", branches: [[name: "${BRANCH}"]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                echo "Pinning brave-core to use branch ${BRANCH}"
                                sh """
                                    set -e
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH}"' package.json > package.json.new
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
                                            set -e
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
                                echo "Enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    set -e
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
                                checkout([$class: "GitSCM", branches: [[name: "${BRANCH}"]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                echo "Pinning brave-core to use branch ${BRANCH}"
                                sh """
                                    set -e
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH}"' package.json > package.json.new
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
                                            set -e
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
                        stage("audit-deps") {
                            steps {
                                timeout(time: 2, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
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
                                echo "Enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    set -e
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("audit-network") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run network-audit -- --output_path=\"${OUT_DIR}/brave\""
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
                                checkout([$class: "GitSCM", branches: [[name: "${BRANCH}"]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                echo "Pinning brave-core to use branch ${BRANCH}"
                                sh """
                                    set -e
                                    jq 'del(.config.projects["brave-core"].branch) | .config.projects["brave-core"].branch="${BRANCH}"' package.json > package.json.new
                                    mv package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                buildName "${BUILD_NUMBER}-${BRANCH}-"+"${GIT_COMMIT}".substring(0, 7)
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
                                            set -e
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
                        stage("audit-deps") {
                            steps {
                                timeout(time: 2, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
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
                                echo "Enabling sccache"
                                sh "npm config --userconfig=.npmrc set sccache sccache"
                            }
                        }
                        stage("build") {
                            steps {
                                sh """
                                    set -e
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("audit-network") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run network-audit -- --output_path=\"${OUT_DIR}/Brave\\ Browser\\ ${CHANNEL_CAPITALIZED}.app/Contents/MacOS/Brave\\ Browser\\ ${CHANNEL_CAPITALIZED}\""
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
                                sh "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --skip_signing"
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
                                checkout([$class: "GitSCM", branches: [[name: "${BRANCH}"]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
                            }
                        }
                        stage("pin") {
                            when {
                                expression { BRANCH_EXISTS_IN_BC }
                            }
                            steps {
                                echo "Pinning brave-core to use branch ${BRANCH}"
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    \$PSDefaultParameterValues['Out-File:Encoding'] = "utf8"
                                    jq "del(.config.projects[\\`"brave-core\\`"].branch) | .config.projects[\\`"brave-core\\`"].branch=\\`"${BRANCH}\\`"" package.json > package.json.new
                                    Move-Item -Force package.json.new package.json
                                """
                            }
                        }
                        stage("install") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    npm install --no-optional
                                    Remove-Item -ErrorAction SilentlyContinue -Force ${GIT_CACHE_PATH}/*.lock
                                """
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || RUN_INIT }
                            }
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    npm run init
                                """
                            }
                        }
                        stage("sync") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    npm run sync -- --all
                                """
                            }
                        }
                        stage("lint") {
                            steps {
                                script {
                                    try {
                                        powershell """
                                            \$ErrorActionPreference = "Stop"
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
                        stage("audit-deps") {
                            steps {
                                timeout(time: 2, unit: "MINUTES") {
                                    script {
                                        try {
                                            powershell """
                                                \$ErrorActionPreference = "Stop"
                                                npm run audit_deps
                                            """
                                        }
                                        catch (ex) {
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        // TODO: add sccache
                        stage("build") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true
                                """
                            }
                        }
                        stage("audit-network") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            powershell """
                                                \$ErrorActionPreference = "Stop"
                                                npm run network-audit -- --output_path="${OUT_DIR}/brave.exe"
                                            """
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
                        stage("dist") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    Import-PfxCertificate -FilePath "${KEY_PFX_PATH}" -CertStoreLocation "Cert:\\LocalMachine\\My" -Password (ConvertTo-SecureString -String "${AUTHENTICODE_PASSWORD_UNESCAPED}" -AsPlaintext -Force)
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --official_build=true --skip_signing
                                    (Get-Content src/brave/vendor/omaha/omaha/hammer-brave.bat) | % { \$_ -replace "10.0.15063.0\\\\", "" } | Set-Content src/brave/vendor/omaha/omaha/hammer-brave.bat
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} --build_omaha --tag_ap=x64-${CHANNEL} --target_arch=x64 --official_build=true --skip_signing
                                """
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
    post {
        always {
            script {
                if (env.SLACK_USERNAME) {
                    def slackColorMap = ["SUCCESS": "good", "FAILURE": "danger", "UNSTABLE": "warning", "ABORTED": null]
                    slackSend(color: slackColorMap[currentBuild.currentResult], channel: env.SLACK_USERNAME, message: currentBuild.currentResult + " - ${JOB_NAME} #${BUILD_NUMBER} (<${BUILD_URL}/flowGraphTable/?auto_refresh=true|Open>)")
                }
            }
        }
    }
}

@NonCPS
def stopCurrentBuild() {
    Jenkins.instance.getItemByFullName(env.JOB_NAME).getLastBuild().doStop()
}

@NonCPS
def isStartedManually() {
    return Jenkins.instance.getItemByFullName(env.JOB_NAME).getLastBuild().getCause(hudson.model.Cause$UpstreamCause) == null
}

@NonCPS
def getBuilds() {
    return Jenkins.instance.getItemByFullName(env.JOB_NAME).builds
}
