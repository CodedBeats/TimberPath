import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputSubmitEditingEventData, NativeSyntheticEvent, SafeAreaView } from 'react-native';
import { ThemedView } from '../ThemedView';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    onSearch(query);
  };

  return (
    <SafeAreaView style={styles.searchContainer}>
      <ThemedView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#7C7C7D"
          value={query}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
        />
      </ThemedView>
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
