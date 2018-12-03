pipeline {
    agent {
        node {
            label 'darwin-slow'
            // customWorkspace '/Users/jenkins/jenkins/workspace/temp/'
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
                // script {
                //     currentBuild.displayName = "master"
                //     currentBuild.description = "version"
                // }
            }
        }
        // stage('init') {
        //     steps {
        //         sh 'yarn run init'
        //     }
        // }
        // TODO do init for first time, sync after
        // stage('sync') {
        //     steps {
        //         sh 'npm run sync --all'
        //     }
        // }
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

                """
                    // yarn run build Release --debug_build=false --official_build=true --channel=${CHANNEL}
            }
        }
        stage('test-security') {
            steps {
                script {
                    try {
                        sh 'exit 1'
                        // sh 'npm run test-security -- --output_path="src/out/Release/Brave\\ Browser\\ Dev.app/Contents/MacOS/Brave\\ Browser\\ Dev"'
                    }
                    catch (exc) {
                        echo "${exc}"
                        currentBuild.result = 'UNSTABLE'
                        // throw exc
                    }
                }
            }
        }
        stage('test-unit') {
            steps {
                script {
                    try {
                        sh 'exit 1'
                        // sh 'npm run test -- brave_unit_tests Release --output brave_unit_tests.xml'
                    }
                    catch (exc) {
                        echo "${exc}"
                        currentBuild.result = 'UNSTABLE'
                        // throw exc
                    }
                }
            }
        }
        stage('test-browser') {
            steps {
                script {
                    try {
                        sh 'exit 1'
                        // sh 'npm run test -- brave_browser_tests Release --output brave_browser_tests.xml'
                    }
                    catch (exc) {
                        echo "${exc}"
                        currentBuild.result = 'UNSTABLE'
                        // throw exc
                    }
                }
            }
        }                
    }
}
