/* eslint-disable @typescript-eslint/no-explicit-any */
// firebaseService.ts

import { Foundation } from "../interfaces/Foundation";
import { User } from "../interfaces/User";
import { FirebaseDB } from "./config";
import {
  collection,
  doc,
  addDoc,
  query,
  getDoc,
  getDocs,
  where,
  GeoPoint
} from "firebase/firestore";

export const addDocument = async (collectionName: string, data: any) => {
  try {
    await addDoc(collection(FirebaseDB, collectionName), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const checkIfDocumentExists = async (
  collectionName: string,
  fieldName: string,
  value: string
): Promise<boolean> => {
  const q = query(collection(FirebaseDB, collectionName), where(fieldName, '==', value));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
};

export const getUserByUid = async (uid: string): Promise<User | null> => {
  try {
    const usersCollection = collection(FirebaseDB, 'users');
    const q = query(usersCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // Assuming uid is unique and there's only one document
      return userDoc.data() as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by UID:', error);
    return null;
  }
};

export const getUsersSelect = async () => {
  try {
    const q = query(collection(FirebaseDB, "users"),
      where("profile", "!=", 'Admin'));

    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, email, profile } = doc.data();
      users.push({
        id: doc.id,
        name,
        email,
        profile
      });
    });

    return users;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getFoundations = async () => {
  try {
    const q = query(collection(FirebaseDB, "foundations"),
      where("status", "==", true));

    const querySnapshot = await getDocs(q);

    const foundations = [];
    querySnapshot.forEach((doc) => {

      const { name, country, city, address, fono } = doc.data();
      foundations.push({
        id: doc.id,
        name,
        country,
        city,
        address,
        fono
        // ...doc.data(),
      });
    });

    return foundations;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getCampaigns = async () => {
  try {
    const q = query(collection(FirebaseDB, "campaigns"),
      where("status", "==", true));

    const querySnapshot = await getDocs(q);

    const campaigns = [];
    querySnapshot.forEach((doc) => {

      const { name, description, initDate, endDate, isCause, isExperience, cumulativeAmount, requestAmount, donorsCount, multimedia } = doc.data();
      campaigns.push({
        id: doc.id,
        name,
        description,
        initDate,
        endDate,
        isCause,
        isExperience,
        cumulativeAmount,
        requestAmount,
        donorsCount,
        multimedia
        // ...doc.data(),
      });
    });

    return campaigns;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getCampaign = async (id: string) => {
  try {
    const docRef = doc(FirebaseDB, "campaigns", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const { name, description, initDate, endDate, isCause, isExperience, cumulativeAmount, requestAmount, donorsCount, multimedia, foundation, createdAt } = docSnapshot.data();
      return {
        id: docSnapshot.id,
        name,
        description,
        initDate,
        endDate,
        isCause,
        isExperience,
        cumulativeAmount,
        requestAmount,
        donorsCount,
        multimedia,
        foundation,
        createdAt
      };
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getFoundationsSelect = async () => {
  try {
    const q = query(collection(FirebaseDB, "foundations"),
      where("status", "==", true));

    const querySnapshot = await getDocs(q);

    const foundations = [];
    querySnapshot.forEach((doc) => {

      const { name } = doc.data();
      foundations.push({
        id: doc.id,
        name
        // ...doc.data(),
      });
    });

    return foundations;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getCategories = async () => {
  try {
    const q = query(collection(FirebaseDB, "categories"));

    const querySnapshot = await getDocs(q);

    const categories = [];
    querySnapshot.forEach((doc) => {

      const { name, icon } = doc.data();
      categories.push({
        id: doc.id,
        name,
        icon
      });
    });

    return categories;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const addFoundation = async (data: Foundation) => {
  try {

    const { name, fono, lat, lng, country, city, address, confidenceLevel, responsible } = data;

    // Convert location to a GeoPoint
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const geoPoint = new GeoPoint(latitude, longitude);

    // Convert responsible ID to a Firestore reference
    const userRef = doc(FirebaseDB, 'users', responsible);

    const response = await addDoc(collection(FirebaseDB, 'foundations'), {
      name,
      fono,
      country,
      city,
      address,
      confidenceLevel,
      geoPoint,
      status: true,
      responsible: userRef
    });

    console.log(response);
    return {
      success: true
    };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

