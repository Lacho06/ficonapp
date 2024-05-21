// Tipos del modelo Worker

import { DepartmentName } from "./department";

export type WorkerCode = number;
export type WorkerName = string;
export type WorkerCI = number;
export type WorkerCategory = "ingeniero" | "master" | "doctor";

export type Worker = {
  code: WorkerCode;
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  department: DepartmentName;
};

export type NewWorker = {
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  department: DepartmentName;
};

export type WorkerDetails = {
  code: WorkerCode;
  name: WorkerName;
  ci: WorkerCI;
  category: WorkerCategory;
  occupation: string;
  salary: number;
};
