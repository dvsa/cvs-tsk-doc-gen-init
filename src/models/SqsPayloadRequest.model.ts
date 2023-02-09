import { Vehicle } from './Vehicle.model';

export interface SQSRequestBody {
  vehicle: Vehicle;
  documentType: DocumentType;
}

export enum DocumentType {
  VTG6_VTG7 = 'VTG6_VTG7',
}
