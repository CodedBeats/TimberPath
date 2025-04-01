import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { PrimaryBtn } from '@/components/btns/PrimaryBtn';
import { useDB } from '@/contexts/DBContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

type RecommendedParams = {
  wood: string;
};

type WoodDetails = {
  id: string;
  commonName: string;
  description?: string;
  imageURL?: string;
  application?: string[];
  bfr?: string[];
  exposure?: string[];
  hardness?: string[];
};

export default function Recommended() {
  const router = useRouter();
  const { wood } = useLocalSearchParams<RecommendedParams>();
  const db = useDB();
  const [woodDetails, setWoodDetails] = useState<WoodDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWoodDetails() {
      if (!wood) {
        setLoading(false);
        return;
      }
      try {
        const woodsCollection = collection(db, "woods");
        const q = query(woodsCollection, where("commonName", "==", wood));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setWoodDetails({ id: docSnap.id, ...docSnap.data() } as WoodDetails);
        } else {
          console.warn("No wood details found for", wood);
        }
      } catch (error) {
        console.error("Error fetching wood details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWoodDetails();
  }, [wood, db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={["#32003F", "#4C007A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.headerText}>
            Recommended Wood
          </ThemedText>
        </LinearGradient>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : woodDetails ? (
          <View style={styles.content}>
            <ThemedText style={styles.woodName}>
              {woodDetails.commonName}
            </ThemedText>
            {woodDetails.imageURL && (
              <Image
                source={{ uri: woodDetails.imageURL }}
                style={styles.woodImage}
              />
            )}
            <ThemedText style={styles.description}>
              {woodDetails.description || "No description available."}
            </ThemedText>
            <ThemedText style={styles.fieldTitle}>Application:</ThemedText>
            <ThemedText style={styles.fieldText}>
              {woodDetails.application ? woodDetails.application.join(", ") : "N/A"}
            </ThemedText>
            <ThemedText style={styles.fieldTitle}>Bush Fire Resistance (BFR):</ThemedText>
            <ThemedText style={styles.fieldText}>
              {woodDetails.bfr ? woodDetails.bfr.join(", ") : "N/A"}
            </ThemedText>
            <ThemedText style={styles.fieldTitle}>Exposure:</ThemedText>
            <ThemedText style={styles.fieldText}>
              {woodDetails.exposure ? woodDetails.exposure.join(", ") : "N/A"}
            </ThemedText>
            <ThemedText style={styles.fieldTitle}>Hardness:</ThemedText>
            <ThemedText style={styles.fieldText}>
              {woodDetails.hardness ? woodDetails.hardness.join(", ") : "N/A"}
            </ThemedText>
          </View>
        ) : (
          <ThemedText style={styles.errorText}>
            No details available for "{wood}".
          </ThemedText>
        )}
        <PrimaryBtn 
          text="Back to Products"
          onPress={() => router.push("/(tabs)/product/Products")}
          fontSize={18}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: { padding: 16 },
  header: { padding: 16, borderRadius: 12, marginBottom: 20, alignItems: "center", justifyContent: "center" },
  headerText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  content: { marginBottom: 20, alignItems: "center" },
  woodName: { color: "#fab700", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { color: "#fff", fontSize: 16, textAlign: "center" },
  errorText: { color: "#fff", fontSize: 18, textAlign: "center" },
  woodImage: { width: 200, height: 200, borderRadius: 8, marginBottom: 20 },
  fieldTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 10 },
  fieldText: { color: "#ccc", fontSize: 16, textAlign: "center" },
});
