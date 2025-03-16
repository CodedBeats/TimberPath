import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";
import { useCart } from "@/contexts/CartContext";

const cardSize = 250; // Each card is 100x100

type ProductCardProps = {
    product: {
        id: string;
        productName: string;
        imageURL?: string;
        price: number;
        amount: string;
        description?: string; // Optional
    };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { addToCart } = useCart();

    const handleView = () => {
        router.push({
            pathname: "/(tabs)/product/Product",
            params: { productId: product.id, fromSearch: "true" },
        });
    };

    const handleAddToCart = () => {
        console.log("Add to Cart", product.id);
        addToCart(product);
    };

    const truncateTitle = (title: string) =>
        title.length > 30 ? title.substring(0, 30) + "..." : title;

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handleView}>
            <View style={styles.card}>
                {/* Image */}
                <View style={styles.imgContainer}>
                    {product.imageURL ? (
                        <Image source={{ uri: product.imageURL }} style={styles.img} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>No Image</Text>
                        </View>
                    )}
                </View>

                <View style={styles.textContentContainer}>
                    {/* Title */}
                    <Text style={styles.title} numberOfLines={1}>
                        {truncateTitle(product.productName)}
                    </Text>

                    {/* Amount */}
                    <Text style={styles.amount}>{product.amount ? product.amount : "no amount :("}</Text>

                    {/* Price & Add to Cart */}
                    <View style={styles.priceAndAddContainer}>
                            <Text style={styles.price}>$ {product.price}</Text>
                                <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={handleAddToCart}
                                >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: "45%",
        marginBottom: 20,
        ...Platform.select({
            ios: {
                maxHeight: 200,
            },
            android: {
                maxHeight: 200,
            },
        }),
    },
    card: {
        flexGrow: 1,
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 12,
    },
    textContentContainer: {
        padding: 4,
    },
    imgContainer: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    placeholder: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: "#888",
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        color: "#fff",
        marginTop: 8,
    },
    amount: {
        fontSize: 14,
        color: "#aaa",
        marginBottom: 8,
    },
    priceAndAddContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        ...Platform.select({
            ios: {
                maxHeight: 80,
            },
            android: {
                maxHeight: 80,
            },
        }),
    },
    price: {
        fontSize: 18,
        color: "#fff",
    },
    buttonContainer: {
        backgroundColor: "#ff8c00",
        paddingHorizontal: 6,
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 500,
        color: "#fff",
        textAlignVertical: "center",
        textAlign: "center",
    },
});

export default ProductCard;
