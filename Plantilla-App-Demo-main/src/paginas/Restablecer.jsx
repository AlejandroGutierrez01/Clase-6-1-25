import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Restablecer() {

    //Paso 1: Crear el useParams
    const { token } = useParams()
    //Paso 2: 
    const [tokenback, setTokenback] = useState(false)

    const verifyToken = async () => {
        try {
            const url = `http://localhost:3000/api/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setTokenback(true)
            console.log(respuesta)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])
    //Paso 1: crear useState
    const [form, setForm] = useState({
        password: "",
        confirmarPassword: ""
    })
    //Paso 2: Logica para guardar en el useState
    const handleChange = (e) => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.LOCAL_URL}recuperar-password/${token}`
            const respuesta = await axios.get(url, form)
            setTokenback(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div>Restablecer
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Welcome again</h1>
      <small className="text-gray-400 block my-4 text-sm">Please enter your details</small>

            {
                tokenback &&
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">Password</label>
                        <input type="password" placeholder="Enter your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            value={form.password || ""}
                            name='password'
                            onChange={handleChange}
                        />
                        <label className="mb-2 block text-sm font-semibold">Confirm password</label>
                        <input type="password" placeholder="Repeat your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            value={form.confirmpassword || ""}
                            name='confirmpassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Send
                        </button>
                    </div>
                </form>

            }
        </div>
    )
}