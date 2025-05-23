import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text } from "react-native";

export default function TimberGuideLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: true,
            // animation: 'fade', 
            contentStyle: { backgroundColor: '#000' }, 
        }}>
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
                    headerShadowVisible: false, // remove bottom border
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#32003F", "#4C007A"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    ),
                    headerLeft: () => <CustomBackButton />,
                }}
            />
        </Stack>
    );
}


function CustomBackButton() {
  const router = useRouter();

    const handleBack = () => {
        router.replace("/(tabs)");
    };

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{ marginLeft: 10 }}
    >
      <Text style={{ 
        color: "#aaa", 
        fontSize: 18,
        marginLeft: 10,
      }}>&#x276E;</Text>
    </TouchableOpacity>
  );
}
