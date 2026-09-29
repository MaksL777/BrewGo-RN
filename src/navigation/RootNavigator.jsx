import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStackNavigator from './MainStackNavigator';
import HelpScreen from '../screens/HelpScreen';
import ContactScreen from '../screens/ContactScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { SCREENS } from './screens';
import { COLORS } from '../constants/colors';

const Drawer = createDrawerNavigator();

/**
 * RootNavigator
 *
 * Outermost navigator (Drawer):
 * - Drawer.Navigator
 *     ├─ Main (MainStackNavigator -> Tab.Navigator [Home, Menu, Orders, Profile] + Stack [ProductDetails, Checkout])
 *     ├─ Help (HelpScreen)
 *     └─ Contact (ContactScreen)
 *
 * Implements the homework requirement for Drawer Navigation for secondary features
 * (filters, support, help, contact).
 */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          // Allows swiping open from left edge (task 5)
          swipeEdgeWidth: 50,
          overlayColor: 'rgba(43, 33, 24, 0.45)',
          drawerStyle: {
            backgroundColor: COLORS.background,
            width: 280,
          },
        }}
      >
        <Drawer.Screen name={SCREENS.MAIN} component={MainStackNavigator} />
        <Drawer.Screen name={SCREENS.HELP} component={HelpScreen} />
        <Drawer.Screen name={SCREENS.CONTACT} component={ContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
