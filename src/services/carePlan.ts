import type { CarePlan, CareProfile } from '../types';

const STAGE_COPY: Record<CareProfile['babyStage'], string> = {
  NEWBORN: '0-2 个月新生儿的安抚与安全喂养',
  INFANT: '3-12 个月的感官探索与规律建立',
  TODDLER: '1-3 岁幼儿的自主练习与边界感'
};

const FOCUS_HASHTAGS: Record<string, string> = {
  feeding: '#科学喂养',
  sleep: '#睡眠节律',
  play: '#亲子互动',
  soothing: '#情绪安抚',
  language: '#语言刺激',
  milestone: '#发展里程碑'
};

export function buildCarePlan(profile: CareProfile): CarePlan {
  const focusHeadline =
    profile.focusAreas.map((area) => FOCUS_HASHTAGS[area] ?? `#${area}`).join(' ') || '#基础照护';

  const feedingFocus = profile.focusAreas.includes('feeding')
    ? '记录 24 小时喂养量与间隔，优先响应“找乳头/含手”这些早期饥饿信号，减少哭闹进餐。'
    : '维持按需喂养节奏，遇到闹觉先尝试安抚后再判断是否需要加餐。';

  const sleepFocus = profile.focusAreas.includes('sleep')
    ? '遵循“清醒时长”窗口安排小睡：新生儿 45-60 分钟、6 个月约 2 小时，提前 10 分钟做放松仪式。'
    : '保持卧室光线与白噪音一致，让宝宝逐渐分辨日夜，用固定口令提示入睡。';

  const playFocus = profile.focusAreas.includes('play')
    ? '准备对比强烈的黑白卡与不同触感的小物件，每日 2 轮 10 分钟自由探索。'
    : '即便忙碌也留出 5 分钟与宝宝对视、模仿发音，建立安全依恋。';

  const developmentFocus =
    profile.focusAreas.includes('language') || profile.focusAreas.includes('milestone')
      ? '把日常动作“边做边说”，例如换尿布时描述步骤，并记录宝宝尝试翻身/坐起的时间点。'
      : '每天捕捉一次宝宝主动动作并给予回应，例如他发出“啊”你就模仿，让大脑建立交互感。';

  const reminders: string[] = [
    '每周拍一张成长照片，留意体态与动作的微小变化。',
    '给宝宝探索空间的同时，确保视线可及、环境安全。',
    '家人之间共享喂养与睡眠记录，方便接力照护。'
  ];

  return {
    summary: `${profile.name} 当前处于 ${STAGE_COPY[profile.babyStage]}，本周重点 ${focusHeadline}。`,
    feedingFocus,
    sleepFocus,
    playFocus,
    developmentFocus,
    reminders
  };
}
