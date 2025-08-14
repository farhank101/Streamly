/**
 * Tabs Layout
 * Sets up the bottom tab navigation for the main app screens
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import MiniPlayer from '../../components/player/MiniPlayer';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            height: 60,
            paddingBottom: 5,
            marginBottom: SIZES.miniPlayerHeight, // Account for mini player
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'InterRegular',
          },
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontFamily: 'InterBold',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      
      {/* Mini Player at the bottom of the screen */}
      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});