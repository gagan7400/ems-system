import React, { useEffect, useState } from 'react'

export default function EmpList() {
    let [data, setdata] = useState([]);
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
    console.log(data)
    return (
        <div className='w-200'>
            <table className="table" width={"100%"}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((emp, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td> {emp.number}</td>
                            <td> <img src={emp.image.path} width={"100px"} /> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
