import { Text, TouchableOpacity, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type PrimaryBtnProps = {
    text: string;
    onPress: () => void;
    fontSize?: number; // optional
    fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "bold" | "normal"; // optional
}

const PrimaryBtn = ({text, onPress, fontSize = 15, fontWeight = "500"}: PrimaryBtnProps) => {
    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <LinearGradient
                colors={["#9C3FE4", "#C65647"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={[styles.text, { fontSize }, { fontWeight }]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: "60%",
        marginVertical: 10,
        alignSelf: "center",
    },
    button: {
        borderRadius: 12,
        justifyContent: "center",
    },
    gradient: {
        paddingVertical: 12,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    text: {
        color: "#fff",
        // fontWeight: "bold",
        textAlign: "center",
    },
})

export { PrimaryBtn }
