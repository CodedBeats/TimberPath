import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getArticlesByCategory } from '../../../services/articles';
import { ArticleCard } from '../../ArticleCard';
import { ThemedText } from '../../ThemedText';
import { HeaderWithoutCart } from '../../header/SimpleHeader';

export default function ArticlesByCategory() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticlesByCategory(categoryId);
        setArticles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [categoryId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithoutCart />
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : articles.length === 0 ? (
          <ThemedText>No articles found in this category.</ThemedText>
        ) : (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        )}
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
});
