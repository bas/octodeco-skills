import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Products - OctoDeco Skills",
  description: "Browse our full collection of unique Octocat characters",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center animate-fadeInUp">
          <h1 className="font-display text-5xl font-bold text-charcoal md:text-6xl">
            All Products
          </h1>
          <p className="mt-4 font-body text-lg text-charcoal/70 max-w-2xl mx-auto">
            Explore our complete collection of GitHub&apos;s legendary Octocat characters. 
            Each one brings unique personality to your projects.
          </p>
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
