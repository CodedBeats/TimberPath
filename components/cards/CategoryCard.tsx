import { TouchableOpacity, View, Text, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
const { width } = Dimensions.get("window")
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";

interface CategoryCardProps {
    category: {
        id: string;
        name: string;
        description: string;
        iconURL?: string;
    };
    marginBottom?: number;
}

export function CategoryCard({ category, marginBottom = 10 }: CategoryCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/(tabs)/Education/ArticlesByCategory",
            params: { categoryId: category.id },
        });
    };

    return (
        <TouchableOpacity style={[styles.card, { marginBottom }]} onPress={handlePress}>
            {/* show background img ig it exists */}
            {category.iconURL ? (
                <ImageBackground source={{ uri: category.iconURL }} imageStyle={{opacity: 0.3, borderRadius: 12}} style={styles.image}>
                    <View style={styles.textContainer}>
                        {/* title */}
                        <ThemedText type="defaultSemiBold" style={styles.title}>
                            {category.name}
                        </ThemedText>
                    </View>
                </ImageBackground>
            ) : (
                // no image
                <View style={[styles.image, styles.placeholder]}>
                    <View style={styles.textContainer}>
                        <ThemedText type="defaultSemiBold" style={styles.title}>
                            {category.name}
                        </ThemedText>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        maxWidth: width * 0.5,
        height: width * 0.2,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
    },
    image: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholder: {
        backgroundColor: "#222",
    },
    textContainer: {
        display: "flex",
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        color: "white",
        textAlign: "center",
    },
});
