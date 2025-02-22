import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient'

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext"
import { useDB } from "@/contexts/DBContext"

// components
import { PrimaryBtn } from "@/components/btns/PrimaryBtn"


export default function TimberGuide() {
  const router = useRouter()
  const { user, userEmail, logout } = useAuth()

  // TODO: fix later to take from state
  const selectedWoodCriteriaData = {
    woodType: "ancient",
    age: "old",
  }

  // contexts
  const db = useDB()


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.topBox}>
        <Text style={styles.header}>Timber Guide</Text>
        <Text style={styles.subText}>Answer a few questions to find the best timber for your needs.</Text>
      </LinearGradient>

      {/* questions */}
      <ScrollView style={styles.middleBox}>
      <LinearGradient colors={["#32003F", "#4C007A"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.gradientBox}>

        {/* question: application? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What is your application?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: outdoor use? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>Is it for outdoor use?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: termite resistance */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>Does it need to be Termite resistant?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: water resistant */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>Does it need to be Water resistant?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: bush fire resistant */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>Does it need to be Bush Fire resistant?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.multiButton}>
              <Text style={styles.buttonText}>N/A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: density */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What level on desity?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: hardness */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What level of hardness?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose ▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      </ScrollView>

      {/* view suggestions btn container */}
      <View style={styles.bottomBox}>
        <PrimaryBtn text="View Suggestions" onPress={() => router.push("/(tabs)/timberGuide/GuidesSuggestedWoods")} fontSize={16} />
      </View>
    </SafeAreaView>
  )
};


// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#fff',
    },
    subText: {
        fontSize: 14,
        textAlign: 'left',
        color: '#ccc',
    },
    middleBox: {
        flex: 1,
        marginHorizontal: 16,
    },
    gradientBox: {
      padding: 10,
    },
    subBox: {
        backgroundColor: '#240033',
        borderRadius: 10,
        padding: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    infoIcon: {
        padding: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#007BFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: "40%",
    },
    singleButton: {
        flex: 1,
        width: "100%",
        backgroundColor: '#444',
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    multiButton: {
        flex: 1,
        backgroundColor: '#444',
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
    },
    bottomBox: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#32003F',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#000",
        borderTopWidth: 3,
    },
    wideButton: {
        backgroundColor: '#9C3FE4',
        padding: 12,
        borderRadius: 10,
        width: "70%",
    },
    wideButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
