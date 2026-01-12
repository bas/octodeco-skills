import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "OctoDeco Skills - GitHub Octocat Character Collection",
  description: "Discover our curated collection of GitHub's most beloved Octocat characters. Each one tells a story, each one brings personality to your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800;9..144,900&family=Inter:wght@400;500;600&family=Caveat:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <MainLayout>{children}</MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}
