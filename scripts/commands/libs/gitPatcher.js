const path = require('path');
const fs = require('fs-extra');
const { runGitAsync } = require('./utils'); // Corrected import
const { defaultBuildConfig } = require('./config'); // Corrected import

class GitPatcher {
    constructor(patchDirPath, targetRepoPath) {
        this.patchDirPath = patchDirPath;
        this.targetRepoPath = targetRepoPath;
    }

    async applyPatches() {
        if (!fs.existsSync(this.patchDirPath)) {
            console.error('❌ Patch directory does not exist.');
            return;
        }

        if (!fs.existsSync(this.targetRepoPath)) {
            throw new Error(`❌ Target repository "${this.targetRepoPath}" does not exist.`);
        }

        const patchFiles = await fs.readdir(this.patchDirPath);
        const patchPaths = patchFiles.filter(file => file.endsWith('.patch'));

        if (patchPaths.length === 0) {
            console.log('⚠️ No patch files found.');
            return;
        }

        console.log(`📌 Applying ${patchPaths.length} patches in "${this.targetRepoPath}"...`);

        for (const patchFile of patchPaths) {
            try {
                const patchFilePath = path.join(this.patchDirPath, patchFile);
                await runGitAsync(this.targetRepoPath, ['apply', '--reject', '--whitespace=fix', patchFilePath]);
                console.log(`✅ Applied patch: ${patchFile}`);
            } catch (err) {
                console.error(`❌ Error applying patch "${patchFile}": ${err.message}`);
            }
        }

        console.log('🚀 All patches processed.');
    }
}

module.exports = { GitPatcher };
