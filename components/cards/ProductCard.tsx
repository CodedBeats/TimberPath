import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../ThemedText';

const cardSize = 250; // Each card is 100x100

type ProductCardProps = {
  product: {
    id: string;
    productName: string;
    imageURL?: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleView = () => {
    router.push({
      pathname: "/(tabs)/product/Product",
      params: { productId: product.id },
    });
  };

  const handleAddToCart = () => {
    console.log("Add to Cart", product.id);
  };

  const truncateTitle = (title: string) =>
    title.length > 30 ? title.substring(0, 30) + "..." : title;

  return (
    <View style={styles.card}>
      {product.imageURL ? (
        <Image source={{ uri: product.imageURL }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <ThemedText style={styles.placeholderText}>No Image</ThemedText>
        </View>
      )}
      <ThemedText style={styles.title} numberOfLines={1}>
        {truncateTitle(product.productName)}
      </ThemedText>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleView}>
          <ThemedText style={styles.buttonText}>View</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddToCart}>
          <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      width: cardSize,
      height: cardSize,
      margin: 5,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: cardSize - 8,
      height: cardSize - 120, // Leaves room for title and buttons
      borderRadius: 4,
    },
    placeholder: {
      width: cardSize - 8,
      height: cardSize - 120,
      backgroundColor: '#ccc',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontSize: 12,
      color: '#333',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      width: '100%',
      textAlign: 'center',
      paddingVertical: 4,
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    button: {
      flex: 1,
      backgroundColor: '#9C3FE4',
      paddingVertical: 6,
      marginHorizontal: 2,
      borderRadius: 4,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#f17700',
    },
    buttonText: {
      fontSize: 12,
      color: '#fff',
    },
  });
  
  export default ProductCard;