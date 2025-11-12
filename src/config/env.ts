import { config } from 'dotenv';

config();

export const env = {
  openAiKey: process.env.OPENAI_API_KEY ?? ''
};

export function assertEnv() {
  if (!env.openAiKey) {
    console.warn('OPENAI_API_KEY 未设置，AI Agent 将无法正常调用。');
  }
}
