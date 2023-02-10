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
      plateIssueDate: new Date().toISOString(),
      plateReasonForIssue: request.reasonForCreation,
      plateIssuer: request.vtmUsername,
    };

    validate(newPlate);

    currentPlates.push(newPlate);

    request.techRecord.plates = currentPlates;
  } else {
    throw new Error('Bad Request');
  }

  return request.techRecord;
};

export const validate = (plate: Plates): void => {
  if (!plate) {
    throw new Error('Missing all of the plate information');
  }

  if (!plate.plateSerialNumber) {
    throw new Error('Missing plate serial number');
  }

  if (!plate.plateIssueDate) {
    throw new Error('Missing plate issue date');
  }

  if (!plate.plateReasonForIssue) {
    throw new Error('Missing plate reason for issue');
  }

  if (!plate.plateIssuer) {
    throw new Error('Missing plate issuer');
  }
};

export const updateTechRecord = (vehicle: Vehicle): Promise<void> => {
  logger.debug('techRecord.service: updating tech record in DynamoDB started');
  return put(vehicle);
};
