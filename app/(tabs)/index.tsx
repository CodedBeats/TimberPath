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
    // get user from auth
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    // products
    const [products, setProducts] = useState<any[]>([]);
    // education data
    const [newArticles, setNewArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // contexts
    const db = useDB();

    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingNewArticles, setLoadingNewArticles] = useState(true);

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
                    <LinearGradient
                        colors={["#180121", "#520073"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox1]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                Featured Products
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            {loadingProducts ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={
                                        Platform.OS === "web"
                                    }
                                    contentContainerStyle={
                                        styles.featuredScrollContainer
                                    }
                                    style={styles.featuredScroll}
                                >
                                    {featuredProducts.map((product) => (
                                        <View
                                            key={product.id}
                                            style={styles.productWrapper}
                                        >
                                            <ProductCard product={product} />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>

                    {/* Articles categories */}
                    <LinearGradient
                        colors={["#5c1f03", "#e87809"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox2]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                Browse Articles by Category
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            {loadingCategories ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={
                                        Platform.OS === "web"
                                    }
                                    contentContainerStyle={
                                        styles.categoryScrollContainer
                                    }
                                    style={styles.categoryScroll}
                                >
                                    {categories.map((category) => (
                                        <View
                                            key={category.id}
                                            style={styles.categoryWrapper}
                                        >
                                            <CategoryCard category={category} />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>

                    {/* New Articles education */}
                    <LinearGradient
                        colors={["#180121", "#520073"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox1]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                New Articles
                            </Text>
                        </View>
                        <View style={styles.subBoxContent}>
                            {loadingNewArticles ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={
                                        Platform.OS === "web"
                                    }
                                    contentContainerStyle={
                                        styles.featuredScrollContainer
                                    }
                                    style={styles.featuredScroll}
                                >
                                    {newArticles.map((article) => (
                                        <View
                                            key={article.id}
                                            style={styles.productWrapper2}
                                        >
                                            <ArticleCard article={article} />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </LinearGradient>
                </View>

                {/* only display for admins */}
                {userData.admin && (
                    <View style={styles.bottomBox}>
                        <PrimaryBtn
                            text="Add Product"
                            onPress={() => router.push("/(admin)/AddProduct")}
                            fontSize={16}
                        />
                        <PrimaryBtn
                            text="Add Supplier"
                            onPress={() => router.push("/(admin)/AddSupplier")}
                            fontSize={16}
                        />
                        <PrimaryBtn
                            text="Add Wood"
                            onPress={() => router.push("/(admin)/AddWood")}
                            fontSize={16}
                        />
                    </View>
                )}
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
        marginBottom: 20,
    },
    largeBox1: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3, // android shadow
    },
    largeBox2: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3, // android shadow
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
        height: 230,
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
    featuredScroll: {
        overflowX: "auto",
    },
    featuredScrollContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    productWrapper: {
        width: 450,
        marginRight: 12,
    },
    productWrapper2: {
        //width: 250,
        height: 230,
        marginRight: 12,
    },
    categoryScroll: {
        overflowX: "auto",
    },
    categoryScrollContainer: {
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    categoryWrapper: {
        marginRight: 20,
    },
    bottomBox: {
        marginTop: 10,
        padding: 8,
        alignItems: "center",
    },
});
