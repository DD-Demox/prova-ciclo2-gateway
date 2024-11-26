pipeline {
    agent any
    stages {
        stage('Verificar Repositório') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], useRemoteConfigs:[[url: 'https://github.com/DD-Demox/prova-ciclo2-gateway.git']]])
            }
        }
        
        stage('Construir Imagem Docker') {
            steps {
                script {
                    def appName = 'armando-asch-ciclo2-gateway'
                    def imageTag = "${appName}:${env.BUILD_ID}"

                    // Construir a imagem Docker
                    bat "docker build -t ${imageTag} ."
                }
            }
        }

        stage('Fazer Deploy') {
            steps {
                script {
                    def appName = 'armando-asch-ciclo2-gateway'
                    def imageTag = "${appName}:${env.BUILD_ID}"
                    // Parar e remover o container existente, se houver
                    // bat "docker stop ${appName} || true"
                    // bat "docker rm ${appName} || true"
                    bat "docker ps -q --filter 'name=${appName}' | grep -q . && docker stop ${appName} && docker rm -fv ${appName}"
                    // Executar o novo container
                    bat "docker run -d --name ${appName} -p 3000:3000 ${imageTag}"
                }
            }
        }
    }
    post {
        success {
            echo 'Deploy realizado com sucesso!'
        }
        failure {
            echo 'Houve um erro durante o deploy.'
        }
    }
}
