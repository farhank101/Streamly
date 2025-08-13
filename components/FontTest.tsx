/**
 * Font Test Component
 * Test component to verify font loading is working correctly
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';

export default function FontTest() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Font Loading Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inter Fonts</Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interThin }]}>
          Inter Thin - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interExtraLight }]}>
          Inter ExtraLight - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interLight }]}>
          Inter Light - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interRegular }]}>
          Inter Regular - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interMedium }]}>
          Inter Medium - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interSemiBold }]}>
          Inter SemiBold - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interBold }]}>
          Inter Bold - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interExtraBold }]}>
          Inter ExtraBold - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.interBlack }]}>
          Inter Black - The quick brown fox jumps over the lazy dog
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Oswald Fonts</Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldExtraLight }]}>
          Oswald ExtraLight - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldLight }]}>
          Oswald Light - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldRegular }]}>
          Oswald Regular - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldMedium }]}>
          Oswald Medium - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldSemiBold }]}>
          Oswald SemiBold - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: FONTS.family.oswaldBold }]}>
          Oswald Bold - The quick brown fox jumps over the lazy dog
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Fonts (Fallback)</Text>
        
        <Text style={[styles.fontTest, { fontFamily: 'System' }]}>
          System Font - The quick brown fox jumps over the lazy dog
        </Text>
        
        <Text style={[styles.fontTest, { fontFamily: 'Arial' }]}>
          Arial - The quick brown fox jumps over the lazy dog
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.family.interSemiBold,
    color: COLORS.primaryAccent,
    marginBottom: SPACING.md,
  },
  fontTest: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
});
