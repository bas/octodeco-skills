import Image from "next/image";
import type { Metadata } from "next";
import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "Products - Octodeco",
  description: "Browse our collection of unique Octocat products",
};

export default function ProductsPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse [animation-delay:4s]"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16 text-center space-y-6">
            <div className="inline-block animate-fade-in">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider text-purple-600 dark:text-purple-400 bg-purple-100/80 dark:bg-purple-900/30 rounded-full backdrop-blur-sm border border-purple-200 dark:border-purple-800">
                ★ OCTOCAT COLLECTION ★
              </span>
            </div>
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Octo
              <span className="inline-block animate-bounce">★</span>
              Shop
            </h1>
            <p 
              className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Collect the legendary Octocats — each one a unique character in the GitHub universe
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const colorSchemes = [
                { border: 'border-indigo-200 dark:border-indigo-800', accent: 'from-indigo-500 to-purple-500', badge: 'bg-indigo-500' },
                { border: 'border-purple-200 dark:border-purple-800', accent: 'from-purple-500 to-pink-500', badge: 'bg-purple-500' },
                { border: 'border-pink-200 dark:border-pink-800', accent: 'from-pink-500 to-rose-500', badge: 'bg-pink-500' },
                { border: 'border-rose-200 dark:border-rose-800', accent: 'from-rose-500 to-orange-500', badge: 'bg-rose-500' },
              ];
              const scheme = colorSchemes[index % 4];
              
              return (
                <div
                  key={product.id}
                  className="group relative"
                >
                  {/* Main Card */}
                  <div className={`relative overflow-hidden rounded-3xl border-4 ${scheme.border} bg-white dark:bg-slate-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1`}>
                    
                    {/* ID Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`${scheme.badge} text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg`}>
                        #{product.id.toString().padStart(2, '0')}
                      </div>
                    </div>

                    {/* Price Tag - Floating */}
                    <div className="absolute top-4 right-4 z-10 group-hover:scale-110 transition-transform duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl blur-md"></div>
                        <div className="relative bg-gradient-to-br from-yellow-200 to-orange-300 dark:from-yellow-400 dark:to-orange-500 text-slate-900 font-black text-lg px-4 py-2 rounded-2xl shadow-lg transform -rotate-6 border-2 border-orange-400">
                          ${product.price.toFixed(0)}
                        </div>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8">
                      <div className="relative h-full w-full group-hover:scale-110 transition-transform duration-500">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          priority={index < 4}
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                      
                      {/* Decorative corner elements */}
                      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-purple-300 dark:border-purple-700 rounded-br-lg opacity-50"></div>
                      <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-indigo-300 dark:border-indigo-700 rounded-tl-lg opacity-50"></div>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                      <h3 
                        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight"
                        style={{ fontFamily: "'Fredoka', sans-serif" }}
                      >
                        {product.name}
                      </h3>
                      <p 
                        className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {product.description}
                      </p>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className={`w-full py-3.5 px-6 rounded-2xl font-black text-white bg-gradient-to-r ${scheme.accent} opacity-60 cursor-not-allowed shadow-lg border-2 border-white/20 transition-all duration-300`}
                        aria-label={`Add ${product.name} - $${product.price.toFixed(2)} to cart`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>Add to Collection</span>
                          <span className="text-lg">→</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-20 text-center">
            <p 
              className="text-slate-600 dark:text-slate-400 text-lg font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Can&apos;t find what you&apos;re looking for? More Octocats coming soon! ✨
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
