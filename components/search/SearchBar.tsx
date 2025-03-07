import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
});
