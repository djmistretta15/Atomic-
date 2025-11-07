import Link from 'next/link';
import { Button } from '@atomic/ui';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-primary-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">ATØMIC</h3>
            <p className="text-sm text-white/80">
              Matter. Pattern. Purpose.
              <br />
              <br />
              100% of profits fund STEM education, restoration, and youth programs.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-white/80 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/drops" className="text-white/80 hover:text-white transition-colors">
                  Limited Drops
                </Link>
              </li>
              <li>
                <Link href="/gift-card" className="text-white/80 hover:text-white transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-white/80 hover:text-white transition-colors">
                  Impact Report
                </Link>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/80 hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/discount" className="text-white/80 hover:text-white transition-colors">
                  Student/Researcher Discount
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} ATOMIC Clothing. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
