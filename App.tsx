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
import SplashScreen from './src/screens/SplashScreen';
import BuildingsListScreen from './src/screens/BuildingsListScreen';
import BuildingDetailScreen from './src/screens/BuildingDetailScreen';
import RoomTypesScreen from './src/screens/RoomTypesScreen';
import GoldenVisaScreen from './src/screens/GoldenVisaScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="Splash"
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
              name="BuildingsList"
              component={BuildingsListScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="BuildingDetail"
              component={BuildingDetailScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="RoomTypes"
              component={RoomTypesScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="GoldenVisa"
              component={GoldenVisaScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App;
