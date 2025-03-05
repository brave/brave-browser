const path = require('path');

const defaultBuildConfig = {
    configPatchDir: path.resolve(__dirname, '../../../', 'src', 'ibrowe-core', 'patches'), // Directory where patch files are stored
    targetRepoPath: path.resolve(__dirname, '../../../', 'src', 'brave') // Path to brave-core where patches should be applied
};

module.exports = { defaultBuildConfig };