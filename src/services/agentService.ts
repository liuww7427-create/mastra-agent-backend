import { Agent } from '@mastra/core/agent';
import type { AgentResponsePayload, CareProfile } from '../types';
import { assertEnv } from '../config/env';

assertEnv();

const babyCoachAgent = new Agent({
  name: 'baby-care-agent',
  instructions: {
    role: 'system',
    content:
      '你是一名专业育儿教练，熟悉科学喂养、睡眠节律、感统训练以及常见风险信号。请用温柔但明确的语气，用简体中文输出 3-4 条可以立刻执行的步骤，必要时提醒家长关注安全边界。'
  },
  model: 'openai/gpt-4o-mini'
});

function buildPrompt(question: string, profile: CareProfile): string {
  const focus = profile.focusAreas.length > 0 ? profile.focusAreas.join('、') : '基础照护';
  return `宝宝档案：
- 昵称：${profile.name}
- 宝宝周龄：${profile.babyAgeWeeks}
- 阶段：${profile.babyStage}
- 关注主题：${focus}

请以「今日带娃攻略」的口吻回答：${question}
输出要求：
1. 用 1 段 2 句话表达理解与鼓励
2. 给出 3 条按数字列举的具体步骤，分别涵盖喂养/睡眠/互动中的任意三项
3. 若存在潜在风险，额外提醒“如出现异常请及时就医”
4. 语气专业、温柔，使用家长易懂的词汇。`;
}

function extractHighlights(message: string): string[] {
  return message
    .split(/\n|\r|\u2022|-/)
    .map((line) => line.replace(/^\s*\d+[\.、)]?\s*/, '').trim())
    .filter((line) => line.length > 0)
    .slice(0, 4);
}

export async function askBabyCoach(question: string, profile: CareProfile): Promise<AgentResponsePayload> {
  if (!question.trim()) {
    throw new Error('问题不能为空');
  }

  const prompt = buildPrompt(question, profile);
  const response = await babyCoachAgent.generate(prompt);
  const message = response.text ?? '目前无法生成建议，请稍后再试。';
  return {
    message,
    highlights: extractHighlights(message)
  };
}
