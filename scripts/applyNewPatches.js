const path = require('path');
const fs = require('fs-extra');
const { GitPatcher } = require('./commands/libs/gitPatcher');
const { defaultBuildConfig } = require('./commands/libs/config');

const applyNewPatches = async () => {
    try {
        const { configPatchDir, targetRepoPath } = defaultBuildConfig;
        if (!fs.existsSync(configPatchDir)) {
            console.error(`Patch directory "${configPatchDir}" does not exist.`);
            process.exit(1);
        }

        try {
            const gitPatcher = new GitPatcher(configPatchDir, targetRepoPath);
            await gitPatcher.applyPatches();
            console.log('✅ All src applied successfully.');
        } catch (err) {
            console.error(`❌ Error applying patches: ${err.message}`);
            process.exit(1);
        }
    } catch (configErr) {
        console.error(`❌ Configuration error: ${configErr.message}`);
        process.exit(1);
    }
};

applyNewPatches().catch((err) => {
    console.error(err);
});