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
            } else {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="isolate bg-white px-6">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Contact sales</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                        <div className="mt-2.5">
                            <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Last name</label>
                        <div className="mt-2.5">
                            <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">Company</label>
                        <div className="mt-2.5">
                            <input type="text" name="company" id="company" autoComplete="organization" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">Phone number</label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select id="country" name="country" autoComplete="country" aria-label="Country" className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <option>US</option>
                                        <option>CA</option>
                                        <option>EU</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" name="phone-number" id="phone-number" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="123-456-7890" />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
                        <div className="mt-2.5">
                            <textarea name="message" id="message" rows="4" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
                        </div>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            {/* <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" --> */}
                            <button type="button" className="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                                <span className="sr-only">Agree to policies</span>
                                {/* <!-- Enabled: "translate-x-3.5", Not Enabled: "translate-x-0" --> */}
                                <span aria-hidden="true" className="size-4 translate-x-0 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <label className="text-sm/6 text-gray-600" id="switch-1-label">
                            By selecting this, you agree to our
                            <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's talk</button>
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
