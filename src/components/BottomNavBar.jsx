import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, BREAKPOINT_TABLET } from '../constants/layout';

const TABS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'menu', label: 'Menu', icon: 'grid' },
  { key: 'orders', label: 'Orders', icon: 'shopping-bag' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

export default function BottomNavBar({ activeTab, onTabPress }) {
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT_TABLET;

  return (
    <View style={isWide ? styles.rail : styles.barContainer}>
      <View style={isWide ? styles.railInner : styles.bar}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                isWide ? styles.railItem : styles.barItem,
                active && isWide ? styles.railItemActive : null,
              ]}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
            >
              <Feather
                name={tab.icon}
                size={22}
                color={active ? COLORS.brown : COLORS.muted}
                style={styles.icon}
              />
              <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
              {active && !isWide ? <View style={styles.dot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.select({ ios: SPACING.md, android: SPACING.sm }),
    paddingTop: SPACING.xs,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  rail: {
    width: 80,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xs,
  },
  railInner: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  railItem: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    width: '88%',
    marginBottom: SPACING.sm,
  },
  railItemActive: {
    backgroundColor: COLORS.cardAlt,
  },
  icon: {
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.brown,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.brown,
    marginTop: 3,
  },
});
