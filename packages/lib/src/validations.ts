import { z } from 'zod';

// Product validation
export const productSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  sku: z.string().min(3).max(50),
  description: z.string().min(10),
  fieldNote: z.string().optional(),
  priceCents: z.number().int().positive(),
  currency: z.string().default('USD'),
  specimenId: z.string().optional(),
  collectionId: z.string().optional(),
  impactRouteId: z.string().optional(),
  dropId: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

// Variant validation
export const variantSchema = z.object({
  productId: z.string(),
  size: z.string(),
  color: z.string(),
  material: z.string(),
  stockQty: z.number().int().nonnegative().default(0),
  printProviderSku: z.string().optional(),
  printProviderType: z.enum(['printful', 'printify', 'local']).optional(),
  weightGrams: z.number().int().positive().optional(),
});

// Collection validation
export const collectionSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  description: z.string().optional(),
  blurb: z.string().max(200).optional(),
  heroImage: z.string().url().optional(),
  published: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

// Specimen validation
export const specimenSchema = z.object({
  code: z.string().min(3).max(50),
  title: z.string().min(3).max(200),
  category: z.enum(['Microscope', 'Geology', 'BioPatterns', 'Marine', 'Astral']),
  technique: z.string().optional(),
  magnification: z.string().optional(),
  sourceNote: z.string().optional(),
  location: z.string().optional(),
  captureDate: z.date().optional(),
  contributorId: z.string().optional(),
  assetUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  taxonomy: z.record(z.any()).optional(),
  meta: z.record(z.any()).optional(),
});

// Impact route validation
export const impactRouteSchema = z.object({
  slug: z.string().min(3).max(100),
  name: z.string().min(3).max(200),
  type: z.string(),
  description: z.string().optional(),
  splitBps: z.number().int().min(0).max(10000), // 0-100%
  wallet: z.string().optional(),
  publicUrl: z.string().url().optional(),
  location: z.string().optional(),
  active: z.boolean().default(true),
  notes: z.string().optional(),
});

// Contributor validation
export const contributorSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional(),
  socials: z.record(z.string()).optional(),
  revShareBps: z.number().int().min(0).max(10000).optional(),
  verified: z.boolean().default(false),
});

// Drop validation
export const dropSchema = z.object({
  slug: z.string().min(3).max(100),
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  startAt: z.date(),
  endAt: z.date().optional(),
  limited: z.boolean().default(false),
  editionSize: z.number().int().positive().optional(),
  published: z.boolean().default(false),
});

// User validation
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(200).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'CUSTOMER']).default('CUSTOMER'),
});

// Discount code validation
export const discountCodeSchema = z.object({
  code: z.string().min(3).max(50).toUpperCase(),
  type: z.enum(['percentage', 'fixed_amount']),
  value: z.number().int().positive(),
  minPurchaseCents: z.number().int().nonnegative().optional(),
  maxUses: z.number().int().positive().optional(),
  active: z.boolean().default(true),
  startsAt: z.date().optional(),
  expiresAt: z.date().optional(),
});

// Checkout validation
export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
  email: z.string().email(),
  shippingAddress: z.object({
    name: z.string().min(2),
    address1: z.string().min(5),
    address2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(3),
    country: z.string().min(2).default('US'),
    phone: z.string().optional(),
  }),
  billingAddress: z
    .object({
      name: z.string().min(2),
      address1: z.string().min(5),
      address2: z.string().optional(),
      city: z.string().min(2),
      state: z.string().min(2),
      zip: z.string().min(3),
      country: z.string().min(2).default('US'),
    })
    .optional(),
  discountCode: z.string().optional(),
});

// Search params validation
export const searchParamsSchema = z.object({
  q: z.string().optional(),
  collection: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  tags: z.string().or(z.array(z.string())).optional(),
  sortBy: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
