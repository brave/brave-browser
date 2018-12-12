pipeline {
    options {
        // disable concurrent build per branch
        disableConcurrentBuilds()
        // 5m quiet period as described at https://jenkins.io/blog/2010/08/11/quiet-period-feature/
        quietPeriod(300)
        // abort long running builds
        timeout(time: 4, unit: 'HOURS')
        // add timestamps to console log
        timestamps()
    }
    agent {
        node {
            // label of node on which to build
            label 'darwin-new'
        }
    }
    environment {
        CHANNEL = 'dev'
        REFERRAL_API_KEY = credentials('REFERRAL_API_KEY')
        npm_config_brave_google_api_key = credentials('npm_config_brave_google_api_key')
    }
    stages {
        stage('install') {
            steps {
                sh 'yarn install'
            }
        }
        stage('init') {
            when {
                expression { return fileExists('src/.gitkeep') }
            }
            steps {
                sh 'yarn run init'
            }
        }        
        stage('sync') {
            when {
                expression { return fileExists('src/brave/package.json') }
            }
            steps {
                sh 'npm run sync --all'
            }
        }
        stage('build') {
            steps {
                sh """
                    export npm_config_brave_google_api_endpoint="https://location.services.mozilla.com/v1/geolocate?key="
                    export npm_config_google_api_endpoint="safebrowsing.brave.com"
                    export npm_config_google_api_key="dummytoken"

                    npm config set brave_google_api_endpoint "https://location.services.mozilla.com/v1/geolocate?key="
                    npm config set brave_google_api_key ${npm_config_brave_google_api_key}
                    npm config set google_api_endpoint "safebrowsing.brave.com"
                    npm config set google_api_key "dummytoken"

                    npm config set brave_referrals_api_key=${REFERRAL_API_KEY}

                    yarn run build Release --debug_build=false --official_build=true --channel=${CHANNEL}
                """
            }
        }
        stage('test-security') {
            steps {
                script {
                    try {
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
                    yarn run create_dist Release --debug_build=false --official_build=true --channel=${CHANNEL} --skip_signing
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
