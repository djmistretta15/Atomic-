import { Prisma } from '@prisma/client';

// Product with relations
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: true;
    specimen: {
      include: {
        contributor: true;
      };
    };
    collection: true;
    impactRoute: true;
  };
}>;

// Order with relations
export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: true;
  };
}>;

// Cart item type
export interface CartItem {
  variantId: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  size: string;
  color: string;
  material: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string;
  sku: string;
}

// Checkout session data
export interface CheckoutSessionData {
  items: CartItem[];
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  discountCents: number;
  totalCents: number;
  discountCode?: string;
}

// Filter params for product listing
export interface ProductFilters {
  collection?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  material?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Specimen taxonomy structure
export interface SpecimenTaxonomy {
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  compound?: string;
  formula?: string;
  crystalSystem?: string;
  [key: string]: any;
}

// Impact summary
export interface ImpactSummary {
  totalDonatedCents: number;
  routeBreakdown: Array<{
    routeId: string;
    routeName: string;
    routeType: string;
    amountCents: number;
    percentage: number;
  }>;
  totalOrders: number;
  totalProducts: number;
}

// Print provider types
export type PrintProvider = 'printful' | 'printify' | 'local';

export interface PrintJobRequest {
  orderId: string;
  items: Array<{
    variantId: string;
    printProviderSku: string;
    quantity: number;
    printFileUrl: string;
  }>;
  shippingAddress: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
    phone?: string;
  };
}

export interface PrintJobResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'fulfilled' | 'failed';
  trackingNumber?: string;
  trackingUrl?: string;
  error?: string;
}
