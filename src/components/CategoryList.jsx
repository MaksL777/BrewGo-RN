import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

/**
 * CategoryList
 *
 * Horizontally-scrolling row of category chips ("All", "Coffee", "Tea"...).
 * Selection is controlled by the parent (selectedCategory + onSelectCategory)
 * so the same list can drive filtering logic anywhere it's used, and so
 * there is a single source of truth for "what's currently selected"
 * instead of duplicating that state inside the component.
 *
 * Props:
 * - categories (string[], required)
 * - selectedCategory (string, required)
 * - onSelectCategory (function, required)
 */
export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => {
        const active = item === selectedCategory;
        return (
          <TouchableOpacity
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelectCategory(item)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{item}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm, // RN 0.71+; falls back gracefully via chip marginRight below on older versions
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginRight: SPACING.sm,
  },
  chipActive: {
    backgroundColor: COLORS.brown,
    borderColor: COLORS.brown,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  labelActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
