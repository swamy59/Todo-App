pipeline{
    agent any
    tools {
        nodejs 'NodeJs'
    }
    environment {
        IMAGE_NAME = "threed"
        REGISTRY = "swamy59"
        VERSION = "1.0.${env.BUILD_NUMBER}"
    }

    stages{
        stage('checkout'){
            steps{
                git credentialsId: 'gitcreds', url: 'https://github.com/swamy59/todo-app'
            }
        }
        stage('file'){
            steps{
                script{
                    docker.build("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}","./web")
                }
            } 
            }
        stage("push"){
            steps{
                script{
                    docker.withRegistry('https://index.docker.io/v1/','dockercreds') {
                        docker.image("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}").push()
                    }
                }
            }
        }
        
    }
}
