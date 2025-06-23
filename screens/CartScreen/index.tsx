import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CartProductCard from '../../components/CartProductCart.tsx';
import { styles } from './styles';

const { width } = Dimensions.get('window');

// Mock data
const SAMPLE_CART_ITEMS = [
  {
    id: 1,
    name: 'Smartphone Pro',
    price: 299,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    category: 'Electronics',
    description: 'Latest smartphone with advanced features and excellent camera quality.',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 89,
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation technology.',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 199,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    category: 'Wearables',
    description: 'Feature-rich smartwatch with health monitoring capabilities.',
    quantity: 1,
  },
];

const GreenCartScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState(SAMPLE_CART_ITEMS);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Calculate total price of all items in cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Calculate total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Format price for display with proper currency formatting
  const formatPrice = (price: any) => {
    return `$${price.toFixed(2)}`;
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId: any) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que quieres eliminar este producto del carrito?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

  // Handle updating item quantity
  const handleUpdateQuantity = (itemId: any, newQuantity: any) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle product press to navigate to product detail
  const handleProductPress = (product: any) => {
    navigation.navigate('Product', { product });
  };

  // Handle checkout process
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito Vacío', 'Tu carrito está vacío. Agrega algunos productos antes de proceder al pago.');
      return;
    }

    setIsProcessingCheckout(true);
    
    setTimeout(() => {
      setIsProcessingCheckout(false);
      Alert.alert(
        '¡Pedido Realizado!',
        'Gracias por tu compra. Tu pedido ha sido procesado exitosamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              setCartItems([]);
            },
          },
        ]
      );
    }, 2000);
  };

  // Display empty cart message when no items are present
  const renderEmptyCart = () => (
    <Animated.View
      style={[
        styles.emptyCartContainer,
      ]}
    >
      <LinearGradient
        colors={['#ffffff', '#fefbff']}
        style={styles.emptyCartContent}
      >
        <View style={styles.emptyIconContainer}>
          <LinearGradient
            colors={['#16a34a20', '#22c55e10']}
            style={styles.emptyIconBackground}
          >
            <Ionicons name="cart-outline" size={64} color="#16a34a" />
          </LinearGradient>
        </View>
        <Text style={styles.emptyCartTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyCartSubtitle}>
          Agrega algunos productos para comenzar con tus compras
        </Text>
        <TouchableOpacity
          style={styles.shopNowButton}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#16a34a', '#22c55e', '#15803d']}
            style={styles.shopNowGradient}
          >
            <Ionicons name="storefront" size={20} color="#fff" />
            <Text style={styles.shopNowText}>Comprar Ahora</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );

  return (
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        
          <View
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Carrito de Compras</Text>
                {cartItems.length > 0 && (
                  <Text style={styles.headerSubtitle}>
                    {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                  </Text>
                )}
              </View>
              <View style={styles.headerIconContainer}>
                <LinearGradient
                  colors={['#16a34a20', '#22c55e10']}
                  style={styles.headerIcon}
                >
                  <Ionicons name="cart" size={24} color="#16a34a" />
                  {cartItems.length > 0 && (
                    <View style={styles.cartBadge}>
                      <LinearGradient
                        colors={['#dc2626', '#ef4444']}
                        style={styles.cartBadgeGradient}
                      >
                        <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
                      </LinearGradient>
                    </View>
                  )}
                </LinearGradient>
              </View>
            </View>
          </View>

        {/* Main Content */}
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            {/* Cart Items List */}
            <View
              style={[
                styles.contentContainer
              ]}
            >
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {cartItems.map((item, index) => (
                    <CartProductCard
                      key={item.id}
                      product={item}
                      onPress={() => handleProductPress(item)}
                      onRemove={() => handleRemoveItem(item.id)}
                      onUpdateQuantity={(newQuantity: any) => handleUpdateQuantity(item.id, newQuantity)}
                    />
                ))}
              </ScrollView>
            </View>

            {/* Footer with Total and Checkout Button */}

              <LinearGradient
                colors={['#ffffff', '#fafbff']}
                style={styles.footerGradient}
              >
                {/* Total Price Section */}
                <View style={styles.totalSection}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal:</Text>
                    <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Envío:</Text>
                    <View style={styles.freeShippingContainer}>
                      <LinearGradient
                        colors={['#16a34a20', '#22c55e10']}
                        style={styles.freeShippingBadge}
                      >
                        <Text style={styles.freeShipping}>Gratis</Text>
                      </LinearGradient>
                    </View>
                  </View>
                  <View style={[styles.totalRow, styles.grandTotalRow]}>
                    <Text style={styles.grandTotalLabel}>Total:</Text>
                    <Text style={styles.grandTotalValue}>{formatPrice(calculateTotal())}</Text>
                  </View>
                </View>

                {/* Checkout Button */}
                  <TouchableOpacity
                    style={[
                      styles.checkoutButton,
                      isProcessingCheckout && styles.checkoutButtonDisabled
                    ]}
                    onPress={handleCheckout}
                    disabled={isProcessingCheckout}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={isProcessingCheckout ? ['#9ca3af', '#6b7280'] : ['#16a34a', '#22c55e', '#15803d']}
                      style={styles.checkoutButtonGradient}
                    >
                      {isProcessingCheckout ? (
                        <View style={styles.processingContainer}>
                          <ActivityIndicator color="#fff" size="small" />
                          <Text style={styles.checkoutButtonText}>Procesando...</Text>
                        </View>
                      ) : (
                        <View style={styles.checkoutContent}>
                          <Ionicons name="card" size={20} color="#fff" />
                          <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
              </LinearGradient>
          </>
        )}
      </SafeAreaView>
  );
};

export default GreenCartScreen;