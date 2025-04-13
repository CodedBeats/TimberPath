// dependencies
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    Text,
    SafeAreaView,
    ScrollView,
    Platform,
    TouchableOpacity,
} from "react-native";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// api
import * as Google from "expo-auth-session/providers/google";
import * as Crypto from "expo-crypto";

// components
import ErrorMessage, {
    ErrorMessageRef,
} from "@/components/errors/ErrorMessage";
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";
import RadialGradientCircle from "@/components/ui/RadialGradientCircle";

export default function SignUp() {
    const auth = getAuth();
    const router = useRouter();
    const db = getFirestore();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const [nonce, setNonce] = useState("");

    // error ref
    const errorRef = useRef<ErrorMessageRef>(null);

    // handle error
    const triggerError = (
        msg: string,
        options?: { color?: string; fontSize?: number }
    ) => {
        errorRef.current?.show(msg, options);
    };

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
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // handle split fullName into first and last name (if full name is more than 2 words then last name gets all the middle names too)
            const parts = fullName.trim().split(" ");
            const firstName = parts[0];
            const lastName = parts.slice(1).join(" ");

            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
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
            // responsive
            triggerError(
                `A verification link has been sent to your email. Please verify your email before signing in.`,
                { color: "orange", fontSize: 16 }
            );
        } catch (error) {
            Alert.alert("Error", (error as any).message);
            triggerError(`Error, ${(error as any).message}`, {
                color: "orange",
                fontSize: 16,
            });
        }
    };

    const [request, response, promptAsync] = Google.useAuthRequest({
        responseType: "id_token token",
        usePKCE: false,
        webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_OAUTH_CREDENTIAL_ID,
        iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_OAUTH_CREDENTIAL_ID,
        androidClientId:
            process.env.EXPO_PUBLIC_FIREBASE_ANDROID_OAUTH_CREDENTIAL_ID,
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
            const credential = GoogleAuthProvider.credential(
                id_token,
                access_token
            );
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
            <View style={styles.logoTitleContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title" style={styles.title}>
                        Sign Up
                    </ThemedText>
                </ThemedView>
            </View>

            {/* radial gradient circles */}
            <View style={styles.radialGradientContainer}>
                <RadialGradientCircle
                    id={`circle-${Date.now() + 5}`}
                    radius={100}
                    centerX={screenWidth * 1}
                    centerY={screenHeight * 0.3}
                    startColor="#B379DF"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 6}`}
                    radius={100}
                    centerX={screenWidth * 0}
                    centerY={screenHeight * 0.5}
                    startColor="#880c91"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 7}`}
                    radius={80}
                    centerX={screenWidth * 0}
                    centerY={screenHeight * 0.85}
                    startColor="#db6ef5"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 8}`}
                    radius={80}
                    centerX={screenWidth * 1}
                    centerY={screenHeight * 0.7}
                    startColor="#560369"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 9}`}
                    radius={130}
                    centerX={screenWidth * 0.5}
                    centerY={screenHeight * 1}
                    startColor="#41118f"
                    startOpacity={0.4}
                />
            </View>

            {/* frosted glass container */}
            <View style={styles.frostedGlassContainer}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="john.doe@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#ccc"
                        />
                        <Text style={styles.inputHeader}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            value={fullName}
                            onChangeText={setFullName}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#ccc"
                        />
                        <Text style={styles.inputHeader}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#ccc"
                        />
                    </View>

                    {/* sign up, error mesage and route to sign up */}
                    <View style={styles.buttonContainer}>
                        <PrimaryBtn
                            text="Sign Up"
                            marginVertical={20}
                            width="100%"
                            onPress={handleSignUp}
                        />

                        {/* error message */}
                        <ErrorMessage ref={errorRef} />

                        <PrimaryBtn
                            text="Sign Up with Google"
                            marginVertical={0}
                            width="100%"
                            onPress={() => promptAsync()}
                        />

                        {/* dont have an account? route to sign up */}
                        <View style={styles.noAccountContainer}>
                            <Text style={styles.noAccountText}>
                                Already have an account?{"  "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/SignIn")}
                            >
                                <Text style={styles.noAccountTextLink}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: "#000",
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
    // logo and title container
    logoTitleContainer: {
        paddingTop: 40,
        backgroundColor: "#000",
    },
    logo: {
        width: "100%",
        height: 150,
        marginBottom: 32,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "#000",
    },
    title: {
        color: "#fff",
        fontSize: 40,
        fontWeight: 400,
    },
    radialGradientContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    // frosted glass container
    frostedGlassContainer: {
        backgroundColor: "rgba(169, 57, 197, 0.3)",
        backdropFilter: "blur(10px)",
        bottom: 0,
        height: "100%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 20,
    },
    // input
    inputContainer: {},
    inputHeader: {
        color: "#ccc",
        marginBottom: 8,
        fontSize: 12,
        marginLeft: 8,
        marginTop: 8,
    },
    input: {
        height: 40,
        backgroundColor: "rgba(132, 132, 132, 0.6)",
        backdropFilter: "blur(40px)",
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: "#fff",
    },
    // forgot password
    forgotPasswordBtn: {
        width: "100%",
    },
    forgotPasswordText: {
        color: "#ccc",
        fontSize: 12,
        textAlign: "right",
    },
    // buttons
    buttonContainer: {
        flexDirection: "column",
    },
    // no account
    noAccountContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    noAccountText: {
        color: "#fff",
        fontSize: 12,
    },
    noAccountTextLink: {
        color: "#07f",
        fontSize: 12,
        fontWeight: 500,
        textDecorationLine: "underline",
    },
    // loading
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
