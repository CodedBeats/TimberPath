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
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "../../../components/ThemedText"

// services
import { getCategories } from "../../../services/categories";
import {
    getNewArticles,
    getTrendingArticles,
} from "../../../services/articles";

// components
import { ArticleCard } from "@/components/cards/ArticleCard"
import { CategoryCard } from "@/components/cards/CategoryCard"
import { HeaderWithoutCart } from "../../../components/header/SimpleHeader"
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";


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

                    <PrimaryBtn onPress={() => router.push("./AddArticle")} text="Add New Article" />
                </LinearGradient>


                {/* Categories Section */}
                <ThemedText type="title" style={styles.sectionHeader}>
                    Browse by Category
                </ThemedText>
                <LinearGradient colors={["#8c4b10", "#ffab00"]} start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={styles.articleCardsContainer}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </ScrollView>

                    <PrimaryBtn onPress={() => router.push("./AddCategory")} text="Add New Category" />
                </LinearGradient>


                {/* Trending Articles Section */}
                <ThemedText type="title" style={styles.sectionHeader}>
                    Trending Articles
                </ThemedText>
                <LinearGradient colors={["#540093", "#b400f3"]} start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={styles.articleCardsContainer}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
                        {trendingArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </ScrollView>
                </LinearGradient>
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
        marginBottom: 20,
    },
    articleCardsContainer: {
        padding: 10,
        marginBottom: 40,
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
