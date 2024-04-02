import { AuthProvider, RequireAuth } from "react-auth-utils"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ROUTE_ADMIN_PANEL_URL, ROUTE_HOME_URL, ROUTE_LOGIN_URL, ROUTE_OCCUPATION_URL, ROUTE_PAYROLL_URL, ROUTE_USERS_URL, ROUTE_WORKERS_URL, ROUTE_WORKER_DETAILS_URL } from "../constants/routes/routes"

import AdminPanelPage from "../pages/admin/AdminPanelPage"
import DashboardLayout from "../pages/layouts/DashboardLayout"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/auth/LoginPage"
import NavLayout from "../pages/layouts/NavLayout"
import OccupationPage from "../pages/occupations/OccupationPage"
import PayrollPage from "../pages/nomina/PayrollPage"
import UserPage from "../pages/users/UserPage"
import WorkerDetailsPage from "../pages/workers/WorkerDetailsPage"
import WorkerPage from "../pages/workers/WorkerPage"

const AppRouter = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas publicas */}
                    <Route path={ROUTE_LOGIN_URL} element={<LoginPage />} />
                    
                    {/* Rutas protegidas */}
                    <Route path='/' element={<NavLayout />}>
                        <Route path={ROUTE_HOME_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <HomePage />
                            </RequireAuth>
                        } />
                        <Route path={ROUTE_PAYROLL_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <PayrollPage />
                            </RequireAuth>
                        } />
                    </Route>
                    <Route path='/' element={<DashboardLayout />}>
                        <Route path={ROUTE_USERS_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <UserPage />
                            </RequireAuth>
                        } />
                        <Route path={ROUTE_WORKERS_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <WorkerPage />
                            </RequireAuth>
                        } />
                        <Route path={ROUTE_WORKER_DETAILS_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <WorkerDetailsPage />
                            </RequireAuth>
                        } />
                        <Route path={ROUTE_OCCUPATION_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <OccupationPage />
                            </RequireAuth>
                        } />
                        <Route path={ROUTE_ADMIN_PANEL_URL} element={
                            <RequireAuth unauthenticated={<Navigate to={ROUTE_LOGIN_URL} replace={true} />}>
                                <AdminPanelPage />
                            </RequireAuth>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRouter
