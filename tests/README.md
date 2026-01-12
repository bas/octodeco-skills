# UI Tests

This directory contains UI tests for the OctoDeco Skills application.

## Running Tests

### Prerequisites

```bash
pip install playwright pytest-playwright
playwright install chromium
```

### Run Tests

Make sure the development server is running:

```bash
npm run dev
```

Then in another terminal, run the tests:

```bash
python tests/test_ui.py
```

## Test Coverage

The test suite covers:

1. **Landing Page** - Verifies header, footer, and 4 featured products
2. **Navigation to Products Page** - Confirms all 20 products are displayed
3. **Add to Cart Functionality** - Tests adding multiple items to cart
4. **Cart Badge Updates** - Verifies cart icon shows correct item count
5. **Quantity Controls** - Tests increase/decrease quantity buttons
6. **Valid Discount Coupons** - Tests applying valid coupon codes (OCTO10, GITHUB20, WELCOME15)
7. **Invalid Discount Coupons** - Verifies error handling for invalid codes
8. **Empty Cart State** - Tests empty cart message and navigation
9. **Navigation** - Tests all header navigation links (Home, Products, Cart)

## Available Discount Codes

- `OCTO10` - 10% off
- `GITHUB20` - 20% off
- `WELCOME15` - 15% off

## Screenshots

Tests automatically save screenshots to `/tmp/` directory:
- Landing page
- Products page
- Cart with items
- Cart with discount applied
- Empty cart
- And more...
