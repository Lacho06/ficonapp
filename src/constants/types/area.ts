// Tipos del modelo Area

export type AreaCode = number
export type AreaName = string

export type Area = {
    code: AreaCode,
    name: AreaName,
}

export type NewArea = {
    name: AreaName,
}