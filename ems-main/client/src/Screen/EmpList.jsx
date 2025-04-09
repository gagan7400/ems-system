import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import { getallemp } from '../redux/action/empaction';
import { useDispatch, useSelector } from 'react-redux';
import Useloader from './Useloader';
export default function EmpList() {
    let [data, setdata] = useState([]);
    let nav = useNavigate();
    let dispatch = useDispatch();
    let { loading, error, empdata } = useSelector(state => state.emp)
    useEffect(() => {
        getdata();
    }, []);
    let getdata = async () => {
        dispatch(getallemp("http://localhost:4000/api/emp/allemp"))
    }
    useEffect(() => {
        if (error) {
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
    }, [loading, error, empdata])
    let deleteEmp = async (id) => {
        let confirmation = confirm("Are you Sure you want to delete this");
        try {
            if (confirmation) {
                let emp = await fetch(`http://localhost:4000/api/emp/deleteemp/${id}`, {
                    method: "DELETE",
                    headers: {
                        "token": JSON.parse(localStorage.getItem("token")),
                        "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });
                let res = await emp.json();
                if (res.result) {
                    toast.error("Employee Deleted Successfully", {
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
                    getdata();
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
    let updateEmp = async (id) => {
        nav(`/dashboard/updateemp/${id}`)
    }
    return (
        <>
            {loading ? <Loader /> : <div className="antialiased font-sans bg-gray-200">
                <div className="w-full shadow bg-white rounded">
                    <div className="border-gray-200 w-full rounded bg-white overflow-x-auto">
                        <table className="w-full leading-normal ">
                            <thead
                                className="text-gray-600 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 bg-gray-100 hover:cursor-pointer uppercase border-b-2 border-gray-200">
                                <tr className="border-b border-gray">
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Number
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {empdata && empdata.map((emp, index) => (
                                    <tr key={index} className="hover:bg-gray-100 hover:cursor-pointer">
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <div className="flex items-center" classes="[object Object]">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img src={emp?.image.path} alt="" className="w-full h-full rounded-full" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">{emp?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <span>{emp?.email}</span>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <ul classes="[object Object]">
                                                <li><a href="#">{emp?.number}</a></li>
                                            </ul>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <button onClick={() => { updateEmp(emp?._id) }} className="rounded px-4 py-2 text-xs bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Edit</button>
                                            <button onClick={() => { deleteEmp(emp._id) }} className="rounded px-4 ms-1 py-2 text-xs bg-red-500 text-blue-100 hover:bg-red-600 duration-300">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
        </>
    )
}

function Loader() {
    return (
        <div class="loader"></div>
    )
}