import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../../components/ProductCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  
  // No hay manejo de errores en el caso de que haya
  // un problema de red o con el servicio remoto

  // Tampoco hay paginacion de la respuesta

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // obtener los productos de la API
  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://fakestoreapi.com/products');      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // componente de loading
  const LoadingContent = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSubtitle}>
          Discover our amazing collection
        </Text>
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </SafeAreaView>
  );

  // Calcular el numero de columnas basado en el ancho de la pantalla
  const getColumns = () => {
    const cardWidth = 160;
    const margin = 20;
    const availableWidth = width - (margin * 2);
    return Math.floor(availableWidth / (cardWidth + 10));
  };
  const columns = getColumns();

  const handleProductPress = (product: any) => {
    navigation.navigate('Product', { product });
  };

  // Mostrar loading mientras se cargan los productos
  if (loading) {
    return <LoadingContent />;
  }

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
          {products.map((product: any) => (
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
  // Estilos para el loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Mismo fondo que el container principal
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6c757d', // Mismo color que el subtitle
    textAlign: 'center',
  },
});

export default HomeScreen;