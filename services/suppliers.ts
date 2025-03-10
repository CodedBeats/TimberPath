import { db } from '@/config/Config';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";

const suppliersCollection = collection(db, "suppliers");

export async function getSuppliers() {
  const q = query(suppliersCollection, orderBy("supplierName", "asc"));
  const querySnapshot = await getDocs(q);
  const suppliers: any[] = [];
  querySnapshot.forEach(docSnap => {
    suppliers.push({ id: docSnap.id, ...docSnap.data() });
  });
  return suppliers;
}

export async function addSupplier(supplierData: any) {
  const docRef = await addDoc(suppliersCollection, supplierData);
  return docRef.id;
}
