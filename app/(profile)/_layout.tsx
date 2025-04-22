import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                // animation: 'fade',
                contentStyle: { backgroundColor: "#000" },
            }}
        >
            <Stack.Screen
                name="Profile"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTitleAlign: "center",
                    headerTintColor: "#aaa",
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#222" },

                    // custom back btn
                    headerLeft: () => <CustomBackButton />,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                options={{
                    headerShown: true,
                    headerTitle: "Edit Profile",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    headerStyle: { backgroundColor: "#121212" },
                }}
            />
            <Stack.Screen
                name="ContactLang"
                options={{
                    headerShown: true,
                    headerTitle: "Contact & Language",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    headerStyle: { backgroundColor: "#121212" },
                }}
            />
            <Stack.Screen
                name="ToSPP"
                options={{
                    headerShown: true,
                    headerTitle: "ToS & Privacy Policy",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    headerStyle: { backgroundColor: "#121212" },
                }}
            />
        </Stack>
    );
}

function CustomBackButton() {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                router.replace("/");
            }}
            style={{ marginLeft: 10 }}
        >
            <Text
                style={{
                    color: "#aaa",
                    fontSize: 18,
                    marginLeft: 10,
                }}
            >
                &#x276E;
            </Text>
        </TouchableOpacity>
    );
}
