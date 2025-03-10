const fs = require("fs");
const path = require("path");

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        console.error(`❌ ต้นทาง '${src}' ไม่พบ`);
        return;
    }

    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
        // ตรวจสอบและสร้างโฟลเดอร์ปลายทาง
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        // คัดลอกไฟล์และโฟลเดอร์ทั้งหมดใน src
        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            copyRecursiveSync(srcPath, destPath); // เรียกตัวเองซ้ำ
        }
    } else {
        // ถ้าเป็นไฟล์ -> คัดลอกไฟล์
        fs.copyFileSync(src, dest);
        console.log(`✅ Copy : ${src} -> ${dest}`);
    }
}

module.exports = { copyRecursiveSync };