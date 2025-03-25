import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { addWood } from '@/services/woods';

export default function AddWood() {
  const router = useRouter();
  const [woodData, setWoodData] = useState({
    commonName: "",
    description: "",
    imageURL: "",
    origin: "",
    scientificName: "",
    sustainability: "",
    sustainabilityRating: "",
    // timber guide criteria
    application: "",
    bfr: "",
    exposure: "",
    hardness: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCriteriaChange = (key: string, value: string) => {
    const criteriaAsArray = value.split(",")
    setWoodData(prev => ({ ...prev, [key]: criteriaAsArray }));
  };

  const handleChange = (key: string, value: string) => {
    setWoodData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // since we are not going to have a lot of information maybe I added a basic validation: common name, scientific name, image and description are required.
    if (!woodData.commonName || !woodData.description || !woodData.imageURL || !woodData.application || !woodData.bfr || !woodData.exposure || !woodData.hardness) {
      Alert.alert("Validation Error", "Please fill in all required fields (Common Name, Description, Image URL, application, bfr, exposure, and hardness).");
      return;
    }
    setLoading(true);
    try {
      await addWood(woodData);
      Alert.alert("Success", "Wood added successfully!");
      setWoodData({
        commonName: "",
        description: "",
        imageURL: "",
        origin: "",
        scientificName: "",
        sustainability: "",
        sustainabilityRating: "",
        // timber guide criteria
        application: "",
        bfr: "",
        exposure: "",
        hardness: "",
      });
      router.back();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.header}>Add Wood</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Common Name"
          placeholderTextColor="#ccc"
          value={woodData.commonName}
          onChangeText={(text) => handleChange("commonName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#ccc"
          value={woodData.description}
          onChangeText={(text) => handleChange("description", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          placeholderTextColor="#ccc"
          value={woodData.imageURL}
          onChangeText={(text) => handleChange("imageURL", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Origin (optional)"
          placeholderTextColor="#ccc"
          value={woodData.origin}
          onChangeText={(text) => handleChange("origin", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Scientific Name (optional)"
          placeholderTextColor="#ccc"
          value={woodData.scientificName}
          onChangeText={(text) => handleChange("scientificName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sustainability (optional)"
          placeholderTextColor="#ccc"
          value={woodData.sustainability}
          onChangeText={(text) => handleChange("sustainability", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sustainability Rating (optional)"
          placeholderTextColor="#ccc"
          value={woodData.sustainabilityRating}
          onChangeText={(text) => handleChange("sustainabilityRating", text)}
        />
        {/* criteria */}
        <TextInput
          style={styles.input}
          // a1 = windows, a2 = doors, a3 = cladding, a4 = decking
          placeholder="Application (A1,A2,A3,A4)"
          placeholderTextColor="#ccc"
          value={woodData.application}
          onChangeText={(text) => handleCriteriaChange("application", text)}
        />
        <TextInput
          style={styles.input}
          // b1 = BAL-LOW, b2 = BAL-12.5, b3 = BAL-19, b4 = BAL-29, b5 = BAL-40, b6 = BAL-FZ
          placeholder="Bush Fire Resistance (B1,B2,B3,B4,B5,B6)"
          placeholderTextColor="#ccc"
          value={woodData.bfr}
          onChangeText={(text) => handleCriteriaChange("bfr", text)}
        />
        <TextInput
          style={styles.input}
          // e1 = in-ground, e2 = above ground exposed, e3 = above ground protected, e4 = internal
          placeholder="Exposure (E1,E2,E3,E4)"
          placeholderTextColor="#ccc"
          value={woodData.exposure}
          onChangeText={(text) => handleCriteriaChange("exposure", text)}
        />
        <TextInput
          style={styles.input}
          // h1 = important, h2 = not important
          placeholder="Hardness (H1,H2)"
          placeholderTextColor="#ccc"
          value={woodData.hardness}
          onChangeText={(text) => handleCriteriaChange("hardness", text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <ThemedText>{loading ? "Submitting..." : "Submit"}</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2A2A2E",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#9C3FE4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
