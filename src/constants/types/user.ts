// Tipos del modelo User

export type UserId = {
    id: number
}

export type UserEmail = {
    email: `${string}@${string}.${string}`
}

export type UserFormLogin = {
    name: string,
    password: string
}

export type User = UserId & UserEmail & UserFormLogin