'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="sticky top-0 z-50 border-b-2 border-charcoal/10 bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 rounded-lg"
          >
            <span className="font-display text-3xl font-bold text-charcoal transition-colors group-hover:text-coral">
              OctoDeco
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`font-body text-lg transition-colors hover:text-coral focus:outline-none focus:underline ${
                isActive('/') ? 'font-semibold text-coral' : 'text-charcoal/70'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`font-body text-lg transition-colors hover:text-coral focus:outline-none focus:underline ${
                isActive('/products') ? 'font-semibold text-coral' : 'text-charcoal/70'
              }`}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className={`relative font-body text-lg transition-colors hover:text-coral focus:outline-none focus:underline ${
                isActive('/cart') ? 'font-semibold text-coral' : 'text-charcoal/70'
              }`}
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
