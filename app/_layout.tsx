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

// contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { DBProvider } from "@/contexts/DBContext";

// firebase
import { auth, db } from "@/config/Config"
import { useAuthState } from "react-firebase-hooks/auth"



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [user, loading] = useAuthState(auth);
    
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <DBProvider>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <StatusBar style="auto" />
                    <Stack>
                        {user ? (
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        ) : (
                            <>
                                <Stack.Screen name="(auth)/SignIn" />
                                <Stack.Screen name="(auth)/SignUp" />
                            </>
                        )}
                    </Stack>
                </ThemeProvider>
            </DBProvider>
        </AuthProvider>
    );
}
