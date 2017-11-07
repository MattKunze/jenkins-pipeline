pipeline {
  agent none
  stages {
    stage('Build') {
      parallel {
        stage('Node') {
          agent {
            label 'build-node'
          }
          steps {
            stage('Build') {
              steps {
                sh 'npm i'
                sh 'npm run build-app'
              }
            }
            stage('Test') {
              steps {
                sh 'npm run test:ci'
              }
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
          }
        }
      }
    }
  }
}
