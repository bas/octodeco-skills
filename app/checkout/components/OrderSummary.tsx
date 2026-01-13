import Image from 'next/image';
import type { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode: string;
  shippingCost: number;
  taxRate: number;
  isValid: boolean;
  onContinue: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  discount,
  discountCode,
  shippingCost,
  taxRate,
  isValid,
  onContinue
}: OrderSummaryProps) {
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const tax = total * taxRate;
  const grandTotal = total + shippingCost + tax;

  return (
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
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-body text-sm text-charcoal/70">
            <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-charcoal/10 pt-3 font-display text-xl font-bold text-charcoal">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={!isValid}
          className="w-full rounded-full bg-coral px-6 py-4 font-display text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-coral/90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          Continue to Summary
        </button>

        <p className="mt-4 text-center font-body text-xs text-charcoal/50">
          * All fields are required
        </p>
      </div>
    </div>
  );
}
