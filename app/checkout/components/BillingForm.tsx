import type { BillingAddress } from '@/types/checkout';

interface BillingFormProps {
  billingAddress: BillingAddress;
  sameAsShipping: boolean;
  onFieldChange: (field: keyof BillingAddress, value: string) => void;
  onToggleSameAsShipping: (checked: boolean) => void;
}

export default function BillingForm({ 
  billingAddress, 
  sameAsShipping, 
  onFieldChange, 
  onToggleSameAsShipping 
}: BillingFormProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
        Billing Address
      </h2>
      
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => onToggleSameAsShipping(e.target.checked)}
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
              onChange={(e) => onFieldChange('fullName', e.target.value)}
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
              onChange={(e) => onFieldChange('address', e.target.value)}
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
                onChange={(e) => onFieldChange('city', e.target.value)}
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
                onChange={(e) => onFieldChange('state', e.target.value)}
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
            <label htmlFor="billingCountry" className="block font-body text-sm font-medium text-charcoal/70 mb-2">
              Country *
            </label>
            <input
              type="text"
              id="billingCountry"
              value={billingAddress.country}
              onChange={(e) => onFieldChange('country', e.target.value)}
              className="w-full rounded-lg border-2 border-charcoal/10 px-4 py-3 font-body focus:border-coral focus:outline-none"
              placeholder="United States"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}
