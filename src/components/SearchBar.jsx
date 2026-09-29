import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

/**
 * SearchBar
 *
 * Controlled text input for searching drinks matching the Figma design.
 *
 * Props:
 * - value (string, required)
 * - onChangeText (function, required)
 * - placeholder (string, optional)
 * - onSubmit (function, optional)
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search drinks or shops...',
  onSubmit,
}) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color={COLORS.muted} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        underlineColorAndroid="transparent"
      />
      {value ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Clear search text"
        >
          <Feather name="x" size={16} color={COLORS.muted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    height: 48,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.ink,
    paddingVertical: Platform.select({ ios: 0, android: 0 }),
  },
});
