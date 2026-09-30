import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import MainTabNavigator from './MainTabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartScreen from '../screens/CartScreen';
import { SCREENS } from './screens';
import { COLORS } from '../constants/colors';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/layout';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: COLORS.brownDark,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: FONT_SIZE.lg,
          color: COLORS.ink,
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingLeft: SPACING.md,
        },
        headerRightContainerStyle: {
          paddingRight: SPACING.md,
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity
              style={styles.backButtonCircle}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Go back"
            >
              <Feather name="chevron-left" size={22} color={COLORS.ink} />
            </TouchableOpacity>
          ) : null,
      })}
    >
      <Stack.Screen
        name={SCREENS.MAIN_TABS}
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          headerRight: () => (
            <TouchableOpacity
              style={styles.rightButtonCircle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Add to favorites"
            >
              <Feather name="star" size={20} color={COLORS.caramel} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={SCREENS.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Your order',
        }}
      />
      <Stack.Screen
        name={SCREENS.CART}
        component={CartScreen}
        options={{
          title: 'Your Cart',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backButtonCircle: {
    width: 38,
    height: 38,
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
      android: { elevation: 2 },
    }),
  },
  rightButtonCircle: {
    width: 38,
    height: 38,
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
      android: { elevation: 2 },
    }),
  },
});
