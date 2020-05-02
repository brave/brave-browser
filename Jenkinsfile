pipeline {
    agent none
    options {
        ansiColor("xterm")
        timeout(time: 6, unit: "HOURS")
        timestamps()
    }
    parameters {
        choice(name: "CHANNEL", choices: ["nightly", "dev", "beta", "release", "development"])
        choice(name: "BUILD_TYPE", choices: ["Release", "Debug"])
        booleanParam(name: "WIPE_WORKSPACE", defaultValue: false)
        booleanParam(name: "SKIP_INIT", defaultValue: false)
        booleanParam(name: "DISABLE_SCCACHE", defaultValue: false)
        booleanParam(name: "SKIP_SIGNING", defaultValue: true)
        booleanParam(name: "DCHECK_ALWAYS_ON", defaultValue: true)
    }
    environment {
        GITHUB_CREDENTIAL_ID = "brave-builds-github-token-for-pr-builder"
        SLACK_USERNAME_MAP = credentials("github-to-slack-username-map")
    }
    stages {
        stage("env") {
            steps {
                withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIAL_ID}", usernameVariable: "PR_BUILDER_USER", passwordVariable: "PR_BUILDER_TOKEN")]) {
                    setEnv()
                }
            }
        }
        stage("abort") {
            steps {
                checkAndAbortBuild()
            }
        }
        stage("build-all") {
            agent { label "master" }
            when {
                beforeAgent true
                expression { !SKIP }
            }
            steps {
                startBraveBrowserBuild()
            }
        }
    }
}

@NonCPS
def stopCurrentBuild() {
    Jenkins.instance.getItemByFullName(JOB_NAME).getLastBuild().doStop()
    sleep(time: 1, unit: "MINUTES")
}

@NonCPS
def isStartedManually() {
    return Jenkins.instance.getItemByFullName(JOB_NAME).getLastBuild().getCause(hudson.model.Cause$UpstreamCause) == null
}

@NonCPS
def getBuilds() {
    return Jenkins.instance.getItemByFullName(JOB_NAME).builds
}

def setEnv() {
    CHANNEL = params.CHANNEL
    BUILD_TYPE = params.BUILD_TYPE
    WIPE_WORKSPACE = params.WIPE_WORKSPACE
    SKIP_INIT = params.SKIP_INIT
    DISABLE_SCCACHE = params.DISABLE_SCCACHE
    SKIP_SIGNING = params.SKIP_SIGNING
    DCHECK_ALWAYS_ON = params.DCHECK_ALWAYS_ON
    RUN_NETWORK_AUDIT = false
    SKIP = false
    SKIP_ANDROID = false
    SKIP_IOS = false
    SKIP_LINUX = false
    SKIP_MACOS = false
    SKIP_WINDOWS = false
    BASE_BRANCH = "master"
    BRAVE_CORE_BRANCH = "master"
    BRAVE_BROWSER_BRANCH = BRANCH_NAME
    GITHUB_API = "https://api.github.com/repos/brave"
    if (CHANGE_BRANCH) {
        BASE_BRANCH = CHANGE_TARGET
        BRAVE_CORE_BRANCH = CHANGE_TARGET
        BRAVE_BROWSER_BRANCH = CHANGE_BRANCH
        def braveBrowserPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls?head=brave:" + BRAVE_BROWSER_BRANCH, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]]).content)[0]
        SKIP = braveBrowserPrDetails.mergeable_state.equals("draft") || braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
        SKIP_ANDROID = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-android") }.equals(1)
        SKIP_IOS = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-ios") }.equals(1)
        SKIP_LINUX = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-linux") }.equals(1)
        SKIP_MACOS = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-macos") }.equals(1)
        SKIP_WINDOWS = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-windows") }.equals(1)
        RUN_NETWORK_AUDIT = braveBrowserPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/run-network-audit") }.equals(1)
        SLACK_USERNAME = readJSON(text: SLACK_USERNAME_MAP)[braveBrowserPrDetails.user.login]
        BRANCH_PRODUCTIVITY_HOMEPAGE = "https://github.com/brave/brave-browser/pull/${braveBrowserPrDetails.number}"
        BRANCH_PRODUCTIVITY_NAME = "Brave Browser PR #${braveBrowserPrDetails.number}"
        BRANCH_PRODUCTIVITY_DESCRIPTION = braveBrowserPrDetails.title
        BRANCH_PRODUCTIVITY_USER = braveBrowserPrDetails.user.login
        def branchExistsInBraveCore = httpRequest(url: GITHUB_API + "/brave-core/branches/" + BRAVE_BROWSER_BRANCH, validResponseCodes: "100:499", customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]]).status.equals(200)
        if (branchExistsInBraveCore) {
            BRAVE_CORE_BRANCH = BRAVE_BROWSER_BRANCH
            def braveCorePrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls?head=brave:" + BRAVE_CORE_BRANCH, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]]).content)[0]
            if (braveCorePrDetails) {
                SKIP = SKIP || braveCorePrDetails.mergeable_state.equals("draft") || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
                SKIP_ANDROID = SKIP_ANDROID || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-android") }.equals(1)
                SKIP_IOS = SKIP_IOS || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-ios") }.equals(1)
                SKIP_LINUX = SKIP_LINUX || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-linux") }.equals(1)
                SKIP_MACOS = SKIP_MACOS || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-macos") }.equals(1)
                SKIP_WINDOWS = SKIP_WINDOWS || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip-windows") }.equals(1)
                RUN_NETWORK_AUDIT = RUN_NETWORK_AUDIT || braveCorePrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/run-network-audit") }.equals(1)
            }
        }
    }
}

def checkAndAbortBuild() {
    if (SKIP) {
        echo "Aborting build as PR is in draft or has \"CI/skip\" label"
        stopCurrentBuild()
    }
    else {
        for (build in getBuilds()) {
            if (build.isBuilding() && build.getNumber() < BUILD_NUMBER.toInteger()) {
                echo "Aborting older running build " + build
                build.doStop()
            }
        }
    }
}

def startBraveBrowserBuild() {
    PIPELINE_NAME = "pr-brave-browser-" + BRAVE_BROWSER_BRANCH.replace('/', '-')
    jobDsl(scriptText: """
        pipelineJob("${PIPELINE_NAME}") {
            // this list has to match the parameters in the Jenkinsfile from devops repo
            parameters {
                choiceParam("CHANNEL", ["nightly", "dev", "beta", "release", "development"])
                choiceParam("BUILD_TYPE", ["Release", "Debug"])
                booleanParam("WIPE_WORKSPACE", false)
                booleanParam("SKIP_INIT", false)
                booleanParam("DISABLE_SCCACHE", false)
                booleanParam("SKIP_SIGNING", true)
                booleanParam("DCHECK_ALWAYS_ON", true)
                booleanParam("RUN_NETWORK_AUDIT", false)
                booleanParam("SKIP_ANDROID", false)
                booleanParam("SKIP_IOS", false)
                booleanParam("SKIP_LINUX", false)
                booleanParam("SKIP_MACOS", false)
                booleanParam("SKIP_WINDOWS", false)
                stringParam("BRAVE_BROWSER_BRANCH", "master")
                stringParam("BRAVE_CORE_BRANCH", "master")
                stringParam("BASE_BRANCH", "master")
                stringParam("SLACK_USERNAME", "")
                stringParam("SLACK_BUILDS_CHANNEL", "")
                stringParam("BRANCH_PRODUCTIVITY_HOMEPAGE", "")
                stringParam("BRANCH_PRODUCTIVITY_NAME", "")
                stringParam("BRANCH_PRODUCTIVITY_DESCRIPTION", "")
                stringParam("BRANCH_PRODUCTIVITY_USER", "")
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
        string(name: "CHANNEL", value: CHANNEL),
        string(name: "BUILD_TYPE", value: BUILD_TYPE),
        booleanParam(name: "WIPE_WORKSPACE", value: WIPE_WORKSPACE),
        booleanParam(name: "SKIP_INIT", value: SKIP_INIT),
        booleanParam(name: "DISABLE_SCCACHE", value: DISABLE_SCCACHE),
        booleanParam(name: "SKIP_SIGNING", value: SKIP_SIGNING),
        booleanParam(name: "DCHECK_ALWAYS_ON", value: DCHECK_ALWAYS_ON),
        booleanParam(name: "RUN_NETWORK_AUDIT", value: RUN_NETWORK_AUDIT),
        booleanParam(name: "SKIP_ANDROID", value: SKIP_ANDROID),
        booleanParam(name: "SKIP_IOS", value: SKIP_IOS),
        booleanParam(name: "SKIP_LINUX", value: SKIP_LINUX),
        booleanParam(name: "SKIP_MACOS", value: SKIP_MACOS),
        booleanParam(name: "SKIP_WINDOWS", value: SKIP_WINDOWS),
        string(name: "BRAVE_BROWSER_BRANCH", value: BRAVE_BROWSER_BRANCH),
        string(name: "BRAVE_CORE_BRANCH", value: BRAVE_CORE_BRANCH),
        string(name: "BASE_BRANCH", value: BASE_BRANCH),
        string(name: "SLACK_USERNAME", value: SLACK_USERNAME),
        string(name: "SLACK_BUILDS_CHANNEL", value: '#build-downloads-bot'),
        string(name: "BRANCH_PRODUCTIVITY_HOMEPAGE", value: BRANCH_PRODUCTIVITY_HOMEPAGE),
        string(name: "BRANCH_PRODUCTIVITY_NAME", value: BRANCH_PRODUCTIVITY_NAME),
        string(name: "BRANCH_PRODUCTIVITY_DESCRIPTION", value: BRANCH_PRODUCTIVITY_DESCRIPTION),
        string(name: "BRANCH_PRODUCTIVITY_USER", value: BRANCH_PRODUCTIVITY_USER)
    ]
    currentBuild.result = build(job: PIPELINE_NAME, parameters: params, propagate: false).result
}
