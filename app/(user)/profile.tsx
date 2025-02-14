import React, { useState, useEffect } from "react";
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  Image, 
  ActivityIndicator, 
  ScrollView 
} from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [jobPosition, setJobPosition] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No user logged in.");
          router.push("/SignIn");
          return;
        }
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setAddress(data.address || "");
          setCity(data.city || "");
          setCountry(data.country || "");
          setPostCode(data.postCode || "");
          setPhoneNumber(data.phoneNumber || "");
          setAboutYou(data.aboutYou || "");
          setJobPosition(data.jobPosition || "");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth, db, router]);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in.");
        return;
      }
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName,
          lastName,
          address,
          city,
          country,
          postCode,
          phoneNumber,
          aboutYou,
          jobPosition,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/TP-logo300.png")}
              style={styles.reactLogo}
            />
          }
        >
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Post Code"
        value={postCode}
        onChangeText={setPostCode}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="gray"
      />
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="About You"
        value={aboutYou}
        onChangeText={setAboutYou}
        multiline
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Job Position"
        value={jobPosition}
        onChangeText={setJobPosition}
        placeholderTextColor="gray"
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
      <View style={{ marginVertical: 8 }} />
      <Button title="Back" onPress={() => router.back()} />
    </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "gray",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
