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
            git credentialsId: 'gitcreds', url: 'https://github.com/swamy59/todo-app'
        }
        stage('Install dependencies'){
            sh 'npm install'
        }
        stage('build'){
            sh 'npm run bulid'
        }
        stage('file'){
            docker.build("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}", "./web") 
            }
        stage("push"){
            docker.withRegistry('swamy59', 'Dockercreds') {
                        docker.image("${env.REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}").push()
        }

        }
        
    }
}
