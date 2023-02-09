import { SQS } from 'aws-sdk';
import { NewPlateRequest } from '../models/Request.model';
import { DocumentName, SQSRequestBody } from '../models/SqsPayloadRequest.model';
import { TechRecord, Vehicle } from '../models/Vehicle.model';
import logger from '../observability/logger';

export const sendTechRecordToSQS = async (techRecord: TechRecord, request: NewPlateRequest): Promise<void> => {
  logger.info('Send tech record to SQS');

  const sqs = new SQS({ apiVersion: '2012-11-05' });

  const params = {
    MessageBody: JSON.stringify(formatPayload(techRecord, request)),
    QueueUrl: process.env.DOC_GEN_SQS_QUEUE,
  };

  try {
    await sqs.sendMessage(params).promise();
  } catch (err: unknown) {
    logger.error(err);
    throw new Error(err as string);
  }
};

export const formatPayload = (techRecord: TechRecord, request: NewPlateRequest): SQSRequestBody => {
  const vehicle: Vehicle = {
    vin: request.vin,
    vrms: request.vrms,
    systemNumber: request.systemNumber,
    techRecord,
    trailerId: request.trailerId,
  };

  return {
    vehicle,
    documentName: DocumentName.VTG6_VTG7,
  };
};
