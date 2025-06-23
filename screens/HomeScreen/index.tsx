import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Animated,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';

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

          <View
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Products</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerIconContainer: {
    marginLeft: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    paddingHorizontal: 10,
    paddingTop: 5,
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
    paddingHorizontal: 20,
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  loadingSpinnerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Estilos para estado vacío
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyContent: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default HomeScreen;