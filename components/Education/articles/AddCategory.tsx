import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Button, ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../../ThemedText';
import { HeaderWithoutCart } from '../../header/SimpleHeader';
import { addCategory } from '../../../services/categories';

export default function AddCategory() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconURL, setIconURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert("Validation Error", "Category name is required.");
      return;
    }
    setLoading(true);
    try {
      const categoryData = {
        name,
        description,
        iconURL,
      };
      await addCategory(categoryData);
      Alert.alert('Success', 'Category added successfully!');
      // Reset form fields after successfully adding the category
      setName('');
      setDescription('');
      setIconURL('');
    } catch (error) {
      Alert.alert('Error', (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithoutCart />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Add New Category</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          placeholderTextColor="#ccc"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Icon URL (optional)"
          placeholderTextColor="#ccc"
          value={iconURL}
          onChangeText={setIconURL}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      <ThemedText>Submit</ThemedText>
                    </TouchableOpacity>
        )}
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ThemedText>Back</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#2A2A2E',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9C3FE4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
});
