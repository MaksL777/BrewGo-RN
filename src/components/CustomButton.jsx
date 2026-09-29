import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

export default function CustomButton({
  title,
  onPress,
  icon,
  variant = 'filled',
  disabled = false,
  style,
}) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.filled,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.label, isOutline ? styles.labelOutline : styles.labelFilled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.pill,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filled: {
    backgroundColor: COLORS.brown,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.brown,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  labelFilled: {
    color: COLORS.white,
  },
  labelOutline: {
    color: COLORS.brown,
  },
  icon: {
    marginRight: SPACING.sm,
    fontSize: FONT_SIZE.md,
  },
});
