import { SafeAreaView, ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react';

// firebase
import { collection, getDocs } from "firebase/firestore"

// context
import { useAuth } from "@/contexts/AuthContext"
import { useDB } from "@/contexts/DBContext"

// components
import { HeaderWithCart } from "../../../components/header/SimpleHeader"
import { FilterBtn } from '@/components/btns/FilterBtn'
import ProductCard from '@/components/cards/ProductCard';


export default function Products() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: any[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      
        {/* header */}
        <HeaderWithCart />

        {/* products content */}
        <View style={styles.container}>
          <LinearGradient colors={["#520073", "#000"]} style={styles.largeBox}>
            <View style={styles.subBoxHeaderContainer}>
              <Text style={styles.subBoxHeaderText}>All Products</Text>
              <FilterBtn onPress={() => console.log("Filter")} />
            </View>
            <View style={styles.subBoxContent}>
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : products.length === 0 ? (
                <Text style={styles.noProducts}>No products found.</Text>
              ) : (
                // Render the products in a grid
                <View style={styles.productsGrid}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </View>
              )}
            </View>
          </LinearGradient>
            
          <TouchableOpacity style={styles.wideButton} onPress={() => router.push("/product/Product")}>
            <Text style={styles.wideButtonText}>Product Example</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


// styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerPlaceholder: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  largeBox: {
    borderRadius: 10,
    padding: 8,
    height: "100%",
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // android shadow
  },
  largeBox2: {
    backgroundColor: '#C56200',
  },
  subBoxHeaderContainer: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subBoxHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
  subBoxContent: {
    borderColor: "#222",
    borderWidth: 1,
    height: "80%",
  },
  buttonContainer: {
    width: 30,
  },
  wideButton: {
      backgroundColor: '#9C3FE4',
      padding: 12,
      borderRadius: 10,
      width: "70%",
  },
  wideButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  noProducts: {
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
