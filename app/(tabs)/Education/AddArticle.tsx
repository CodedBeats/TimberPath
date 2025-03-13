import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Button, ActivityIndicator, Alert, Image, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../../../components/ThemedText';
import { HeaderWithoutCart } from '../../../components/header/SimpleHeader';
import { addArticle } from '../../../services/articles';
import { uploadArticleImage } from '../../../services/storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getCategories } from '../../../services/categories';

export default function AddArticle() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    }
    fetchCategories();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let imageURL = null;
      if (imageUri) {
        imageURL = await uploadArticleImage(imageUri, `article_${Date.now()}`);
      }
      const articleData = {
        title,
        content,
        categoryId: selectedCategory,
        timestamp: new Date().toISOString(),
        trending: false,
        imageURL,
      };
      await addArticle(articleData);
      Alert.alert('Success', 'Article added successfully!');
      setTitle('');
      setContent('');
      setSelectedCategory(categories.length > 0 ? categories[0].id : 'Select Category');
      setImageUri(null);
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
        <ThemedText type="title">Add New Article</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#ccc"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Content"
          placeholderTextColor="#ccc"
          value={content}
          onChangeText={setContent}
          multiline
        />
        {/* Category Dropdown */}
        <View style={styles.pickerContainer}>
          <ThemedText style={styles.pickerLabel}>Select Category:</ThemedText>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            dropdownIconColor="#fff"
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
        </View>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <ThemedText>Pick an Image</ThemedText>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <ThemedText>Submit</ThemedText>
          </TouchableOpacity>
        )}
        {/* Back Button */}
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
  pickerContainer: {
    backgroundColor: '#2A2A2E',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pickerLabel: {
    color: '#fff',
    marginBottom: 4,
  },
  picker: {
    color: '#000',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#9C3FE4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 12,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});