#!/usr/bin/env tsx
/**
 * Ingest artwork files and create specimen + product records
 * Reads YAML metadata files alongside images
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';
import { glob } from 'glob';
import { slugify, generateSKU } from '@atomic/lib';

const prisma = new PrismaClient();

const ORIGINAL_DIR = path.join(process.cwd(), 'public', 'art', 'original');

interface ArtworkMetadata {
  title: string;
  category: 'Microscope' | 'Geology' | 'BioPatterns' | 'Marine' | 'Astral';
  technique: string;
  magnification?: string;
  sourceNote?: string;
  location?: string;
  contributor: string;
  taxonomy?: Record<string, any>;
  productTitle: string;
  productDescription: string;
  fieldNote?: string;
  priceCents: number;
  collection: string;
  impactRoute: string;
  tags?: string[];
}

async function ingestArtwork(imagePath: string, metadataPath: string): Promise<void> {
  console.log(`\nIngesting: ${path.basename(imagePath)}`);

  const metadataContent = await fs.readFile(metadataPath, 'utf-8');
  const metadata: ArtworkMetadata = yaml.parse(metadataContent);

  // Find or create contributor
  let contributor = await prisma.contributor.findFirst({
    where: { name: metadata.contributor },
  });

  if (!contributor) {
    contributor = await prisma.contributor.create({
      data: {
        name: metadata.contributor,
        verified: false,
      },
    });
    console.log(`  Created contributor: ${metadata.contributor}`);
  }

  // Find collection
  const collection = await prisma.collection.findFirst({
    where: { slug: slugify(metadata.collection) },
  });

  if (!collection) {
    throw new Error(`Collection not found: ${metadata.collection}`);
  }

  // Find impact route
  const impactRoute = await prisma.impactRoute.findFirst({
    where: { slug: slugify(metadata.impactRoute) },
  });

  if (!impactRoute) {
    throw new Error(`Impact route not found: ${metadata.impactRoute}`);
  }

  // Create specimen
  const specimenCode = `SPEC-${metadata.category.toUpperCase().substring(0, 3)}-${Date.now()}`;
  const relativeImagePath = path.relative(path.join(process.cwd(), 'public'), imagePath);
  const specimen = await prisma.specimen.create({
    data: {
      code: specimenCode,
      title: metadata.title,
      category: metadata.category,
      technique: metadata.technique,
      magnification: metadata.magnification,
      sourceNote: metadata.sourceNote,
      location: metadata.location,
      contributorId: contributor.id,
      assetUrl: `/${relativeImagePath}`,
      taxonomy: metadata.taxonomy || {},
    },
  });

  console.log(`  ✓ Created specimen: ${specimenCode}`);

  // Create product
  const sku = generateSKU(metadata.productTitle);
  const slug = slugify(metadata.productTitle);

  const product = await prisma.product.create({
    data: {
      title: metadata.productTitle,
      slug,
      sku,
      description: metadata.productDescription,
      fieldNote: metadata.fieldNote,
      priceCents: metadata.priceCents,
      specimenId: specimen.id,
      collectionId: collection.id,
      impactRouteId: impactRoute.id,
      published: false, // Manual review required
      tags: metadata.tags || [],
    },
  });

  console.log(`  ✓ Created product: ${sku}`);
  console.log(`  → Review at /admin/products/${product.id}`);
}

async function main() {
  console.log('📥 Ingesting artwork and metadata...\n');

  // Find all metadata files
  const metadataFiles = await glob(path.join(ORIGINAL_DIR, '**/*.yml'));

  if (metadataFiles.length === 0) {
    console.log('No metadata files found (.yml)');
    console.log('\nExpected format:');
    console.log('  /art/original/my-image.jpg');
    console.log('  /art/original/my-image.yml');
    return;
  }

  console.log(`Found ${metadataFiles.length} metadata files\n`);

  for (const metadataPath of metadataFiles) {
    const imagePath = metadataPath.replace(/\.yml$/, '.jpg');
    const imagePathAlt = metadataPath.replace(/\.yml$/, '.png');

    let actualImagePath = imagePath;
    try {
      await fs.access(imagePath);
    } catch {
      try {
        await fs.access(imagePathAlt);
        actualImagePath = imagePathAlt;
      } catch {
        console.error(`✗ No image found for: ${path.basename(metadataPath)}`);
        continue;
      }
    }

    try {
      await ingestArtwork(actualImagePath, metadataPath);
    } catch (error) {
      console.error(`✗ Error ingesting ${path.basename(actualImagePath)}:`, error);
    }
  }

  console.log('\n✅ Ingestion complete!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
