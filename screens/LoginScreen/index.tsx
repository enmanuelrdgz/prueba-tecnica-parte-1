import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GreenLoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const { login } = useAuth();
  const { top } = useSafeAreaInsets();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const usernameScaleAnim = useRef(new Animated.Value(1)).current;
  const passwordScaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación inicial
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, completa todos los campos');
      shakeAnimation();
      return;
    }

    setIsLoading(true);
    buttonPressAnimation();

    let success = await login(username, password);
    if (success) {
      // Login exitoso
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
      shakeAnimation();
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    setErrorMessage('');
    navigation.navigate('Register');
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
    const scaleAnim = inputName === 'username' ? usernameScaleAnim : passwordScaleAnim;
    
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = (inputName: string) => {
    setFocusedInput(null);
    const scaleAnim = inputName === 'username' ? usernameScaleAnim : passwordScaleAnim;
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressAnimation = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View
            style={[
              { ...styles.header, paddingVertical: top + 16 },
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }) }],
              },
            ]}
          >
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Usuario</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [{ scale: usernameScaleAnim }],
                    shadowOpacity: focusedInput === 'username' ? 0.3 : 0.1,
                  },
                ]}
              >
                <View style={styles.inputIconContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={focusedInput === 'username' ? '#16a34a' : '#9ca3af'}
                  />
                </View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderColor: focusedInput === 'username' ? '#16a34a' : '#e5e7eb',
                    },
                  ]}
                  placeholder="Ingresa tu usuario"
                  placeholderTextColor="#9ca3af"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => handleInputFocus('username')}
                  onBlur={() => handleInputBlur('username')}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Animated.View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [{ scale: passwordScaleAnim }],
                    shadowOpacity: focusedInput === 'password' ? 0.3 : 0.1,
                  },
                ]}
              >
                <View style={styles.inputIconContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={focusedInput === 'password' ? '#16a34a' : '#9ca3af'}
                  />
                </View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderColor: focusedInput === 'password' ? '#16a34a' : '#e5e7eb',
                    },
                  ]}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={() => handleInputBlur('password')}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Animated.View>
            </View>

            {/* Error Message */}
            {errorMessage ? (
              <Animated.View
                style={[
                  styles.errorContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                <Text style={styles.errorText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}

            {/* Login Button */}
            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#16a34a', '#22c55e', '#15803d']}
                  style={styles.loginButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="#fff" size="small" />
                      <Text style={styles.loadingText}>Iniciando sesión...</Text>
                    </View>
                  ) : (
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Register Button */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleGoToRegister}
              activeOpacity={0.7}
            >
              <Text style={styles.registerButtonText}>
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    shadowColor: '#16a34a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 4,
  },
  inputIconContainer: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingLeft: 44,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
    height: 56,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#16a34a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonDisabled: {
    opacity: 0.8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  registerButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registerButtonText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GreenLoginScreen;