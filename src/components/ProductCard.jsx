import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

const ProductCard = ({
  item,
  name,
  price,
  description,
  rating = 5,
  variant = 'grid',
  onPress,
  onAddPress,
  style,
}) => {
  const { theme } = useTheme();
  const isHorizontal = variant === 'horizontal';

  const handlePress = React.useCallback(() => {
    if (onPress) onPress(item);
  }, [onPress, item]);

  const handleAddPress = React.useCallback(() => {
    if (onAddPress) onAddPress(item);
    else if (onPress) onPress(item);
  }, [onAddPress, onPress, item]);

  if (isHorizontal) {
    return (
      <TouchableOpacity
        style={[styles.cardHorizontal, { backgroundColor: theme.card }, style]}
        activeOpacity={0.6}
        onPress={handlePress}
      >
        <View style={styles.thumbHorizontal}>
          <Text style={styles.coffeeGlyph}>☕</Text>
        </View>

        <View style={styles.infoHorizontal}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {name}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
          ) : null}
          <Text style={[styles.price, { color: theme.primary }]}>${price.toFixed(2)}</Text>
        </View>

        <View style={styles.actionsHorizontal}>
          {rating > 0 ? (
            <View style={styles.starRow}>
              <Text style={styles.starGlyph}>★</Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPress}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={`Add ${name} to order`}
          >
            <Feather name="plus" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.cardGrid, { backgroundColor: theme.card }, style]}
      activeOpacity={0.6}
      onPress={handlePress}
    >
      <View style={styles.thumbGrid}>
        <Text style={styles.coffeeGlyph}>☕</Text>
      </View>

      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.row}>
        <Text style={[styles.price, { color: theme.primary }]}>${price.toFixed(2)}</Text>
        {rating > 0 && <Stars rating={rating} />}
      </View>

      <TouchableOpacity
        style={styles.addButtonGrid}
        onPress={handleAddPress}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel={`Add ${name} to order`}
      >
        <Feather name="plus" size={16} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <Text style={styles.stars}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </Text>
  );
}

const styles = StyleSheet.create({
  cardGrid: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  thumbGrid: {
    width: '100%',
    aspectRatio: 1.35,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeGlyph: {
    fontSize: 28,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 2,
    paddingRight: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingRight: 32,
  },
  price: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  stars: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.caramel,
  },
  addButtonGrid: {
    position: 'absolute',
    right: SPACING.sm,
    bottom: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brownDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  thumbHorizontal: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  infoHorizontal: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginVertical: 2,
  },
  actionsHorizontal: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 52,
    marginLeft: SPACING.sm,
  },
  starRow: {
    paddingTop: 2,
  },
  starGlyph: {
    fontSize: 16,
    color: COLORS.caramel,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brownDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ProductCard);
