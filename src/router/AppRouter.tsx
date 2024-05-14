import { AuthProvider, RequireAuth } from "react-auth-utils";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ROUTE_AREAS_URL,
  ROUTE_DEPARTMENTS_URL,
  ROUTE_HOME_URL,
  ROUTE_LOGIN_URL,
  ROUTE_OCCUPATIONS_URL,
  ROUTE_OCCUPATION_DETAILS_URL,
  ROUTE_PAYROLL_URL,
  ROUTE_PRE_PAYROLL_URL,
  ROUTE_TAX_URL,
  ROUTE_USERS_URL,
  ROUTE_WORKERS_URL,
  ROUTE_WORKER_DETAILS_URL,
} from "../constants/routes/routes";
import {
  ROUTE_PAYROLL_DETAILS_URL,
  ROUTE_PRE_PAYROLL_DETAILS_URL,
} from "./../constants/routes/routes";

import AreaPage from "../pages/areas/AreaPage";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import DepartmentPage from "../pages/departments/DepartmentPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import NavLayout from "../pages/layouts/NavLayout";
import OccupationDetailsPage from "./../pages/occupations/OccupationDetailsPage";
import OccupationPage from "../pages/occupations/OccupationPage";
import PayrollDetailsPage from "../pages/payroll/PayrollDetailsPage";
import PayrollPage from "../pages/payroll/PayrollPage";
import PrePayrollDetailsPage from "../pages/pre-payroll/PrePayrollDetailsPage";
import PrePayrollPage from "../pages/pre-payroll/PrePayrollPage";
import TaxPage from "../pages/tax/TaxPage";
import UserPage from "../pages/users/UserPage";
import WorkerDetailsPage from "../pages/workers/WorkerDetailsPage";
import WorkerPage from "../pages/workers/WorkerPage";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas publicas */}
          <Route path={ROUTE_LOGIN_URL} element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route path="/" element={<NavLayout />}>
            <Route
              path={ROUTE_HOME_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <HomePage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path={ROUTE_PRE_PAYROLL_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <PrePayrollPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_PRE_PAYROLL_DETAILS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <PrePayrollDetailsPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_PAYROLL_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <PayrollPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_PAYROLL_DETAILS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <PayrollDetailsPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_USERS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <UserPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_WORKERS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <WorkerPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_WORKER_DETAILS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <WorkerDetailsPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_OCCUPATIONS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <OccupationPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_OCCUPATION_DETAILS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <OccupationDetailsPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_DEPARTMENTS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <DepartmentPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_AREAS_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <AreaPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTE_TAX_URL}
              element={
                <RequireAuth
                  unauthenticated={
                    <Navigate to={ROUTE_LOGIN_URL} replace={true} />
                  }
                >
                  <TaxPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
