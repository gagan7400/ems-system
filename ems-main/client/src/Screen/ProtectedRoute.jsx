import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ Component }) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("admin");
    console.log(token, user)
    if (user && token) {
        console.log("not login")
    } else {
        return <Navigate to="/login" />
    }
    return (
        <>
            {Component}
        </>
    )
}
