import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  //Esta parte me permite hacer un registro
  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    // Aqui puedo mostrar los datos en la consola pero sin apis
    console.log(`Nombres: ${firstName}`);
    console.log(`Apellidos: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Fecha de Nacimiento: ${birthDate ? birthDate.toDateString() : 'No seleccionada'}`);
    console.log(`Contraseña: ${password}`);
    
    // Registro
    Alert.alert('Registro', `Nombres: ${firstName}\nApellidos: ${lastName}\nEmail: ${email}\nFecha de Nacimiento: ${birthDate ? birthDate.toDateString() : 'No seleccionada'}\nContraseña: ${password}`);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/4090341/cover_image/regular_1708x683/cover-0220-HowShazamWork-Waldek_img-d3d76d00dcc4a70fa9ea068b7f263b69.png' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Crea una Cuenta</Text>
        <Text style={styles.subtitle}>Ingresa los datos respectivamente</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={lastName}
          onChangeText={setLastName}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>
            {birthDate ? birthDate.toDateString() : 'Fecha de Nacimiento'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Inicio')}>
            <Text style={styles.buttonText}>Ir a Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  dateText: {
    lineHeight: 50,
    color: '#999999',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
