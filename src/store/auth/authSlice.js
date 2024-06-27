import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'	
        user: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated',
            state.user = {
                    displayName: payload.displayName,
                    email: payload.email,
                    photoURL: payload.photoURL,
                    uid: payload.uid
            },
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated',
            state.user = null,
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }

    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions; 