import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

// firebase
import { collection, getDocs } from "firebase/firestore";

// services
import { getWoods } from "@/services/woods";


export default function GuidesSuggestedWoods() {
    const router = useRouter()
    const [woods, setWoods] = useState<any[]>([])
    // get selected criteria
    const { criteria } = useLocalSearchParams()
    const passedCriteria = typeof criteria === "string" ? JSON.parse(criteria) : null

    // get all woods that match the criteria
    const filterWoods = (
        woods: {[key: string]: string}[], 
        criteria: {[key: string]: string}
    ) => {
        return woods.filter(wood =>
            Object.entries(criteria)
                // ignore "null" or empty values
                .filter(([_, value]) => value !== "null" && value !== "") 
                // check only remaining criteria
                .every(([key, value]) => wood[key]?.includes(value)) 
        )
    }


    // get woods from db using backend service and filter them based on criteria
    useEffect(() => {
        async function fetchData() {
            try {
                const woodList = await getWoods()
                setWoods(woodList)
            } catch (error) {
                console.error("error fetching woods:", error)
            }
        }
        fetchData()
    }, [])

    // filter woods based on state updates (runds when woods or passedCriteria changes)
    useEffect(() => {
        if (woods.length > 0 && passedCriteria) {
            //console.log("woods:", woods)
            // parsed criteria
            console.log("selected criteria:", passedCriteria)
            
            // filter woods based on criteria
            const filteredWoods = filterWoods(woods, passedCriteria)
            console.log("filtered woods:", filteredWoods)
        }
    }, [woods, passedCriteria])



    return (
        <SafeAreaView style={styles.safeArea}>
            {/* top sub header text */}
            <LinearGradient
                colors={["#32003F", "#4C007A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.connectingHeaderContainer}
            >
                <Text style={styles.headerSubText}>
                    Here are some wood suggestions based on your requirements.
                </Text>
            </LinearGradient>

            {/* scan */}
            <View style={styles.scanContainer}></View>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    connectingHeaderContainer: {
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: "#32003F",
    },
    headerSubText: {
        fontSize: 14,
        textAlign: "left",
        color: "#ccc",
    },
    scanContainer: {
        flex: 1,
        padding: 10,
        marginHorizontal: 16,
        marginBottom: 25,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                maxHeight: "80%",
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
});
