import React, { useState } from 'react'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    let nav = useNavigate()
    let logout = () => {
        localStorage.clear();
        nav("/")
    }
    let name = JSON.parse(localStorage.getItem("user"))
    return (
        <div className="flex bg-gray-300 h-screen fixed w-screen">
            <aside className={`z-3 flex flex-col text-gray-300 bg-gray-800 transition-all duration-300 ease-in-out ${isSidebarExpanded ? "w-64" : "w-20"} min-h-[550px]`} >
                <NavLink to="/dashboard" className="h-20 flex items-center px-4 bg-gray-900 hover:text-gray-100 hover:bg-opacity-50 focus:outline-none focus:text-gray-100 focus:bg-opacity-50 overflow-hidden">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-12 w-12 flex-shrink-0">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className={`ml-2 text-xl font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>Dashboard</span>
                </NavLink>
                <nav className="p-4 space-y-2 font-medium">
                    <NavLink to='/dashboard/createemp' className="flex items-center h-10 px-3 hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline" >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 flex-shrink-0">
                            <path d={"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"} />
                        </svg>
                        <span className={`ml-2 duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>Create Employee</span>
                    </NavLink>
                    <NavLink to="/dashboard/emplist" className="flex items-center h-10 px-3 hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline" >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 flex-shrink-0">
                            <path d={"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"} />
                        </svg>
                        <span className={`ml-2 duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>All Employee List</span>
                    </NavLink>
                    <NavLink to="/dashboard/creattask" className="flex items-center h-10 px-3 hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline" >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 flex-shrink-0">
                            <path d={"M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"} />
                        </svg>
                        <span className={`ml-2 duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>CreateTask</span>
                    </NavLink>
                    <NavLink to="/dashboard/viewtask" className="flex items-center h-10 px-3 hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline" >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 flex-shrink-0">
                            <path d={"M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"} />
                        </svg>
                        <span className={`ml-2 duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}> ViewTask</span>
                    </NavLink>
                </nav>
                <div className="border-t border-gray-700 p-4 font-medium mt-auto">
                    <button onClick={logout} className="flex items-center h-10 px-3 hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline" >
                        <img src="/logout.svg" alt="" />
                        <span className={`ml-2 duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>Logout</span>
                    </button>
                </div>
            </aside>
            <div className={`flex-1 flex flex-col   w-96`}>
                <header className="h-20 flex items-center justify-between px-6 bg-white ">
                    <button className="p-2 -ml-2 mr-2 z-50" onClick={() => {
                        console.log("cliecked")
                        setIsSidebarExpanded(!isSidebarExpanded)
                    }}  >
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 transform ${isSidebarExpanded ? "rotate-180" : "rotate-0"}`} >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="4" y1="6" x2="14" y2="6" />
                            <line x1="4" y1="18" x2="14" y2="18" />
                            <path d="M4 12h17l-3 -3m0 6l3 -3" />
                        </svg>
                    </button>
                    <NavLink to={`/dashboard/profile`}><div className='  flex items-center justify-between gap-5 px-6 bg-white '>
                        <img className='w-10 h-10 p-1 rounded-full  object-center ring-2 ring-gray-300 dark:ring-gray-500' src={name ? name.image.path : "users.svg"} alt="" />
                        <span className="font-medium">{name ? name.name : "Header"}</span>
                    </div></NavLink>
                </header>
                <main className="text-neutral-950 flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}
