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
            sh 'npm run test-app'
          }
          post {
            always {
              junit 'packages/node-app/*.xml'
            }
            success {
              stash includes 'packages/node-app/build/**/*', name: 'node-results'
            }
            unstable {
              stash includes 'packages/node-app/build/**/*', name: 'node-results'
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
    stage('Archive') {
      agent {
          label: 'build-node'
      }
      steps {
        unstash 'node-results'
        archiveArtifacts 'packages/node-app/build/**/*'
      }
    }
  }
}
