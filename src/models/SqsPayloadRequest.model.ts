import { Vehicle } from './Vehicle.model';

export interface SQSRequestBody {
  vehicle: Vehicle;
  documentName: DocumentName;
}

export const enum DocumentName {
  MINISTRY = 'VTG6_VTG7',
  MINISTRY_TRL = 'VTG6_VTG7_TRL',
}
