import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react"

// components
import { PrimaryBtn } from "@/components/btns/PrimaryBtn";


export default function TimberGuide() {
    const router = useRouter()

    // criteria state
    const [selectedWoodCriteria, setSelectedWoodCriteria] = useState({
        application: "",
        bfr: "",
        exposure: "",
        hardness: "",
    })
    useEffect(() => {
        console.log(selectedWoodCriteria)
    }, [selectedWoodCriteria])


    // handle btn for select wood criteria
    const handleHardnessCriteriaBtn = (value: string) => {
        // set hardness
        setSelectedWoodCriteria({...selectedWoodCriteria, hardness: value})
        // update style
        
    }


    // handle submit
    const handleSubmit = () => {
        // route to suggested timber passing selected criteria
        router.push({
            pathname: "/(tabs)/timberGuide/GuidesSuggestedWoods",
            params: { criteria: JSON.stringify(selectedWoodCriteria) },
        })
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            {/* header */}
            <LinearGradient
                colors={["#32003F", "#4C007A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.topBox}
            >
                <Text style={styles.header}>Timber Guide</Text>
                <Text style={styles.subText}>
                    Answer a few questions to find the best timber for your
                    needs.
                </Text>
            </LinearGradient>

            {/* questions */}
            <ScrollView style={styles.middleBox}>
                <LinearGradient
                    colors={["#32003F", "#4C007A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBox}
                >
                    {/* question: application? */}
                    <View style={styles.subBox}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>
                                What is your application?
                            </Text>
                            <TouchableOpacity style={styles.infoIcon}>
                                <Text style={styles.infoText}>(i)</Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            selectedValue={selectedWoodCriteria.application}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedWoodCriteria({...selectedWoodCriteria, application: itemValue})
                            }>
                            <Picker.Item label="Not applicable" value="null" />
                            <Picker.Item label="Windows" value="A1" />
                            <Picker.Item label="Doors" value="A2" />
                            <Picker.Item label="Cladding" value="A3" />
                            <Picker.Item label="Decking" value="A4" />
                        </Picker>
                    </View>

                    {/* question: exposure */}
                    <View style={styles.subBox}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>
                                What is the exposure?
                            </Text>
                            <TouchableOpacity style={styles.infoIcon}>
                                <Text style={styles.infoText}>(i)</Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            selectedValue={selectedWoodCriteria.exposure}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedWoodCriteria({...selectedWoodCriteria, exposure: itemValue})
                            }>
                            <Picker.Item label="Not applicable" value="null" />
                            <Picker.Item label="In-ground" value="E1" />
                            <Picker.Item label="Above ground exposed" value="E2" />
                            <Picker.Item label="Above ground protected" value="E3" />
                            <Picker.Item label="Internal" value="E4" />
                        </Picker>
                    </View>

                    {/* question: bush fire resistance */}
                    <View style={styles.subBox}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>
                                Does it need a certain level of Bush Fire resistance?
                            </Text>
                            <TouchableOpacity style={styles.infoIcon}>
                                <Text style={styles.infoText}>(i)</Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            selectedValue={selectedWoodCriteria.bfr}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedWoodCriteria({...selectedWoodCriteria, bfr: itemValue})
                            }>
                            <Picker.Item label="Not applicable" value="null" />
                            <Picker.Item label="BAL-LOW" value="B1" />
                            <Picker.Item label="BAL-12.5" value="B2" />
                            <Picker.Item label="BAL-19" value="B3" />
                            <Picker.Item label="BAL-29" value="B4" />
                            <Picker.Item label="BAL-40" value="B5" />
                            <Picker.Item label="BAL-FZ" value="B6" />
                        </Picker>
                    </View>

                    {/* question: hardness */}
                    <View style={styles.subBox}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>
                            Is Hardness important?
                            </Text>
                            <TouchableOpacity style={styles.infoIcon}>
                                <Text style={styles.infoText}>(i)</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.multiButton} onPress={() => handleHardnessCriteriaBtn("H1")}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.multiButton} onPress={() => handleHardnessCriteriaBtn("H2")}>
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.multiButton} onPress={() => handleHardnessCriteriaBtn("null")}>
                                <Text style={styles.buttonText}>Not Sure</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>

            {/* view suggestions btn container */}
            <View style={styles.bottomBox}>
                <PrimaryBtn
                    text="View Suggestions"
                    onPress={handleSubmit}
                    fontSize={16}
                />
            </View>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    topBox: {
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#000",
        borderBottomWidth: 2,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
        color: "#fff",
    },
    subText: {
        fontSize: 14,
        textAlign: "left",
        color: "#ccc",
    },
    middleBox: {
        flex: 1,
        marginHorizontal: 16,
        ...Platform.select({
            ios: {
                maxHeight: "65%",
            },
            android: {
                // maxHeight: 80,
            },
        }),
    },
    gradientBox: {
        padding: 10,
    },
    subBox: {
        backgroundColor: "#240033",
        borderRadius: 10,
        padding: 8,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    infoIcon: {
        padding: 4,
    },
    infoText: {
        fontSize: 14,
        color: "#007BFF",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // width: "40%",
    },
    singleButton: {
        flex: 1,
        width: "100%",
        backgroundColor: "#444",
        padding: 6,
        borderRadius: 8,
        alignItems: "center",
    },
    multiButton: {
        flex: 1,
        backgroundColor: "#444",
        padding: 6,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 4,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "400",
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
    wideButton: {
        backgroundColor: "#9C3FE4",
        padding: 12,
        borderRadius: 10,
        width: "70%",
    },
    wideButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
