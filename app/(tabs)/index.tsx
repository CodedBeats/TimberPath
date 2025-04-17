import { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";

// services
import { getCategories } from "../../services/categories";
import { getNewArticles, getTrendingArticles } from "../../services/articles";
import { getUserByUID } from "../../services/users";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader";
import ProductCard from "@/components/cards/ProductCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { getProducts } from "@/services/products";

export default function Index() {
    const router = useRouter();
    // products
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    // education data
    const [newArticles, setNewArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingNewArticles, setLoadingNewArticles] = useState(true);

    const [loading, setLoading] = useState(true);

    // contexts
    const db = useDB();


    useEffect(() => {
        async function fetchProducts() {
            try {
                const productsData = await getProducts();
                // in here I think is better to shuffle the products array and take 10 random products
                const shuffled = productsData.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 10);
                setFeaturedProducts(selected);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoadingProducts(false);
            }
        }
        fetchProducts();
    }, [db]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        }
        fetchCategories();
    }, [db]);

    useEffect(() => {
        async function fetchNewArticles() {
            try {
                const articlesData = await getNewArticles(5);
                setNewArticles(articlesData);
            } catch (error) {
                console.error("Error fetching new articles:", error);
            } finally {
                setLoadingNewArticles(false);
            }
        }
        fetchNewArticles();
    }, [db]);



    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* header */}
                <HeaderWithCart />

                {/* home/dashboard content */}
                <View style={styles.container}>
                    {/* producrs */}
                    <Text style={styles.largeBoxHeader}>
                        Featured Products
                    </Text>
                    <LinearGradient
                        colors={["#540093", "#b400f3"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.largeBox}
                    >
                        <View style={styles.subBoxContent}>
                            {loadingProducts ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal={true}
                                    contentContainerStyle={styles.horizontalScroll}
                                >
                                    {featuredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} isFromSearch={false} />
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>

                    {/* Articles categories */}
                    <Text style={styles.largeBoxHeader}>
                    Browse Articles by Category
                    </Text>
                    <LinearGradient
                        colors={["#8c4b10", "#ffab00"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.largeBox}
                    >
                        <View style={styles.subBoxContent}>
                            {loadingCategories ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal={true}
                                    contentContainerStyle={styles.horizontalScroll}
                                >
                                    {categories.map((category) => (
                                        <CategoryCard key={category.id} category={category} />
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>

                    {/* New Articles education */}
                    <Text style={styles.largeBoxHeader}>
                        New Articles
                    </Text>
                    <LinearGradient
                        colors={["#540093", "#b400f3"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.largeBox}
                    >
                        <View style={styles.subBoxContent}>
                            {loadingNewArticles ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal={true}
                                    contentContainerStyle={styles.horizontalScroll}
                                >
                                    {newArticles.map((article) => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
        ...Platform.select({
            ios: {
                paddingBottom: 80,
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    headerPlaceholder: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#888",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    largeBox: {
        borderRadius: 10,
        padding: 8,
        marginBottom: 30,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3, // android shadow
    },
    subBoxHeaderContainer: {
        marginBottom: 8,
    },
    largeBoxHeader: {
        fontWeight: "bold",
        marginBottom: 8,
        fontSize: 24,
        color: "#fff",
    },
    subBoxContent: {
        // paddingBottom: 20,
    },
    buttonContainer: {
        marginHorizontal: "20%",
        backgroundColor: "#5588cc",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    horizontalScroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
        marginBottom: 5,
    },
});
