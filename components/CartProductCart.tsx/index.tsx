import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const CartProductCard = ({ product, onPress, onRemove, onUpdateQuantity }: any) => {
  // Format price for display
  const formatPrice = (price: any) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate total price for this item (price × quantity)
  const getTotalPrice = () => {
    return formatPrice(product.price * product.quantity);
  };

  // Handle quantity increment
  const handleIncrement = () => {
    if (product.quantity < 99) { // Reasonable upper limit
      onUpdateQuantity(product.quantity + 1);
    }
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (product.quantity > 1) {
      onUpdateQuantity(product.quantity - 1);
    } else {
      // If quantity would become 0, confirm removal
      Alert.alert(
        'Remove Item',
        'This will remove the item from your cart. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: onRemove },
        ]
      );
    }
  };

  // Handle remove button press
  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Remove ${product.name} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  return (
    <View style={styles.card}>
      {/* Product Image and Basic Info Section */}
      <TouchableOpacity 
        style={styles.productInfo}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          
          <Text style={styles.productCategory}>
            {product.category}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.unitPrice}>
              {formatPrice(product.price)} each
            </Text>
            <Text style={styles.totalPrice}>
              {getTotalPrice()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Quantity Controls and Remove Button Section */}
      <View style={styles.actionsContainer}>
        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              product.quantity <= 1 && styles.quantityButtonDisabled
            ]}
            onPress={handleDecrement}
          >
            <Ionicons 
              name="remove" 
              size={16} 
              color={product.quantity <= 1 ? '#adb5bd' : '#007bff'} 
            />
          </TouchableOpacity>
          
          <View style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{product.quantity}</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.quantityButton,
              product.quantity >= 99 && styles.quantityButtonDisabled
            ]}
            onPress={handleIncrement}
          >
            <Ionicons 
              name="add" 
              size={16} 
              color={product.quantity >= 99 ? '#adb5bd' : '#007bff'} 
            />
          </TouchableOpacity>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touch target
        >
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartProductCard;