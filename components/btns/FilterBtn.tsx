import { Text, TouchableOpacity, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import AntDesign from '@expo/vector-icons/AntDesign'

type FilterBtnProps = {
    onPress: () => void;
    fontSize?: number; // optional
}

const FilterBtn = ({onPress, fontSize = 15}: FilterBtnProps) => {
    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={[styles.text, { fontSize }]}>Filter</Text>
            <AntDesign name="filter" size={24} color="white" />
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
    },
    button: {
        backgroundColor: "#CC7E00",
        paddingVertical: 5,
        paddingHorizontal: 10,
        gap: 5,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        flexDirection: "row",
    },
    text: {
        color: "#fff",
    },
})

export { FilterBtn }
