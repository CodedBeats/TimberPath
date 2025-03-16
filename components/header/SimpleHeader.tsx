import { useNavigation, CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { RootStackParamList, TabParamList } from "@/types";
import { SearchBar } from "../search/SearchBar";

// icon
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type HeaderProps = {
    onSearch?: (query: string) => void;
};

const HeaderWithCart = () => {
    const router = useRouter();
    const pathname = usePathname();
    const navigateToProfile = () => {
        router.push("/(profile)/Profile");
    };

    const navigateToCart = () => {
        router.push("/(tabs)/product/Cart");
    };

    return (
        <View style={styles.container}>
            {/* search bar */}
            {/* <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor="#7C7C7D"
                onChangeText={handleSearch}
            /> */}
            <SearchBar />

            {/* cart icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={navigateToCart}
            >
                <FontAwesome5
                    name="shopping-cart"
                    size={22}
                    color="#333"
                    style={styles.cartIcon}
                />
            </TouchableOpacity>

            {/* profile icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={navigateToProfile}
            >
                <FontAwesome5 name="user-alt" size={22} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const HeaderWithoutCart = () => {
    const router = useRouter();

    const navigateToProfile = () => {
        router.push("/(profile)/Profile");
    };

    return (
        <View style={styles.container}>
            {/* search Bar */}
            {/* <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor="#7C7C7D"
                onChangeText={handleSearch}
            /> */}
            <SearchBar />

            {/* profile Icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={navigateToProfile}
            >
                <FontAwesome5 name="user-alt" size={22} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
    },
});

export { HeaderWithCart, HeaderWithoutCart };
