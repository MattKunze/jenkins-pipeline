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
        }
        stage('Build Windows') {
          agent {
            label 'build-vs2k8'
          }
          steps {
            sh 'npm i'
            sh 'npm run build-app'
          }
        }
      }
    }
  }
}
