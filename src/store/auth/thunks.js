import { signInWithGoogle, registerUserWithEmailAndPassword, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "."

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.success) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
};

export const startCreatingUserWithEmailAndPassword = ({ email, password, name }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { success, uid, photoURL, displayName, errorMessage } = await registerUserWithEmailAndPassword({ email, password, name });

        if (!success) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, photoURL, displayName }));
    }
}

export const startLoginWithEmailAndPasssword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { success, uid, photoURL, displayName, errorMessage } = await loginWithEmailAndPassword({ email, password });

        if (!success) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, photoURL, displayName }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout({}));
    }
}