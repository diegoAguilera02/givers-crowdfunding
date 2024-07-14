import { createContext, useEffect, useReducer, useState } from "react";
import { AuthState, authReducer } from "./authReducer";

import { signInWithGoogle, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { User } from '../../interfaces/User';
import { addDocument } from "../../firebase/service";
import { AuthResponse } from "../../interfaces/AuthResponse";
import { registerUserWithEmailAndPassword } from "../../firebase/providers";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/config";
import LoadingSpinner from "../../components/LoadingSpinner";

type AuthContextProps = {
    user: User | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    loading: boolean,
    startGoogleSignIn: () => void,
    startLoginWithEmailAndPasssword: (email: string, password: string) => Promise<AuthResponse>,
    startLogout: () => void,
    startCreatingUserWithEmailAndPassword: (email: string, password: string, name: string) => Promise<AuthResponse>
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null,
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider: React.FC = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, (authUser) => {
            if (authUser) {
                dispatch({
                    type: "auth",
                    payload: {
                        user: {
                            googleUID: authUser?.uid,
                            name: authUser?.displayName,
                            email: authUser?.email,
                            status: true,
                            profile: 'Client',
                            photoURL: authUser?.photoURL
                        }
                    }
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);



    const startGoogleSignIn = async () => {
        const result = await signInWithGoogle();

        if (!result.success) {

            dispatch({
                type: "not-authenticated"
            });

            // console.log('Error', result.errorMessage);
        }

        const { displayName, email, photoURL } = result.user;


        // Format user data
        const userData = {
            name: displayName,
            email,
            photoURL
        }

        // Save user in the DB
        await addDocument('users', userData);

        return dispatch({
            type: "auth",
            payload: {
                user: {
                    googleUID: uid,
                    name: displayName,
                    email,
                    status: true,
                    profile: 'Client',
                    photoURL
                }
            }
        });
    }

    const startCreatingUserWithEmailAndPassword = async (name: string, email: string, password: string): Promise<AuthResponse> => {
        const { success, uid, email: userEmail, photoURL, displayName, errorMessage } = await registerUserWithEmailAndPassword(name, email, password);

        if (!success) {
            dispatch({
                type: "not-authenticated"
            });

            return {
                success,
                errorMessage
            };
        }


        // Format user data
        const userData = {
            googleUID: uid,
            name: displayName,
            email: userEmail,
            photoURL
        }

        // Save user in the DB
        await addDocument('users', userData);

        // TODO: Call to dispatch to save user in the state

        dispatch({
            type: "auth",
            payload: {
                user: {
                    googleUID: uid,
                    name: displayName,
                    email,
                    status: true,
                    profile: 'Client'
                }
            }
        });

        return {
            success,
        };
    }

    const startLoginWithEmailAndPasssword = async (email: string, password: string): Promise<AuthResponse> => {

        const { success, displayName, userEmail, uid, photoURL, errorMessage } = await loginWithEmailAndPassword(email, password);

        if (!success) {
            dispatch({
                type: "not-authenticated",
            });

            return {
                success,
                errorMessage
            };
        }

        dispatch({
            type: "auth",
            payload: {
                user: {
                    name: displayName,
                    email: userEmail,
                    status: true,
                    profile: 'Client',
                    photoURL: photoURL
                }
            }
        });
    }

    const startLogout = async () => {
        await logoutFirebase();

        dispatch({
            type: "logout"
        });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                loading,
                startGoogleSignIn,
                startLoginWithEmailAndPasssword,
                startLogout,
                startCreatingUserWithEmailAndPassword
            }}
        >

            {loading ? <LoadingSpinner /> : children}
        </AuthContext.Provider >
    )

}