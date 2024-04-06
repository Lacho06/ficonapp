// ---- ROUTES ----

// home routes
export const ROUTE_HOME_URL = '/'

// auth routes
export const ROUTE_LOGIN_URL = '/login'
export const ROUTE_REGISTER_URL = '/register'

// payroll routes
export const ROUTE_PAYROLL_URL = '/payrolls'

// admin routes
export const ROUTE_ADMIN_PANEL_URL = '/admin'
// export const ROUTE_ADMIN_CONFIG_URL = '/admin/config'

// users routes
export const ROUTE_USERS_URL = '/admin/users'

// workers routes
export const ROUTE_WORKERS_URL = '/admin/workers'
export const ROUTE_WORKER_DETAILS_PREFIX = '/admin/worker'
export const ROUTE_WORKER_DETAILS_URL = `${ROUTE_WORKER_DETAILS_PREFIX}/:code`

// occupation routes
export const ROUTE_OCCUPATIONS_URL = '/admin/occupations'
export const ROUTE_OCCUPATION_DETAILS_PREFIX = '/admin/occupation'
export const ROUTE_OCCUPATION_DETAILS_URL = `${ROUTE_OCCUPATION_DETAILS_PREFIX}/:id`

// department routes
export const ROUTE_DEPARTMENTS_URL = '/admin/departments'

// area routes
export const ROUTE_AREAS_URL = '/admin/areas'

// tax routes
export const ROUTE_TAX_URL = '/admin/tax'
