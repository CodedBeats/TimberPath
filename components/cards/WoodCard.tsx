import { useState } from "react";
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
const cardSize = 250; // Each card is 100x100

// services
import { getProductByWoodID } from "@/services/products";


type WoodCardProps = {
    wood: {
        id: string
        commonName: string
        imageURL?: string
    }
}

const WoodCard = ({ wood }: WoodCardProps) => {
    const router = useRouter()

    async function handleView() {
        // get productID by woodID
        try {
            const product = await getProductByWoodID(wood.id)
            
            if (product) {
                router.push({
                    pathname: "/(tabs)/product/Product",
                    params: { productId: product.id, fromSearch: "true" },
                });
            } else {
                console.warn("no product found for this woodID")
            }
        } catch (error) {
            console.error("error fetching:", error)
        }
    }


    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handleView}>
            <View style={styles.card}>
                {/* Image */}
                <View style={styles.imgContainer}>
                    {wood.imageURL ? (
                        <Image source={{ uri: wood.imageURL }} style={styles.img} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>No Image</Text>
                        </View>
                    )}
                </View>

                <View style={styles.textContentContainer}>
                    {/* Title */}
                    <Text style={styles.title} numberOfLines={1}>
                        {wood.commonName}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: "45%",
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
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "#111",
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
        paddingBottom: 5,
        paddingLeft: 5,
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
});

export default WoodCard;
