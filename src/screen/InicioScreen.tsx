import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { styles } from '../Theme/appTheme';
import { CommonActions } from '@react-navigation/native';

export const InicioScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={{ uri: 'https://media.revistagq.com/photos/64217f902885a34c380b022a/4:3/w_1440,h_1080,c_limit/Best-indie-albums-hp-b.jpg' }} 
      style={styles.backgroundImage} 
    >
      <View style={styles.overlay} />
      
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Bienvenido GalaxyMusic</Text>
        </View>

        <View style={styles.footerContainer}>
          <ButtonComponent
            texButton="Iniciar"
            onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default InicioScreen;
