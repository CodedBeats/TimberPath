import { Stack } from "expo-router"

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
                }}
            />
        </Stack>
    );
}
