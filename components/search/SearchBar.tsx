import { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputSubmitEditingEventData, NativeSyntheticEvent, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemedView } from '../ThemedView';
import { useRouter, usePathname } from "expo-router";



export const SearchBar = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.searchContainer}>
      <TouchableOpacity onPress={() => router.push("/(search)/Search")}>
        <ThemedView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#7C7C7D"
          />
        </ThemedView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "70%", 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: "100%", 
    height: 35,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,

  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
});
