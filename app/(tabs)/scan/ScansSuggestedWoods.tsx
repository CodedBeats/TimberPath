import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams  } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'

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
      <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.connectingHeaderContainer}>
        <Text style={styles.headerSubText}>The AI has identified the wood, based on its analysis here are the top possibilities with their confidence levels.</Text>
      </LinearGradient>

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
        paddingBottom: 8,
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
        ...Platform.select({
            ios: {
                maxHeight: "60%",
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
});
