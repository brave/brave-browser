const { execFile } = require('child_process');

// Run Git commands asynchronously
async function runGitAsync(repoPath, args) {
    return new Promise((resolve, reject) => {
        execFile('git', args, { cwd: repoPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Git command failed in "${repoPath}": ${stderr.trim()}`);
                return reject(new Error(`Git error: ${stderr.trim()}`));
            }
            resolve(stdout.trim());
        });
    });
}

module.exports = { runGitAsync };