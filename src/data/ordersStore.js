/**
 * ordersStore.js
 *
 * Centralized in-memory store for orders.
 * Allows CheckoutScreen to add newly confirmed orders,
 * OrdersScreen to display them (refreshed via useFocusEffect),
 * and HomeScreen/OrdersScreen to reorder items.
 */

let orders = [
  {
    id: 'ord-101',
    productId: '1',
    title: 'Caramel Oat Latte',
    quantity: 1,
    customization: 'Large · Oat milk · 1 shot',
    totalPrice: 4.75,
    status: 'Picked up',
    statusBadge: 'completed',
    date: 'Yesterday, 3:45 PM',
  },
  {
    id: 'ord-102',
    productId: '2',
    title: 'Cold Brew',
    quantity: 2,
    customization: 'Medium · Standard ice',
    totalPrice: 7.90,
    status: 'Picked up',
    statusBadge: 'completed',
    date: 'Tuesday, 9:15 AM',
  },
];

/**
 * Returns the current list of orders (newest first).
 */
export function getOrders() {
  return [...orders];
}

/**
 * Adds a new order to the front of the list.
 */
export function addOrder(newOrder) {
  const order = {
    id: `ord-${Date.now().toString().slice(-4)}`,
    date: 'Just now',
    status: 'Preparing (ready in ~10m)',
    statusBadge: 'active',
    ...newOrder,
  };
  orders = [order, ...orders];
  return order;
}
