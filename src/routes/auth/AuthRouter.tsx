import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/auth/AuthContext";

export const AuthRouter = () => {
    const { status } = useContext(AuthContext);

    if (status === 'authenticated') return <Navigate to="/panel" />;

    return <Outlet />;

}
