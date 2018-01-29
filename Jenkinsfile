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
            sh 'npm run test-karma'
            step([$class: "TapPublisher", testResults: "packages/karma-integration/build/*.tap"])
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
            bat 'npm i --ignore-scripts'
            bat 'npm run test-server'
            step([$class: "MSTestPublisher", testResultsFile: "server/TestResults/**/*.trx", failOnError: true, keepLongStdio: true])
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
            bat 'npm i --ignore-scripts'
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
