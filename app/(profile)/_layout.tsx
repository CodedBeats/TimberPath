import { Stack } from "expo-router"

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" />
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
                    animation: "fade",
                }}
            />
        </Stack>
    );
}
