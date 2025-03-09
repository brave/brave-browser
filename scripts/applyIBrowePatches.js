const path = require('path');
const fs = require('fs-extra');
const config = require('../src/brave/build/commands/lib/config')

async function applyIBrowePatches() {
    const GitPatcher = require('../src/brave/build/commands/lib/gitPatcher')
    const chromiumDir = config.srcDir
    const braveRepoPath = path.join(chromiumDir, 'brave')
    const iBroweDir = path.join(chromiumDir, 'ibrowe')
    const iBrowePatchesPath = path.join(iBroweDir,'src', 'patches')
    try {

        if (!fs.existsSync(iBrowePatchesPath)) {
            console.error(`Patch directory "${iBrowePatchesPath}" does not exist.`);
            process.exit(1);
        }

        try {
            const gitPatcher = new GitPatcher(iBrowePatchesPath, braveRepoPath);
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