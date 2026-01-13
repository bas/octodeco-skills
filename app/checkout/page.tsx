'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import type { ShippingAddress, BillingAddress } from '@/types/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    discount,
    discountCode,
  } = useCart();

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const subtotal = getSubtotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const estimatedShipping = 10.00; // Fixed for demo
  const tax = total * 0.08; // 8% tax for demo
  const grandTotal = total + estimatedShipping + tax;

  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: keyof BillingAddress, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const isShippingValid = () => {
    return shippingAddress.fullName && 
           shippingAddress.email && 
           shippingAddress.phone &&
           shippingAddress.address && 
           shippingAddress.city && 
           shippingAddress.state && 
           shippingAddress.zipCode;
  };

  const isBillingValid = () => {
    if (sameAsShipping) return true;
    return billingAddress.fullName && 
           billingAddress.address && 
           billingAddress.city && 
           billingAddress.state && 
           billingAddress.zipCode;
  };

  const handleContinueToSummary = () => {
    if (isShippingValid() && isBillingValid()) {
      setShowSummary(true);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  if (showSummary) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-display text-5xl font-bold text-charcoal md:text-6xl">
              Order Summary
            </h1>
            <p className="mt-4 font-body text-lg text-charcoal/70">
              Review your order details
            </p>
          </div>

          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Shipping Address
                </h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="font-body text-sm text-coral hover:underline focus:outline-none"
                >
                  Edit
                </button>
              </div>
              <div className="font-body text-charcoal/70 space-y-1">
                <p className="font-semibold text-charcoal">{shippingAddress.fullName}</p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                <p>{shippingAddress.country}</p>
              </div>
            </div>

            {/* Billing Information */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Billing Address
                </h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="font-body text-sm text-coral hover:underline focus:outline-none"
                >
                  Edit
                </button>
              </div>
              {sameAsShipping ? (
                <p className="font-body text-charcoal/70">Same as shipping address</p>
              ) : (
                <div className="font-body text-charcoal/70 space-y-1">
                  <p className="font-semibold text-charcoal">{billingAddress.fullName}</p>
                  <p>{billingAddress.address}</p>
                  <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}</p>
                  <p>{billingAddress.country}</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
                Order Items ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-charcoal/10 last:border-0 last:pb-0">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-peach/20 to-sky/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-charcoal">
                        {item.name}
                      </h3>
                      <p className="font-body text-sm text-charcoal/60">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="font-display text-lg font-bold text-coral">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
                Order Total
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between font-body text-charcoal/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-green-600">
                    <span>Discount ({(discount * 100).toFixed(0)}%) - {discountCode}</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-charcoal/70">
                  <span>Shipping</span>
                  <span>${estimatedShipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-charcoal/70">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-3 font-display text-2xl font-bold text-charcoal">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowSummary(false)}
                className="flex-1 rounded-full border-2 border-charcoal/20 px-6 py-4 font-display text-lg font-semibold text-charcoal transition-all duration-300 hover:border-charcoal/40 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
              >
                Back to Edit
              </button>
              <button
                className="flex-1 rounded-full bg-coral px-6 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
              >
                Place Order
              </button>
            </div>
            
            <p className="text-center font-body text-sm text-charcoal/50">
              Payment processing coming soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-body text-charcoal/70 transition-colors hover:text-coral focus:outline-none focus:underline mb-4"
          >
            ← Back to Cart
          </Link>
          <h1 className="font-display text-5xl font-bold text-charcoal md:text-6xl">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Forms Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={shippingAddress.fullName}
                    onChange={(e) => handleShippingChange('fullName', e.target.value)}
                    className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={shippingAddress.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="(555) 123-4567"
                      required
                      pattern="^[0-9+()\\s-]{7,20}$"
                      title="Please enter a valid phone number (7–20 characters, digits, spaces, +, -, and parentheses)."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={shippingAddress.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="CA"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="94102"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={shippingAddress.country}
                    onChange={(e) => handleShippingChange('country', e.target.value)}
                    className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                    placeholder="United States"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Billing Address
              </h2>
              
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    className="h-5 w-5 rounded border-2 border-charcoal/20 text-coral focus:ring-2 focus:ring-coral"
                  />
                  <span className="font-body text-charcoal">
                    Same as shipping address
                  </span>
                </label>
              </div>

              {!sameAsShipping && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="billingFullName" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="billingFullName"
                      value={billingAddress.fullName}
                      onChange={(e) => handleBillingChange('fullName', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="billingAddress" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      value={billingAddress.address}
                      onChange={(e) => handleBillingChange('address', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="billingCity" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        value={billingAddress.city}
                        onChange={(e) => handleBillingChange('city', e.target.value)}
                        className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                        placeholder="San Francisco"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingState" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="billingState"
                        value={billingAddress.state}
                        onChange={(e) => handleBillingChange('state', e.target.value)}
                        className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                        placeholder="CA"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingZipCode" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="billingZipCode"
                        value={billingAddress.zipCode}
                        onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                        className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                        placeholder="94102"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="billingCountry" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="billingCountry"
                      value={billingAddress.country}
                      onChange={(e) => handleBillingChange('country', e.target.value)}
                      className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
                      placeholder="United States"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-peach/20 to-sky/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-charcoal truncate">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-charcoal/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="font-display text-sm font-semibold text-coral">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-charcoal/10 pt-4 mb-6">
                <div className="flex justify-between font-body text-sm text-charcoal/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-sm text-green-600">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm text-charcoal/70">
                  <span>Shipping</span>
                  <span>${estimatedShipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-charcoal/70">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-3 font-display text-xl font-bold text-charcoal">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinueToSummary}
                disabled={!isShippingValid() || !isBillingValid()}
                className="w-full rounded-full bg-coral px-6 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                Continue to Summary
              </button>

              <p className="mt-4 text-center font-body text-xs text-charcoal/50">
                * All fields are required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
