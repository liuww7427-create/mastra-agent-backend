import type { BabyTip, CareProfile } from '../types';

const TIP_LIBRARY: BabyTip[] = [
  {
    id: 'newborn-feed-cue',
    title: '观察新生儿饥饿信号',
    description: '出现吸吮手指、寻找反射或发出轻哼就是开餐信号，别等到大哭才喂，能减少吞气和肠胀气。',
    category: 'feeding',
    stage: 'NEWBORN',
    focusArea: 'feeding'
  },
  {
    id: 'infant-tummy-time',
    title: '3 轮抬头小游戏',
    description: '白天挑三个清醒时段，每次让宝宝趴 2-3 分钟，放玩具在眼前慢慢移动，练颈背肌肉。',
    category: 'play',
    stage: 'INFANT',
    focusArea: 'play'
  },
  {
    id: 'toddler-sleep-routine',
    title: '固定三步入睡流程',
    description: '洗漱→讲 2 分钟小故事→播放同一段白噪音，让幼儿知道“现在该睡觉啦”，降低拖延。',
    category: 'sleep',
    stage: 'TODDLER',
    focusArea: 'sleep'
  },
  {
    id: 'infant-soothing',
    title: '5S 安抚组合',
    description: '包裹、侧抱、轻摇、嘘声、吸吮依序进行，帮助 0-6 个月宝宝快速平稳情绪。',
    category: 'soothing',
    stage: 'INFANT',
    focusArea: 'soothing'
  },
  {
    id: 'motor-rollover',
    title: '翻身练习',
    description: '在软垫上把玩具放在宝宝侧身 30cm 处，引导他侧躺再翻正，逐渐建立核心力量。',
    category: 'development',
    stage: 'INFANT',
    focusArea: 'milestone'
  },
  {
    id: 'newborn-daylight',
    title: '白天晒太阳 10 分钟',
    description: '清晨或傍晚在窗边抱着宝宝，让自然光照在脸上，有助于建立昼夜节律，晚上更好睡。',
    category: 'rhythm',
    stage: 'NEWBORN',
    focusArea: 'sleep'
  },
  {
    id: 'toddler-language',
    title: '描述式语言输入',
    description: '带宝宝收玩具时慢慢说：“我们把红色积木放进篮子里”，让他听到大量场景化词汇。',
    category: 'language',
    stage: 'TODDLER',
    focusArea: 'language'
  },
  {
    id: 'all-sensory-bottle',
    title: '自制感官瓶',
    description: '透明瓶加入亮片、彩珠与水，宝宝摇晃时能追踪光点，训练视觉专注力。',
    category: 'sensory',
    stage: 'ALL'
  }
];

export function getDailyTips(profile: CareProfile): BabyTip[] {
  const focusSet = new Set(profile.focusAreas);
  const filtered = TIP_LIBRARY.filter((tip) => {
    const stageMatch = tip.stage === 'ALL' || tip.stage === profile.babyStage;
    const focusMatch = !tip.focusArea || focusSet.has(tip.focusArea);
    return stageMatch && focusMatch;
  });

  if (filtered.length >= 3) {
    return filtered.slice(0, 4);
  }

  const generalTips = TIP_LIBRARY.filter((tip) => tip.stage === 'ALL');
  return [...filtered, ...generalTips].slice(0, 4);
}
