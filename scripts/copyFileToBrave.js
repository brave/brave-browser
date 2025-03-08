const fs = require('fs');
const path = require('path');
const fsp = fs.promises;

async function copyFileToBrave(sourceFolder, destFolder, ) {
    // number of files counted
    let count = 0;


    console.log("Applying image patches...");
    async function processDirectory(dir) 
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        const filesToCopy = entries.filter(entry => entry.isFile());

        if (filesToCopy.length === 0) return;

        const relativePath = path.relative(sourceFolder, dir);
        const targetFolder = path.join(destFolder, relativePath);

        await fsp.mkdir(targetFolder, { recursive: true });

        for (const file of filesToCopy) {
            const sourceFile = path.join(dir, file.name);
            const destFile = path.join(targetFolder, file.name);
            try {
                await fsp.copyFile(sourceFile, destFile);
                console.log(`Copying file ${sourceFile} to ${destFile}`);
                count++;
            } catch (error) {
                console.error(`Error copying file ${sourceFile} to ${destFile}:`, error);
            }
        }
    }

    async function traverseDirectory(dir) {
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await traverseDirectory(fullPath);
                await processDirectory(fullPath);
            }
        }
    }

    try {
        await traverseDirectory(sourceFolder);
        console.log(`Copied ${count} files successfully from ${sourceFolder} to ${destFolder}!`);
    } catch (error) {
        console.error(`Error processing directory ${sourceFolder}:`, error);
    }
}

module.exports = {
    copyFileToBrave: copyFileToBrave
}