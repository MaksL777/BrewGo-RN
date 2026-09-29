import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';
import { SCREENS } from '../navigation/screens';

const FAQS = [
  {
    q: 'How does mobile pickup work?',
    a: 'Once your order is confirmed, our baristas begin crafting your drink. You can track preparation status in the Orders tab. When it shows "Ready for pickup", head to the counter and show your name.',
  },
  {
    q: 'Can I customize milk and espresso shots?',
    a: 'Yes! On the product details screen you can choose whole milk, oat milk, or almond milk, select your drink size, choose extra espresso shots, and adjust sweetness.',
  },
  {
    q: 'How do BrewGo reward points work?',
    a: 'You earn 10 points for every $1 spent. Points can be redeemed for free drinks, bakery items, and exclusive seasonal roasts.',
  },
  {
    q: 'Can I cancel or modify an order?',
    a: 'Because our drinks are freshly prepared right away, please call the store directly via the Contact screen as soon as possible if you need to modify your order.',
  },
];

export default function HelpScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
        title="Help & FAQ"
        subtitle="Answers to common questions"
        showBack={true}
        onBackPress={handleBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>

        {FAQS.map((faq, index) => {
          const isOpen = expandedIndex === index;
          return (
            <TouchableOpacity
              key={faq.q}
              style={styles.card}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.8}
            >
              <View style={styles.questionRow}>
                <Text style={styles.question}>{faq.q}</Text>
                <Feather
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={COLORS.muted}
                />
              </View>
              {isOpen ? <Text style={styles.answer}>{faq.a}</Text> : null}
            </TouchableOpacity>
          );
        })}

        <View style={styles.supportCard}>
          <Feather name="message-circle" size={28} color={COLORS.brownDark} style={{ marginBottom: 8 }} />
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportBody}>
            Our team at Riverside Roasters is here to help you every day.
          </Text>
          <CustomButton
            title="Contact store"
            icon="📞"
            onPress={() => navigation.navigate(SCREENS.CONTACT)}
            style={styles.supportButton}
          />
        </View>

        <CustomButton
          title="Back to home"
          variant="outline"
          onPress={() => navigation.navigate(SCREENS.MAIN)}
          style={styles.backHomeBtn}
        />
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
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
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.ink,
    flex: 1,
    paddingRight: SPACING.sm,
  },
  answer: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    lineHeight: 18,
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  supportCard: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  supportTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.xs,
  },
  supportBody: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  supportButton: {
    width: '100%',
  },
  backHomeBtn: {
    width: '100%',
  },
});
