import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, ReturnValue } from '@aws-sdk/client-dynamodb';
import { getConfig, Config } from '../config';
import { Vehicle } from '../models/Vehicle.model';
import logger from '../observability/logger';

const config: Config = getConfig();

export type DynamoKey = { id: string; sortValue?: string };

export type Item = Record<string, any>;

// const client = DynamoDBDocument.from(new DynamoDB({
//   maxRetries: 3,
//   httpOptions: {
//     timeout: 5000,
//   },
// }));

const client = new DynamoDBClient();

export const put = async (vehicle: Vehicle): Promise<void> => {
  const {
    systemNumber, vin, trailerId, techRecord,
  } = vehicle;

  const query = {
    TableName: config.TECHNICAL_RECORDS_TABLE,
    Key: {
      systemNumber,
      vin,
    },
    UpdateExpression: 'set techRecord = :techRecord',
    ConditionExpression: 'systemNumber = :systemNumber AND vin = :vin',
    ExpressionAttributeValues: {
      ':systemNumber': systemNumber,
      ':vin': vin,
      ':techRecord': techRecord,
    },
    ReturnValues: ReturnValue.NONE,
  };

  if (trailerId) {
    logger.info(`found trailerId: ${trailerId} - adding to update expression`);
    query.UpdateExpression += ', trailerId = :trailerId';
    Object.assign(query.ExpressionAttributeValues, {
      ':trailerId': trailerId,
    });
  }

  try {
    await client.send(new UpdateCommand(query));
  } catch (err: unknown) {
    logger.error(err);
    throw new Error(err as string);
  }
};
