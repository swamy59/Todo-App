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
        stage('Install dependencies'){
            steps{
                sh '''
                cd web
                npm install'''
            }
        }
        stage('build'){
            steps{
                sh 'npm run bulid'
            }
        }
        stage('file'){
            steps{
                script{
                    docker.build("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}")
                }
            } 
            }
        stage("push"){
            steps{
                script{
                    docker.withRegistry('swamy59', 'Dockercreds') {
                        docker.image("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}").push()
                    }
                }
            }
        }
        
    }
}
