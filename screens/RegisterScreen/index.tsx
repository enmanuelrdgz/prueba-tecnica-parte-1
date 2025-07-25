import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

const GreenRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { top } = useSafeAreaInsets();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const inputAnimations = useRef({
    fullName: new Animated.Value(1),
    email: new Animated.Value(1),
    username: new Animated.Value(1),
    password: new Animated.Value(1),
    confirmPassword: new Animated.Value(1),
  }).current;

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
    if (inputAnimations[inputName]) {
      Animated.spring(inputAnimations[inputName], {
        toValue: 1.02,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleInputBlur = (inputName: string) => {
    setFocusedInput(null);
    if (inputAnimations[inputName]) {
      Animated.spring(inputAnimations[inputName], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
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

  const validateForm = () => {
    const { fullName, email, username, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      return 'El nombre completo es requerido';
    }

    if (!email.trim()) {
      return 'El correo electrónico es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Por favor ingresa un correo electrónico válido';
    }

    if (!username.trim()) {
      return 'El nombre de usuario es requerido';
    }

    if (username.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!password.trim()) {
      return 'La contraseña es requerida';
    }

    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!confirmPassword.trim()) {
      return 'Debes confirmar tu contraseña';
    }

    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {
      return 'Debes aceptar los términos y condiciones';
    }

    return null;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, text: '', color: '#e5e7eb' };
    if (password.length < 4) return { strength: 1, text: 'Muy débil', color: '#ef4444' };
    if (password.length < 6) return { strength: 2, text: 'Débil', color: '#f97316' };
    if (password.length < 8) return { strength: 3, text: 'Buena', color: '#eab308' };
    return { strength: 4, text: 'Fuerte', color: '#22c55e' };
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      shakeAnimation();
      return;
    }

    setIsLoading(true);
    buttonPressAnimation();

    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        '¡Registro exitoso!',
        'Tu cuenta ha sido creada correctamente.',
        [
          {
            text: 'Iniciar Sesión',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }, 2000);
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const renderAnimatedInput = (
    field: string,
    label: string,
    placeholder: string,
    icon: string,
    options: any = {}
  ) => {
    const animationValue = inputAnimations[field] || new Animated.Value(1);
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              transform: [{ scale: animationValue }],
              shadowOpacity: focusedInput === field ? 0.3 : 0.1,
            },
          ]}
        >
          <View style={styles.inputIconContainer}>
            <Ionicons
              name={icon}
              size={20}
              color={focusedInput === field ? '#16a34a' : '#9ca3af'}
            />
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: focusedInput === field ? '#16a34a' : '#e5e7eb',
                borderWidth: focusedInput === field ? 2 : 1,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={formData[field]}
            onChangeText={(text) => handleInputChange(field, text)}
            onFocus={() => handleInputFocus(field)}
            onBlur={() => handleInputBlur(field)}
            {...options}
          />
        </Animated.View>
      </View>
    );
  };

  const passwordStrength = getPasswordStrength();

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
          showsVerticalScrollIndicator={false}
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
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
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
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.formGradient}
            >
              {/* Full Name Input */}
              {renderAnimatedInput(
                'fullName',
                'Nombre Completo',
                'Ingresa tu nombre completo',
                'person-outline',
                { autoCapitalize: 'words' }
              )}

              {/* Email Input */}
              {renderAnimatedInput(
                'email',
                'Correo Electrónico',
                'Ingresa tu correo electrónico',
                'mail-outline',
                { 
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }
              )}

              {/* Username Input */}
              {renderAnimatedInput(
                'username',
                'Usuario',
                'Elige un nombre de usuario',
                'at-outline',
                { 
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }
              )}

              {/* Password Input */}
              {renderAnimatedInput(
                'password',
                'Contraseña',
                'Crea una contraseña segura',
                'lock-closed-outline',
                { 
                  secureTextEntry: true,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }
              )}

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <View style={styles.passwordStrengthContainer}>
                  <View style={styles.passwordStrengthBar}>
                    <View
                      style={[
                        styles.passwordStrengthFill,
                        {
                          width: `${(passwordStrength.strength / 4) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.text}
                  </Text>
                </View>
              )}

              {/* Confirm Password Input */}
              {renderAnimatedInput(
                'confirmPassword',
                'Confirmar Contraseña',
                'Confirma tu contraseña',
                'lock-closed-outline',
                { 
                  secureTextEntry: true,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }
              )}

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setAcceptTerms(!acceptTerms)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                  {acceptTerms && (
                    <LinearGradient
                      colors={['#16a34a', '#22c55e']}
                      style={styles.checkboxGradient}
                    >
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </LinearGradient>
                  )}
                </View>
                <Text style={styles.termsText}>
                  Acepto los{' '}
                  <Text style={styles.termsLink}>términos y condiciones</Text>
                </Text>
              </TouchableOpacity>

              {/* Error Message */}
              {errorMessage ? (
                <Animated.View
                  style={[
                    styles.errorContainer,
                    { transform: [{ translateX: shakeAnim }] },
                  ]}
                >
                  <Ionicons name="alert-circle" size={20} color="#dc2626" />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </Animated.View>
              ) : null}

              {/* Register Button */}
              <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                <TouchableOpacity
                  style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#16a34a', '#22c55e', '#15803d']}
                    style={styles.registerButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={styles.loadingText}>Creando cuenta...</Text>
                      </View>
                    ) : (
                      <View style={styles.buttonContent}>
                        <Ionicons name="person-add" size={20} color="#fff" />
                        <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleGoToLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.loginButtonText}>
                  ¿Ya tienes cuenta? Inicia Sesión
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default GreenRegisterScreen;