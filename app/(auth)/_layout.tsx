import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 80,
          },
          android: {
            height: 55,
            backgroundColor: "#121212",
          },
          default: {
            height: 55,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="SignIn"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SignUp"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-plus" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
