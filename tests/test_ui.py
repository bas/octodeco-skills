#!/usr/bin/env python3
"""
UI Test Suite for OctoDeco Skills
Tests navigation, cart functionality, and discount coupons
"""

from playwright.sync_api import sync_playwright, expect
import os

# Use environment variable for base URL, default to localhost
BASE_URL = os.getenv('BASE_URL', 'http://localhost:3000')

def test_octodeco_ui():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print("🧪 Starting OctoDeco UI Tests...")
        print(f"Testing against: {BASE_URL}")
        print()
        
        # Test 1: Landing Page
        print("✓ Test 1: Landing Page")
        page.goto(BASE_URL)
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/01-landing-page.png', full_page=True)
        
        # Verify header is present
        header = page.locator('header nav')
        expect(header).to_be_visible()
        
        # Verify footer is present
        footer = page.locator('footer')
        expect(footer).to_be_visible()
        
        # Verify exactly 4 featured products are shown
        featured_products = page.locator('[id="collection"] .grid > div')
        expect(featured_products).to_have_count(4)
        print("  ✓ Header, footer, and 4 featured products visible")
        print()
        
        # Test 2: Navigation to Products Page
        print("✓ Test 2: Navigation to Products Page")
        page.click('text=Products')
        page.wait_for_url('**/products')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/02-products-page.png', full_page=True)
        
        # Verify all 20 products are shown
        all_products = page.locator('.grid > div')
        expect(all_products).to_have_count(20)
        print("  ✓ All 20 products visible on products page")
        print()
        
        # Test 3: Add to Cart Functionality
        print("✓ Test 3: Add to Cart Functionality")
        
        # Add first product to cart
        first_add_button = page.locator('button:has-text("Add to Cart")').first
        first_add_button.click()
        
        # Wait for cart badge to appear and show count
        cart_badge = page.locator('a[href="/cart"] span')
        expect(cart_badge).to_have_text('1')
        print("  ✓ Cart badge shows 1 item")
        
        # Add second product
        second_add_button = page.locator('button:has-text("Add to Cart")').nth(1)
        second_add_button.click()
        expect(cart_badge).to_have_text('2')
        print("  ✓ Cart badge updated to 2 items")
        print()
        
        # Test 4: Navigation to Cart
        print("✓ Test 4: Navigation to Cart Page")
        page.click('text=Cart')
        page.wait_for_url('**/cart')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/03-cart-with-items.png', full_page=True)
        
        # Verify cart items are displayed
        cart_items = page.locator('.lg\\:col-span-2 > div')
        expect(cart_items).to_have_count(2)
        print("  ✓ 2 items displayed in cart")
        print()
        
        # Test 5: Quantity Controls
        print("✓ Test 5: Quantity Controls")
        
        # Increase quantity of first item
        increase_button = page.locator('button[aria-label="Increase quantity"]').first
        increase_button.click()
        
        # Wait for quantity to update
        quantity = page.locator('.w-8.text-center').first
        expect(quantity).to_have_text('2')
        print("  ✓ Quantity increased to 2")
        
        # Verify cart badge updated
        expect(cart_badge).to_have_text('3')
        print("  ✓ Cart badge updated to 3 items")
        print()
        
        # Test 6: Discount Coupon - Valid Code
        print("✓ Test 6: Discount Coupon - Valid Code")
        page.screenshot(path='/tmp/04-cart-before-coupon.png', full_page=True)
        
        # Get original subtotal
        subtotal_text = page.locator('text=Subtotal').locator('..').locator('span').nth(1).inner_text()
        print(f"  Original subtotal: {subtotal_text}")
        
        # Apply valid coupon
        coupon_input = page.locator('#coupon')
        coupon_input.fill('OCTO10')
        page.click('button:has-text("Apply")')
        
        # Wait for success message to appear
        success_message = page.locator('text=applied successfully')
        expect(success_message).to_be_visible()
        print("  ✓ Success message displayed")
        
        # Verify discount is shown
        discount_row = page.locator('text=Discount (10%)')
        expect(discount_row).to_be_visible()
        print("  ✓ Discount row visible (10% off)")
        
        page.screenshot(path='/tmp/05-cart-with-coupon.png', full_page=True)
        print()
        
        # Test 7: Invalid Coupon Code
        print("✓ Test 7: Invalid Coupon Code (after clearing)")
        
        # Clear cart and add item again for fresh test
        page.click('text=Clear Cart')
        
        # Wait for empty cart message to appear
        empty_message = page.locator('text=Your cart is empty')
        expect(empty_message).to_be_visible()
        
        # Navigate back to products
        page.click('text=Products')
        page.wait_for_load_state('networkidle')
        
        # Add one item
        page.locator('button:has-text("Add to Cart")').first.click()
        
        # Wait for cart badge to update
        expect(cart_badge).to_have_text('1')
        
        # Go to cart
        page.click('text=Cart')
        page.wait_for_load_state('networkidle')
        
        # Try invalid coupon
        page.locator('#coupon').fill('INVALID')
        page.click('button:has-text("Apply")')
        
        # Wait for error message to appear
        error_message = page.locator('text=Invalid coupon code')
        expect(error_message).to_be_visible()
        print("  ✓ Error message displayed for invalid code")
        
        page.screenshot(path='/tmp/06-invalid-coupon.png', full_page=True)
        print()
        
        # Test 8: Empty Cart
        print("✓ Test 8: Empty Cart State")
        page.click('text=Clear Cart')
        page.wait_for_timeout(500)
        
        empty_message = page.locator('text=Your cart is empty')
        expect(empty_message).to_be_visible()
        print("  ✓ Empty cart message displayed")
        
        # Verify "Browse Products" button exists
        browse_button = page.locator('a:has-text("Browse Products")')
        expect(browse_button).to_be_visible()
        print("  ✓ Browse Products button visible")
        
        page.screenshot(path='/tmp/07-empty-cart.png', full_page=True)
        print()
        
        # Test 9: Navigation from Empty Cart to Products
        print("✓ Test 9: Navigation from Empty Cart")
        browse_button.click()
        page.wait_for_url('**/products')
        page.wait_for_load_state('networkidle')
        print("  ✓ Successfully navigated back to products")
        print()
        
        # Test 10: Header Navigation - Home Link
        print("✓ Test 10: Header Navigation - Home Link")
        page.click('header a:has-text("Home")')
        page.wait_for_url('http://localhost:3000/')
        page.wait_for_load_state('networkidle')
        print("  ✓ Successfully navigated to home page")
        
        page.screenshot(path='/tmp/08-final-home-page.png', full_page=True)
        print()
        
        print("=" * 50)
        print("🎉 All UI Tests Passed!")
        print("=" * 50)
        print("\n📸 Screenshots saved:")
        print("  - /tmp/01-landing-page.png")
        print("  - /tmp/02-products-page.png")
        print("  - /tmp/03-cart-with-items.png")
        print("  - /tmp/04-cart-before-coupon.png")
        print("  - /tmp/05-cart-with-coupon.png")
        print("  - /tmp/06-invalid-coupon.png")
        print("  - /tmp/07-empty-cart.png")
        print("  - /tmp/08-final-home-page.png")
        
        # Close browser
        browser.close()

if __name__ == '__main__':
    test_octodeco_ui()
