import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/layout';

export default function ProductReviews({ productId }) {
  const { theme } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder to mock external API reviews
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${productId || 1}`);
        const data = await response.json();
        // Take top 3 comments as reviews
        setReviews(data.slice(0, 3));
      } catch (err) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Reviews</Text>
        <ActivityIndicator size="small" color={theme.primary} style={{ marginTop: SPACING.md }} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Reviews</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Reviews</Text>
      {reviews.map((review, index) => (
        <View key={review.id.toString()} style={[styles.reviewCard, { backgroundColor: theme.card }]}>
          <View style={styles.reviewHeader}>
            <View style={[styles.avatar, { backgroundColor: theme.background }]}>
              <Text style={styles.avatarText}>{review.email.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.reviewerInfo}>
              <Text style={[styles.reviewerName, { color: theme.text }]} numberOfLines={1}>
                {review.email.split('@')[0]}
              </Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Feather key={i} name="star" size={12} color={i < 4 ? COLORS.caramel : COLORS.line} />
                ))}
              </View>
            </View>
          </View>
          <Text style={[styles.reviewBody, { color: theme.text }]} numberOfLines={3}>
            {review.body.replace(/\n/g, ' ')}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  reviewCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.brownDark,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 2,
    gap: 2,
  },
  reviewBody: {
    fontSize: FONT_SIZE.xs,
    lineHeight: 18,
    opacity: 0.8,
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.muted,
    fontStyle: 'italic',
  }
});
