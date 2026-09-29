// Single source of truth for product data. Screens look products up by
// id from here instead of each keeping their own copy, which is what
// makes passing just a `productId` between screens (rather than the
// whole product object) meaningful.
export const PRODUCTS = [
  {
    id: '1',
    name: 'Caramel Oat Latte',
    category: 'Coffee',
    price: 4.75,
    rating: 5,
    description: 'Espresso, steamed oat milk, caramel.',
    calories: '190 kcal',
  },
  {
    id: '2',
    name: 'Cold Brew',
    category: 'Cold Brew',
    price: 3.95,
    rating: 4,
    description: 'Slow-steeped 18 hours, served over ice.',
    calories: '5 kcal',
  },
  {
    id: '3',
    name: 'Cappuccino',
    category: 'Coffee',
    price: 3.75,
    rating: 4,
    description: 'Espresso with equal parts steamed milk and foam.',
    calories: '120 kcal',
  },
  {
    id: '4',
    name: 'Almond Croissant',
    category: 'Pastry',
    price: 2.50,
    rating: 5,
    description: 'Butter croissant filled with almond cream.',
    calories: '340 kcal',
  },
  {
    id: '5',
    name: 'Flat White',
    category: 'Coffee',
    price: 4.10,
    rating: 4,
    description: 'Double espresso with velvety micro-foam milk.',
    calories: '150 kcal',
  },
  {
    id: '6',
    name: 'Chai Latte',
    category: 'Tea',
    price: 4.25,
    rating: 4,
    description: 'Spiced black tea concentrate with steamed milk.',
    calories: '210 kcal',
  },
];

export const YOUR_USUAL = {
  productId: '1',
  name: 'Oat Milk Latte, Large',
  description: 'Last ordered Tuesday',
  size: 'L',
  milk: 'Oat',
  extraShots: 0,
  sugar: '50%',
  price: 5.75,
};

/**
 * Looks up a product by id; returns undefined if not found (callers
 * must handle that — see ProductDetailsScreen).
 */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === String(id));
}
