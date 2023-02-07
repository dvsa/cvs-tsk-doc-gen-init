import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import 'source-map-support/register';
import { NewPlateRequest } from './models/Request.model';
import logger from './observability/logger';
import technicalRecordService from './services/technicalRecord.service'

const { NODE_ENV, SERVICE, AWS_PROVIDER_REGION, AWS_PROVIDER_STAGE } = process.env;

logger.info(
  `\nRunning Service:\n '${SERVICE}'\n mode: ${NODE_ENV}\n stage: '${AWS_PROVIDER_STAGE}'\n region: '${AWS_PROVIDER_REGION}'\n\n`,
);

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  logger.debug("Function triggered'.");

  const request = JSON.parse(event.body) as NewPlateRequest;
  const techRecord = await technicalRecordService.addNewPlate(request);
  await technicalRecordService.updateTechRecord(techRecord);
  await sqsService.sendTechRecordToSQS(techRecord);

  return { statusCode: 200, body: null }
};
