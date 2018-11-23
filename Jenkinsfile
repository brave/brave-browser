pipeline {
    agent {
        node {
            label 'darwin-slow'
            // customWorkspace '/Users/jenkins/jenkins/workspace/temp/'
        }
    }
    stages {
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
