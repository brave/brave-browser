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
                // sh 'npm install'
                // sh 'npm run init'
                sh 'npm run build Release --debug_build=false --official_build=true --channel=dev'
            }
        }
    }
}
