// Reusable spacing / radius tokens (instead of magic numbers scattered
// across StyleSheet.create calls). Matches the 8/12/16/24 scale used in
// the Figma design (cross_assignment_2).
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999, // fully rounded — chips, buttons, avatars
};

export const FONT_SIZE = {
  xs: 12,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
};

// Breakpoint used by components that need to reflow for larger screens
// (tablets, split-screen, landscape phones) — mirrors the "large screen
// variant" from the cross_assignment_2 design.
export const BREAKPOINT_TABLET = 600;
