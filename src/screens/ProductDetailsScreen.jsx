import React, { useState, useLayoutEffect, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import QuantityStepper from '../components/QuantityStepper';
import { getProductById } from '../data/products';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

const SIZES = [
  { key: 'S', label: 'S', extra: 0 },
  { key: 'M', label: 'M', extra: 0.5 },
  { key: 'L', label: 'L', extra: 1.0 },
];

const MILKS = ['Whole', 'Oat', 'Almond', 'None'];
const SUGAR_LEVELS = ['0%', '50%', '100%'];

/**
 * ProductDetailsScreen
 *
 * Detailed item view matching the BrewGo Figma design (`hifi_03_item_detail.png`):
 * - Reached via `navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId })`
 * - Validates productId and provides defensive fallback with back buttons if missing/invalid
 * - Allows full drink customization: Size (S/M/L), Milk (Whole/Oat/Almond/None),
 *   Extra shots stepper, and Sugar level
 * - Dynamic price calculation that recalculates live with every selected option
 * - Passes full configured order details forward to `SCREENS.CHECKOUT`
 */
export default function ProductDetailsScreen({ route, navigation }) {
  const productId = route.params?.productId;
  const product = productId ? getProductById(productId) : undefined;

  // Customization options state
  const [size, setSize] = useState('M');
  const [milk, setMilk] = useState('Oat');
  const [extraShots, setExtraShots] = useState(1);
  const [sugar, setSugar] = useState('50%');
  const [qty, setQty] = useState(1);

  // Set the Stack header title dynamically once product is loaded
  useLayoutEffect(() => {
    navigation.setOptions({
      title: product ? product.name : 'Product Details',
    });
  }, [navigation, product]);

  // Calculate live unit price based on options
  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const sizeAddon = SIZES.find((s) => s.key === size)?.extra || 0;
    const shotAddon = extraShots * 0.75;
    return product.price + sizeAddon + shotAddon;
  }, [product, size, extraShots]);

  const totalPrice = useMemo(() => {
    return (unitPrice * qty).toFixed(2);
  }, [unitPrice, qty]);

  // Defensive fallback (task 5): if productId is missing or invalid
  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundGlyph}>🔍</Text>
          <Text style={styles.notFoundTitle}>Item not found</Text>
          <Text style={styles.notFoundBody}>
            {productId
              ? `No product matches id "${productId}".`
              : 'No product id was provided to this screen.'}
          </Text>
          <View style={styles.notFoundActions}>
            <CustomButton
              title="Go back"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.notFoundButton}
            />
            <CustomButton
              title="Browse menu"
              onPress={() =>
                navigation.navigate(SCREENS.MAIN_TABS, { screen: SCREENS.MENU })
              }
              style={styles.notFoundButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleGoToCheckout = () => {
    navigation.navigate(SCREENS.CHECKOUT, {
      productId: product.id,
      quantity: qty,
      size,
      milk,
      extraShots,
      sugar,
      unitPrice,
      totalPrice: parseFloat(totalPrice),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image container matching Figma */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroGlyph}>☕</Text>
        </View>

        {/* Product Name & Base Price */}
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{product.name}</Text>
            {product.calories ? (
              <Text style={styles.calories}>{product.calories}</Text>
            ) : null}
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        {/* Size Selection (S, M, L) */}
        <Text style={styles.sectionLabel}>Size</Text>
        <View style={styles.chipRow}>
          {SIZES.map((s) => {
            const isSelected = size === s.key;
            return (
              <TouchableOpacity
                key={s.key}
                style={[styles.sizeChip, isSelected && styles.chipActive]}
                onPress={() => setSize(s.key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.sizeLabel, isSelected && styles.chipLabelActive]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Milk Selection */}
        <Text style={styles.sectionLabel}>Milk</Text>
        <View style={styles.chipRow}>
          {MILKS.map((m) => {
            const isSelected = milk === m;
            return (
              <TouchableOpacity
                key={m}
                style={[styles.optionChip, isSelected && styles.chipActive]}
                onPress={() => setMilk(m)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && styles.chipLabelActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Extra Shots Stepper */}
        <View style={styles.stepperRow}>
          <View>
            <Text style={styles.sectionLabelInline}>Extra shots</Text>
            <Text style={styles.subtext}>+$0.75 per extra espresso shot</Text>
          </View>
          <QuantityStepper
            value={extraShots}
            onChange={setExtraShots}
            min={0}
            max={4}
          />
        </View>

        {/* Sugar Level */}
        <Text style={styles.sectionLabel}>Sugar level</Text>
        <View style={styles.chipRow}>
          {SUGAR_LEVELS.map((s) => {
            const isSelected = sugar === s;
            return (
              <TouchableOpacity
                key={s}
                style={[styles.optionChip, isSelected && styles.chipActive]}
                onPress={() => setSugar(s)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && styles.chipLabelActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions matching Figma */}
      <View style={styles.footer}>
        <View style={styles.qtyContainer}>
          <Text style={styles.qtyLabel}>Qty</Text>
          <QuantityStepper value={qty} onChange={setQty} min={1} max={10} size="small" />
        </View>
        <CustomButton
          title={`Add to cart — $${totalPrice}`}
          onPress={handleGoToCheckout}
          style={styles.checkoutButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  heroContainer: {
    height: 190,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  heroGlyph: {
    fontSize: 54,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.ink,
  },
  calories: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  price: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: SPACING.lg,
  },
  sectionLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  sectionLabelInline: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
  subtext: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sizeChip: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
  optionChip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.ink,
  },
  chipActive: {
    backgroundColor: COLORS.brownDark,
    borderColor: COLORS.brownDark,
  },
  chipLabelActive: {
    color: COLORS.white,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    gap: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: { elevation: 6 },
    }),
  },
  qtyContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  qtyLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: 2,
  },
  checkoutButton: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  notFoundGlyph: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  notFoundTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  notFoundBody: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  notFoundActions: {
    width: '100%',
    gap: SPACING.sm,
  },
  notFoundButton: {
    width: '100%',
  },
});
