import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, Bounce } from 'react-toastify';
import { getallemp } from '../redux/action/empaction';
export default function CreateTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignedTo, setAssignedTo] = useState('')
    const [status, setStatus] = useState('');
    let { empdata } = useSelector(state => state.emp);
    let dispatch = useDispatch()
    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!title || !description || !dueDate || !status || !assignedTo) {
                toast.error("Please Provide All the Details", {
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
                let data = await fetch('http://localhost:4000/api/task/createtask', {
                    method: "POST",
                    body: JSON.stringify({ title, description, dueDate, status, assignedTo }),
                    headers: {
                        "Content-Type": "application/json",
                        "token": JSON.parse(localStorage.getItem("token")),
                        "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                })
                let res = await data.json();
                if (res.result) {
                    toast("Task Created Successfully", {
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
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                    setAssignedTo("");
                    setStatus("")
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
            }
        } catch (error) {
            toast.error(error.message, {
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
    useEffect(() => {
        if (!empdata) {
            dispatch(getallemp("http://localhost:4000/api/emp/allemp"))
        }
    }, [])
    return (
        <div className="isolate pt-4 bg-amber-50 px-6 pb-20">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">New Task</h2>
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={submitHandler}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className='col-span-12'>
                        <label htmlFor="title" className="block text-sm/6 font-semibold text-gray-900">Title</label>
                        <div className="mt-2.5">
                            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} name="title" id="title" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div className='col-span-12'>
                        <label htmlFor="description" className="block text-sm/6 font-semibold text-gray-900">Description</label>
                        <div className="mt-2.5">
                            <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} name="Description" id="Description" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div className='col-span-3' >
                        <label htmlFor="DueDate" className="block text-sm/6 font-semibold text-gray-900">DueDate</label>
                        <div className="mt-2.5">
                            <input type="date" value={dueDate} onChange={(e) => { setDueDate(e.target.value) }} name="DueDate" id="DueDate" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>

                    <div className='col-span-9' >
                        <div className="">
                            <label htmlFor="frm-whatever" className="block text-sm/6 font-semibold text-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-sky-600  ">AssignedTo</label>
                            <select value={assignedTo} onChange={(e) => { setAssignedTo(e.target.value) }} className=" mt-2.5 px-3.5 py-2 text-base appearance-none w-full outline-1 -outline-offset-1 outline-gray-300   bg-white rounded-md focus:outline-2  focus:-outline-offset-2 focus:outline-indigo-600" name="whatever" id="frm-whatever">
                                <option value="">Please choose&hellip;</option>
                                {empdata?.map((emp, index) => (
                                    <option value={emp._id} >{emp.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-span-12' >
                        <div className="">
                            <label htmlFor="frm-whatever" className="block text-sm/6 font-semibold text-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-sky-600">Status</label>
                            <select value={status} onChange={(e) => { setStatus(e.target.value) }} className=" mt-2.5 appearance-none px-3.5 py-2 text-base w-full outline-1 -outline-offset-1 outline-gray-300   bg-white rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" name="whatever" id="frm-whatever">
                                <option value="">Please choose&hellip;</option>
                                <option >To Do</option>
                                <option >In Progress</option>
                                <option >Done</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Task</button>
                </div>
            </form>
        </div>
    )
}
