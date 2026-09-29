// Central color palette for the BrewGo app.
// Every component imports from here instead of hardcoding hex values,
// so the whole app's theme can be changed in one place.
export const COLORS = {
  background: '#FFF8F1', // warm cream app background
  card: '#FFFFFF',
  cardAlt: '#F3E6D8', // soft caramel card used for "pre-filled" info (pickup time, payment)
  ink: '#2B2118', // primary text
  muted: '#93816E', // secondary / helper text
  brown: '#6F4E37', // primary brand color — every tappable / active element
  brownDark: '#4A3324',
  caramel: '#C08552', // secondary accent, used for imagery placeholders & ratings
  line: '#EADFD1', // hairlines, unselected chip borders
  white: '#FFFFFF',
  black: '#000000',
};
