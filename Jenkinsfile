pipeline {
    options {
        // disable concurrent build per branch
        disableConcurrentBuilds()
        // 15m quiet period as described at https://jenkins.io/blog/2010/08/11/quiet-period-feature/
        quietPeriod(900)
        // abort long running builds
        timeout(time: 4, unit: 'HOURS')
        // add timestamps to console log
        timestamps()
    }
    agent {
        node {
            // label of node on which to build
            label 'darwin-ci'
        }
    }
    environment {
        CHANNEL = 'dev'
        GIT_CACHE_PATH = "${HOME}/cache"
        REFERRAL_API_KEY = credentials('REFERRAL_API_KEY')
        BRAVE_GOOGLE_API_KEY = credentials('npm_config_brave_google_api_key')
    }
    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        stage('init') {
            when {
                not {
                    expression { return fileExists('src/brave/package.json') }
                }
            }
            steps {
                sh 'npm run init'
            }
        }
        stage('sync') {
            steps {
                sh 'npm run sync --all'
            }
        }
        stage('build') {
            steps {
                sh """
                    npm config --userconfig=.npmrc set brave_referrals_api_key ${REFERRAL_API_KEY}
                    npm config --userconfig=.npmrc set brave_google_api_endpoint "https://location.services.mozilla.com/v1/geolocate?key="
                    npm config --userconfig=.npmrc set brave_google_api_key ${BRAVE_GOOGLE_API_KEY}
                    npm config --userconfig=.npmrc set google_api_endpoint "safebrowsing.brave.com"
                    npm config --userconfig=.npmrc set google_api_key "dummytoken"
                    npm config --userconfig=.npmrc set sccache "sccache"

                    npm run build -- Release --channel=${CHANNEL} --debug_build=false --official_build=true
                """
            }
        }
        stage('test-security') {
            steps {
                script {
                    try {
                        // TODO adapt path for different channel
                        sh 'npm run test-security -- --output_path="src/out/Release/Brave\\ Browser\\ Dev.app/Contents/MacOS/Brave\\ Browser\\ Dev"'
                    }
                    catch (ex) {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        stage('test-unit') {
            steps {
                script {
                    try {
                        sh 'npm run test -- brave_unit_tests Release --output brave_unit_tests.xml'
                    }
                    catch (ex) {
                        currentBuild.result = 'UNSTABLE'
                    }
                    xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: 'src/brave_unit_tests.xml', skipNoTestFiles: false, stopProcessingIfError: true)])
                }
            }
        }
        stage('test-browser') {
            steps {
                script {
                    try {
                        sh 'npm run test -- brave_browser_tests Release --output brave_browser_tests.xml'
                    }
                    catch (ex) {
                        currentBuild.result = 'UNSTABLE'
                    }
                    xunit([GoogleTest(deleteOutputFiles: true, failIfNotNew: true, pattern: 'src/brave_browser_tests.xml', skipNoTestFiles: false, stopProcessingIfError: true)])
                }
            }
        }
        stage('dist') {
            steps {
                sh """
                    npm run create_dist -- Release --channel=${CHANNEL} --debug_build=false --official_build=true --skip_signing
                """
            }
            post {
                always {
                    archiveArtifacts artifacts: 'src/out/Release/**/*.dmg', fingerprint: true
                }
            }
        }
    }
}
