import React, { useContext } from 'react'
import { CardPerfil } from '../componets/Perfil/CardPerfil'
import FormularioPerfil from '../componets/Perfil/FormularioPerfil'
import AuthContext from '../Context/AuthProvider'
import { CardPerfilPaciente } from '../componets/Perfil/CardPerfilPaciente'

const Perfil = () => {
    const {auth}= useContext(AuthContext)
    return (
        <>       
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4' />
            </div>

            {
                "propietario" in auth 
                    ? (<CardPerfilPaciente/>)
                    : (
                        <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                            <div className='w-full md:w-1/2'>
                                <FormularioPerfil/>
                            </div>
                            <div className='w-full md:w-1/2'>
                                <CardPerfil/>
                            </div>
                        </div>
                    )
            }
            
        </>

    )
}

export default Perfil