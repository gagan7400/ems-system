import React from 'react'
import { NavLink } from 'react-router-dom'

export default function DashWelcome() {
    return (
        <div className="relative bg-gray-200 py-20">
            <div className="max-w-3xl mx-auto text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Welcome {JSON.parse(localStorage.getItem("user")).name} to Our Platform</h1>
                <p className="mt-4 text-lg text-gray-600">Discover endless possibilities with us.</p>
                <NavLink to="/dashboard/createemp" className="mt-6 inline-block bg-purple-600 text-white py-2 px-4 rounded">Add Employee</NavLink>
            </div>
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                <img src="https://images.unsplash.com/photo-1716691731823-5f382e879e82?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Overlapping Image" className="mx-auto rounded-full w-48 h-48" />
            </div>
        </div>
    )
}
