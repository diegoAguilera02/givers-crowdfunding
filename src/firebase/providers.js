import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ display: 'popup' });


export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;

        return {
            success: true,
            // User info
            // displayName, email, photoURL, uid
            user
        }
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        return {
            success: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailAndPassword = async ({ email, password, name }) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;
        // TODO: Update displayName with Firebase
        await updateProfile(FirebaseAuth.currentUser, {
            displayName: name
        });

        return {
            success: true,
            uid, email, photoURL, displayName: name
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }
}


export const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, email: userEmail, uid, photoURL } = response.user;
        return {
            success: true,
            displayName, email: userEmail, uid, photoURL
        }
    } catch (error) {
        console.log(error.message);
        return {
            success: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}