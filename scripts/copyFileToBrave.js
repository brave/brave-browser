const fs = require("fs");
const path = require("path");

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        console.error(`❌ Not found : '${src}'`);
        return;
    }

    const stats = fs.statSync(src);

    if (stats.isDirectory()) {

        // คัดลอกไฟล์และโฟลเดอร์ทั้งหมดใน src
        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            copyRecursiveSync(srcPath, destPath); // เรียกตัวเองซ้ำ
        }
    } else {
        // ถ้าเป็นไฟล์ -> คัดลอกไฟล์
        if (!fs.existsSync(dest)) {
            console.error(`❌ Not found : '${dest}' `);
            return;
        }
        console.log(`✅ Copy : ${src} -> ${dest}`);
        fs.copyFileSync(src, dest);

    }
}

module.exports = { copyRecursiveSync };