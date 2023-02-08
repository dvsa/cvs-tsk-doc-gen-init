import 'dotenv/config';

export interface Config {
  DYNAMO_URL: string
  DYNAMO_REGION: string,
  SQS_REGION: string,
  TECHNICAL_RECORDS_TABLE: string,
  REFERENCE_INDEX: string,
}

export const getConfig = (): Config => {
  [
    'DYNAMO_URL',
    'DYNAMO_REGION',
    'SQS_REGION',
    'TECHNICAL_RECORDS_TABLE',
  ].forEach((envVar) => {
    if (!process.env[`${envVar}`]) {
      throw new Error(`Environment variable ${envVar} seems to be missing.`);
    }
  });
  return {
    DYNAMO_URL: process.env.DYNAMO_URL,
    DYNAMO_REGION: process.env.DYNAMO_REGION,
    SQS_REGION: process.env.SQS_REGION,
    TECHNICAL_RECORDS_TABLE: process.env.TECHNICAL_RECORDS_TABLE,
    REFERENCE_INDEX: process.env.REFERENCE_INDEX,
  };
};


export default {
  logger: {
    logLevel: process.env.LOG_LEVEL || 'info',
  },
};
