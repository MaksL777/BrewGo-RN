// react-native-gesture-handler must be imported first, before anything
// else, in the app's entry file — required by React Navigation's Drawer
// and Stack navigators for swipe gestures to work correctly.
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    // GestureHandlerRootView must wrap the whole app (not just the
    // Drawer) for gesture handling to work reliably on Android.
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
