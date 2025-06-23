import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';
import { styles } from './styles';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener los productos de la API
  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://fakestoreapi.com/products');      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      Alert.alert(
        'Error de Conexión', 
        'No se pudieron cargar los productos. Por favor, verifica tu conexión a internet.',
        [
          {
            text: 'Reintentar',
            onPress: () => fetchProducts(),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar productos
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  // Componente de loading
  const LoadingContent = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    </SafeAreaView>
  );

  // Calcular el número de columnas basado en el ancho de la pantalla
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
  if (loading && products.length === 0) {
    return <LoadingContent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Productos</Text>
            <Text style={styles.headerSubtitle}>
              Discover our amazing collection
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            <LinearGradient
              colors={['#16a34a20', '#22c55e10']}
              style={styles.headerIcon}
            >
              <Ionicons name="storefront" size={24} color="#16a34a" />
            </LinearGradient>
          </View>
        </View>
      </View>
      
      {/* Products Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#16a34a', '#22c55e']}
            tintColor="#16a34a"
            title="Actualizando productos..."
            titleColor="#16a34a"
          />
        }
      >
        {products.length > 0 ? (
          <View style={[styles.grid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {products.map((product: any, index: number) => (
              <View 
                key={product.id} 
                style={[
                  styles.gridItem,
                  { 
                    width: `${100 / columns}%`,
                  }
                ]}
              >
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No hay productos</Text>
            <Text style={styles.emptySubtitle}>
              No se encontraron productos disponibles en este momento
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;