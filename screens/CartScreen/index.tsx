import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CartProductCard from '../../components/CartProductCart.tsx';

const { width } = Dimensions.get('window');

// Sample cart data - in a real app, this would come from context or state management
const SAMPLE_CART_ITEMS = [
  {
    id: 1,
    name: 'Smartphone Pro',
    price: 299,
    image: 'https://via.placeholder.com/150/16a34a/FFFFFF?text=Phone',
    category: 'Electronics',
    description: 'Latest smartphone with advanced features and excellent camera quality.',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 89,
    image: 'https://via.placeholder.com/150/22c55e/FFFFFF?text=Audio',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation technology.',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 199,
    image: 'https://via.placeholder.com/150/15803d/FFFFFF?text=Watch',
    category: 'Wearables',
    description: 'Feature-rich smartwatch with health monitoring capabilities.',
    quantity: 1,
  },
];

const GreenCartScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState(SAMPLE_CART_ITEMS);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;
  const footerSlideAnim = useRef(new Animated.Value(100)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

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
      Animated.timing(footerSlideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

  // Button press animation
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

  // Handle checkout process
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito Vacío', 'Tu carrito está vacío. Agrega algunos productos antes de proceder al pago.');
      return;
    }

    setIsProcessingCheckout(true);
    buttonPressAnimation();
    
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
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
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
          onPress={() => navigation.navigate('Home')}
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
    <LinearGradient
      colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
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
          </LinearGradient>
        </Animated.View>

        {/* Main Content */}
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            {/* Cart Items List */}
            <Animated.View
              style={[
                styles.contentContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {cartItems.map((item, index) => (
                  <Animated.View
                    key={item.id}
                    style={{
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        },
                      ],
                    }}
                  >
                    <CartProductCard
                      product={item}
                      onPress={() => handleProductPress(item)}
                      onRemove={() => handleRemoveItem(item.id)}
                      onUpdateQuantity={(newQuantity: any) => handleUpdateQuantity(item.id, newQuantity)}
                    />
                  </Animated.View>
                ))}
              </ScrollView>
            </Animated.View>

            {/* Footer with Total and Checkout Button */}
            <Animated.View
              style={[
                styles.footer,
                {
                  transform: [{ translateY: footerSlideAnim }],
                },
              ]}
            >
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
                <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
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
                </Animated.View>
              </LinearGradient>
            </Animated.View>
          </>
        )}
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
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerIconContainer: {
    position: 'relative',
    marginLeft: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cartBadgeGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyCartContent: {
    alignItems: 'center',
    borderRadius: 24,
    padding: 40,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
    maxWidth: 320,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyIconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  shopNowButton: {
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  shopNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  shopNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  footer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  footerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  totalSection: {
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  freeShippingContainer: {
    alignItems: 'flex-end',
  },
  freeShippingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeShipping: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  grandTotalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  checkoutButton: {
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonDisabled: {
    shadowOpacity: 0.1,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default GreenCartScreen;