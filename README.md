This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🎨 **Consistent UI Design** - Beautiful, cohesive design across all pages
- 🧭 **Global Navigation** - Header with links to Home, Products, and Cart
- 🛒 **Shopping Cart** - Full cart functionality with quantity controls
- 💰 **Discount Coupons** - Apply coupon codes for discounts (OCTO10, GITHUB20, WELCOME15)
- 📱 **Responsive Layout** - Works great on mobile, tablet, and desktop
- 🧪 **UI Testing** - Comprehensive test suite for all features

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

The application includes comprehensive UI tests. See [tests/README.md](tests/README.md) for details.

To run tests:

```bash
# Install test dependencies
pip install playwright
playwright install chromium

# Start dev server in one terminal
npm run dev

# Run tests in another terminal
python tests/test_ui.py
```

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components (Header, Footer, ProductGrid)
- `contexts/` - React context providers (CartContext)
- `lib/` - Shared utilities and data (products)
- `types/` - TypeScript type definitions
- `tests/` - UI test suite

## Available Discount Codes

- `OCTO10` - 10% off your order
- `GITHUB20` - 20% off your order
- `WELCOME15` - 15% off your order
