export interface FeatureHighlight {
  title: string;
  description: string;
  position: 'left' | 'right';
  icon: 'bean' | 'flame' | 'sparkles' | 'cup';
}

export const features: FeatureHighlight[] = [
  {
    title: 'Single-Origin Sourcing',
    description:
      'We source our beans directly from sustainable, family-owned farms in Ethiopia, Colombia, and Sumatra, paying above fair-trade prices for exceptional crops.',
    position: 'left',
    icon: 'bean',
  },
  {
    title: 'Artisanal Roasting',
    description:
      'Each batch is roasted locally with meticulous precision, highlighting the natural tasting notes, bright acidity, and complex profiles of each origin.',
    position: 'right',
    icon: 'flame',
  },
  {
    title: 'Sensory Experience',
    description:
      'Our coffees are crafted to deliver a complete sensory journey—from the rich, floral aroma to the velvety body and lingering, sweet finish.',
    position: 'left',
    icon: 'sparkles',
  },
  {
    title: 'Master Brewing',
    description:
      'Our certified baristas use precise water temperatures, ratios, and extraction methods to ensure every cup is brewed to its absolute peak potential.',
    position: 'right',
    icon: 'cup',
  },
];
