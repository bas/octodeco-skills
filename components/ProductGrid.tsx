'use client';

import Image from 'next/image';

const products = [
  { id: 1, name: 'Original Octocat', image: '/images/products/original.png', description: 'The one that started it all' },
  { id: 2, name: 'Dino Octocat', image: '/images/products/dinotocat.png', description: 'Prehistoric coding companion' },
  { id: 3, name: 'Jetpack Octocat', image: '/images/products/jetpacktocat.png', description: 'Ready for launch' },
  { id: 4, name: 'Female Coder', image: '/images/products/femalecodertocat.png', description: 'Breaking barriers' },
  { id: 5, name: 'Yoga Octocat', image: '/images/products/yogitocat.png', description: 'Finding balance' },
  { id: 6, name: 'Surfing Octocat', image: '/images/products/surftocat.png', description: 'Riding the wave' },
  { id: 7, name: 'Professor Octocat', image: '/images/products/Professortocat_v2.png', description: 'Teaching the next generation' },
  { id: 8, name: 'Mona the Riveter', image: '/images/products/mona-the-rivetertocat.png', description: 'We can code it!' },
  { id: 9, name: 'Cherry on Top', image: '/images/products/cherryontop-o-cat.png', description: 'Sweet success' },
  { id: 10, name: 'Skater Octocat', image: '/images/products/skatetocat.png', description: 'Grinding through bugs' },
  { id: 11, name: 'Vinyl Octocat', image: '/images/products/vinyltocat.png', description: 'Old school cool' },
  { id: 12, name: 'Terracotta Octocat', image: '/images/products/Terracottocat_Single.png', description: 'Ancient wisdom' },
  { id: 13, name: 'Bouncer Octocat', image: '/images/products/bouncercat.png', description: 'Keeping code secure' },
  { id: 14, name: 'Justice Octocat', image: '/images/products/justicetocat.jpg', description: 'Fighting for good code' },
  { id: 15, name: 'Oktoberfest', image: '/images/products/oktobercat.png', description: 'Celebrating success' },
  { id: 16, name: 'Welcome Octocat', image: '/images/products/welcometocat.png', description: 'Hello, world!' },
  { id: 17, name: 'Red Polo', image: '/images/products/red-polo.png', description: 'Classic style' },
  { id: 18, name: 'Sponsor Octocat', image: '/images/products/sponsortocat.png', description: 'Supporting open source' },
  { id: 19, name: 'Inflato Octocat', image: '/images/products/inflatocat.png', description: 'Full of hot air' },
  { id: 20, name: 'Manufacture', image: '/images/products/manufacturetocat.png', description: 'Building the future' },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <button
          key={product.id}
          className="group relative animate-fadeInUp overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-500 hover:scale-105 hover:shadow-cardHover focus:scale-105 focus:shadow-cardHover focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
          style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
          aria-label={`View ${product.name}: ${product.description}`}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-peach/20 to-sky/20">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <p className="font-handwritten text-xl">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 text-left">
            <h3 className="font-display text-xl font-semibold text-charcoal">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-coral"></span>
              <span className="font-body text-sm text-charcoal/60">In Collection</span>
            </div>
          </div>

          {/* Card Number Badge */}
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-coral font-display text-sm font-bold text-white shadow-lg">
            {product.id}
          </div>
        </button>
      ))}
    </div>
  );
}
