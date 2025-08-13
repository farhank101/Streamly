/**
 * Subscription Plans Screen
 * Inspired by SiriusXM app's subscription selection screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, SHADOWS } from '../constants/theme';

// Mock subscription plans
const SUBSCRIPTION_PLANS = [
  {
    id: '1',
    name: 'All Access (App Only)',
    price: '$9.99/mo.',
    features: [
      'Ad-free music curated by experts and DJs in every genre and decade',
      'Celebrity-hosted talk shows and the funniest comedy channels',
      'Unlimited skips and offline listening',
      'Live sports including NFL, MLB, NBA, NHL, and college games, plus sports talk and analysis',
    ],
    isMostPopular: true,
    billingPeriod: 'monthly',
  },
  {
    id: '2',
    name: 'Annual Plan',
    price: '$79/yr.',
    priceNote: '($6.58/mo.)',
    features: [
      'All the benefits of the monthly plan',
      'Save over 30% compared to monthly billing',
      'Unlimited access on all your devices',
    ],
    isMostPopular: false,
    billingPeriod: 'yearly',
  },
  {
    id: '3',
    name: 'Family Plan',
    price: '$14.99/mo.',
    features: [
      'Up to 6 accounts for family members',
      'Individual recommendations and playlists',
      'Parental controls for kids accounts',
      'All features of the All Access plan',
    ],
    isMostPopular: false,
    billingPeriod: 'monthly',
  },
];

export default function SubscriptionPlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('1'); // Default to first plan

  // Handle plan selection
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  // Handle continue button press
  const handleContinue = () => {
    // In a real app, this would navigate to a payment screen
    // For now, just go back to the tabs
    router.replace('/(tabs)');
  };

  // Handle back button press
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select plan</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Plans */}
      <ScrollView contentContainerStyle={styles.content}>
        {SUBSCRIPTION_PLANS.map((plan) => (
          <TouchableOpacity 
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlanCard
            ]}
            onPress={() => handlePlanSelect(plan.id)}
          >
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  {plan.priceNote && (
                    <Text style={styles.planPriceNote}>{plan.priceNote}</Text>
                  )}
                </View>
              </View>
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedPlan === plan.id && styles.radioOuterSelected
                ]}>
                  {selectedPlan === plan.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </View>

            {plan.isMostPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="star" size={16} color={COLORS.primaryAccent} style={styles.featureIcon} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.termsText}>
          Cancel anytime. Certain restrictions may apply in the app.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Agree & continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    padding: SPACING.lg,
  },
  planCard: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: SIZES.cardBorderRadius,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOWS.small,
  },
  selectedPlanCard: {
    borderColor: COLORS.primaryAccent,
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.primaryAccent,
  },
  planPriceNote: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  radioContainer: {
    padding: SPACING.xs,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primaryAccent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryAccent,
  },
  popularBadge: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
  },
  popularText: {
    fontSize: 10,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  featuresContainer: {
    marginTop: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  featureIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textPrimary,
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  continueButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 30,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
});