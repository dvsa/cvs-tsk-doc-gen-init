import { APIGatewayEvent } from 'aws-lambda';
import 'source-map-support/register';
import { Plates } from './models/Plates.model';
import { VehicleRecord } from './models/VehicleRecord.model';
import logger from './observability/logger';

const { NODE_ENV, SERVICE, AWS_PROVIDER_REGION, AWS_PROVIDER_STAGE } = process.env;

logger.info(
  `\nRunning Service:\n '${SERVICE}'\n mode: ${NODE_ENV}\n stage: '${AWS_PROVIDER_STAGE}'\n region: '${AWS_PROVIDER_REGION}'\n\n`,
);

const handler = (event: APIGatewayEvent): void => {
  logger.debug("Function triggered'.");

  const vehicleTechRecord = JSON.parse(event.body) as VehicleRecord;
  const currentPlates = vehicleTechRecord.techRecord.plates;

  const plateSerialNo = '123'; // write the get from lambda here

  const newPlate: Plates = {
    plateSerialNumber: plateSerialNo,
    plateIssueDate: new Date(),
    plateReasonForIssue: vehicleTechRecord.reasonForCreation,
    plateIssuer: vehicleTechRecord.vtmUsername,
  };

  currentPlates.push(newPlate);

  // Call to get plate serial NO
  // save this tech record to dynamo
  // stick the tech record on the sqs
};

export { handler };
