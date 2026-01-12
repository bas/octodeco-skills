import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FEF9F3',
        peach: '#FFD4C4',
        coral: '#FF6B6B',
        sky: '#A8DADC',
        charcoal: '#2D3142',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(45, 49, 66, 0.08)',
        cardHover: '0 12px 40px rgba(45, 49, 66, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
