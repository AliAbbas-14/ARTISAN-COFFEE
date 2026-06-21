export const CATEGORIES = [
  { id: 'all', label: 'All coffees' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'latte', label: 'Lattes' },
  { id: 'cold-brew', label: 'Cold brew & iced' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'tea-alt', label: 'Tea & alternatives' },
] as const;

export const FLAVORS = [
  { id: 'all', label: 'Any flavor' },
  { id: 'classic', label: 'Classic' },
  { id: 'vanilla', label: 'Vanilla' },
  { id: 'caramel', label: 'Caramel' },
  { id: 'hazelnut', label: 'Hazelnut' },
  { id: 'mocha', label: 'Mocha & chocolate' },
  { id: 'citrus', label: 'Citrus' },
  { id: 'spiced', label: 'Spiced' },
] as const;

export const SORT_OPTIONS = [
  { id: 'popular', label: 'Top rated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name A–Z' },
] as const;

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function flavorLabel(id: string): string {
  return FLAVORS.find((f) => f.id === id)?.label ?? id;
}
