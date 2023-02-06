export interface Plates {
  plateSerialNumber?: string;
  plateIssueDate?: Date;
  plateReasonForIssue?: PlateReasonForIssue;
  plateIssuer?: string;
}

export enum PlateReasonForIssue {
  FREE_REPLACEMENT = 'Free replacement',
  REPLACEMENT = 'Replacement',
  DESTROYED = 'Destroyed',
  PROVISIONAL = 'Provisional',
  ORIGINAL = 'Original',
  MANUAL = 'Manual',
}
