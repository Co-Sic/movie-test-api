pipeline {
    agent {
        docker { image 'node:13' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
            }
        }
    }
}
