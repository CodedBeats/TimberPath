import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ScanLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: true,
            // animation: 'fade', 
            contentStyle: { backgroundColor: '#000' }, 
        }}>
            <Stack.Screen name="Scan" options={{ headerShown: false }} />
            <Stack.Screen
                name="ScansSuggestedWoods"
                options={{
                    headerShown: true,
                    headerTitle: "Scan Wood",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    headerShadowVisible: false, // remove bottom border
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#32003F", "#4C007A"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
        </Stack>
    );
}
