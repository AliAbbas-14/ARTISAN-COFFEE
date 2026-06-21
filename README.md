# Artisan Coffee

Full-stack coffee shop app with customer and admin roles, built with Next.js 14, Prisma (SQLite), and NextAuth.

## Pages

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with hero animation |
| `/menu` | Public | Browse products, add to cart (login required) |
| `/cart` | Customer | Review cart and place orders |
| `/orders` | Customer | View order history |
| `/login` | Public | Sign in |
| `/register` | Public | Create customer account |
| `/admin` | Admin | Dashboard |
| `/admin/products` | Admin | Manage products |
| `/admin/orders` | Admin | Manage order status |

## Demo accounts

- **Admin:** `chaliabbas1065@gmail.com` / `admin123`
- **Customer:** `alimahi4540@gmail.com` / `customer123`

## Setup
 
```
 https://coffee-nu-jade.vercel.app/

## Tech stack

- **Frontend:** Next.js App Router, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes
- **Database:** SQLite via Prisma
- **Auth:** NextAuth.js (credentials, JWT sessions)
