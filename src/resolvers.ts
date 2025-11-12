import type { CareProfile } from './types';
import { getDailyTips } from './data/tips';
import { buildCarePlan } from './services/carePlan';
import { askBabyCoach } from './services/agentService';

function normalizeProfile(input: any): CareProfile {
  if (!input) {
    throw new Error('缺少个人档案信息');
  }

  const stage = input.babyStage;
  if (!['NEWBORN', 'INFANT', 'TODDLER'].includes(stage)) {
    throw new Error('babyStage 无效');
  }

  return {
    name: input.name || '宝宝',
    babyAgeWeeks: Number.isFinite(input.babyAgeWeeks) ? input.babyAgeWeeks : 0,
    babyStage: stage as CareProfile['babyStage'],
    focusAreas: Array.isArray(input.focusAreas) ? input.focusAreas : []
  };
}

export const resolvers = {
  Query: {
    dailyTips: (_: unknown, args: { profile: CareProfile }) => {
      const profile = normalizeProfile(args.profile);
      return getDailyTips(profile);
    },
    carePlan: (_: unknown, args: { profile: CareProfile }) => {
      const profile = normalizeProfile(args.profile);
      return buildCarePlan(profile);
    }
  },
  Mutation: {
    askAgent: async (_: unknown, args: { input: { question: string; profile: CareProfile } }) => {
      const profile = normalizeProfile(args.input?.profile);
      return askBabyCoach(args.input?.question ?? '', profile);
    }
  }
};
