import { PlateReasonForIssue, Plates } from './Plates.model';

export interface NewPlateRequest {
  vrms: unknown[];
  vin: string;
  trailerId?: string;
  systemNumber: string;
  techRecord: TechRecord;
  reasonForCreation: PlateReasonForIssue;
  vtmUsername: string;
}

export interface TechRecord {
  plates: Plates[];
}
