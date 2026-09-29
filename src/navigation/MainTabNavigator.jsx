import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomNavBar from '../components/BottomNavBar';
import { SCREENS } from './screens';

const Tab = createBottomTabNavigator();

// Maps React Navigation's tab route names to the keys BottomNavBar
// already expects, so the existing component didn't need to change at
// all to become a real tab bar.
const ROUTE_TO_KEY = {
  [SCREENS.HOME]: 'home',
  [SCREENS.MENU]: 'menu',
  [SCREENS.ORDERS]: 'orders',
  [SCREENS.PROFILE]: 'profile',
};
const KEY_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_KEY).map(([route, key]) => [key, route])
);

/**
 * MainTabNavigator
 *
 * Renders the app's 4 core destinations. `tabBar` is overridden with our
 * own `BottomNavBar` component (built in cross_assignment_3) instead of
 * React Navigation's default tab bar, so the navigation styling matches
 * the Figma design pixel-for-pixel rather than approximating it with
 * `tabBarStyle` options.
 */
// Note: `BottomNavBar` also contains logic (from cross_assignment_3) that
// switches to a vertical side-rail layout on wide screens. React
// Navigation's Tab.Navigator always docks a custom `tabBar` in the bottom
// slot, though, so that rail variant won't reposition itself to the side
// here the way it does in the standalone assignment_3 demo — it will
// still render (just docked at the bottom) on a wide screen. Achieving a
// true bottom-bar/side-rail swap inside React Navigation would require a
// custom navigator layout, which is out of scope for this assignment's
// focus (Stack/Tab/Drawer wiring + param passing); the tablet-rail
// reflow itself is already demonstrated in cross_assignment_3.
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const activeRouteName = state.routeNames[state.index];
        return (
          <BottomNavBar
            activeTab={ROUTE_TO_KEY[activeRouteName]}
            onTabPress={(key) => navigation.navigate(KEY_TO_ROUTE[key])}
          />
        );
      }}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.MENU} component={MenuScreen} />
      <Tab.Screen name={SCREENS.ORDERS} component={OrdersScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
