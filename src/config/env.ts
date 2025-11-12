import { config } from 'dotenv';

try {
  config();
} catch {
  /* noop for edge runtimes */
}

let runtimeEnv = {
  openAiKey: typeof process !== 'undefined' ? process.env.OPENAI_API_KEY ?? '' : ''
};

export const env = runtimeEnv;

export function setRuntimeEnv(partial: { openAiKey?: string }) {
  runtimeEnv = {
    ...runtimeEnv,
    ...partial
  };
  env.openAiKey = runtimeEnv.openAiKey;
}

export function assertEnv() {
  if (!env.openAiKey) {
    console.warn('OPENAI_API_KEY 未设置，AI Agent 将无法正常调用。');
  }
}
