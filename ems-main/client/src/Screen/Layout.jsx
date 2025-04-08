import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer.jsx'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
    let location = useLocation();
    let [show, setshow] = useState(true);
    let paths = ["dashboard", "empdashboard"]
    useEffect(() => {
        let currentpath = location.pathname.split("/")[1];
        console.log(paths.includes(currentpath), "ddddd")
        if (paths.includes(currentpath)) {
            setshow(false)
        }else{
            setshow(true)
        }
    }, [location]);
    console.log("call")
    return (
        <>
            {show && <Navbar />}
            {children}
            {show && <Footer />}
        </>
    )
}
