import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";

// components
import { ArticleCard } from '@/components/cards/ArticleCard';
import { ThemedText } from '../../../components/ThemedText';
import { HeaderWithoutCart } from '../../../components/header/SimpleHeader';
import { PrimaryBtn } from '@/components/btns/PrimaryBtn';

// services
import { getArticlesByCategory } from '../../../services/articles';


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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LinearGradient colors={["#520073", "#000"]} style={styles.articleCardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : articles.length === 0 ? (
            <ThemedText>No articles found in this category.</ThemedText>
          ) : (
              articles.map((article) => <ArticleCard key={article.id} article={article} />)
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: "#000",
  },
  scrollView: {
      padding: 16,
  },
  articleCardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    padding: 10,
    // marginBottom: 40,
    borderRadius: 12,
},
});
