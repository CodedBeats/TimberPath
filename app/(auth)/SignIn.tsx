import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";

import ParallaxScrollView from "@/components/ParallaxScrollView";


export default function SignIn() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before signing in. You have to check your inbox for the verification link."
        );
        await signOut(auth);
        return;
      }
      Alert.alert("Success", "You have signed in successfully!");
      router.push("/(tabs)");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset Email Sent", "A password reset email has been sent to your email.");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
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
    <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Sign In to TimberPath!</ThemedText>
            <HelloWave />
        </ThemedView>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ marginVertical: 8 }} />
      <Button title="Forgot Password" onPress={resetPassword} />
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
