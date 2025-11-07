'use client';

import { Button } from '@atomic/ui';
import { ShoppingBagIcon } from '@radix-ui/react-icons';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export function ShoppingCart() {
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <ShoppingBagIcon className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-magenta text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
