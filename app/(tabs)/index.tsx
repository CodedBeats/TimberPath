import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, Button, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";


export default function Index() {
  const router = useRouter();
  const { user, userEmail, logout } = useAuth()

  // const envCode = process.env.EXPO_PUBLIC_TESTME;

  // contexts
  const db = useDB()

  // const onTestEnvPress = () => {
  //   console.log("EXPO_PUBLIC_TESTME:", envCode);
  // };

  // useEffect(() => {
    
  // }, []);

  
  // fix for firestore rather than realtime db (though this is just a testing func)
  // const onTestFirebasePress = async () => {
  //   try {
  //       // get collection
  //       const testCollectionRef = collection(db, "testColl")
  //       const snapshot = await getDocs(testCollectionRef)

  //       // show all docs 
  //       if (!snapshot.empty) {
  //           snapshot.forEach((doc) => console.log(`Doc ID: ${doc.id}`, doc.data()));
  //       } else {
  //           // no docs in collection
  //           console.log("Firestore connected successfully, but no documents found.");
  //       }
  //   } catch (error) {
  //       console.error("Error connecting to Firestore:", error);
  //   }
  // };


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
      {/* <View style={styles.buttonContainer}>
        <Button onPress={onTestEnvPress} title="TEST ENV" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onTestFirebasePress} title="TEST FIREBASE" />
      </View> */}
      {/* <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("./SignUp")} title="Sign Up" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("./SignIn")} title="Sign In" />
      </View> */}
      <View style={styles.buttonContainer}>
        <Button onPress={logout} title="Log Out" />
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
