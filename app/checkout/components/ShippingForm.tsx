import type { ShippingAddress } from '@/types/checkout';

interface ShippingFormProps {
  shippingAddress: ShippingAddress;
  onFieldChange: (field: keyof ShippingAddress, value: string) => void;
}

export default function ShippingForm({ shippingAddress, onFieldChange }: ShippingFormProps) {
  return (
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
            onChange={(e) => onFieldChange('fullName', e.target.value)}
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
              onChange={(e) => onFieldChange('email', e.target.value)}
              className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
              placeholder="john@example.com"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address (for example, name@example.com)."
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
              onChange={(e) => onFieldChange('phone', e.target.value)}
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
            onChange={(e) => onFieldChange('address', e.target.value)}
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
              onChange={(e) => onFieldChange('city', e.target.value)}
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
              onChange={(e) => onFieldChange('state', e.target.value)}
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
              onChange={(e) => onFieldChange('zipCode', e.target.value)}
              className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
              placeholder="94102"
              required
              pattern="^\d{5}(-\d{4})?$"
              inputMode="numeric"
              title="Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
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
            onChange={(e) => onFieldChange('country', e.target.value)}
            className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
            placeholder="United States"
            required
          />
        </div>
      </div>
    </div>
  );
}
