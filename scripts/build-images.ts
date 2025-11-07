#!/usr/bin/env tsx
/**
 * Process original artwork into responsive image sizes
 * Generates WebP and AVIF formats for optimal delivery
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const ORIGINAL_DIR = path.join(process.cwd(), 'public', 'art', 'original');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'art', 'processed');
const THUMB_DIR = path.join(process.cwd(), 'public', 'art', 'thumbs');

const SIZES = [
  { name: 'thumb', width: 400, height: 400 },
  { name: 'small', width: 800, height: 800 },
  { name: 'medium', width: 1200, height: 1200 },
  { name: 'large', width: 2000, height: 2000 },
];

async function processImage(inputPath: string): Promise<void> {
  const filename = path.basename(inputPath, path.extname(inputPath));
  console.log(`Processing: ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`  Original: ${metadata.width}x${metadata.height} ${metadata.format}`);

    for (const size of SIZES) {
      const outputDir = size.name === 'thumb' ? THUMB_DIR : OUTPUT_DIR;
      await fs.mkdir(outputDir, { recursive: true });

      // WebP
      const webpPath = path.join(outputDir, `${filename}-${size.name}.webp`);
      await image
        .clone()
        .resize(size.width, size.height, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`  ✓ ${size.name} WebP`);

      // AVIF (better compression, newer format)
      const avifPath = path.join(outputDir, `${filename}-${size.name}.avif`);
      await image
        .clone()
        .resize(size.width, size.height, { fit: 'cover', position: 'center' })
        .avif({ quality: 80 })
        .toFile(avifPath);
      console.log(`  ✓ ${size.name} AVIF`);

      // PNG fallback for thumb
      if (size.name === 'thumb') {
        const pngPath = path.join(outputDir, `${filename}.png`);
        await image
          .clone()
          .resize(size.width, size.height, { fit: 'cover', position: 'center' })
          .png({ quality: 90 })
          .toFile(pngPath);
        console.log(`  ✓ PNG fallback`);
      }
    }

    console.log(`✓ Completed: ${filename}\n`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error);
  }
}

async function main() {
  console.log('🖼️  Building responsive image assets...\n');

  // Ensure directories exist
  await fs.mkdir(ORIGINAL_DIR, { recursive: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(THUMB_DIR, { recursive: true });

  // Find all images
  const patterns = [
    path.join(ORIGINAL_DIR, '**/*.jpg'),
    path.join(ORIGINAL_DIR, '**/*.jpeg'),
    path.join(ORIGINAL_DIR, '**/*.png'),
    path.join(ORIGINAL_DIR, '**/*.tiff'),
    path.join(ORIGINAL_DIR, '**/*.tif'),
  ];

  const files: string[] = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern);
    files.push(...matches);
  }

  if (files.length === 0) {
    console.log('No images found in', ORIGINAL_DIR);
    console.log('Place original artwork in this directory and run again.');
    return;
  }

  console.log(`Found ${files.length} images\n`);

  for (const file of files) {
    await processImage(file);
  }

  console.log('✅ Image processing complete!');
  console.log(`📁 Processed: ${OUTPUT_DIR}`);
  console.log(`📁 Thumbnails: ${THUMB_DIR}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });
