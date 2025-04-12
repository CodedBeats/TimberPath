import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { addSupplier } from '@/services/suppliers';

export default function AddSupplier() {
  const router = useRouter();
  const [supplierData, setSupplierData] = useState({
    supplierName: "",
    supplierAddress: "",
    supplierDescription: "",
    contactPerson: "",
    phoneNumber: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSupplierData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!supplierData.supplierName || !supplierData.supplierAddress) {
      Alert.alert("Validation Error", "Supplier Name and Address are required.");
      return;
    }
    setLoading(true);
    try {
      await addSupplier(supplierData);
      Alert.alert("Success", "Supplier added successfully!");
      // Reset form
      setSupplierData({
        supplierName: "",
        supplierAddress: "",
        supplierDescription: "",
        contactPerson: "",
        phoneNumber: "",
        mobileNumber: "",
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
        <TextInput
          style={styles.input}
          placeholder="Supplier Name"
          placeholderTextColor="#ccc"
          value={supplierData.supplierName}
          onChangeText={(text) => handleChange("supplierName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Supplier Address"
          placeholderTextColor="#ccc"
          value={supplierData.supplierAddress}
          onChangeText={(text) => handleChange("supplierAddress", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Supplier Description"
          placeholderTextColor="#ccc"
          value={supplierData.supplierDescription}
          onChangeText={(text) => handleChange("supplierDescription", text)}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Person"
          placeholderTextColor="#ccc"
          value={supplierData.contactPerson}
          onChangeText={(text) => handleChange("contactPerson", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          value={supplierData.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#ccc"
          value={supplierData.mobileNumber}
          onChangeText={(text) => handleChange("mobileNumber", text)}
          keyboardType="phone-pad"
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
