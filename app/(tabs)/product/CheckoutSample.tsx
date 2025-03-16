import React, { useState, useEffect } from "react";
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



export default function CheckoutSample() {
    const router = useRouter()

    useEffect(() => {
        
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView style={styles.checkoutContainer}>
                {/* Card Type */}
                <View style={styles.checkoutCellContainer}>
                    <Text style={styles.checkoutCellTitle}>Card Type</Text>
                    <TextInput
                        style={styles.checkoutCellInput}
                        placeholder={"Visa"}
                        //value={checkoutData.dataName}
                        //onChangeText={(text) => setCheckoutData((prev) => ({ ...prev, dataName: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                {/* Card Number */}
                <View style={styles.checkoutCellContainer}>
                    <Text style={styles.checkoutCellTitle}>Card Number</Text>
                    <TextInput
                        style={styles.checkoutCellInput}
                        placeholder={"000-000-000-000"}
                        //value={checkoutData.dataName}
                        //onChangeText={(text) => setCheckoutData((prev) => ({ ...prev, dataName: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                {/* Cardholder Name */}
                <View style={styles.checkoutCellContainer}>
                    <Text style={styles.checkoutCellTitle}>Cardholder Name</Text>
                    <TextInput
                        style={styles.checkoutCellInput}
                        placeholder={"Mr Purple Prince"}
                        //value={checkoutData.dataName}
                        //onChangeText={(text) => setCheckoutData((prev) => ({ ...prev, dataName: text }))}
                        placeholderTextColor="gray"
                    />
                </View>

                <View style={styles.cvvAndExpiryContainer}>
                    {/* EXPIRY DATE */}
                    <View style={styles.checkoutCellContainer2}>
                        <Text style={styles.checkoutCellTitle}>Expiry Date</Text>
                        <TextInput
                            style={styles.checkoutCellInput}
                            placeholder={"05/2025"}
                            //value={checkoutData.dataName}
                            //onChangeText={(text) => setCheckoutData((prev) => ({ ...prev, dataName: text }))}
                            placeholderTextColor="gray"
                        />
                    </View>

                    {/* CVV / CVC */}
                    <View style={styles.checkoutCellContainer2}>
                        <Text style={styles.checkoutCellTitle}>CVV / CVC</Text>
                        <TextInput
                            style={styles.checkoutCellInput}
                            placeholder={"123"}
                            //value={checkoutData.dataName}
                            //onChangeText={(text) => setCheckoutData((prev) => ({ ...prev, dataName: text }))}
                            placeholderTextColor="gray"
                        />
                    </View>
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.checkoutCellTitle}>Total</Text>
                    <Text style={styles.checkoutCellTitle}>$15.50</Text>
                </View>
                <PrimaryBtn onPress={() => console.log("Paying...")} text="Pay Now" />
            </ScrollView>
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
        padding: 12,
    },
    checkoutContainer: {
        display: "flex",
        backgroundColor: "#111",
        gap: 12,
        padding: 12,
        borderRadius: 12,
    },
    checkoutCellContainer: {
        marginBottom: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    checkoutCellContainer2: {
        marginBottom: 12,
        paddingVertical: 8,
        borderRadius: 8,
        width: "45%",
    },
    checkoutCellTitle: {
        color: "#fff",
        fontSize: 15,
        marginBottom: 2,
        fontWeight: 500,
    },
    checkoutCellInput: {
        backgroundColor: "#444",
        padding: 8,
        paddingLeft: 16,
        borderRadius: 8,
        fontSize: 14,
        color: "#fff"
    },
    cvvAndExpiryContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 12,
    },
});