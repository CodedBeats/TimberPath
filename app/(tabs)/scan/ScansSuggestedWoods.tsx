import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams  } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";


export default function ScansSuggestedWoods() {
  // get wood data from previous screen
  const router = useRouter()

  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
          {/* top sub header text */}
          <View style={styles.connectingHeaderContainer}>
            <Text style={styles.headerSubText}>The AI has identified the wood, based on its analysis here are the top possibilities with their confidence levels.</Text>
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
    connectingHeaderContainer: {
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: "#32003F",
    },
    headerSubText: {
        fontSize: 14,
        textAlign: "left",
        color: "#ccc",
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
