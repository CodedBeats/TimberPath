import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    content: string;
    imageURL?: string;
    timestamp: string;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: './Education/ArticleDetail',
      params: { articleId: article.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {article.imageURL ? (
        <Image source={{ uri: article.imageURL }} style={styles.image} />
      ) : null}
      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {article.title}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.excerpt}>
          {article.content}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2E',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 14,
    color: '#ccc',
  },
});
