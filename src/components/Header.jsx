import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Go back"
        >
          <Feather name="chevron-left" size={22} color={COLORS.ink} />
        </TouchableOpacity>
      ) : onMenuPress ? (
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Open menu drawer"
        >
          <Feather name="menu" size={20} color={COLORS.ink} />
        </TouchableOpacity>
      ) : null}

      <View style={[styles.textBlock, showBack && styles.textBlockCentered]}>
        <Text style={[styles.title, showBack && styles.titleCentered]} numberOfLines={1}>
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
            style={styles.iconCircle}
            onPress={onActionPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name={actionIcon} size={20} color={COLORS.ink} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )
      ) : onActionPress && actionIcon ? (
        <TouchableOpacity
          style={styles.avatar}
          onPress={onActionPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Action"
        >
          <Feather name={actionIcon} size={20} color={COLORS.ink} />
        </TouchableOpacity>
      ) : onProfilePress ? (
        <TouchableOpacity
          style={styles.avatar}
          onPress={onProfilePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Open profile"
        >
          <Feather name="user" size={20} color={COLORS.ink} />
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
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
    paddingTop: Platform.select({
      ios: SPACING.md,
      android: (StatusBar.currentHeight || 0) + SPACING.sm,
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
});
