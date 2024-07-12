import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthContext } from "../context/auth/AuthContext";

import { AuthRouter } from "./auth/AuthRouter";
import { authRoutes } from "./auth/authRoutes";
import { GiversRouter } from "./givers/GiversRouter";
import { giversRoutes } from "./givers/giversRoutes";



const router = createBrowserRouter([

    // Public Routes
    {
        path: "/*",
        element: <AuthRouter />,
        children: authRoutes,
        errorElement: <><h2>ERROR</h2></>
    }
    ,
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

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
};


