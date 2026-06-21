'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/components/CartProvider';

export default function Navbar() {
  const { data: session } = useSession();
  const { count } = useCart();
  const isAdmin = session?.user?.role === 'ADMIN';
  const isCustomer = session?.user?.role === 'CUSTOMER';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-lg shadow-glow">
            ☕
          </span>
          <span className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors">
            Ali Abbas Coffee Craft
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2 text-sm font-medium">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/menu">Shop</NavLink>

          {(isCustomer || !session) && (
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-muted hover:text-cream hover:bg-surface transition-colors"
            >
              <CartIcon />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>
          )}

          {isCustomer && <NavLink href="/orders">Orders</NavLink>}
          {isAdmin && (
            <NavLink href="/admin" className="text-accent hover:text-gold">
              Admin
            </NavLink>
          )}

          {session ? (
            <>
              <span className="hidden lg:inline text-muted text-xs max-w-[120px] truncate px-2">
                {session.user.name || session.user.email}
              </span>
              <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="btn-ghost text-xs py-2">
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <Link href="/register" className="btn-primary text-xs py-2 px-4 ml-1">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-full text-muted hover:text-cream hover:bg-surface transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}
