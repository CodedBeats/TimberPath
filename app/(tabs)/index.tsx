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
import {
    getNewArticles,
    getTrendingArticles,
} from "../../services/articles";
import { getUserByUID } from "../../services/users";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";

// components
import { HeaderWithCart } from "../../components/header/SimpleHeader";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import ProductCard from "@/components/cards/ProductCard";



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


    // fetch all user, education and products data
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
        async function fetchEducation() {
            try {

                const [newData, categoriesData] =
                    await Promise.all([
                        getNewArticles(5),
                        getCategories(),
                    ]);
                setNewArticles(newData);
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        // products data
        async function fetchProducts() {
                try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData: any[] = [];
                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        // fetch all data
        fetchUserData();
        fetchEducation();
        fetchProducts();
    }, [db]);


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
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </ScrollView>
                    </LinearGradient>

                    {/* product categories */}
                    <LinearGradient
                        colors={["#5c1f03", "#e87809"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.largeBox, styles.largeBox2]}
                    >
                        <View style={styles.subBoxHeaderContainer}>
                            <Text style={styles.subBoxHeaderText}>
                                Brows Article by Category
                            </Text>
                        </View>
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

                    {/* education */}
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
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {newArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </ScrollView>
                    </LinearGradient>
                </View>
                
                {/* only display for admins */}
                { userData.admin && (
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
        height: 100,
    },
    buttonContainer: {
        marginHorizontal: "20%",
        backgroundColor: "#5588cc",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#f17700",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
        width: "60%",
        alignSelf: "center",
    },
    buttonText: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold" 
    },
    bottomBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#32003F",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#000",
        borderTopWidth: 3,
    },
    horizontalScroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
        // marginBottom: 20,
    },
});
