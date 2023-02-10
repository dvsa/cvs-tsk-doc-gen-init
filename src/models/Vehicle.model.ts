import { Plates } from './Plates.model';

export interface Vehicle {
  vin: string;
  primaryVrm: string;
  systemNumber: string;
  trailerId?: string;
  techRecord: TechRecord;
}

export interface TechRecord {
  plates: Plates[];
}
