import { TouchableOpacity, View, Text, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
const { width } = Dimensions.get("window")
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";

interface ArticleCardProps {
    article: {
        id: string;
        title: string;
        content: string;
        imageURL?: string;
        timestamp: string;
    };
    marginBottom?: number;
}

export function ArticleCard({ article, marginBottom = 10 }: ArticleCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "./ArticleDetail",
            params: { articleId: article.id },
        });
    };

    return (
        <TouchableOpacity style={[styles.card, { marginBottom }]} onPress={handlePress}>
            {/* show background img ig it exists */}
            {article.imageURL ? (
                <ImageBackground source={{ uri: article.imageURL }} imageStyle={{opacity: 0.5, borderRadius: 12}} style={styles.image}>
                    <View style={styles.textContainer}>
                        {/* title */}
                        <ThemedText type="defaultSemiBold" style={styles.title}>
                            {article.title}
                        </ThemedText>
                    </View>
                </ImageBackground>
            ) : (
                // no image
                <View style={[styles.image, styles.placeholder]}>
                    <View style={styles.textContainer}>
                        <ThemedText type="defaultSemiBold" style={styles.title}>
                            {article.title}
                        </ThemedText>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.4,
        height: width * 0.4,
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
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        textAlign: "center",
    },
});
