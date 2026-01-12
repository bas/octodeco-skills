import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-coral via-peach to-sky px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-noise opacity-40"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-start gap-6">
            <div className="animate-fadeInUp">
              <h1 className="font-display text-6xl font-bold leading-none tracking-tight text-charcoal md:text-8xl lg:text-9xl">
                OctoDeco
              </h1>
              <p className="font-handwritten text-3xl text-charcoal/80 md:text-4xl">
                Skills & Characters
              </p>
            </div>
            <p className="max-w-2xl animate-fadeInUp font-body text-lg leading-relaxed text-charcoal/90 md:text-xl" style={{ animationDelay: '0.1s' }}>
              Discover our curated collection of GitHub&apos;s most beloved Octocat characters. 
              Each one tells a story, each one brings personality to your projects.
            </p>
            <button className="group animate-fadeInUp mt-4 flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 font-display text-lg font-semibold text-cream transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ animationDelay: '0.2s' }}>
              Explore Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 animate-float rounded-full bg-white/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -left-20 bottom-20 h-80 w-80 animate-floatDelay rounded-full bg-white/20 blur-3xl"></div>
      </header>

      {/* Product Grid Section */}
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 animate-fadeInUp">
          <h2 className="font-display text-4xl font-bold text-charcoal md:text-5xl">
            Featured Characters
          </h2>
          <p className="mt-4 font-body text-lg text-charcoal/70">
            From classic to quirky, each Octocat has its own charm
          </p>
        </div>
        <ProductGrid />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-charcoal/10 bg-cream px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-display text-2xl font-bold text-charcoal">OctoDeco</p>
              <p className="font-body text-sm text-charcoal/60">Skills & Characters</p>
            </div>
            <div className="flex gap-8">
              <button className="font-body text-charcoal/70 transition-colors hover:text-charcoal">About</button>
              <button className="font-body text-charcoal/70 transition-colors hover:text-charcoal">Collection</button>
              <button className="font-body text-charcoal/70 transition-colors hover:text-charcoal">Contact</button>
            </div>
          </div>
          <div className="mt-8 border-t border-charcoal/10 pt-8 text-center">
            <p className="font-body text-sm text-charcoal/50">
              © 2026 OctoDeco Skills. Celebrating GitHub&apos;s iconic characters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
