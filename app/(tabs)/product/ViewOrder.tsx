import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";

interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  amount: string;
  imageURL?: string;
}

interface OrderDetails {
  orderNumber: string;
  items: OrderItem[];
  total: number;
}

export default function ViewOrder() {
  const router = useRouter();
  const params = useLocalSearchParams<{ order: string }>();

  // Parse the order details from the URL parameters
  let order: OrderDetails;
  try {
    order = JSON.parse(params.order);
  } catch (e) {
    order = { orderNumber: "N/A", items: [], total: 0 };
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={["#32003F", "#4C007A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.headerText}>
            Order Details
          </ThemedText>
        </LinearGradient>
        <ThemedText style={styles.orderNumber}>
          Order Number: {order.orderNumber}
        </ThemedText>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <ThemedText style={[styles.tableHeader, { flex: 1 }]}>
              Qty
            </ThemedText>
            <ThemedText style={[styles.tableHeader, { flex: 3 }]}>
              Product
            </ThemedText>
            <ThemedText style={[styles.tableHeader, { flex: 2 }]}>
              Unit Price
            </ThemedText>
            <ThemedText style={[styles.tableHeader, { flex: 2 }]}>
              Total
            </ThemedText>
          </View>
          {order.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <ThemedText style={[styles.tableCell, { flex: 1 }]}>
                {item.quantity}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { flex: 3 }]}>
                {item.productName}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { flex: 2 }]}>
                ${item.price.toFixed(2)}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { flex: 2 }]}>
                ${(item.price * item.quantity).toFixed(2)}
              </ThemedText>
            </View>
          ))}
          <View style={[styles.tableRow, styles.totalRow]}>
            <ThemedText style={[styles.tableCell, { flex: 6, fontWeight: "bold" }]}>
              Total Amount
            </ThemedText>
            <ThemedText style={[styles.tableCell, { flex: 2, fontWeight: "bold" }]}>
              ${order.total.toFixed(2)}
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("./Products")}
        >
          <ThemedText style={styles.buttonText}>Back to Products</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: { padding: 16 },
  header: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  orderNumber: { color: "#fff", fontSize: 18, marginBottom: 20, textAlign: "center" },
  table: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  tableHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  totalRow: {
    backgroundColor: "#333",
    borderTopWidth: 2,
    borderColor: "#555",
  },
  button: {
    backgroundColor: "#f17700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
