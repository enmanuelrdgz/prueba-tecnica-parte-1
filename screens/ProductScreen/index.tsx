import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import CartContext - this would be defined in your App.js or a separate context file
// import { CartContext } from '../context/CartContext';

const { width, height } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }: any) => {
  // Extract product data from navigation params
  const { product } = route.params;
  
  // State for managing quantity selection
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, you'd use CartContext here:
  // const { addToCart } = useContext(CartContext);
  
  // For demonstration purposes, we'll use a simple function
  const addToCart = (product: any, quantity: any) => {
    // This would typically dispatch an action to add the item to cart
    Alert.alert(
      'Added to Cart',
      `${quantity} ${product.title} added to your cart!`,
      [{ text: 'OK' }]
    );
  };

  // Function to handle quantity changes
  const updateQuantity = (change: any) => {
    const newQuantity = quantity + change;
    // Ensure quantity stays within reasonable bounds (1-99)
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  // Format price with proper currency display
  const formatPrice = (price: any) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate total price based on quantity
  const getTotalPrice = () => {
    return formatPrice(product.price * quantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Information Section */}
        <View style={styles.infoSection}>
          {/* Product Name and Price */}
          <View style={styles.titlePriceContainer}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Product Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={() => updateQuantity(-1)}
                disabled={quantity <= 1}
              >
                <Ionicons 
                  name="remove" 
                  size={20} 
                  color={quantity <= 1 ? '#adb5bd' : '#fff'} 
                />
              </TouchableOpacity>
              
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              
              <TouchableOpacity
                style={[styles.quantityButton, quantity >= 99 && styles.quantityButtonDisabled]}
                onPress={() => updateQuantity(1)}
                disabled={quantity >= 99}
              >
                <Ionicons 
                  name="add" 
                  size={20} 
                  color={quantity >= 99 ? '#adb5bd' : '#fff'} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Price Display */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total: {getTotalPrice()}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Add to Cart Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={20} color="#fff" style={styles.cartIcon} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  headerSpacer: {
    width: 32, // Same width as back button to center the title
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productImage: {
    width: width * 0.8, // 80% of screen width
    height: width * 0.8, // Square aspect ratio
    borderRadius: 12,
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  titlePriceContainer: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 30,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: '#0056b3',
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  quantityDisplay: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  totalSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  bottomSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  addToCartButton: {
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
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProductScreen;