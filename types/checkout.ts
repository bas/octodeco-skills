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

export interface BillingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutData {
  shipping: ShippingAddress;
  billing: BillingAddress;
  sameAsShipping: boolean;
}
