'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '@/types';
import { coupons } from '@/lib/products';

interface CartContextType {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize with empty state for SSR consistency
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage after mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCoupon = localStorage.getItem('coupon');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
    
    if (savedCoupon) {
      try {
        setCoupon(JSON.parse(savedCoupon));
      } catch (e) {
        console.error('Failed to load coupon from localStorage', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (but not during initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (coupon) {
        localStorage.setItem('coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('coupon');
      }
    }
  }, [coupon, isLoaded]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = (code: string): boolean => {
    const foundCoupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );
    
    if (foundCoupon) {
      setCoupon(foundCoupon);
      return true;
    }
    
    return false;
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const getSubtotal = (): number => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getDiscount = (): number => {
    if (!coupon) return 0;
    const subtotal = getSubtotal();
    
    if (coupon.discountAmount) {
      return coupon.discountAmount;
    }
    
    return (subtotal * coupon.discountPercentage) / 100;
  };

  const getTotal = (): number => {
    return Math.max(0, getSubtotal() - getDiscount());
  };

  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscount,
        getTotal,
        getItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
