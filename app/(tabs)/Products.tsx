import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader"


export default function Products() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      
        {/* header */}
        <HeaderWithCart />

        {/* products content */}
        <View style={styles.container}>
          {/* producrs */}
          <View style={[styles.largeBox, styles.largeBox1]}>
            <View style={styles.subBoxHeaderContainer}>
              <Text style={styles.subBoxHeaderText}>All Products</Text>
              <View style={styles.buttonContainer}>
              <Button title="F" />
            </View>
            </View>
            <View style={styles.subBoxContent}>
              <Text>dynamically rendered products here</Text>
            </View>
          </View>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // android shadow
  },
  largeBox1: {
    backgroundColor: '#520073',
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
    height: 100,
  },
  buttonContainer: {
    width: 30,
  },
});
