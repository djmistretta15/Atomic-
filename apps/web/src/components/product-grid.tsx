import Image from 'next/image';
import Link from 'next/link';
import { Badge, Card, CardContent } from '@atomic/ui';
import { formatPrice } from '@atomic/lib';
import type { ProductWithRelations } from '@atomic/lib';

interface ProductGridProps {
  products: ProductWithRelations[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`}>
          <Card className="group overflow-hidden transition-all hover:shadow-xl hover:scale-105">
            <div className="aspect-square relative overflow-hidden bg-neutral-100">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">
                  {product.specimen?.category === 'Microscope'
                    ? '🔬'
                    : product.specimen?.category === 'Geology'
                    ? '💎'
                    : product.specimen?.category === 'BioPatterns'
                    ? '🦋'
                    : product.specimen?.category === 'Marine'
                    ? '🌊'
                    : product.specimen?.category === 'Astral'
                    ? '⭐'
                    : '🧬'}
                </div>
              )}

              {product.specimen?.magnification && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {product.specimen.magnification}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                {product.collection && (
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    {product.collection.title}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-primary-500 mb-2 group-hover:text-primary-600 transition-colors">
                {product.title}
              </h3>
              {product.specimen && (
                <p className="text-sm text-neutral-600 mb-3 line-clamp-1">
                  {product.specimen.title}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary-500">
                  {formatPrice(product.priceCents)}
                </span>
                {product.impactRoute && (
                  <Badge variant="outline" className="text-xs">
                    {product.impactRoute.splitBps / 100}% to {product.impactRoute.type}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
