import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadArticleImage(fileUri: string, fileName: string) {
  const response = await fetch(fileUri);
  const blob = await response.blob();
  const storageRef = ref(storage, `articles/${fileName}`);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
