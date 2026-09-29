import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';
import { SPACING, FONT_SIZE, RADIUS } from '../constants/layout';
import { SCREENS } from './screens';

/**
 * CustomDrawerContent
 *
 * Side drawer menu matching the BrewGo design:
 * Provides quick access to core sections (Home, Menu, Orders, Profile),
 * secondary app destinations (Help, Contact), and an action (Log out).
 * Demonstrates Drawer navigation integrated with nested Stack and Tab navigators.
 */
export default function CustomDrawerContent({ navigation, state }) {
  const currentRouteName = state?.routes[state?.index]?.name;

  const navigateToTab = (screenName) => {
    navigation.closeDrawer();
    navigation.navigate(SCREENS.MAIN, {
      screen: SCREENS.MAIN_TABS,
      params: { screen: screenName },
    });
  };

  const navItems = [
    {
      label: 'Home',
      icon: 'home',
      onPress: () => navigateToTab(SCREENS.HOME),
      isActive: currentRouteName === SCREENS.MAIN,
    },
    {
      label: 'Menu',
      icon: 'grid',
      onPress: () => navigateToTab(SCREENS.MENU),
    },
    {
      label: 'Orders',
      icon: 'shopping-bag',
      onPress: () => navigateToTab(SCREENS.ORDERS),
    },
    {
      label: 'Profile',
      icon: 'user',
      onPress: () => navigateToTab(SCREENS.PROFILE),
    },
  ];

  const secondaryItems = [
    {
      label: 'Help & FAQ',
      icon: 'help-circle',
      onPress: () => {
        navigation.closeDrawer();
        navigation.navigate(SCREENS.HELP);
      },
      isActive: currentRouteName === SCREENS.HELP,
    },
    {
      label: 'Contact Store',
      icon: 'phone-call',
      onPress: () => {
        navigation.closeDrawer();
        navigation.navigate(SCREENS.CONTACT);
      },
      isActive: currentRouteName === SCREENS.CONTACT,
    },
  ];

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out of BrewGo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          navigation.closeDrawer();
          Alert.alert('Signed out', 'You have been signed out.');
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.brandIconCircle}>
          <Text style={styles.brandIconGlyph}>☕</Text>
        </View>
        <View style={styles.brandTextBlock}>
          <Text style={styles.brand}>BrewGo</Text>
          <Text style={styles.userGreeting}>Alex Morgan</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>MAIN</Text>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={[styles.row, item.isActive && styles.rowActive]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <Feather
            name={item.icon}
            size={20}
            color={item.isActive ? COLORS.brownDark : COLORS.ink}
            style={styles.icon}
          />
          <Text style={[styles.label, item.isActive && styles.labelActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <Text style={styles.sectionHeader}>SUPPORT & MORE</Text>
      {secondaryItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={[styles.row, item.isActive && styles.rowActive]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <Feather
            name={item.icon}
            size={20}
            color={item.isActive ? COLORS.brownDark : COLORS.ink}
            style={styles.icon}
          />
          <Text style={[styles.label, item.isActive && styles.labelActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <TouchableOpacity
        style={[styles.row, styles.logoutRow]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Feather name="log-out" size={20} color="#B3261E" style={styles.icon} />
        <Text style={[styles.label, styles.logout]}>Log out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  brandIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  brandIconGlyph: {
    fontSize: 22,
  },
  brandTextBlock: {
    justifyContent: 'center',
  },
  brand: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  userGreeting: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 0.8,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.sm,
    marginTop: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: 2,
  },
  rowActive: {
    backgroundColor: COLORS.cardAlt,
  },
  icon: {
    marginRight: SPACING.md,
    width: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.ink,
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.brownDark,
    fontWeight: '700',
  },
  logoutRow: {
    marginTop: SPACING.xs,
  },
  logout: {
    color: '#B3261E',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.sm,
  },
});
