// Tipos del modelo PrePayroll

import { Worker, WorkerCI, WorkerCode, WorkerName } from "./worker";

import { Area } from "./area";
import { Department } from "./department";
import { Occupation } from "./occupation";

export type PrePayrollId = number;
export type PrePayrollMonth = string;
export type PrePayrollYear = number;

export type PrePayroll = {
  id: PrePayrollId;
  month: PrePayrollMonth;
  year: PrePayrollYear;
  workers: PrePayrollWorker[];
};

export type PrePayrollWorker = {
  id: number;
  code: WorkerCode;
  ci: WorkerCI;
  name: WorkerName;
  hTrab: number;
  hNoTrab: number;
  impunt: number;
  hrsCertif: number;
  hrsLicMatern: number;
  hrsResol: number;
  hrsInterr: number;
  hrsExtras: number;
  otroTpoPagar: number;
  diasVac: number;
};

export type PrePayrollTable = {
  id: PrePayrollId;
  month: PrePayrollMonth;
  year: PrePayrollYear;
  workers: PrePayrollWorkerTable[];
};

export type PrePayrollWorkerTable = PrePayrollWorker & {
  worker: Worker;
  occupation: Occupation;
  department: Department;
  area: Area;
};

export type NewPrePayrollWorker = {
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
  workerId: number;
};

// export type OccupationDetails = {
//   id: OccupationId;
//   name: OccupationName;
//   salary: OccupationSalary;
//   workers: Worker[];
// };
