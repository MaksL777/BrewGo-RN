import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  useWindowDimensions,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

import { fetchCoffeeData } from '../api';
import { addItem } from '../redux/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { SPACING, BREAKPOINT_TABLET, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Cold Brew', 'Pastry'];

export default function MenuScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { width } = useWindowDimensions();
  const numColumns = width >= BREAKPOINT_TABLET ? 3 : 2;
  const gridGap = SPACING.md;
  const cardWidth =
    (width - SPACING.lg * 2 - gridGap * (numColumns - 1)) / numColumns;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCoffeeData();
        const mappedData = data.map((item, index) => ({
          id: String(item.id || index),
          name: item.title,
          description: item.description || '',
          price: 4.99,
          rating: 4.5,
          category: 'Coffee',
        }));
        setProducts(mappedData);
      } catch (err) {
        setError('Failed to load menu. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, products]);

  const handleAddToCart = React.useCallback((item) => {
    dispatch(
      addItem({
        cartItemId: Date.now().toString(),
        id: item.id,
        productName: item.name,
        quantity: 1,
        unitPrice: item.price,
        customization: 'Medium · Oat milk · 50% sugar',
      })
    );
    Alert.alert('Added to Cart', `${item.name} was added to your cart.`);
  }, [dispatch]);

  const handlePressItem = React.useCallback((item) => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { product: item });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title="Menu"
        subtitle="Browse the full catalog"
        onMenuPress={() => navigation.openDrawer()}
        actionIcon="shopping-cart"
        onActionPress={() => navigation.navigate(SCREENS.CART)}
      />

      <View style={styles.sectionNoPadding}>
        <CategoryList
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.brownDark} />
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading menu...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
          <CustomButton
            title="Retry"
            onPress={() => {
              setLoading(true);
              fetchCoffeeData()
                .then(data => {
                  const mappedData = data.map((item, index) => ({
                    id: String(item.id || index),
                    name: item.title,
                    description: item.description || '',
                    price: 4.99,
                    rating: 4.5,
                    category: 'Coffee',
                  }));
                  setProducts(mappedData);
                  setError(null);
                })
                .catch(() => setError('Failed to load menu. Please try again.'))
                .finally(() => setLoading(false));
            }}
          />
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={numColumns > 1 ? { gap: gridGap } : undefined}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              name={item.name}
              price={item.price}
              rating={item.rating}
              variant="grid"
              style={{ width: cardWidth }}
              onPress={handlePressItem}
              onAddPress={handleAddToCart}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No items in this category</Text>
              <CustomButton
                title="Show all items"
                variant="outline"
                onPress={() => setSelectedCategory('All')}
                style={{ marginTop: SPACING.md }}
              />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  sectionNoPadding: {
    marginBottom: SPACING.md,
  },
  grid: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.ink,
  },
  errorText: {
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.ink,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
});
