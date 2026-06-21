'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cartItemCount, clearCart, loadCart, saveCart, type CartMap } from '@/lib/cart';

type Toast = { id: number; message: string };

interface CartContextValue {
  cart: CartMap;
  count: number;
  addItem: (productId: string, productName?: string) => void;
  updateQty: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  toast: Toast | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    const t = setTimeout(() => setToast((cur) => (cur?.id === id ? null : cur)), 2800);
    return () => clearTimeout(t);
  }, []);

  const persist = useCallback((next: CartMap) => {
    setCart(next);
    saveCart(next);
  }, []);

  const addItem = useCallback(
    (productId: string, productName?: string) => {
      const next = { ...loadCart() };
      next[productId] = (next[productId] || 0) + 1;
      persist(next);
      showToast(productName ? `Added ${productName} to cart` : 'Added to cart');
    },
    [persist, showToast]
  );

  const updateQty = useCallback(
    (productId: string, delta: number) => {
      const next = { ...loadCart() };
      next[productId] = Math.max(0, (next[productId] || 0) + delta);
      if (next[productId] === 0) delete next[productId];
      persist(next);
    },
    [persist]
  );

  const removeItem = useCallback(
    (productId: string) => {
      const next = { ...loadCart() };
      delete next[productId];
      persist(next);
    },
    [persist]
  );

  const clear = useCallback(() => {
    clearCart();
    setCart({});
  }, []);

  const value = useMemo(
    () => ({
      cart: hydrated ? cart : {},
      count: hydrated ? cartItemCount(cart) : 0,
      addItem,
      updateQty,
      removeItem,
      clear,
      toast,
    }),
    [cart, hydrated, addItem, updateQty, removeItem, clear, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
