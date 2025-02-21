import React from "react"
import { useNavigation, CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router";
import { RootStackParamList, TabParamList } from "@/types";
// icon
import { IconSymbol } from "@/components/ui/IconSymbol"

const HeaderWithCart = () => {
    const router = useRouter();
    const navigateToProfile = () => {
        router.push("/profile");
      };

    return (
        <View style={styles.container}>
            {/* search bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor="#7C7C7D"
            />

            {/* cart icon */}
            <TouchableOpacity style={styles.iconButton}>
                <IconSymbol size={24} name="shopping-cart.fill" color="black" />
            </TouchableOpacity>

            {/* profile icon */}
            <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                <IconSymbol size={24} name="person.fill" color="black" />
            </TouchableOpacity>
        </View>
    )
};

const HeaderWithoutCart = () => {
    const router = useRouter();
    const navigateToProfile = () => {
        router.push("/profile");
      };
    return (
        <View style={styles.container}>
            {/* search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor="#7C7C7D"
            />

            {/* profile Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                <IconSymbol size={24} name="person.fill" color="black" />
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#222",
    },
    searchBar: {
        flex: 1,
        height: 35,
        borderRadius: 8,
        backgroundColor: "#ddd",
        paddingHorizontal: 12,
        fontSize: 16,
    },
    iconButton: {
        width: 35,
        height: 35,
        marginLeft: 12,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
});

export { HeaderWithCart, HeaderWithoutCart }
