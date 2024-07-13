// firebaseService.ts

import { FirebaseDB } from "./config";
import { collection, addDoc } from "firebase/firestore";

export const addDocument = async (collectionName: string, data: any) => {
    try {
        await addDoc(collection(FirebaseDB, collectionName), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
