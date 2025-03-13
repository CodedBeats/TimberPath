import { db } from '@/config/Config';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";

const woodsCollection = collection(db, "woods");

export async function getWoods() {
  const q = query(woodsCollection, orderBy("commonName", "asc"));
  const querySnapshot = await getDocs(q);
  const woods: any[] = [];
  querySnapshot.forEach(docSnap => {
    woods.push({ id: docSnap.id, ...docSnap.data() });
  });
  return woods;
}

export async function addWood(woodData: any) {
  const docRef = await addDoc(woodsCollection, woodData);
  return docRef.id;
}
