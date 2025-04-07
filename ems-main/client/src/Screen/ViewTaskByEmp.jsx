import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

export default function ViewTaskByEmp() {
    let [data, setdata] = useState([]);
    let nav = useNavigate();
    let { id } = useParams();
    useEffect(() => {
        getdata();
    }, []);
    let getdata = async () => {
        try {
            let emp = await fetch("http://localhost:4000/api/task/gettask/emp/" + id, {
                headers: {
                    "token": JSON.parse(localStorage.getItem("token")),
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            let res = await emp.json();
            if (res.result) {
                setdata(res.data)
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

    let updatetask = async (id) => {
        nav(`/dashboard/updattask/${id}`)
    }
    return (
        <>
            <div className="antialiased font-sans bg-gray-200">
                <div className="w-full shadow bg-white rounded">
                    <div className="border-gray-200 w-full rounded bg-white overflow-x-auto">
                        <table className="w-full leading-normal ">
                            <thead
                                className="text-gray-600 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 bg-gray-100 hover:cursor-pointer uppercase border-b-2 border-gray-200">
                                <tr className="border-b border-gray">
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((task, index) => (
                                    <tr key={index} className="hover:bg-gray-100 hover:cursor-pointer">
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <div className="flex items-center" classes="[object Object]">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">{task.title}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <span>{task.description}</span>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <ul classes="[object Object]">
                                                <li><a href="#">{task.dueDate}</a></li>
                                            </ul>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <ul classes="[object Object]">
                                                <li><a href="#">{task.status}</a></li>
                                            </ul>
                                        </td>
                                        <td className="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <button onClick={() => { updatetask(task._id) }} className="rounded px-4 py-2 text-xs bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
