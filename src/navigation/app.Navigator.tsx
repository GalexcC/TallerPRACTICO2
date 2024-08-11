import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/InicioScreen';
import RegisterScreen from '../screen/RegistroScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio Usuario">
      <Stack.Screen name="Inicio" component={LoginScreen} />
      <Stack.Screen name="Registro Usuario" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
