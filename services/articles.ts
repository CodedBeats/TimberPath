import { db } from '@/config/Config';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const articlesCollection = collection(db, "Articles");

export async function getArticles() {
  const q = query(articlesCollection, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const articles: any[] = [];
  querySnapshot.forEach(docSnap => {
    articles.push({ id: docSnap.id, ...docSnap.data() });
  });
  return articles;
}

export async function getArticleById(articleId: string) {
  const docRef = doc(db, "Articles", articleId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Article not found");
  }
}

export async function getNewArticles(limit = 10) {
  const q = query(articlesCollection, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const articles: any[] = [];
  querySnapshot.forEach(docSnap => {
    articles.push({ id: docSnap.id, ...docSnap.data() });
  });
  return articles.slice(0, limit);
}

export async function getTrendingArticles(limit = 10) {
  const q = query(
    articlesCollection,
    where("trending", "==", true),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const articles: any[] = [];
  querySnapshot.forEach(docSnap => {
    articles.push({ id: docSnap.id, ...docSnap.data() });
  });
  return articles.slice(0, limit);
}

export async function getArticlesByCategory(categoryId: string) {
  const q = query(
    articlesCollection,
    where("categoryId", "==", categoryId),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const articles: any[] = [];
  querySnapshot.forEach(docSnap => {
    articles.push({ id: docSnap.id, ...docSnap.data() });
  });
  return articles;
}

export async function addArticle(articleData: any) {
  const docRef = await addDoc(articlesCollection, articleData);
  return docRef.id;
}

export async function updateArticle(articleId: string, articleData: any) {
  const docRef = doc(db, "Articles", articleId);
  await updateDoc(docRef, articleData);
}

export async function deleteArticle(articleId: string) {
  const docRef = doc(db, "Articles", articleId);
  await deleteDoc(docRef);
}


export async function searchArticles(queryStr: string) {
  if (!queryStr) return [];
  const lowerQuery = queryStr.toLowerCase();
  const q = query(
    articlesCollection,
    where("keywords", "array-contains", lowerQuery)
  );
  const querySnapshot = await getDocs(q);
  const articles: any[] = [];
  querySnapshot.forEach(docSnap => {
    articles.push({ id: docSnap.id, ...docSnap.data() });
  });
  return articles;
}