import { NewPlateRequest, TechRecord } from '../models/Request.model';
import { Plates } from '../models/Plates.model';
import { getSerialNumber } from './serialNumber.service'

export const addNewPlate = async (request: NewPlateRequest): Promise<TechRecord> => {

  if (request.reasonForCreation && request.vtmUsername && request.techRecord) {

    let currentPlates = request.techRecord.plates ?? []

    const newPlate: Plates = {
      plateSerialNumber: await getSerialNumber(),
      plateIssueDate: new Date(),
      plateReasonForIssue: request.reasonForCreation,
      plateIssuer: request.vtmUsername,
    };

    currentPlates.push(newPlate);

    request.techRecord.plates = currentPlates;

  } else throw new Error('Bad Request')

  return request.techRecord
}
