// Every navigator/screen name lives here instead of being typed as a raw
// string in multiple files — a typo in a raw string (`'Hmoe'`) fails
// silently at runtime, a typo referencing this object fails immediately
// at build time.
export const SCREENS = {
  // Root-level (Drawer)
  MAIN: 'Main',
  HELP: 'Help',
  CONTACT: 'Contact',

  // Main stack (pushed on top of the tab bar)
  MAIN_TABS: 'MainTabs',
  PRODUCT_DETAILS: 'ProductDetails',
  CHECKOUT: 'Checkout',

  // Bottom tabs
  HOME: 'Home',
  MENU: 'Menu',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
};
