pipeline {
  agent none
  stages {
    stage('Build') {
      parallel {
        stage('Node') {
          agent {
            label 'build-node'
          }
          stages {
            stage('Build') {
              steps {
                sh 'npm i'
                sh 'npm run build-app'
                sh 'npm run test-app'
              }
            }
            stage('Test') {
              steps {
                sh 'npm run test-app'
              }
            }
          }
          post {
            always {
              junit 'packages/node-app/*.xml'
            }
          }
        }
        stage('Build Windows') {
          agent {
            label 'build-vs2k8'
          }
          steps {
            bat 'npm i'
            bat 'npm run build-app'
            bat 'npm run test-app'
          }
          post {
            always {
              junit 'packages/node-app/*.xml'
            }
          }
        }
      }
    }
  }
}
