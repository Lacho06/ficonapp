export function toDecimal(num: number, decimal: number = 2) {
  return Number.parseFloat(num.toFixed(decimal));
}
