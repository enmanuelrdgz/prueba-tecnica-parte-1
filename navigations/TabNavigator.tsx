import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/HomeScreen";
import Cart from "../screens/CartScreen";
import Product from "../screens/ProductScreen";
import Profile from "../screens/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen
                name="Home"
                component={Home}
            />
            <HomeStack.Screen
                 name="Product"
                component={Product}
            />
        </HomeStack.Navigator>
    );
}

const CartStack = createNativeStackNavigator();

const CartStackScreen = () => {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen
                name="Cart"
                component={Cart}
            />
        </CartStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
            />
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator  screenOptions={({ route }) => ({
        // Esta función se ejecuta para cada tab y determina qué icono mostrar
        tabBarIcon: ({ focused, color, size }) => {
          // Definimos un tipo específico para los nombres de iconos que vamos a usar
          // Esto le dice a TypeScript exactamente qué valores son válidos
          let iconName: 'storefront' | 'storefront-outline' | 'basket' | 'basket-outline' | 'person' | 'person-outline';

          // Ahora TypeScript sabe que iconName solo puede ser uno de estos valores específicos
          if (route.name === 'HomeStack') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'CartStack') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        
        // Configuración adicional de estilos para las tabs
        tabBarActiveTintColor: '#007AFF', // Color cuando la tab está activa
        tabBarInactiveTintColor: '#8E8E93', // Color cuando la tab está inactiva
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Fondo de la barra de tabs
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60 + insets.bottom // Altura base + espacio seguro
        },
        
        // Ocultar el header por defecto ya que cada stack maneja el suyo
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Store', // Etiqueta que aparece debajo del icono
        }}
      />
      <Tab.Screen 
        name="CartStack" 
        component={CartStackScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
        </Tab.Navigator>
    );
};

export default TabNavigator;