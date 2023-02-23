export interface Letter {
  letterType: LetterType;
  paragraphId: ParagraphId;
  letterIssuer: string;
  letterDateRequested: string;
}

export enum LetterType {
  TRL_ACCEPTANCE = 'trailer accept',
  TRL_REJECTION = 'trailer rejection',
}

export enum ParagraphId {
  PARAGRAPH_3 = 3,
  PARAGRAPH_4 = 4,
  PARAGRAPH_5 = 5,
  PARAGRAPH_6 = 6,
  PARAGRAPH_7 = 7,
}
