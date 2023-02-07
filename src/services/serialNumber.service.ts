import { Lambda } from 'aws-sdk';
import { PlateSerialNumberResponse } from '../models/PlateSerialNumberResponse.model';

const lambda = new Lambda({
  region: process.env.AWS_PROVIDER_REGION
});

export const getSerialNumber = async (): Promise<string> => {

  // call the serial number service (which is another lambda function)
  return new Promise((resolve, reject) => {
    const params = {
      FunctionName: 'generatePlateSerialNumber', //process.env.GENERATE_PLATE_SERIAL_NUMBER_FUNCTION_NAME,
      InvocationType: 'Event', // Event = async
      Payload: JSON.stringify({
        "httpMethod": "POST",
        "path": "/plateSerialNo"
      }),
      LogType: 'Tail'
    };

    console.log('Calling generatePlateSerialNumber lambda function...');

    lambda.invoke(params, (error, data) => {
      if (error) {
        console.log('Calling generatePlateSerialNumber lambda function: ERROR: ', error);
        reject(error);
      } else {
        console.log('Calling generatePlateSerialNumber lambda function: success: ', data);
        resolve((data.Payload as PlateSerialNumberResponse).plateSerialNumber);
      }
    });
  });
};
