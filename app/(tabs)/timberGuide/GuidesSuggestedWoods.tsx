import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";

// services
import { getWoods } from "@/services/woods";
import WoodCard from "@/components/cards/WoodCard";


export default function GuidesSuggestedWoods() {
    const router = useRouter()
    const [woods, setWoods] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filteredWoods, setFilteredWoods] = useState<any>([]);
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
                // check only remaining criteria match wood
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


    // useEffect to calculate filteredWoods only when woods or passedCriteria changes (stops trigering re-renders)
    useEffect(() => {
        try {
            if (woods.length > 0 && passedCriteria) {
                const result = filterWoods(woods, passedCriteria);
                setFilteredWoods(result);
            } else {
                setFilteredWoods(woods);
            }
        } catch (error) {
            console.error("error filtering woods:", error);
        } finally {
            setLoading(false);
        }
    }, [woods]);


    // debug
    useEffect(() => {
        if (woods.length > 0 && passedCriteria) {
            //console.log("woods:", woods)
            console.log("selected criteria:", passedCriteria)
            console.log("filtered woods:", filteredWoods)
            //console.log("filtered woods:", filteredWoods.map(wood => wood.commonName))
        }
    }, [])



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

            {/* suggested woods */}
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.woodsGrid}>
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : filteredWoods.length > 0 ? (
                    filteredWoods.map((wood: any) => (
                        <WoodCard key={wood.id} wood={wood} isFromSearch={false} />
                    ))
                ) : (
                    <Text style={styles.noResultsText}>
                        No matching woods found. You can try adjusting your search criteria.
                    </Text>
                )}
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
        marginBottom: 30,
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
    scrollContainer: {
        padding: 10,
        paddingHorizontal: 16
    },
    woodsGrid: {
      display: "flex",
      flexDirection: "row",  
      flexWrap: "wrap",
      gap: 30,
      justifyContent: "center",
    },
    noResultsText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 20,
    }
});
