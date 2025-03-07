import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Image, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

// services
import { getArticleById } from '../../../services/articles';

// components
import { ThemedText } from '../../../components/ThemedText';


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
      <ScrollView contentContainerStyle={styles.container}>
        {article.imageURL && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: article.imageURL }} style={styles.image} />
            <View style={styles.overlay} />
          </View>
        )}
        
        <ThemedText type="title" style={styles.title}>
          {article.title}
        </ThemedText>

        <ThemedText style={styles.content}>
          {article.content}
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    // auto adujust the height to the width
    height: width * 0.6,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: "#ddd",
    textAlign: "justify",
  },
});
