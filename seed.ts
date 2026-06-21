import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  {
    slug: 'signature-espresso',
    name: 'Signature Espresso',
    description: 'Bold double shot with caramel crema and a silky finish. For lovers of intense, pure coffee.',
    price: 3.25,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    category: 'espresso',
    flavor: 'classic',
    caffeine: 'high',
    features: JSON.stringify(['Double shot', 'Rich crema', 'Bold']),
    tags: JSON.stringify(['bold', 'strong', 'classic', 'morning']),
  },
  {
    slug: 'vanilla-latte',
    name: 'Vanilla Bean Latte',
    description: 'Espresso folded into steamed milk with real vanilla. Smooth, sweet, and comforting.',
    price: 4.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    category: 'latte',
    flavor: 'vanilla',
    caffeine: 'medium',
    features: JSON.stringify(['Espresso', 'Steamed milk', 'Vanilla']),
    tags: JSON.stringify(['sweet', 'creamy', 'vanilla', 'popular']),
  },
  {
    slug: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    description: 'Layered espresso and milk crowned with buttery caramel drizzle. A café favorite.',
    price: 4.75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e3d9?w=600&q=80',
    category: 'latte',
    flavor: 'caramel',
    caffeine: 'medium',
    features: JSON.stringify(['Espresso', 'Caramel', 'Foam art']),
    tags: JSON.stringify(['caramel', 'sweet', 'layered', 'dessert']),
  },
  {
    slug: 'hazelnut-cappuccino',
    name: 'Hazelnut Cappuccino',
    description: 'Nutty hazelnut syrup meets velvety microfoam on a balanced espresso base.',
    price: 4.25,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534778101970-62818bd4358f?w=600&q=80',
    category: 'espresso',
    flavor: 'hazelnut',
    caffeine: 'medium',
    features: JSON.stringify(['Espresso', 'Hazelnut', 'Microfoam']),
    tags: JSON.stringify(['nutty', 'hazelnut', 'foam', 'cozy']),
  },
  {
    slug: 'mocha-dream',
    name: 'Mocha Dream',
    description: 'Dark chocolate and espresso swirled with steamed milk. Decadent yet balanced.',
    price: 4.95,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    category: 'specialty',
    flavor: 'mocha',
    caffeine: 'medium',
    features: JSON.stringify(['Chocolate', 'Espresso', 'Whipped cream']),
    tags: JSON.stringify(['chocolate', 'mocha', 'sweet', 'indulgent']),
  },
  {
    slug: 'iced-americano',
    name: 'Iced Americano',
    description: 'Chilled espresso shots over ice with a splash of water. Clean, crisp, refreshing.',
    price: 3.75,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517701603779-6ff8d0a3b223?w=600&q=80',
    category: 'cold-brew',
    flavor: 'classic',
    caffeine: 'high',
    features: JSON.stringify(['Iced', 'Espresso', 'Light']),
    tags: JSON.stringify(['iced', 'refreshing', 'summer', 'light']),
  },
  {
    slug: 'citrus-cold-brew',
    name: 'Citrus Cold Brew',
    description: '24-hour cold brew brightened with orange peel and a hint of honey.',
    price: 5.25,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517487881594-278fdf16c405?w=600&q=80',
    category: 'cold-brew',
    flavor: 'citrus',
    caffeine: 'high',
    features: JSON.stringify(['Cold brew', 'Orange', 'Honey']),
    tags: JSON.stringify(['citrus', 'cold', 'fruity', 'refreshing']),
  },
  {
    slug: 'cinnamon-spiced-latte',
    name: 'Cinnamon Spiced Latte',
    description: 'Warm spices, brown sugar, and espresso in steamed milk. Perfect for cool days.',
    price: 4.85,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1447933603533-5663f6a15693?w=600&q=80',
    category: 'latte',
    flavor: 'spiced',
    caffeine: 'medium',
    features: JSON.stringify(['Cinnamon', 'Espresso', 'Brown sugar']),
    tags: JSON.stringify(['spiced', 'warm', 'cozy', 'fall']),
  },
  {
    slug: 'flat-white',
    name: 'Artisan Flat White',
    description: 'Ristretto and microfoam in perfect ratio. Silky texture with chocolate notes.',
    price: 4.35,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    category: 'espresso',
    flavor: 'classic',
    caffeine: 'high',
    features: JSON.stringify(['Ristretto', 'Microfoam', 'Silky']),
    tags: JSON.stringify(['classic', 'smooth', 'australian', 'bold']),
  },
  {
    slug: 'matcha-latte',
    name: 'Ceremonial Matcha Latte',
    description: 'Stone-ground matcha whisked with oat milk. Earthy, calm energy without the jitters.',
    price: 5.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515823064-611b6f4c4aba?w=600&q=80',
    category: 'tea-alt',
    flavor: 'classic',
    caffeine: 'low',
    features: JSON.stringify(['Matcha', 'Oat milk', 'Antioxidants']),
    tags: JSON.stringify(['matcha', 'green', 'calm', 'healthy']),
  },
  {
    slug: 'honey-almond-cold-brew',
    name: 'Honey Almond Cold Brew',
    description: 'Slow-steeped cold brew with house almond milk and wildflower honey.',
    price: 5.75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    category: 'cold-brew',
    flavor: 'hazelnut',
    caffeine: 'high',
    features: JSON.stringify(['Cold brew', 'Almond', 'Honey']),
    tags: JSON.stringify(['almond', 'honey', 'cold', 'nutty']),
  },
  {
    slug: 'dark-chocolate-frappe',
    name: 'Dark Chocolate Frappe',
    description: 'Blended ice, espresso, and 72% dark chocolate. Thick, frosty indulgence.',
    price: 5.95,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    category: 'specialty',
    flavor: 'mocha',
    caffeine: 'medium',
    features: JSON.stringify(['Blended', 'Dark chocolate', 'Whipped top']),
    tags: JSON.stringify(['frappe', 'chocolate', 'frozen', 'dessert']),
  },
  {
    slug: 'coconut-vanilla-iced',
    name: 'Coconut Vanilla Iced',
    description: 'Iced latte with coconut cream and Madagascar vanilla. Tropical and creamy.',
    price: 5.15,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    category: 'cold-brew',
    flavor: 'vanilla',
    caffeine: 'medium',
    features: JSON.stringify(['Coconut', 'Iced', 'Vanilla']),
    tags: JSON.stringify(['coconut', 'tropical', 'vanilla', 'iced']),
  },
  {
    slug: 'golden-turmeric-latte',
    name: 'Golden Turmeric Latte',
    description: 'Turmeric, ginger, and black pepper in steamed oat milk. Caffeine-free wellness cup.',
    price: 4.65,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
    category: 'tea-alt',
    flavor: 'spiced',
    caffeine: 'none',
    features: JSON.stringify(['Turmeric', 'Ginger', 'Caffeine-free']),
    tags: JSON.stringify(['wellness', 'spiced', 'caffeine-free', 'golden']),
  },
];

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@artisancoffee.com' },
    update: {},
    create: {
      email: 'admin@artisancoffee.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'customer@artisancoffee.com' },
    update: {},
    create: {
      email: 'customer@artisancoffee.com',
      name: 'Demo Customer',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`Database seeded with ${products.length} coffees.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
