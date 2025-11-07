'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@atomic/ui';
import { cn } from '@atomic/lib';
import {
  MagnifyingGlassIcon,
  PersonIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { ShoppingCart } from './shopping-cart';
import { useState } from 'react';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'Drops', href: '/drops' },
  { name: 'Impact', href: '/impact' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-magenta bg-clip-text text-transparent">
                ATØMIC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-500',
                  pathname === item.href ? 'text-primary-500' : 'text-neutral-700'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href="/search">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <PersonIcon className="h-5 w-5" />
              </Link>
            </Button>

            <ShoppingCart />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <HamburgerMenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 pb-3 pt-2 md:hidden">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
