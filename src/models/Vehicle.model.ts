import { Plates } from './Plates.model';

export interface Vehicle {
  vin: string;
  vrms: unknown[];
  systemNumber: string;
  trailerId?: string;
  techRecord: TechRecord;
}

export interface TechRecord {
  plates: Plates[];
}
