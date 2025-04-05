// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, Component }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = !!user;
    console.log(user)
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

// import React from 'react'
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ Component }) {
//     let token = localStorage.getItem("token");
//     let user = localStorage.getItem("admin");
//     console.log(token, user)
//     if (user && token) {
//         console.log("not login")
//     } else {
//         return <Navigate to="/login" />
//     }
//     return (
//         <>
//             {Component}
//         </>
//     )
// }

 