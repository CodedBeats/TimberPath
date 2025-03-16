import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { PrimaryBtn } from "@/components/btns/PrimaryBtn"


export default function Scan() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.topBox}>
        <Text style={styles.header}>Scan Wood</Text>
        <Text style={styles.subText}>Point your camera at the wood surface and hold steady for the AI to analyze and identify it.</Text>
      </LinearGradient>

      {/* scan */}
      <View style={styles.scanContainer}>

      </View>
      
      <View style={styles.btnContainer}>
        <PrimaryBtn text="Analyze" onPress={() => router.push("/(tabs)/scan/ScansSuggestedWoods")} fontSize={18} />
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
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        fontSize: 30,
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
        marginVertical: 5,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                maxHeight: "60%",
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    btnContainer: {
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#32003F',
      marginHorizontal: 16,
      marginBottom: 16,
      padding: 12,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: "#000",
      borderTopWidth: 2,
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
});
