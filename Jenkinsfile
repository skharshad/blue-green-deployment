cat <<EOF > Jenkinsfile
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/your-username/blue-green-deployment.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Alternate Version') {
            steps {
                script {
                    def active = sh(script: "curl -s http://localhost | grep BLUE", returnStatus: true) == 0 ? "blue" : "green"
                    def next = active == "blue" ? "green" : "blue"
                    sh "docker-compose up -d \${next}"
                    sleep 5
                    sh "sed -i 's/proxy_pass http:\\/\\/\\${active}/proxy_pass http:\\/\\/\\${next}/' nginx/default.conf"
                    sh "docker-compose build nginx && docker-compose up -d nginx"
                }
            }
        }
    }
}
EOF
