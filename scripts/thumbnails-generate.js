/* Packages */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDir = path.resolve('public/assets/images/photos');
const thumb = {
	suffix: '-thumb',
	width: 475,
	quality: 75,
};

/* Check if photos directory is found */
if (!fs.existsSync(photosDir)) {
	console.error(`❌ Error: ${photosDir} not found.`);
	process.exit(1);
}

/* Delete existing thumbnails first when run with --clean (e.g. after changing thumb.width / thumb.quality) */
if (process.argv.includes('--clean')) {
	const existingThumbs = fs.readdirSync(photosDir).filter((file) => file.includes(thumb.suffix));
	existingThumbs.forEach((file) => fs.unlinkSync(path.join(photosDir, file)));
	console.log(`🗑️ Removed ${existingThumbs.length} existing thumbnails.`);
}

/* Set files and initial values */
const files = fs
	.readdirSync(photosDir)
	.filter((file) => /\.(jpe?g|png)$/i.test(file))
	.filter((file) => !file.includes(thumb.suffix));
let created = 0;
let skipped = 0;

/* Build thumbnails */
await Promise.all(
	files.map(async (file) => {
		const ext = path.extname(file);
		const base = path.basename(file, ext);
		const sourcePath = path.join(photosDir, file);
		const thumbPath = path.join(photosDir, `${base}${thumb.suffix}${ext}`);

		// Skip if an up to date thumbnail already exists
		if (fs.existsSync(thumbPath) && fs.statSync(thumbPath).mtimeMs >= fs.statSync(sourcePath).mtimeMs) {
			skipped++;
			return;
		}

		await sharp(sourcePath)
			.resize({ width: thumb.width, withoutEnlargement: true })
			.jpeg({ quality: thumb.quality, mozjpeg: true })
			.toFile(thumbPath);

		created++;
	}),
);

console.log(`🖼️ Thumbnails: ${created} created, ${skipped} already up to date.`);
