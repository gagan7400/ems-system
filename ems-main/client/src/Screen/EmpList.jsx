import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function EmpList() {
    let [data, setdata] = useState([]);
    let nav = useNavigate()
    useEffect(() => {
        getdata();
    }, []);
    let getdata = async () => {
        let emp = await fetch("http://localhost:4000/api/emp/allemp", {
            headers: {
                "token": JSON.parse(localStorage.getItem("token")),
                "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let res = await emp.json();
        console.log(res)
        if (res.result) {
            setdata(res.data)
        }
    }
    console.log(data);
    let deleteEmp = async (id) => {
        let confirmation = confirm("Are you Sure you want to delete this");
        if (confirmation) {
            let emp = await fetch(`http://localhost:4000/api/emp/deleteemp/${id}`, {
                method: "DELETE",
                headers: {
                    "token": JSON.parse(localStorage.getItem("token")),
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            let res = await emp.json();
            console.log(res)
            if (res.result) {
                alert("Employee Delete Successfully");
                getdata();
            }
        }
    }
    let updateEmp = async (id) => {
        nav(`/dashboard/updateemp/${id}`)
    }
    return (
        <>
            <div class="antialiased font-sans bg-gray-200">
                <div class="w-full shadow bg-white rounded">
                    <div class="border-gray-200 w-full rounded bg-white overflow-x-auto">
                        <table class="w-full leading-normal ">
                            <thead
                                class="text-gray-600 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 bg-gray-100 hover:cursor-pointer uppercase border-b-2 border-gray-200">
                                <tr class="border-b border-gray">
                                    <th scope="col"
                                        class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col"
                                        class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Number
                                    </th>
                                    <th scope="col"
                                        class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((emp, index) => (
                                    <tr key={index} class="hover:bg-gray-100 hover:cursor-pointer">
                                        <td class="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <div class="flex items-center" classes="[object Object]">
                                                <div class="flex-shrink-0 h-10 w-10">
                                                    <img src={emp.image.path} alt="" class="w-full h-full rounded-full" />
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">{emp.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <span>{emp.email}</span>
                                        </td>
                                        <td class="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <ul classes="[object Object]">
                                                <li><a href="#">{emp.number}</a></li>
                                            </ul>
                                        </td>
                                        <td class="py-4 px-3 border-b border-gray-200 text-gray-900 text-sm ">
                                            <span onClick={() => { updateEmp(emp._id) }}
                                                class="relative inline-block px-3 py-1 font-semibold leading-tight rounded-full bg-red-200 text-red-900"
                                            >
                                                Edit
                                            </span>
                                            <span onClick={() => { deleteEmp(emp._id) }}
                                                class="relative inline-block px-3 py-1 font-semibold leading-tight rounded-full bg-red-200 text-red-900"
                                            >
                                                Delete
                                            </span>
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
