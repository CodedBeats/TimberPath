import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    iconURL?: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: './ArticlesByCategory',
      params: { categoryId: category.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {category.iconURL ? (
        <Image source={{ uri: category.iconURL }} style={styles.icon} />
      ) : null}
      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {category.name}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.description}>
          {category.description}
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
    padding: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
  },
});
