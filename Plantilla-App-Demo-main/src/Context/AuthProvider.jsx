import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Creación del contexto de autenticación
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({}); // Estado para almacenar la información del usuario autenticado

    // Función para LEER el perfil del usuario
    const perfil = async (token) => {
        try {
            const url = `http://localhost:3000/api/perfil`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
            };
    
            const respuesta = await axios.get(url, options);
            console.log('Perfil cargado:', respuesta.data); // Verifica que la respuesta incluye el rol
            setAuth(respuesta.data); // Actualiza el estado con la información del usuario
        } catch (error) {
            console.log('Error al obtener el perfil:', error.response?.data?.msg || error.message);
            setAuth({}); // Limpia el estado en caso de error
        }
    };
    
    const actualizarPerfil = async (datos) => {
        try {
            const url = `http://localhost:3000/api/veterinario/${datos.id}`
            const options = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            return {respuesta: error.response.data.msg,tipo:false}
        }
    }
    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `http://localhost:3000/api/veterinario/actualizarpassword`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            return { respuesta: respuesta.data.msg, tipo: true }
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }

    // useEffect para verificar si hay un token en localStorage al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            perfil(token);
        }
        else {
            setAuth({})
        }

    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth, // Información del usuario autenticado
                setAuth, // Permite actualizar el estado desde otros componentes
                actualizarPerfil,
                actualizarPassword
            }}
        >
            {children} {/* Renderiza los componentes hijos */}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;