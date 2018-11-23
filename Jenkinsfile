pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'git@github.com:brave/brave-browser.git']]])
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npm run init'
                sh 'pwd'
                sh 'ls -la'
            }
        }
    }
}
