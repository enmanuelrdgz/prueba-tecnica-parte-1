import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

const GreenProfileScreen = ({ navigation }: any) => {
  const { logout } = useAuth();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const menuAnimations = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;

  // In a real app, this would come from user authentication context
  const [user] = useState({
    nickname: 'JohnDoe123',
    email: 'john.doe@email.com',
    memberSince: '2023',
    avatar: 'https://via.placeholder.com/120/16a34a/FFFFFF?text=JD',
  });

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
      Animated.spring(headerScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animaciones escalonadas para stats
    const statsDelays = [200, 300, 400];
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: statsDelays[index],
        useNativeDriver: true,
      }).start();
    });

    // Animaciones escalonadas para menu items
    menuAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: 500 + index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  // Profile menu items with green color scheme
  const profileMenuItems = [
    {
      id: 1,
      title: 'Historial de Pedidos',
      icon: 'receipt-outline',
      description: 'Ver tus pedidos anteriores',
      color: '#16a34a',
      onPress: () => Alert.alert('Función', 'La pantalla de Historial de Pedidos se abriría aquí'),
    },
    {
      id: 2,
      title: 'Configuración de Cuenta',
      icon: 'settings-outline',
      description: 'Gestionar preferencias de cuenta',
      color: '#059669',
      onPress: () => Alert.alert('Función', 'La pantalla de Configuración se abriría aquí'),
    },
    {
      id: 3,
      title: 'Métodos de Pago',
      icon: 'card-outline',
      description: 'Gestionar opciones de pago',
      color: '#0d9488',
      onPress: () => Alert.alert('Función', 'La pantalla de Métodos de Pago se abriría aquí'),
    },
    {
      id: 4,
      title: 'Direcciones de Envío',
      icon: 'location-outline',
      description: 'Gestionar direcciones de entrega',
      color: '#0f766e',
      onPress: () => Alert.alert('Función', 'La pantalla de Direcciones se abriría aquí'),
    },
    {
      id: 5,
      title: 'Notificaciones',
      icon: 'notifications-outline',
      description: 'Personalizar notificaciones',
      color: '#047857',
      onPress: () => Alert.alert('Función', 'La pantalla de Notificaciones se abriría aquí'),
    },
    {
      id: 6,
      title: 'Ayuda y Soporte',
      icon: 'help-circle-outline',
      description: 'Obtener ayuda o contactar soporte',
      color: '#065f46',
      onPress: () => Alert.alert('Función', 'La pantalla de Ayuda se abriría aquí'),
    },
  ];

  // Render individual menu item with animations
  const renderMenuItem = (item: any, index: number) => (
    <Animated.View
      key={item.id}
      style={[
        {
          opacity: menuAnimations[index],
          transform: [
            {
              translateY: menuAnimations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <LinearGradient
            colors={[item.color + '20', item.color + '10']}
            style={styles.menuItemIconContainer}
          >
            <Ionicons name={item.icon} size={22} color={item.color} />
          </LinearGradient>
          <View style={styles.menuItemText}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  );

  const StatItem = ({ number, label, animationValue }: any) => (
    <Animated.View
      style={[
        styles.statItem,
        {
          opacity: animationValue,
          transform: [
            {
              scale: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [
                { scale: headerScaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#ffffff', '#fafbff']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Perfil</Text>
              <View style={styles.headerIconContainer}>
                <LinearGradient
                  colors={['#16a34a20', '#22c55e10']}
                  style={styles.headerIcon}
                >
                  <Ionicons name="person" size={24} color="#16a34a" />
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Section */}
          <Animated.View
            style={[
              styles.userSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.userSectionGradient}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <TouchableOpacity 
                  style={styles.editAvatarButton}
                  onPress={() => Alert.alert('Función', 'La edición de avatar estaría disponible aquí')}
                >
                  <LinearGradient
                    colors={['#16a34a', '#22c55e']}
                    style={styles.editAvatarGradient}
                  >
                    <Ionicons name="camera" size={16} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.nickname}>{user.nickname}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.memberSince}>
                  Miembro desde {user.memberSince}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.statsSectionGradient}
            >
              <StatItem number="24" label="Pedidos" animationValue={statsAnimations[0]} />
              <View style={styles.statDivider} />
              <StatItem number="$1,247" label="Total Gastado" animationValue={statsAnimations[1]} />
              <View style={styles.statDivider} />
              <StatItem number="4.8★" label="Calificación" animationValue={statsAnimations[2]} />
            </LinearGradient>
          </View>

          {/* Menu Items Section */}
          <View style={styles.menuSection}>
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.menuSectionGradient}
            >
              {profileMenuItems.map((item, index) => renderMenuItem(item, index))}
            </LinearGradient>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#fef2f2', '#fee2e2']}
                style={styles.logoutButtonGradient}
              >
                <Ionicons name="log-out-outline" size={20} color="#dc2626" />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* App Info Section */}
          <View style={styles.appInfoSection}>
            <Text style={styles.appVersion}>Versión 1.0.0</Text>
            <Text style={styles.appInfo}>
              Desarrollado con ❤️ para una mejor experiencia de compra
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerIconContainer: {
    marginLeft: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  userSection: {
    margin: 16,
    borderRadius: 20,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userSectionGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
    borderWidth: 3,
    borderColor: '#16a34a',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  editAvatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statsSectionGradient: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderRadius: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  menuSectionGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  logoutButton: {
    borderRadius: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  appInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  appInfo: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default GreenProfileScreen;