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
    scientificName: "",
    imageURL: "",
    hardness: "",
    density: "",
    texture: "",
    porosity: "",
    durability: "",
    workability: "",
    stability: "",
    commonUses: "",
    specificApplications: "",
    origin: "",
    treeType: "",
    sustainability: "",
    sustainabilityRating: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setWoodData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // since we are not going to have a lot of information maybe I added a basic validation: common name, scientific name, image and description are required.
    if (!woodData.commonName || !woodData.scientificName || !woodData.imageURL || !woodData.description) {
      Alert.alert("Validation Error", "Please fill in all required fields (Common Name, Scientific Name, Image URL, and Description).");
      return;
    }
    setLoading(true);
    try {
      await addWood(woodData);
      Alert.alert("Success", "Wood added successfully!");
      setWoodData({
        commonName: "",
        scientificName: "",
        imageURL: "",
        hardness: "",
        density: "",
        texture: "",
        porosity: "",
        durability: "",
        workability: "",
        stability: "",
        commonUses: "",
        specificApplications: "",
        origin: "",
        treeType: "",
        sustainability: "",
        sustainabilityRating: "",
        description: "",
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
          placeholder="Scientific Name"
          placeholderTextColor="#ccc"
          value={woodData.scientificName}
          onChangeText={(text) => handleChange("scientificName", text)}
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
          placeholder="Hardness (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.hardness}
          onChangeText={(text) => handleChange("hardness", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Density (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.density}
          onChangeText={(text) => handleChange("density", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Texture (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.texture}
          onChangeText={(text) => handleChange("texture", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Porosity (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.porosity}
          onChangeText={(text) => handleChange("porosity", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Durability (Natural Decay Resistance) (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.durability}
          onChangeText={(text) => handleChange("durability", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Workability (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.workability}
          onChangeText={(text) => handleChange("workability", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stability (Optional)"
          placeholderTextColor="#ccc"
          value={woodData.stability}
          onChangeText={(text) => handleChange("stability", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Common Uses"
          placeholderTextColor="#ccc"
          value={woodData.commonUses}
          onChangeText={(text) => handleChange("commonUses", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Specific Applications"
          placeholderTextColor="#ccc"
          value={woodData.specificApplications}
          onChangeText={(text) => handleChange("specificApplications", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Origin (Geographic Region)"
          placeholderTextColor="#ccc"
          value={woodData.origin}
          onChangeText={(text) => handleChange("origin", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tree Type"
          placeholderTextColor="#ccc"
          value={woodData.treeType}
          onChangeText={(text) => handleChange("treeType", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sustainability"
          placeholderTextColor="#ccc"
          value={woodData.sustainability}
          onChangeText={(text) => handleChange("sustainability", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sustainability Rating"
          placeholderTextColor="#ccc"
          value={woodData.sustainabilityRating}
          onChangeText={(text) => handleChange("sustainabilityRating", text)}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          placeholderTextColor="#ccc"
          value={woodData.description}
          onChangeText={(text) => handleChange("description", text)}
          multiline
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
