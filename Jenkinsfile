pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main' , credentialsId: 'github-token', url: 'https://github.com/skharshad/blue-green-deployment.git'
            }
        }

        stage('Build Blue App') {
            steps {
                sh 'docker build -t blue-app ./blue-app'
            }
        }

        stage('Build Green App') {
            steps {
                sh 'docker build -t green-app ./green-app'
            }
        }

        stage('Start Blue App') {
            steps {
                sh 'docker run -d --name blue-app -p 8081:80 blue-app || echo "Blue app may already be running"'
            }
        }

        stage('Start Green App') {
            steps {
                sh 'docker run -d --name green-app -p 8082:80 green-app || echo "Green app may already be running"'
            }
        }

        stage('Deploy Nginx (Blue Route)') {
            steps {
                sh 'docker stop nginx || true && docker rm nginx || true'
                sh 'docker run -d --name nginx -p 80:80 -v $PWD/nginx/blue.conf:/etc/nginx/nginx.conf:ro nginx'
            }
        }
    }
}

