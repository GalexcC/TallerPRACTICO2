import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { TitleComponent } from '../components/TitleComponent';
import BodyComponents from '../components/BodyComponent';
import { PRIMARY_COLOR } from '../commons/constants';
import { styles } from '../Theme/appTheme';
import { InputComponent } from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { User } from '../navigation/app.Navigator';

// Interface Props
interface Props {
  users: User[];
}


interface FormLogin {
  email: string;
  password: string;
}

export const LoginScreen = ({ users }: Props) => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });
  
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const navigation = useNavigation();

  
  const handleSetValues = (name: string, value: string) => {
    setFormLogin({ ...formLogin, [name]: value });
  };

  
  const handleSignIn = () => {
    if (!formLogin.email || !formLogin.password) {
      Alert.alert('Error', 'Por favor ingrese valores en todos los campos!');
      return;
    }

    const user = verifyUser();
    if (!user) {
      Alert.alert('Error', 'Correo y/o contraseña incorrecta');
      return;
    }

   
    navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
  };

  
  const verifyUser = (): User | undefined => {
    return users.find(
      (user) => user.email === formLogin.email && user.password === formLogin.password
    );
  };

  return (
    <View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title='Iniciar Sesión' />
      <BodyComponents>
        <View>
          <Text style={styles.titleHeaderBody}>Bienvenido de nuevo</Text>
          <Text style={styles.textBody}>Realiza tus compras de manera rápida y segura</Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder='Correo'
            handleSetValues={handleSetValues}
            name='email'
          />
          <InputComponent
            placeholder='Contraseña'
            handleSetValues={handleSetValues}
            name='password'
            isPassword={hiddenPassword}
            hasIcon={true}
            setHiddenPassword={() => setHiddenPassword(!hiddenPassword)}
          />
        </View>
        <ButtonComponent texButton='Iniciar' onPress={handleSignIn} />
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
        >
          <Text style={styles.textRedirection}>¿No tienes una cuenta? Regístrate ahora</Text>
        </TouchableOpacity>
      </BodyComponents>
    </View>
  );
};

export default LoginScreen;
