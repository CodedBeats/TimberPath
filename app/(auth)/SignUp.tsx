import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image, ActivityIndicator, Text, SafeAreaView, ScrollView, Platform, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";

import * as Google from "expo-auth-session/providers/google";
import * as Crypto from "expo-crypto";
import { getFirestore, doc, setDoc } from "firebase/firestore";


export default function SignUp() {
  const auth = getAuth()
  const router = useRouter();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [jobPosition, setJobPosition] = useState("");

  const [nonce, setNonce] = useState("");

  // Generate a random nonce asynchronously -  this is an extra layer of security to prevent replay attacks
  useEffect(() => {
    (async () => {
      const randomValue = Math.random().toString();
      const generatedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        randomValue
      );
      setNonce(generatedNonce);
    })();
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        address,
        city,
        country,
        postCode,
        phoneNumber,
        aboutYou,
        jobPosition,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(user);
      Alert.alert(
        "Verification Email Sent",
        "A verification link has been sent to your email. Please verify your email before signing in.",
        [
          {
            text: "OK",
            onPress: async () => {
              await signOut(auth);
              router.push("/SignIn");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token token",
    usePKCE: false,
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_OAUTH_CREDENTIAL_ID,
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_OAUTH_CREDENTIAL_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_OAUTH_CREDENTIAL_ID,
    scopes: ["openid", "profile", "email"],
    extraParams: {
      code_challenge_method: "",
      nonce: nonce, // #######   Now we have a randomly generated NONCE and is ready when we need to move it to production    ########
    },
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      if (!id_token || !access_token) {
        Alert.alert("Error", "No ID token returned from Google.");
        return;
      }
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed up with Google account!");
          router.push("/(tabs)");
        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
          Alert.alert("Error ", error.message);
        });
    }
  }, [response]);

  

  return (
    <SafeAreaView style={styles.safeContainer}>
    <ScrollView style={styles.scrollContainer}>
      <Image
        source={require("@/assets/images/TP-logo300.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Sign Up to TimberPath!</ThemedText>
          <HelloWave />
      </ThemedView>
      <Text style={styles.inputInstrcutions2}>* indicates required field</Text>
      <TextInput
        style={styles.input}
        placeholder="Email *"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password *"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
      />
      <Text style={styles.inputInstrcutions}>Password must be at least 8 characters long, have an uppercase and lowecase letter, a number and special character.</Text>


      {/* Additional profile fields to test */}
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


      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 8 }} />
      <TouchableOpacity onPress={() => promptAsync()} style={[styles.button, styles.button2]}>
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#151619",
    height: "100%",
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
    ...Platform.select({
        ios: {
          marginBottom: 80,
        },
        android: {
          // paddingBottom: 200,
        },
    }),
  },
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#151619",
  },
  title: {
    color: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  inputInstrcutions: {
    textAlign: "center",
    color: "#d10000",
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 13,
  },
  inputInstrcutions2: {
    textAlign: "left",
    color: "#d10000",
    fontSize: 13,
    marginVertical: 10,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2197f2",
  },
  button2: {
    marginBottom: 40
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
