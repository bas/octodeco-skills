import Image from "next/image";
import type { Metadata } from "next";
import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "Products - Octodeco",
  description: "Browse our collection of unique Octocat products",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Discover our unique collection of Octocat merchandise
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  priority={index < 4}
                  className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="cursor-not-allowed rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
                    aria-label={`Add ${product.name} - $${product.price.toFixed(2)} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
