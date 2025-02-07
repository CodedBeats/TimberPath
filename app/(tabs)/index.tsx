import { Image, StyleSheet, Platform } from "react-native";
import { Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// firebase 
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "@/config/Config";


// temp code for testing
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function HomeScreen() {
    const envCode = process.env.EXPO_PUBLIC_TESTME;
    let onPress = async () => {
        console.log("firebase connection test")
        try {
            const querySnapshot = await getDocs(collection(db, "testColl"));
            querySnapshot.forEach((doc) => {
                console.log(`doc ID: ${doc.id}, data:`, doc.data())
            });
            console.log("success")
            //console.log(envCode)
        } catch (error) {
            console.error("error:", error)
        }
    }

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
});
