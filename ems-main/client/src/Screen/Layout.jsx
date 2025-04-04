import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer.jsx'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
    let location = useLocation();
    let [show, setshow] = useState(true)
    useEffect(() => {
        if (location.pathname.includes("dashboard")) {
            setshow(false)
        }
    }, [location]);

    return (
        <>
            {show && <Navbar />}
            {children}
            {show && <Footer />}
        </>
    )
}
