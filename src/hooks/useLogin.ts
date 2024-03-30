import { ROUTE_HOME_URL } from "../constants/routes/routes"
import { UserFormLogin } from "../constants/types/user"
import { useAuth } from "react-auth-utils"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const initialUser = {
    name: '',
    password: '',
}

export function useLogin(){
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const [user, setUser] = useState<UserFormLogin>(initialUser)


    const login = () => {
        // se llama a la api y esta devuelve un JWT
        const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
        // signIn(fakeJWT, Date.now() + 2 * 60 * 1000, user);
        signIn(fakeJWT, undefined, user);
        navigate(ROUTE_HOME_URL)
    }

    const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return { user, changeData, login }
}