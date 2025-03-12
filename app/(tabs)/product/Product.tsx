import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/Config';
import { ThemedText } from '@/components/ThemedText';

export default function Product() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    console.log("Add to Cart", product.id);
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Product not found.</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Image */}
        {product.imageURL && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.imageURL }} style={styles.image} />
          </View>
        )}
        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.productName}>{product.productName}</ThemedText>
          <ThemedText style={styles.description}>{product.description}</ThemedText>
          <ThemedText style={styles.price}>Price: ${product.price}</ThemedText>
          <ThemedText style={styles.stock}>In Stock: {product.stockQuantity}</ThemedText>
          <ThemedText style={styles.stock}>Supplied By: {product.supplierName}</ThemedText>

          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddToCart}>
            <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  imageContainer: {
    height: 350,  // original was 200
    marginBottom: 16,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#CCC",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fab700",
    marginBottom: 4,
  },
  stock: {
    fontSize: 16,
    color: "#fff",
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

