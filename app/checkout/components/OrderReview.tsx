import Image from 'next/image';
import type { ShippingAddress, BillingAddress } from '@/types/checkout';
import type { CartItem } from '@/contexts/CartContext';

interface OrderReviewProps {
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  sameAsShipping: boolean;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode: string;
  shippingCost: number;
  taxRate: number;
  isPlacingOrder: boolean;
  onEdit: () => void;
  onPlaceOrder: () => void;
}

export default function OrderReview({
  shippingAddress,
  billingAddress,
  sameAsShipping,
  items,
  subtotal,
  discount,
  discountCode,
  shippingCost,
  taxRate,
  isPlacingOrder,
  onEdit,
  onPlaceOrder
}: OrderReviewProps) {
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const tax = total * taxRate;
  const grandTotal = total + shippingCost + tax;

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
                onClick={onEdit}
                className="font-body text-sm text-coral hover:underline focus:outline-none"
                aria-label="Edit shipping address"
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
                onClick={onEdit}
                className="font-body text-sm text-coral hover:underline focus:outline-none"
                aria-label="Edit billing address"
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
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-charcoal/70">
                <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
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
              onClick={onEdit}
              className="flex-1 rounded-full border-2 border-charcoal/20 px-6 py-4 font-display text-lg font-semibold text-charcoal transition-all duration-300 hover:border-charcoal/40 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
            >
              Back to Edit
            </button>
            <button
              onClick={onPlaceOrder}
              disabled={isPlacingOrder}
              className="flex-1 rounded-full bg-coral px-6 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPlacingOrder ? 'Processing...' : 'Place Order'}
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
