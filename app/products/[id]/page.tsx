'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Product not found
          </h1>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/products')}
          className="mb-6 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          ← Back to Products
        </button>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 mb-4 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {product.description}
                </p>
                <div className="text-3xl font-bold mb-8 text-black dark:text-white">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Add to Cart
                </button>

                {showSuccess && (
                  <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg text-center font-medium">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
