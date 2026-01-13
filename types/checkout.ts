/**
 * Shipping address information including contact details.
 * Used for shipping orders and includes email/phone for delivery notifications.
 */
export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Billing address information.
 * Email and phone are not required as they're already captured in shipping address.
 * Used only for payment processing and invoicing purposes.
 */
export interface BillingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Complete checkout data structure.
 * Contains both shipping and billing addresses and preference for using same address.
 */
export interface CheckoutData {
  shipping: ShippingAddress;
  billing: BillingAddress;
  sameAsShipping: boolean;
}
