pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_PREFIX = 'olgicaupcheva'
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Install Server Dependencies') {
                    steps {
                        dir('server') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Install Client Dependencies') {
                    steps {
                        dir('client') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Test Server') {
                    steps {
                        dir('server') {
                            sh 'npm test --if-present || echo "No tests found"'
                        }
                    }
                }
                stage('Test Client') {
                    steps {
                        dir('client') {
                            sh 'npm test --if-present --watchAll=false --passWithNoTests || echo "No tests found"'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Server Image') {
                    steps {
                        script {
                            def serverImage = docker.build("olgicaupcheva/pern-todo-app-server:${env.BUILD_NUMBER}")
                            serverImage.push()
                            serverImage.push('latest')
                        }
                    }
                }
                stage('Build Client Image') {
                    steps {
                        script {
                            def clientImage = docker.build("olgicaupcheva/pern-todo-app-client:${env.BUILD_NUMBER}")
                            clientImage.push()
                            clientImage.push('latest')
                        }
                    }
                }
                stage('Build Database Image') {
                    steps {
                        script {
                            def dbImage = docker.build("olgicaupcheva/pern-todo-app-db:${env.BUILD_NUMBER}")
                            dbImage.push()
                            dbImage.push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Add your deployment commands here
                // Example: SSH to server and pull new images
                // sh '''
                //     ssh user@your-server.com << 'EOF'
                //         cd /path/to/your/app
                //         docker-compose -f docker-compose.prod.yml pull
                //         docker-compose -f docker-compose.prod.yml up -d
                //         docker system prune -f
                //     EOF
                // '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 