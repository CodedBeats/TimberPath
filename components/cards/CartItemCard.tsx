import { useState } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";


interface CartItemCardProps {}


export function CartItemCard() {
    // hard coded for now
    const [cartItem] = useState({
        imageURL: "https://pacificdragons.com.au//app/uploads/apply_varnish.jpeg",
        productName: "Exterior Timber Varnish",
        amount: "500ml",
        price: "$15.50",
        stockQuantity: 5,
        quantity: 1,
    });

    return (
        <View style={styles.card}>
            {/* Left: Product Image */}
            <Image source={{ uri: cartItem.imageURL }} style={styles.image} />

            {/* Middle: Product Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{cartItem.productName}</Text>
                <Text style={styles.amount}>{cartItem.amount}</Text>
                <Text style={styles.price}>{cartItem.price}</Text>
            </View>

            {/* Right: Quantity Controls */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{cartItem.quantity}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222",
        borderRadius: 10,
        // padding: 12,
        width: "100%",
    },
    image: {
        width: "30%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    amount: {
        fontSize: 14,
        color: "#aaa",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 8,
    },
    quantityContainer: {
        padding: 8,
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: "#444",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 16,
        color: "#fff",
        marginVertical: 4,
    },
});
