import { db } from "@/config/Config";
import { collection, query, orderBy, getDocs, doc, getDoc, where } from "firebase/firestore";

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

// dunno where to put this function haha. I know this should be backend funcs but I'll leave it here for now
export function formatPrice(price: number) {
  return price.toFixed(2);
}

// get product by woodID
export const getProductByWoodID = async (woodID: string) => {
  try {
    // query firestore for product with woodID
    const q = query(collection(db, "products"), where("woodID", "==", woodID))

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // assuimg one match, get the data
      const productDoc = querySnapshot.docs[0];
      const productData = productDoc.data();

      // add productID to data
      const productWithID = { id: productDoc.id, ...productData };

      console.log("product found:", productWithID);
      return productWithID;
    } else {
      throw new Error("product not found");
    }

  } catch (error) {
      console.error("error fetching:", error)
      return null
  }
};

