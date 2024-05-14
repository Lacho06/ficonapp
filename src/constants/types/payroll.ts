// Tipos del modelo Payroll

import { Area } from "./area";
import { Department } from "./department";
import { Occupation } from "./occupation";
import { Worker } from "./worker";

export type PayrollId = number;
export type PayrollMonth = string;
export type PayrollYear = number;

export type Payroll = {
  id: PayrollId;
  month: PayrollMonth;
  year: PayrollYear;
  workers: PayrollWorker[];
};

export type PayrollWorker = {
  salaryRate: number;
  hours: number;
  toCollect: number;
  bonus: number;
  pat: number;
  earnedSalary: number;
  salaryTax: number;
  withHoldings: number;
  paid: number;
  worker: Worker;
};

export type PayrollTable = {
  id: PayrollId;
  month: PayrollMonth;
  year: PayrollYear;
  workers: PayrollWorkerTable[];
};

export type PayrollWorkerTable = PayrollWorker & {
  occupation: Occupation;
  department: Department;
  area: Area;
};

export type NewPayrollWorker = {
  hoursWorked: number;
  hoursNotWorked: number;
  tardiness: number;
  hoursCertificate: number;
  hoursMaternityLicence: number;
  hoursResolution: number;
  hoursInterrupted: number;
  hoursExtra: number;
  anotherTpoPay: number;
  vacationDays: number;
  prepayrollId: number;
  workerId: number;
};

// export type OccupationDetails = {
//   id: OccupationId;
//   name: OccupationName;
//   salary: OccupationSalary;
//   workers: Worker[];
// };
