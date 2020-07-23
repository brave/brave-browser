const ci = {
  generate_browser_branch: (options = {}) => {
    // util.run('git', ['-C', config.rootDir, 'clean', '-fxd'], options)

    // def bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls?head=brave:" + BRANCH, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).content)[0]

    // BUILD_TYPE = params.BUILD_TYPE
    //                     CHANNEL = params.CHANNEL
    //                     SLACK_BUILDS_CHANNEL = params.SLACK_BUILDS_CHANNEL
    //                     SKIP_SIGNING = params.SKIP_SIGNING
    //                     WIPE_WORKSPACE = params.WIPE_WORKSPACE
    //                     SKIP_INIT = params.SKIP_INIT
    //                     DISABLE_SCCACHE = params.DISABLE_SCCACHE
    //                     DCHECK_ALWAYS_ON = params.DCHECK_ALWAYS_ON
    //                     DEBUG = params.DEBUG
    //                     SKIP = false
    //                     BRANCH = env.BRANCH_NAME
    //                     TARGET_BRANCH = "master"
    //                     if (env.CHANGE_BRANCH) {
    //                         BRANCH = env.CHANGE_BRANCH
    //                         TARGET_BRANCH = env.CHANGE_TARGET
    //                         def bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls?head=brave:" + BRANCH, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).content)[0]
    //                         if (bcPrDetails) {
    //                             bcPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-core/pulls/" + bcPrDetails.number, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).content)
    //                             SKIP = SKIP || bcPrDetails.mergeable_state.equals("draft") || bcPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
    //                         }
    //                     }
    //                     BRANCH_EXISTS_IN_BB = httpRequest(url: GITHUB_API + "/brave-browser/branches/" + BRANCH, validResponseCodes: "100:499", customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).status.equals(200)
    //                     if (BRANCH_EXISTS_IN_BB) {
    //                         def bbPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls?head=brave:" + BRANCH, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).content)[0]
    //                         if (bbPrDetails) {
    //                             bbPrDetails = readJSON(text: httpRequest(url: GITHUB_API + "/brave-browser/pulls/" + bbPrDetails.number, customHeaders: [[name: "Authorization", value: "token ${PR_BUILDER_TOKEN}"]], quiet: !DEBUG).content)
    //                             SKIP = SKIP || bbPrDetails.mergeable_state.equals("draft") || bbPrDetails.labels.count { label -> label.name.equalsIgnoreCase("CI/skip") }.equals(1)
    //                         }
    //                     }
    //                     buildName env.BUILD_NUMBER + "-" + BRANCH + "-" + env.GIT_COMMIT.substring(0, 7)

  }
}

module.exports = ci
