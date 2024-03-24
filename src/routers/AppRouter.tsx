import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ROUTE_HOME_URL, ROUTE_LOGIN_URL } from "../constants/routes/routes"

import { AuthProvider } from "react-auth-utils"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/auth/LoginPage"

const AppRouter = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE_LOGIN_URL} element={<LoginPage />} />
                    <Route path={ROUTE_HOME_URL} element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRouter
