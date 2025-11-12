export type BabyStage = 'NEWBORN' | 'INFANT' | 'TODDLER';

export interface CareProfile {
  name: string;
  babyAgeWeeks: number;
  babyStage: BabyStage;
  focusAreas: string[];
}

export interface BabyTip {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: BabyStage | 'ALL';
  focusArea?: string;
}

export interface CarePlan {
  summary: string;
  feedingFocus: string;
  sleepFocus: string;
  playFocus: string;
  developmentFocus: string;
  reminders: string[];
}

export interface AgentResponsePayload {
  message: string;
  highlights: string[];
}

export interface GraphQLContext {
  requestId: string;
}
