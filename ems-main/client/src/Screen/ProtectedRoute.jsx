// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, Component }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));

    const isAuthenticated = !!user;
    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return (<>
        {Component}
    </>);
};

export default ProtectedRoute;

 