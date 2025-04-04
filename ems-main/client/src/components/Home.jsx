import React, { Component, useState } from 'react'

export default function Home() {
    let [name, setname] = useState("")
    let [number, setnumber] = useState("")
    let [password, setpassword] = useState("")
    let [email, setemail] = useState("");
    let [image, setimage] = useState("")
    let submitHandler = async (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append("name", name)
        data.append("number", Number(number))
        data.append("password", password)
        data.append("email", email)
        data.append("image", image);
        console.log(name, password, email, number, image)

        await fetch("http://localhost:4000/api/user/createuser", {
            method: "POST",
            body: data,
        }).then((res) => res.json()).then((result) => { console.log(result) }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <form style={{ width: "500px" }} onSubmit={submitHandler}>
                <div className="form-group mb-3">
                    <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} />
                </div>
                <div className="form-group mb-3">
                    <input type="number" value={number} onChange={(e) => { setnumber(e.target.value) }} />
                </div>
                <div className="form-group mb-3">
                    <input type="text" value={email} placeholder='email' onChange={(e) => { setemail(e.target.value) }} />
                </div>
                <div className="form-group mb-3">
                    <input type="text" value={password} placeholder='epassl' onChange={(e) => { setpassword(e.target.value) }} />
                </div>
                <div className="form-group mb-3">
                    <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
                </div>
                <button type="submit" className="btn btn-primary">  Submit </button>
            </form>
        </>
    )
}

