import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity, Text, Platform } from 'react-native';

export default function SearchLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: true,
            // animation: 'fade', 
            contentStyle: { backgroundColor: '#000' }, 
        }}>
            <Stack.Screen
                name="Search"
                options={{
                    headerShown: true,
                    headerTitle: "Search",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    },
                    headerTintColor: "#aaa", // color for buttons/icons
                    headerStyle: { backgroundColor: "#121212" },

                    // only show custom back button on iOS
                    headerLeft: Platform.OS === 'ios' ? () => <CustomBackButton /> : undefined,
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
