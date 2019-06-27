#!/usr/bin/env groovy

node {
    stage('checkout') {
	    env.NODEJS_HOME = "${tool 'node10'}"
	    env.M2_HOME = "${tool 'maven-3.6.0'}"
		env.JAVA_HOME = "${tool 'jdk8'}"
		env.PATH="${env.JAVA_HOME}/bin:${env.NODEJS_HOME}/bin:${env.M2_HOME}/bin:${env.PATH}"
		checkout scm
    }

    stage('install') {
        sh "npm install"
		sh "npm run build"
		sh "mkdir -p ../tmp/muf-fe"
		sh "rsync -rtvu --delete build/www/ ../tmp/muf-fe/"
    }

	stage('build gateway') {
		build job: 'muf-gw', propagate: true, wait: false
	}
}
