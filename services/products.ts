import { db } from "@/config/Config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export async function getProducts() {
  const productsCollection = collection(db, "products");
  const q = query(productsCollection, orderBy("productName", "asc"));
  const querySnapshot = await getDocs(q);
  const products: any[] = [];
  querySnapshot.forEach(docSnap => {
    products.push({ id: docSnap.id, ...docSnap.data() });
  });
  return products;
}
