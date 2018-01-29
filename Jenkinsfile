pipeline {
  agent none
  stages {
    stage('Test') {
      parallel {
        stage('Test Node') {
          agent {
            label 'build-node'
          }
          steps {
            sh 'npm i'
            sh 'npm run test-app'
          }
          post {
            always {
              junit 'packages/node-app/*.xml'
            }
          }
        }
        stage('Test Windows') {
          agent {
            label 'build-vs2k8'
          }
          steps {
            bat 'npm i'
            bat 'npm run test-server'
            mstest testResultsFile: "server/TestResults/**/*.trx", keepLongStdio: true
          }
          post {
            always {
              junit 'server/TestResults/**.xml'
            }
          }
        }
      }
    }
    stage('Build') {
      when {
        anyOf {
          branch 'master'; branch 'qa'; branch 'dev'
        }
      }
      parallel {
        stage('Build Node') {
          agent {
            label 'build-node'
          }
          steps {
            sh 'npm i'
            sh 'npm run build-app'
          }
          post {
            success {
              stash includes: 'packages/node-app/build/**/*', name: 'node-results'
            }
            unstable {
              stash includes: 'packages/node-app/build/**/*', name: 'node-results'
            }
          }
        }
        stage('Build Windows') {
          agent {
            label 'build-vs2k8'
          }
          steps {
            bat 'npm i'
            bat 'npm run build-server'
          }
        }
      }
    }
    stage('Archive') {
      when {
        anyOf {
          branch 'master'; branch 'qa'; branch 'dev'
        }
      }
      agent {
        label 'build-node'
      }
      steps {
        unstash 'node-results'
        archiveArtifacts 'packages/node-app/build/**/*'
      }
    }
  }
}
