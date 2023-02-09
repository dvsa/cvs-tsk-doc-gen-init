import { DynamoDB } from 'aws-sdk';
import { getConfig, Config } from '../config';
import { Vehicle } from '../models/Vehicle.model';

const config: Config = getConfig();

export type DynamoKey = { id: string; sortValue?: string };

export type Item = DynamoDB.DocumentClient.AttributeMap;

const client = new DynamoDB.DocumentClient({
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
  },
});

export const put = (vehicle: Vehicle) => {
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
    ReturnValues: 'NONE',
  };

  if (trailerId) {
    query.UpdateExpression += ', trailerId = :trailerId';
    Object.assign(query.ExpressionAttributeValues, {
      ':trailerId': trailerId,
    });
  }

  return client.update(query).promise();
};
