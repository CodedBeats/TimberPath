import { Stack } from "expo-router"

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: false,
            // animation: 'fade', 
            contentStyle: { backgroundColor: '#000' }, 
        }}>
            <Stack.Screen name="SignIn" />
            <Stack.Screen name="SignUp" />
        </Stack>
    );
}

