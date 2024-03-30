import { Alert, Button, Label, TextInput } from "flowbite-react"
import { FormEvent, useState } from "react"

import { ERROR_MESSAGES } from "../constants/app"
import { useLogin } from "../hooks/useLogin"

const FormAuth = () => {
    const { user, changeData, login } = useLogin()
    const { name, password } = user

    const [error, setError] = useState('')

    const validateData = () => {
        let isValidData = true;
        
        if(name.trim() === '' || password.trim() === ''){
            setError(ERROR_MESSAGES.EMPTY)
            isValidData = false;
        }
        
        if(!name.trim().includes('@') || password.trim().length < 8){
            setError(ERROR_MESSAGES.INCORRECT)
            isValidData = false;
        }

        return isValidData;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // se validan los datos
        const isValidData = validateData()

        // si no hay errores se loguea el usuario
        if(isValidData){
            login()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex sm:w-full max-w-md flex-col gap-4 mx-4 sm:mx-0">
            {
                error !== '' && (
                    <Alert color="failure" onDismiss={()=> setError('')} withBorderAccent>
                        <span className="font-medium">{ error }</span>
                    </Alert>
                )
            }
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="user" value="Usuario" />
                </div>
                <TextInput id="user" name="name" value={name} onChange={changeData} type="text" placeholder="usuario1" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Contraseña" />
                </div>
                <TextInput id="password" name="password" value={password} onChange={changeData} type="password" placeholder="********" required shadow />
            </div>
            <Button type="submit" className="bg-primary-500 enabled:hover:bg-accent-400">Entrar</Button>
        </form>
    )
}

export default FormAuth