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
import { ThemedText } from "../../../components/ThemedText";

// services
import { getCategories } from "../../../services/categories";
import {
    getNewArticles,
    getTrendingArticles,
} from "../../../services/articles";
import { getUserByUID } from "../../../services/users";

// context
import { useAuth } from "@/contexts/AuthContext";

// components
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { HeaderWithoutCart } from "../../../components/header/SimpleHeader";
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";


export default function Education() {
    const router = useRouter();
    // get user from auth
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    // education data
    const [newArticles, setNewArticles] = useState<any[]>([]);
    const [trendingArticles, setTrendingArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // user data
        async function fetchUserData() {
            try {
                const userData = await getUserByUID(user?.uid);
                console.log("user data:", userData);
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        }
        // education data
        async function fetchData() {
            try {
                const [newData, categoriesData] =
                    await Promise.all([
                        getNewArticles(5),
                        getCategories(),
                    ]);
                const allTrending = await getTrendingArticles(100);
                const shuffledTrending = allTrending.sort(() => 0.5 - Math.random()).slice(0, 5);
                setTrendingArticles(shuffledTrending);
                setNewArticles(newData);
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        // fetch all data
        fetchUserData();
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
                
                <View style={styles.container}>
                    {/* New Articles Section */}
                    <ThemedText type="title" style={styles.sectionHeader}>
                        New Articles
                    </ThemedText>
                    <LinearGradient
                        colors={["#540093", "#b400f3"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.articleCardsContainer}
                    >
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {newArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </ScrollView>
                    </LinearGradient>

                    {/* Categories Section */}
                    <ThemedText type="title" style={styles.sectionHeader}>
                        Browse by Category
                    </ThemedText>
                    <LinearGradient
                        colors={["#8c4b10", "#ffab00"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.articleCardsContainer}
                    >
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </ScrollView>
                    </LinearGradient>

                    {/* Trending Articles Section */}
                    <ThemedText type="title" style={styles.sectionHeader}>
                        Trending Articles
                    </ThemedText>
                    <LinearGradient
                        colors={["#540093", "#b400f3"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.articleCardsContainer}
                    >
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {trendingArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </ScrollView>
                    </LinearGradient>
                </View>
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
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    horizontalScroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
        // marginBottom: 20,
    },
    articleCardsContainer: {
        padding: 10,
        marginBottom: 40,
        borderRadius: 12,
    },
    sectionHeader: {
        marginBottom: 12,
        color: "#fff",
    },
    button: {
        backgroundColor: "#9C3FE4",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
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
