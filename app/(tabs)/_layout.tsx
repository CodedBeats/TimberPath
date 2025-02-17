import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, TouchableOpacity, StyleSheet, Text, GestureResponderEvent } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // couldn't figure it out with useRouter (there was so much pain to had here -_-)
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme()

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
          tabBarButton: ({ onPress }) => {
            const isFocused = useIsFocused(); 
            console.log(isFocused)
            return <CustomScanButton focused={isFocused} onPress={onPress} />
          },
        }}
      />
      
      {/* timber guide page */}
      <Tabs.Screen
        name="TimberGuide"
        options={{
          title: 'Timber Guide',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
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


// custom scan nav btn with (needed for focus detection)
// (i'll move this at some point....or fix it lol)
const CustomScanButton = ({ focused, onPress }: { focused: boolean; onPress?: (event: GestureResponderEvent) => void }) => {
  console.log(focused)

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.scanButton} onPress={onPress}>
      <View style={[
        styles.scanIconContainer,
        // leaving this here  for style later
        focused ? { backgroundColor: 'grey' } : { backgroundColor: 'grey' }
      ]}>
        <IconSymbol 
          size={30} 
          name="camera.fill" 
          // leaving this here for style later
          color={focused ? 'white' : 'white'} 
        />
      </View>
      <Text style={[
        styles.scanText,
        focused ? { color: 'white' } : { color: '#7C7C7D' }
      ]}>
        Scan
      </Text>
    </TouchableOpacity>    
  )
}



// Styles for the custom Scan button
const styles = StyleSheet.create({
  scanButton: {
    position: 'absolute',
    bottom: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scanText: {
    color: "#7C7C7D",
    fontSize: 10,
    fontFamily: "Segoe UI",
    fontWeight: "bold",
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

