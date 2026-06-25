export type NodeType = 'dialogue' | 'choice' | 'summary';

export type Quality = 'optimal' | 'suboptimal' | 'risk';

export type Stats = {
  professionalSkill: number;
  studentTrust: number;
  classOrder: number;
  ethicsRisk: number;
  lawRisk: number;
  examScore: number;
  affection_lu: number;
  affection_jiang: number;
  affection_shen: number;
  affection_gu: number;
  affection_cheng: number;
  affection_yan: number;
  affection_chen: number;
};

// ===== 分支引擎（P0/P1）：全部 optional，旧数据零改动仍按顺序播放 =====
export type FlagOps = Record<string, boolean | number>; // 设置/增量标记

export type BranchRule = {
  // 满足 condition 则跳到 goto；多条按数组顺序取第一个命中；都不中走顺序下一节点
  condition: {
    affectionGte?: Partial<Record<'lu' | 'jiang' | 'gu' | 'shen' | 'cheng' | 'yan', number>>;
    flagsAllTrue?: string[];
    flagsAnyTrue?: string[];
    minExamPointsCleared?: number; // 已掌握考点数（接学习层进度）
  };
  goto: string; // 目标 nodeId（在当前章内）
};

export type ExamTags = {
  subject: string;
  module: string;
  examPoint: string;
  questionType: string;
};

export type Choice = {
  id: string;
  text: string;
  quality: Quality;
  effects: Partial<Stats>;
  feedback: string;
  answerKeywords: string[];
  // —— 新增（optional）——
  setFlag?: FlagOps; // 选此项：设置/累加标记
  next?: string; // 选此项后直接跳到的 nodeId（不写则顺序前进，保持旧行为）
};

export type ChapterReview = {
  learnedExamPoints?: string[];
  structure?: string;
  mockExam?: string;
  recommendedReview?: string[];
  // —— 路线结局复盘（optional）——
  endingType?: string;
  endingTitle?: string;
  condition?: string;
};

export type StoryNode = {
  id: string;
  type: NodeType;
  background: string;
  speaker: string;
  text: string;
  expression?: 'neutral' | 'smile' | 'serious' | 'worried';
  examTags?: ExamTags;
  choices?: Choice[];
  knowledgeCheck?: string;
  review?: ChapterReview;
  // —— 新增（optional）——
  branch?: BranchRule[]; // 节点结束时按规则跳转（非选择型分歧、收束、锁线判定）
};

export type RouteKey = 'lu' | 'jiang' | 'gu' | 'shen' | 'cheng' | 'yan';

export type Chapter = {
  chapterId: string;
  title: string;
  summary: string;
  characters?: string[];
  nodes: StoryNode[];
  // —— 新增（optional）——
  requires?: BranchRule['condition']; // 不满足则该章在选单里锁定/隐藏
  route?: 'common' | 'lu' | 'gu' | 'jiang' | 'cheng' | 'shen' | 'yan' | 'npc'; // 章归属
};

export type QuizOption = { id: string; text: string };

export type QuizItem = {
  id: string;
  kpId?: string;
  type: 'single' | 'multiple';
  subject: string;
  module: string;
  examPoint: string;
  difficulty: string;
  stage?: string;
  diegetic?: { asker: string; scene: string; framing: string };
  stem: string;
  options: QuizOption[];
  answer: string[];
  explanation: string;
  distractorTraps?: Record<string, string>;
  answerKeywords: string[];
  source?: string;
};

export type MockExam = {
  id: string;
  title: string;
  framing?: string;
  coldTestItems: string[];
  note?: string;
  weaknessThreshold?: string;
};

export type QuizBank = {
  bankId: string;
  title: string;
  items: QuizItem[];
  mockExam?: MockExam;
};

export type HistoryEntry = {
  nodeId: string;
  choiceText: string;
  quality: Quality;
  feedback: string;
  examTags?: ExamTags;
  answerKeywords: string[];
};

export type QuizResult = {
  id: string;
  module: string;
  correct: boolean;
  stage?: string;
};
