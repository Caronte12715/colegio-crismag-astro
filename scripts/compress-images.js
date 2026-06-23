import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function compressImages() {
    console.log('🖼️ Iniciando compresión de imágenes...');
    
    try {
        const files = await getFiles(imagesDir);
        let compressedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            // Solo procesar jpg, jpeg, png
            if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
                skippedCount++;
                continue;
            }

            try {
                // Leer tamaño de archivo original
                const stat = await fs.stat(file);
                const originalSize = stat.size;

                // Solo procesar si la imagen pesa más de 500KB para evitar recompresiones innecesarias
                if (originalSize < 500 * 1024) {
                    skippedCount++;
                    continue;
                }

                console.log(`Comprimiendo: ${path.basename(file)} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

                // Crear un buffer temporal
                const buffer = await sharp(file)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .jpeg({ quality: 80, progressive: true })
                    .toBuffer();

                // Sobrescribir el archivo original usando un temporal
                const tempFile = file + '.tmp';
                await fs.writeFile(tempFile, buffer);
                try {
                    await fs.unlink(file);
                } catch(e) {}
                await fs.rename(tempFile, file);
                
                const newStat = await fs.stat(file);
                console.log(`  -> Reducido a: ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
                compressedCount++;

            } catch (err) {
                console.error(`❌ Error procesando ${path.basename(file)}:`, err);
                errorCount++;
            }
        }

        console.log('\n✅ Proceso completado.');
        console.log(`- Imágenes comprimidas: ${compressedCount}`);
        console.log(`- Omitidas (ya optimizadas o no soportadas): ${skippedCount}`);
        console.log(`- Errores: ${errorCount}`);

    } catch (err) {
        console.error('Error general:', err);
    }
}

compressImages();
