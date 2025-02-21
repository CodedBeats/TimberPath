import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function TimberGuideLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="TimberGuide" options={{ headerShown: false }} />
            <Stack.Screen
                name="GuidesSuggestedWoods"
                options={{
                    headerShown: true,
                    headerTitle: "Timber Guide",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    animation: "fade",
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
