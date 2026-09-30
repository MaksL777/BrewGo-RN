import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import QuantityStepper from '../components/QuantityStepper';
import { removeItem, updateQuantity, clearCart } from '../redux/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

export default function CartScreen({ navigation }) {
  const { theme } = useTheme();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (cartItemId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(removeItem(cartItemId));
  };

  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty === 0) {
      handleRemove(cartItemId);
    } else {
      dispatch(updateQuantity({ cartItemId, quantity: newQty }));
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.card }]}>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>{item.productName}</Text>
        <Text style={styles.itemCustomization}>{item.customization}</Text>
        <Text style={[styles.itemPrice, { color: theme.primary }]}>
          ${(item.unitPrice * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <QuantityStepper
          value={item.quantity}
          onChange={(newQty) => handleUpdateQuantity(item.cartItemId, newQty)}
          min={0}
          max={10}
          size="small"
        />
        <TouchableOpacity
          onPress={() => handleRemove(item.cartItemId)}
          style={styles.deleteBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="trash-2" size={18} color="#B3261E" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title="Your Cart"
        subtitle={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`}
        onMenuPress={() => navigation.openDrawer()}
      />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-cart" size={48} color={COLORS.muted} style={{ marginBottom: SPACING.md }} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your cart is empty</Text>
          <CustomButton
            title="Browse menu"
            onPress={() => navigation.navigate(SCREENS.MENU)}
            style={{ marginTop: SPACING.lg }}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartItemId}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={[styles.footer, { backgroundColor: theme.card }]}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Total:</Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>${totalAmount.toFixed(2)}</Text>
            </View>
            <CustomButton
              title="Proceed to Checkout"
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                dispatch(clearCart());
                navigation.navigate(SCREENS.HOME, {
                  orderConfirmed: true,
                  orderTitle: 'Cart Order',
                });
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  listContent: {
    padding: SPACING.md,
  },
  cartItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemCustomization: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginBottom: SPACING.xs,
  },
  itemPrice: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  deleteBtn: {
    marginTop: SPACING.sm,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
  },
});
