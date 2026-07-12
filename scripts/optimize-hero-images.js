/**
 * One-off optimizer for the heaviest homepage images.
 * Non-destructive: originals are backed up to *.orig before overwriting.
 * Run: node scripts/optimize-hero-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');

// [source, output, resizeWidth, format]
const jobs = [
  // Hero profile photo — displayed at max 200px, so 400px covers retina.
  { src: 'Sajal_Gupta.png', out: 'Sajal_Gupta.webp', width: 400, format: 'webp', quality: 82 },
  // Hall of Fame marquee logo — displayed at ~48px tall, 240px wide covers retina.
  { src: 'logos/hof/bisleri.png', out: 'logos/hof/bisleri.png', width: 240, format: 'png' },
  // Favicon / apple-touch-icon — 180px PNG is the standard, keeps broad compatibility.
  { src: 'Sajal_Gupta.png', out: 'icon-180.png', width: 180, format: 'png' },
  // PWA manifest icons.
  { src: 'Sajal_Gupta.png', out: 'icon-192.png', width: 192, format: 'png' },
  { src: 'Sajal_Gupta.png', out: 'icon-512.png', width: 512, format: 'png' },
  // Social share (og/twitter) image — crawlers want jpg/png, not webp.
  { src: 'Sajal_Gupta.png', out: 'Sajal_Gupta-og.jpg', width: 630, format: 'jpg', quality: 82 },
];

async function run() {
  for (const job of jobs) {
    const srcPath = path.join(PUBLIC, job.src);
    const outPath = path.join(PUBLIC, job.out);
    if (!fs.existsSync(srcPath)) {
      console.warn(`skip (missing): ${job.src}`);
      continue;
    }
    const before = fs.statSync(srcPath).size;

    // Back up original once if we're overwriting it.
    if (srcPath === outPath) {
      const backup = srcPath + '.orig';
      if (!fs.existsSync(backup)) fs.copyFileSync(srcPath, backup);
    }

    let pipeline = sharp(srcPath).resize({ width: job.width, withoutEnlargement: true });
    if (job.format === 'webp') pipeline = pipeline.webp({ quality: job.quality || 80 });
    if (job.format === 'jpg') pipeline = pipeline.jpeg({ quality: job.quality || 80, mozjpeg: true });
    if (job.format === 'png') pipeline = pipeline.png({ compressionLevel: 9, quality: 80, effort: 8 });

    const buf = await pipeline.toBuffer();
    fs.writeFileSync(outPath, buf);
    const after = buf.length;
    console.log(
      `${job.src} -> ${job.out}: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB` +
      ` (${Math.round((1 - after / before) * 100)}% smaller)`
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
