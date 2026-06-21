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

- **Admin:** `admin@artisancoffee.com` / `admin123`
- **Customer:** `customer@artisancoffee.com` / `customer123`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up the database:

```bash
npm run db:setup
```

3. Add assets to `public/coffee/` and animation frames to `public/frames/` (see original README notes).

4. Start the dev server:

```bash
npm run dev
```

Open (https://coffee-nu-jade.vercel.app/)

**Important:** Run the app with `npm run dev`. Do not open HTML files directly — API routes, login, and the database require the Next.js server.

## Tech stack

- **Frontend:** Next.js App Router, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes
- **Database:** SQLite via Prisma
- **Auth:** NextAuth.js (credentials, JWT sessions)
