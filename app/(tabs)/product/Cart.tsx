import { useRouter } from "expo-router"
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

// components
import { CartItemCard } from "@/components/cards/CartItemCard"


const Cart = () => {
    const router = useRouter()
  
    return (
        <SafeAreaView style={styles.container}>
            {/* Product Details */}
            <LinearGradient colors={["#410051", "#000"]} style={styles.cartItemsContainer}>
                <ScrollView style={styles.cartItems}>
                    <CartItemCard />
                </ScrollView>
            </LinearGradient>

            {/* Price & Add to Cart */}
            <View style={styles.priceBuyContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.price}>$15.50</Text>
                </View>

                <TouchableOpacity style={styles.buyBtn} onPress={() => router.push("/(tabs)/product/Checkout")}>
                    <Text style={styles.addToCartText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    imageContainer: {
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
    cartItemsContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        elevation: 2,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                marginTop: 20,
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    cartItems: {

    },
    // price and buy btn
    priceBuyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingTop: 0,
        marginBottom: 25,
        ...Platform.select({
            ios: {
                marginBottom: 80,
            },
            android: {
                // maxHeight: 80,
            },
        }),
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
    buyBtn: {
        backgroundColor: "#f17700",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
    },
    addToCartText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Cart
