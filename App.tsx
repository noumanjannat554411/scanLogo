/**
 * ScanLogo - Logo Detection App with Google Vision API
 * 
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogoScanner from './src/components/LogoScanner';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Scanner" component={LogoScanner} />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen}
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
