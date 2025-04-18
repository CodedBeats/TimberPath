import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from "@/config/api";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { PrimaryBtn } from "@/components/btns/PrimaryBtn"
import { HeaderWithCart } from "../../../components/header/SimpleHeader"

type Label = {
  description: string;
  score: number;
};

const labelToWoodMapping: { [key: string]: string } = {
  "Wood": "Blackbutt",
  "Flooring": "Mountain Ash",
  "Hardwood": "Merbau",
  "Plank": "Ironbark",
  "Wood flooring": "Spotted Gum",
  "Plywood": "Jarrah",
  "Wood stain": "Tallowwood",
  "Lumber": "Cypress Pine",
  "Natural material": "Hoop Pine",
  "Laminate flooring": "Tasmanian Oak",
};

function getRecommendedWood(labels: Label[]): string {
  const threshold = 0.8;
  const matchingRecommendations = labels
  .filter(label => label.score >= threshold && labelToWoodMapping[label.description])
  .map(label => labelToWoodMapping[label.description]);

  if (matchingRecommendations.length === 0) {
    return "No recommendation available";
  }
  const randomIndex = Math.floor(Math.random() * matchingRecommendations.length);
  return matchingRecommendations[randomIndex];
  }


export default function Scan() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // contexts
  const db = useDB()

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [recommendedWood, setRecommendedWood] = useState<string>("");

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
        alert("Base64 encoding failed. Please try again.");
      }
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
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
        alert("Base64 encoding failed. Please try again.");
      }
    }
  };

  const analyzeImage = async (base64Image: string | undefined) => {
    if (!base64Image) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/analyze-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      const detectedLabels: Label[] = data.labels || [];
      setLabels(detectedLabels);
      const recommendation = getRecommendedWood(detectedLabels);
      setRecommendedWood(recommendation);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <HeaderWithCart />
      <ScrollView style={styles.safeArea}>
        <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.topBox}>
          <Text style={styles.header}>Scan Wood</Text>
          <Text style={styles.subText}>Take or choose a photo for the AI to analyze and identify it.</Text>
        </LinearGradient>

        {/* scan */}
        <ScrollView contentContainerStyle={[styles.scanContainer, { flexGrow: 1 }]}>
        
          {imageUri && (
            <Image 
              source={{ uri: imageUri }} 
              style={{ width: '100%', height: 200, marginTop: 16, borderRadius: 8 }} 
            />
          )}
          {loading && (
            <ActivityIndicator 
              size="large" 
              color="#9C3FE4" 
              style={{ marginTop: 16 }} 
            />
          )}

          {/* Display the recommended wood based on the analysis */}
          {recommendedWood && recommendedWood !== "No recommendation available" && (
            <View style={styles.recommendationContainer}>
              <Text style={styles.recommendationTitle}>Recommended Wood:</Text>
              <Text style={styles.recommendationText}>{recommendedWood}</Text>
              <PrimaryBtn 
                text="View Recommendation" 
                onPress={() =>
                  router.push({
                    pathname: './recommended',
                    params: { wood: recommendedWood }
                  })
                }
                fontSize={18} 
              />
            </View>

          )}
        </ScrollView>
        
        {/* <View style={styles.btnContainer}>
          <PrimaryBtn text="Analyze" onPress={() => router.push("/(tabs)/scan/ScansSuggestedWoods")} fontSize={18} />
        </View> */}

        <View style={styles.btnContainer}>
          <View style={styles.buttonRow}>
            {/* Button to pick an image from the gallery */}
            <PrimaryBtn 
              text="Pick Image to Analyze" 
              onPress={pickImage} 
              fontSize={18} 
            />
            {/* Button to take a photo using the camera */}
            <PrimaryBtn 
              text="Take Photo to Analyze" 
              onPress={takePhoto} 
              fontSize={18} 
            />
          </View>
        </View>
      </ScrollView>
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
        textAlign: 'center',
        color: '#ccc',
    },
    

    scanContainer: {
      padding: 10,
      marginHorizontal: 16,
      marginVertical: 5,
      minHeight: 200,
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 10,
      alignItems: "center",
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

  recommendationContainer: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#222",
    alignItems: "center",
    width: "80%",
  },
  recommendationTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recommendationText: {
    color: "#ccc",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
});
