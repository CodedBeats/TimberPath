import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, View, Button, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/Config';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/services/products";

export default function Product() {
    const { productId, fromSearch } = useLocalSearchParams<{ productId: string, fromSearch: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        console.log("Add to Cart", product.id);
        addToCart(product);
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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Product Image */}
                {product.imageURL && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.imageURL }} style={styles.image} />
                </View>
                )}

                {/* Product Details */}
                <LinearGradient colors={["#410051", "#000"]} style={styles.detailsContainer}>
                    <ThemedText style={styles.productName}>{product.productName}</ThemedText>
                    <ThemedText style={styles.productAmount}>{product.unitOfMeasure}</ThemedText>                    
                    <ThemedText style={styles.productDescriptionName}>Description</ThemedText>
                    <ScrollView style={styles.descriptionScroll}>
                        <ThemedText style={styles.productDescription}>{product.description}</ThemedText>
                    </ScrollView>
                </LinearGradient>

                {/* Supplier and Stock */}
                <View style={styles.stockContainer}>
                    <ThemedText style={styles.stockText}>
                        <ThemedText style={styles.stockLabel}>In Stock: </ThemedText>
                        {product.stockQuantity}
                    </ThemedText>
                    <ThemedText style={styles.stockText}>
                        <ThemedText style={styles.stockLabel}>Supplied By: </ThemedText>
                        {product.supplierName}
                    </ThemedText>
                </View>

                {/* Price & Add to Cart */}
                <View style={styles.priceBuyContainer}>
                <View style={styles.priceContainer}>
                    <ThemedText style={styles.priceLabel}>Price</ThemedText>
                    <ThemedText style={styles.price}>$ {formatPrice(product.price)}</ThemedText>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <ThemedText style={styles.addToCartText}>Add to Cart +</ThemedText>
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
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
        paddingTop: 16,
        ...Platform.select({
            ios: {
                marginTop: 30,
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    imageContainer: {
        // width: "100%",
        height: 200,
        marginHorizontal: 16,
        overflow: "hidden",
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    detailsContainer: {
        flex: 1,
        marginHorizontal: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        elevation: 2,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 4,
    },
    productAmount: {
        fontSize: 16,
        color: "#B0B0B0",
        marginBottom: 12,
    },
    productDescriptionName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 8,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#555",
    },
    productDescription: {
        fontSize: 14,
        color: "#D0D0D0",
        marginTop: 4,
        lineHeight: 20,
        overflow: "hidden",
    },
    descriptionScroll: {
        height: 100,
        marginTop: 6,
    },
    // stock and supplier
    stockContainer: {
        backgroundColor: "#111",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    stockText: {
        fontSize: 14,
        color: "#CCC",
        marginBottom: 4,
    },
    stockLabel: {
        fontWeight: 500,
        color: "#FFF",
        fontSize: 14,
    },
    // price and add to cart
    priceBuyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingTop: 0,
        marginBottom: 25,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 16,
        color: "#A0A0A0",
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fab700",
    },
    addToCartButton: {
        backgroundColor: "#f17700",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
    },
    addToCartText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

