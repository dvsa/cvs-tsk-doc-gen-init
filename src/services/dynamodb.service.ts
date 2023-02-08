import { DynamoDB } from 'aws-sdk';
import { getConfig, Config } from '../config';

const config: Config = getConfig();
export const APPLICATION_SORT_VALUE = 'APPLICATION';

export type DynamoKey = { id:string, sortValue?:string };

export type Item = DynamoDB.DocumentClient.AttributeMap;

const client = new DynamoDB.DocumentClient({
  endpoint: config.DYNAMO_URL,
  region: config.DYNAMO_REGION,
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
  },
});

// const technicalRecordsTable = config.TECHNICAL_RECORDS_TABLE;
// const referenceIndex = config.REFERENCE_INDEX;


// export const put = async (keyValue: string, newValues: Record<string, unknown>):Promise<boolean> => {
//   const params = getUpdateParams(keyValue, newValues, applicationTable,
//     'attribute_exists(id) and attribute_not_exists(#status)');

//   try {
//     await client.update(params).promise();
//     return true;
//   } catch (err) {
//     if ((err as { code: string }).code === 'ConditionalCheckFailedException') {
//       return false;
//     }
//     throw err;
//   }
// };

// const getUpdateParams = (idValue: string, dynamoData: Record<string, unknown>, table: string,
//   conditionExpression:string):
// DynamoDB.UpdateItemInput => {
//   const updateExpressionKeys: string[] = [];
//   const expressionAttributeNames: Record<string, string> = { };
//   const expressionAttributeValues: Record<string, unknown> = { };

//   if (dynamoData.sortValue) {
//     delete dynamoData.sortValue;
//   }

//   if (dynamoData.id) {
//     delete dynamoData.id;
//   }

//   Object.keys(dynamoData).forEach((k) => {
//     updateExpressionKeys.push(`#${k} = :${k}`);
//     expressionAttributeNames[`#${k}`] = `${k}`;
//     expressionAttributeValues[`:${k}`] = dynamoData[`${k}`];
//   });

//   if (!expressionAttributeNames['#status'] && conditionExpression.indexOf('#status') > -1) {
//     expressionAttributeNames['#status'] = 'status';
//   }

//   const updateExpression = `SET ${updateExpressionKeys.join(', ')}`;
//   const results: DynamoDB.UpdateItemInput = {
//     TableName: table,
//     Key: <DynamoDB.Key>{ id: idValue, sortValue: APPLICATION_SORT_VALUE },
//     UpdateExpression: updateExpression,
//     ConditionExpression: conditionExpression,
//     ExpressionAttributeNames: expressionAttributeNames,
//     ExpressionAttributeValues: expressionAttributeValues,
//   };
//   return results;
// };

