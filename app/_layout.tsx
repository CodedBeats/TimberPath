import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router"

// contexts
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { DBProvider } from "@/contexts/DBContext"



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <AuthProvider>
            <DBProvider>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <StatusBar style="auto" />
                    <AuthWrapper />
                </ThemeProvider>
            </DBProvider>
        </AuthProvider>
    )
}


// oh boy I hated creating this, but it's working and I really don't want to touch it haha
let AuthWrapper = () => {
    const { user, loading } = useAuth()
    const router = useRouter()

    // === DEBUG === //
    console.log("User:", user)
    console.log("Loading:", loading)

    // get any changes in user state -> navigate accordingly
    useEffect(() => {
        if (!loading) {
            if (user && user.emailVerified) {
                // navigate to (tabs) group if signed in
                router.replace("/(tabs)")
            } else {
                // navigate to SignIn if not
                router.replace("/SignIn")
            }
        }
    }, [user, loading])

    // (update this at some point to display fancy loading page)
    if (loading) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="SignIn" />
            <Stack.Screen name="SignUp" />
            <Stack.Screen name="(scan)" />
            <Stack.Screen name="(timberGuide)" />
        </Stack>
    );
}
