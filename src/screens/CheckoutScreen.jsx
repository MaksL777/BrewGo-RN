import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import QuantityStepper from '../components/QuantityStepper';
import { getProductById } from '../data/products';
import { addOrder } from '../data/ordersStore';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

export default function CheckoutScreen({ route, navigation }) {
  const {
    productId,
    quantity: initialQty = 1,
    size = 'M',
    milk = 'Oat',
    extraShots = 1,
    sugar = '50%',
    unitPrice: passedUnitPrice,
  } = route.params ?? {};

  const product = productId ? getProductById(productId) : undefined;
  const [qty, setQty] = useState(initialQty);
  const [paymentMethod, setPaymentMethod] = useState('Visa •••• 4471');

  if (!product || !qty) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorGlyph}>🛒</Text>
          <Text style={styles.errorTitle}>Missing order details</Text>
          <Text style={styles.errorText}>
            No product was selected for checkout. Please return to the menu and choose an item.
          </Text>
          <View style={styles.errorActions}>
            <CustomButton
              title="Go back"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.actionBtn}
            />
            <CustomButton
              title="Browse menu"
              onPress={() =>
                navigation.navigate(SCREENS.MAIN_TABS, { screen: SCREENS.MENU })
              }
              style={styles.actionBtn}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const sizeNames = { S: 'Small', M: 'Medium', L: 'Large' };
  const sizeLabel = sizeNames[size] || size;

  const customSummary = `${sizeLabel} · ${milk} milk${
    extraShots > 0 ? ` · ${extraShots} shot${extraShots > 1 ? 's' : ''}` : ''
  } · ${sugar} sugar`;

  const itemUnitPrice =
    passedUnitPrice ||
    product.price + (size === 'L' ? 1.0 : size === 'M' ? 0.5 : 0) + extraShots * 0.75;

  const subtotal = itemUnitPrice * qty;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSelectPayment = () => {
    Alert.alert(
      'Select payment method',
      'Choose how you would like to pay for your order:',
      [
        { text: 'Visa •••• 4471', onPress: () => setPaymentMethod('Visa •••• 4471') },
        { text: 'Apple Pay', onPress: () => setPaymentMethod('Apple Pay') },
        { text: 'Google Pay', onPress: () => setPaymentMethod('Google Pay') },
        { text: 'Cash on pickup', onPress: () => setPaymentMethod('Cash on pickup') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleConfirmOrder = () => {
    const newOrder = addOrder({
      productId: product.id,
      title: product.name,
      quantity: qty,
      customization: customSummary,
      totalPrice: parseFloat(total.toFixed(2)),
      paymentMethod,
    });

    navigation.navigate(SCREENS.MAIN_TABS, {
      screen: SCREENS.HOME,
      params: {
        orderConfirmed: true,
        orderId: newOrder.id,
        orderTitle: `${product.name} × ${qty}`,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.itemRow}>
            <View style={styles.itemThumb}>
              <Text style={styles.itemGlyph}>☕</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemMeta} numberOfLines={2}>
                {customSummary}
              </Text>
              <Text style={styles.itemUnitPrice}>${itemUnitPrice.toFixed(2)} each</Text>
            </View>
            <View style={styles.stepperContainer}>
              <QuantityStepper
                value={qty}
                onChange={setQty}
                min={1}
                max={10}
                size="small"
              />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Feather name="clock" size={18} color={COLORS.brownDark} />
          </View>
          <View style={styles.infoTextBlock}>
            <Text style={styles.infoLabel}>Pickup time</Text>
            <Text style={styles.infoValue}>Today, 10:45 AM (ready in ~12 min)</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Feather name="credit-card" size={18} color={COLORS.brownDark} />
          </View>
          <View style={styles.infoTextBlock}>
            <Text style={styles.infoLabel}>Payment</Text>
            <Text style={styles.infoValue}>{paymentMethod}</Text>
          </View>
          <TouchableOpacity
            onPress={handleSelectPayment}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Change payment method"
          >
            <Text style={styles.changeAction}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.receiptCard}>
          <Row label="Subtotal" value={subtotal} />
          <Row label="Estimated tax (8%)" value={tax} />
          <View style={styles.divider} />
          <Row label="Total" value={total} isTotal />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={`Confirm order — $${total.toFixed(2)}`}
          onPress={handleConfirmOrder}
        />
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.cancelText}>← Back to item details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value, isTotal }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, isTotal && styles.totalLabel]}>{label}</Text>
      <Text style={[styles.rowValue, isTotal && styles.totalValue]}>
        ${value.toFixed(2)}
      </Text>
    </View>
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
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemThumb: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  itemGlyph: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
  itemMeta: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginVertical: 2,
  },
  itemUnitPrice: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.brownDark,
  },
  stepperContainer: {
    alignItems: 'flex-end',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  infoTextBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.ink,
    fontWeight: '700',
    marginTop: 2,
  },
  changeAction: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.brownDark,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
  receiptCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  rowLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
  },
  rowValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.ink,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
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
  cancelBtn: {
    marginTop: SPACING.sm,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  cancelText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  errorGlyph: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  errorTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.xs,
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  errorActions: {
    width: '100%',
    gap: SPACING.sm,
  },
  actionBtn: {
    width: '100%',
  },
});
