import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext"
import { useDB } from "@/contexts/DBContext"

// components
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";
import ErrorMessage, { ErrorMessageRef } from "@/components/errors/ErrorMessage";


export default function Profile() {
    const router = useRouter()
    // error ref
    const errorRef = useRef<ErrorMessageRef>(null);

    // context
    const { user } = useAuth()
    const db = useDB()

    // state
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        address: "",
        phoneNumber: "",
        isTradie: "",
    })

    // handle error
    const triggerError = (msg: string, options?: { color?: string; fontSize?: number }) => {
        errorRef.current?.show(msg, options);
    };


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
                // responsive
                triggerError("Couldn't fetch profile", { color: "orange", fontSize: 16 });
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

            // split fullName into first and last name
            const [firstName, lastName = ""] = userData.fullName.trim().split(" ")

            // update state before sendting to firebase
            const updatedUserData = { ...userData, firstName, lastName };

            await setDoc(doc(db, "users", user.uid), updatedUserData, { merge: true });
            //console.log("success", "profile updated");
            
            // responsive
            triggerError("Profile Updated", { color: "green", fontSize: 16 });
        } catch (error) {
            //console.log("err", (error as any).message);

            // responsive
            triggerError("Couldn't fetch profile", { color: "orange", fontSize: 16 });
        }
    }



    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={["#555", "#111"]} style={styles.userDataFields}>
                {/* FULL NAME */}
                <View style={styles.userDataCell}>
                    <Text style={styles.userDataCellTitle}>Full Name</Text>
                    <TextInput
                        style={styles.userDataText}
                        placeholder={"First Name"}
                        value={userData.fullName}
                        onChangeText={(text) => setUserData((prev) => ({ ...prev, fullName: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                {/* EMAIL */}
                <View style={styles.userDataCell}>
                    <Text style={styles.userDataCellTitle}>Email</Text>
                    <TextInput
                        style={styles.userDataText}
                        placeholder="Email"
                        value={userData.email}
                        onChangeText={(text) => setUserData((prev) => ({ ...prev, email: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                {/* PHONE */}
                <View style={styles.userDataCell}>
                    <Text style={styles.userDataCellTitle}>Phone Number</Text>
                    <TextInput
                        style={styles.userDataText}
                        placeholder="Phone Number"
                        value={userData.phoneNumber}
                        onChangeText={(text) => setUserData((prev) => ({ ...prev, phoneNumber: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                {/* ADDRESS */}
                <View style={styles.userDataCell}>
                    <Text style={styles.userDataCellTitle}>Address</Text>
                    <TextInput
                        style={styles.userDataText}
                        placeholder="Address"
                        value={userData.address}
                        onChangeText={(text) => setUserData((prev) => ({ ...prev, address: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                <View style={styles.tradeProfessionContainer}>
                    {/* DISCOUNT */}
                    <View style={styles.tradeProfessionCell}>
                        <Text style={styles.userDataCellTitle}>Trade Profession Discount</Text>
                        <TextInput
                            style={styles.userDataText}
                            placeholder="Tradie"
                            value={userData.isTradie}
                            onChangeText={(text) => setUserData((prev) => ({ ...prev, isTradie: text }))}
                            placeholderTextColor="gray"
                        />
                    </View>

                    {/* button to upload or see uploaded documents */}
                    <View style={styles.tradeProfessionCell}>
                        <Text style={styles.userDataCellTitle}>Submit for Review</Text>
                        <TouchableOpacity>
                            <Text>Trade Documents</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            
                <PrimaryBtn onPress={handleUpdateProfile} text="Update Profile" />

                {/* error message */}
                <ErrorMessage ref={errorRef} />
            </LinearGradient>
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
    userDataFields: {
        display: "flex",
        gap: 12,
        padding: 16,
        borderRadius: 12,
    },
    userDataCell: {
        marginBottom: 12,
        backgroundColor: "#fff",
        padding: 8,
        paddingLeft: 16,
        borderRadius: 8,
    },
    userDataCellTitle: {
        color: "#777",
        fontSize: 10,
        marginBottom: 2,
    },
    userDataText: {
        color: "#000",
    },
    tradeProfessionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tradeProfessionCell: {
        marginBottom: 12,
        backgroundColor: "#fff",
        padding: 8,
        paddingLeft: 16,
        borderRadius: 8,
        width: "45%",
    },
});
