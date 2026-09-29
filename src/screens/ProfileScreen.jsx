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

export default function ProfileScreen({ navigation }) {
  const handleEdit = (section) => {
    Alert.alert('Edit setting', `Would you like to update your ${section}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => Alert.alert('Updated', `${section} updated successfully.`) },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out of BrewGo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => Alert.alert('Signed out', 'You have been signed out.') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Profile"
        subtitle="Alex Morgan"
        onMenuPress={() => navigation.openDrawer()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={32} color={COLORS.brownDark} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Morgan</Text>
            <Text style={styles.userTier}>⭐ Gold Member · 450 pts</Text>
            <Text style={styles.userDate}>Coffee lover since 2023</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>alex.morgan@example.com</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit('Email')}>
              <Text style={styles.editAction}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardText}>
              <Text style={styles.label}>Saved payment</Text>
              <Text style={styles.value}>Visa •••• 4471</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit('Payment Method')}>
              <Text style={styles.editAction}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardText}>
              <Text style={styles.label}>Favorite shop</Text>
              <Text style={styles.value}>Riverside Roasters · 0.3 mi</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CONTACT)}>
              <Text style={styles.editAction}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>QUICK NAVIGATION</Text>

        <TouchableOpacity
          style={styles.navRow}
          onPress={() => navigation.navigate(SCREENS.ORDERS)}
        >
          <View style={styles.navRowLeft}>
            <Feather name="shopping-bag" size={18} color={COLORS.brownDark} style={styles.navIcon} />
            <Text style={styles.navLabel}>My Orders</Text>
          </View>
          <Feather name="chevron-right" size={18} color={COLORS.muted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navRow}
          onPress={() => navigation.navigate(SCREENS.HELP)}
        >
          <View style={styles.navRowLeft}>
            <Feather name="help-circle" size={18} color={COLORS.brownDark} style={styles.navIcon} />
            <Text style={styles.navLabel}>Help & FAQ</Text>
          </View>
          <Feather name="chevron-right" size={18} color={COLORS.muted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navRow}
          onPress={() => navigation.navigate(SCREENS.CONTACT)}
        >
          <View style={styles.navRowLeft}>
            <Feather name="phone-call" size={18} color={COLORS.brownDark} style={styles.navIcon} />
            <Text style={styles.navLabel}>Contact Store</Text>
          </View>
          <Feather name="chevron-right" size={18} color={COLORS.muted} />
        </TouchableOpacity>

        <CustomButton
          title="Open side drawer"
          variant="outline"
          icon="☰"
          onPress={() => navigation.openDrawer()}
          style={styles.drawerButton}
        />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log out of account</Text>
        </TouchableOpacity>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
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
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.ink,
  },
  userTier: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.brownDark,
    marginTop: 2,
  },
  userDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 0.8,
    marginBottom: SPACING.xs,
    marginLeft: 2,
    marginTop: SPACING.sm,
  },
  card: {
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
  },
  value: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2,
  },
  editAction: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.brownDark,
    paddingLeft: SPACING.sm,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  navRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    marginRight: SPACING.md,
  },
  navLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.ink,
  },
  drawerButton: {
    marginTop: SPACING.lg,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  logoutText: {
    fontSize: FONT_SIZE.sm,
    color: '#B3261E',
    fontWeight: '600',
  },
});
