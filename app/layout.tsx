import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
