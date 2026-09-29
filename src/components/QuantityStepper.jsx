import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

export default function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'medium',
}) {
  const isSmall = size === 'small';
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          isSmall && styles.buttonSmall,
          value <= min && styles.buttonDisabled,
        ]}
        onPress={decrease}
        disabled={value <= min}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        accessibilityLabel="Decrease quantity"
      >
        <Feather
          name="minus"
          size={isSmall ? 14 : 16}
          color={value <= min ? COLORS.line : COLORS.ink}
        />
      </TouchableOpacity>

      <Text style={[styles.value, isSmall && styles.valueSmall]}>{value}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonFilled,
          isSmall && styles.buttonSmall,
          value >= max && styles.buttonDisabled,
        ]}
        onPress={increase}
        disabled={value >= max}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        accessibilityLabel="Increase quantity"
      >
        <Feather
          name="plus"
          size={isSmall ? 14 : 16}
          color={value >= max ? COLORS.line : COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    width: 28,
    height: 28,
  },
  buttonFilled: {
    backgroundColor: COLORS.brownDark,
    borderColor: COLORS.brownDark,
  },
  buttonDisabled: {
    opacity: 0.4,
    borderColor: COLORS.line,
  },
  value: {
    minWidth: 28,
    textAlign: 'center',
    marginHorizontal: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
  valueSmall: {
    fontSize: FONT_SIZE.sm,
    marginHorizontal: SPACING.xs,
  },
});
