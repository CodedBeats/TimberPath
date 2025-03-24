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
import { CartItem } from "@/contexts/CartContext";

interface CartItemCardProps {
    item: CartItem;
  }


  export function CartItemCard({ item }: CartItemCardProps) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageURL }} style={styles.image} />
        <View style={styles.infoContainer}>
          <ThemedText style={styles.productName}>{item.productName}</ThemedText>
          <ThemedText style={styles.amount}>Qty: {item.quantity}</ThemedText>
          <ThemedText style={styles.price}>$ {(item.price * item.quantity).toFixed(2)}</ThemedText>
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
        marginBottom: 12, // added this line (ARP)
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
