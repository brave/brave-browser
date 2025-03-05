const path = require('path');
const fs = require('fs-extra');
const { GitPatcher } = require('./commands/libs/gitPatcher'); // Corrected import
const { defaultBuildConfig } = require('./commands/libs/config'); // Corrected import

const applyNewPatches = async () => {
    try {
        const { configPatchDir, targetRepoPath } = defaultBuildConfig;

        // Ensure patch directory exists
        if (!fs.existsSync(configPatchDir)) {
            console.error(`Patch directory "${configPatchDir}" does not exist.`);
            process.exit(1);
        }

        try {
            // Initialize GitPatcher and apply patches
            const gitPatcher = new GitPatcher(configPatchDir, targetRepoPath);
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

// Run the script
applyNewPatches().catch((err) => {
    console.error(err);
});
