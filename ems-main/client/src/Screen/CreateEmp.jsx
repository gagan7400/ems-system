import React, { useState } from 'react'

export default function CreateEmp() {
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

            let data = await fetch('http://localhost:4000/api/emp/registeremp', {
                method: "POST",
                body: formdata,
                headers: {
                    "token": JSON.parse(localStorage.getItem("token")),
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            let res = await data.json();
            if (res.result) {
                console.log(res)
                alert("Employee Created Successfully");
                setnumber("");
                setName("");
                setpassword("");
                setemail("");
                setimage("")

            } else {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="isolate pt-4 bg-amber-50 px-6 pb-20">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Register Employee</h2>
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={submitHandler}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">Name</label>
                        <div className="mt-2.5">
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} name="name" id="name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="Email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="email" id="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div >
                        <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">Password</label>
                        <div className="mt-2.5">
                            <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" id="password" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>

                    <div >
                        <label htmlFor="number" className="block text-sm/6 font-semibold text-gray-900">number</label>
                        <div className="mt-2.5">
                            <input type="number" value={number} onChange={(e) => { setnumber(e.target.value) }} name="number" id="number" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="image" className="block text-sm/6 font-semibold text-gray-900">image</label>
                        <div className="mt-2.5">
                            <input type="file" value={image} onChange={filehandler} name="image" id="image" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>

                </div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Employee</button>
                </div>
            </form>
        </div>
        // <div className='w-100    p-5 rounded bg-info d-flex justify-content-evenly gap-3 flex-wrap '>
        //     <form style={{ width: "500px" }} onSubmit={submitHandler}>
        //         <h4 className='text-center text-white w-75 m-auto py-3'> Create Emp  </h4>
        //         <div className="form-group mb-3">
        //             <label htmlhtmlFor="name">name</label>
        //             <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="enter Name" />
        //         </div>
        //         <div className="form-group mb-3">
        //             <label htmlhtmlFor="email">email</label>
        //             <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="form-control" placeholder="enter Email" />
        //         </div>
        //         <div className="form-group mb-3">
        //             <label htmlhtmlFor="password">password</label>
        //             <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="form-control" placeholder="enter Password" />
        //         </div>
        //         <div className="form-group mb-3">
        //             <label htmlhtmlFor="number">number</label>
        //             <input type="number" value={number} onChange={(e) => { setnumber(e.target.value) }} className="form-control" placeholder="enter Number" />
        //         </div>
        //         <div className="form-group mb-3">
        //             <label htmlhtmlFor="image">image</label>
        //             <input type="file" onChange={filehandler} className="form-control" />
        //         </div>

        //         <button type="submit" className="btn btn-primary"> Submit </button>
        //     </form>

        // </div>
    )
}
