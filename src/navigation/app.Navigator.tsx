import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { PRIMARY_COLOR } from '../commons/constants';
import InicioScreen from '../screen/InicioScreen';
import LoginScreen from '../screen/LoginScreen';
import RegistroScreen from '../screen/RegistroScreen'; 
import {HomeScreen} from '../screen/homScreen/HomeScreen';

export interface User {
  id: number;
  email: string;
  password: string;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const users: User[] = [
    { id: 1, email: 'alexcrap95@gmail.com', password: '12345' },
    { id: 2, email: 'pamelaghost@hotmail.es', password: '123456' },
    { id: 3, email: 'Joaquink@gmail.com', password: '123457' },
    { id: 4, email: 'carmelofuck@gmail.com', password: '123458' },
  ];

  const [listUsers, setListUsers] = useState(users);

  const handleAddUser = (user: User) => {
    setListUsers([...listUsers, user]);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: PRIMARY_COLOR,
        },
      }}>
      <Stack.Screen name="Inicio" options={{ headerShown: false }} component={InicioScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} users={listUsers} />}
      </Stack.Screen>
      <Stack.Screen name="Register" options={{ headerShown: false }}>
        {(props) => <RegistroScreen {...props} users={listUsers} handleAddUser={handleAddUser} />}
      </Stack.Screen>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
