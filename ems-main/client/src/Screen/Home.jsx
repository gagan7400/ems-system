import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div className='w-full max-w-9/10 m-auto'>
            <div className="w-full text-[30px]  flex justify-center items-center flex-col gap-10  h-[89vh] bg-amber-400">
                <h3> Wel Come </h3>
                <div>
                    <NavLink to="/login" className=''> login </NavLink>
                    <NavLink to="/register" className=''> Register </NavLink></div>
            </div>
        </div>
    )
}
