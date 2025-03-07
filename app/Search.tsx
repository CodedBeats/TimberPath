import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SearchBar } from "@/components/search/SearchBar";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { getArticles } from "@/services/articles";

export default function Search() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q || "");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar placeholder="Search articles..." onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 16,
  },
});
