import React from 'react'
import { SafeAreaView, TextInput, View } from 'react-native'
import { PRIMARY_COLOR } from '../commons/constants'
// InputComponent.tsx


import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../Theme/appTheme';

interface Props {
  placeholder: string;
  handleSetValues: (name: string, value: string) => void; //prop de funcion 
  name: string;
  isPassword?: boolean; 
  hasIcon?: boolean;
  setHiddenPassword?: () => void;  //prop de funcion
}
export const InputComponent = ({ placeholder, handleSetValues, name, isPassword = false, hasIcon = false, setHiddenPassword }: Props) => {
  return (
    <View>
      {
        (hasIcon)
          ? <Icon
            name='visibility'
            size={25}
            color={PRIMARY_COLOR}
            onPress={setHiddenPassword}
            style={styles.iconPassword} />
          : null
      }

      <TextInput
        placeholder={placeholder}
        keyboardType='default'
        onChangeText={(value) => handleSetValues(name, value)}
        secureTextEntry={isPassword}
        style={styles.inputText}
      />
    </View>
  )
}

export default InputComponent;

