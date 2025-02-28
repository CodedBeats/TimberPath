import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
const { width } = Dimensions.get("window")
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface ArticleCardProps {
    article: {
        id: string;
        title: string;
        content: string;
        imageURL?: string;
        timestamp: string;
    };
}

export function ArticleCard({ article }: ArticleCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "./ArticleDetail",
            params: { articleId: article.id },
        });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
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
        shadowColor: "#fff",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        margin: 10,
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
