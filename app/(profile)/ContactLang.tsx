import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";

export default function ContactLang() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* language */}
                <Text style={styles.header}>Language</Text>
                <Text style={styles.subText}>Only English is currently supported.</Text>

                {/* extra space */}
                <View style={styles.spacer} />

                {/* contact */}
                <Text style={styles.header}>Contact</Text>

                <InfoRow label="Github" value="github.com/CodedBeats/TimberPath" />
                <InfoRow label="Luca Email" value="	12030@ait.nsw.edu.au" />
                <InfoRow label="Arturo Email" value="8566@ait.nsw.edu.au" />
                {/* Add more rows as needed */}
            </ScrollView>
        </SafeAreaView>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
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
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        color: "#aaa",
        marginBottom: 24,
    },
    spacer: {
        height: 32,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#333",
    },
    label: {
        color: "#ccc",
        fontSize: 14,
    },
    value: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
});
