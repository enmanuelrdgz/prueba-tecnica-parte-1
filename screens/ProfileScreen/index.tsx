import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import styles from './styles';

const GreenProfileScreen = () => {
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

  // Mock menu items
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

  const renderMenuItem = (item) => (
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

export default GreenProfileScreen;