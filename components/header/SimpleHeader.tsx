import React from "react"
import { useNavigation, CompositeNavigationProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router";
import { RootStackParamList, TabParamList } from "@/types"

// icon
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'


const HeaderWithCart = () => {
    const router = useRouter()
    
    const navigateToProfile = () => {
        router.push("/(profile)/Profile")
    }

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
                <FontAwesome5 name="shopping-cart" size={22} color="#333" style={styles.cartIcon} />
            </TouchableOpacity>

            {/* profile icon */}
            <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                <FontAwesome5 name="user-alt" size={22} color="#333" />
            </TouchableOpacity>
        </View>
    )
};

const HeaderWithoutCart = () => {
    const router = useRouter();
    const navigateToProfile = () => {
        router.push("/(profile)/Profile")
    }
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
                <FontAwesome5 name="user-alt" size={22} color="black" />
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
    // small detail otherwise handle makes it look too far right
    cartIcon: {
        transform: [{ translateX: -1 }],
    }
});

export { HeaderWithCart, HeaderWithoutCart }
