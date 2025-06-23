import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }: any) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  // Simulación de CartContext
  const addToCart = (product: any, quantity: any) => {
    Alert.alert(
      '¡Agregado al Carrito!',
      `${quantity} ${product.title} agregado a tu carrito exitosamente.`,
      [
        {
          text: 'Seguir Comprando',
          style: 'cancel',
        },
        {
          text: 'Ver Carrito',
          onPress: () => {},
        },
      ]
    );
  };

  // Función para manejar cambios de cantidad
  const updateQuantity = (change: any) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  // Formatear precio
  const formatPrice = (price: any) => {
    return `$${price.toFixed(2)}`;
  };

  // Calcular precio total
  const getTotalPrice = () => {
    return formatPrice(product.price * quantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#ffffff', '#fafbff']}
            style={styles.headerGradient}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#16a34a20', '#22c55e10']}
                style={styles.backButtonGradient}
              >
                <Ionicons name="arrow-back" size={24} color="#16a34a" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Detalles del Producto</Text>
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => Alert.alert('Favoritos', 'Producto agregado a favoritos')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#16a34a20', '#22c55e10']}
                style={styles.favoriteButtonGradient}
              >
                <Ionicons name="heart-outline" size={24} color="#16a34a" />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Image Section */}
          <View style={styles.imageSection}>
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.imageSectionGradient}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.imageOverlay}>

                    <Text style={styles.discountText}>-15%</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Product Information Section */}
          <View style={styles.infoSection}>
            <LinearGradient
              colors={['#ffffff', '#fefbff']}
              style={styles.infoSectionGradient}
            >
              {/* Product Name and Price */}
              <View style={styles.titlePriceContainer}>
                <Text style={styles.productName}>{product.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                </View>
              </View>

              {/* Product Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Descripción</Text>
                <Text style={styles.descriptionText}>{product.description}</Text>
              </View>

              {/* Quantity Selector */}
              <View style={styles.quantitySection}>
                <Text style={styles.quantityLabel}>Cantidad</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                    onPress={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={quantity <= 1 ? ['#e5e7eb', '#d1d5db'] : ['#16a34a', '#22c55e']}
                      style={styles.quantityButtonGradient}
                    >
                      <Ionicons 
                        name="remove" 
                        size={20} 
                        color={quantity <= 1 ? '#9ca3af' : '#fff'} 
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <View style={styles.quantityDisplay}>
                    <Text style={styles.quantityText}>{quantity}</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.quantityButton, quantity >= 99 && styles.quantityButtonDisabled]}
                    onPress={() => updateQuantity(1)}
                    disabled={quantity >= 99}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={quantity >= 99 ? ['#e5e7eb', '#d1d5db'] : ['#16a34a', '#22c55e']}
                      style={styles.quantityButtonGradient}
                    >
                      <Ionicons 
                        name="add" 
                        size={20} 
                        color={quantity >= 99 ? '#9ca3af' : '#fff'} 
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

            
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Fixed Bottom Add to Cart Button */}
        <View style={styles.bottomSection}>
          <LinearGradient
            colors={['#ffffff', '#fafbff']}
            style={styles.bottomSectionGradient}
          >
            <View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#16a34a', '#22c55e', '#15803d']}
                  style={styles.addToCartGradient}
                >
                  <Ionicons name="cart" size={20} color="#fff" />
                  <Text style={styles.addToCartText}>Agregar al Carrito</Text>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceTagText}>{getTotalPrice()}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
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

export default ProductScreen;