import { PlateReasonForIssue } from '../../src/models/Plates.model';
import { NewPlateRequest } from '../../src/models/Request.model';
import { DocumentName } from '../../src/models/SqsPayloadRequest.model';
import { formatPayload } from '../../src/services/sqs.service';

describe('test sqs service', () => {
  describe('test payload format', () => {
    const techRecord = {
      plates: [
        {
          plateSerialNumber: '1234',
          plateIssueDate: new Date(),
          plateReasonForIssue: PlateReasonForIssue.DESTROYED,
          plateIssuer: 'User',
        },
      ],
    };

    const request: NewPlateRequest = {
      vin: '1234',
      vrms: ['vrm1'],
      systemNumber: '1234',
      reasonForCreation: PlateReasonForIssue.DESTROYED,
      vtmUsername: 'User',
      techRecord,
    };
    it('should let me format message without a trailerID', () => {
      const res = formatPayload(techRecord, request);

      const vehicle = {
        vin: '1234',
        vrms: ['vrm1'],
        systemNumber: '1234',
        techRecord,
      };

      const expectedRes = {
        vehicle,
        documentName: DocumentName.VTG6_VTG7,
      };
      expect(res).toEqual(expectedRes);
    });

    it('should let me format message with a trailerID', () => {
      request.trailerId = '12345';
      const res = formatPayload(techRecord, request);

      const vehicle = {
        vin: '1234',
        vrms: ['vrm1'],
        systemNumber: '1234',
        trailerId: '12345',
        techRecord,
      };

      const expectedRes = {
        vehicle,
        documentName: DocumentName.VTG6_VTG7,
      };
      expect(res).toEqual(expectedRes);
    });
  });
});
