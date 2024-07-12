
import { Navigate } from "react-router-dom";
import { DashboardPage } from "../../pages";
export const giversRoutes = [
    {
        path: "dashboard",
        element: <DashboardPage />
    },
    {
        path: "/panel/*",
        element: <Navigate to={"/panel/dashboard"} />
    }
]