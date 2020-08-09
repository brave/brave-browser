pipeline {
    agent none
    options {
        ansiColor('xterm')
        timeout(time: 6, unit: 'HOURS')
        timestamps()
    }
    parameters {
        choice(name: 'CHANNEL', choices: ['nightly', 'dev', 'beta', 'release', 'development'])
        choice(name: 'BUILD_TYPE', choices: ['Release', 'Debug'])
        choice(name: 'BUILD_STATUS', choices: ['', 'SUCCESS', 'FAILURE', 'UNSTABLE', 'ABORTED'])
        booleanParam(name: 'WIPE_WORKSPACE', defaultValue: false)
        booleanParam(name: 'SKIP_INIT', defaultValue: false)
        booleanParam(name: 'DISABLE_SCCACHE', defaultValue: false)
        booleanParam(name: 'SKIP_SIGNING', defaultValue: true)
        booleanParam(name: 'DCHECK_ALWAYS_ON', defaultValue: true)
    }
    stages {
        stage('build') {
            agent { label 'master' }
            steps {
                script {
                    GITHUB_API = 'https://api.github.com/repos/brave'
                    REPO = JOB_NAME.substring(0, JOB_NAME.indexOf('-build-pr'))
                    OTHER_REPO = REPO.equals('brave-browser') ? 'brave-core' : 'brave-browser'
                    PLATFORM = JOB_NAME.substring(JOB_NAME.indexOf('-build-pr') + 10, JOB_NAME.indexOf('/PR-'))
                    PIPELINE_NAME = 'pr-brave-browser-' + CHANGE_BRANCH.replace('/', '-') + '-' + PLATFORM

                    if (params.BUILD_STATUS) {
                        if (Jenkins.instance.getItemByFullName(JOB_NAME).getLastBuild().getCause(hudson.model.Cause$UpstreamCause) == null) {
                            echo 'Aborting build as it has been started manually with BUILD_STATUS set'
                            currentBuild.result = 'ABORTED'
                            return
                        }
                        else {
                            echo "Setting other PR build status to ${params.BUILD_STATUS}"
                            currentBuild.result = params.BUILD_STATUS
                            return
                        }
                    }

                    withCredentials([usernamePassword(credentialsId: 'brave-builds-github-token-for-pr-builder', usernameVariable: 'PR_BUILDER_USER', passwordVariable: 'PR_BUILDER_TOKEN')]) {
                        def prDetails = readJSON(text: httpRequest(url: GITHUB_API + '/' + REPO + '/pulls?head=brave:' + CHANGE_BRANCH, customHeaders: [[name: 'Authorization', value: 'token ' + PR_BUILDER_TOKEN]]).content)[0]
                        SKIP = prDetails.draft.equals(true) || prDetails.labels.count { label -> label.name.equalsIgnoreCase('CI/skip') }.equals(1) || prDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-${PLATFORM}") }.equals(1)
                        RUN_NETWORK_AUDIT = prDetails.labels.count { label -> label.name.equalsIgnoreCase('CI/run-network-audit') }.equals(1)
                        def branchExistsInOtherRepo = httpRequest(url: GITHUB_API + '/' + OTHER_REPO + '/branches/' + CHANGE_BRANCH, validResponseCodes: '100:499', customHeaders: [[name: 'Authorization', value: 'token ' + PR_BUILDER_TOKEN]]).status.equals(200)
                        if (branchExistsInOtherRepo) {
                            def otherPrDetails = readJSON(text: httpRequest(url: GITHUB_API + '/' + OTHER_REPO + '/pulls?head=brave:' + CHANGE_BRANCH, customHeaders: [[name: 'Authorization', value: 'token ' + PR_BUILDER_TOKEN]]).content)[0]
                            if (otherPrDetails) {
                                env.OTHER_PR_NUMBER = otherPrDetails.number
                                SKIP = SKIP || otherPrDetails.draft.equals(true) || otherPrDetails.labels.count { label -> label.name.equalsIgnoreCase('CI/skip') }.equals(1) || otherPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-${PLATFORM}") }.equals(1)
                                RUN_NETWORK_AUDIT = RUN_NETWORK_AUDIT || otherPrDetails.labels.count { label -> label.name.equalsIgnoreCase('CI/run-network-audit') }.equals(1)
                            }
                        }
                    }

                    if (SKIP) {
                        echo "Aborting build as PRs are either in draft or have a skip label (CI/skip or CI/skip-${PLATFORM})"
                        currentBuild.result = 'ABORTED'
                        return
                    }

                    for (build in Jenkins.instance.getItemByFullName(JOB_NAME).builds) {
                        if (build.isBuilding() && build.getNumber() < BUILD_NUMBER.toInteger()) {
                            echo 'Aborting older running build ' + build
                            build.doStop()
                        }
                    }

                    jobDsl(scriptText: """
                        pipelineJob('${PIPELINE_NAME}') {
                            // this list has to match the parameters in the Jenkinsfile from devops repo
                            parameters {
                                choiceParam('CHANNEL', ['nightly', 'dev', 'beta', 'release', 'development'])
                                choiceParam('BUILD_TYPE', ['Release', 'Debug'])
                                booleanParam('WIPE_WORKSPACE', false)
                                booleanParam('SKIP_INIT', false)
                                booleanParam('DISABLE_SCCACHE', false)
                                booleanParam('SKIP_SIGNING', true)
                                booleanParam('DCHECK_ALWAYS_ON', true)
                                booleanParam('RUN_NETWORK_AUDIT', false)
                                stringParam('BRANCH', '${CHANGE_BRANCH}')
                                stringParam('PLATFORM', '${PLATFORM}')
                            }
                            definition {
                                cpsScm {
                                    scm {
                                        git {
                                            remote {
                                                credentials('brave-builds-github-token-for-pr-builder')
                                                github('brave/devops', 'https')
                                            }
                                            branch('master')
                                        }
                                    }
                                    scriptPath('jenkins/jobs/browser/Jenkinsfile')
                                    lightweight()
                                }
                            }
                        }
                    """)

                    params = [
                        string(name: 'CHANNEL', value: params.CHANNEL),
                        string(name: 'BUILD_TYPE', value: params.BUILD_TYPE),
                        booleanParam(name: 'WIPE_WORKSPACE', value: params.WIPE_WORKSPACE),
                        booleanParam(name: 'SKIP_INIT', value: params.SKIP_INIT),
                        booleanParam(name: 'DISABLE_SCCACHE', value: params.DISABLE_SCCACHE),
                        booleanParam(name: 'SKIP_SIGNING', value: params.SKIP_SIGNING),
                        booleanParam(name: 'DCHECK_ALWAYS_ON', value: params.DCHECK_ALWAYS_ON),
                        booleanParam(name: 'RUN_NETWORK_AUDIT', value: RUN_NETWORK_AUDIT),
                        string(name: 'BRANCH', value: CHANGE_BRANCH),
                        string(name: 'PLATFORM', value: PLATFORM)
                    ]

                    currentBuild.result = build(job: PIPELINE_NAME, parameters: params, propagate: false).result
                    if (env.OTHER_PR_NUMBER) {
                        build(job: OTHER_REPO + '-build-pr-' + PLATFORM + '/PR-' + env.OTHER_PR_NUMBER, parameters: [string(name: 'BUILD_STATUS', value: currentBuild.result)], propagate: false)
                    }
                }
            }
        }
    }
}
