// dependencies
import React, { useRef, useState } from "react";
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
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { collection, addDoc } from "firebase/firestore";

// contexts
import { useCart } from "@/contexts/CartContext";
import { useDB } from "@/contexts/DBContext";
import { useAuth } from "@/contexts/AuthContext";

// config
import { BASE_URL } from "@/config/api";

// components
import ErrorMessage, { ErrorMessageRef } from "@/components/errors/ErrorMessage";



export default function Checkout() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const db = useDB();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingZip, setBillingZip] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  // error ref
  const errorRef = useRef<ErrorMessageRef>(null);

  // handle error
  const triggerError = (msg: string, options?: { color?: string; fontSize?: number }) => {
      errorRef.current?.show(msg, options);
  };

  // This function will calls our backend endpoint.
  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
      });
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      //console.error("Error fetching client secret:", error);
      
      // responsive
      triggerError(`Error fetching client secret: ${error}`, { color: "orange", fontSize: 16 });
      throw error;
    }
  };

  const handlePayNow = async () => {

    if (!billingName || !billingAddress || !billingCity || !billingZip) {
      Alert.alert("Billing Info Missing", "Please fill in all billing information fields.");
      triggerError(`Please fill in all billing information fields`, { color: "orange", fontSize: 16 });
      return;
    }
    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Please add items to your cart before checking out.");
      triggerError(`Please add items to your cart before checking out`, { color: "orange", fontSize: 16 });
      return;
    }
    if (!user) {
      Alert.alert("User Not Logged In", "You must be logged in to place an order.");
      triggerError(`You must be logged in to place an order`, { color: "orange", fontSize: 16 });
      return;
    }
    if (cardNumber !== "4242424242424242") {
      Alert.alert("This is not a valid card number", "Please enter a valid card number.");
      triggerError(`Please enter a valid card number`, { color: "orange", fontSize: 16 });
      return;
    }
    setLoading(true);
    try {
      // Call our backend to "create" a PaymentIntent.
      const clientSecret = await fetchPaymentIntentClientSecret();
      console.log("Received client secret:", clientSecret);
      setTimeout(() => {
        (async () => {
          const orderNumber = "ON-TBP" + Math.floor(Math.random() * 1000000);
          const orderDetails = {
            orderNumber,
            items: cart,
            total: totalPrice,
            billing: {
              name: billingName,
              address: billingAddress,
              city: billingCity,
              zip: billingZip,
            },
            userId: user.uid,
            timestamp: new Date().toISOString(),
          };

          try {
            await addDoc(collection(db, "orders"), orderDetails);
            //console.log("Order document created successfully.");
            // responsive
            triggerError(`Your order has been created`, { color: "green", fontSize: 16 });
            
          } catch (err) {
            //console.error("Error creating order document:", err);
            // responsive
            triggerError(`Error creating order document: ${err}`, { color: "red", fontSize: 16 });
          }

          clearCart();
          router.push({
            pathname: "./OrderSuccessful",
            params: { order: JSON.stringify(orderDetails) },
          });
        })();
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert("Payment Error", "There was an error processing your payment.");
      triggerError(`There was an error processing your payment`, { color: "orange", fontSize: 16 });
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
              value={cardNumber}
              onChangeText={setCardNumber}
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

          {/* Billing Information Fields */}
          <View style={styles.billingContainer}>
            <Text style={styles.sectionTitle}>Billing Information</Text>
            <TextInput
              style={styles.billingInput}
              placeholder="Billing Name"
              placeholderTextColor="gray"
              value={billingName}
              onChangeText={setBillingName}
            />
            <TextInput
              style={styles.billingInput}
              placeholder="Billing Address"
              placeholderTextColor="gray"
              value={billingAddress}
              onChangeText={setBillingAddress}
            />
            <TextInput
              style={styles.billingInput}
              placeholder="City"
              placeholderTextColor="gray"
              value={billingCity}
              onChangeText={setBillingCity}
            />
            <TextInput
              style={styles.billingInput}
              placeholder="ZIP Code"
              placeholderTextColor="gray"
              value={billingZip}
              onChangeText={setBillingZip}
              keyboardType="numeric"
            />
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
          
          {/* error message */}
          <ErrorMessage ref={errorRef} />
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
    ...Platform.select({
        ios: {
            marginBottom: 100,
        },
    }),
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
  billingContainer: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#222",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  billingInput: {
    backgroundColor: "#444",
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
});
