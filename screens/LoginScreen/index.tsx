import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {login} = useAuth()

  const handleLogin = async () => {
    setErrorMessage('');
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, completa todos los campos');
      return;
    }
    
    setIsLoading(true);

    let success = await login(username, password)
    if(success) {
     
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
      setIsLoading(false);
    }
    
  };

  const handleGoToRegister = () => {
    setErrorMessage('');
    navigation.navigate('Register');
  };

  const {top} = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{...styles.header, paddingVertical: top + 16}}>
          <Text style={styles.headerTitle}>Iniciar Sesión</Text>
          <Text style={styles.headerSubtitle}>Ingresa tus credenciales para continuar</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor="#6c757d"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errorMessage) setErrorMessage('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#6c757d"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errorMessage) setErrorMessage('');
            }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

           {/* Mensaje de error */}
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={handleGoToRegister}>
            <Text style={styles.registerButtonText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 8,
    marginTop: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212529',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  registerButtonText: {
    color: '#6c757d',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
    errorContainer: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c6cb',
    borderRadius: 6,
    padding: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#007ff0',
  },
});

export default LoginScreen;