// Tipos del modelo Occupation

import { Worker } from "./worker"

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

export type OccupationDetails = {
    id: OccupationId,
    name: OccupationName,
    salary: OccupationSalary,
    workers: Worker[]
}