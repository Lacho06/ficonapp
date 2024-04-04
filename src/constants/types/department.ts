// Tipos del modelo Department

import { AreaName } from "./area"

export type DepartmentCode = number
export type DepartmentName = string

export type Department = {
    code: DepartmentCode,
    name: DepartmentName,
    areaName: AreaName
}

export type NewDepartment = {
    name: DepartmentName,
    areaName: AreaName
}