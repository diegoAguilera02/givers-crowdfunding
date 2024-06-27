import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthRouter } from "../auth/routes/AuthRouter";
import { authRoutes } from "../auth/routes/authRoutes";

import { JournalRouter } from "../journal/routes/JournalRouter";
import { journalRoutes } from "../journal/routes/journalRoutes";

import CheckingAuth from "../ui/components/CheckingAuth";

import { useCheckAuth } from "../hooks/useCheckAuth";

const router = createBrowserRouter([
    // Public Routes
    {
        path: "/auth/*",
        element: <AuthRouter />,
        children: authRoutes,
        errorElement: <><h2>ERROR</h2></>
    },
    // Private Routes
    {
        path: "/",
        element: <JournalRouter />,
        children: journalRoutes,
        errorElement: <><h2>ERROR</h2></>
    }
]);


export const AppRouter = () => {
    const status = useCheckAuth();

    if (status === 'checking') return <CheckingAuth />

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}