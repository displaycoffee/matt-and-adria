import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Path to the photos used in the gallery
const photosDir = path.resolve('public/assets/images/photos');

// Thumbnail configuration
const thumbSuffix = '-thumb';
const thumbWidth = 475;
const thumbQuality = 75;

if (!fs.existsSync(photosDir)) {
	console.error(`❌ Error: ${photosDir} not found.`);
	process.exit(1);
}

// Delete existing thumbnails first when run with --clean (e.g. after changing thumbWidth / thumbQuality)
if (process.argv.includes('--clean')) {
	const existingThumbs = fs.readdirSync(photosDir).filter((file) => file.includes(thumbSuffix));
	existingThumbs.forEach((file) => fs.unlinkSync(path.join(photosDir, file)));
	console.log(`🗑️  Removed ${existingThumbs.length} existing thumbnails.`);
}

const files = fs
	.readdirSync(photosDir)
	.filter((file) => /\.(jpe?g|png)$/i.test(file))
	.filter((file) => !file.includes(thumbSuffix));

let created = 0;
let skipped = 0;

await Promise.all(
	files.map(async (file) => {
		const ext = path.extname(file);
		const base = path.basename(file, ext);
		const sourcePath = path.join(photosDir, file);
		const thumbPath = path.join(photosDir, `${base}${thumbSuffix}${ext}`);

		// Skip if an up to date thumbnail already exists
		if (fs.existsSync(thumbPath) && fs.statSync(thumbPath).mtimeMs >= fs.statSync(sourcePath).mtimeMs) {
			skipped++;
			return;
		}

		await sharp(sourcePath)
			.resize({ width: thumbWidth, withoutEnlargement: true })
			.jpeg({ quality: thumbQuality, mozjpeg: true })
			.toFile(thumbPath);

		created++;
	}),
);

console.log(`🖼️  Thumbnails: ${created} created, ${skipped} already up to date.`);
