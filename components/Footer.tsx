import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-charcoal/10 bg-cream px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="font-display text-2xl font-bold text-charcoal">OctoDeco</p>
            <p className="font-body text-sm text-charcoal/60">Skills & Characters</p>
          </div>
          <nav className="flex gap-8" aria-label="Footer navigation">
            <Link 
              href="/"
              className="font-body text-charcoal/70 transition-colors hover:text-charcoal focus:outline-none focus:underline"
            >
              Home
            </Link>
            <Link 
              href="/products"
              className="font-body text-charcoal/70 transition-colors hover:text-charcoal focus:outline-none focus:underline"
            >
              Products
            </Link>
            <Link 
              href="/cart"
              className="font-body text-charcoal/70 transition-colors hover:text-charcoal focus:outline-none focus:underline"
            >
              Cart
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-charcoal/10 pt-8 text-center">
          <p className="font-body text-sm text-charcoal/50">
            © 2026 OctoDeco Skills. Celebrating GitHub&apos;s iconic characters.
          </p>
        </div>
      </div>
    </footer>
  );
}
