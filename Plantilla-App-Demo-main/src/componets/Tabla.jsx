import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import Mensaje from "./Alertas/Mensaje";
const Tabla = () => {

    const [pacientes, setPacientes] = useState([])

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token")
            const url = `http://localhost:3000/api/pacientes`
            //Esto sirve para hacer peticiones a endpoints privados
            const opcion = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, opcion)
            setPacientes(respuesta.data, ...pacientes)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleSubmit()
    }, [])

    return (
        <>
            {
                pacientes.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Propietario</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Celular</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pacientes.map((paciente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={paciente._id}>
                                        <td>{index + 1}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.propietario}</td>
                                        <td>{paciente.email}</td>
                                        <td>{paciente.celular}</td>
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{paciente.estado && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" />
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>

    )
}

export default Tabla