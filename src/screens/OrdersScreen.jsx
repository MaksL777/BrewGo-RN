import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { getOrders } from '../data/ordersStore';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const currentOrders = getOrders();
      setOrders(currentOrders);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      return () => {};
    }, [])
  );

  const handleReorder = (item) => {
    navigation.navigate(SCREENS.CHECKOUT, {
      productId: item.productId || '1',
      quantity: item.quantity || 1,
      unitPrice: item.totalPrice && item.quantity ? item.totalPrice / item.quantity : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Orders"
        subtitle={lastRefreshed ? `Updated at ${lastRefreshed}` : 'Your order history'}
        onMenuPress={() => navigation.openDrawer()}
      />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isPreparing = item.status?.includes('Preparing');
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Text style={styles.coffeeGlyph}>☕</Text>
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={[styles.badge, isPreparing ? styles.badgePreparing : styles.badgePickedUp]}>
                  <Text
                    style={[
                      styles.badgeText,
                      isPreparing ? styles.badgeTextPreparing : styles.badgeTextPickedUp,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              {item.customization ? (
                <Text style={styles.customization}>{item.customization}</Text>
              ) : null}

              <View style={styles.cardFooter}>
                <Text style={styles.price}>${item.totalPrice?.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.reorderBtn}
                  onPress={() => handleReorder(item)}
                  activeOpacity={0.8}
                  accessibilityLabel={`Reorder ${item.title}`}
                >
                  <Feather name="repeat" size={14} color={COLORS.brownDark} style={{ marginRight: 4 }} />
                  <Text style={styles.reorderText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyGlyph}>🛍</Text>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              You haven't placed any coffee orders yet. Browse our menu and treat yourself!
            </Text>
            <CustomButton
              title="Explore Menu"
              onPress={() => navigation.navigate(SCREENS.MENU)}
              style={styles.exploreBtn}
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
  list: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  coffeeGlyph: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
  },
  date: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.pill,
  },
  badgePreparing: {
    backgroundColor: '#FFE9D5',
  },
  badgePickedUp: {
    backgroundColor: '#E8F5E9',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextPreparing: {
    color: COLORS.brownDark,
  },
  badgeTextPickedUp: {
    color: '#2E7D32',
  },
  customization: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginVertical: SPACING.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.pill,
    paddingVertical: 6,
    paddingHorizontal: SPACING.md,
  },
  reorderText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.lg,
  },
  emptyGlyph: {
    fontSize: 54,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  exploreBtn: {
    minWidth: 160,
  },
});
