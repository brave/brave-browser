const path = require('path');
const fs = require('fs-extra');
const { GitPatcher } = require('./commands/libs/gitPatcher'); // Corrected import
const { defaultBuildConfig } = require('./commands/libs/config'); // Corrected import

async function applyIBrowePatches(configIBrowePatchDir, targetRepoPath) {
    try {
        if (!fs.existsSync(configIBrowePatchDir)) {
            console.error(`Patch directory "${configIBrowePatchDir}" does not exist.`);
            process.exit(1);
        }

        try {
            const gitPatcher = new GitPatcher(configIBrowePatchDir, targetRepoPath);
            await gitPatcher.applyPatches();
            console.log('✅ All patches applied successfully.');
        } catch (err) {
            console.error(`❌ Error applying patches: ${err.message}`);
            process.exit(1);
        }
    } catch (configErr) {
        console.error(`❌ Configuration error: ${configErr.message}`);
        process.exit(1);
    }
};

module.exports = { applyIBrowePatches };