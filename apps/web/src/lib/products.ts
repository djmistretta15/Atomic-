import { prisma } from '@atomic/lib';
import type { ProductWithRelations } from '@atomic/lib';

export async function getFeaturedProducts(): Promise<ProductWithRelations[]> {
  return prisma.product.findMany({
    where: {
      published: true,
      featured: true,
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      variants: true,
      specimen: {
        include: {
          contributor: true,
        },
      },
      collection: true,
      impactRoute: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
  });
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  return prisma.product.findUnique({
    where: { slug, published: true },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      variants: true,
      specimen: {
        include: {
          contributor: true,
        },
      },
      collection: true,
      impactRoute: true,
      drop: true,
    },
  });
}

export async function getAllProducts(params?: {
  collection?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
  limit?: number;
  offset?: number;
}): Promise<ProductWithRelations[]> {
  const {
    collection,
    category,
    minPrice,
    maxPrice,
    tags,
    sortBy = 'newest',
    limit = 20,
    offset = 0,
  } = params || {};

  const where: any = {
    published: true,
  };

  if (collection) {
    where.collection = { slug: collection };
  }

  if (category) {
    where.specimen = { category };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.priceCents = {};
    if (minPrice !== undefined) where.priceCents.gte = minPrice * 100;
    if (maxPrice !== undefined) where.priceCents.lte = maxPrice * 100;
  }

  if (tags && tags.length > 0) {
    where.tags = { hasSome: tags };
  }

  const orderBy: any =
    sortBy === 'newest'
      ? { createdAt: 'desc' }
      : sortBy === 'price-asc'
      ? { priceCents: 'asc' }
      : sortBy === 'price-desc'
      ? { priceCents: 'desc' }
      : { createdAt: 'desc' }; // popular would need additional logic

  return prisma.product.findMany({
    where,
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      variants: true,
      specimen: {
        include: {
          contributor: true,
        },
      },
      collection: true,
      impactRoute: true,
    },
    orderBy,
    take: limit,
    skip: offset,
  });
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductWithRelations[]> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { collection: true, specimen: true },
  });

  if (!product) return [];

  return prisma.product.findMany({
    where: {
      published: true,
      id: { not: productId },
      OR: [
        { collectionId: product.collectionId },
        { specimen: { category: product.specimen?.category } },
      ],
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      variants: true,
      specimen: {
        include: {
          contributor: true,
        },
      },
      collection: true,
      impactRoute: true,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}
