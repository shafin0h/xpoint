import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/data/products';

export type CartItem = { product: Product; quantity: number; size: string; color: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: number) => void;
  removeItem: (slug: string, size: string, color: number) => void;
  setItemQuantity: (slug: string, size: string, color: number, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem('xpoint-cart');
      return saved ? JSON.parse(saved) as CartItem[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('xpoint-cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (product, quantity = 1, size = 'M', color = 0) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.slug === product.slug && item.size === size && item.color === color);
        if (existing) {
          return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...current, { product, quantity, size, color }];
      });
    },
    removeItem: (slug, size, color) => setItems((current) => current.filter((item) => !(item.product.slug === slug && item.size === size && item.color === color))),
    setItemQuantity: (slug, size, color, quantity) => setItems((current) => current.map((item) => item.product.slug === slug && item.size === size && item.color === color ? { ...item, quantity } : item)),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
