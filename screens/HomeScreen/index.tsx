import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ProductCard from '../../components/ProductCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  // Calculate how many columns can fit based on screen width
  // Each card needs minimum 160px + margins, so we calculate dynamically
  const getColumns = () => {
    const cardWidth = 160;
    const margin = 20;
    const availableWidth = width - (margin * 2);
    return Math.floor(availableWidth / (cardWidth + 10));
  };

  const columns = getColumns();

  const handleProductPress = (product: any) => {
    // Navigate to Product screen passing the product data
    navigation.navigate('Product', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSubtitle}>
          Discover our amazing collection
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.grid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {SAMPLE_PRODUCTS.map((product) => (
            <View 
              key={product.id} 
              style={[
                styles.gridItem,
                { width: `${100 / columns}%` }
              ]}
            >
              <ProductCard
                product={product}
                onPress={() => handleProductPress(product)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
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
  grid: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  gridItem: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
});

export default HomeScreen;