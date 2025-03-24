import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Index from "./app/(tabs)/index";
import SignIn from "./app/(auth)/SignIn";
import SignUp from "./app/(auth)/SignUp";
import { RootStackParamList } from "@/types";

import { StripeProvider } from '@stripe/stripe-react-native';
import { stripeConfig } from "./config/Config";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51R38SNKxSIkfhvjaTLX439TkXAYYvphgr8ApMsm8ZP4AyyF0oXTSMUAs6czzE5FFxF8lNRoVA1rQJauriHDBWFjm00PK19AbOZ'}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Index">
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ title: "Sign In" }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ title: "Sign Up" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </StripeProvider>
    );
}
