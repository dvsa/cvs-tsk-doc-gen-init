import { PlateSerialNumberResponse } from '../../src/models/PlateSerialNumberResponse.model';
import { getSerialNumber } from '../../src/services/serialNumber.service';
import { Lambda } from 'aws-sdk';

jest.mock('aws-sdk');

describe('serialNumberService tests', () => {
  //TODO: fix this test!
  beforeAll(() => {
    ((Lambda as unknown) as jest.Mock).mockImplementation(() => ({
      invoke: jest.fn().mockImplementation((_, callback) => {
        callback(null, {
          Payload: JSON.stringify({
            plateSerialNumber: '12345',
          } as PlateSerialNumberResponse),
        });
      }),
    }));
  });

  it('should call the generate plate number lamdba', async () => {
    const serialNumber = await getSerialNumber();
    expect(serialNumber).toBe(12345);
  });
});
