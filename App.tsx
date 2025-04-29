import React from 'react';
import {  NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined,
  Details: { id: number }
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitle: '',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Movie List' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
