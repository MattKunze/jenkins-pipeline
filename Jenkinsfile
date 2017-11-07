pipeline {
  agent none
  stages {
    stage('Build') {
      parallel {
        stage('Build Node') {
          agent {
            label 'build-node'
          }
          steps {
            sh 'npm i'
            sh 'npm run build-app'
          }
          stage('Test Node') {
            steps {
              sh 'npm run test-app'
            }
          }
        }
      }
    }
  }
}
