// ButtonComponent.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../Theme/appTheme';

interface ButtonComponentProps {
  texButton: string;
  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ texButton, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{texButton}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent