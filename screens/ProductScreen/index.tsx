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
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    width: 44,
    height: 44,
  },
  backButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  favoriteButton: {
    width: 44,
    height: 44,
  },
  favoriteButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  imageSectionGradient: {
    borderRadius: 24,
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  productImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  discountBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoSection: {
    margin: 16,
    borderRadius: 24,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoSectionGradient: {
    borderRadius: 24,
    padding: 24,
  },
  titlePriceContainer: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flex: 1,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  quantityButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityDisplay: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  totalSection: {
    marginTop: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  bottomSection: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSectionGradient: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  addToCartButton: {
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
    marginRight: 12,
  },
  priceTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceTagText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GreenProductScreen;