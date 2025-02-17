import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      {/* home page */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* prducts page */}
      <Tabs.Screen
        name="Products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tag.fill" color={color} />,
        }}
      />
      
      {/* scan page */}
      <Tabs.Screen
        name="Scan"
        options={{
          title: 'Scan',
          tabBarButton: ({ onPress }) => (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.scanButton}>
              <View style={styles.scanIconContainer}>
                <IconSymbol size={30} name="camera.fill" color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      
      {/* timber guide page */}
      <Tabs.Screen
        name="TimberGuide"
        options={{
          title: 'Timber Guide',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tree.fill" color={color} />,
        }}
      />
      
      {/* education page */}
      <Tabs.Screen
        name="Education"
        options={{
          title: 'Education',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}


// Styles for the custom Scan button
const styles = StyleSheet.create({
  scanButton: {
    position: 'absolute',
    bottom: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scanIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    borderColor: "black",
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
