import { db } from '@/config/Config';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const categoriesCollection = collection(db, "Categories");

export async function getCategories() {
  const q = query(categoriesCollection, orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);
  const categories: any[] = [];
  querySnapshot.forEach(docSnap => {
    categories.push({ id: docSnap.id, ...docSnap.data() });
  });
  return categories;
}

export async function getCategoryById(categoryId: string) {
  const docRef = doc(db, "Categories", categoryId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Category not found");
  }
}

export async function addCategory(categoryData: any) {
  const docRef = await addDoc(categoriesCollection, categoryData);
  return docRef.id;
}

export async function updateCategory(categoryId: string, categoryData: any) {
  const docRef = doc(db, "Categories", categoryId);
  await updateDoc(docRef, categoryData);
}

export async function deleteCategory(categoryId: string) {
  const docRef = doc(db, "Categories", categoryId);
  await deleteDoc(docRef);
}
