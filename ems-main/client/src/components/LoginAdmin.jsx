import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
export default function LoginAdmin() {
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('');
    const [emp, setemp] = useState(true);
    let nav = useNavigate()
    let submitHandler = async (e) => {
        e.preventDefault();
        let api = !emp ? 'http://localhost:4000/api/admin/login' : 'http://localhost:4000/api/emp/loginemp'
        if (!email || !password) {
            toast.error("Please Provide All Details", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            try {
                let data = await fetch(api, {
                    method: "POST",
                    body: JSON.stringify({ email, password }), headers: {
                        "Content-Type": "application/json"
                    }
                })
                let res = await data.json();
                if (res.result) {
                    toast.success("Login Successful", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    localStorage.setItem("token", JSON.stringify(res.token));
                    localStorage.setItem("user", JSON.stringify(res.user));
                    if (res.user.role == "admin") {
                        nav("/dashboard")
                    } else if (res.user.role == "employee") {
                        nav("/empdashboard")
                    }
                } else {
                    toast.error(res.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    }

    return (
        <>
            <div className='w-full  justify-center flex items-center h-[90vh] min-h-120'>
                <form style={{ width: "500px" }} className='bg-amber-300  pt-0 pb-5 rounded-xl  text-green-800' onSubmit={submitHandler}>
                    <div className="p-0 grid grid-cols-2 gap-0">
                        <button type='button' className={`  px-4 py-2 ${emp ? "bg-blue-700" : "bg-green-200"} ${emp ? "text-green-100" : "text-blue-700"}  text-blue-300 hover:${emp ? "bg-blue-800" : "bg-green-500"} duration-300`} onClick={() => { setemp(true) }}> Employee Login
                        </button>
                        <button type='button' className={` px-4 py-2 ${!emp ? "bg-blue-700" : "bg-green-200"}  ${!emp ? "text-green-100" : "text-blue-700"} hover:${!emp ? "bg-blue-800" : "bg-green-400"} duration-300`} onClick={() => { setemp(false) }}> Admin Login</button>
                    </div>
                    <h4 className='p-5 text-center text-blue-800 font-bold py-3  text-2xl  '> {emp ? "Employee" : "Admin"} Login </h4>
                    <div className=" p-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className='sm:col-span-2'>
                            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                            <div className="mt-2.5">
                                <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                            </div>
                        </div>
                        <div className='sm:col-span-2'>
                            <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">Password</label>
                            <div className="mt-2.5">
                                <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" id="password" autoComplete="password" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 mt-10">
                        <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
