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
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient'

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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


    // function to format phone number
    const formatPhoneNumber = (phoneNumber: string): string => {
        // fancy shit I found on stack overflow lol
        return phoneNumber.replace(/^(\+\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
    }


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
            <View style={styles.topShape1}></View>
            <View style={styles.topShape2}></View>


            {/* fake header to go back */}
            <View>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons style={styles.backBtn} name="arrow-back" size={24} color="#ccc" />
                </TouchableOpacity>
            </View>


            {/* user img and logout btn */}
            <ProfileAvatar 
                imageUrl="https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                onLogout={logout} 
            />

            {/* user details */}
            <View style={styles.fullNameContainer}>
                <Text style={styles.fullNameText}>{userData.firstName} {userData.lastName}</Text>
            </View>
            <View style={styles.userDetailsContainer}>
                <Text style={styles.tempText}>{userData.email} | </Text>
                <Text style={styles.tempText}>{formatPhoneNumber(userData.phoneNumber)}</Text>
            </View>


            {/* extra shtuff container */}
            <LinearGradient colors={["#555", "#111"]} style={styles.extraStuffContainer}>

            {/* edit user */}
            <View style={styles.badNameContainer}>
                <TouchableOpacity onPress={() => router.push("/(profile)/EditProfile")}>
                    <View style={styles.cellContainer}>
                        <FontAwesome style={styles.icon} name="drivers-license-o" size={20} color="black" />
                        <Text style={styles.cellText}>Edit Profile Information</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.cellContainer}>
                    <Ionicons style={styles.icon} name="language" size={20} color="black" />
                    <Text style={styles.cellText}>Language</Text>
                </View>
            </View>


            {/* ToS and Privacy Policy */}
            <View style={styles.badNameContainer}>
                <View style={styles.cellContainer}>
                    <AntDesign style={styles.icon} name="contacts" size={20} color="black" />
                    <Text style={styles.cellText}>Contact Us</Text>
                </View>
                <View style={styles.cellContainer}>
                    <AntDesign style={styles.icon} name="lock1" size={20} color="black" />
                    <Text style={styles.cellText}>Privacy Policy</Text>
                </View>
                <View style={styles.cellContainer}>
                    <MaterialCommunityIcons style={styles.icon} name="clipboard-list-outline" size={20} color="black" />
                    <Text style={styles.cellText}>Terms of Service</Text>
                </View>
            </View>
            </LinearGradient>
        </ScrollView>
        </SafeAreaView>
    );
}


// component for fancy styled avatar and logout btn
const ProfileAvatar = ({ imageUrl, onLogout }: { imageUrl: string; onLogout: () => void }) => {
    return (
        <View style={styles.userImgLogoutContainer}>
            {/* avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.avatar}
                />
                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutIconContainer} onPress={onLogout}>
                    <MaterialIcons name="logout" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    // background shapes
    topShape1: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 100,
        backgroundColor: "#222",
    },
    topShape2: {
        position: "absolute",
        top: 100,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: "#222",
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
    },
    // fake header
    backBtn: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    // user img and logout btn
    userImgLogoutContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
    },
    avatarContainer: {
        // relative for absolute positioning of the logout button
        position: "relative", 
        width: 100,
        height: 100,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ccc",
    },
    logoutIconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#eee",
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    // user details
    fullNameContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
    },
    fullNameText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    userDetailsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    // extra stuff
    extraStuffContainer: {
        display: "flex",
        gap: 20,
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    badNameContainer: {
        display: "flex",
        gap: 4,
        padding: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    cellContainer: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingVertical: 4,
    },
    icon: {
        maxWidth: 20,
    },
    cellText: {
        color: "#000",
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
