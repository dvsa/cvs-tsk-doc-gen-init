import { SQS } from 'aws-sdk';
import { TechRecord } from '../models/Request.model';
import logger from '../observability/logger';


export const sendTechRecordToSQS = async (techRecord: TechRecord): Promise<void> => {
  logger.info('Send tech record to SQS');

  const sqs = new SQS({apiVersion: '2012-11-05'});

  const params = {
    MessageBody: JSON.stringify(techRecord),
    QueueUrl: process.env.DOC_GEN_SQS_QUEUE
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      throw new Error(err.message)
    } else {
      logger.info("Success", data.MessageId);
      return
    }
  });
};
