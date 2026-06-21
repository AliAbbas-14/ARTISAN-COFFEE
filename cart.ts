export const CART_KEY = 'artisan-cart';

export type CartMap = Record<string, number>;

export function loadCart(): CartMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '{}') as CartMap;
  } catch {
    return {};
  }
}

export function saveCart(cart: CartMap): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function cartItemCount(cart: CartMap): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
