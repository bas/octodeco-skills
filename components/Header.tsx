'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">🐙 Octocat Store</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-gray-600 dark:hover:text-gray-400"
          >
            Products
          </Link>
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}
