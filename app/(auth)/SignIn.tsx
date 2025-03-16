import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image, ActivityIndicator, Text, ScrollView, TouchableOpacity  } from "react-native";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";
import { SafeAreaView } from "react-native-safe-area-context";

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
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_OAUTH_CREDENTIAL_ID,
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_OAUTH_CREDENTIAL_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_OAUTH_CREDENTIAL_ID,
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
    <SafeAreaView style={styles.safeContainer}>
    <ScrollView style={styles.scrollContainer}>
      <Image
        source={require("@/assets/images/TP-logo300.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Sign In to TimberPath!</ThemedText>
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
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.inputInstrcutions}>If you can't sign in, check your email for an account verification</Text>

      <View style={{ marginVertical: 8 }} />
      <TouchableOpacity style={styles.button} onPress={resetPassword}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>
      
      <View style={{ marginVertical: 8 }} />
      <TouchableOpacity style={styles.button} onPress={() => googlePromptAsync()}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
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
  },
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#151619",
  },
  title: {
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputInstrcutions: {
    textAlign: "center",
    color: "#d10000",
    fontSize: 13,
    marginVertical: 8,
    lineHeight: 13,
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
