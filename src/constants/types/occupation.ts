// Tipos del modelo Occupation

export type OccupationId = number
export type OccupationName = string
export type OccupationSalary = number

export type Occupation = {
    id: OccupationId,
    name: OccupationName,
    salary: OccupationSalary
}

export type NewOccupation = {
    name: OccupationName,
    salary: OccupationSalary
}