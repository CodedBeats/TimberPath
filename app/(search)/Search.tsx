import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

// components
import { SearchBar } from "@/components/search/SearchBar";
import { ArticleCard } from "@/components/cards/ArticleCard";
import ProductCard from "@/components/cards/ProductCard";

// services
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for articles or products..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Articles Section */}
            {filteredArticles.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Articles" />
                <View style={styles.articlesGrid}>
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} marginBottom={10} />
                  ))}
                </View>
              </View>
            )}

            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Products" />
                <View style={styles.productsGrid}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionDivider} />
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionDivider} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 16,
  },
  /* search input */
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: "#222",
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  /* section header */
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
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  /* articles grid */
  articlesGrid: {
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  /* product grid */
  productsGrid: {
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: "4%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
});
