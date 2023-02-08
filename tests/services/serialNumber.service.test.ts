import { Lambda } from 'aws-sdk';
import { getSerialNumber } from '../../src/services/serialNumber.service';

jest.mock('aws-sdk', () => {
  const mLambda = { invoke: jest.fn() };
  return { Lambda: jest.fn(() => mLambda) };
});

describe('serialNumberService tests', () => {
  beforeAll(() => {
    const mLambda = new Lambda();
    const mRes = {
      Payload: {
        plateSerialNumber: '12345',
      },
    };
    (mLambda.invoke as jest.Mocked<any>).mockImplementation((_params, callback) => {
      callback(null, mRes);
    });
  });

  it('should call the generate plate number lambda', async () => {
    expect.assertions(1);

    const serialNumber = await getSerialNumber();
    expect(serialNumber).toBe('12345');
  });
});
