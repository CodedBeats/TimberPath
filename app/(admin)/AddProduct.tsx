import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native"

// context
import { useDB } from "@/contexts/DBContext";

const AddProduct = () => {
    // contexts
    const db = useDB()

    // state
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        stockQuantity: "",
        supplierID: "",
        woodID: "",  // can be null
        description: "",
        imageURL: "",
    })

    // handle inpuit changes
    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }

    // validate and format before submit
    const validateAndSubmit = async () => {
        // destructure form data
        const { description, imageURL, price, productName, stockQuantity, supplierID, woodID } = formData
    
        // check required fields
        if (!description || !imageURL || !price || !productName || !stockQuantity || !supplierID) {
            console.log("validation error", "all fields (except Wood ID) are REQUIIRED")
            return
        }
    
        // convert int fields
        const parsedPrice = parseFloat(price)
        const parsedStockQuantity = parseInt(stockQuantity, 10)
        const parsedSupplierID = parseInt(supplierID, 10)
        const parsedWoodID = woodID ? parseInt(woodID, 10) : null
    
        // ensure data types
        if (isNaN(parsedPrice) || isNaN(parsedStockQuantity) || isNaN(parsedSupplierID)) {
            console.log("validation err", "Price, Product ID, Stock Quantity and Supplier ID MUST be valid numbers")
            return
        }
    
        try {
            // upload to firestore products coll
            await addDoc(collection(db, "products"), {
                description,
                imageURL,
                price: parsedPrice,
                productName,
                stockQuantity: parsedStockQuantity,
                supplierID: parsedSupplierID,
                woodID: parsedWoodID, // can be null
            })
    
            console.log("success", "product added successfully")
            // reset form data
            setFormData({ description: "", imageURL: "", price: "", productName: "", stockQuantity: "", supplierID: "", woodID: "" })

        } catch (error) {
            console.error("err adding product:", error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.header}>Add Product</Text>

                <InputField label="Product Name" value={formData.productName} onChangeText={(val: any) => handleChange("productName", val)} />
                <InputField label="Price ($)" value={formData.price} onChangeText={(val: any) => handleChange("price", val)} keyboardType="numeric" />
                <InputField label="Stock Quantity" value={formData.stockQuantity} onChangeText={(val: any) => handleChange("stockQuantity", val)} keyboardType="numeric" />
                <InputField label="Supplier ID" value={formData.supplierID} onChangeText={(val: any) => handleChange("supplierID", val)} keyboardType="numeric" />
                <InputField label="Wood ID (Optional)" value={formData.woodID} onChangeText={(val: any) => handleChange("woodID", val)} keyboardType="numeric" />
                <InputField label="Description" value={formData.description} onChangeText={(val: any) => handleChange("description", val)} multiline />
                <InputField label="Image URL" value={formData.imageURL} onChangeText={(val: any) => handleChange("imageURL", val)} />

                <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
                    <Text style={styles.submitText}>Add Product</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

interface InputFieldProps {
    label: string
    value: string
    onChangeText: (text: string) => void
    keyboardType?: string
    multiline?: boolean
}

const InputField = ({ label, value, onChangeText, multiline = false }: InputFieldProps) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
            style={[styles.input, multiline && styles.multiline]} 
            value={value} 
            onChangeText={onChangeText} 
            multiline={multiline}
        />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C1C1E",
        paddingTop: 16,
    },
    formContainer: {
        paddingBottom: 30,
        marginHorizontal: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: "#CCC",
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#2A2A2E",
        color: "#FFF",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    multiline: {
        height: 80,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#9C3FE4",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    submitText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default AddProduct;
