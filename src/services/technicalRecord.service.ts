import { NewPlateRequest } from '../models/Request.model';
import { Plates } from '../models/Plates.model';
import { getSerialNumber } from './serialNumber.service';
import { TechRecord, Vehicle } from '../models/Vehicle.model';
import { put } from './dynamodb.service';
import logger from '../observability/logger';

export const addNewPlate = async (request: NewPlateRequest): Promise<TechRecord> => {
  if (request.reasonForCreation && request.vtmUsername && request.techRecord) {
    const currentPlates = request.techRecord.plates ?? [];

    const newPlate: Plates = {
      plateSerialNumber: await getSerialNumber(),
      plateIssueDate: new Date(),
      plateReasonForIssue: request.reasonForCreation,
      plateIssuer: request.vtmUsername,
    };

    currentPlates.push(newPlate);

    request.techRecord.plates = currentPlates;
  } else {
    throw new Error('Bad Request');
  }

  return request.techRecord;
};

export const updateTechRecord = (vehicle: Vehicle): Promise<void> => {
  logger.debug('techRecord.service: updating tech record in DynamoDB started');
  return put(vehicle);
};
