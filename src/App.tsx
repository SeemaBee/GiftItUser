import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import SafeScreen from './views/components/safeScreens';

const AppContent = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeScreen>
    </SafeAreaProvider>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default RootApp;
