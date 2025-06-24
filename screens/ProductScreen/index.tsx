import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const { width } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product, quantity) => {
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

export default ProductScreen;