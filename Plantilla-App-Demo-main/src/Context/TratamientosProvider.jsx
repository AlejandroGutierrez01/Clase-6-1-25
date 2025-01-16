import { createContext, useState } from "react";
import axios from "axios";
const tratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {

    const [model, setModel] = useState(false)

    const [tratamientos, setTratamientos] = useState([])

    const handleModel = () => {
        setModel(!model)
    }
    
    const registrarTratamientos = async(datos) => {
        console.log(datos)
        const token = localStorage.getItem('token')
        try {
            const url = `http://localhost:3000/api/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)
            setTratamientos([respuesta.data.tratamiento,...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <tratamientosContext.Provider value={
            {
                model,
                setModel,
                handleModel,
                tratamientos,
                setTratamientos,
                registrarTratamientos
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )
}

export { TratamientosProvider }
export default tratamientosContext