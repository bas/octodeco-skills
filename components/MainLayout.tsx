'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { getItemCount } = useCart();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartItemCount={getItemCount()} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
