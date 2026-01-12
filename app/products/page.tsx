import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Octodeco",
  description: "Browse our collection of unique Octocat products",
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Justice Tocat",
    description: "Stand for what's right with this heroic Octocat",
    price: 29.99,
    image: "/images/products/justicetocat.jpg",
  },
  {
    id: 2,
    name: "Dino Tocat",
    description: "A prehistoric twist on your favorite Octocat",
    price: 34.99,
    image: "/images/products/dinotocat.png",
  },
  {
    id: 3,
    name: "Female Coder Tocat",
    description: "Celebrating women in tech",
    price: 32.99,
    image: "/images/products/femalecodertocat.png",
  },
  {
    id: 4,
    name: "Jetpack Tocat",
    description: "Blast off to new coding heights",
    price: 39.99,
    image: "/images/products/jetpacktocat.png",
  },
  {
    id: 5,
    name: "Surf Tocat",
    description: "Ride the waves of innovation",
    price: 31.99,
    image: "/images/products/surftocat.png",
  },
  {
    id: 6,
    name: "Mona The Riveter Tocat",
    description: "We can code it!",
    price: 33.99,
    image: "/images/products/mona-the-rivetertocat.png",
  },
  {
    id: 7,
    name: "Terracotta Cat",
    description: "An earthy, artistic take on Octocat",
    price: 28.99,
    image: "/images/products/Terracottocat_Single.png",
  },
  {
    id: 8,
    name: "Original Octocat",
    description: "The classic that started it all",
    price: 35.99,
    image: "/images/products/original.png",
  },
  {
    id: 9,
    name: "Manufacture Tocat",
    description: "Built to last, crafted with care",
    price: 36.99,
    image: "/images/products/manufacturetocat.png",
  },
  {
    id: 10,
    name: "Bouncer Cat",
    description: "Security expert and friendly guardian",
    price: 33.99,
    image: "/images/products/bouncercat.png",
  },
  {
    id: 11,
    name: "Skate Tocat",
    description: "Shred the code, grind the bugs",
    price: 32.99,
    image: "/images/products/skatetocat.png",
  },
  {
    id: 12,
    name: "Vinyl Tocat",
    description: "For those who appreciate the classics",
    price: 37.99,
    image: "/images/products/vinyltocat.png",
  },
  {
    id: 13,
    name: "Cherry On Top O Cat",
    description: "The perfect finishing touch",
    price: 30.99,
    image: "/images/products/cherryontop-o-cat.png",
  },
  {
    id: 14,
    name: "Oktobercat",
    description: "Celebrate in style",
    price: 34.99,
    image: "/images/products/oktobercat.png",
  },
  {
    id: 15,
    name: "Welcome Tocat",
    description: "A friendly greeting for all",
    price: 29.99,
    image: "/images/products/welcometocat.png",
  },
  {
    id: 16,
    name: "Yogi Tocat",
    description: "Find your inner peace while coding",
    price: 31.99,
    image: "/images/products/yogitocat.png",
  },
  {
    id: 17,
    name: "Sponsor Tocat",
    description: "Support open source in style",
    price: 38.99,
    image: "/images/products/sponsortocat.png",
  },
  {
    id: 18,
    name: "Inflato Cat",
    description: "Full of hot air and ready to code",
    price: 35.99,
    image: "/images/products/inflatocat.png",
  },
  {
    id: 19,
    name: "Red Polo Octocat",
    description: "Classic style meets modern coding",
    price: 32.99,
    image: "/images/products/red-polo.png",
  },
  {
    id: 20,
    name: "Professor Tocat",
    description: "Wisdom and knowledge personified",
    price: 36.99,
    image: "/images/products/Professortocat_v2.png",
  },
];

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
          {products.map((product) => (
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
                  <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
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
