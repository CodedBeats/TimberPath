import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getArticleById } from '../../../services/articles';
import { ThemedText } from '../../../components/ThemedText';
import { HeaderWithoutCart } from '../../../components/header/SimpleHeader';

export default function ArticleDetail() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (!article) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Article not found.</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithoutCart />
      <ScrollView contentContainerStyle={styles.container}>
        {article.imageURL && (
          <Image source={{ uri: article.imageURL }} style={styles.image} />
        )}
        <ThemedText type="title" style={styles.title}>{article.title}</ThemedText>
        <ThemedText style={styles.content}>{article.content}</ThemedText>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ccc',
  },
});
