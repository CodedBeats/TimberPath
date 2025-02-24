import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView,
    SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext"
import { useDB } from "@/contexts/DBContext"

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader"



export default function Profile() {
    const router = useRouter()

    // context
    const { user } = useAuth()
    const db = useDB()

    // state
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        isTradie: "",
    })

    useEffect(() => {
        const fetchProfile = async () => {
            // no user
            if (!user) {
                console.log("err: no user logged in")
                router.push("/SignIn")
                return
            }
    
            try {
                const userDocRef = doc(db, "users", user.uid)
                const userDocSnap = await getDoc(userDocRef)
    
                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data() as typeof userData)
                }
            } catch (error) {
                console.log("err", "couldn't fetch profile data")
            } finally {
                setLoading(false)
            }
        }
    
        fetchProfile()
    }, [user, db])


    // update user doc data
    const handleUpdateProfile = async () => {
        try {
            if (!user) {
                console.log("err", "no user logged in");
                return;
            }
            await setDoc(doc(db, "users", user.uid), userData, { merge: true });
            console.log("success", "profile updated");
        } catch (error) {
            console.log("err", (error as any).message);
        }
    }


    // if (loading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#000" />
    //         </View>
    //     )
    // }


    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

            {/* inputs */}
            <TextInput
                style={styles.input}
                placeholder={"First Name"}
                value={userData.firstName}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, firstName: text }))}
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={userData.lastName}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, lastName: text }))}
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={userData.email}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, email: text }))}
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={userData.address}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, address: text }))}
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={userData.phoneNumber}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, phoneNumber: text }))}
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Tradie"
                value={userData.isTradie}
                onChangeText={(text) => setUserData((prev) => ({ ...prev, isTradie: text }))}
                placeholderTextColor="gray"
            />

            
            <View style={styles.buttonContainer}>
                <Button title="Update Profile" onPress={handleUpdateProfile} />
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexGrow: 1,
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
        marginBottom: 12,
    },
    reactLogo: {
        height: 178,
        width: 290,
        position: "absolute",
    },
    buttonContainer: {
        marginVertical: 8,
    },
});
