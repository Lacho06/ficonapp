// Tipos del modelo Worker

import { DepartmentCode } from "./department";
import { OccupationId } from "./occupation";

export type WorkerCode = number;
export type WorkerName = string;
export type WorkerCI = number;
export type WorkerCategory = "ingeniero" | "master" | "doctor";

export type Worker = {
  code: WorkerCode;
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  departmentCode: DepartmentCode;
  occupationId: OccupationId;
};

export type NewWorker = {
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  departmentCode: DepartmentCode;
  occupationId: OccupationId;
};

export type WorkerDetails = {
  code: WorkerCode;
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  occupation: string;
  salary: number;
};
