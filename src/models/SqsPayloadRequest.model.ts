import { Vehicle } from './Vehicle.model';

export interface SQSRequestBody {
  vehicle: Vehicle;
  documentName: DocumentName;
}

export enum DocumentName {
  VTG6_VTG7 = 'VTG6_VTG7',
}
