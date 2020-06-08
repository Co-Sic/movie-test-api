node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build("mihaiplasoianu/movie-test-api")
    }

    stage('Push image') {
        docker.withRegistry('https://index.docker.io/v1/', '7306d2ab-c806-4aa9-8062-312ff5c5d283') {
            app.push("${env.BUILD_ID}")
            app.push("latest")
        }
    }
}
