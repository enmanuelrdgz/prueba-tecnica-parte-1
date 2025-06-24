import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const ProductCard = ({ product, onPress }: any) => {
  // Format price to show currency symbol and proper formatting
  const formatPrice = (price: any) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7} // Provides visual feedback when pressed
    >
      {/* Product Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      {/* Product Information Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>
          {formatPrice(product.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;