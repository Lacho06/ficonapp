// Tipos del modelo Tax

export type TaxId = number
export type TaxType = 'ingresos personales' | 'seguridad social'
export type TaxRange = number
export type TaxPercentage = number

export type Tax = {
    id: TaxId,
    type: TaxType,
    minValue: TaxRange,
    maxValue: TaxRange,
    percentage: TaxPercentage
}

export type NewTax = {
    type: TaxType,
    minValue: TaxRange,
    maxValue: TaxRange,
    percentage: TaxPercentage
}