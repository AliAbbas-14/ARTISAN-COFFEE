'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/components/CartProvider';
import CartToast from '@/components/CartToast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <CartToast />
      </CartProvider>
    </SessionProvider>
  );
}
