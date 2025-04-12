import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Tabs, useRouter } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function AuthLayout() {

  return (
    <Tabs
      initialRouteName="AddWood"
      screenOptions={{
        headerShown: true,
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
        name="AddWood"
        options={{
          title: 'Add Wood',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Tabs.Screen
        name="AddCategory"
        options={{
          title: 'Add Category',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Tabs.Screen
        name="AddSupplier"
        options={{
          title: 'Add Supplier',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Tabs.Screen
        name="AddArticle"
        options={{
          title: 'Add Article',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Tabs.Screen
        name="AddProduct"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Tabs>
  );
}


function CustomBackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => { router.replace("/Profile") }}
      style={{ marginLeft: 10 }}
    >
      <Text style={{ 
        color: "#aaa", 
        fontSize: 18,
        marginLeft: 10,
      }}>&#x276E;</Text>
    </TouchableOpacity>
  );
}
