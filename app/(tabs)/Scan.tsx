import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";


export default function Scan() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <View style={styles.topBox}>
        <Text style={styles.header}>Scan Wood</Text>
        <Text style={styles.subText}>Point your camera at the wood surface and hold steady for the AI to analyze and identify it</Text>
      </View>

      {/* scan */}
      <View style={styles.scanContainer}>

      </View>
      
    </SafeAreaView>
  )
};


// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBox: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 5,
        padding: 16,
        backgroundColor: '#32003F',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#fff',
    },
    subText: {
        fontSize: 14,
        textAlign: 'left',
        color: '#ccc',
    },
    scanContainer: {
        flex: 1,
        padding: 10,
        marginHorizontal: 16,
        marginBottom: 25,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
    },
});
