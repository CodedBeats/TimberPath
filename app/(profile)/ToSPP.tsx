import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";

export default function ToSPP() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Terms of Service */}
                <Text style={styles.header}>Terms of Service</Text>
                <Text style={styles.text}>
                    By using TimberPath, you agree to use the platform
                    responsibly and in accordance with all applicable laws and
                    regulations. We reserve the right to suspend or terminate
                    your access at any time if we believe you are violating our
                    policies.
                </Text>
                <Text style={styles.text}>
                    Payments made through TimberPath are securely processed via
                    Stripe. We do not store any of your payment card details
                    directly. Stripe uses industry-leading encryption and
                    PCI-compliant practices to ensure your transactions remain
                    safe.
                </Text>
                <Text style={styles.text}>
                    You agree not to misuse or attempt to disrupt the services
                    offered. Any suspicious activity may lead to restrictions or
                    bans. These terms may be updated from time to time, and it
                    is your responsibility to review them periodically.
                </Text>

                <View style={styles.spacer} />

                {/* Privacy Policy */}
                <Text style={styles.header}>Privacy Policy</Text>
                <Text style={styles.text}>
                    TimberPath respects your privacy. We only collect the
                    personal information necessary to provide our services;
                    such as name, email, and contact information, which you can
                    view and edit in your profile.
                </Text>
                <Text style={styles.text}>
                    Authentication is handled through Google Firebase, which
                    ensures your passwords are hashed and securely managed. We
                    never store your plain-text password, and our team has no
                    access to it.
                </Text>
                <Text style={styles.text}>
                    We also use Firebase to store your account and order data,
                    which is accessible only to you. No personal information is
                    publicly visible to other users. We do not store sensitive
                    data such as government ID numbers or banking details.
                </Text>
                <Text style={styles.text}>
                    For analytics, we track basic user interactions; such as
                    article views, to help us understand what content is
                    trending. This is anonymous and used strictly to improve the
                    user experience.
                </Text>
                <Text style={styles.text}>
                    You have the right to request deletion of your data at any
                    time. Simply reach out via our Contact page, and we will
                    remove your information from our records with no questions
                    asked.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: "#ccc",
        marginBottom: 16,
        lineHeight: 22,
    },
    spacer: {
        height: 32,
    },
});
