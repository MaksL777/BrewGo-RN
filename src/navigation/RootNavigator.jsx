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

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
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
