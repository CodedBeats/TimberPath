import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

// firebase
import { collection, getDocs } from "firebase/firestore";

// context
import { useAuth } from "@/contexts/AuthContext";
import { useDB } from "@/contexts/DBContext";


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
      <View style={styles.topBox}>
        <Text style={styles.header}>Timber Guide</Text>
        <Text style={styles.subText}>Answer a few questions to find the best timber for your needs.</Text>
      </View>

      {/* questions */}
      <ScrollView style={styles.middleBox}>
        {/* question: what is your application? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What is your application?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: Does it need to be termite resistant? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>Does it need to be termite resistant?</Text>
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

        {/* question: what is your application? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What is your application?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* question: what is your application? */}
        <View style={styles.subBox}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>What is your application?</Text>
            <TouchableOpacity style={styles.infoIcon}>
              <Text style={styles.infoText}>(i)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.buttonText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* add more */}
      </ScrollView>

      {/* view suggestions btn container */}
      <View style={styles.bottomBox}>
        <TouchableOpacity style={styles.wideButton} onPress={() => router.push({ 
          pathname: "/(tabs)/timberGuide/GuidesSuggestedWoods", 
          // pass as string
          params: { data: JSON.stringify(selectedWoodCriteriaData) } 
        })}>
          <Text style={styles.wideButtonText}>View Suggestions</Text>
        </TouchableOpacity>
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
        backgroundColor: '#32003F',
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
        padding: 10,
        marginHorizontal: 16,
        backgroundColor: '#32003F',
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
    },
    singleButton: {
        flex: 1,
        backgroundColor: '#B64702',
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    multiButton: {
        flex: 1,
        backgroundColor: '#B64702',
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
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
        borderTopWidth: 2,
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
