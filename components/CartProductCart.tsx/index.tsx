import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f8f9fa', // Fallback background
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    lineHeight: 22,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitPrice: {
    fontSize: 14,
    color: '#6c757d',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
    paddingTop: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  quantityButtonDisabled: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  quantityDisplay: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
});

export default CartProductCard;