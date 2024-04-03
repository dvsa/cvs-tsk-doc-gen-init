/* eslint-disable import/first */
// const mockInvoke = jest.fn();

import { InvokeCommand, InvokeCommandOutput, Lambda } from '@aws-sdk/client-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { getSerialNumber } from '../../src/services/serialNumber.service';

// jest.mock('aws-sdk', () => {
//   const mLambda = { invoke: mockInvoke };

//   enum InvocationType { RequestResponse = 'RequestResponse' }
//   enum LogType { Tail = 'Tail' }

//   return {
//     Lambda: jest.fn(() => mLambda),
//     InvocationType,
//     LogType,
//   };
// });

describe('serialNumberService tests', () => {
  beforeAll(() => {
    // const mLambda = new Lambda();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mockLambda = mockClient(Lambda);
    const mBody = JSON.stringify({
      plateSerialNumber: '12345',
    });
    const mRes = {
      Payload: JSON.stringify({
        statusCode: 200,
        body: mBody,
      }),
    };
    mockLambda.on(InvokeCommand).resolves(mRes as unknown as InvokeCommandOutput);
    // mockInvoke.mockImplementation(() => ({ promise: jest.fn().mockResolvedValue(mRes) }));
  });

  it('should call the generate plate number lambda', async () => {
    expect.assertions(1);

    const serialNumber = await getSerialNumber();
    expect(serialNumber).toBe('12345');
  });
});
