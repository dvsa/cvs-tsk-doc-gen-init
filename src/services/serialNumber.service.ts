import { Lambda } from 'aws-sdk';
import { getConfig, Config } from '../config';
import logger from '../observability/logger';
import { PlateSerialNumberResponse } from '../models/PlateSerialNumberResponse.model';

const config: Config = getConfig();

const lambda = new Lambda({
  region: process.env.AWS_PROVIDER_REGION,
});

export const getSerialNumber = async (): Promise<string> => new Promise((resolve, reject) => {
  // call the serial number service (which is another lambda function)
  const params = {
    FunctionName: config.GENERATE_PLATE_SERIAL_NUMBER_FUNCTION_NAME,
    InvocationType: 'Event', // Event = async
    Payload: JSON.stringify({
      httpMethod: 'POST',
      path: config.GENERATE_PLATE_SERIAL_NUMBER_PATH,
    }),
    LogType: 'Tail',
  };

  logger.info(`Calling gen plate serial number lambda function (${config.GENERATE_PLATE_SERIAL_NUMBER_FUNCTION_NAME})...`);

  lambda.invoke(params, (error, data) => {
    if (error) {
      logger.error('Calling gen plate serial number lambda function: ERROR: ', error);
      reject(error);
    } else {
      logger.info('Calling gen plate serial number lambda function: success: ', data);
      resolve((data.Payload as PlateSerialNumberResponse).plateSerialNumber);
    }
  });
});
