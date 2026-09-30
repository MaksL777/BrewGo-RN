import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { SPACING, FONT_SIZE, RADIUS } from '../constants/layout';

export default function Header({
  title,
  subtitle,
  onMenuPress,
  onBackPress,
  onProfilePress,
  onActionPress,
  actionIcon,
  showBack = false,
}) {
  const { theme } = useTheme();
  const cartItemsCount = useSelector((state) => state.cart?.items?.length || 0);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {showBack ? (
        <TouchableOpacity
          style={[styles.iconCircle, { backgroundColor: theme.card }]}
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Go back"
        >
          <Feather name="chevron-left" size={22} color={theme.text} />
        </TouchableOpacity>
      ) : onMenuPress ? (
        <TouchableOpacity
          style={[styles.iconCircle, { backgroundColor: theme.card }]}
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Open menu drawer"
        >
          <Feather name="menu" size={20} color={theme.text} />
        </TouchableOpacity>
      ) : null}

      <View style={[styles.textBlock, showBack && styles.textBlockCentered]}>
        <Text style={[styles.title, { color: theme.text }, showBack && styles.titleCentered]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, showBack && styles.subtitleCentered]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {showBack ? (
        onActionPress && actionIcon ? (
          <TouchableOpacity
            style={[styles.iconCircle, { backgroundColor: theme.card }]}
            onPress={onActionPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name={actionIcon} size={20} color={theme.text} />
            {actionIcon === 'shopping-cart' && cartItemsCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.primary }]}>
                <Text style={styles.badgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )
      ) : onActionPress && actionIcon ? (
        <TouchableOpacity
          style={[styles.avatar, { backgroundColor: theme.card }]}
          onPress={onActionPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Action"
        >
          <Feather name={actionIcon} size={20} color={theme.text} />
          {actionIcon === 'shopping-cart' && cartItemsCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <Text style={styles.badgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : onProfilePress ? (
        <TouchableOpacity
          style={[styles.avatar, { backgroundColor: theme.card }]}
          onPress={onProfilePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Open profile"
        >
          <Feather name="user" size={20} color={theme.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    paddingTop: Platform.select({
      ios: SPACING.lg,
      android: (StatusBar.currentHeight || 0) + SPACING.lg,
    }),
  },
  textBlock: {
    flex: 1,
    marginHorizontal: SPACING.sm,
  },
  textBlockCentered: {
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  titleCentered: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  subtitleCentered: {
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
