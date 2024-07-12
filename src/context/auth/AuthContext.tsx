import { createContext, useReducer } from "react";
import { AuthState, authReducer } from "./authReducer";

import { signInWithGoogle, registerUserWithEmailAndPassword, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { User } from "../../interfaces/User";


type AuthContextProps = {
    user: User | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    startGoogleSignIn: () => void,
    startLoginWithEmailAndPasssword: (email: string, password: string) => void,
    startLogout: () => void,
    startCreatingUserWithEmailAndPassword: (email: string, password: string, name: string) => void
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider: React.FC = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const startGoogleSignIn = async () => {
        const result = await signInWithGoogle();

        if (!result.success) {
            console.log('Error', result.errorMessage);
        }

        const { uid, displayName, email, photoURL } = result.user;
        return dispatch({
            type: "auth",
            payload: {
                user: {
                    name: displayName,
                    email,
                    status: true,
                    profile: 'Admin'
                }
            }
        });
    }

    const startCreatingUserWithEmailAndPassword = (email: string, password: string, name: string) => {
        // return async (dispatch) => {
        //     dispatch(checkingCredentials());
        //     const { success, uid, photoURL, displayName, errorMessage } = await registerUserWithEmailAndPassword({ email, password, name });

        //     if (!success) return dispatch(logout({ errorMessage }));

        //     dispatch(login({ uid, email, photoURL, displayName }));
        // }
    }

    const startLoginWithEmailAndPasssword = async (email: string, password: string) => {
        console.log('cerrar sesión');
    }


    const startLogout = async () => {
        await logoutFirebase();
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                startGoogleSignIn,
                startLoginWithEmailAndPasssword,
                startLogout,
                startCreatingUserWithEmailAndPassword
            }}
        >

            {children}
        </AuthContext.Provider >
    )
}