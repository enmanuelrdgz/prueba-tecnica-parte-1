import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

const GreenProfileScreen = ({ navigation }: any) => {
  const { logout } = useAuth();

  //Mock user data
  const [user] = useState({
    nickname: 'JohnDoe123',
    email: 'john.doe@email.com',
    memberSince: '2023',
    avatar: 'https://i.pravatar.cc/250?u=usuario@example.com',
  });

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

  const renderMenuItem = (item: any, index: number) => (
    <View
      key={item.id}
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
    </View>
  );
  
  return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.header,
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
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Section */}
          <View
            style={[
              styles.userSection,
             
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

         
        </ScrollView>
      </SafeAreaView>
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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