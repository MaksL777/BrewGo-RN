import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  useWindowDimensions,
  Text,
} from 'react-native';

import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

import { PRODUCTS } from '../data/products';
import { COLORS } from '../constants/colors';
import { SPACING, BREAKPOINT_TABLET, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Cold Brew', 'Pastry'];

/**
 * MenuScreen — second tab matching the BrewGo Figma design:
 * - Header with drawer menu button (☰) and cart/orders shortcut
 * - Horizontal category filter chips
 * - 2-column adaptive product grid
 * - Linear navigation to ProductDetails with parameter passing
 */
export default function MenuScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width } = useWindowDimensions();
  const numColumns = width >= BREAKPOINT_TABLET ? 3 : 2;
  const gridGap = SPACING.md;
  const cardWidth =
    (width - SPACING.lg * 2 - gridGap * (numColumns - 1)) / numColumns;

  // Filter products according to category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Menu"
        subtitle="Browse the full catalog"
        onMenuPress={() => navigation.openDrawer()}
        actionIcon="shopping-bag"
        onActionPress={() => navigation.navigate(SCREENS.ORDERS)}
      />

      <View style={styles.sectionNoPadding}>
        <CategoryList
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

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
            name={item.name}
            price={item.price}
            rating={item.rating}
            variant="grid"
            style={{ width: cardWidth }}
            onPress={() =>
              navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: item.id })
            }
            onAddPress={() =>
              navigation.navigate(SCREENS.CHECKOUT, {
                productId: item.id,
                quantity: 1,
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No items in this category</Text>
            <CustomButton
              title="Show all items"
              variant="outline"
              onPress={() => setSelectedCategory('All')}
              style={{ marginTop: SPACING.md }}
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
  sectionNoPadding: {
    marginBottom: SPACING.md,
  },
  grid: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
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
