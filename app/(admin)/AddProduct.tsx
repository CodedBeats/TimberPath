import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker";

// context
import { useDB } from "@/contexts/DBContext";
import { getSuppliers } from "@/services/suppliers";

const AddProduct = () => {
    // contexts
    const db = useDB()

    // state
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        stockQuantity: "",
        supplierID: "",
        supplierName: "", // added and it is optional to type a custom name.
        woodID: "",  // can be null
        description: "",
        imageURL: "",
    });

    const [suppliers, setSuppliers] = useState<any[]>([]);

    useEffect(() => {
        async function fetchSuppliers() {
            try {
                const supplierList = await getSuppliers();
                setSuppliers(supplierList);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        }
        fetchSuppliers();
    }, []);

    // handle inpuit changes
    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }

    // validate and format before submit
    const validateAndSubmit = async () => {
        // destructure form data
        const { description, imageURL, price, productName, stockQuantity, supplierID, woodID } = formData;
    
        // check required fields
        if (!description || !imageURL || !price || !productName || !stockQuantity || !supplierID) {
            console.log("validation error", "all fields (except Wood ID) are REQUIIRED");
            Alert.alert("Validation Error", "Please fill in all required fields.");
            return
        }
    
        // convert int fields
        const parsedPrice = parseFloat(price)
        const parsedStockQuantity = parseInt(stockQuantity, 10)
        //const parsedSupplierID = parseInt(supplierID, 10)
        const parsedWoodID = woodID ? parseInt(woodID, 10) : null
    
        // ensure data types
        if (isNaN(parsedPrice) || isNaN(parsedStockQuantity)) {
            console.log("validation err", "Price, Product ID, Stock Quantity and Supplier ID MUST be valid numbers");
            Alert.alert("Validation Error", "Price and Stock Quantity must be valid numbers.");
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
                supplierID,
                supplierName: formData.supplierName, // added and it is optional to type a custom name.
                woodID: parsedWoodID, // can be null
            })
    
            console.log("success", "product added successfully")
            // reset form data
            setFormData({ productName: "", price: "", stockQuantity: "", supplierID: "", supplierName: "", woodID: "", description: "", imageURL: "" });

        } catch (error) {
            console.error("Error adding product:", error);
            Alert.alert("Error", "Failed to add product.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.header}>Add Product</Text>

                <InputField label="Product Name" value={formData.productName} onChangeText={(val: any) => handleChange("productName", val)} />
                <InputField label="Price ($)" value={formData.price} onChangeText={(val: any) => handleChange("price", val)} keyboardType="numeric" />
                <InputField label="Stock Quantity" value={formData.stockQuantity} onChangeText={(val: any) => handleChange("stockQuantity", val)} keyboardType="numeric" />
                {/* Supplier Dropdown */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Supplier</Text>
                    <Picker
                        selectedValue={formData.supplierID}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            // When a supplier is selected, update both supplierID and supplierName
                            const selected = suppliers.find(s => s.id === itemValue);
                            handleChange("supplierID", itemValue);
                            handleChange("supplierName", selected ? selected.supplierName : "");
                        }}
                    >
                        <Picker.Item label="Select Supplier" value="" />
                        {suppliers.map((supplier) => (
                            <Picker.Item key={supplier.id} label={supplier.supplierName} value={supplier.id} />
                        ))}
                    </Picker>
                </View>
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
    picker: {
        backgroundColor: "#2A2A2E",
        color: "#FFF",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
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
