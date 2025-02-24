import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext"
import { useDB } from "@/contexts/DBContext"



export default function Profile() {
    const router = useRouter();

    // context
    const { user, logout } = useAuth()
    const db = useDB()

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


    // if (loading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#000" />
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

            {/* top background shape */}
            <View><Text style={styles.tempText}>top background shape section</Text></View>

            {/* user img and edit btn */}
            <View><Text style={styles.tempText}>user img and edit btn section</Text></View>


            {/* user details */}
            <View><Text style={styles.tempText}>user details section</Text></View>


            {/* extra shtuff container */}
            <View><Text style={styles.tempText}>extra shtuff container</Text></View>


            {/* edit user */}
            <View><Text style={styles.tempText}>edit user section</Text></View>


            {/* ToS and Privacy Policy */}
            <View><Text style={styles.tempText}>ToS and Privacy Policy section</Text></View>

            

            
            <View style={styles.buttonContainer}>
                <Button title="Edit Profile" onPress={() => router.push("/(profile)/EditProfile")} />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={logout} title="Log Out" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={() => router.back()} />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    tempText: {
        color: '#fff',
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
