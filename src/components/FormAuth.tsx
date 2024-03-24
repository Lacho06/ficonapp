import { Button, Label, TextInput } from "flowbite-react"
import { FormEvent, useState } from "react";

import { UserFormLogin } from "../constants/types/user";
import { useAuth } from "react-auth-utils";
import { useNavigate } from "react-router-dom";

const FormAuth = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const initialUser = {
        name: '',
        password: '',
    }

    const [user, setUser] = useState<UserFormLogin>(initialUser)
    const { name, password } = user


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // se llama a la api y esta devuelve un JWT
        const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
        signIn(fakeJWT, Date.now() + 2 * 60 * 1000, user);
        navigate('/')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    return (
        <form onSubmit={handleSubmit} className="flex sm:w-full max-w-md flex-col gap-4 mx-4 sm:mx-0">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="user" value="Usuario" />
                </div>
                <TextInput id="user" name="name" value={name} onChange={handleChange} type="text" placeholder="usuario1" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Contraseña" />
                </div>
                <TextInput id="password" name="password" value={password} onChange={handleChange} type="password" placeholder="********" required shadow />
            </div>
            <Button type="submit" className="bg-primary-500 enabled:hover:bg-accent-400">Entrar</Button>
        </form>
    )
}

export default FormAuth