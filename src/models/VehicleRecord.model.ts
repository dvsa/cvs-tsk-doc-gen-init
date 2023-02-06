import { PlateReasonForIssue, Plates } from './Plates.model';

export interface VehicleRecord {
  vrms: unknown[];
  vin: string;
  trailerId?: string;
  systemNumber: string;
  techRecord: TechRecord;
  reasonForCreation: PlateReasonForIssue;
  vtmUsername: string;
}

interface TechRecord {
  plates: Plates[];
}
