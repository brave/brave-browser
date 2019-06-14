pipeline {
    agent none
    options {
        timeout(time: 6, unit: "HOURS")
        timestamps()
    }
    parameters {
        choice(name: "CHANNEL", choices: ["nightly", "dev", "beta", "release"], description: "")
        choice(name: "BUILD_TYPE", choices: ["Release", "Debug"], description: "")
        booleanParam(name: "WIPE_WORKSPACE", defaultValue: false, description: "")
        booleanParam(name: "SKIP_INIT", defaultValue: false, description: "")
        booleanParam(name: "DISABLE_SCCACHE", defaultValue: false, description: "")
        booleanParam(name: "SKIP_SIGNING", defaultValue: false, description: "")
        booleanParam(name: "DEBUG", defaultValue: false, description: "")
    }
    environment {
        REFERRAL_API_KEY = credentials("REFERRAL_API_KEY")
        BRAVE_GOOGLE_API_KEY = credentials("npm_config_brave_google_api_key")
        BRAVE_ARTIFACTS_S3_BUCKET = credentials("brave-jenkins-artifacts-s3-bucket")
        SLACK_USERNAME_MAP = credentials("github-to-slack-username-map")
        SIGN_WIDEVINE_PASSPHRASE = credentials("447b2fa7-c989-43af-9047-8ae158fad0a3")
    }
    stages {
        stage("env") {
            steps {
                script {
                    setEnv()
                }
            }
        }
        stage("abort") {
            steps {
                script {
                    checkAndAbortBuild()
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
                    when {
                        beforeAgent true
                        expression { !SKIP_ANDROID }
                    }
                    agent { label "android-ci" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-android-s3-bucket")
                        SCCACHE_ERROR_LOG  = "${WORKSPACE}/sccache.log"
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
                                checkout([$class: "GitSCM", branches: [[name: BRANCH]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
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
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                                sh "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || !SKIP_INIT }
                            }
                            steps {
                                sh "rm -rf src/brave"
                                sh "npm run init -- --target_os=android"
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
                                            npm run lint -- --base=origin/${BASE_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("audit-deps") {
                            steps {
                                timeout(time: 1, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            echo ex.toString()
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
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --target_os=android --target_arch=arm
                                """
                            }
                        }
                        stage("archive") {
                            steps {
                                script {
                                    try {
                                        s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "apks/*.apk", path: BUILD_TAG_SLASHED, workingDir: "src/out/android_" + BUILD_TYPE + "_arm")
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                    }
                }
                stage("ios") {
                    when {
                        beforeAgent true
                        expression { !SKIP_IOS }
                    }
                    agent { label "mac-ci" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
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
                                checkout([$class: "GitSCM", branches: [[name: BRANCH]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
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
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                                sh "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || !SKIP_INIT }
                            }
                            steps {
                                sh "rm -rf src/brave"
                                sh "npm run init -- --target_os=ios"
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
                                            npm run lint -- --base=origin/${BASE_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("audit-deps") {
                            steps {
                                timeout(time: 1, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
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
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --target_os=ios
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} --target_os=ios --target_arch=arm64
                                """
                            }
                        }
                        stage("test-unit") {
                            steps {
                                timeout(time: 2, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run test -- brave_rewards_ios_tests ${BUILD_TYPE} --target_os=ios"
                                        }
                                        catch (ex) {
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist") {
                            steps {
                                sh """
                                    set -e
                                    cd src/out
                                    cp -R ios_${BUILD_TYPE}_arm64/BraveRewards.framework .
                                    lipo -create -output BraveRewards.framework/BraveRewards ios_${BUILD_TYPE}/BraveRewards.framework/BraveRewards ios_${BUILD_TYPE}_arm64/BraveRewards.framework/BraveRewards
                                    zip -r BraveRewards.framework.zip BraveRewards.framework
                                """
                            }
                        }
                        stage("archive") {
                            steps {
                                script {
                                    try {
                                        withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                            s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "BraveRewards.framework.zip", path: BUILD_TAG_SLASHED, workingDir: "src/out")
                                        }
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                    }
                }
                stage("linux") {
                    when {
                        beforeAgent true
                        expression { !SKIP_LINUX }
                    }
                    agent { label "linux-ci" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-linux-s3-bucket")
                        SCCACHE_ERROR_LOG  = "${WORKSPACE}/sccache.log"
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
                                checkout([$class: "GitSCM", branches: [[name: BRANCH]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
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
                                sh "rm -rf ${GIT_CACHE_PATH}/*.lock"
                                sh "npm install --no-optional"
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || !SKIP_INIT }
                            }
                            steps {
                                sh "rm -rf src/brave"
                                sh "npm run init"
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
                                            npm run lint -- --base=origin/${BASE_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("audit-deps") {
                            steps {
                                timeout(time: 1, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            echo ex.toString()
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
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL}
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
                                            echo ex.toString()
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
                                            echo ex.toString()
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
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist") {
                            steps {
                                sh "npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL}"
                            }
                        }
                        stage("archive") {
                            steps {
                                script {
                                    try {
                                        s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "brave-*.deb", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                        s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "brave-*.rpm", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                    }
                }
                stage("macos") {
                    when {
                        beforeAgent true
                        expression { !SKIP_MACOS }
                    }
                    agent { label "mac-ci" }
                    environment {
                        GIT_CACHE_PATH = "${HOME}/cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-mac-s3-bucket")
                        SCCACHE_ERROR_LOG  = "${WORKSPACE}/sccache.log"
                        KEYCHAIN = "signing-ci"
                        KEYCHAIN_PATH = "/Users/jenkins/Library/Keychains/${KEYCHAIN}.keychain-db"
                        KEYCHAIN_PASS = credentials("mac-ci-signing-keychain-password")
                        MAC_APPLICATION_SIGNING_IDENTIFIER = credentials("mac-ci-signing-application-id")
                        MAC_INSTALLER_SIGNING_IDENTIFIER = credentials("mac-ci-signing-installer-id")
                        SIGN_WIDEVINE_CERT = credentials("widevine_brave_prod_cert.der")
                        SIGN_WIDEVINE_KEY = credentials("widevine_brave_prod_key.pem")
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
                                checkout([$class: "GitSCM", branches: [[name: BRANCH]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
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
                                buildName env.BUILD_NUMBER + "-" + BRANCH + "-" + env.GIT_COMMIT.substring(0, 7)
                                sh """
                                    rm -rf ${GIT_CACHE_PATH}/*.lock
                                    set -e
                                    npm install --no-optional
                                    mkdir -p src/third_party/widevine/scripts
                                    cp ${HOME}/signature_generator.py src/third_party/widevine/scripts
                                """
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || !SKIP_INIT }
                            }
                            steps {
                                sh "rm -rf src/brave"
                                sh "npm run init"
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
                                            npm run lint -- --base=origin/${BASE_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("audit-deps") {
                            steps {
                                timeout(time: 1, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run audit_deps"
                                        }
                                        catch (ex) {
                                            echo ex.toString()
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
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} ${SKIP_SIGNING}
                                """
                            }
                        }
                        stage("audit-network") {
                            steps {
                                timeout(time: 4, unit: "MINUTES") {
                                    script {
                                        try {
                                            sh "npm run network-audit -- --output_path=\"${OUT_DIR}/Brave\\ Browser${CHANNEL_CAPITALIZED_BACKSLASHED_SPACED}.app/Contents/MacOS/Brave\\ Browser${CHANNEL_CAPITALIZED_BACKSLASHED_SPACED}\""
                                        }
                                        catch (ex) {
                                            echo ex.toString()
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
                                            echo ex.toString()
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
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist") {
                            steps {
                                sh """
                                    set -e
                                    security unlock-keychain -p "${KEYCHAIN_PASS}" "${KEYCHAIN_PATH}"
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} ${SKIP_SIGNING} --mac_signing_keychain=${KEYCHAIN} --mac_signing_identifier=${MAC_APPLICATION_SIGNING_IDENTIFIER} --mac_installer_signing_identifier=${MAC_INSTALLER_SIGNING_IDENTIFIER}
                                    security lock-keychain -a
                                """
                            }
                        }
                        stage("archive") {
                            steps {
                                script {
                                    try {
                                        withAWS(credentials: "mac-build-s3-upload-artifacts", region: "us-west-2") {
                                            s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "unsigned_dmg/Brave*.dmg", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                            s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "Brave*.dmg", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                            s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "Brave*.pkg", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                        }
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                    }
                }
                stage("windows-x64") {
                    when {
                        beforeAgent true
                        expression { !SKIP_WINDOWS }
                    }
                    agent { label "windows-ci" }
                    environment {
                        GIT_CACHE_PATH = "${USERPROFILE}\\cache"
                        SCCACHE_BUCKET = credentials("brave-browser-sccache-win-s3-bucket")
                        PATH = "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.17134.0\\x64\\;C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\Remote Debugger\\x64;${PATH}"
                        SIGNTOOL_ARGS = "sign /t http://timestamp.digicert.com /fd sha256 /sm"
                        CERT = "Brave"
                        KEY_CER_PATH = "C:\\jenkins\\digicert-key\\digicert.cer"
                        KEY_PFX_PATH = "C:\\jenkins\\digicert-key\\digicert.pfx"
                        AUTHENTICODE_PASSWORD = credentials("digicert-brave-browser-ci-certificate-ps-escaped")
                        AUTHENTICODE_PASSWORD_UNESCAPED = credentials("digicert-brave-browser-ci-certificate")
                        SIGN_WIDEVINE_CERT = credentials("widevine_brave_prod_cert.der")
                        SIGN_WIDEVINE_KEY = credentials("widevine_brave_prod_key.pem")
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
                                checkout([$class: "GitSCM", branches: [[name: BRANCH]], extensions: [[$class: "WipeWorkspace"]], userRemoteConfigs: [[url: "https://github.com/brave/brave-browser.git"]]])
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
                                    Remove-Item -Recurse -Force ${GIT_CACHE_PATH}/*.lock
                                    \$ErrorActionPreference = "Stop"
                                    npm install --no-optional
                                    Import-Certificate -FilePath "${SIGN_WIDEVINE_CERT}" -CertStoreLocation "Cert:\\LocalMachine\\My"
                                    Import-PfxCertificate -FilePath "${KEY_PFX_PATH}" -CertStoreLocation "Cert:\\LocalMachine\\My" -Password (ConvertTo-SecureString -String "${AUTHENTICODE_PASSWORD_UNESCAPED}" -AsPlaintext -Force)
                                    New-Item -Force -ItemType directory -Path "src\\third_party\\widevine\\scripts"
                                    Copy-Item "C:\\jenkins\\signature_generator.py" -Destination "src\\third_party\\widevine\\scripts\\"
                                """
                            }
                        }
                        stage("init") {
                            when {
                                expression { return !fileExists("src/brave/package.json") || !SKIP_INIT }
                            }
                            steps {
                                powershell """
                                    Remove-Item -Recurse -Force src/brave
                                    \$ErrorActionPreference = "Stop"
                                    git -C vendor/depot_tools clean -fxd
                                    npm run init
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
                                            npm run lint -- --base=origin/${BASE_BRANCH}
                                            git -C src/brave checkout -q -
                                            git -C src/brave branch -D ${LINT_BRANCH}
                                        """
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
                            }
                        }
                        stage("audit-deps") {
                            steps {
                                timeout(time: 1, unit: "MINUTES") {
                                    script {
                                        try {
                                            powershell """
                                                \$ErrorActionPreference = "Stop"
                                                npm run audit_deps
                                            """
                                        }
                                        catch (ex) {
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("build") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                                    npm config --userconfig=.npmrc set brave_google_api_endpoint https://location.services.mozilla.com/v1/geolocate?key=
                                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                                    npm config --userconfig=.npmrc set google_api_endpoint safebrowsing.brave.com
                                    npm config --userconfig=.npmrc set google_api_key dummytoken
                                    npm run build -- ${BUILD_TYPE} --channel=${CHANNEL} ${SKIP_SIGNING}
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
                                            echo ex.toString()
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
                                            powershell """
                                                \$ErrorActionPreference = "Stop"
                                                npm run test -- brave_unit_tests ${BUILD_TYPE} --output brave_unit_tests.xml
                                            """
                                            xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: "src/brave_unit_tests.xml", skipNoTestFiles: false, stopProcessingIfError: true)])
                                        }
                                        catch (ex) {
                                            echo ex.toString()
                                            currentBuild.result = "UNSTABLE"
                                        }
                                    }
                                }
                            }
                        }
                        stage("dist") {
                            steps {
                                powershell """
                                    \$ErrorActionPreference = "Stop"
                                    (Get-Content src/brave/vendor/omaha/omaha/hammer-brave.bat) | % { \$_ -replace "10.0.15063.0\\\\", "" } | Set-Content src/brave/vendor/omaha/omaha/hammer-brave.bat
                                    npm run create_dist -- ${BUILD_TYPE} --channel=${CHANNEL} ${SKIP_SIGNING} --build_omaha --tag_ap=x64-${CHANNEL}
                                """
                            }
                        }
                        stage("archive") {
                            steps {
                                script {
                                    try {
                                        s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "brave_installer_*.exe", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                        s3Upload(acl: "Private", bucket: BRAVE_ARTIFACTS_S3_BUCKET, includePathPattern: "BraveBrowser*" + CHANNEL_CAPITALIZED + "Setup_*.exe", path: BUILD_TAG_SLASHED, workingDir: OUT_DIR)
                                    }
                                    catch (ex) {
                                        echo ex.toString()
                                        currentBuild.result = "UNSTABLE"
                                    }
                                }
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
                    slackSend(color: slackColorMap[currentBuild.currentResult], channel: env.SLACK_USERNAME, message: currentBuild.currentResult + " " + BUILD_TAG_SLASHED + " (<${BUILD_URL}/flowGraphTable/?auto_refresh=true|Open>)")
                }
            }
        }
    }
}

def setEnv() {
    CHANNEL = params.CHANNEL
    CHANNEL_CAPITALIZED = CHANNEL.equals("release") ? "" : CHANNEL.capitalize()
    CHANNEL_CAPITALIZED_BACKSLASHED_SPACED = CHANNEL.equals("release") ? "" : "\\ " + CHANNEL.capitalize()
    BUILD_TYPE = params.BUILD_TYPE
    WIPE_WORKSPACE = params.WIPE_WORKSPACE
    SKIP_INIT = params.SKIP_INIT
    DISABLE_SCCACHE = params.DISABLE_SCCACHE
    SKIP_SIGNING = params.SKIP_SIGNING ? "--skip_signing" : ""
    DEBUG = params.DEBUG
    OUT_DIR = "src/out/" + BUILD_TYPE
    BUILD_TAG_SLASHED = env.JOB_NAME + "/" + env.BUILD_NUMBER
    LINT_BRANCH = "TEMP_LINT_BRANCH_" + env.BUILD_NUMBER
    BRAVE_GITHUB_TOKEN = "brave-browser-releases-github"
    GITHUB_API = "https://api.github.com/repos/brave"
    GITHUB_CREDENTIAL_ID = "brave-builds-github-token-for-pr-builder"
    RUST_LOG = "sccache=warn"
    SKIP = false
    SKIP_ANDROID = false
    SKIP_IOS = false
    SKIP_LINUX = false
    SKIP_MACOS = false
    SKIP_WINDOWS = false
    BRANCH = env.BRANCH_NAME
    BASE_BRANCH = "master"
    if (env.CHANGE_BRANCH) {
        BRANCH = env.CHANGE_BRANCH
        BASE_BRANCH = env.CHANGE_TARGET
        def bbPrNumber = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls?head=brave:" + BRANCH, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)[0].number
        def bbPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls/" + bbPrNumber, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)
        SKIP = bbPrDetails.mergeable_state.equals("draft") || bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
        SKIP_ANDROID = bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-android") }.equals(1)
        SKIP_IOS = bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-ios") }.equals(1)
        SKIP_LINUX = bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-linux") }.equals(1)
        SKIP_MACOS = bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-macos") }.equals(1)
        SKIP_WINDOWS = bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-windows") }.equals(1)
        env.SLACK_USERNAME = readJSON(text: SLACK_USERNAME_MAP)[env.CHANGE_AUTHOR]
        if (env.SLACK_USERNAME) {
            slackSend(color: null, channel: env.SLACK_USERNAME, message: "STARTED " + BUILD_TAG_SLASHED + " (<${BUILD_URL}/flowGraphTable/?auto_refresh=true|Open>)")
        }
    }
    BRANCH_EXISTS_IN_BC = httpRequest(url: GITHUB_API + "/brave-core/branches/" + BRANCH, validResponseCodes: "100:499", authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).status.equals(200)
    if (BRANCH_EXISTS_IN_BC) {
        def bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls?head=brave:" + BRANCH, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)[0]
        if (bcPrDetails) {
            env.BC_PR_NUMBER = bcPrDetails.number
            bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls/" +  env.BC_PR_NUMBER, authentication: GITHUB_CREDENTIAL_ID, quiet: !DEBUG).content)
            BASE_BRANCH = bcPrDetails.base.ref
            SKIP = bcPrDetails.mergeable_state.equals("draft") || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
            SKIP_ANDROID = SKIP_ANDROID || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-android") }.equals(1)
            SKIP_IOS = SKIP_IOS || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-ios") }.equals(1)
            SKIP_LINUX = SKIP_LINUX || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-linux") }.equals(1)
            SKIP_MACOS = SKIP_MACOS || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-macos") }.equals(1)
            SKIP_WINDOWS = SKIP_WINDOWS || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-windows") }.equals(1)
        }
    }
}

def checkAndAbortBuild() {
    if (SKIP) {
        echo "Aborting build as PR is in draft or has \"CI/skip\" label"
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
                echo "Use https://github.com/brave/brave-core/compare/" + BASE_BRANCH + "..." + BRANCH + " to create PR"
            }
            SKIP = true
            stopCurrentBuild()
        }
    }
    def bb_package_json = readJSON(text: httpRequest(url: "https://raw.githubusercontent.com/brave/brave-browser/" + BRANCH + "/package.json", quiet: !DEBUG).content)
    def bb_version = bb_package_json.version
    def bc_branch = bb_package_json.config.projects["brave-core"].branch
    if (BRANCH_EXISTS_IN_BC) {
        bc_branch = BRANCH
    }
    def bc_version = readJSON(text: httpRequest(url: "https://raw.githubusercontent.com/brave/brave-core/" + bc_branch + "/package.json", quiet: !DEBUG).content).version
    if (bb_version != bc_version) {
        echo "Version mismatch between brave-browser (" + BRANCH + "/" + bb_version + ") and brave-core (" + bc_branch + "/" + bc_version + ") in package.json"
        SKIP = true
        stopCurrentBuild()
    }
    if (!SKIP) {
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
