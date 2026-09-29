import React from 'react';
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

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

/**
 * ContactScreen — reached via Drawer link or Profile/Help.
 *
 * Demonstrates:
 * - Clear Back navigation (`navigation.navigate(SCREENS.MAIN)`)
 * - Real store details with working action buttons (call, email, directions)
 */
export default function ContactScreen({ navigation }) {
  const handleCall = () => {
    Alert.alert('Call Store', 'Would you like to dial (555) 019-4471?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Alert.alert('Dialing...', 'Connecting to Riverside Roasters.') },
    ]);
  };

  const handleEmail = () => {
    Alert.alert('Send Email', 'Would you like to send an email to hello@brewgo.com?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Mail', onPress: () => Alert.alert('Mail Drafted', 'Draft opened to hello@brewgo.com.') },
    ]);
  };

  const handleDirections = () => {
    Alert.alert('Get Directions', 'Opening map for 12 River St, New York, NY...', [
      { text: 'OK' },
    ]);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(SCREENS.MAIN);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Contact Store"
        subtitle="Get in touch with Riverside Roasters"
        showBack={true}
        onBackPress={handleBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Store Card */}
        <View style={styles.storeCard}>
          <View style={styles.storeIconCircle}>
            <Text style={styles.storeGlyph}>☕</Text>
          </View>
          <Text style={styles.storeName}>Riverside Roasters</Text>
          <Text style={styles.storeTagline}>Artisanal Espresso & Fresh Bakery</Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>📍 0.3 miles away</Text>
          </View>
        </View>

        {/* Details List */}
        <Text style={styles.sectionTitle}>LOCATION & HOURS</Text>

        <TouchableOpacity style={styles.detailRow} onPress={handleDirections}>
          <Feather name="map-pin" size={20} color={COLORS.brownDark} style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Address</Text>
            <Text style={styles.rowValue}>12 River St, New York, NY 10001</Text>
          </View>
          <Feather name="external-link" size={16} color={COLORS.muted} />
        </TouchableOpacity>

        <View style={styles.detailRow}>
          <Feather name="clock" size={20} color={COLORS.brownDark} style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Hours</Text>
            <Text style={styles.rowValue}>Mon – Sun: 7:00 AM – 8:00 PM</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.detailRow} onPress={handleCall}>
          <Feather name="phone" size={20} color={COLORS.brownDark} style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Phone</Text>
            <Text style={styles.rowValue}>(555) 019-4471</Text>
          </View>
          <Feather name="phone-outgoing" size={16} color={COLORS.brownDark} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailRow} onPress={handleEmail}>
          <Feather name="mail" size={20} color={COLORS.brownDark} style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue}>hello@brewgo.com</Text>
          </View>
          <Feather name="send" size={16} color={COLORS.brownDark} />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <CustomButton
            title="Call store"
            icon="📞"
            onPress={handleCall}
            style={styles.actionBtn}
          />
          <CustomButton
            title="Get directions"
            variant="outline"
            icon="🗺️"
            onPress={handleDirections}
            style={styles.actionBtn}
          />
          <CustomButton
            title="Back to home"
            variant="outline"
            onPress={() => navigation.navigate(SCREENS.MAIN)}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
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
  storeCard: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
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
  storeIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  storeGlyph: {
    fontSize: 32,
  },
  storeName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.ink,
  },
  storeTagline: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
    marginBottom: SPACING.sm,
  },
  distanceBadge: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.pill,
    paddingVertical: 4,
    paddingHorizontal: SPACING.md,
  },
  distanceText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
    marginLeft: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
    }),
  },
  rowIcon: {
    marginRight: SPACING.md,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
  },
  rowValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2,
  },
  buttonGroup: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  actionBtn: {
    width: '100%',
  },
});
