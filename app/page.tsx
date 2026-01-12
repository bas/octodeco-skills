import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">🐙</div>
          <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
            Welcome to Octocat Store
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover our amazing collection of Octocat merchandise. From classic figures to limited editions, find your perfect coding companion!
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              Unique Designs
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Each Octocat has its own personality and style
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-lg">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              Premium Quality
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              High-quality merchandise for true developers
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-lg">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              Special Offers
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use discount codes at checkout for great deals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

