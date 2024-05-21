export function toDecimal(num: number, decimal: number = 2) {
  return Number.parseFloat(num.toFixed(decimal));
}

export function getLimitDay(month: string) {
  if (month.trim().toUpperCase() === "ENERO") {
    return 31;
  } else if (month.trim().toUpperCase() === "FEBRERO") {
    return 28;
  } else if (month.trim().toUpperCase() === "MARZO") {
    return 31;
  } else if (month.trim().toUpperCase() === "ABRIL") {
    return 30;
  } else if (month.trim().toUpperCase() === "MAYO") {
    return 31;
  } else if (month.trim().toUpperCase() === "JUNIO") {
    return 30;
  } else if (month.trim().toUpperCase() === "JULIO") {
    return 31;
  } else if (month.trim().toUpperCase() === "AGOSTO") {
    return 31;
  } else if (month.trim().toUpperCase() === "SEPTIEMBRE") {
    return 30;
  } else if (month.trim().toUpperCase() === "OCTUBRE") {
    return 31;
  } else if (month.trim().toUpperCase() === "NOVIEMBRE") {
    return 30;
  } else if (month.trim().toUpperCase() === "DICIEMBRE") {
    return 31;
  }

  return -1;
}

export function getNumberMonth(month: string) {
  if (month.trim().toUpperCase() === "ENERO") {
    return 1;
  } else if (month.trim().toUpperCase() === "FEBRERO") {
    return 2;
  } else if (month.trim().toUpperCase() === "MARZO") {
    return 3;
  } else if (month.trim().toUpperCase() === "ABRIL") {
    return 4;
  } else if (month.trim().toUpperCase() === "MAYO") {
    return 5;
  } else if (month.trim().toUpperCase() === "JUNIO") {
    return 6;
  } else if (month.trim().toUpperCase() === "JULIO") {
    return 7;
  } else if (month.trim().toUpperCase() === "AGOSTO") {
    return 8;
  } else if (month.trim().toUpperCase() === "SEPTIEMBRE") {
    return 9;
  } else if (month.trim().toUpperCase() === "OCTUBRE") {
    return 10;
  } else if (month.trim().toUpperCase() === "NOVIEMBRE") {
    return 11;
  } else if (month.trim().toUpperCase() === "DICIEMBRE") {
    return 12;
  }

  return -1;
}
