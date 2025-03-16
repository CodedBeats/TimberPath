import { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputSubmitEditingEventData, NativeSyntheticEvent, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '../ThemedView';
import { useRouter, usePathname } from "expo-router";



export const SearchBar = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.searchContainer}>
      <TouchableOpacity onPress={() => router.push("/(search)/Search")}>
        <ThemedView style={styles.container}>
          <Text style={styles.input}>Search...</Text>
        </ThemedView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: { 
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: 35,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    color: '#7C7C7D',
  },
});
