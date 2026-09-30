import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

import { PRODUCTS, YOUR_USUAL } from '../data/products';
import { addItem } from '../redux/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Cold Brew', 'Pastry'];

export default function HomeScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const orderConfirmed = route.params?.orderConfirmed;
  const orderTitle = route.params?.orderTitle;

  useEffect(() => {
    if (orderConfirmed) {
      const timer = setTimeout(() => {
        navigation.setParams({ orderConfirmed: undefined, orderTitle: undefined });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [orderConfirmed, navigation]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const handleReorderUsual = () => {
    dispatch(
      addItem({
        cartItemId: Date.now().toString(),
        id: YOUR_USUAL.productId,
        productName: YOUR_USUAL.name,
        quantity: 1,
        unitPrice: 4.99, // default
        customization: 'Medium · Oat milk · 50% sugar',
      })
    );
    navigation.navigate(SCREENS.CART);
  };

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
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: item.id });
  }, [navigation]);

  const renderHeader = () => (
    <View>
      <View style={styles.section}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search drinks or shops..."
        />
      </View>

      {!search && selectedCategory === 'All' && (
        <View style={styles.section}>
          <View style={[styles.usualCard, { backgroundColor: theme.card }]}>
            <View style={styles.usualThumb}>
              <Text style={styles.usualCoffeeGlyph}>☕</Text>
            </View>
            <View style={styles.usualInfo}>
              <Text style={[styles.usualLabel, { color: theme.primary }]}>Your usual</Text>
              <Text style={[styles.usualName, { color: theme.text }]}>{YOUR_USUAL.name}</Text>
              <Text style={styles.usualDate}>{YOUR_USUAL.description}</Text>
            </View>
            <TouchableOpacity
              style={[styles.reorderButton, { backgroundColor: theme.primary }]}
              onPress={handleReorderUsual}
              activeOpacity={0.8}
              accessibilityLabel="Reorder your usual drink"
            >
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.sectionTitleRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
      </View>
      <View style={styles.sectionNoPadding}>
        <CategoryList
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <View style={styles.sectionTitleRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {search ? `Search results (${filteredProducts.length})` : 'Popular near you'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title="Good morning, Alex"
        subtitle="Riverside Roasters · 0.3 mi"
        onMenuPress={() => navigation.openDrawer()}
        onProfilePress={() => navigation.navigate(SCREENS.PROFILE)}
      />

      {orderConfirmed ? (
        <TouchableOpacity
          style={styles.banner}
          onPress={() => navigation.navigate(SCREENS.ORDERS)}
          activeOpacity={0.9}
        >
          <Feather name="check-circle" size={18} color={COLORS.brownDark} style={{ marginRight: 8 }} />
          <Text style={styles.bannerText}>
            Order confirmed! {orderTitle ? `(${orderTitle})` : ''} Tap to view status ☕
          </Text>
        </TouchableOpacity>
      ) : null}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            name={item.name}
            price={item.price}
            description={item.description}
            rating={item.rating}
            variant="horizontal"
            onPress={handlePressItem}
            onAddPress={handleAddToCart}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No drinks found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with another keyword or pick "All" categories.
            </Text>
            <CustomButton
              title="Reset filters"
              variant="outline"
              onPress={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              style={styles.resetButton}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionNoPadding: {
    marginBottom: SPACING.md,
    marginHorizontal: -SPACING.lg,
  },
  sectionTitleRow: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.caramel,
  },
  bannerText: {
    color: COLORS.brownDark,
    fontWeight: '700',
    fontSize: FONT_SIZE.xs,
  },
  usualCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  usualThumb: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  usualCoffeeGlyph: {
    fontSize: 26,
  },
  usualInfo: {
    flex: 1,
  },
  usualLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  usualName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2,
  },
  usualDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  reorderButton: {
    backgroundColor: COLORS.brownDark,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  reorderText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONT_SIZE.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  resetButton: {
    minWidth: 140,
  },
});
