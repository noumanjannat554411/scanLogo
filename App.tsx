/**
 * ScanLogo - Logo Detection App with Google Vision API
 * 
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LogoScannerEnhanced from './src/components/LogoScannerEnhanced';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="ProductDetails"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="Scanner" 
            component={LogoScannerEnhanced}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen}
            options={{
              animation: 'slide_from_bottom',
              presentation: 'card',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
