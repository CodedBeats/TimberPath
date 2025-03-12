import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SearchBar } from "@/components/search/SearchBar";
import { ArticleCard } from "@/components/cards/ArticleCard";
import ProductCard from "@/components/cards/ProductCard";

import { getArticles } from "@/services/articles";
import { getProducts } from "@/services/products";

export default function Search() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q || "");
  const [articles, setArticles] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesData, productsData] = await Promise.all([
          getArticles(),
          getProducts(),
        ]);
        setArticles(articlesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar placeholder="Search..." onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Articles Section */}
          {filteredArticles.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionDivider} />
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Articles</Text>
                </View>
                <View style={styles.sectionDivider} />
              </View>
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} marginBottom={10} />
              ))}
            </View>
          )}

          {/* Products Section */}
          {filteredProducts.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionDivider} />
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Products</Text>
                </View>
                <View style={styles.sectionDivider} />
              </View>
              <View style={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </View>
            </View>
          )}
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
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  sectionTitleContainer: {
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
