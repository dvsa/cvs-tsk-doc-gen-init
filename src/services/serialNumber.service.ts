import { AWSError, Lambda } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { getConfig, Config } from '../config';
import logger from '../observability/logger';

const config: Config = getConfig();

const lambda = new Lambda({
  region: process.env.AWS_PROVIDER_REGION,
});

export const getSerialNumber = async (): Promise<string> => {
  // call the serial number service (which is another lambda function)
  const params = {
    FunctionName: config.GENERATE_PLATE_SERIAL_NUMBER_FUNCTION_NAME,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      httpMethod: 'POST',
      path: config.GENERATE_PLATE_SERIAL_NUMBER_PATH,
    }),
    LogType: 'Tail',
  };

  logger.info(`Calling gen plate serial number lambda function (${config.GENERATE_PLATE_SERIAL_NUMBER_FUNCTION_NAME})...`);

  return lambda.invoke(params)
    .promise()
    .then((response: PromiseResult<Lambda.Types.InvocationResponse, AWSError>) => {
      logger.info('Gen plate serial number lambda function returned: ${JSON.stringify(response)}');
      const payload = JSON.parse(response.Payload as string);
      const body = JSON.parse(payload.body);
      if (body.statusCode !== 200) {
        throw new Error(`Gen plate serial number lambda return status: ${body.statusCode}`);
      }
      return body.plateSerialNumber;
    })
    .catch((error) => {
      logger.error('Error calling gen plate serial number lambda function: ${error}');
      throw error;
    });
};
