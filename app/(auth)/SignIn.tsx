import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image, ActivityIndicator } from "react-native";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";

WebBrowser.maybeCompleteAuthSession();


export default function SignIn() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nonce, setNonce] = useState("");

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

  const googleConfig = useMemo(() => ({
    responseType: "id_token token",
    usePKCE: false,
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_OAUTH_CREDENTIAL_ID,
    scopes: ["openid", "profile", "email"],
    extraParams: {
      code_challenge_method: "",
      nonce: nonce,
    },
  }), [nonce]);

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest(googleConfig);


  useEffect(() => {
    if (googleResponse?.type === "success") {
      const { id_token, access_token } = googleResponse.params;
      if (!id_token || !access_token) {
        Alert.alert("Error", "No ID token returned from Google.");
        return;
      }
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed in with Google!");
          router.push("/(tabs)");
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  }, [googleResponse]);

  

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
      <View style={{ marginVertical: 8 }} />
      <Button title="Sign In with Google" onPress={() => googlePromptAsync()} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
