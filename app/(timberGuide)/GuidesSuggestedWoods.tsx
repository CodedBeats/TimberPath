import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams  } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";


export default function GuidesSuggestedWoods() {
  // get wood data from timber guide screen
  const router = useRouter()
  const params = useLocalSearchParams()
  // convert back to before it was passed as param
  const woodData = params.data ? JSON.parse(params.data as string) : null
  console.log(woodData.woodType, woodData.age)

  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* top sub header text */}
      <View style={styles.connectingHeaderContainer}>
        <Text style={styles.headerSubText}>Here are some wood suggestions based on your requirements.</Text>
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
        backgroundColor: "#000",
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
