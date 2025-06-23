import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartProductCard from '../../components/CartProductCart.tsx';

const { width } = Dimensions.get('window');

// Sample cart data - in a real app, this would come from context or state management
const SAMPLE_CART_ITEMS = [
  {
    id: 1,
    name: 'Smartphone Pro',
    price: 299,
    image: 'https://via.placeholder.com/150/4285F4/FFFFFF?text=Phone',
    category: 'Electronics',
    description: 'Latest smartphone with advanced features and excellent camera quality.',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 89,
    image: 'https://via.placeholder.com/150/34A853/FFFFFF?text=Audio',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation technology.',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 199,
    image: 'https://via.placeholder.com/150/FBBC04/FFFFFF?text=Watch',
    category: 'Wearables',
    description: 'Feature-rich smartwatch with health monitoring capabilities.',
    quantity: 1,
  },
];

const CartScreen = ({ navigation }: any) => {
  // In a real app, cart items would come from context or state management
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
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // Filter out the item with the specified ID
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

  // Handle updating item quantity
  const handleUpdateQuantity = (itemId: any, newQuantity: any) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      handleRemoveItem(itemId);
      return;
    }
    
    // Update the quantity for the specific item
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
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items before checking out.');
      return;
    }

    setIsProcessingCheckout(true);
    
    // Simulate checkout process with a timeout
    setTimeout(() => {
      setIsProcessingCheckout(false);
      Alert.alert(
        'Order Placed!',
        'Thank you for your purchase. Your order has been successfully placed.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear the cart after successful checkout
              setCartItems([]);
            },
          },
        ]
      );
    }, 2000); // Simulate 2-second processing time
  };

  // Display empty cart message when no items are present
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Ionicons name="cart-outline" size={80} color="#adb5bd" />
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtitle}>
        Add some products to get started with your shopping
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        {cartItems.length > 0 && (
          <Text style={styles.headerSubtitle}>
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
          </Text>
        )}
      </View>

      {/* Main Content */}
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          {/* Cart Items List */}
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <CartProductCard
                key={item.id}
                product={item}
                onPress={() => handleProductPress(item)}
                onRemove={() => handleRemoveItem(item.id)}
                onUpdateQuantity={(newQuantity: any) => handleUpdateQuantity(item.id, newQuantity)}
              />
            ))}
          </ScrollView>

          {/* Footer with Total and Checkout Button */}
          <View style={styles.footer}>
            {/* Total Price Section */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping:</Text>
                <Text style={styles.freeShipping}>Free</Text>
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
              {isProcessingCheckout ? (
                <Text style={styles.checkoutButtonText}>Processing...</Text>
              ) : (
                <>
                  <Ionicons name="card" size={20} color="#fff" style={styles.checkoutIcon} />
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    paddingBottom: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  totalSection: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  freeShipping: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28a745',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  checkoutIcon: {
    marginRight: 8,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CartScreen;