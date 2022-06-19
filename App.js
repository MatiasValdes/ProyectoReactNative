import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home/index'
import Login from './src/screens/Login/index'
import Details from './src/screens/Details/index'
import Checkout from './src/screens/Checkout'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>

    </NavigationContainer>
  );
} 