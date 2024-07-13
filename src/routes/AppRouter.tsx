import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthRouter } from "./auth/AuthRouter";
import { authRoutes } from "./auth/authRoutes";

import { GiversRouter } from "./givers/GiversRouter";
import { giversRoutes } from "./givers/giversRoutes";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
// import CheckingAuth from "../ui/components/CheckingAuth";

// import { useCheckAuth } from "../hooks/useCheckAuth";

const router = createBrowserRouter([
    // Public Routes
    {
        path: "/*",
        element: <AuthRouter />,
        children: authRoutes,
        errorElement: <><h2>ERROR</h2></>
    },
    // Private Routes
    {
        path: "/panel/*",
        element: <GiversRouter />,
        children: giversRoutes,
        errorElement: <><h2>ERROR</h2></>
    }
]);


export const AppRouter = () => {
    const status = useContext(AuthContext);

    // if (status === 'checking') return <CheckingAuth />

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}