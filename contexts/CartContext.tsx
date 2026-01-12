'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '../types/product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  discount: number;
  applyDiscount: (code: string) => boolean;
  discountCode: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DISCOUNT_CODES: Record<string, number> = {
  'OCTO10': 0.1,
  'GITHUB20': 0.2,
  'WELCOME15': 0.15,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage on first render
    if (typeof window === 'undefined') return [];
    
    const savedCart = localStorage.getItem('octodeco-cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    return [];
  });

  const [discount, setDiscount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const savedDiscount = localStorage.getItem('octodeco-discount');
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });

  const [discountCode, setDiscountCode] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('octodeco-discount-code') || '';
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('octodeco-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('octodeco-discount', discount.toString());
  }, [discount]);

  useEffect(() => {
    localStorage.setItem('octodeco-discount-code', discountCode);
  }, [discountCode]);

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    setDiscountCode('');
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyDiscount = (code: string) => {
    const upperCode = code.toUpperCase();
    const discountAmount = DISCOUNT_CODES[upperCode];
    
    if (discountAmount) {
      setDiscount(discountAmount);
      setDiscountCode(upperCode);
      return true;
    }
    
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        discount,
        applyDiscount,
        discountCode,
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
