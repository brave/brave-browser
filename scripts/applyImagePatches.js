const { spawn } = require('child_process');
const util = require('../lib/util')
const fs = require('fs');

async function applyImagesPatches( applyImageScriptPath ){
    if (!fs.existsSync(applyImageScriptPath)) {
                console.error('❌ Script for apply images does not exist.');
                return;
    }

    let prog = util.run('python3', [applyImageScriptPath], { cwd: "." })
    
    if (prog.status !== 0) {
        return null
    } else {
        return prog.stdout.toString().trim()
    }
    return;
}

module.exports = {
    applyImagesPatches
};