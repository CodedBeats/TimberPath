import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "@/contexts/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // This function calls our backend endpoint.
  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Multiply by 100 because Stripe expects the amount in cents.
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
      });
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    try {
      // Call our backend to "create" a PaymentIntent.
      const clientSecret = await fetchPaymentIntentClientSecret();
      console.log("Received client secret:", clientSecret);
      setTimeout(() => {
        const orderNumber = "ON-TBP" + Math.floor(Math.random() * 1000000);
        const orderDetails = { orderNumber, items: cart, total: totalPrice };

        clearCart();
        router.push({
          pathname: "./OrderSuccessful",
          params: { order: JSON.stringify(orderDetails) },
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert("Payment Error", "There was an error processing your payment.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView style={styles.checkoutContainer}>
          {/* Card Input Fields */}
          <View style={styles.checkoutCellContainer}>
            <Text style={styles.checkoutCellTitle}>Card Type</Text>
            <TextInput
              style={styles.checkoutCellInput}
              placeholder="Visa"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.checkoutCellContainer}>
            <Text style={styles.checkoutCellTitle}>Card Number</Text>
            <TextInput
              style={styles.checkoutCellInput}
              placeholder="4242 4242 4242 4242"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.checkoutCellContainer}>
            <Text style={styles.checkoutCellTitle}>Cardholder Name</Text>
            <TextInput
              style={styles.checkoutCellInput}
              placeholder="John Doe"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.cvvAndExpiryContainer}>
            <View style={styles.checkoutCellContainer2}>
              <Text style={styles.checkoutCellTitle}>Expiry Date</Text>
              <TextInput
                style={styles.checkoutCellInput}
                placeholder="05/2025"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.checkoutCellContainer2}>
              <Text style={styles.checkoutCellTitle}>CVV/CVC</Text>
              <TextInput
                style={styles.checkoutCellInput}
                placeholder="123"
                placeholderTextColor="gray"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.checkoutCellTitle}>Total</Text>
            <Text style={styles.checkoutCellTitle}>$ {totalPrice.toFixed(2)}</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TouchableOpacity onPress={handlePayNow}>
              <Text style={styles.payNowButton}>Pay Now</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
    flexGrow: 1,
    padding: 12,
  },
  checkoutContainer: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
  },
  checkoutCellContainer: {
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  checkoutCellContainer2: {
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: "45%",
  },
  checkoutCellTitle: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 2,
  },
  checkoutCellInput: {
    backgroundColor: "#444",
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
    fontSize: 14,
    color: "#fff",
  },
  cvvAndExpiryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  payNowButton: {
    backgroundColor: "#f17700",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
