import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import {
    getNewArticles,
    getTrendingArticles,
} from "../../../services/articles";
import { getCategories } from "../../../services/categories";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ThemedText } from "../../../components/ThemedText";
import { HeaderWithoutCart } from "../../../components/header/SimpleHeader";
import { LinearGradient } from "expo-linear-gradient";

export default function Education() {
    const router = useRouter();
    const [newArticles, setNewArticles] = useState<any[]>([]);
    const [trendingArticles, setTrendingArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [newData, trendingData, categoriesData] =
                    await Promise.all([
                        getNewArticles(5),
                        getTrendingArticles(5),
                        getCategories(),
                    ]);
                setNewArticles(newData);
                setTrendingArticles(trendingData);
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <HeaderWithoutCart />

                {/* New Articles Section */}
                <ThemedText type="title" style={styles.sectionHeader}>
                    New Articles
                </ThemedText>
                <LinearGradient colors={["#540093", "#b400f3"]} start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={styles.articleCardsContainer}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
                        {newArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </ScrollView>
                </LinearGradient>

                {/* Button to add a new article */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("./AddArticle")}
                >
                    <ThemedText>Add New Article</ThemedText>
                </TouchableOpacity>

                {/* Categories Section */}
                <ThemedText type="title" style={styles.sectionHeader}>
                    Browse by Category
                </ThemedText>
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}

                {/* Button to add a new category */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("./AddCategory")}
                >
                    <ThemedText>Add New Category</ThemedText>
                </TouchableOpacity>

                {/* Trending Articles Section */}
                <ThemedText type="title" style={styles.sectionHeader}>
                    Trending Articles
                </ThemedText>
                {trendingArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    scrollView: {
        padding: 16,
    },
    horizontalScroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
    },
    articleCardsContainer: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 12,
    },
    sectionHeader: {
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#9C3FE4",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    subBoxHeaderContainer: {
        marginBottom: 8,
    },
    subBoxHeaderText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
        textDecorationLine: "underline",
    },
    subBoxContent: {
        borderColor: "#222",
        borderWidth: 1,
        height: 100,
    },
});
