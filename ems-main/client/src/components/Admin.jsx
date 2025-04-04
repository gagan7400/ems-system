import React, { useState } from 'react'

export default function Admin() {
    const [name, setName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [number, setnumber] = useState('')
    const [image, setimage] = useState('');
    let filehandler = (e) => {
        e.preventDefault();
        setimage(e.target.files[0])
        console.log(e.target.files)
    }
    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData;
            formdata.append("name", name)
            formdata.append("email", email)
            formdata.append("password", password)
            formdata.append("number", number)
            console.log(image)
            formdata.append("image", image);

            let data = await fetch('http://localhost:4000/api/admin/register', {
                method: "POST",
                body: formdata
            })
            let res = await data.json();
            if (res.result) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-100  m-auto mt-5 p-5 rounded bg-info d-flex justify-content-evenly gap-3 flex-wrap '>
            <form style={{ width: "500px" }} onSubmit={submitHandler}>
                <h4 className='text-center text-white w-75 m-auto py-3'> Admin Register </h4>
                <div className="form-group mb-3">
                    <label htmlFor="name">name</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="enter Name" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">email</label>
                    <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="form-control" placeholder="enter Email" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">password</label>
                    <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="form-control" placeholder="enter Password" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="number">number</label>
                    <input type="number" value={number} onChange={(e) => { setnumber(e.target.value) }} className="form-control" placeholder="enter Number" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="image">image</label>
                    <input type="file" onChange={filehandler} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary"> Submit </button>
            </form>

        </div>
    )
}
