pipeline {
  stages {
    stage('Build') {
      parallel {
        stage('Build Node') {
          agent {
            label 'build-node'
          }
          steps {
            sh 'yarn'
            sh 'npm run build-app'
          }
        }
      }
    }
  }
}
