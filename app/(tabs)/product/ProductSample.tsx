import { useRouter } from "expo-router"
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

const ProductSample = () => {
    const router = useRouter()
  
    return (
        <SafeAreaView style={styles.container}>
            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: "https://pacificdragons.com.au//app/uploads/apply_varnish.jpeg" }} 
                    style={styles.image} 
                />
            </View>

            {/* Product Details */}
            <LinearGradient colors={["#410051", "#000"]} style={styles.detailsContainer}>
                <Text style={styles.productName}>Exterior Timber Varnish</Text>
                <Text style={styles.productAmount}>500ml</Text>
                
                <Text style={styles.productDescriptionName}>Description</Text>
                <ScrollView>
                    <Text style={styles.productDescription}>
                        Protect and enhance outdoor wood with this durable, weather-resistant varnish. 
                        Perfect for decks, fences, and furniture, it provides a clear semi-gloss finish 
                        that highlights the wood grain while shielding against UV rays and water damage. 
                        Easy to apply and quick-drying, it’s ideal for small to medium projects.
                    </Text>
                </ScrollView>
            </LinearGradient>

            {/* Price & Add to Cart */}
            <View style={styles.priceBuyContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.price}>$15.50</Text>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={() => console.log("Add to Cart")}>
                    <Text style={styles.addToCartText}>Add to Cart +</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    imageContainer: {
        // width: "100%",
        height: 200,
        marginHorizontal: 16,
        overflow: "hidden",
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    detailsContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        elevation: 2,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 4,
    },
    productAmount: {
        fontSize: 16,
        color: "#B0B0B0",
        marginBottom: 12,
    },
    productDescriptionName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 8,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#555",
    },
    productDescription: {
        fontSize: 14,
        color: "#D0D0D0",
        marginTop: 4,
        lineHeight: 20,
        overflow: "hidden",
    },
    priceBuyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingTop: 0,
        marginBottom: 25,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 16,
        color: "#A0A0A0",
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fab700",
    },
    addToCartButton: {
        backgroundColor: "#f17700",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
    },
    addToCartText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default ProductSample;
