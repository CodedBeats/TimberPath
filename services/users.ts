// dependencies
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Config";


export const getUserByUID = async (uid: any) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        console.error("error fetching user:", error);
        return null;
    }
};
