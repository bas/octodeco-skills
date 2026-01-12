'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    discount,
    applyDiscount,
    removeDiscount,
    discountCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const subtotal = getSubtotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const success = applyDiscount(couponInput);
    if (success) {
      setCouponSuccess(`Coupon "${couponInput.toUpperCase()}" applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="text-center">
            <h1 className="font-display text-5xl font-bold text-charcoal md:text-6xl">
              Your Cart
            </h1>
            <div className="mt-12 rounded-2xl bg-white p-12 shadow-card">
              <p className="font-body text-xl text-charcoal/70">
                Your cart is empty
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-full bg-coral px-8 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-5xl font-bold text-charcoal md:text-6xl">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="font-body text-sm text-charcoal/70 transition-colors hover:text-coral focus:outline-none focus:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-cardHover"
              >
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-peach/20 to-sky/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-charcoal">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-body text-sm text-charcoal/60">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/10 font-display font-bold text-charcoal transition-colors hover:bg-charcoal/20 focus:outline-none focus:ring-2 focus:ring-coral"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-display font-semibold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/10 font-display font-bold text-charcoal transition-colors hover:bg-charcoal/20 focus:outline-none focus:ring-2 focus:ring-coral"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-display text-lg font-bold text-coral">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start font-body text-sm text-charcoal/50 transition-colors hover:text-coral focus:outline-none focus:underline"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mt-6">
                <label
                  htmlFor="coupon"
                  className="block font-body text-sm font-medium text-charcoal/70"
                >
                  Discount Code
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    id="coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border-2 border-charcoal/10 px-4 py-2 font-body text-sm focus:border-coral focus:outline-none"
                    disabled={!!discountCode}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!!discountCode}
                    className="rounded-lg bg-charcoal px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-charcoal/90 focus:outline-none focus:ring-2 focus:ring-coral disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 font-body text-sm text-coral">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="mt-2 font-body text-sm text-green-600">{couponSuccess}</p>
                )}
                {discountCode && (
                  <div className="mt-2 flex items-center justify-between font-body text-sm text-charcoal/70">
                    <span>
                      Applied: <span className="font-semibold">{discountCode}</span>
                    </span>
                    <button
                      onClick={() => {
                        removeDiscount();
                        setCouponSuccess('');
                      }}
                      className="text-xs font-semibold text-coral hover:underline focus:outline-none"
                      aria-label="Remove discount code"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="mt-2 font-body text-xs text-charcoal/50">
                  Try: OCTO10, GITHUB20, or WELCOME15
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 space-y-3 border-t border-charcoal/10 pt-6">
                <div className="flex justify-between font-body text-charcoal/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-green-600">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-charcoal/10 pt-3 font-display text-xl font-bold text-charcoal">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="mt-6 w-full rounded-full bg-coral px-6 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
                onClick={() => setShowCheckoutMessage(true)}
              >
                Proceed to Checkout
              </button>

              {/* Checkout Message */}
              {showCheckoutMessage && (
                <div className="mt-4 rounded-lg bg-sky/20 border-2 border-sky p-4 text-center">
                  <p className="font-body text-sm text-charcoal">
                    Checkout functionality coming soon! 🚀
                  </p>
                  <button
                    onClick={() => setShowCheckoutMessage(false)}
                    className="mt-2 text-xs font-semibold text-coral hover:underline focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              )}

              <Link
                href="/products"
                className="mt-4 block text-center font-body text-sm text-charcoal/70 transition-colors hover:text-coral focus:outline-none focus:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
