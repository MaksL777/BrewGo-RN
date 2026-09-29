import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomNavBar from '../components/BottomNavBar';
import { SCREENS } from './screens';

const Tab = createBottomTabNavigator();

const ROUTE_TO_KEY = {
  [SCREENS.HOME]: 'home',
  [SCREENS.MENU]: 'menu',
  [SCREENS.ORDERS]: 'orders',
  [SCREENS.PROFILE]: 'profile',
};

const KEY_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_KEY).map(([route, key]) => [key, route])
);

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
