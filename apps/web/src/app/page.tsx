import Link from 'next/link';
import { Button } from '@atomic/ui';
import { ArrowRightIcon, MicroscopeIcon } from '@radix-ui/react-icons';
import { getFeaturedProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product-grid';
import { ImpactStats } from '@/components/impact-stats';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm mb-6">
            <MicroscopeIcon className="w-4 h-4" />
            <span>100% profits fund STEM education</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            SEE THE
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-purple bg-clip-text text-transparent">
              UNSEEN
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Real microscope imagery. Magnified 100x-10,000x. Printed on sustainable fabric.
            <br />
            <strong>Matter. Pattern. Purpose.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="gradient" className="text-lg">
              <Link href="/shop">
                Explore Collection
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
              <Link href="/about">Our Mission</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
              Featured Specimens
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Every design tells a scientific story. Each piece includes a specimen card and
              provenance QR code.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">No featured products available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-12 text-center">
            Collections
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: 'microscope',
                title: 'Microscope',
                description: 'SEM and optical microscopy revealing hidden worlds',
                icon: '🔬',
              },
              {
                slug: 'geology',
                title: 'Geology',
                description: 'Minerals and rocks in stunning detail',
                icon: '💎',
              },
              {
                slug: 'biopatterns',
                title: 'BioPatterns',
                description: "Nature's microscopic blueprints",
                icon: '🦋',
              },
              {
                slug: 'marine-long-island',
                title: 'Marine Long Island',
                description: 'Coastal treasures from our shores',
                icon: '🌊',
              },
              {
                slug: 'astral',
                title: 'Astral',
                description: 'Meteorites and cosmic matter',
                icon: '⭐',
              },
            ].map((collection) => (
              <Link
                key={collection.slug}
                href={`/shop?collection=${collection.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="text-6xl mb-4">{collection.icon}</div>
                <h3 className="text-2xl font-bold text-primary-500 mb-2 group-hover:text-primary-600">
                  {collection.title}
                </h3>
                <p className="text-neutral-600">{collection.description}</p>
                <ArrowRightIcon className="absolute bottom-8 right-8 w-6 h-6 text-primary-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Every purchase directly supports STEM education and environmental programs
            </p>
          </div>

          <ImpactStats />

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/impact">View Full Impact Report</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-cyan/10 via-accent-purple/10 to-accent-magenta/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-6">
            Built for those who look closer.
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
            Join the community of scientists, students, and science supporters wearing the beauty
            of discovery.
          </p>
          <Button asChild size="xl" variant="gradient" className="text-lg">
            <Link href="/shop">
              Start Looking Closer
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
