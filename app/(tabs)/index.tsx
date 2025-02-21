import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader"


export default function Index() {
  const router = useRouter();

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>

        {/* header */}
        <HeaderWithCart />

        {/* home/dashboard content */}
        <View style={styles.container}>
          {/* producrs */}
          <LinearGradient colors={["#180121", "#520073"]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.largeBox, styles.largeBox1]}>
            <View style={styles.subBoxHeaderContainer}>
              <Text style={styles.subBoxHeaderText}>Featured Products</Text>
            </View>
            <View style={styles.subBoxContent}>
              <Text>dynamically rendered products here</Text>
            </View>
          </LinearGradient>

          {/* product categories */}
          <LinearGradient colors={["#5c1f03", "#e87809"]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.largeBox, styles.largeBox2]}>
            <View style={styles.subBoxHeaderContainer}>
              <Text style={styles.subBoxHeaderText}>Shop by Category</Text>
            </View>
            <View style={styles.subBoxContent}>
              <Text>dynamically rendered categories here</Text>
            </View>
          </LinearGradient>

          {/* education */}
          <LinearGradient colors={["#180121", "#520073"]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.largeBox, styles.largeBox1]}>
            <View style={styles.subBoxHeaderContainer}>
              <Text style={styles.subBoxHeaderText}>New Articles</Text>
            </View>
            <View style={styles.subBoxContent}>
              <Text>dynamically rendered articles here</Text>
            </View>
          </LinearGradient>
        </View>

        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push("/(admin)/AddProduct")}>
          <Text style={styles.btnText}>Add Product</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  largeBox1: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3, // android shadow
    shadowColor: '#520073',
  },
  largeBox2: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3, // android shadow
    shadowColor: '#C56200',
  },
  subBoxHeaderContainer: {
    marginBottom: 8,
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
    height: 100,
  },
  buttonContainer: {
    marginHorizontal: "20%",
    backgroundColor: '#5588cc',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
