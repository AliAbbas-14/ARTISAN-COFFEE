export interface ProductView {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  flavor: string;
  caffeine: string;
  features: string[];
  tags: string[];
}

export function parseProduct(product: {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
  flavor?: string;
  caffeine?: string;
  features: string;
  tags?: string;
}): ProductView {
  let tags: string[] = [];
  try {
    tags = JSON.parse(product.tags || '[]') as string[];
  } catch {
    tags = [];
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    image: product.image,
    category: product.category ?? 'specialty',
    flavor: product.flavor ?? 'classic',
    caffeine: product.caffeine ?? 'medium',
    features: JSON.parse(product.features) as string[],
    tags,
  };
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
