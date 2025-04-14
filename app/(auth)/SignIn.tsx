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
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    signInWithCredential,
    GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// config
import { auth } from "@/config/Config";

// api
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import * as Crypto from "expo-crypto";

// components
import ErrorMessage, { ErrorMessageRef } from "@/components/errors/ErrorMessage";
import RadialGradientCircle from "@/components/ui/RadialGradientCircle";
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";


export default function SignIn() {
    //const auth = getAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
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

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    });

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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            if (!user.emailVerified) {
                Alert.alert(
                    "Email Not Verified",
                    "Please verify your email before signing in. You have to check your inbox for the verification link."
                );
                // responsive
                triggerError(
                    `Please verify your email before signing in. You have to check your inbox for the verification link.`,
                    { color: "orange", fontSize: 16 }
                );
                await signOut(auth);
                return;
            }
            Alert.alert("Success", "You have signed in successfully!");
            router.push("/(tabs)");
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Error", error.message);
                triggerError(`Error", ${error.message}`, {
                    color: "orange",
                    fontSize: 16,
                });
            } else {
                Alert.alert("Error", "An unknown error occurred");
                triggerError(`An unknown error occurred`, {
                    color: "orange",
                    fontSize: 16,
                });
            }
        }
    };

    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                "Password Reset Email Sent",
                "A password reset email has been sent to your email."
            );
            triggerError(`A password reset email has been sent to your email`, {
                color: "orange",
                fontSize: 16,
            });
        } catch (error) {
            Alert.alert("Error", (error as any).message);
            triggerError(`Error", ${(error as any).message}`, {
                color: "red",
                fontSize: 16,
            });
        }
    };

    const googleConfig = useMemo(
        () => ({
            responseType: "id_token token",
            usePKCE: false,
            webClientId:
                process.env.EXPO_PUBLIC_FIREBASE_WEB_OAUTH_CREDENTIAL_ID,
            iosClientId:
                process.env.EXPO_PUBLIC_FIREBASE_IOS_OAUTH_CREDENTIAL_ID,
            androidClientId:
                process.env.EXPO_PUBLIC_FIREBASE_ANDROID_OAUTH_CREDENTIAL_ID,
            scopes: ["openid", "profile", "email"],
            extraParams: {
                code_challenge_method: "",
                nonce: nonce,
            },
        }),
        [nonce]
    );

    const [googleRequest, googleResponse, googlePromptAsync] =
        Google.useAuthRequest(googleConfig);

    useEffect(() => {
        if (googleResponse?.type === "success") {
            const { id_token, access_token } = googleResponse.params;
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
            <View style={styles.logoTitleContainer}>
                <Image
                    source={require("@/assets/images/TP-Logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title" style={styles.title}>
                        Sign In
                    </ThemedText>
                </ThemedView>
            </View>

            {/* radial gradient circles */}
            <View style={styles.radialGradientContainer}>
                <RadialGradientCircle
                    id={`circle-${Date.now() + 1}`}
                    radius={100}
                    centerX={screenWidth * 1}
                    centerY={screenHeight * 0.6}
                    startColor="#B379DF"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 2}`}
                    radius={100}
                    centerX={screenWidth * 0}
                    centerY={screenHeight * 0.7}
                    startColor="#880c91"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 3}`}
                    radius={100}
                    centerX={screenWidth * 0}
                    centerY={screenHeight * 1}
                    startColor="#db6ef5"
                    startOpacity={0.4}
                />
                <RadialGradientCircle
                    id={`circle-${Date.now() + 4}`}
                    radius={100}
                    centerX={screenWidth * 1}
                    centerY={screenHeight * 1}
                    startColor="#560369"
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
                        <Text style={styles.inputHeader}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#ccc"
                        />
                        <TouchableOpacity style={styles.forgotPasswordBtn} onPress={resetPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* sign in, error mesage and route to sign up */}
                    <View style={styles.buttonContainer}>
                        <PrimaryBtn text="Sign In" marginVertical={20} width="100%" onPress={handleSignIn} />

                        {/* error message */}
                        <ErrorMessage ref={errorRef} />

                        <PrimaryBtn text="Sign In with Google" marginVertical={0} width="100%" onPress={() => googlePromptAsync()} />

                        {/* dont have an account? route to sign up */}
                        <View style={styles.noAccountContainer}>
                            <Text style={styles.noAccountText}>Don't have an account?{"  "}</Text>
                            <TouchableOpacity onPress={() => router.push("/SignUp")}>
                                <Text style={styles.noAccountTextLink}>Sign Up</Text>
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
        flexGrow: 1,
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
        fontSize: 32,
        fontWeight: 400,
    },
    // radial gradients
    radialGradientContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    inputContainer: {

    },
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
