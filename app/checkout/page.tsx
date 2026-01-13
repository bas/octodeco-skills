'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import type { ShippingAddress, BillingAddress } from '@/types/checkout';
import ShippingForm from './components/ShippingForm';
import BillingForm from './components/BillingForm';
import OrderSummary from './components/OrderSummary';
import OrderReview from './components/OrderReview';

// Constants for pricing calculations
const SHIPPING_COST = 10.00;
const TAX_RATE = 0.08;

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
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
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

  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: keyof BillingAddress, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const isShippingValid = () => {
    return !!shippingAddress.fullName.trim() && 
           !!shippingAddress.email.trim() && 
           !!shippingAddress.phone.trim() &&
           !!shippingAddress.address.trim() && 
           !!shippingAddress.city.trim() && 
           !!shippingAddress.state.trim() && 
           !!shippingAddress.zipCode.trim();
  };

  const isBillingValid = () => {
    if (sameAsShipping) return true;
    return !!billingAddress.fullName.trim() && 
           !!billingAddress.address.trim() && 
           !!billingAddress.city.trim() && 
           !!billingAddress.state.trim() && 
           !!billingAddress.zipCode.trim();
  };

  const handleContinueToSummary = () => {
    if (isShippingValid() && isBillingValid()) {
      setShowSummary(true);
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // Simulate API call - in production, this would submit to backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPlacingOrder(false);
    // TODO: Implement actual order submission
    alert('Order placement coming soon! Payment processing not yet implemented.');
  };

  // Note: The sameAsShipping state is preserved when navigating between form and summary views
  // because React maintains component state. Only the showSummary flag changes.

  if (items.length === 0) {
    return null; // Will redirect
  }

  if (showSummary) {
    return (
      <OrderReview
        shippingAddress={shippingAddress}
        billingAddress={billingAddress}
        sameAsShipping={sameAsShipping}
        items={items}
        subtotal={subtotal}
        discount={discount}
        discountCode={discountCode}
        shippingCost={SHIPPING_COST}
        taxRate={TAX_RATE}
        isPlacingOrder={isPlacingOrder}
        onEdit={() => setShowSummary(false)}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-body text-charcoal/70 transition-colors hover:text-coral"
          >
            ← Back to Cart
          </Link>
          <h1 className="mt-4 font-display text-5xl font-bold text-charcoal md:text-6xl">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms Section */}
          <div className="lg:col-span-2 space-y-6">
            <ShippingForm
              shippingAddress={shippingAddress}
              onFieldChange={handleShippingChange}
            />
            
            <BillingForm
              billingAddress={billingAddress}
              sameAsShipping={sameAsShipping}
              onFieldChange={handleBillingChange}
              onToggleSameAsShipping={setSameAsShipping}
            />
          </div>

          {/* Order Summary Sidebar */}
          <OrderSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            discountCode={discountCode}
            shippingCost={SHIPPING_COST}
            taxRate={TAX_RATE}
            isValid={isShippingValid() && isBillingValid()}
            onContinue={handleContinueToSummary}
          />
        </div>
      </div>
    </div>
  );
}
