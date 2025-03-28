import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';

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

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.base64) {
        setImageUri(asset.uri);
        analyzeImage(asset.base64);
      } else {
        console.warn("Base64 encoding failed.");
      }
    }
  };

  const analyzeImage = async (base64Image: string | undefined) => {
    if (!base64Image) return;

    setLoading(true);
    try {
      const response = await fetch(
        Platform.OS === 'web'
          ? "http://localhost:3000/analyze-image"
          : "http://192.168.4.37:3000/analyze-image", // your local IP
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      const data = await response.json();
      setLabels(data.labels || []);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.topBox}>
        <Text style={styles.header}>Scan Wood</Text>
        <Text style={styles.subText}>Point your camera at the wood surface and hold steady for the AI to analyze and identify it.</Text>
      </LinearGradient>

      {/* scan */}
      <ScrollView contentContainerStyle={styles.scanContainer}>
        <PrimaryBtn text="Pick Image to Analyze" onPress={pickImage} fontSize={18} />
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200, marginTop: 16, borderRadius: 8 }} />
        )}
        {loading && <ActivityIndicator size="large" color="#9C3FE4" style={{ marginTop: 16 }} />}
        {labels.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#ccc', marginBottom: 8 }}>Top Predictions:</Text>
            {labels.map((label, index) => (
              <Text key={index} style={{ color: '#fff' }}>
                {label.description} ({(label.score * 100).toFixed(1)}%)
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
      
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
