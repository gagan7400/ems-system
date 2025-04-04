import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('');
    const [emp, setemp] = useState(true);
    let nav = useNavigate()
    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            let data = await fetch('http://localhost:4000/api/admin/login', {
                method: "POST",
                body: JSON.stringify({ email, password }), headers: {
                    "Content-Type": "application/json"
                }
            })
            let res = await data.json();
            if (res.result) {
                console.log(res);
                localStorage.setItem("token", JSON.stringify(res.token));
                localStorage.setItem("admin", JSON.stringify(res.user));
                if (res.user.role == "admin") {
                    nav("/dashboard")
                } else if (res.user.role == "employee") {
                    nav("/empdashboard")
                }
            } else {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    let submitHandleremp = async (e) => {
        e.preventDefault();

        try {
            let data = await fetch('http://localhost:4000/api/emp/loginemp', {
                method: "POST",
                body: JSON.stringify({ email, password }), headers: {
                    "Content-Type": "application/json"
                }
            })
            let res = await data.json();
            if (res.result) {
                console.log(res);
                localStorage.setItem("token", JSON.stringify(res.token));
                localStorage.setItem("admin", JSON.stringify(res.user));
                if (res.user.role == "admin") {
                    nav("/dashboard")
                } else if (res.user.role == "employee") {
                    nav("/empdashboard")
                }
            } else {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button className="btn border-3 my-3 mx-2 btn-primary" onClick={() => { setemp(true) }}> Login As Emp </button>
            <button className="btn border-3 my-3 mx-2 btn-primary" onClick={() => { setemp(false) }}> Login As admin </button>
            <div className='w-full  justify-center flex items-center h-[90vh]'>
                {emp ? <form style={{ width: "500px" }} className='bg-amber-300 p-5  rounded-xl  text-green-800' onSubmit={submitHandleremp}>
                    <h4 className=' '> Employee Register </h4>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className='sm:col-span-2'>
                            <label for="first-name" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                            <div className="mt-2.5">
                                <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                            </div>
                        </div>
                        <div className='sm:col-span-2'>
                            <label for="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                            <div className="mt-2.5">
                                <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                            </div>
                        </div>

                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>

                </form> :
                    <form style={{ width: "500px" }} className='bg-amber-300 p-5  rounded-xl  text-green-800' onSubmit={submitHandler}>
                        <h4 className=' '> Admin Register </h4>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className='sm:col-span-2'>
                                <label for="first-name" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                                <div className="mt-2.5">
                                    <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                                </div>
                            </div>
                            <div className='sm:col-span-2'>
                                <label for="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                                <div className="mt-2.5">
                                    <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                                </div>
                            </div>

                        </div>
                        <div className="mt-10">
                            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>

                    </form>}

            </div> </>
    )
}
