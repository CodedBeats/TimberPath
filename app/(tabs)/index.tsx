import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, Button, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import firebaseApp from "@/config/Config";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [userEmail, setUserEmail] = useState("Guest");
  const envCode = process.env.EXPO_PUBLIC_TESTME;

  const onTestEnvPress = () => {
    console.log("EXPO_PUBLIC_TESTME:", envCode);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail("Guest");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onTestFirebasePress = async () => {
    try {
      const db = getDatabase(firebaseApp);
      const testRef = ref(db, "/");
      const snapshot = await get(testRef);

      if (snapshot.exists()) {
        console.log("Firebase connection successful. Data snapshot:", snapshot.val());
      } else {
        console.log("Firebase connected successfully, but no data was found at the root.");
      }
    } catch (error) {
      console.error("Error connecting to Firebase:", error);
    }
  };

  const onLogoutPress = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, {userEmail}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">
            app/index.tsx
          </ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter
          app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will
          move the current <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <Button onPress={onTestEnvPress} title="TEST ENV" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onTestFirebasePress} title="TEST FIREBASE" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("./SignUp")} title="Sign Up" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("./SignIn")} title="Sign In" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onLogoutPress} title="Log Out" />
      </View>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
