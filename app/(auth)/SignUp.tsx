import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";


export default function SignUp() {
  const auth = getAuth()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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
    // expoClientId: process.env.EXPO_PUBLIC_FIREBASE_OAUTH_CREDENTIAL_ID,
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_OAUTH_CREDENTIAL_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed up with Google account!");
          router.push("/(tabs)");
        })
        .catch((error) => Alert.alert("Error", error.message));
    }
  }, [response]);

  

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
            <ThemedText type="title">Sign Up to TimberPath!</ThemedText>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={{ marginVertical: 8 }} />
      <Button
        title="Sign Up with Google"
        onPress={() => {
          promptAsync();
        }} />
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
