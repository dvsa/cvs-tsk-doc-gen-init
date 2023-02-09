import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import 'source-map-support/register';
import { NewPlateRequest } from './models/Request.model';
import logger from './observability/logger';
import * as technicalRecordService from './services/technicalRecord.service';
import * as sqsService from './services/sqs.service';
import { Vehicle } from './models/Vehicle.model';

const { NODE_ENV, SERVICE, AWS_PROVIDER_REGION, AWS_PROVIDER_STAGE } = process.env;

logger.info(
  `\nRunning Service:\n '${SERVICE}'\n mode: ${NODE_ENV}\n stage: '${AWS_PROVIDER_STAGE}'\n region: '${AWS_PROVIDER_REGION}'\n\n`,
);

export const handler = async (event: APIGatewayEvent, _: Context): Promise<APIGatewayProxyResult> => {
  logger.info('handler: triggered');

  try {
    const request = JSON.parse(event.body) as NewPlateRequest;

    logger.debug('handler: adding new plate to tech record');
    const techRecord = await technicalRecordService.addNewPlate(request);

    logger.debug('handler: updating tech record in DynamoDB');
    await technicalRecordService.updateTechRecord(request as Vehicle);

    logger.debug('handler: sending tech record to SQS to generate new plate');
    await sqsService.sendTechRecordToSQS(techRecord, request);

    logger.info('handler: done, returning success');
    return { statusCode: 200, body: null };
  } catch (error) {
    logger.error('handler: error', error);
    return { statusCode: 500, body: null };
  }
};
