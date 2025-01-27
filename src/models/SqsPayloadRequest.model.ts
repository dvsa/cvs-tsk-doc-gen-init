import { Letter } from './Letter.model';
import { Plates } from './Plates.model';
import { Vehicle } from './Vehicle.model';

export interface SQSRequestBody {
  vehicle: Vehicle;
  plate?: Plates;
  letter?: Letter;
  documentName: DocumentName;
  recipientEmailAddress: string;
}

export const enum DocumentName {
  MINISTRY = 'VTG6_VTG7',
  TRL_INTO_SERVICE = 'TrailerIntoService',
}
