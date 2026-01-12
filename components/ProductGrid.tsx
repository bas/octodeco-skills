'use client';

import Image from 'next/image';
import { products } from '../lib/products';
import { useCart } from '@/contexts/CartContext';

interface ProductGridProps {
  featuredOnly?: boolean;
}

export default function ProductGrid({ featuredOnly = false }: ProductGridProps) {
  const { addToCart } = useCart();
  const displayProducts = featuredOnly ? products.slice(0, 4) : products;
  const gridCols = featuredOnly ? 'xl:grid-cols-4' : 'xl:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${gridCols}`}>
      {displayProducts.map((product, index) => (
        <div
          key={product.id}
          className="group relative animate-fadeInUp overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-500 hover:scale-105 hover:shadow-cardHover focus-within:scale-105 focus-within:shadow-cardHover"
          style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-peach/20 to-sky/20">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <p className="font-handwritten text-xl">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-1 font-display text-lg font-bold text-coral">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full rounded-full bg-coral px-6 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
              aria-label={`Add ${product.name} to cart for $${product.price.toFixed(2)}`}
            >
              Add to Cart
            </button>
          </div>

          {/* Card Number Badge */}
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-coral font-display text-sm font-bold text-white shadow-lg">
            {product.id}
          </div>
        </div>
      ))}
    </div>
  );
}
