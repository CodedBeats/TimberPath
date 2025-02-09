import { Image, StyleSheet, Platform, View } from "react-native";
import { Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// import Firebase from the Firebase module folder
import firebaseApp from "@/config/Config";
import { getDatabase, ref, get } from "firebase/database";


export default function HomeScreen() {
    const envCode = process.env.EXPO_PUBLIC_TESTME;
    let onPress = () => {
        console.log(envCode)
    }

    // const onTestFirebasePress = () => {
    //     console.log("Firebase App:", firebaseApp);
    //   };

    // const onTestFirebasePress = async () => {
    //     try {
    //       // Initialize the Realtime Database instance
    //       const db = getDatabase(firebaseApp);
    //       // Create a reference to the root
    //       const testRef = ref(db, "/");
    //       // Attempt to read the data at the root
    //       const snapshot = await get(testRef);
          
    //       if (snapshot.exists()) {
    //         console.log("Firebase connection successful. Data snapshot:", snapshot.val());
    //       } else {
    //         console.log("Firebase connected successfully, but no data was found at the root.");
    //       }
    //     } catch (error) {
    //       console.error("Error connecting to Firebase:", error);
    //     }
    //   };

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
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit{" "}
                    <ThemedText type="defaultSemiBold">
                        app/(tabs)/index.tsx
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
                    Tap the Explore tab to learn more about what's included in
                    this starter app.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">
                    Step 3: Get a fresh start
                </ThemedText>
                <ThemedText>
                    When you're ready, run{" "}
                    <ThemedText type="defaultSemiBold">
                        npm run reset-project
                    </ThemedText>{" "}
                    to get a fresh{" "}
                    <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
                    directory. This will move the current{" "}
                    <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>
            <Button onPress={onPress} title="TEST ENV" />
            {/* <View style={styles.buttonContainer}>
                <Button onPress={onTestFirebasePress} title="TEST FIREBASE" />
            </View> */}
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
    // buttonContainer: {
    //   marginVertical: 8,
    //   marginHorizontal: 16,
    // },
});
