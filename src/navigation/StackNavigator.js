import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/index'
import Details from '../screens/Details'
import Login from '../screens/Login'
import Camera from '../screens/Camera/index'
import Weather from '../screens/Weather'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Weather" component={Weather} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default StackNavigator