#!/usr/bin/env tsx
/**
 * Generate QR codes for all products
 * Links to: /impact/{sku} for provenance tracking
 */

import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const QR_DIR = path.join(process.cwd(), 'public', 'qr');

async function generateQRCode(sku: string, url: string): Promise<void> {
  const filename = `${sku}.png`;
  const filepath = path.join(QR_DIR, filename);

  try {
    await QRCode.toFile(filepath, url, {
      width: 500,
      margin: 2,
      color: {
        dark: '#001F3F', // primary color
        light: '#FFFFFF',
      },
    });
    console.log(`✓ Generated QR: ${filename}`);
  } catch (error) {
    console.error(`✗ Failed to generate QR for ${sku}:`, error);
  }
}

async function main() {
  console.log('🔲 Generating QR codes for all products...\n');

  // Ensure QR directory exists
  await fs.mkdir(QR_DIR, { recursive: true });

  // Fetch all published products
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { sku: true, slug: true },
  });

  console.log(`Found ${products.length} products\n`);

  for (const product of products) {
    const url = `${BASE_URL}/impact/${product.sku}`;
    await generateQRCode(product.sku, url);
  }

  console.log(`\n✅ Generated ${products.length} QR codes`);
  console.log(`📁 Saved to: ${QR_DIR}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
