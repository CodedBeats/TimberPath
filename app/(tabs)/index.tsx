import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader";

export default function Index() {
    const router = useRouter();

    // contexts
    const db = useDB();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* header */}
                <HeaderWithCart />

                {/* home/dashboard content */}
                <View style={styles.container}>
                    {/* producrs */}
                    <LinearGradient
                        colors={["#180121", "#520073"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox1]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                Featured Products
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            <Text>dynamically rendered products here</Text>
                        </View>
                    </LinearGradient>

                    {/* product categories */}
                    <LinearGradient
                        colors={["#5c1f03", "#e87809"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox2]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                Shop by Category
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            <Text>dynamically rendered categories here</Text>
                        </View>
                    </LinearGradient>

                    {/* education */}
                    <LinearGradient
                        colors={["#180121", "#520073"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox1]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                New Articles
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            <Text>dynamically rendered articles here</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.bottomBox}>
                <PrimaryBtn
                    text="Add Product"
                    onPress={() => router.push("/(admin)/AddProduct")}
                    fontSize={16}
                />
                <PrimaryBtn
                    text="Add Supplier"
                    onPress={() => router.push("/(admin)/AddSupplier")}
                    fontSize={16}
                />
                <PrimaryBtn
                    text="Add Wood"
                    onPress={() => router.push("/(admin)/AddWood")}
                    fontSize={16}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
        ...Platform.select({
            ios: {
                paddingBottom: 80,
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    headerPlaceholder: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#888",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    largeBox: {
        borderRadius: 10,
        padding: 8,
        marginBottom: 20,
    },
    largeBox1: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3, // android shadow
    },
    largeBox2: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3, // android shadow
    },
    subBoxHeaderContainer: {
        marginBottom: 8,
    },
    subBoxHeaderText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
        textDecorationLine: "underline",
    },
    subBoxContent: {
        borderColor: "#222",
        borderWidth: 1,
        height: 100,
    },
    buttonContainer: {
        marginHorizontal: "20%",
        backgroundColor: "#5588cc",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#f17700",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
        width: "60%",
        alignSelf: "center",
      },
      buttonText: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold" 
    },
    bottomBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#32003F",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#000",
        borderTopWidth: 3,
    },
});
