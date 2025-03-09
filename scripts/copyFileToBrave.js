const fs = require("fs");
const path = require("path");

async function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        console.error(`❌ ต้นทาง '${src}' ไม่พบ`);
        return;
    }

    // ตรวจสอบว่า src เป็นไฟล์หรือโฟลเดอร์
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
        // อ่านไฟล์และโฟลเดอร์ทั้งหมดในโฟลเดอร์ปัจจุบัน
        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            // **เรียกตัวเองซ้ำ (Recursive Call)**
            copyRecursiveSync(srcPath, destPath);
        }
    } else {
        // ถ้าเป็นไฟล์ -> คัดลอกไฟล์
        fs.copyFileSync(src, dest);
        console.log(`✅ คัดลอกไฟล์: ${src} -> ${dest}`);
    }
}

module.exports = { copyRecursiveSync };