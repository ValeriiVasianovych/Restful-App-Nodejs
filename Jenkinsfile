pipeline {
	agent {
		label 'Jenkins-Agent'
	}
	options {
		buildDiscarder(logRotator(numToKeepStr: '5'))
	}
	environment {
		AWS_CREDENTIALS = credentials('aws-credential')
		AWS_REGION = 'us-east-1'
		S3_BUCKET = 'aws-s3-nodejs-app-version'
		APPLICATION_NAME = 'Restful-App-Nodejs'
	}

	stages {
		stage('Checkout') {
			steps {
				git branch: 'master', url: 'https://github.com/ValeriiVasianovych/Restful-App-Nodejs.git'
			}
		}
		stage('Create archive') {
			steps {
				sh 'sudo apt-get install zip -y'
				sh 'zip -r ${APPLICATION_NAME}.zip .'
		}
		stage('Upload to S3') {
			steps {
				withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-credential', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
					sh "aws s3 cp ${APPLICATION_NAME}.zip s3://${S3_BUCKET}/${APPLICATION_NAME}.zip"
				}
				sh 'echo "Uploaded to S3"'
			}
		}
	}
}
