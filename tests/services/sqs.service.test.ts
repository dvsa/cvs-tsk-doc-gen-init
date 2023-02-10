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
          plateIssueDate: new Date().toISOString(),
          plateReasonForIssue: PlateReasonForIssue.DESTROYED,
          plateIssuer: 'User',
        },
        {
          plateSerialNumber: '1234',
          plateIssueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          plateReasonForIssue: PlateReasonForIssue.DESTROYED,
          plateIssuer: 'User',
        },
      ],
      vehicleType: 'hgv',
    };

    const request: NewPlateRequest = {
      vin: '1234',
      primaryVrm: 'vrm1',
      systemNumber: '1234',
      reasonForCreation: PlateReasonForIssue.DESTROYED,
      vtmUsername: 'User',
      techRecord,
    };
    it('should let me format message without a trailerID', () => {
      const res = formatPayload(techRecord, request);

      const vehicle = {
        vin: '1234',
        primaryVrm: 'vrm1',
        systemNumber: '1234',
        techRecord,
      };

      const plate = {
        plateSerialNumber: '12344321',
        plateIssueDate: techRecord.plates[0].plateIssueDate,
        plateReasonForIssue: PlateReasonForIssue.DESTROYED,
        plateIssuer: 'User',
      };

      const expectedRes = {
        vehicle,
        plate,
        documentName: DocumentName.MINISTRY,
      };
      expect(res).toEqual(expectedRes);
    });

    it('should let me format message with a trailerID and send correct documentName', () => {
      request.trailerId = '12345';
      request.techRecord.vehicleType = 'trl';
      const res = formatPayload(techRecord, request);

      const vehicle = {
        vin: '1234',
        primaryVrm: 'vrm1',
        systemNumber: '1234',
        trailerId: '12345',
        techRecord: { ...techRecord, vehicleType: 'trl' },
      };

      const plate = {
        plateSerialNumber: '12344321',
        plateIssueDate: techRecord.plates[0].plateIssueDate,
        plateReasonForIssue: PlateReasonForIssue.DESTROYED,
        plateIssuer: 'User',
      };

      const expectedRes = {
        vehicle,
        plate,
        documentName: DocumentName.MINISTRY_TRL,
      };
      expect(res).toEqual(expectedRes);
    });
  });
});
