import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { RotateCcw, Settings, X } from 'lucide-react';
import ChapterIntro from './ChapterIntro';
import MyClassroom, { type ClassFurniture } from './MyClassroom';
import ch01Nodes from './data/chapter01_nodes.json';
import ch01Quiz from './data/chapter01_quiz.json';
import ch02Nodes from './data/chapter02_nodes.json';
import ch02Quiz from './data/chapter02_quiz.json';
import ch03Nodes from './data/chapter03_nodes.json';
import ch03Quiz from './data/chapter03_quiz.json';
import ch04Nodes from './data/chapter04_nodes.json';
import ch04Quiz from './data/chapter04_quiz.json';
import ch05Nodes from './data/chapter05_nodes.json';
import ch05Quiz from './data/chapter05_quiz.json';
import ch06Nodes from './data/chapter06_nodes.json';
import ch06Quiz from './data/chapter06_quiz.json';
import ch07Nodes from './data/chapter07_nodes.json';
import ch07Quiz from './data/chapter07_quiz.json';
import ch08Nodes from './data/chapter08_nodes.json';
import ch08Quiz from './data/chapter08_quiz.json';
import ch09Nodes from './data/chapter09_nodes.json';
import ch09Quiz from './data/chapter09_quiz.json';
import ch10Nodes from './data/chapter10_nodes.json';
import ch10Quiz from './data/chapter10_quiz.json';
import ch11Nodes from './data/chapter11_nodes.json';
import ch11Quiz from './data/chapter11_quiz.json';
import ch12Nodes from './data/chapter12_nodes.json';
import ch12Quiz from './data/chapter12_quiz.json';
import ch13Nodes from './data/chapter13_nodes.json';
import ch13Quiz from './data/chapter13_quiz.json';
import ch14Nodes from './data/chapter14_nodes.json';
import ch14Quiz from './data/chapter14_quiz.json';
import ch15Nodes from './data/chapter15_nodes.json';
import ch15Quiz from './data/chapter15_quiz.json';
import ch16Nodes from './data/chapter16_nodes.json';
import ch16Quiz from './data/chapter16_quiz.json';
import ch17Nodes from './data/chapter17_nodes.json';
import ch17Quiz from './data/chapter17_quiz.json';
import side01Nodes from './data/side_group_01_nodes.json';
import side02Nodes from './data/side_group_02_nodes.json';
import side03Nodes from './data/side_group_03_nodes.json';
import side04Nodes from './data/side_group_04_nodes.json';
import side05Nodes from './data/side_group_05_nodes.json';
import sideGroupQuiz from './data/side_group_quiz.json';
// ===== 番外番外（番外 · IT 命名空间，与 301/302 完全隔离）=====
import bz1Nodes from './data/bonus_zhong_1_nodes.json';
import bz2Nodes from './data/bonus_zhong_2_nodes.json';
import bz3Nodes from './data/bonus_zhong_3_nodes.json';
import bz4Nodes from './data/bonus_zhong_4_nodes.json';
import bzSide1Nodes from './data/bonus_zhong_side1_nodes.json';
import itQuizData from './data/question_bank_it.json';
import kmapItData from './data/knowledge_map_it.json';
// ===== 路线章节（共通 ch1-4 锁线后续接，P0 经路线选择入口进入；不进主线/番外选单）=====
import chLu1Nodes from './data/ch_lu_1_nodes.json';
import chLu2Nodes from './data/ch_lu_2_nodes.json';
import chLu3Nodes from './data/ch_lu_3_nodes.json';
import chLuQuiz from './data/ch_lu_quiz.json';
import chGu1Nodes from './data/ch_gu_1_nodes.json';
import chGu2Nodes from './data/ch_gu_2_nodes.json';
import chGu3Nodes from './data/ch_gu_3_nodes.json';
import chGuQuiz from './data/ch_gu_quiz.json';
import chJiang1Nodes from './data/ch_jiang_1_nodes.json';
import chJiang2Nodes from './data/ch_jiang_2_nodes.json';
import chJiang3Nodes from './data/ch_jiang_3_nodes.json';
import chJiangQuiz from './data/ch_jiang_quiz.json';
import chCheng1Nodes from './data/ch_cheng_1_nodes.json';
import chCheng2Nodes from './data/ch_cheng_2_nodes.json';
import chCheng3Nodes from './data/ch_cheng_3_nodes.json';
import chChengQuiz from './data/ch_cheng_quiz.json';
import chShen1Nodes from './data/ch_shen_1_nodes.json';
import chShen2Nodes from './data/ch_shen_2_nodes.json';
import chShenQuiz from './data/ch_shen_quiz.json';
import chYan1Nodes from './data/ch_yan_1_nodes.json';
import chYan2Nodes from './data/ch_yan_2_nodes.json';
import chYanQuiz from './data/ch_yan_quiz.json';
import npcZhouNodes from './data/npc_zhou_nodes.json';
import npcZhouQuiz from './data/npc_zhou_quiz.json';
import npcSuNodes from './data/npc_su_nodes.json';
import npcSuQuiz from './data/npc_su_quiz.json';
import npcWeiNodes from './data/npc_wei_nodes.json';
import npcWeiQuiz from './data/npc_wei_quiz.json';
import kmapData from './data/knowledge_map.json';
import bankData from './data/question_bank.json';
import galleryData from './assets/gallery/gallery.json';
import subjData from './data/question_bank_subjective.json';
import ch06Subj from './data/chapter06_subjective.json';
import ch07Subj from './data/chapter07_subjective.json';
import ch08Subj from './data/chapter08_subjective.json';
import ch09Subj from './data/chapter09_subjective.json';
import ch11Subj from './data/chapter11_subjective.json';
import ch12Subj from './data/chapter12_subjective.json';
import ch13Subj from './data/chapter13_subjective.json';
import ch14Subj from './data/chapter14_subjective.json';
import ch15Subj from './data/chapter15_subjective.json';
import ch16Subj from './data/chapter16_subjective.json';
import ch17Subj from './data/chapter17_subjective.json';
import bz1Subj from './data/bonus_zhong_1_subjective.json';
import bz2Subj from './data/bonus_zhong_2_subjective.json';
import bz3Subj from './data/bonus_zhong_3_subjective.json';
import bz4Subj from './data/bonus_zhong_4_subjective.json';
import zhentiData from './data/zhenti_bank.json';
import routeExamsData from './data/route_exams.json';
import endingsData from './data/endings.json';
import luNeutral from './assets/characters/lu_neutral.png';
import luSmile from './assets/characters/lu_smile.png';
import luSerious from './assets/characters/lu_serious.png';
import luWorried from './assets/characters/lu_worried.png';
import luBlush from './assets/characters/lu_blush.png';
import luTender from './assets/characters/lu_tender.png';
import luSurprised from './assets/characters/lu_surprised.png';
import jiangNeutral from './assets/characters/jiang_neutral.png';
import jiangSmile from './assets/characters/jiang_smile.png';
import jiangSerious from './assets/characters/jiang_serious.png';
import jiangWorried from './assets/characters/jiang_worried.png';
import jiangBlush from './assets/characters/jiang_blush.png';
import jiangTender from './assets/characters/jiang_tender.png';
import jiangSurprised from './assets/characters/jiang_surprised.png';
import guNeutral from './assets/characters/gu_neutral.png';
import guSmile from './assets/characters/gu_smile.png';
import guSerious from './assets/characters/gu_serious.png';
import guWorried from './assets/characters/gu_worried.png';
import guBlush from './assets/characters/gu_blush.png';
import guTender from './assets/characters/gu_tender.png';
import guSurprised from './assets/characters/gu_surprised.png';
import shenNeutral from './assets/characters/shen_neutral.png';
import shenSmile from './assets/characters/shen_smile.png';
import shenSerious from './assets/characters/shen_serious.png';
import shenWorried from './assets/characters/shen_worried.png';
import shenBlush from './assets/characters/shen_blush.png';
import shenTender from './assets/characters/shen_tender.png';
import shenGrin from './assets/characters/shen_grin.png';
import chengNeutral from './assets/characters/cheng_neutral.png';
import chengSmile from './assets/characters/cheng_smile.png';
import chengSerious from './assets/characters/cheng_serious.png';
import chengWorried from './assets/characters/cheng_worried.png';
import chengBlush from './assets/characters/cheng_blush.png';
import chengTender from './assets/characters/cheng_tender.png';
import yanNeutral from './assets/characters/yan_neutral.png';
import yanSmile from './assets/characters/yan_smile.png';
import yanSerious from './assets/characters/yan_serious.png';
import yanWorried from './assets/characters/yan_worried.png';
import zhongNeutral from './assets/characters/zhong_neutral.png';
import zhongSmile from './assets/characters/zhong_smile.png';
import zhongSerious from './assets/characters/zhong_serious.png';
import zhongBlush from './assets/characters/zhong_blush.png';
  // (本地番外角色，公开版已隐藏)
import chenNeutral from './assets/characters/chen_neutral.png';
import chenSmile from './assets/characters/chen_smile.png';
import chenSerious from './assets/characters/chen_serious.png';
import chenBlush from './assets/characters/chen_blush.png';
import maNeutral from './assets/characters/ma_neutral.png';
import maSmile from './assets/characters/ma_smile.png';
import maSerious from './assets/characters/ma_serious.png';
import maBlush from './assets/characters/ma_blush.png';
import bateNeutral from './assets/characters/bate_neutral.png';
import bateSmile from './assets/characters/bate_smile.png';
import bateSerious from './assets/characters/bate_serious.png';
import bateBlush from './assets/characters/bate_blush.png';
import ayuNeutral from './assets/characters/ayu_neutral.png';
import ayuSmile from './assets/characters/ayu_smile.png';
import ayuSerious from './assets/characters/ayu_serious.png';
import ayuBlush from './assets/characters/ayu_blush.png';
import shanheNeutral from './assets/characters/shanhe_neutral.png';
import shanheSmile from './assets/characters/shanhe_smile.png';
import shanheSerious from './assets/characters/shanhe_serious.png';
import shanheBlush from './assets/characters/shanhe_blush.png';
import liangNeutral from './assets/characters/liang_neutral.png';
import liangSmile from './assets/characters/liang_smile.png';
import liangSerious from './assets/characters/liang_serious.png';
import liangBlush from './assets/characters/liang_blush.png';
import manzaiNeutral from './assets/characters/manzai_neutral.png';
import manzaiSmile from './assets/characters/manzai_smile.png';
import manzaiSerious from './assets/characters/manzai_serious.png';
import manzaiBlush from './assets/characters/manzai_blush.png';
import ajinNeutral from './assets/characters/ajin_neutral.png';
import ajinSmile from './assets/characters/ajin_smile.png';
import ajinSerious from './assets/characters/ajin_serious.png';
import ajinBlush from './assets/characters/ajin_blush.png';
import laoleiNeutral from './assets/characters/laolei_neutral.png';
import laoleiSmile from './assets/characters/laolei_smile.png';
import laoleiSerious from './assets/characters/laolei_serious.png';
import laoleiBlush from './assets/characters/laolei_blush.png';
import suNeutral from './assets/characters/su_neutral.png';
import suSmile from './assets/characters/su_smile.png';
import weiNeutral from './assets/characters/wei_neutral.png';
import weiSerious from './assets/characters/wei_serious.png';
import zhouNeutral from './assets/characters/zhou_neutral.png';
import bgStaffRoom from './assets/bg/staff_room.jpg';
import bgMeetingRoom from './assets/bg/meeting_room.jpg';
import bgClassroom from './assets/bg/classroom.jpg';
import bgCorridor from './assets/bg/corridor.jpg';
import bgCounselingRoom from './assets/bg/counseling_room.jpg';
import bgResearchCenter from './assets/bg/bg_research_center.jpg';
import bgRainPlayground from './assets/bg/bg_rain_playground.jpg';
import bgCareerRoom from './assets/bg/bg_career_room.jpg';
import bgTeacherApartment from './assets/bg/bg_teacher_apartment.jpg';
import bgExamHall from './assets/bg/bg_exam_hall.jpg';
import bgAuditorium from './assets/bg/bg_auditorium.jpg';
// 番外番外专属背景（新出）
import bgGym from './assets/bg/gym.jpg';
import bgChenEatery from './assets/bg/chen_eatery.jpg';
import bgZhongKitchen from './assets/bg/zhong_kitchen.jpg';
import bgZhongBedroom from './assets/bg/zhong_bedroom.jpg';
import bgBathhouse from './assets/bg/bathhouse.jpg';
import bgBookcafe from './assets/bg/bookcafe.jpg';
import bgMainMenuKeyart from './assets/bg/main_menu_keyart.png';
import avatarLu from './assets/avatars/lu.png';
import avatarJiang from './assets/avatars/jiang.png';
import avatarGu from './assets/avatars/gu.png';
import avatarShen from './assets/avatars/shen.png';
import cgManifest from './assets/cg/cg_manifest.json';
import type {
  BranchRule,
  Chapter,
  Choice,
  FlagOps,
  HistoryEntry,
  Quality,
  QuizBank,
  QuizItem,
  QuizResult,
  RouteKey,
  Stats,
  StoryNode,
} from './types';

// 公开 build 开关：VITE_PUBLIC=1 时隐藏番外番外(R向)及尚不完善的「我的教室」入口，用于对外可玩 demo。
const PUBLIC_BUILD = import.meta.env.VITE_PUBLIC === '1';
// ===== 多章节：按顺序排列，菜单按进度解锁，章末进入下一章 =====
const EMPTY_QUIZ = { bankId: 'side', title: '', items: [], mockExam: { id: '', title: '', coldTestItems: [] } } as unknown as QuizBank;
// 前 MAIN_COUNT 个是主线章节（进章节选择/进度解锁）；之后是番外群像（不计进度，从"番外"入口进）
const MAIN_COUNT = 17;
// 顺序约定：主线 0..7、番外 8..9、路线章 10+（路线章只经"选择攻略线"入口进入，不进主线/番外选单）
const CHAPTERS = [
  ch01Nodes, ch02Nodes, ch03Nodes, ch04Nodes, ch05Nodes, ch06Nodes, ch07Nodes, ch08Nodes,
  ch09Nodes, ch10Nodes, ch11Nodes, ch12Nodes, ch13Nodes, ch14Nodes, ch15Nodes, ch16Nodes, ch17Nodes,
  side01Nodes, side02Nodes, side03Nodes, side04Nodes, side05Nodes,
  chLu1Nodes, chLu2Nodes, chLu3Nodes,
  chGu1Nodes, chGu2Nodes, chGu3Nodes,
  chJiang1Nodes, chJiang2Nodes, chJiang3Nodes,
  chCheng1Nodes, chCheng2Nodes, chCheng3Nodes,
  chShen1Nodes, chShen2Nodes,
  chYan1Nodes, chYan2Nodes,
  npcZhouNodes, npcSuNodes, npcWeiNodes,
  bz1Nodes, bz2Nodes, bz3Nodes, bz4Nodes, bzSide1Nodes,
] as unknown as Chapter[];
const CHAPTER_QUIZZES = [
  ch01Quiz, ch02Quiz, ch03Quiz, ch04Quiz, ch05Quiz, ch06Quiz, ch07Quiz, ch08Quiz,
  ch09Quiz, ch10Quiz, ch11Quiz, ch12Quiz, ch13Quiz, ch14Quiz, ch15Quiz, ch16Quiz, ch17Quiz,
  EMPTY_QUIZ, EMPTY_QUIZ, EMPTY_QUIZ, EMPTY_QUIZ, EMPTY_QUIZ,
  chLuQuiz, chLuQuiz, chLuQuiz,
  chGuQuiz, chGuQuiz, chGuQuiz,
  chJiangQuiz, chJiangQuiz, chJiangQuiz,
  chChengQuiz, chChengQuiz, chChengQuiz,
  chShenQuiz, chShenQuiz,
  chYanQuiz, chYanQuiz,
  npcZhouQuiz, npcSuQuiz, npcWeiQuiz,
  itQuizData, itQuizData, itQuizData, itQuizData, itQuizData,
] as unknown as QuizBank[];
// 路线索引：首章在 CHAPTERS 中的下标 + 该线好感字段 + 锁线 flag
const chIdxOf = (chapterId: string) => CHAPTERS.findIndex((c) => c.chapterId === chapterId);
// 章节"家族"：章末"进入下一章"只在同一家族内顺延（主线↔主线、番外群像、番外、各角色路线）
const chFamily = (i: number): string => {
  const id = CHAPTERS[i]?.chapterId ?? '';
  if (i < MAIN_COUNT) return 'main';
  if (id.startsWith('side_group')) return 'side';
  if (id.startsWith('bonus_zhong')) return 'zhong';
  if (id.startsWith('route_')) return id.replace(/_\d+$/, '');
  if (id.startsWith('npc_')) return id; // 每个NPC日常自成一组，互不顺延
  return 'other';
};
type RouteInfo = { key: RouteKey; label: string; ch1Index: number; affKey: keyof Stats; lockFlag: string };
const ROUTES: RouteInfo[] = [
  { key: 'lu', label: '陆知行线', ch1Index: chIdxOf('route_lu_1'), affKey: 'affection_lu', lockFlag: 'route_locked_lu' },
  { key: 'gu', label: '顾承线', ch1Index: chIdxOf('route_gu_1'), affKey: 'affection_gu', lockFlag: 'route_locked_gu' },
  { key: 'jiang', label: '江晚线', ch1Index: chIdxOf('route_jiang_1'), affKey: 'affection_jiang', lockFlag: 'route_locked_jiang' },
  { key: 'cheng', label: '程砚线', ch1Index: chIdxOf('route_cheng_1'), affKey: 'affection_cheng', lockFlag: 'route_locked_cheng' },
  { key: 'shen', label: '沈亦舟线', ch1Index: chIdxOf('route_shen_1'), affKey: 'affection_shen', lockFlag: 'route_locked_shen' },
  { key: 'yan', label: '言修线 · 隐藏', ch1Index: chIdxOf('route_yan_1'), affKey: 'affection_yan', lockFlag: 'route_locked_yan' },
];
// 番外番外章节（ · IT 命名空间）：经独立"番外·番外"入口进入
const ZHONG_CHAPTERS = ['bonus_zhong_1', 'bonus_zhong_2', 'bonus_zhong_3', 'bonus_zhong_4', 'bonus_zhong_side1']
  .map((id) => ({ id, idx: chIdxOf(id) }))
  .filter((z) => z.idx >= 0);
// NPC 同事日常事件（enrichment，不计主线进度）
const NPC_CHAPTERS = ['npc_zhou', 'npc_su', 'npc_wei']
  .map((id) => ({ id, idx: chIdxOf(id) }))
  .filter((z) => z.idx >= 0);
const ROUTE_AFFECTION_GATE = 8; // 心动门槛：affection≥8 可进线（§2.2）
// 路线终极考试：羁绊≥24 解锁，近真题难度，过 passLine → 设 passFlag → 该线 Good End/告白
type RouteExamCfg = { title: string; modules?: string[]; mcqPool: string[]; subjPool?: string[]; nMcq: number; nSubj?: number; passLine: number; passFlag: string; difficulty?: string };
// route_exams.json 顶层为 { version, note, scaling, retry, routes }，实际各线配置在 routes 下
const ROUTE_EXAMS = ((routeExamsData as unknown as { routes?: Record<string, RouteExamCfg> }).routes
  ?? (routeExamsData as unknown as Record<string, RouteExamCfg>)) as Record<string, RouteExamCfg>;
// 结局矩阵：每线 Good/Normal/Bad + 教师 True/独走（§6）
type EndingText = { title: string; text: string };
const ENDINGS = endingsData as unknown as {
  routes: Record<string, { label: string; good: EndingText; normal: EndingText; bad: EndingText }>;
  teacherTrue: EndingText; teacherSolo: EndingText;
};
// 整卷模考结构（贴近真实笔试题型构成；分数为卷面分，合格线按 60% 估）
type MockSection = { type: string; n: number; pts: number };
const FULL_MOCK: Record<'301' | '302', { label: string; mcq: number; mcqPts: number; sections: MockSection[] }> = {
  '301': { label: '科一《综合素质》', mcq: 20, mcqPts: 2, sections: [{ type: '材料分析', n: 2, pts: 14 }, { type: '写作', n: 1, pts: 30 }] },
  '302': { label: '科二《教育知识与能力》', mcq: 18, mcqPts: 2, sections: [{ type: '辨析', n: 2, pts: 8 }, { type: '简答', n: 2, pts: 10 }, { type: '材料分析', n: 1, pts: 18 }] },
};

// ===== 间隔重复 SRS（SM-2 简化版）+ 每日一关/连胜 —— 接管"今日复习"与习惯闭环 =====
const SRS_KEY = 'bkl_srs_v1';
const DAILY_KEY = 'bkl_daily_v1';
const DAY_MS = 86400000;
// D1：学习者主动标记"没懂"的考点（元认知自评，不依赖答错）
const FLAGKP_KEY = 'bkl_flagged_kp_v1';
function loadFlaggedKp(): string[] {
  try { const r = localStorage.getItem(FLAGKP_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
type SrsRec = { due: number; interval: number; ease: number; reps: number };
function loadSrs(): Record<string, SrsRec> {
  try { const r = localStorage.getItem(SRS_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
// 单题作答后更新调度：答对→拉长间隔(1→3→×ease, 封顶60天)；答错→次日重现、ease 下调
function srsUpdate(prev: Record<string, SrsRec>, id: string, correct: boolean, now: number): Record<string, SrsRec> {
  const r = prev[id] ?? { due: now, interval: 0, ease: 2.4, reps: 0 };
  let { ease, reps } = r; let interval: number;
  if (correct) {
    reps += 1; ease = Math.min(2.8, ease + 0.08);
    interval = reps <= 1 ? 1 : reps === 2 ? 3 : Math.min(60, Math.round(r.interval * ease));
  } else {
    reps = 0; ease = Math.max(1.3, ease - 0.2); interval = 1;
  }
  return { ...prev, [id]: { due: now + interval * DAY_MS, interval, ease, reps } };
}
type DailyState = { last: string; streak: number };
function loadDaily(): DailyState {
  try { const r = localStorage.getItem(DAILY_KEY); return r ? JSON.parse(r) : { last: '', streak: 0 }; } catch { return { last: '', streak: 0 }; }
}
function dayStr(d: Date): string { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
const ROUTE_EXAM_GATE = 24; // 羁绊档，终极考试解锁
// 过终极考试时一并置好对应线 Good End 分支所需的"学业达标"flags（与各线结局条件对齐）
const EXTRA_PASS_FLAGS: Record<string, Record<string, boolean>> = {
  lu: { lu_law_mastery: true },
  gu: { gu_de_mastery: true, gu_class_stable: true },
  jiang: { jiang_psych_mastered: true, jiang_student_trust_high: true },
  cheng: { cheng_pedagogy_passed: true },
  shen: { shen_teaching_passed: true },
};

// ===== flags 持久化（离散事件/路线锁定，boolean 设 true，number 累加）=====
const FLAGS_KEY = 'bkl_flags_v1';
function loadFlags(): Record<string, boolean | number> {
  try { const r = localStorage.getItem(FLAGS_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function mergeFlags(prev: Record<string, boolean | number>, ops?: FlagOps): Record<string, boolean | number> {
  if (!ops) return prev;
  const next = { ...prev };
  for (const [k, v] of Object.entries(ops)) {
    if (typeof v === 'number') next[k] = (typeof next[k] === 'number' ? (next[k] as number) : 0) + v;
    else next[k] = v;
  }
  return next;
}
// 分支门控：affection 全达、flags 全真、flags 任一真、已掌握考点达标
function evalCondition(
  cond: BranchRule['condition'],
  state: { stats: Stats; flags: Record<string, boolean | number>; examPointsCleared: number },
): boolean {
  if (cond.affectionGte) {
    for (const [k, min] of Object.entries(cond.affectionGte)) {
      const statKey = `affection_${k}` as keyof Stats;
      if ((state.stats[statKey] ?? 0) < (min ?? 0)) return false;
    }
  }
  if (cond.flagsAllTrue && !cond.flagsAllTrue.every((f) => !!state.flags[f])) return false;
  if (cond.flagsAnyTrue && cond.flagsAnyTrue.length && !cond.flagsAnyTrue.some((f) => !!state.flags[f])) return false;
  if (cond.minExamPointsCleared !== undefined && state.examPointsCleared < cond.minExamPointsCleared) return false;
  return true;
}
// 全局题库索引：knowledgeCheck / 跨章去学 都从这里查（含所有章节的随堂题）
// 群像番外（side_group_03/04/05）的随堂题在独立的 side_group_quiz 里，需并入索引才能让剧情内 knowledgeCheck 解析。
const quizById: Record<string, QuizItem> = Object.fromEntries([
  ...CHAPTER_QUIZZES.flatMap((b) => b.items.map((q) => [q.id, q] as const)),
  ...(sideGroupQuiz as unknown as QuizBank).items.map((q) => [q.id, q] as const),
  ...(itQuizData as unknown as QuizBank).items.map((q) => [q.id, q] as const),
]);
const CH_NO = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七'];
const CHAPTERS_DONE_KEY = 'bkl_chapters_done_v1';
function loadChaptersDone(): number[] {
  try { const r = localStorage.getItem(CHAPTERS_DONE_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}

// 设计基准分辨率（像 Unity Canvas Scaler 的 reference resolution）
// 用 1440×810 而非 1600×900：多数笔记本窗口 < 1600，原来整体被缩到 ~0.9 显得字小；
// 降到 1440 后在常见窗口上 scale≈1+ 反而放大，字更清楚（仍 16:9，内容最大宽约 1240 仍放得下）。
const DESIGN_W = 1440;
const DESIGN_H = 810;

// ===== 考点地图 / 刷题 / 错题本 数据底座 =====
type Mastery = 'mastered' | 'learning' | 'unseen';
type KPInfo = { title: string; subject: string; module: string; oneLine: string; points: string[]; teachNodeId: string | null; quizIds: string[] };
type KChapter = { no: string; id: string; title: string; sub: string; locked: boolean; modules: { name: string; kps: string[] }[] };
// 主考纲（301/302）+ 番外 IT 图谱合并：id 全命名空间隔离（itkp_*/bonus_zhong_*），与 301/302 零交叉
const _kmapMain = kmapData as unknown as { chapters: KChapter[]; points: Record<string, KPInfo> };
const _kmapIt = kmapItData as unknown as { chapters: KChapter[]; kps: Record<string, KPInfo> };
const KMAP = {
  chapters: [..._kmapMain.chapters, ..._kmapIt.chapters],
  points: { ..._kmapMain.points, ..._kmapIt.kps },
} as { chapters: KChapter[]; points: Record<string, KPInfo> };
const KP = KMAP.points;
const bank = bankData as unknown as { items: QuizItem[] };
// 历年真题池（个人备考用，独立于"同源改编"的考点题库；不进考点地图掌握度，分发版按需再做同源改编）
const ZHENTI = zhentiData as unknown as QuizItem[];
const bankById: Record<string, QuizItem> = Object.fromEntries([...bank.items, ...ZHENTI].map((q) => [q.id, q]));
const ALL_KP_IDS = Object.keys(KP);
// 301/302 主考纲考点（不含番外 IT itkp_*）——教师 True / 隐藏线解锁阈值以此为基数
const MAIN_KP_IDS = ALL_KP_IDS.filter((k) => !k.startsWith('itkp_'));
const YAN_UNLOCK_KP = Math.ceil(MAIN_KP_IDS.length * 0.7);  // 隐藏线：掌握≥70%
const TEACHER_TRUE_KP = Math.ceil(MAIN_KP_IDS.length * 0.9); // 教师True：掌握≥90%
// 主观题（辨析/简答/材料分析）——采分点自评
type SubjItem = { id: string; kpId: string | null; type: 'subjective'; subjType: string; subject: string; module: string; stem: string; scorePoints: string[]; refAnswer: string; source: string };
const _chapterSubj = [ch06Subj, ch07Subj, ch08Subj, ch09Subj, ch11Subj, ch12Subj, ch13Subj, ch14Subj, ch15Subj, ch16Subj, ch17Subj,
  bz1Subj, bz2Subj, bz3Subj, bz4Subj]
  .flatMap((d) => (d as unknown as { items: SubjItem[] }).items);
const SUBJ = [...(subjData as unknown as { items: SubjItem[] }).items, ..._chapterSubj];
const subjById: Record<string, SubjItem> = Object.fromEntries(SUBJ.map((s) => [s.id, s]));
const TRI: Record<Mastery, { label: string; color: string }> = {
  mastered: { label: '已掌握', color: '#3f9b6e' },
  learning: { label: '学过·未掌握', color: '#c79a3e' },
  unseen: { label: '未学过', color: '#b9b4a6' },
};
const MASTERY_KEY = 'bkl_mastery_v1';
const WRONG_KEY = 'bkl_wrongbook_v1';
type WrongEntry = { id: string; count: number; streak: number };
function blankMastery(): Record<string, Mastery> {
  const b: Record<string, Mastery> = {};
  ALL_KP_IDS.forEach((k) => { b[k] = 'unseen'; });
  return b;
}
function loadMastery(): Record<string, Mastery> {
  try { const r = localStorage.getItem(MASTERY_KEY); return r ? { ...blankMastery(), ...JSON.parse(r) } : blankMastery(); } catch { return blankMastery(); }
}
function loadWrong(): WrongEntry[] {
  try { const r = localStorage.getItem(WRONG_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function kpOf(quizId: string): string | undefined {
  return bankById[quizId]?.kpId;
}

// ===== ★星 + 解锁画廊 =====
type GalleryItem = { id: string; char: string; title: string; tier: string; cost: number; thumb: string; full: string };
const GALLERY = galleryData as GalleryItem[];
const STAR_KEY = 'bkl_stars_v1';
const UNLOCK_KEY = 'bkl_unlocked_v1';
const galleryUrls = import.meta.glob('./assets/gallery/**/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
function galUrl(rel: string): string {
  const k = Object.keys(galleryUrls).find((p) => p.endsWith(`/${rel}`) || p.endsWith(rel));
  return k ? galleryUrls[k] : '';
}
// ===== 事件 CG（收藏馆里独立一栏，与福利立绘共用 ★/unlocked 机制）=====
type CGItem = { id: string; char: string; title: string; chapter?: number; tier?: string; cost?: number; full: string };
const CGS = (cgManifest as unknown as CGItem[]).map((c) => ({ ...c, cost: c.cost ?? 30 }));
const cgUrls = import.meta.glob('./assets/cg/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
function cgUrl(rel: string): string {
  const k = Object.keys(cgUrls).find((p) => p.endsWith(`/${rel}`) || p.endsWith(rel));
  return k ? cgUrls[k] : '';
}
const SPEED_KEY = 'bkl_textspeed_v1';
const SPEED_OPTS: { label: string; ms: number }[] = [
  { label: '慢', ms: 48 }, { label: '适中', ms: 28 }, { label: '快', ms: 14 }, { label: '秒显', ms: 0 },
];
function loadSpeed(): number { try { const r = localStorage.getItem(SPEED_KEY); return r === null ? 28 : Number(r); } catch { return 28; } }
function loadStars(): number { try { return Number(localStorage.getItem(STAR_KEY)) || 0; } catch { return 0; } }
function loadUnlocked(): string[] { try { const r = localStorage.getItem(UNLOCK_KEY); return r ? JSON.parse(r) : []; } catch { return []; } }
// ===== 我的教室 养成 Hub：家具摆放位置持久化（{家具id: 槽位}）=====
const CLASSROOM_KEY = 'bkl_classroom_v1';
function loadClassroom(): Record<string, string> { try { const r = localStorage.getItem(CLASSROOM_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
// 家具解锁进度表：unlockAt = 需通关的主线章数（0 = 开局自带、预先摆好）
const FURNITURE_DEFS: { id: string; name: string; type: 'lectern' | 'studentDesk' | 'plant' | 'globe' | 'rug'; slot: string; unlockAt: number }[] = [
  { id: 'lectern', name: '讲台', type: 'lectern', slot: 'desk', unlockAt: 0 },
  { id: 'deskA', name: '学生课桌', type: 'studentDesk', slot: 'deskA', unlockAt: 0 },
  { id: 'plant', name: '窗台绿植', type: 'plant', slot: 'plant', unlockAt: 1 },
  { id: 'deskB', name: '学生课桌', type: 'studentDesk', slot: 'deskB', unlockAt: 2 },
  { id: 'globe', name: '地球仪', type: 'globe', slot: 'globe', unlockAt: 3 },
  { id: 'rug', name: '地毯', type: 'rug', slot: 'rug', unlockAt: 5 },
];
// 掌握度收紧：记录每个考点答对过的"不同题"，判定"即时对+冷测对"或"答对≥2道不同题"
const KPCORRECT_KEY = 'bkl_kpcorrect_v1';
function instColdOf(kp: string): [QuizItem | undefined, QuizItem | undefined] {
  const its = bank.items.filter((i) => i.kpId === kp);
  return [its.find((i) => i.stage === '即时'), its.find((i) => i.stage === '冷测')];
}
function masteredRule(kp: string, set: Set<string>): boolean {
  const [inst, cold] = instColdOf(kp);
  if (inst && cold) return set.has(inst.id) && set.has(cold.id);
  return set.size >= 2;
}
function loadKpCorrect(): Record<string, string[]> {
  try {
    const r = localStorage.getItem(KPCORRECT_KEY);
    if (r) return JSON.parse(r);
    // 从旧 mastery 迁移：已掌握的考点保留掌握态
    const om = localStorage.getItem(MASTERY_KEY);
    if (!om) return {};
    const old = JSON.parse(om) as Record<string, Mastery>;
    const out: Record<string, string[]> = {};
    for (const kp in old) {
      if (old[kp] === 'mastered') {
        const [inst, cold] = instColdOf(kp);
        out[kp] = inst && cold ? [inst.id, cold.id] : ['_m1', '_m2'];
      }
    }
    return out;
  } catch { return {}; }
}

type Screen = 'menu' | 'story' | 'practice';
type Overlay = null | 'feedback' | 'notebook' | 'review' | 'preferences' | 'profile' | 'mockResult' | 'saveload' | 'log' | 'gallery' | 'ending' | 'teacherEnd';

const SLOT_COUNT = 6;
const slotKey = (i: number) => `bkl_slot_${i}`;
type NotebookTab = 'ability' | 'bond' | 'map';
type ProfileId = 'lu' | 'jiang' | 'gu' | 'shen' | 'cheng' | 'yan' | 'zhong' | 'su' | 'wei' | 'zhou'
  | 'chen' | 'ma' | 'bate' | 'ayu' | 'shanhe' | 'liang' | 'manzai' | 'ajin' | 'laolei';

const SAVE_KEY = 'bkl_proto_save_v1';

const initialStats: Stats = {
  professionalSkill: 50,
  studentTrust: 50,
  classOrder: 50,
  ethicsRisk: 0,
  lawRisk: 0,
  examScore: 50,
  affection_lu: 0,
  affection_jiang: 0,
  affection_shen: 0,
  affection_gu: 0,
  affection_cheng: 0,
  affection_yan: 0,
  affection_chen: 0,
};

const statLabels: Record<keyof Stats, string> = {
  professionalSkill: '专业判断',
  studentTrust: '学生信任',
  classOrder: '课堂秩序',
  ethicsRisk: '师德风险',
  lawRisk: '法规风险',
  examScore: '考点掌握',
  affection_lu: '陆知行',
  affection_jiang: '江晚',
  affection_shen: '沈亦舟',
  affection_gu: '顾承',
  affection_cheng: '程砚',
  affection_yan: '言修',
  affection_chen: '—',
};

const characters: Record<ProfileId, { name: string; initial: string; role: string; color: string; deep: string; signature: string }> = {
  lu: { name: '陆知行', initial: '陆', role: '教务主任 · 规则的守护者', color: '#8FB4E6', deep: '#21425F', signature: '规矩不是为了束缚你，是为了让你在真正困难的情境里站得住。' },
  jiang: { name: '江晚', initial: '江', role: '心理教师 · 温柔的倾听者', color: '#84C7A6', deep: '#2C5A47', signature: '先听见学生，再判断问题。很多答案，藏在他没说完的话里。' },
  gu: { name: '顾承', initial: '顾', role: '年级组长 · 可靠的引路人', color: '#D9B76A', deep: '#5F4A1F', signature: '带班没有捷径，但每一次处理学生，都会留下班风的痕迹。' },
  shen: { name: '沈亦舟', initial: '沈', role: '语文教师 · 并肩的伙伴', color: '#AAA2E6', deep: '#3A3469', signature: '先把课讲清楚，再把人照亮一点点。我们一起改。' },
  cheng: { name: '程砚', initial: '程', role: '教研中心主任 · 锋利的点拨者', color: '#9AA7B8', deep: '#3C4654', signature: '把课讲对不难，讲到让学生自己想明白，才算本事。' },
  yan: { name: '言修', initial: '言', role: '升学指导 · 清冷的引路人', color: '#8C97A0', deep: '#3A4248', signature: '别急着替孩子规划人生，先听听他自己想去哪儿。' },
  zhong: { name: '钟伟', initial: '钟', role: '体育老师 · 热心的后勤担当', color: '#C8794E', deep: '#5E371F', signature: '别熬太晚，饿了我那儿有汤。' },
  su: { name: '苏念', initial: '苏', role: '英语教师 · 损友兼军师', color: '#E9A05C', deep: '#6B4322', signature: '诶诶诶，刚那个眼神，你俩什么情况？快从实招来！' },
  wei: { name: '卫蓝', initial: '卫', role: '招生与品牌部主任 · 现实的尺子', color: '#6B5B8C', deep: '#322A45', signature: '情怀不能当招生简章用。数据，给我数据。' },
  zhou: { name: '周慎之', initial: '周', role: '资深物理教师 · 讲古的老顽童', color: '#8A6E4B', deep: '#3F3122', signature: '我们那会儿啊……来，泡杯茶，听我慢慢说。' },
  // (本地番外角色，公开版已隐藏)
  chen: { name: '—', initial: '·', role: '', color: '#9AA7B8', deep: '#4A535E', signature: '' },
  ma: { name: '—', initial: '·', role: '', color: '#5C6B4E', deep: '#333D2B', signature: '' },
  bate: { name: '—', initial: '·', role: '', color: '#A24B3A', deep: '#5A2920', signature: '' },
  ayu: { name: '—', initial: '·', role: '', color: '#7E97B8', deep: '#3E4C60', signature: '' },
  shanhe: { name: '—', initial: '·', role: '', color: '#5A4632', deep: '#332618', signature: '' },
  liang: { name: '—', initial: '·', role: '', color: '#6F8174', deep: '#3A463E', signature: '' },
  manzai: { name: '—', initial: '·', role: '', color: '#E9A05C', deep: '#7A5024', signature: '' },
  ajin: { name: '—', initial: '·', role: '', color: '#B08948', deep: '#5E4622', signature: '' },
  laolei: { name: '—', initial: '·', role: '', color: '#8A5A3C', deep: '#4A2F1E', signature: '' },
};

const speakerToId: Record<string, ProfileId> = {
  陆知行: 'lu', 江晚: 'jiang', 顾承: 'gu', 沈亦舟: 'shen', 程砚: 'cheng', 言修: 'yan', 钟伟: 'zhong', 苏念: 'su', 卫蓝: 'wei', 周慎之: 'zhou',


};

type Expr = 'neutral' | 'smile' | 'serious' | 'worried' | 'blush' | 'tender' | 'surprised' | 'grin';
const charArt: Record<ProfileId, Partial<Record<Expr, string>>> = {
  lu: { neutral: luNeutral, smile: luSmile, serious: luSerious, worried: luWorried, blush: luBlush, tender: luTender, surprised: luSurprised },
  jiang: { neutral: jiangNeutral, smile: jiangSmile, serious: jiangSerious, worried: jiangWorried, blush: jiangBlush, tender: jiangTender, surprised: jiangSurprised },
  gu: { neutral: guNeutral, smile: guSmile, serious: guSerious, worried: guWorried, blush: guBlush, tender: guTender, surprised: guSurprised },
  shen: { neutral: shenNeutral, smile: shenSmile, serious: shenSerious, worried: shenWorried, blush: shenBlush, tender: shenTender, grin: shenGrin },
  cheng: { neutral: chengNeutral, smile: chengSmile, serious: chengSerious, worried: chengWorried, blush: chengBlush, tender: chengTender },
  yan: { neutral: yanNeutral, smile: yanSmile, serious: yanSerious, worried: yanWorried },
  zhong: { neutral: zhongNeutral, smile: zhongSmile, serious: zhongSerious, blush: zhongBlush },
  chen: { neutral: chenNeutral, smile: chenSmile, serious: chenSerious, blush: chenBlush },
  ma: { neutral: maNeutral, smile: maSmile, serious: maSerious, blush: maBlush },
  bate: { neutral: bateNeutral, smile: bateSmile, serious: bateSerious, blush: bateBlush },
  ayu: { neutral: ayuNeutral, smile: ayuSmile, serious: ayuSerious, blush: ayuBlush },
  shanhe: { neutral: shanheNeutral, smile: shanheSmile, serious: shanheSerious, blush: shanheBlush },
  liang: { neutral: liangNeutral, smile: liangSmile, serious: liangSerious, blush: liangBlush },
  manzai: { neutral: manzaiNeutral, smile: manzaiSmile, serious: manzaiSerious, blush: manzaiBlush },
  ajin: { neutral: ajinNeutral, smile: ajinSmile, serious: ajinSerious, blush: ajinBlush },
  laolei: { neutral: laoleiNeutral, smile: laoleiSmile, serious: laoleiSerious, blush: laoleiBlush },
  su: { neutral: suNeutral, smile: suSmile },
  wei: { neutral: weiNeutral, serious: weiSerious },
  zhou: { neutral: zhouNeutral },
};

// 圆形头像（512×512）：有则在羁绊行/档案头用 <img>，无则回退到首字圆圈
const charAvatar: Partial<Record<ProfileId, string>> = {
  lu: avatarLu, jiang: avatarJiang, gu: avatarGu, shen: avatarShen,
};

// 立绘逐角色校准：四张立绘取景不同（陆/江=齐大腿半身、顾/沈=全身到脚），
// 直接放同一槽位会"一会大一会小"。这里把每个角色归一到"同一头高、同一基线"，
// 多出的下半身落到对话框后面（被裁掉）。数值眼调即可：
//   scale=显示高度倍数（全身图调大让头变大）；dy=整体下移 px（露更少腿、让头落到统一高度）；dx=右移微调。
const STANDEE_BASE_H = 752; // 立绘基准高度（画布810高）。曾为880显得过大；与字号独立，只缩立绘不影响文字
const STANDEE_CAL: Partial<Record<ProfileId, { scale: number; dy: number; dx: number }>> = {
  lu: { scale: 1.0, dy: 0, dx: 0 }, // 齐大腿半身——作为基准
  jiang: { scale: 1.02, dy: 0, dx: 0 }, // 齐大腿半身
  gu: { scale: 1.28, dy: 250, dx: 0 }, // 全身→放大并下移，腿藏进对话框
  shen: { scale: 1.45, dy: 340, dx: 0 }, // 全身+留白多→放大更多、下移更多
  // 番外熊系：全部 720×1240 全身图，原本无校准 → 各自大小不一（IT 线"忽大忽小"）。
  // 同尺寸 → 统一一套校准即可消除相对跳变；具体头高待截图后微调。
  zhong: { scale: 1.34, dy: 290, dx: 0 },
  chen: { scale: 1.34, dy: 290, dx: 0 },
  ma: { scale: 1.34, dy: 290, dx: 0 },
  bate: { scale: 1.34, dy: 290, dx: 0 },
  ayu: { scale: 1.34, dy: 290, dx: 0 },
  shanhe: { scale: 1.34, dy: 290, dx: 0 },
  liang: { scale: 1.34, dy: 290, dx: 0 },
  manzai: { scale: 1.34, dy: 290, dx: 0 },
  ajin: { scale: 1.34, dy: 290, dx: 0 },
  laolei: { scale: 1.34, dy: 290, dx: 0 },
  // 主线新配角（程/言/苏/卫/周）暂用默认基准，拿到偏差截图后再调。
};

// 按节点 id 指定说话者表情（讲案例/考你=serious，欢迎/夸你=smile，孤独/担忧=worried）
const NODE_EXPR: Record<string, Expr> = {
  ch01_a_teach_1: 'serious', ch01_a_teach_3: 'serious', ch01_a_teach_4: 'serious', ch01_a_apply: 'serious',
  ch01_b_teach_1: 'smile', ch01_b_teach_4: 'smile',
  ch01_c_teach_3: 'smile', ch01_c_apply: 'smile', ch01_c_after: 'worried',
};

const bgImages: Record<string, string> = {
  staff_room: bgStaffRoom,
  meeting_room: bgMeetingRoom,
  classroom: bgClassroom,
  corridor: bgCorridor,
  counseling_room: bgCounselingRoom,
  research_center: bgResearchCenter,
  rain_playground: bgRainPlayground,
  career_room: bgCareerRoom,
  teacher_apartment: bgTeacherApartment,
  exam_hall: bgExamHall,
  auditorium: bgAuditorium,
  // 别名：剧情数据里用了这些名字但没有对应图，曾整章回退成「教师办公室」（约32%节点）。
  // 先映射到语义最近的现有图止血；gym/书咖/小馆等专属背景待补图后再分流。
  staffroom: bgStaffRoom,    // 拼写笔误，本就是 staff_room
  office: bgStaffRoom,       // 办公室≈教师办公室
  library: bgResearchCenter, // 图书/资料室≈教研中心
  playground: bgRainPlayground, // 操场（暂用雨天操场，待补晴天版）
  // 番外番外专属场景（已出图）
  gym: bgGym,
  chen_eatery: bgChenEatery,
  zhong_kitchen: bgZhongKitchen,
  zhong_bedroom: bgZhongBedroom,
  bathhouse: bgBathhouse,
  bookcafe: bgBookcafe,
};

// 复盘 · 知识点速记（点开看）。module 与考点 module 对齐，用于"答错即标记重点复习"
const REVIEW_POINTS: { module: string; mentor: string; title: string; points: string[] }[] = [
  {
    module: '教育法律法规', mentor: '陆知行', title: '三种学生权利的边界',
    points: [
      '公开私人信息（翻看聊天记录 / 公示成绩排名）→ 侵犯隐私权',
      '当众侮辱、辱骂、贬损 → 侵犯人格尊严权',
      '罚站门外、不让进教室听课 → 侵犯受教育权（也构成变相体罚）',
    ],
  },
  {
    module: '德育', mentor: '顾承', title: '长善救失 vs 因材施教 vs 疏导',
    points: [
      '长善救失：依靠积极因素（优点）克服消极因素（缺点）——扬长补短',
      '因材施教：按学生个体差异，选不同内容与方法——重点在"差异"',
      '疏导：循循善诱、以理服人、正面引导——重点在"说服"',
    ],
  },
  {
    module: '中学生心理辅导', mentor: '江晚', title: '三种辅导方法各对症什么',
    points: [
      '系统脱敏：放松 + 由轻到重逐级想象 → 治焦虑的生理反应（心慌手抖）',
      '合理情绪疗法：辨驳"考砸=我没用"等不合理信念 → 治认知',
      '来访者中心：无条件接纳、共情倾听 → 是底子，不给具体程序',
    ],
  },
];

// A3：剧情选择是"处理方式"判断、不是考题打分，去掉满分/失分这种考试腔
const qualityMeta: Record<Quality, { label: string; icon: string; className: string }> = {
  optimal: { label: '稳妥的处理', icon: '✓', className: 'ok' },
  suboptimal: { label: '可以更稳', icon: '～', className: 'warn' },
  risk: { label: '有风险', icon: '!', className: 'bad' },
};
// A1：选项展示顺序按 (节点id+选项id) 稳定打乱，避免"最优永远在第一个"被闭眼选；判定仍按 choice 对象、与位置无关
function hashStr(s: string): number { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function orderChoices<T extends { id: string }>(nodeId: string, choices: T[]): T[] {
  return [...choices].sort((a, b) => hashStr(`${nodeId}:${a.id}`) - hashStr(`${nodeId}:${b.id}`));
}

function clampStat(key: keyof Stats, value: number) {
  if (key === 'ethicsRisk' || key === 'lawRisk') return Math.max(0, Math.min(100, value));
  if (key.startsWith('affection_')) return Math.max(-20, Math.min(100, value));
  return Math.max(0, Math.min(100, value));
}

function applyChoice(stats: Stats, choice: Choice) {
  const next = { ...stats };
  Object.entries(choice.effects).forEach(([rawKey, delta]) => {
    const key = rawKey as keyof Stats;
    next[key] = clampStat(key, next[key] + (delta ?? 0));
  });
  return next;
}

function signed(value = 0) {
  return value > 0 ? `+${value}` : `${value}`;
}
function isRiskStat(key: keyof Stats) {
  return key === 'ethicsRisk' || key === 'lawRisk';
}
function beneficial(key: keyof Stats, delta = 0) {
  return isRiskStat(key) ? delta < 0 : delta > 0;
}
function setEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const s = new Set(b);
  return a.every((x) => s.has(x));
}

// 把 **加粗** 标记的纯文本长度（不含 ** 标记本身）
function plainLen(s: string) {
  return s.replace(/\*\*/g, '').length;
}
// 对话分页:把长台词按句末(。！？\n)切成"一次点一屏"的页,每页 ≤ maxChars(可见字符)。
// 配合固定大小对话框——长段不再撑大框,而是点一下翻下一句。保留 **加粗** 与换行。
function paginateText(full: string, maxLines = 3, perLine = 33): string[] {
  if (!full) return [full];
  const plainOf = (s: string) => s.replace(/\*\*/g, '');
  const linesOf = (txt: string) => plainOf(txt).split('\n').reduce((n, ln) => n + Math.max(1, Math.ceil(ln.length / perLine)), 0);
  const parts = full.split(/(?<=[。！？!?\n])/).filter((p) => p.length);
  const pages: string[] = [];
  let cur = '';
  for (const p of parts) {
    if (cur && linesOf(cur + p) > maxLines) { pages.push(cur); cur = p; }
    else cur += p;
  }
  if (cur) pages.push(cur);
  return pages.length ? pages : [full];
}
// 渲染带 **加粗** 的文本，按 count 个可见字符打字机推进。
// 关键：未打出的部分仍渲染、但 visibility:hidden 占位 —— 这样文字框从一开始就按整段文本预留高度，
// 不会"跟着字越打越大"（消除打字时对话框逐字变高的抖动）。
function renderRich(full: string, count: number) {
  const parts = full.split('**');
  const out: (string | ReturnType<typeof boldSpan>)[] = [];
  let used = 0;
  let key = 0;
  let pending = '';
  for (let i = 0; i < parts.length; i++) {
    const bold = i % 2 === 1;
    const token = parts[i];
    if (used >= count) { pending += token; continue; }
    const slice = token.slice(0, count - used);
    const rest = token.slice(count - used);
    used += slice.length;
    if (slice) out.push(bold ? boldSpan(slice, key++) : slice);
    if (rest) pending += rest;
  }
  if (pending) out.push(<span className="dlg-pending" key="pending" aria-hidden="true">{pending}</span>);
  return out;
}
function boldSpan(text: string, key: number) {
  return <em className="kw" key={`b${key}`}>{text}</em>;
}

function StatMeter({ label, value, risk, hint }: { label: string; value: number; risk?: boolean; hint?: string }) {
  const shown = risk ? value : value;
  return (
    <div className="meter">
      <div className="meter__top"><span>{label}{hint ? <i className="meter__hint">{hint}</i> : null}</span><strong>{value}<small>/100</small></strong></div>
      <div className={`meter__track ${risk ? 'is-risk' : ''}`}><span style={{ width: `${Math.max(0, Math.min(100, shown))}%` }} /></div>
    </div>
  );
}

// 表情兜底链：剧情数据里用了 worried/tender/grin 等，但很多角色（尤其熊系/配角）只画了
// {neutral,smile,serious,blush}，原逻辑遇到缺失表情直接退成 neutral → 立绘整段面无表情。
// 改为「就近替代」：先要的→近似的→neutral，让立绘至少能跟上情绪。
const EXPR_FALLBACK: Record<Expr, Expr[]> = {
  neutral: ['neutral'],
  smile: ['smile', 'grin', 'neutral'],
  grin: ['grin', 'smile', 'neutral'],
  tender: ['tender', 'smile', 'neutral'],
  blush: ['blush', 'tender', 'smile', 'neutral'],
  serious: ['serious', 'neutral'],
  worried: ['worried', 'serious', 'neutral'],
  surprised: ['surprised', 'smile', 'neutral'],
};
function pickExpr(id: ProfileId, want?: Expr): Expr {
  const chain = EXPR_FALLBACK[want ?? 'neutral'] ?? ['neutral'];
  for (const e of chain) if (charArt[id][e]) return e;
  return 'neutral';
}

function CharacterStandee({ id, expression }: { id?: ProfileId; expression?: Expr }) {
  if (!id) return null;
  const c = characters[id];
  const expr: Expr = pickExpr(id, expression);
  const art = charArt[id][expr] ?? charArt[id].neutral;
  if (!art) return null;
  const cal = STANDEE_CAL[id] ?? { scale: 1, dy: 0, dx: 0 };
  return (
    <div className="standee standee--photo">
      <img
        key={`${id}_${expr}`}
        className="standee__photo"
        src={art}
        alt={c.name}
        style={{ height: `${STANDEE_BASE_H * cal.scale}px`, bottom: `${-cal.dy}px`, right: `${56 + cal.dx}px` }}
      />
    </div>
  );
}

/**
 * 做题卡：随堂检测 / 月考共用。
 * 先答题 → 提交 → 判定（含每个干扰项为什么错 + 采分关键词）。
 * 答错且有同类题(sibling)时，可"再练一道"。底部按钮始终固定可见、不随内容滚动。
 */
function QuizCard({ item, badge, sibling, onDone }: { item: QuizItem; badge: string; sibling?: QuizItem; onDone: (correct: boolean) => void }) {
  const [cur, setCur] = useState<QuizItem>(item);
  const [picked, setPicked] = useState<string[]>([]);
  const [phase, setPhase] = useState<'answer' | 'feedback'>('answer');
  const [usedRetry, setUsedRetry] = useState(false);
  const correct = setEqual(picked, cur.answer);
  const opts = orderChoices(cur.id, cur.options);
  const posLetter = (oid: string) => { const i = opts.findIndex((o) => o.id === oid); return i >= 0 ? String.fromCharCode(65 + i) : oid; };
  const askerId = cur.diegetic?.asker as ProfileId | undefined;
  const askerColor = (askerId && characters[askerId]?.color) ? characters[askerId].color : '#c19a52';

  function toggle(id: string) {
    if (cur.type === 'single') setPicked([id]);
    else setPicked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }
  function retry() {
    if (!sibling) return;
    setCur(sibling);
    setPicked([]);
    setPhase('answer');
    setUsedRetry(true);
  }

  return (
    <div className="quiz-card" style={{ '--char': askerColor } as CSSProperties}>
      <header>
        <span className="quiz-badge">{badge}</span>
        <em>{cur.subject} · {cur.module} · {cur.type === 'single' ? '单选' : '多选'} · {cur.difficulty}</em>
      </header>
      <div className="quiz-body">
        {cur.diegetic?.framing ? <div className="quiz-framing">{cur.diegetic.framing}</div> : null}
        <p className="quiz-stem">{cur.stem}</p>
        <div className="quiz-options">
          {opts.map((op, i) => {
            const chosen = picked.includes(op.id);
            const isAnswer = cur.answer.includes(op.id);
            let cls = '';
            if (phase === 'feedback') {
              if (isAnswer) cls = 'is-answer';
              else if (chosen) cls = 'is-wrong';
            } else if (chosen) cls = 'is-picked';
            return (
              <button key={op.id} className={`quiz-option ${cls}`} disabled={phase === 'feedback'} onClick={() => toggle(op.id)}>
                <span>{String.fromCharCode(65 + i)}</span>
                <strong>{op.text}</strong>
                {phase === 'feedback' && isAnswer ? <i className="quiz-mark ok">正确答案</i> : null}
                {phase === 'feedback' && chosen && !isAnswer ? <i className="quiz-mark bad">你选的</i> : null}
              </button>
            );
          })}
        </div>

        {phase === 'feedback' ? (
          <div className="quiz-feedback">
            <div className={`quiz-verdict ${correct ? 'ok' : 'bad'}`}>{correct ? '✓ 答对了' : '✗ 答错了'}</div>
            <p className="quiz-explain">{renderRich(cur.explanation, plainLen(cur.explanation))}</p>
            {cur.distractorTraps && Object.keys(cur.distractorTraps).length ? (
              <div className="quiz-traps">
                <label>为什么其它选项不对</label>
                {Object.entries(cur.distractorTraps).map(([oid, why]) => (
                  <p key={oid}><b>{posLetter(oid)}</b> {why}</p>
                ))}
              </div>
            ) : null}
            {cur.answerKeywords.length ? (
              <div className="kw-block">
                <label>✍ 采分关键词 <i>材料/简答题里答到这些词才得分</i></label>
                <div className="keyword-row">
                  {cur.answerKeywords.map((k) => <span key={k}>{k}</span>)}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <footer className="quiz-foot">
        {phase === 'answer' ? (
          <button className="primary-button" disabled={!picked.length} onClick={() => setPhase('feedback')}>提交作答</button>
        ) : (
          <>
            {!correct && sibling && !usedRetry ? (
              <button className="glass-button dark" onClick={retry}>换一道同类题再练 ↻</button>
            ) : null}
            <button className="primary-button" onClick={() => onDone(correct)}>记下来，继续 →</button>
          </>
        )}
      </footer>
    </div>
  );
}

export function App() {
  const [booting, setBooting] = useState(true);
  const [screen, setScreen] = useState<Screen>('menu');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chaptersDone, setChaptersDone] = useState<number[]>(loadChaptersDone);
  const [reviewReturnCh, setReviewReturnCh] = useState<number | null>(null);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [clearedChecks, setClearedChecks] = useState<string[]>([]);
  const [flags, setFlags] = useState<Record<string, boolean | number>>(loadFlags);
  const [showRoutePicker, setShowRoutePicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [chapterPage, setChapterPage] = useState(0);
  const CH_PER_PAGE = 6;
  const chapterPages = Math.ceil(MAIN_COUNT / CH_PER_PAGE);
  // 主菜单重排：学习二级面板 / 「更多」折叠
  const [menuLearnOpen, setMenuLearnOpen] = useState(false);
  const [menuMoreOpen, setMenuMoreOpen] = useState(false);
  // 选择章节面板 Tab（主线 / 群像 / 同事 / 番外）
  const [chapterTab, setChapterTab] = useState<'main' | 'group' | 'peer' | 'lamp'>('main');
  // 章节进入动画(备课铃 eyecatch)：仅主线、新开章时播；null=不播
  const [introCh, setIntroCh] = useState<number | null>(null);
  // 「我的教室」养成 Hub
  const [showClassroom, setShowClassroom] = useState(false);
  const [classroomPlace, setClassroomPlace] = useState<Record<string, string>>(loadClassroom);
  const [pending, setPending] = useState<{ entry: HistoryEntry; effects: Partial<Stats>; target?: number } | null>(null);
  const [notebookTab, setNotebookTab] = useState<NotebookTab>('ability');
  const [profileId, setProfileId] = useState<ProfileId>('lu');
  const [hasSave, setHasSave] = useState(false);
  const [openPoint, setOpenPoint] = useState<string | null>(null);
  // 月考冷测
  const [mock, setMock] = useState<{ items: (QuizItem | SubjItem)[]; idx: number; results: QuizResult[]; realCount?: number; exam?: { passLine: number; passFlag: string; label: string; routeKey: string }; full?: { subject: '301' | '302'; label: string } } | null>(null);
  const [endingRoute, setEndingRoute] = useState<string | null>(null);
  // 打字机（按可见字符计数）
  const [typedCount, setTypedCount] = useState(0);
  const [pageIdx, setPageIdx] = useState(0); // 当前对话节点内的分页(点一下翻一屏)
  // 存读档槽位 / 回看
  const [saveMode, setSaveMode] = useState<'save' | 'load'>('load');
  const [slotsVer, setSlotsVer] = useState(0);
  const [backlog, setBacklog] = useState<{ speaker: string; text: string; kind: 'line' | 'choice' }[]>([]);
  // 舞台自适应缩放（Canvas Scaler 思路：固定 1600×900，等比缩放铺满窗口）
  const [scale, setScale] = useState(1);
  // 考点地图 / 刷题 / 错题本
  const [mastery, setMastery] = useState<Record<string, Mastery>>(loadMastery);
  const [kpCorrect, setKpCorrect] = useState<Record<string, string[]>>(loadKpCorrect);
  const [wrongbook, setWrongbook] = useState<WrongEntry[]>(loadWrong);
  const [mapExpanded, setMapExpanded] = useState<Record<string, boolean>>({ core_ch01: true });
  const [mapKpOpen, setMapKpOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [reviewReturn, setReviewReturn] = useState<number | null>(null);
  // 刷题流程：home | play | summary | wrong
  const [pv, setPv] = useState<'home' | 'pick' | 'play' | 'summary' | 'wrong' | 'subj' | 'subjSummary'>('home');
  // 主观题练习
  const [subjQueue, setSubjQueue] = useState<string[]>([]);
  const [subjIdx, setSubjIdx] = useState(0);
  const [subjRevealed, setSubjRevealed] = useState(false);
  const [subjChecked, setSubjChecked] = useState<number[]>([]);
  const [subjResults, setSubjResults] = useState<{ id: string; hit: number; total: number }[]>([]);
  const [subjLabel, setSubjLabel] = useState('');
  const [queue, setQueue] = useState<string[]>([]);
  const [qi, setQi] = useState(0);
  // 间隔重复 + 每日连胜
  const [srs, setSrs] = useState<Record<string, SrsRec>>(loadSrs);
  const [flaggedKp, setFlaggedKp] = useState<string[]>(loadFlaggedKp);
  const toggleFlagKp = (kp: string) => setFlaggedKp((f) => {
    const next = f.includes(kp) ? f.filter((k) => k !== kp) : [...f, kp];
    try { localStorage.setItem(FLAGKP_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    showToast(f.includes(kp) ? '已取消标记' : '已标记「没懂」，今日备考会优先复习');
    return next;
  });
  const [daily, setDaily] = useState<DailyState>(loadDaily);
  const [dailyMode, setDailyMode] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [judged, setJudged] = useState(false);
  const [pResults, setPResults] = useState<{ id: string; kp: string; correct: boolean }[]>([]);
  const [practiceLabel, setPracticeLabel] = useState('');
  const [lastSummary, setLastSummary] = useState<{ total: number; right: number; wrong: number; kps: string[] } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  // ★星 + 解锁
  const [textSpeed, setTextSpeed] = useState<number>(loadSpeed);
  const [stars, setStars] = useState<number>(loadStars);
  const [unlocked, setUnlocked] = useState<string[]>(loadUnlocked);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // 已掌握考点数（接学习层进度，供 branch / chapter.requires 的 minExamPointsCleared 用）
  const examPointsCleared = useMemo(() => Object.values(mastery).filter((m) => m === 'mastered').length, [mastery]);
  // 主考纲(301/302)已掌握数——隐藏线/教师True 阈值用
  const mainCleared = useMemo(() => MAIN_KP_IDS.filter((k) => mastery[k] === 'mastered').length, [mastery]);
  const yanUnlocked = mainCleared >= YAN_UNLOCK_KP && !!flags.asked_yan_past && !!flags.cleared_any_main_route;
  const anyGoodEnd = ROUTES.some((r) => !!flags[`good_end_${r.key}`]);
  const teacherTrueReady = mainCleared >= TEACHER_TRUE_KP && !!flags.mock_exam_passed;

  // 持久化「我的教室」家具摆放
  useEffect(() => { try { localStorage.setItem(CLASSROOM_KEY, JSON.stringify(classroomPlace)); } catch { /* ignore */ } }, [classroomPlace]);
  // 把游戏真实进度喂给「我的教室」养成 Hub
  const classbathhouseata = useMemo(() => {
    const mainDone = chaptersDone.filter((i) => i < MAIN_COUNT).length;
    // 模块三态：按 KP.module 聚合主考纲考点（已掌握/学过/未学）
    const modMap = new Map<string, { total: number; mastered: number; learned: number }>();
    MAIN_KP_IDS.forEach((k) => {
      const mod = KP[k]?.module || '其他';
      const e = modMap.get(mod) ?? { total: 0, mastered: 0, learned: 0 };
      e.total += 1;
      if (mastery[k] === 'mastered') e.mastered += 1;
      else if (mastery[k] === 'learning') e.learned += 1;
      modMap.set(mod, e);
    });
    const modules = Array.from(modMap.entries()).map(([name, v]) => ({ name, total: v.total, mastered: v.mastered, learned: v.learned }));
    // 家具：按主线通关数解锁；拖放过的记在 classroomPlace
    const furniture: ClassFurniture[] = FURNITURE_DEFS.map((d) => {
      const earned = mainDone >= d.unlockAt;
      if (!earned) return { ...d, state: 'locked' as const, unlockHint: `通关第${d.unlockAt}章解锁` };
      const placedSlot = classroomPlace[d.id];
      if (placedSlot) return { ...d, slot: placedSlot, state: 'placed' as const };
      if (d.unlockAt === 0) return { ...d, state: 'placed' as const };
      return { ...d, state: 'unlocked' as const };
    });
    // 荣誉墙：各线终极考试达标
    const honors = Object.entries(ROUTE_EXAMS).map(([key, cfg]) => ({ id: `exam_${key}`, name: cfg.title ?? `${key}线达标`, got: !!flags[cfg.passFlag] }));
    // 纪念物：各线 Good End（隐藏线 yan 不计）
    const memTypes: ('trophy' | 'notebook' | 'pen')[] = ['trophy', 'notebook', 'pen'];
    const mementos = ROUTES.filter((r) => r.key !== 'yan').slice(0, 3).map((r, i) => ({ id: `mem_${r.key}`, routeName: r.label, type: memTypes[i % memTypes.length], got: !!flags[`good_end_${r.key}`] }));
    // 完成度：掌握 60% + 主线通关 30% + 荣誉 10%
    const masteryFrac = MAIN_KP_IDS.length ? mainCleared / MAIN_KP_IDS.length : 0;
    const chapFrac = MAIN_COUNT ? Math.min(1, mainDone / MAIN_COUNT) : 0;
    const honorFrac = honors.length ? honors.filter((h) => h.got).length / honors.length : 0;
    const completion = Math.round((masteryFrac * 0.6 + chapFrac * 0.3 + honorFrac * 0.1) * 100);
    // 成就
    const anyModuleComplete = modules.some((m) => m.total > 0 && m.mastered >= m.total);
    const honorCount = honors.filter((h) => h.got).length;
    const achievements = [
      { id: 'a1', title: '初登讲台', desc: '完成第一章', done: chaptersDone.includes(0) },
      { id: 'a2', title: '书架初成', desc: '掌握首个完整考点模块', done: anyModuleComplete },
      { id: 'a3', title: '全勤一周', desc: '连续 7 天完成每日一关', done: daily.streak >= 7 },
      { id: 'a4', title: '模考达人', desc: '三条线终极考试达标', done: honorCount >= 3 },
      { id: 'a5', title: '初心如磐', desc: '解锁任意角色线 Good End', done: anyGoodEnd },
      { id: 'a6', title: '名师之路', desc: '教室完成度达到 80%', done: completion >= 80 },
    ];
    return { modules, furniture, honors, mementos, achievements, completion };
  }, [chaptersDone, mastery, flags, daily.streak, mainCleared, anyGoodEnd, classroomPlace]);

  const chapter = CHAPTERS[currentChapter] ?? CHAPTERS[0];
  const quizBank = CHAPTER_QUIZZES[currentChapter] ?? CHAPTER_QUIZZES[0];
  const node = chapter.nodes[Math.min(nodeIndex, chapter.nodes.length - 1)];
  const bgUrl = bgImages[node.background] ?? bgStaffRoom;
  const speakerId = speakerToId[node.speaker];
  const currentCharacter = speakerId ? characters[speakerId] : null;

  // knowledgeCheck：原为「带前置题的 choice 进入时先硬阻断弹做题卡」。
  // 已按需求关闭内联随堂题：每个考点结尾只保留剧情选择，不再连续两道四选一。
  // 考试题仍留在题库，供月考/刷题/今日复习(SRS)使用，不浪费。改回时把 INLINE_KNOWLEDGE_CHECK 设为 true 即可。
  const INLINE_KNOWLEDGE_CHECK = false;
  const activeCheck = INLINE_KNOWLEDGE_CHECK && node.type === 'choice' && node.knowledgeCheck && !clearedChecks.includes(node.id)
    ? quizById[node.knowledgeCheck]
    : undefined;
  const checkPending = !!activeCheck;
  const choicesUnlocked = !INLINE_KNOWLEDGE_CHECK || !(node.type === 'choice' && node.knowledgeCheck) || clearedChecks.includes(node.id);

  // 对话分页:固定大小对话框,长台词分成多屏,点一下翻一屏
  const pages = useMemo(() => paginateText(node.text), [node.id, node.text]);
  // 换节点时把分页归零(渲染期同步,沿用下面 typedCount 的同步重置模式)
  const nodeIdRef = useRef('');
  if (nodeIdRef.current !== node.id) {
    nodeIdRef.current = node.id;
    if (pageIdx !== 0) setPageIdx(0);
  }
  const safePage = Math.min(pageIdx, pages.length - 1);
  const pageText = pages[safePage] ?? node.text;
  const onLastPage = safePage >= pages.length - 1;
  // 打字机：用派生 typing + 渲染期同步重置，避免"刚开始逐字点一下直接跳下一句"的竞态
  const fullLen = plainLen(pageText);
  const dispKey = node.id + ':' + safePage + (checkPending ? ':q' : '');
  const dispKeyRef = useRef('');
  if (dispKeyRef.current !== dispKey) {
    dispKeyRef.current = dispKey;
    if (typedCount !== 0) setTypedCount(0);
  }
  const typing = screen === 'story' && !checkPending && typedCount < fullLen;
  const typeTimer = useRef<number | undefined>(undefined);

  // 背景图层（交叉淡入，避免切场景硬闪）
  const [bgLayers, setBgLayers] = useState<{ k: string; url: string }[]>([{ k: node.background, url: bgUrl }]);
  useEffect(() => {
    setBgLayers((prev) => (prev[prev.length - 1].url === bgUrl ? prev : [...prev, { k: `${node.background}:${nodeIndex}`, url: bgUrl }].slice(-2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgUrl]);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 800);
    setHasSave(!!localStorage.getItem(SAVE_KEY));
    return () => window.clearTimeout(timer);
  }, []);

  // 自动存档（复习模式 reviewReturn 时不写，避免把主线进度带乱）
  useEffect(() => {
    if (screen !== 'story' || reviewReturn !== null) return;
    const payload = { chapter: currentChapter, nodeIndex, stats, history, quizResults, clearedChecks, flags };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(payload)); setHasSave(true); } catch { /* ignore */ }
  }, [screen, currentChapter, nodeIndex, stats, history, quizResults, clearedChecks, flags, reviewReturn]);

  // 章节通关进度持久化
  useEffect(() => { try { localStorage.setItem(CHAPTERS_DONE_KEY, JSON.stringify(chaptersDone)); } catch { /* ignore */ } }, [chaptersDone]);
  // flags（路线锁定/事件记忆）持久化
  useEffect(() => { try { localStorage.setItem(FLAGS_KEY, JSON.stringify(flags)); } catch { /* ignore */ } }, [flags]);

  // 走到本章结尾即标记通关（解锁下一章），复习模式不计
  useEffect(() => {
    if (screen !== 'story' || reviewReturn !== null || nodeIndex < chapter.nodes.length - 1) return;
    if (currentChapter < MAIN_COUNT) {
      setChaptersDone((d) => (d.includes(currentChapter) ? d : [...d, currentChapter]));
    }
    // 路线完成（到该角色线最后一章末节点）→ 周回标记，解锁隐藏线 & 教师True 前置
    const fam = chFamily(currentChapter);
    if (fam.startsWith('route_')) {
      const familyLast = currentChapter + 1 >= CHAPTERS.length || chFamily(currentChapter + 1) !== fam;
      if (familyLast) {
        const rk = fam.replace('route_', '');
        setFlags((f) => (f[`cleared_route_${rk}`] ? f : { ...f, [`cleared_route_${rk}`]: true, cleared_any_main_route: true }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, nodeIndex, currentChapter, reviewReturn]);

  // 掌握度 / 错题本 持久化
  useEffect(() => { try { localStorage.setItem(MASTERY_KEY, JSON.stringify(mastery)); } catch { /* ignore */ } }, [mastery]);
  useEffect(() => { try { localStorage.setItem(SRS_KEY, JSON.stringify(srs)); } catch { /* ignore */ } }, [srs]);
  useEffect(() => { try { localStorage.setItem(DAILY_KEY, JSON.stringify(daily)); } catch { /* ignore */ } }, [daily]);
  useEffect(() => { try { localStorage.setItem(KPCORRECT_KEY, JSON.stringify(kpCorrect)); } catch { /* ignore */ } }, [kpCorrect]);
  useEffect(() => { try { localStorage.setItem(WRONG_KEY, JSON.stringify(wrongbook)); } catch { /* ignore */ } }, [wrongbook]);
  useEffect(() => { try { localStorage.setItem(STAR_KEY, String(stars)); } catch { /* ignore */ } }, [stars]);
  useEffect(() => { try { localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)); } catch { /* ignore */ } }, [unlocked]);
  useEffect(() => { try { localStorage.setItem(SPEED_KEY, String(textSpeed)); } catch { /* ignore */ } }, [textSpeed]);

  // 打字机：进入每个可见对话节点逐字显示（做题阻断时不跑；速度可在设置里调，0=秒显）
  useEffect(() => {
    if (screen !== 'story' || checkPending) return;
    const total = plainLen(pageText);
    setTypedCount(0);
    if (total === 0) return;
    if (textSpeed <= 0) { setTypedCount(total); return; }
    let i = 0;
    typeTimer.current = window.setInterval(() => {
      i += 1;
      setTypedCount(i);
      if (i >= total) window.clearInterval(typeTimer.current);
    }, textSpeed);
    return () => window.clearInterval(typeTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispKey, screen, checkPending, textSpeed]);

  // 回看：每进入一个可见节点把台词记入 backlog
  useEffect(() => {
    if (screen !== 'story' || checkPending) return;
    const sp = speakerToId[node.speaker] ? characters[speakerToId[node.speaker]].name : '旁白';
    setBacklog((b) => (b.length && b[b.length - 1].kind === 'line' && b[b.length - 1].text === node.text ? b : [...b, { speaker: sp, text: node.text, kind: 'line' }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.id, screen]);

  // 答错过的模块（做题答错 or 情境踩红线）→ 复盘里标记重点复习
  const wrongModules = useMemo(() => {
    const s = new Set<string>();
    quizResults.filter((r) => !r.correct).forEach((r) => s.add(r.module));
    history.filter((h) => h.quality === 'risk' && h.examTags).forEach((h) => s.add(h.examTags!.module));
    return s;
  }, [quizResults, history]);
  // 答错过的「考点」（精确到 kpId，避免同模块一错全模块卡片都亮⚠）
  const wrongKps = useMemo(() => {
    const s = new Set<string>();
    quizResults.filter((r) => !r.correct).forEach((r) => {
      const kp = quizById[r.id]?.kpId ?? bankById[r.id]?.kpId;
      if (kp) s.add(kp);
    });
    return s;
  }, [quizResults]);

  // keepStats=true：进入个人路线时保留共通篇攒下的好感与能力（路线衔接，不清零）
  function startChapter(fresh = true, ci: number = currentChapter, keepStats = false) {
    setCurrentChapter(ci);
    setReviewReturn(null); setReviewReturnCh(null);
    if (fresh) {
      setNodeIndex(0);
      if (!keepStats) setStats(initialStats);
      setHistory([]); setQuizResults([]); setClearedChecks([]); setBacklog([]);
    }
    setScreen('story'); setOverlay(null); setMock(null); setPending(null);
    // 新开主线章 → 播放进入动画(可点击跳过)；续玩/支线/番外不播
    setIntroCh(fresh && ci < MAIN_COUNT ? ci : null);
  }

  // 路线选择（P1 #5 简化版）：affection≥门槛即可锁线进个人首章。
  // TODO(P1): 完整版应由共通 ch4 末"心之所向"branch 节点按 route_lean_* 倾向自动锁线。
  function pickRoute(r: RouteInfo) {
    const aff = stats[r.affKey];
    if (aff < ROUTE_AFFECTION_GATE) {
      showToast(`${r.label}：好感不足（${aff}/${ROUTE_AFFECTION_GATE}）——多陪TA一程再来`);
      return;
    }
    if (r.ch1Index < 0) { showToast('该线章节尚未就位'); return; }
    // 锁线 flag 写入并立即用于路线章 requires 通过（setFlag → flags 持久化）
    setFlags((f) => ({ ...f, [r.lockFlag]: true }));
    setShowRoutePicker(false);
    startChapter(true, r.ch1Index, true); // 带入共通好感与能力
    showToast(`进入${r.label} · 共通篇好感 ${aff} 已带入`);
  }

  function continueGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) { startChapter(true); return; }
    try {
      const s = JSON.parse(raw);
      setCurrentChapter(Math.min(s.chapter ?? 0, CHAPTERS.length - 1));
      setNodeIndex(s.nodeIndex ?? 0);
      setStats({ ...initialStats, ...s.stats });
      setHistory(s.history ?? []);
      setQuizResults(s.quizResults ?? []);
      setClearedChecks(s.clearedChecks ?? []);
      if (s.flags) setFlags(s.flags);
      setScreen('story'); setOverlay(null);
    } catch { startChapter(true); }
  }

  // 三级回退导航：choice.next → node.branch → 顺序下一节点。
  // resolveNext 给定（可能已更新的）stats/flags，返回应跳到的 nodeIndex。
  function resolveNextIndex(
    explicitNext: string | undefined,
    branch: BranchRule[] | undefined,
    nextStats: Stats,
    nextFlags: Record<string, boolean | number>,
  ): number {
    const seq = Math.min(nodeIndex + 1, chapter.nodes.length - 1);
    const findById = (id: string) => chapter.nodes.findIndex((n) => n.id === id);
    // 1) choice.next
    if (explicitNext) {
      const idx = findById(explicitNext);
      if (idx >= 0) return idx;
      console.warn(`[branch] choice.next 未找到节点 "${explicitNext}"（章 ${chapter.chapterId}），退化为顺序`);
      return seq;
    }
    // 2) node.branch（首条命中的规则）
    if (branch && branch.length) {
      for (const rule of branch) {
        if (evalCondition(rule.condition, { stats: nextStats, flags: nextFlags, examPointsCleared })) {
          const idx = findById(rule.goto);
          if (idx >= 0) return idx;
          console.warn(`[branch] branch.goto 未找到节点 "${rule.goto}"（章 ${chapter.chapterId}），退化为顺序`);
          return seq;
        }
      }
    }
    // 3) 顺序
    return seq;
  }

  function advance() {
    if (node.type === 'summary') { setOverlay('review'); return; }
    // 走到末节点且本章无 summary（如群像番外）→ 优雅收尾回菜单，避免点击卡在原地
    if (nodeIndex >= chapter.nodes.length - 1) {
      showToast('本篇完结 ✦ 返回主菜单');
      setScreen('menu');
      return;
    }
    // 非选择节点：若有 branch 按规则跳转，否则顺序前进
    const target = resolveNextIndex(undefined, node.branch, stats, flags);
    setNodeIndex(target);
  }

  function onStoryClick() {
    if (overlay || mock || checkPending) return;
    if (typing) { window.clearInterval(typeTimer.current); setTypedCount(fullLen); return; }
    if (!onLastPage) { setPageIdx(safePage + 1); return; } // 本句还有下一段 → 显示下一段
    if (node.type !== 'choice') advance();
  }

  function choose(choice: Choice) {
    const entry: HistoryEntry = {
      nodeId: node.id, choiceText: choice.text, quality: choice.quality,
      feedback: choice.feedback, examTags: node.examTags, answerKeywords: choice.answerKeywords,
    };
    // 同步算出新 stats / flags，供分支条件判定（setState 异步，分支不能等下一帧）
    const nextStats = applyChoice(stats, choice);
    const nextFlags = mergeFlags(flags, choice.setFlag);
    const target = resolveNextIndex(choice.next, node.branch, nextStats, nextFlags);
    setStats(nextStats);
    if (choice.setFlag) setFlags(nextFlags);
    setHistory((v) => [...v, entry]);
    setBacklog((b) => [...b, { speaker: '我', text: choice.text, kind: 'choice' }]);
    setPending({ entry, effects: choice.effects, target });
    setOverlay('feedback');
  }

  function continueAfterFeedback() {
    const target = pending?.target;
    setPending(null); setOverlay(null);
    setNodeIndex((i) => (target !== undefined ? target : Math.min(i + 1, chapter.nodes.length - 1)));
  }

  function recordQuiz(item: QuizItem, correct: boolean) {
    setQuizResults((v) => [...v, { id: item.id, module: item.module, correct, stage: item.stage }]);
    recordSrs(item.id, correct);
  }

  function clearCheck(item: QuizItem, correct: boolean) {
    recordQuiz(item, correct);
    setClearedChecks((v) => [...v, node.id]);
    // 玩法↔数值连一条线：答对就涨"专业判断/考点掌握"
    setStats((v) => ({
      ...v,
      professionalSkill: clampStat('professionalSkill', v.professionalSkill + (correct ? 3 : 0)),
      examScore: clampStat('examScore', v.examScore + (correct ? 4 : -1)),
    }));
    // 同步写考点地图掌握度 + 错题本（剧情答题 = 刷题，共用一套数据）
    recordMastery(kpOf(item.id), correct, item.id);
    updateWrong(item.id, correct);
  }

  // ===== 掌握度 / 错题本 =====
  function showToast(t: string) {
    window.clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }
  function recordMastery(kp: string | undefined, correct: boolean, itemId?: string) {
    if (!kp) return;
    const cur = new Set(kpCorrect[kp] || []);
    if (correct && itemId) cur.add(itemId);
    const nowMastered = masteredRule(kp, cur);
    const wasMastered = mastery[kp] === 'mastered';
    // ★：新达成掌握 +2，其它答对 +1（答错不扣）
    if (correct) setStars((s) => s + (nowMastered && !wasMastered ? 2 : 1));
    setKpCorrect((c) => ({ ...c, [kp]: [...cur] }));
    setMastery((m) => ({ ...m, [kp]: nowMastered ? 'mastered' : 'learning' }));
  }
  function unlockItem(it: GalleryItem) {
    if (unlocked.includes(it.id)) { setLightbox(galUrl(it.full)); return; }
    if (stars < it.cost) { showToast(`★ 不够，还差 ${it.cost - stars} 颗（去学考点/刷题攒星）`); return; }
    setStars((s) => s - it.cost);
    setUnlocked((u) => [...u, it.id]);
    showToast(`已解锁「${it.title}」`);
  }
  function unlockCG(it: CGItem) {
    const cost = it.cost ?? 30;
    if (unlocked.includes(it.id)) { setLightbox(cgUrl(it.full)); return; }
    if (stars < cost) { showToast(`★ 不够，还差 ${cost - stars} 颗（去学考点/刷题攒星）`); return; }
    setStars((s) => s - cost);
    setUnlocked((u) => [...u, it.id]);
    showToast(`已解锁「${it.title}」`);
  }
  function updateWrong(qid: string, correct: boolean) {
    setWrongbook((wb) => {
      const ex = wb.find((w) => w.id === qid);
      if (correct) {
        if (!ex) return wb;
        const streak = ex.streak + 1;
        return streak >= 2 ? wb.filter((w) => w.id !== qid) : wb.map((w) => (w.id === qid ? { ...w, streak } : w));
      }
      return ex ? wb.map((w) => (w.id === qid ? { ...w, count: w.count + 1, streak: 0 } : w)) : [...wb, { id: qid, count: 1, streak: 0 }];
    });
  }

  // ===== 刷题流程 =====
  function startQueue(ids: string[], label: string) {
    if (!ids.length) { showToast('暂无题目'); return; }
    setQueue(ids); setQi(0); setPicked([]); setJudged(false); setPResults([]);
    setPracticeLabel(label); setScreen('practice'); setPv('play'); setOverlay(null); setMapKpOpen(null);
  }
  function startAll() { startQueue(bank.items.map((q) => q.id), '按考点 · 全部'); }
  function startRandom() {
    const ids = bank.items.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    startQueue(ids, '随机刷');
  }
  function startZhenti(subject?: '301' | '302') {
    const pool = subject ? ZHENTI.filter((q) => q.subject === subject) : ZHENTI;
    const ids = pool.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    startQueue(ids.slice(0, 30), `真题刷题${subject ? ` · 科${subject === '301' ? '一' : '二'}` : ''}`);
  }
  // 整卷模考：按真实考卷结构组卷（客观题 ZHENTI + 各题型主观题 SUBJ），混合呈现、分区估分
  function startFullMock(subject: '301' | '302') {
    const cfg = FULL_MOCK[subject];
    const pick = <T,>(arr: T[], n: number): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a.slice(0, n);
    };
    const mcq = pick(ZHENTI.filter((q) => q.subject === subject), cfg.mcq);
    if (mcq.length < 5) { showToast('真题不足，无法组卷'); return; }
    const subjItems: SubjItem[] = [];
    for (const sec of cfg.sections) {
      subjItems.push(...pick(SUBJ.filter((s) => s.subject === subject && s.subjType === sec.type), sec.n));
    }
    const items: (QuizItem | SubjItem)[] = [...mcq, ...subjItems];
    setOverlay(null); setSubjRevealed(false); setSubjChecked([]);
    setMock({ items, idx: 0, results: [], full: { subject, label: cfg.label } });
  }
  function startWrong() {
    const ids = wrongbook.map((w) => w.id);
    if (!ids.length) { showToast('错题本是空的'); return; }
    startQueue(ids, '错题重练');
  }
  // 通用题目解析：刷题/复习队列里既有自编题(bankById)也有章节随堂题(quizById)
  const qItem = (id: string): QuizItem | undefined => bankById[id] ?? quizById[id];
  // 记录一次作答到 SRS 调度（在所有判分处调用）
  function recordSrs(id: string, correct: boolean) {
    setSrs((prev) => srsUpdate(prev, id, correct, Date.now()));
  }
  // 今日备考取题优先级：①主动标记"没懂"的考点 → ②SRS 到期(最逾期优先) → ③薄弱考点补足
  function dueIds(limit: number): string[] {
    const now = Date.now();
    // ① 主动标记没懂的考点的题（最高优先，无论掌握与否）
    const flaggedQ = bank.items.filter((q) => q.kpId && flaggedKp.includes(q.kpId)).map((q) => q.id);
    // ② SRS 到期
    const due = Object.entries(srs)
      .filter(([id, r]) => r.due <= now && qItem(id))
      .sort((a, b) => a[1].due - b[1].due)
      .map(([id]) => id);
    // ③ 薄弱考点（未掌握）
    const weak = bank.items
      .filter((q) => q.kpId && mastery[q.kpId] !== 'mastered')
      .map((q) => q.id);
    for (let i = weak.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [weak[i], weak[j]] = [weak[j], weak[i]]; }
    // 去重保序 + 只保留可解析的题
    const seen = new Set<string>(); const out: string[] = [];
    for (const id of [...flaggedQ, ...due, ...weak]) { if (qItem(id) && !seen.has(id)) { seen.add(id); out.push(id); } }
    return out.slice(0, limit);
  }
  const dueCount = useMemo(() => {
    const now = Date.now();
    return Object.entries(srs).filter(([id, r]) => r.due <= now && (bankById[id] || quizById[id])).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srs]);
  // 今日备考（每日一关）：到期复习 + 薄弱题，6 题一组；完成记连胜
  function startDaily() {
    const ids = dueIds(6);
    if (!ids.length) { showToast('今天没有到期复习——去做新章或刷题积累吧'); return; }
    setDailyMode(true);
    startQueue(ids, '今日备考 · 每日一关');
  }
  // 今日复习（全部到期，不限 6 题）
  function startReview() {
    const ids = dueIds(9999);
    if (!ids.length) { showToast('暂无到期复习的题 ✦ 继续学习会自动安排'); return; }
    startQueue(ids, '今日复习 · 间隔重复');
  }
  function markDailyDone() {
    const t = dayStr(new Date());
    setDaily((prev) => {
      if (prev.last === t) return prev; // 今天已记
      const y = dayStr(new Date(Date.now() - DAY_MS));
      const streak = prev.last === y ? prev.streak + 1 : 1;
      return { last: t, streak };
    });
  }
  function pPick(id: string, type: 'single' | 'multiple') {
    if (judged) return;
    if (type === 'single') setPicked([id]);
    else setPicked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }
  function pSubmit() {
    if (judged || !picked.length) return;
    const item = qItem(queue[qi]);
    if (!item) return;
    const correct = setEqual(picked, item.answer);
    recordMastery(item.kpId, correct, item.id);
    updateWrong(item.id, correct);
    recordSrs(item.id, correct);
    // 刷题 → 能力状态：玩法和数值在一条线上（羁绊仍只靠剧情，不在此加）
    setStats((v) => ({
      ...v,
      examScore: clampStat('examScore', v.examScore + (correct ? 3 : -1)),
      professionalSkill: clampStat('professionalSkill', v.professionalSkill + (correct ? 1 : 0)),
    }));
    setPResults((r) => [...r, { id: item.id, kp: item.kpId ?? '', correct }]);
    setJudged(true);
  }
  function pNext() {
    if (qi + 1 < queue.length) { setQi(qi + 1); setPicked([]); setJudged(false); return; }
    const right = pResults.filter((r) => r.correct).length;
    const wrong = pResults.length - right;
    const kps = [...new Set(pResults.map((r) => r.kp))].map((k) => KP[k]?.title ?? k);
    setLastSummary({ total: pResults.length, right, wrong, kps });
    // 今日备考完成 → 记连胜（拟人化提示，断签不清零，只是角色"惦记"）
    if (dailyMode) {
      markDailyDone();
      const t = dayStr(new Date());
      const cont = daily.last === dayStr(new Date(Date.now() - DAY_MS)) || daily.last === t;
      showToast(daily.last === t ? '今天已经打过卡啦 ✦' : `🔥 连胜 ${cont ? daily.streak + 1 : 1} 天——TA 看见你今天也来了，眼睛弯了弯`);
      setDailyMode(false);
    }
    setPv('summary');
  }
  function markSeen(kpId: string) {
    setMastery((m) => (m[kpId] === 'mastered' ? m : { ...m, [kpId]: 'learning' }));
  }
  function kpLearn(kpId: string) {
    const tn = KP[kpId]?.teachNodeId;
    if (tn) {
      // 跨章节查找讲授节点所在的章与下标
      for (let ci = 0; ci < CHAPTERS.length; ci++) {
        const idx = CHAPTERS[ci].nodes.findIndex((n) => n.id === tn);
        if (idx >= 0) {
          if (reviewReturn === null) { setReviewReturn(nodeIndex); setReviewReturnCh(currentChapter); }
          setMapKpOpen(null); setOverlay(null); setScreen('story');
          setCurrentChapter(ci); setNodeIndex(idx);
          showToast(`复习模式：跳到讲「${KP[kpId].title}」的桥段，看完点「↩ 回到我的进度」`);
          return;
        }
      }
    }
    // 无剧情节点：知识卡即微课——下方要点就是这个考点的讲授，标记"学过"，去练巩固
    markSeen(kpId);
    showToast(`已学「${KP[kpId].title}」要点 ✦ 下方就是讲授，去练几道巩固即可`);
  }
  function kpPractice(kpId: string) {
    const ids = KP[kpId]?.quizIds ?? [];
    if (!ids.length) { showToast('该知识点暂无练习题（敬请期待）'); return; }
    startQueue(ids, `考点 · ${KP[kpId].title}`);
  }

  // ===== 主观题练习（采分点自评）=====
  function startSubj(ids: string[], label: string) {
    if (!ids.length) { showToast('暂无主观题'); return; }
    setSubjQueue(ids); setSubjIdx(0); setSubjRevealed(false); setSubjChecked([]); setSubjResults([]);
    setSubjLabel(label); setScreen('practice'); setPv('subj'); setOverlay(null);
  }
  function startSubjAll() {
    const ids = SUBJ.map((s) => s.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    startSubj(ids, '主观题 · 混练');
  }
  function startSubjByType(t: string) {
    startSubj(SUBJ.filter((s) => s.subjType === t).map((s) => s.id), `主观题 · ${t}`);
  }
  function subjToggle(i: number) {
    setSubjChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  }
  function subjNext() {
    const it = subjById[subjQueue[subjIdx]];
    const results = [...subjResults, { id: it.id, hit: subjChecked.length, total: it.scorePoints.length }];
    if (subjIdx + 1 < subjQueue.length) {
      setSubjResults(results); setSubjIdx(subjIdx + 1); setSubjRevealed(false); setSubjChecked([]);
    } else {
      setSubjResults(results); setPv('subjSummary');
    }
  }

  function startMock() {
    // 月考：紧扣「本章自己教的考点题」。内联随堂题已关闭→这些题正好释放出来，用作月考既贴合本章、
    // 又让每章月考各不相同（修复"几章月考一摸一样"——之前按 module 抽全库随机，章节映射又坏，导致雷同）。
    // 历年真题(OCR回忆版)噪声大，清洗前暂不进月考。
    const kmCh = KMAP.chapters.find((c) => c.id === chapter.chapterId);
    const kpIds = (kmCh?.modules ?? []).flatMap((m) => m.kps);
    const shuffle = <T,>(a: T[]): T[] => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const WANT = 5;
    // ① 先取本章自己的题（最贴合、且各章不同）
    let items = shuffle([...(CHAPTER_QUIZZES[currentChapter]?.items ?? [])]).slice(0, WANT);
    // ② 不足则用同模块题库补足（排除已选）
    if (items.length < WANT) {
      const moduleSet = new Set<string>(kpIds.map((k) => KP[k]?.module).filter(Boolean) as string[]);
      const seen = new Set(items.map((i) => i.id));
      const extra = shuffle(bank.items.filter((q) => q.module && moduleSet.has(q.module) && !seen.has(q.id)));
      items = [...items, ...extra].slice(0, WANT);
    }
    // ③ 仍不足退回冷测清单
    if (items.length < 3) {
      const fallback = (quizBank.mockExam?.coldTestItems ?? []).map((id) => quizById[id]).filter(Boolean);
      const seen = new Set(items.map((i) => i.id));
      items = [...items, ...fallback.filter((i) => !seen.has(i.id))].slice(0, Math.max(WANT, 3));
    }
    if (!items.length) return;
    // 月考末尾追加 1 道主观题（材料分析/辨析/简答），让月考不再全是选择题；按本章考点匹配
    const subjPool = SUBJ.filter((s) => s.kpId && kpIds.includes(s.kpId));
    const mockItems: (QuizItem | SubjItem)[] = [...items];
    if (subjPool.length) mockItems.push(subjPool[Math.floor(Math.random() * subjPool.length)]);
    setOverlay(null);
    setSubjRevealed(false); setSubjChecked([]);
    setMock({ items: mockItems, idx: 0, results: [] });
  }
  // 判断月考当前项是否为主观题
  function isSubj(it: QuizItem | SubjItem): it is SubjItem {
    return (it as SubjItem).type === 'subjective' || Array.isArray((it as SubjItem).scorePoints);
  }

  // 结局档位判定（§6.1）：通过终极考试(题达标) 且 羁绊≥24 → Good；16≤aff<24 → Normal；否则 Bad
  function routeTier(routeKey: string): 'good' | 'normal' | 'bad' {
    const r = ROUTES.find((x) => x.key === routeKey);
    const aff = r ? stats[r.affKey] : 0;
    // 有终极考试的线：Good 需过考(题达标)；无终极考试的线（如隐藏短线）：Good 仅看羁绊
    const passed = ROUTE_EXAMS[routeKey] ? !!flags[ROUTE_EXAMS[routeKey].passFlag] : true;
    if (passed && aff >= 24) return 'good';
    if (aff >= 16) return 'normal';
    return 'bad';
  }
  // 打开结局：Good 档记 good_end_* flag（教师True前置：至少一条线圆满）
  function openEnding(routeKey: string) {
    if (routeTier(routeKey) === 'good') setFlags((f) => (f[`good_end_${routeKey}`] ? f : { ...f, [`good_end_${routeKey}`]: true }));
    setShowRoutePicker(false); setMock(null); setEndingRoute(routeKey); setOverlay('ending');
  }
  // 路线终极考试（近真题难度，过 passLine → 设 passFlag + 学业 flags → 解锁该线 Good End/告白）
  function startRouteExam(routeKey: string) {
    const cfg = ROUTE_EXAMS[routeKey];
    if (!cfg) { showToast('该线暂无终极考试'); return; }
    const pool = [...cfg.mcqPool];
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const mcq = pool.map((id) => bankById[id] ?? quizById[id]).filter(Boolean).slice(0, cfg.nMcq);
    if (!mcq.length) { showToast('题库未就绪'); return; }
    // 终极考试也含主观题（近真题：客观 + 材料分析/简答）。subjPool 存的是该线相关客观题 id，
    // 由其 kpId 反查出本线考点域，再取真正的主观题（SUBJ）接在客观题后。
    const subjKps = new Set((cfg.subjPool ?? []).map((id) => quizById[id]?.kpId ?? bankById[id]?.kpId).filter(Boolean) as string[]);
    const subjCand = SUBJ.filter((s) => s.kpId && subjKps.has(s.kpId));
    for (let i = subjCand.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [subjCand[i], subjCand[j]] = [subjCand[j], subjCand[i]]; }
    const subj = subjCand.slice(0, cfg.nSubj ?? 2);
    const items: (QuizItem | SubjItem)[] = [...mcq, ...subj];
    setShowRoutePicker(false); setOverlay(null);
    setSubjRevealed(false); setSubjChecked([]);
    setMock({ items, idx: 0, results: [], exam: { passLine: cfg.passLine, passFlag: cfg.passFlag, label: cfg.title, routeKey } });
  }

  function mockDone(correct: boolean) {
    if (!mock) return;
    const item = mock.items[mock.idx];
    const sub = isSubj(item);
    const results = [...mock.results, { id: item.id, module: item.module, correct, stage: sub ? '主观题' : (item as QuizItem).stage }];
    if (sub) {
      if (item.kpId) recordMastery(item.kpId, correct, item.id);
      recordSrs(item.id, correct);
    } else {
      recordQuiz(item as QuizItem, correct);
      recordMastery(kpOf(item.id), correct, item.id);
    }
    updateWrong(item.id, correct);
    if (mock.idx + 1 < mock.items.length) {
      setMock({ ...mock, idx: mock.idx + 1, results });
    } else {
      const correctCount = results.filter((r) => r.correct).length;
      setStats((v) => ({ ...v, examScore: clampStat('examScore', v.examScore + correctCount * 2) }));
      setStars((s) => s + 5 + (correctCount === results.length ? 5 : 0)); // 章节通关 +5，全对再 +5
      // 过线判定只看客观题：主观题是"采分点自评",不作为教师True/线结局的学业门槛(防自评勾满绕过)
      const objResults = results.filter((r) => r.stage !== '主观题');
      const rate = objResults.length ? objResults.filter((r) => r.correct).length / objResults.length : correctCount / Math.max(1, results.length);
      // 终极考试：达 passLine → 置该线学业 flags（解锁 Good End/告白）+ 总冷测达标(教师True前置)
      if (mock.exam && rate >= mock.exam.passLine) {
        const ex = mock.exam;
        setFlags((f) => ({ ...f, [ex.passFlag]: true, mock_exam_passed: true, ...(EXTRA_PASS_FLAGS[ex.routeKey] ?? {}) }));
      } else if (!mock.exam && rate >= 0.8) {
        // 普通月考高分(≥80%)也算"总冷测达标"，接教师True前置
        setFlags((f) => (f.mock_exam_passed ? f : { ...f, mock_exam_passed: true }));
      }
      setMock({ ...mock, idx: mock.items.length, results });
      setOverlay('mockResult');
    }
  }

  function exportSave() {
    // 修复：之前漏存 chapter + flags → 导入文件存档会落到错误章节、且丢失所有线路/结局标记
    const payload = { chapter: currentChapter, nodeIndex, stats, flags, history, quizResults, clearedChecks, savedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = '备课铃响之前_存档.json'; a.click();
    URL.revokeObjectURL(url);
  }
  function importSave(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const s = JSON.parse(String(reader.result));
        setCurrentChapter(Math.min(Math.max(0, s.chapter ?? 0), CHAPTERS.length - 1));
        setNodeIndex(s.nodeIndex ?? 0);
        setStats({ ...initialStats, ...s.stats });
        if (s.flags) setFlags(s.flags);
        setHistory(s.history ?? []);
        setQuizResults(s.quizResults ?? []);
        setClearedChecks(s.clearedChecks ?? []);
        setScreen('story'); setOverlay(null);
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
  }

  function readSlot(i: number): { savedAt: string; nodeTitle: string; chapter?: number; nodeIndex: number; stats: Stats; history: HistoryEntry[]; quizResults: QuizResult[]; clearedChecks: string[]; flags?: Record<string, boolean | number> } | null {
    try { const r = localStorage.getItem(slotKey(i)); return r ? JSON.parse(r) : null; } catch { return null; }
  }
  function saveToSlot(i: number) {
    const data = { chapter: currentChapter, nodeIndex, stats, history, quizResults, clearedChecks, flags, savedAt: new Date().toLocaleString('zh-CN'), nodeTitle: `${CH_NO[currentChapter] ?? currentChapter + 1}章 · ${node.text.replace(/\n/g, ' ').slice(0, 14)}` };
    try { localStorage.setItem(slotKey(i), JSON.stringify(data)); } catch { /* ignore */ }
    setSlotsVer((v) => v + 1);
  }
  function loadFromSlot(i: number) {
    const d = readSlot(i);
    if (!d) return;
    setCurrentChapter(Math.min(d.chapter ?? 0, CHAPTERS.length - 1));
    setNodeIndex(d.nodeIndex ?? 0);
    setStats({ ...initialStats, ...d.stats });
    setHistory(d.history ?? []);
    setQuizResults(d.quizResults ?? []);
    setClearedChecks(d.clearedChecks ?? []);
    if (d.flags) setFlags(d.flags);
    setBacklog([]);
    setScreen('story'); setOverlay(null);
  }

  function reset() {
    startChapter(true); setScreen('menu');
  }

  const reviewData = chapter.nodes.find((n) => n.type === 'summary')?.review;
  const mockWeakModules = mock ? Array.from(new Set(mock.results.filter((r) => !r.correct).map((r) => r.module))) : [];
  const weakItems = useMemo(() => {
    const out: string[] = [];
    const seen = new Set<string>();
    quizResults.filter((r) => !r.correct).forEach((r) => {
      if (seen.has(r.module)) return;
      seen.add(r.module);
      out.push(`${r.module}：做题答错，点开下方该模块卡片重看`);
    });
    history.filter((h) => h.quality === 'risk' && h.examTags).forEach((h) => {
      const m = h.examTags!.module;
      if (seen.has(m)) return;
      seen.add(m);
      out.push(`${m}：情境处理踩了红线（${h.answerKeywords[0] ?? ''}）`);
    });
    return out;
  }, [quizResults, history]);

  const chapterDone = nodeIndex >= chapter.nodes.length - 1;
  const evalResult = (() => {
    if (stats.ethicsRisk >= 30 || stats.lawRisk >= 30) {
      return { tier: '触线警示 ⚠', note: '今天有处理踩了师德 / 法规红线，先把学生权利与边界补牢。' };
    }
    const avg = (stats.professionalSkill + stats.studentTrust + stats.examScore) / 3;
    if (avg >= 70) return { tier: '优秀见习 ★', note: '专业判断、学生信任、考点都在线，开局很稳。' };
    if (avg >= 58) return { tier: '合格 ✓', note: '基本过关，个别地方还能更专业一点。' };
    return { tier: '需加油', note: '有些选择偏离了专业做法，对照反馈再练练。' };
  })();

  const riskValue = Math.max(stats.ethicsRisk, stats.lawRisk);
  const speakerExpr: Expr = (node.expression as Expr) ?? NODE_EXPR[node.id] ?? (speakerId === 'shen' ? 'smile' : 'neutral');
  // 旁白 = 第一人称心声/叙述（斜体无名牌）；其它角色（含学生）显示名牌
  const isNarrator = node.speaker === 'narrator' || !node.speaker;
  const speakerName = isNarrator ? null : (currentCharacter?.name ?? node.speaker);

  // 考点地图统计
  const cMastered = ALL_KP_IDS.filter((k) => mastery[k] === 'mastered').length;
  const cLearningOnly = ALL_KP_IDS.filter((k) => mastery[k] === 'learning').length;
  const cTotal = ALL_KP_IDS.length;
  const cLearned = cMastered + cLearningOnly;
  // 当前刷题题目
  const curQ = screen === 'practice' && pv === 'play' && queue.length ? (bankById[queue[qi]] ?? quizById[queue[qi]]) : null;
  const curSubj = screen === 'practice' && pv === 'subj' && subjQueue.length ? subjById[subjQueue[subjIdx]] : null;

  // 选择章节面板：每章考点掌握统计（用本章自己的题的 kpId，绕开坏掉的 knowledge_map 映射）
  const chapterKpStats = (idx: number) => {
    const items = CHAPTER_QUIZZES[idx]?.items ?? [];
    const kps = Array.from(new Set(items.map((q) => q.kpId).filter(Boolean) as string[]));
    const mastered = kps.filter((k) => mastery[k] === 'mastered').length;
    return { kps, total: kps.length, mastered };
  };
  // 当前可进入（未通关）的最靠前主线章 → 卡片高亮「从这里继续」
  const currentMainIdx = (() => {
    for (let i = 0; i < MAIN_COUNT; i++) {
      const unlocked = i === 0 || chaptersDone.includes(i - 1);
      if (unlocked && !chaptersDone.includes(i)) return i;
    }
    return -1;
  })();

  return (
    <div className="app-frame">
      <main className={`stage ${booting ? 'is-booting' : ''}`} style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <section className={`screen screen--menu ${screen === 'menu' ? 'is-active' : ''}`}>
          <div className="menu-keyart" style={{ backgroundImage: `url(${bgMainMenuKeyart})` }} />
          <div className="menu-keyart-scrim" />
          {/* 角落系统簇：收藏馆 + 设置（低频项降到角落，不占主菜单） */}
          <div className="menu-corner">
            {!PUBLIC_BUILD ? (
              <button className="m-corner-stars" onClick={() => setShowClassroom(true)}>
                <span className="m-star">🏫</span><b>{classbathhouseata.completion}%</b><span className="m-corner-label">我的教室</span>
              </button>
            ) : null}
            <button className="m-corner-stars" onClick={() => setOverlay('gallery')}>
              <span className="m-star">★</span><b>{stars}</b><span className="m-corner-label">收藏馆</span>
            </button>
            <button className="m-corner-gear" onClick={() => setOverlay('preferences')} aria-label="设置">⚙</button>
          </div>

          <div className="menu-copy">
            <div className="kicker">TEACHER · CERTIFICATION</div>
            <h1>备课铃响之前</h1>
            <p>教师资格 · 校园剧情视觉小说</p>

            {/* ===== 一级：每日主 CTA + 继续/开始 + 学习聚合 ===== */}
            <div className="menu-tier1">
              <button className="m-cta" onClick={startDaily}>
                <span className="m-cta__sheen" />
                <span className="m-cta__icon">📅</span>
                <span className="m-cta__body">
                  <strong>今日备考 · 每日一关</strong>
                  <em>每天回来的那一关 · 巩固昨天，攻克今天</em>
                </span>
                <span className="m-cta__badges">
                  {daily.streak > 0 ? <span className="badge badge--streak">🔥 {daily.streak} 天</span> : null}
                  {dueCount > 0 ? <span className="m-badge-due">{dueCount} 题到期</span> : null}
                </span>
              </button>

              {hasSave ? (
                <button className="m-primary" onClick={continueGame}>
                  <span className="m-primary__icon">▶</span>
                  <span className="m-cta__body"><strong>继续游戏</strong><em>回到上次的进度</em></span>
                </button>
              ) : (
                <button className="m-primary" onClick={() => { setChapterTab('main'); setChapterPage(0); setShowChapterPicker(true); }}>
                  <span className="m-primary__icon">📖</span>
                  <span className="m-cta__body"><strong>开始学习 · 第一章</strong><em>入职第一天 · 新教师，从这里开始</em></span>
                </button>
              )}

              <button className={`m-aggregate ${menuLearnOpen ? 'is-open' : ''}`} onClick={() => setMenuLearnOpen((v) => !v)}>
                <span className="m-primary__icon">🎒</span>
                <span className="m-cta__body"><strong>学习</strong><em>选择章节 · 刷题题库 · 心之所向</em></span>
                <span className="m-aggregate__caret">{menuLearnOpen ? '▴' : '▾'}</span>
              </button>
            </div>

            {/* ===== 二级：档案馆 · 更多（折叠） ===== */}
            <div className="menu-tier2">
              <button className="m-more-toggle" onClick={() => setMenuMoreOpen((v) => !v)}>
                <span>{menuMoreOpen ? '▾' : '▸'} 档案馆 · 更多</span><i />
              </button>
              {menuMoreOpen ? (
                <div className="m-more-grid">
                  <button
                    className={`m-more-card m-more-card--true ${teacherTrueReady ? 'is-true-ready' : ''}`}
                    onClick={() => (teacherTrueReady ? setOverlay('teacherEnd') : showToast(`教师之路·True 需主考纲掌握≥${TEACHER_TRUE_KP}考点 且 总冷测达标（当前掌握 ${mainCleared}/${MAIN_KP_IDS.length}）`))}
                  >
                    <span className="m-more-row"><span>🎓</span><span>教师之路 · 真结局</span><span className="m-more-lock">{teacherTrueReady ? '✦' : '🔒'}</span></span>
                    <em>{teacherTrueReady ? '条件达成 · 点击进入真结局' : `还差 ${Math.max(0, TEACHER_TRUE_KP - mainCleared)} 个考点达标 · 点击看进度`}</em>
                  </button>
                  <button className="m-more-card" onClick={() => { setSaveMode('load'); setOverlay('saveload'); }}>
                    <span className="m-more-row"><span>🗂️</span><span>读取存档</span></span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* ===== 学习二级面板 ===== */}
          {menuLearnOpen ? (
            <div className="learn-panel-layer" onClick={() => setMenuLearnOpen(false)}>
              <div className="learn-panel" onClick={(e) => e.stopPropagation()}>
                <div className="learn-panel__head">
                  <span className="learn-panel__icon">🎒</span>
                  <div><div className="kicker">LEARN</div><strong>学习</strong></div>
                  <button className="btn-close on-paper" onClick={() => setMenuLearnOpen(false)}>✕</button>
                </div>
                <div className="learn-panel__body">
                  <button className="learn-item" onClick={() => { setMenuLearnOpen(false); setChapterTab('main'); setChapterPage(0); setShowChapterPicker(true); }}>
                    <span className="learn-item__icon">📖</span>
                    <span className="m-cta__body"><strong>选择章节 · 开始学习</strong><em>主线剧情中学考点</em></span>
                    <span className="learn-item__go">›</span>
                  </button>
                  <button className="learn-item" onClick={() => { setMenuLearnOpen(false); setScreen('practice'); setPv('home'); }}>
                    <span className="learn-item__icon">✎</span>
                    <span className="m-cta__body"><strong>刷题 · 题库练习</strong><em>按考点 / 随机 / 错题重练</em></span>
                    <span className="learn-item__go">›</span>
                  </button>
                  <button className="learn-item" onClick={() => { setMenuLearnOpen(false); setShowRoutePicker(true); }}>
                    <span className="learn-item__icon">💗</span>
                    <span className="m-cta__body"><strong>选择攻略线 · 心之所向</strong><em>好感达标后解锁个人线</em></span>
                    <span className="learn-item__go">›</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section
          className={`screen screen--story ${screen === 'story' ? 'is-active' : ''}`}
          onClick={onStoryClick}
        >
          <div className={`scene-bg ${speakerId ? 'is-dof' : ''}`}>
            {bgLayers.map((l, i) => (
              <div
                key={l.k}
                className="scene-img"
                style={{ backgroundImage: `url(${l.url})`, animation: i === bgLayers.length - 1 && bgLayers.length > 1 ? 'bgFade .55s ease' : undefined }}
              />
            ))}
            <div className="scene-veil" />
          </div>
          <header className="hud" onClick={(event) => event.stopPropagation()}>
            <div className="chapter-pill"><span>{CH_NO[currentChapter] ?? currentChapter + 1}</span><strong>{chapter.title}</strong></div>
            <nav>
              <button onClick={() => setOverlay('notebook')}>手账</button>
              <button onClick={() => setOverlay('review')}>复盘</button>
              <button onClick={() => setOverlay('log')}>回看</button>
              <button onClick={() => { setSaveMode('save'); setOverlay('saveload'); }}>存读</button>
              <button onClick={() => setOverlay('preferences')}><Settings size={16} /></button>
            </nav>
          </header>
          <CharacterStandee id={speakerId} expression={speakerExpr} />
          {/* 合成层：统一光氛(随场景调色) + 电影暗角 —— 盖在背景与立绘之上、对话之下，把三者揉成同一张画 */}
          <div className="scene-grade" data-bg={node.background} />
          <div className="scene-vignette" />

          {reviewReturn !== null ? (
            <button
              className="review-return"
              onClick={(event) => { event.stopPropagation(); const back = reviewReturn; const backCh = reviewReturnCh; setReviewReturn(null); setReviewReturnCh(null); if (backCh !== null) setCurrentChapter(backCh); setNodeIndex(back ?? 0); }}
            >↩ 回到我的进度</button>
          ) : null}

          {!checkPending ? (
            <article className="dialogue" onClick={(event) => { event.stopPropagation(); onStoryClick(); }}>
              <div className="dialogue__goldline" />
              {speakerName ? (
                <div className="nameplate" style={{ '--char': currentCharacter?.color ?? '#b6924e' } as CSSProperties}>{speakerName}</div>
              ) : null}
              <p className={`dialogue-text ${isNarrator ? 'is-narrator' : ''}`}>{renderRich(pageText, typedCount)}</p>
              {!typing ? (
                <div className="continue-row">
                  <span className="continue-hint">{!onLastPage ? '点击继续' : node.type === 'summary' ? '点击查看复盘' : node.type === 'choice' ? '' : '点击继续'}</span>
                  {(!onLastPage || node.type !== 'choice') ? <span className="continue-tri">▼</span> : null}
                </div>
              ) : null}
            </article>
          ) : null}

          {node.type === 'choice' && node.choices && choicesUnlocked && onLastPage && !typing && !checkPending && !mock && !overlay ? (
            <div className="choice-overlay" onClick={(event) => event.stopPropagation()}>
              <div className="choice-dim" />
              <div className="choice-stack">
                <div className="choice-capsule"><span className="choice-capsule__dot" />剧情选择 · 看你怎么处理 —— 不同选择影响好感与发展，没有"标准答案"</div>
                <div className="choice-cards">
                  {orderChoices(node.id, node.choices).map((choice, i) => (
                    <button className="choice-card" style={{ animationDelay: `${i * 70}ms` }} key={choice.id} onClick={() => choose(choice)}>
                      <span className="choice-card__key">{String.fromCharCode(65 + i)}</span>
                      <span className="choice-card__text">{choice.text}</span>
                      <span className="choice-card__bar" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* ===== 刷题模式（首页 / 做题 / 小结 / 错题本） ===== */}
        <section className={`screen screen--practice ${screen === 'practice' ? 'is-active' : ''}`}>
          {pv === 'home' ? (
            <div className="prac-home">
              <button className="prac-back" onClick={() => setScreen('menu')}>← 返回主菜单</button>
              <div className="prac-home-title">
                <div className="kicker">PRACTICE · 题库练习</div>
                <h1>刷题 · 题库练习</h1>
                <p>不看剧情，纯练手 · 在哪答对都计入考点地图掌握度</p>
              </div>
              <div className="prac-cards">
                <button className={`prac-card ${dueCount ? '' : 'is-dim'}`} onClick={startReview}>
                  <span className="prac-ic" style={{ background: 'rgba(200,121,78,.28)' }}>📅</span>
                  <b>今日复习 · 间隔重复</b><i>按遗忘曲线复现该复习的题（错题尽快重现、记牢的拉长间隔）。</i>
                  <em>{dueCount} 题到期</em>
                </button>
                <button className="prac-card" onClick={() => setPv('pick')}>
                  <span className="prac-ic" style={{ background: 'rgba(47,107,94,.25)' }}>📚</span>
                  <b>按考点练</b><i>选一个考点，只练它的题，针对性突破弱项。</i>
                  <em>题库 {bank.items.length} 题</em>
                </button>
                <button className="prac-card" onClick={startRandom}>
                  <span className="prac-ic" style={{ background: 'rgba(143,180,230,.25)' }}>🎲</span>
                  <b>随机刷</b><i>全题库随机连刷，答完一题接下一题。</i>
                  <em>混合全部考点</em>
                </button>
                <button className={`prac-card ${wrongbook.length ? '' : 'is-dim'}`} onClick={() => (wrongbook.length ? startWrong() : setPv('wrong'))}>
                  <span className="prac-ic" style={{ background: 'rgba(193,87,78,.25)' }}>🔁</span>
                  <b>错题重练</b><i>只抽错题本里的题，连续答对 2 次自动移出。</i>
                  <em className="hot">错题本（{wrongbook.length}）</em>
                </button>
                <button className={`prac-card ${SUBJ.length ? '' : 'is-dim'}`} onClick={() => (SUBJ.length ? startSubjAll() : showToast('暂无主观题'))}>
                  <span className="prac-ic" style={{ background: 'rgba(216,184,119,.28)' }}>✍️</span>
                  <b>主观题 · 采分点自评</b><i>辨析/简答/材料分析：看题→想→对照采分点勾选自评。</i>
                  <em>{SUBJ.length} 道（占分大头）</em>
                </button>
                <button className={`prac-card ${ZHENTI.length ? '' : 'is-dim'}`} onClick={() => (ZHENTI.length ? startZhenti() : showToast('暂无真题'))}>
                  <span className="prac-ic" style={{ background: 'rgba(140,150,170,.28)' }}>📜</span>
                  <b>真题刷题 · 历年</b><i>历年真题随机 30 题一组（个人备考；点 科一/科二 可分科）。</i>
                  <em>{ZHENTI.length} 题　<span onClick={(e) => { e.stopPropagation(); startZhenti('301'); }} style={{ textDecoration: 'underline' }}>科一</span> · <span onClick={(e) => { e.stopPropagation(); startZhenti('302'); }} style={{ textDecoration: 'underline' }}>科二</span></em>
                </button>
                <button className="prac-card" onClick={() => startFullMock('301')}>
                  <span className="prac-ic" style={{ background: 'rgba(200,121,78,.28)' }}>📝</span>
                  <b>整卷模考 · 按真卷结构</b><i>客观题+材料分析+写作/辨析/简答，整卷演练、分区估分、合格估计。</i>
                  <em><span onClick={(e) => { e.stopPropagation(); startFullMock('301'); }} style={{ textDecoration: 'underline' }}>科一整卷</span> · <span onClick={(e) => { e.stopPropagation(); startFullMock('302'); }} style={{ textDecoration: 'underline' }}>科二整卷</span></em>
                </button>
              </div>
              <button className="prac-wrong-link" onClick={() => setPv('wrong')}>查看错题本 →</button>
            </div>
          ) : null}

          {pv === 'pick' ? (
            <div className="prac-pick">
              <div className="prac-pick-head">
                <div><h1>按考点练</h1><small>选一个考点，只练它的题（带掌握状态与题量）</small></div>
                <div className="prac-pick-actions">
                  <button className="prac-back" onClick={() => setPv('home')}>← 返回</button>
                  <button className="glass-button" onClick={startAll}>全部混练</button>
                </div>
              </div>
              <div className="pick-list">
                {KMAP.chapters[0].modules.map((m) => {
                  const kps = m.kps.filter((k) => (KP[k]?.quizIds.length || 0) > 0);
                  if (!kps.length) return null;
                  return (
                    <div className="pick-mod" key={m.name}>
                      <div className="pick-mod-name">{m.name}</div>
                      <div className="pick-kps">
                        {kps.map((k) => {
                          const kp = KP[k];
                          const st = mastery[k] ?? 'unseen';
                          const meta = TRI[st];
                          return (
                            <button className="pick-kp" key={k} onClick={() => startQueue(kp.quizIds, `考点 · ${kp.title}`)}>
                              <span className="kp-dot" style={{ background: meta.color, boxShadow: `0 0 0 3px ${meta.color}26` }} />
                              <span className="pick-kp-title">{kp.title}</span>
                              <span className="pick-kp-n">{kp.quizIds.length} 题</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {pv === 'play' && curQ ? (() => {
            const item = curQ;
            const correct = setEqual(picked, item.answer);
            const pOpts = orderChoices(item.id, item.options);
            const progress = Math.round(((qi + (judged ? 1 : 0)) / queue.length) * 100);
            return (
              <div className="prac-play">
                <div className="prac-play-top">
                  <div className="prac-play-meta">
                    <span className="mono">第 {qi + 1} / {queue.length} 题</span>
                    <span className="prac-tag">{practiceLabel}</span>
                  </div>
                  <button className="prac-exit" onClick={() => setPv('home')}>退出刷题</button>
                </div>
                <div className="prac-progress"><span style={{ width: `${progress}%` }} /></div>
                <div className="prac-qcard">
                  <div className="prac-qtags">
                    <span className="tag-subj">{item.subject}</span>
                    <span className="tag-mod">{item.module} · {item.type === 'single' ? '单选' : '多选'}</span>
                  </div>
                  <div className="prac-stem">{item.stem}</div>
                  <div className="prac-opts">
                    {pOpts.map((o, i) => {
                      const chosen = picked.includes(o.id);
                      const isAns = item.answer.includes(o.id);
                      let cls = '';
                      if (judged) cls = isAns ? 'ok' : chosen ? 'bad' : 'dim';
                      else if (chosen) cls = 'picked';
                      return (
                        <button key={o.id} className={`prac-opt ${cls}`} disabled={judged} onClick={() => pPick(o.id, item.type)}>
                          <span className="prac-opt-k">{String.fromCharCode(65 + i)}</span>
                          <span className="prac-opt-t">{o.text}</span>
                          <span className="prac-opt-mark">{judged && isAns ? '✓' : judged && chosen && !isAns ? '✕' : ''}</span>
                        </button>
                      );
                    })}
                  </div>
                  {judged ? (
                    <div className={`prac-judge ${correct ? 'ok' : 'bad'}`}>
                      <div className="prac-judge-head"><b>{correct ? '答对了' : '答错了'}</b><span>正确答案 · {item.answer.map((a) => String.fromCharCode(65 + pOpts.findIndex((o) => o.id === a))).sort().join('')}</span></div>
                      <p>{renderRich(item.explanation, plainLen(item.explanation))}</p>
                      {item.answerKeywords.length ? (
                        <div className="kw-block">
                          <label>✍ 采分关键词</label>
                          <div className="keyword-row">{item.answerKeywords.map((k) => <span key={k}>{k}</span>)}</div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="prac-action">
                  {!judged
                    ? <button className="primary-button" disabled={!picked.length} onClick={pSubmit}>提交</button>
                    : <button className="primary-button" onClick={pNext}>{qi + 1 < queue.length ? '下一题 →' : '查看小结 →'}</button>}
                </div>
              </div>
            );
          })() : null}

          {pv === 'summary' && lastSummary ? (
            <div className="prac-summary">
              <div className="kicker">SESSION COMPLETE</div>
              <h1>本组完成</h1>
              <div className="sum-stats">
                <div className="sum-stat ok"><b>{lastSummary.right}</b><i>答对</i></div>
                <div className="sum-stat bad"><b>{lastSummary.wrong}</b><i>答错</i></div>
                <div className="sum-stat"><b>{Math.round((lastSummary.right / Math.max(1, lastSummary.total)) * 100)}%</b><i>正确率</i></div>
              </div>
              <div className="sum-kps">
                <label>本组涉及考点</label>
                <div className="keyword-row">{lastSummary.kps.map((k) => <span key={k}>{k}</span>)}</div>
                {lastSummary.wrong > 0 ? <p className="sum-wrong-note">✱ 答错的题已加入错题本（{lastSummary.wrong} 题）</p> : null}
              </div>
              <div className="sum-actions">
                <button className="glass-button" onClick={() => (practiceLabel === '随机刷' ? startRandom() : startQueue(queue, practiceLabel))}>再来一组</button>
                <button className="glass-button" onClick={() => setPv('wrong')}>看错题本</button>
                <button className="primary-button" onClick={() => setScreen('menu')}>完成 · 返回</button>
              </div>
            </div>
          ) : null}

          {pv === 'subj' && curSubj ? (() => {
            const it = curSubj;
            const progress = Math.round(((subjIdx + (subjRevealed ? 1 : 0)) / subjQueue.length) * 100);
            return (
              <div className="prac-play">
                <div className="prac-play-top">
                  <div className="prac-play-meta">
                    <span className="mono">第 {subjIdx + 1} / {subjQueue.length} 题</span>
                    <span className="prac-tag">{subjLabel}</span>
                  </div>
                  <button className="prac-exit" onClick={() => setPv('home')}>退出</button>
                </div>
                <div className="prac-progress"><span style={{ width: `${progress}%` }} /></div>
                <div className="prac-qcard">
                  <div className="prac-qtags">
                    <span className="tag-subj">{it.subject}</span>
                    <span className="tag-mod">{it.subjType}{it.module ? ` · ${it.module}` : ''}</span>
                  </div>
                  <div className="subj-stem">{it.stem}</div>
                  {!subjRevealed ? (
                    <div className="subj-hint">先在心里（或纸上）作答，想好了再展开采分点对照自评。</div>
                  ) : (
                    <div className="subj-points">
                      <label>对照参考采分点，勾选你答到的（{subjChecked.length}/{it.scorePoints.length}）</label>
                      {it.scorePoints.map((p, i) => (
                        <button key={i} className={`subj-point ${subjChecked.includes(i) ? 'hit' : ''}`} onClick={() => subjToggle(i)}>
                          <span className="subj-check">{subjChecked.includes(i) ? '✓' : ''}</span>
                          <span className="subj-point-t">{p}</span>
                        </button>
                      ))}
                      <details className="subj-ref">
                        <summary>看完整参考答案</summary>
                        <p>{it.refAnswer}</p>
                      </details>
                    </div>
                  )}
                </div>
                <div className="prac-action">
                  {!subjRevealed
                    ? <button className="primary-button" onClick={() => setSubjRevealed(true)}>我想好了，看采分点 →</button>
                    : <button className="primary-button" onClick={subjNext}>{subjIdx + 1 < subjQueue.length ? '下一题 →' : '查看小结 →'}</button>}
                </div>
              </div>
            );
          })() : null}

          {pv === 'subjSummary' ? (() => {
            const totalHit = subjResults.reduce((s, r) => s + r.hit, 0);
            const totalPts = subjResults.reduce((s, r) => s + r.total, 0);
            const rate = totalPts ? Math.round((totalHit / totalPts) * 100) : 0;
            return (
              <div className="prac-summary">
                <div className="kicker">SUBJECTIVE · SELF-CHECK</div>
                <h1>主观题 · 本组完成</h1>
                <div className="sum-stats">
                  <div className="sum-stat ok"><b>{subjResults.length}</b><i>已练</i></div>
                  <div className="sum-stat"><b>{rate}%</b><i>采分点命中率</i></div>
                  <div className="sum-stat"><b>{totalHit}/{totalPts}</b><i>命中/总点</i></div>
                </div>
                <div className="sum-kps">
                  <label>自评提示</label>
                  <p style={{ lineHeight: 1.7, color: '#dfe6e1' }}>主观题靠"采分点"给分——下次作答前先在脑子里列点，答到的点越多越稳。命中率低的题，回去把参考答案的要点背下来。</p>
                </div>
                <div className="sum-actions">
                  <button className="glass-button" onClick={() => startSubj(subjQueue, subjLabel)}>再来一组</button>
                  <button className="primary-button" onClick={() => setPv('home')}>完成 · 返回</button>
                </div>
              </div>
            );
          })() : null}

          {pv === 'wrong' ? (
            <div className="prac-wrong">
              <div className="prac-wrong-head">
                <div><h1>错题本</h1><small>答错即入 · 连续答对 2 次自动移出 · 共 {wrongbook.length} 题</small></div>
                <div className="prac-wrong-actions">
                  <button className="prac-back" onClick={() => setPv('home')}>← 刷题首页</button>
                  <button className={`glass-button ${wrongbook.length ? '' : 'is-dim'}`} onClick={startWrong}>全部重练</button>
                </div>
              </div>
              {wrongbook.length ? (
                <div className="wrong-list">
                  {wrongbook.map((w) => {
                    const it = bankById[w.id];
                    if (!it) return null;
                    return (
                      <div className="wrong-item" key={w.id}>
                        <div className="wrong-count"><b>×{w.count}</b><i>错</i></div>
                        <div className="wrong-body">
                          <div className="wrong-tags"><span className="tag-subj">{it.subject}</span><span className="tag-mod">{it.module}</span></div>
                          <div className="wrong-stem">{it.stem}</div>
                        </div>
                        <button className="wrong-redo" onClick={() => startQueue([w.id], '错题 · 单题重做')}>单独重做</button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="wrong-empty"><div className="wrong-empty-ic">✓</div><b>错题本是空的</b><span>去刷题，答错的题会自动收进来。</span></div>
              )}
            </div>
          ) : null}
        </section>

        {/* ===== 选择章节 · 开始学习（从主菜单按钮打开，避免覆盖 key art）===== */}
        {showChapterPicker ? (
          <div className="modal-layer modal-layer--dark" onClick={() => setShowChapterPicker(false)}>
            <div className="cs-panel" onClick={(e) => e.stopPropagation()}>
              {/* 头部 + Tab */}
              <div className="cs-head">
                <div className="cs-head-top">
                  <div>
                    <div className="kicker">SELECT CHAPTER</div>
                    <h2>选择章节 · 开始学习</h2>
                  </div>
                  <div className="cs-head-right">
                    <span className="cs-progress-n">主线已通关 <b>{chaptersDone.filter((i) => i < MAIN_COUNT).length}</b> / {MAIN_COUNT}</span>
                    <button className="btn-close" onClick={() => setShowChapterPicker(false)}>✕</button>
                  </div>
                </div>
                <div className="cs-tabs">
                  {([
                    { id: 'main' as const, label: '主线', count: `${MAIN_COUNT} 章`, show: true },
                    { id: 'group' as const, label: '番外 · 群像', count: '幕间', show: CHAPTERS.some((c) => c.chapterId.startsWith('side_group')) },
                    { id: 'peer' as const, label: '同事日常', count: `${NPC_CHAPTERS.length} 人`, show: NPC_CHAPTERS.length > 0 },
                    { id: 'lamp' as const, label: '番外', count: '', adult: true, show: !PUBLIC_BUILD && ZHONG_CHAPTERS.length > 0 },
                  ]).filter((t) => t.show).map((t) => (
                    <button key={t.id} className={`cs-tab ${chapterTab === t.id ? 'is-on' : ''} ${t.adult ? 'cs-tab--adult' : ''}`} onClick={() => setChapterTab(t.id)}>
                      <span>{t.label}</span>
                      {t.adult ? <span className="cs-tab-18">18+</span> : null}
                      {t.count ? <span className="cs-tab-count">{t.count}</span> : null}
                    </button>
                  ))}
                </div>
              </div>

              {/* 主体 */}
              <div className="cs-tabbody">
                {chapterTab === 'main' ? (
                  <div className="cs-main">
                    <div className="cs-main-intro">
                      <span>按章线性解锁 · 每章在剧情里学考点、做随堂题</span>
                      <i />
                      {chapterPages > 1 ? <span className="mono">第 {chapterPage + 1} / {chapterPages} 页</span> : null}
                    </div>
                    <div className="cs-cards">
                      {CHAPTERS.slice(0, MAIN_COUNT)
                        .map((c, ci) => ({ c, ci }))
                        .slice(chapterPage * CH_PER_PAGE, chapterPage * CH_PER_PAGE + CH_PER_PAGE)
                        .map(({ c, ci }) => {
                          const unlocked = ci === 0 || chaptersDone.includes(ci - 1);
                          const done = chaptersDone.includes(ci);
                          const isCurrent = unlocked && !done && ci === currentMainIdx;
                          const st = chapterKpStats(ci);
                          const starN = st.total > 0
                            ? (st.mastered === st.total ? 3 : st.mastered * 2 >= st.total ? 2 : st.mastered > 0 ? 1 : 0)
                            : (done ? 2 : 0);
                          return (
                            <button
                              key={c.chapterId}
                              className={`cs-card ${done ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''} ${!unlocked ? 'is-locked' : ''}`}
                              disabled={!unlocked}
                              onClick={() => { setShowChapterPicker(false); startChapter(true, ci); }}
                            >
                              {isCurrent ? <span className="cs-card-rail" /> : null}
                              <span className="cs-card-num">
                                <b>{CH_NO[ci] ?? ci + 1}</b>
                                <i className="cs-card-stars">{'★'.repeat(starN)}{'☆'.repeat(3 - starN)}</i>
                              </span>
                              <span className="cs-card-info">
                                <strong className="u-ellipsis">{c.title.replace(/^第.+?章\s*·\s*/, '')}</strong>
                                <span className="cs-card-sum">{c.summary}</span>
                                <span className="cs-card-foot">
                                  {st.total > 0 ? (
                                    <span className="cs-kp">
                                      <span className="cs-kp-dots">
                                        {st.kps.slice(0, 6).map((k, i) => (
                                          <span key={i} className={`dot dot--${mastery[k] === 'mastered' ? 'mastered' : mastery[k] === 'learning' ? 'learning' : 'unseen'}`} />
                                        ))}
                                      </span>
                                      <span className="cs-kp-n">考点 {st.total} · 掌握 {st.mastered}</span>
                                    </span>
                                  ) : <span />}
                                  <span className={`cs-card-tag ${done ? 'is-done' : isCurrent ? 'is-current' : 'is-locked'}`}>
                                    {done ? '✓ 已通关 · 可重玩' : isCurrent ? '▶ 从这里继续' : unlocked ? '可进入' : '🔒 通关上一章解锁'}
                                  </span>
                                </span>
                              </span>
                            </button>
                          );
                        })}
                    </div>
                    {chapterPages > 1 ? (
                      <div className="cs-pager">
                        <button className="cs-pager-btn" disabled={chapterPage === 0} onClick={() => setChapterPage((p) => Math.max(0, p - 1))}>‹ 上一页</button>
                        <span className="cs-pager-dots">
                          {Array.from({ length: chapterPages }, (_, p) => (
                            <button key={p} className={`cs-pager-dot ${p === chapterPage ? 'is-on' : ''}`} onClick={() => setChapterPage(p)} aria-label={`第 ${p + 1} 页`} />
                          ))}
                        </span>
                        <button className="cs-pager-btn" disabled={chapterPage >= chapterPages - 1} onClick={() => setChapterPage((p) => Math.min(chapterPages - 1, p + 1))}>下一页 ›</button>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {chapterTab === 'group' ? (
                  <div className="cs-list">
                    <div className="cs-list-intro">幕间小剧场 · 四条线交汇的轻松片段，不计入主线进度。</div>
                    {CHAPTERS.map((c, i) => ({ c, i }))
                      .filter(({ c }) => c.chapterId.startsWith('side_group'))
                      .map(({ c, i }) => (
                        <button key={c.chapterId} className={`cs-list-item ${chaptersDone.includes(i) ? 'is-done' : ''}`} onClick={() => { setShowChapterPicker(false); startChapter(true, i); }}>
                          <span className="cs-list-icon">🎭</span>
                          <span className="cs-list-info">
                            <strong>{c.title.replace(/^幕间\s*·\s*/, '').replace(/^群像\s*·\s*/, '')}</strong>
                            <em>{c.summary}</em>
                          </span>
                          <span className={`cs-list-go ${chaptersDone.includes(i) ? 'is-done' : ''}`}>{chaptersDone.includes(i) ? '✓ 已看 · 重玩' : '进入 ›'}</span>
                        </button>
                      ))}
                  </div>
                ) : null}

                {chapterTab === 'peer' ? (
                  <div className="cs-list">
                    <div className="cs-list-intro">三位同事的支线 · 不同教育观，补充主线之外的考点。</div>
                    {NPC_CHAPTERS.map(({ id, idx }) => (
                      <button key={id} className={`cs-list-item ${chaptersDone.includes(idx) ? 'is-done' : ''}`} onClick={() => { setShowChapterPicker(false); startChapter(true, idx); }}>
                        <span className="cs-list-icon cs-list-icon--name">{CHAPTERS[idx].title.replace(/^.*?·\s*/, '').slice(0, 1)}</span>
                        <span className="cs-list-info">
                          <strong>{CHAPTERS[idx].title.replace(/^.*?·\s*/, '')}</strong>
                          <em>{CHAPTERS[idx].summary}</em>
                        </span>
                        <span className={`cs-list-go ${chaptersDone.includes(idx) ? 'is-done' : ''}`}>{chaptersDone.includes(idx) ? '✓ 已看 · 重玩' : '进入 ›'}</span>
                      </button>
                    ))}
                  </div>
                ) : null}

                {chapterTab === 'lamp' ? (
                  <div className="cs-lamp">
                    <div className="cs-lamp-card">
                      <div className="cs-lamp-head">
                        <span className="cs-lamp-icon">🕯️</span>
                        <div>
                          <div className="cs-lamp-title">番外<span className="cs-lamp-18"></span></div>
                          <div className="cs-lamp-sub">独立番外 · 信息技术（IT）考点 · 与 301/302 主线分开计</div>
                        </div>
                      </div>
                      <div className="cs-lamp-body">
                        <p>番外章节。</p>
                        <div className="cs-lamp-actions">
                          {ZHONG_CHAPTERS.map(({ id, idx }) => (
                            <button key={id} className={`cs-lamp-enter ${chaptersDone.includes(idx) ? 'is-done' : ''}`} onClick={() => { setShowChapterPicker(false); startChapter(true, idx); }}>
                              {chaptersDone.includes(idx) ? '✓ ' : ''}{CHAPTERS[idx].title.replace(/^番外.*?·\s*/, '').replace(/^番外支线\s*·\s*/, '支线 · ')}{chaptersDone.includes(idx) ? ' · 重看' : ' ▶'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="cs-lamp-note">仅此一处入口 · 不在主菜单 / 不在主线网格中露出</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* ===== 选择攻略线 · 心之所向（P1 #5 简化路线选择器） ===== */}
        {showRoutePicker ? (
          <div className="modal-layer modal-layer--dark" onClick={() => setShowRoutePicker(false)}>
            <div className="gallery" onClick={(e) => e.stopPropagation()}>
              <header>
                <div><h2>选择攻略线 · 心之所向</h2><small>共通篇相处后，选一位深入同行（好感 ≥ {ROUTE_AFFECTION_GATE} 可进线）</small></div>
                <button className="icon-close" onClick={() => setShowRoutePicker(false)}><X size={18} /></button>
              </header>
              {(() => {
                // 「心之所向」：按累积好感把最高的一条标为推荐（达到心动门槛才算）
                const heart = [...ROUTES].filter((r) => stats[r.affKey] >= ROUTE_AFFECTION_GATE && r.ch1Index >= 0)
                  .sort((a, b) => stats[b.affKey] - stats[a.affKey])[0];
                return heart ? (
                  <div className="heart-banner">❤ 心之所向 · 这学期你与<b>{heart.label.replace('线', '')}</b>走得最近（好感 {stats[heart.affKey]}）——也可另选一位</div>
                ) : (
                  <div className="heart-banner heart-banner--none">还没有谁的好感到达心动门槛（≥{ROUTE_AFFECTION_GATE}）——回共通篇多陪陪在意的人</div>
                );
              })()}
              <div className="gal-grid">
                {(() => {
                  const heartKey = [...ROUTES].filter((r) => stats[r.affKey] >= ROUTE_AFFECTION_GATE && r.ch1Index >= 0)
                    .sort((a, b) => stats[b.affKey] - stats[a.affKey])[0]?.key;
                  return ROUTES.map((r) => {
                  const aff = stats[r.affKey];
                  const ok = aff >= ROUTE_AFFECTION_GATE && r.ch1Index >= 0;
                  const locked = !!flags[r.lockFlag];
                  const isHeart = r.key === heartKey;
                  // 隐藏线：言修在满足条件前以"???"神秘卡呈现（掌握≥70% + 经历生涯辅导事件 + 通关任意一线）
                  if (r.key === 'yan' && !yanUnlocked) {
                    return (
                      <div className="route-card is-locked is-hidden" key={r.key}>
                        <strong>??? · 隐藏线</strong>
                        <div className="route-aff">似乎还有个没读懂的人……</div>
                        <button className="glass-button" disabled>🔒 多了解全校、考点掌握更深、通关一条线后再来（{mainCleared}/{YAN_UNLOCK_KP}）</button>
                      </div>
                    );
                  }
                  return (
                    <div className={`route-card ${ok ? 'is-unlocked' : 'is-locked'} ${isHeart ? 'is-heart' : ''}`} key={r.key}>
                      <strong>{isHeart ? '❤ ' : ''}{r.label}{locked ? ' · 已锁定' : ''}</strong>
                      <div className="route-aff">好感 {aff} / {ROUTE_AFFECTION_GATE}</div>
                      <button
                        className={ok ? 'primary-button' : 'glass-button'}
                        onClick={() => pickRoute(r)}
                      >{ok ? '进入此线 ▶' : `好感不足（${aff}/${ROUTE_AFFECTION_GATE}）`}</button>
                      {ROUTE_EXAMS[r.key] ? (
                        <button
                          className="glass-button route-exam-btn"
                          onClick={() => (aff >= ROUTE_EXAM_GATE ? startRouteExam(r.key) : showToast(`终极考试需羁绊 ≥ ${ROUTE_EXAM_GATE}（多走这条线的剧情）`))}
                        >{flags[ROUTE_EXAMS[r.key].passFlag] ? '🎓 终极考试 · 已通过（可重考）' : `🎓 终极考试${aff >= ROUTE_EXAM_GATE ? ' · 近真题' : `（羁绊≥${ROUTE_EXAM_GATE}）`}`}</button>
                      ) : null}
                      {locked && ENDINGS.routes[r.key] ? (
                        <button className="glass-button" onClick={() => openEnding(r.key)}>✦ 查看本线结局（当前 {routeTier(r.key) === 'good' ? 'Good' : routeTier(r.key) === 'normal' ? 'Normal' : 'Bad'}）</button>
                      ) : null}
                    </div>
                  );
                  });
                })()}
              </div>
            </div>
          </div>
        ) : null}

        {/* ===== ★ 收藏馆（解锁画廊） ===== */}
        {overlay === 'gallery' ? (
          <div className="modal-layer modal-layer--dark">
            <div className="gallery">
              <header>
                <div><h2>收藏馆</h2><small>答对题、学会考点攒 ★，解锁福利立绘</small></div>
                <div className="gal-balance">{stars} <span>★</span></div>
                <button className="icon-close" onClick={() => setOverlay(null)}><X size={18} /></button>
              </header>
              <div className="gal-grid">
                {GALLERY.map((it) => {
                  const isUnlocked = unlocked.includes(it.id);
                  return (
                    <div className={`gal-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`} key={it.id}>
                      <div className="gal-thumb" onClick={() => (isUnlocked ? setLightbox(galUrl(it.full)) : unlockItem(it))}>
                        <img src={galUrl(it.thumb) || galUrl(it.full)} alt={it.title} />
                        {!isUnlocked ? <div className="gal-lock"><span>🔒</span><b>{it.cost} ★</b></div> : null}
                        <span className="gal-tier">{it.tier}</span>
                      </div>
                      <div className="gal-meta">
                        <strong>{it.title}</strong>
                        {isUnlocked
                          ? <button className="gal-view" onClick={() => setLightbox(galUrl(it.full))}>查看大图</button>
                          : <button className={`gal-unlock ${stars >= it.cost ? '' : 'is-dim'}`} onClick={() => unlockItem(it)}>{stars >= it.cost ? `解锁 ${it.cost}★` : `差 ${it.cost - stars}★`}</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {([
                { key: 'main', label: '事件 CG · 剧情名场面', cls: '', items: CGS.filter((it) => it.tier !== '番外CG') },
                { key: 'bonus', label: '番外 ·番外CG', cls: 'gal-section-label--bonus', note: '', items: PUBLIC_BUILD ? [] : CGS.filter((it) => it.tier === '番外CG') },
              ] as const).filter((sec) => sec.items.length).map((sec) => (
                <div key={sec.key}>
                  <div className={`gal-section-label ${sec.cls}`}>{sec.label}{'note' in sec && sec.note ? <small>{sec.note}</small> : null}</div>
                  <div className="gal-grid">
                    {sec.items.map((it) => {
                      const cost = it.cost ?? 30;
                      const isUnlocked = unlocked.includes(it.id);
                      return (
                        <div className={`gal-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`} key={it.id}>
                          <div className="gal-thumb" onClick={() => (isUnlocked ? setLightbox(cgUrl(it.full)) : unlockCG(it))}>
                            <img src={cgUrl(it.full)} alt={it.title} />
                            {!isUnlocked ? <div className="gal-lock"><span>🔒</span><b>{cost} ★</b></div> : null}
                            <span className="gal-tier">{it.tier ?? 'CG'}</span>
                          </div>
                          <div className="gal-meta">
                            <strong>{it.title}</strong>
                            {isUnlocked
                              ? <button className="gal-view" onClick={() => setLightbox(cgUrl(it.full))}>查看大图</button>
                              : <button className={`gal-unlock ${stars >= cost ? '' : 'is-dim'}`} onClick={() => unlockCG(it)}>{stars >= cost ? `解锁 ${cost}★` : `差 ${cost - stars}★`}</button>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {lightbox ? (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="立绘" />
            <button className="lightbox-close" onClick={() => setLightbox(null)}><X size={20} /></button>
          </div>
        ) : null}

        {toast ? <div className="toast">{toast}</div> : null}

        {/* 随堂检测（knowledgeCheck）：先教 → 马上做题（硬阻断）→ 再应用 */}
        {activeCheck && !overlay && !mock ? (
          <div className="modal-layer modal-layer--quiz">
            <QuizCard
              item={activeCheck}
              badge="随堂检测 · 马上做题"
              sibling={activeCheck.kpId
                ? (quizBank.items.find((q) => q.kpId === activeCheck.kpId && q.id !== activeCheck.id)
                  ?? bank.items.find((q) => q.kpId === activeCheck.kpId && q.id !== activeCheck.id)
                  ?? ZHENTI.find((q) => q.kpId === activeCheck.kpId && q.id !== activeCheck.id))
                : undefined}
              onDone={(c) => clearCheck(activeCheck, c)}
            />
          </div>
        ) : null}

        {/* 月考冷测（含主观题：选择题走 QuizCard，主观题走采分点自评卡） */}
        {mock && mock.idx < mock.items.length ? (() => {
          const mi = mock.items[mock.idx];
          return (
          <div className="modal-layer modal-layer--dark">
            <div className="mock-wrap">
              <div className="mock-progress">{mock.exam ? `🎓 ${mock.exam.label}` : mock.full ? `📝 整卷模考 · ${mock.full.label}` : '月考'} · 第 {mock.idx + 1} / {mock.items.length} 题{mock.exam ? `（过线 ${Math.round(mock.exam.passLine * 100)}%）` : ''}</div>
              {isSubj(mi) ? (
                <div className="quiz-card mock-subj">
                  <header>
                    <span className="quiz-badge">主观题 · {mi.subjType}</span>
                    <em>采分点自评 · 按真实作答勾选</em>
                  </header>
                  <div className="quiz-body">
                    <div className="subj-stem">{mi.stem}</div>
                    {!subjRevealed ? (
                      <div className="subj-hint">先在心里（或纸上）作答，想好了再展开采分点对照——<b>勾到几点就算几分，一点不勾＝0 分</b>，按你真实答到的勾。</div>
                    ) : (
                      <div className="subj-points">
                        <label>对照参考采分点，勾选你真正答到的（{subjChecked.length}/{mi.scorePoints.length}）</label>
                        {mi.scorePoints.map((p, i) => (
                          <button key={i} className={`subj-point ${subjChecked.includes(i) ? 'hit' : ''}`} onClick={() => subjToggle(i)}>
                            <span className="subj-check">{subjChecked.includes(i) ? '✓' : ''}</span>
                            <span className="subj-point-t u-minw0">{p}</span>
                          </button>
                        ))}
                        <details className="subj-ref"><summary>看完整参考答案</summary><p>{mi.refAnswer}</p></details>
                      </div>
                    )}
                  </div>
                  <div className="quiz-foot">
                    {!subjRevealed
                      ? <button className="primary-button" onClick={() => setSubjRevealed(true)}>我想好了，看采分点 →</button>
                      : <button className="primary-button" onClick={() => { const hit = subjChecked.length / Math.max(mi.scorePoints.length, 1); setSubjRevealed(false); setSubjChecked([]); mockDone(hit >= 0.5); }}>完成本题 →</button>}
                  </div>
                </div>
              ) : (
                <QuizCard key={mi.id} item={mi} badge={mock.exam ? '终极考试 · 近真题' : '月考 · 冷测'} onDone={mockDone} />
              )}
            </div>
          </div>
          );
        })() : null}

        {overlay === 'feedback' && pending ? (
          <div className="modal-layer">
            <div className={`feedback-card feedback-card--${qualityMeta[pending.entry.quality].className}`}>
              <header>
                <span>{qualityMeta[pending.entry.quality].icon}</span>
                <div><small>即时判定 · 你的处理方式</small><strong>{qualityMeta[pending.entry.quality].label}</strong></div>
              </header>
              <section>
                <label>你的选择</label>
                <blockquote>{pending.entry.choiceText}</blockquote>
                <label>判定解析</label>
                <p>{renderRich(pending.entry.feedback, plainLen(pending.entry.feedback))}</p>
                <div className="delta-row">
                  {Object.entries(pending.effects).filter(([key, value]) => value && key !== 'classOrder').map(([key, value]) => {
                    const statKey = key as keyof Stats;
                    return (
                      <span className={beneficial(statKey, value) ? 'is-good' : 'is-bad'} key={key}>
                        {statLabels[statKey]} {signed(value)}
                      </span>
                    );
                  })}
                </div>
                {pending.entry.examTags ? (
                  <div className="exam-card">
                    <b>{pending.entry.examTags.subject}</b><span>{pending.entry.examTags.module}</span>
                    <p>{pending.entry.examTags.examPoint}</p>
                  </div>
                ) : null}
                {/* A2：剧情选择没有采分点，去掉"采分关键词"(那是主观题专用)。改为可选的"处理要点"，且不带"得分"措辞 */}
                {pending.entry.answerKeywords.length ? (
                  <div className="kw-block">
                    <label>💡 这次处理的要点</label>
                    <div className="keyword-row">
                      {pending.entry.answerKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
                    </div>
                  </div>
                ) : null}
              </section>
              <button className="primary-button" onClick={continueAfterFeedback}>记录到手账并继续 →</button>
            </div>
          </div>
        ) : null}

        {overlay === 'notebook' ? (
          <div className="modal-layer">
            <div className="notebook">
              <aside>
                <h2>教师手账</h2><small>FIELD NOTEBOOK</small>
                <button className={notebookTab === 'ability' ? 'is-on' : ''} onClick={() => setNotebookTab('ability')}>能力状态</button>
                <button className={notebookTab === 'bond' ? 'is-on' : ''} onClick={() => setNotebookTab('bond')}>同事羁绊</button>
                <button className={notebookTab === 'map' ? 'is-on' : ''} onClick={() => setNotebookTab('map')}>考点地图</button>
                <button className="nb-practice" onClick={() => { setScreen('practice'); setPv('home'); setOverlay(null); }}>进入刷题模式 ✎</button>
                <button className="primary-button" onClick={() => setOverlay(null)}>返回剧情</button>
              </aside>
              <section>
                {notebookTab === 'ability' ? (
                  <>
                    <h3>能力状态</h3>
                    <p className="muted nb-hint">答题答对、选对专业做法 → 专业判断↑；用心待学生 → 学生信任↑；踩师德/法规红线 → 执教风险↑（越低越好）。</p>
                    <StatMeter label="专业判断" value={stats.professionalSkill} hint="答对题 / 选专业做法" />
                    <StatMeter label="学生信任" value={stats.studentTrust} hint="用心待学生" />
                    <StatMeter label="考点掌握" value={stats.examScore} hint="随堂+月考累计" />
                    <StatMeter label="执教风险" value={riskValue} risk hint="踩红线才升高，越低越安全" />
                  </>
                ) : null}
                {notebookTab === 'bond' ? (
                  <>
                    <h3>同事羁绊</h3>
                    {(['lu', 'jiang', 'gu', 'shen'] as ProfileId[]).map((id) => {
                      const c = characters[id];
                      const key = `affection_${id}` as keyof Stats;
                      return (
                        <button className="bond-card" key={id} onClick={() => { setProfileId(id); setOverlay('profile'); }}>
                          {charAvatar[id]
                            ? <span className="bond-avatar"><img src={charAvatar[id]} alt={c.name} /></span>
                            : <span style={{ background: c.color }}>{c.initial}</span>}
                          <strong>{c.name}</strong><em>{c.role}</em><b>♥ {stats[key]}</b>
                        </button>
                      );
                    })}
                  </>
                ) : null}
                {notebookTab === 'map' ? (
                  <div className="kmap">
                    <div className="kmap-head">
                      <div>
                        <h3>考点地图</h3>
                        <small>看全局：没学过 · 学过没掌握 · 已掌握 · 点开可去学/去练</small>
                      </div>
                      <div className="kmap-counts">已掌握 <b className="ok">{cMastered}</b> · 学过 <b className="warn">{cLearned}</b> · 共 <b>{cTotal}</b></div>
                    </div>
                    <div className="kmap-tri">
                      <span className="seg-m" style={{ width: `${(cMastered / cTotal) * 100}%` }} />
                      <span className="seg-l" style={{ width: `${(cLearningOnly / cTotal) * 100}%` }} />
                    </div>
                    <div className="kmap-legend">
                      <span><i style={{ background: TRI.mastered.color }} />已掌握</span>
                      <span><i style={{ background: TRI.learning.color }} />学过·未掌握</span>
                      <span><i style={{ background: TRI.unseen.color }} />未学过</span>
                    </div>
                    <div className="kmap-chapters">
                      {KMAP.chapters.map((ch) => {
                        const open = !!mapExpanded[ch.id];
                        const allk = ch.modules.flatMap((m) => m.kps);
                        const mN = allk.filter((k) => mastery[k] === 'mastered').length;
                        return (
                          <div className="kmap-ch" key={ch.id}>
                            <button className="kmap-ch-head" disabled={ch.locked} onClick={() => setMapExpanded((e) => ({ ...e, [ch.id]: !e[ch.id] }))}>
                              <span className="kmap-caret">{ch.locked ? '🔒' : open ? '▾' : '▸'}</span>
                              <span className="kmap-ch-no">{ch.no}</span>
                              <span className="kmap-ch-title"><b>第{ch.no}章 · {ch.title}</b><i>{ch.sub}</i></span>
                              {ch.locked ? <span className="kmap-lock">未解锁</span> : <span className="kmap-ch-prog">掌握 {mN}/{allk.length}</span>}
                            </button>
                            {open && !ch.locked ? (
                              <div className="kmap-ch-body">
                                {ch.modules.map((m) => (
                                  <div className="kmap-module" key={m.name}>
                                    <div className="kmap-module-name">{m.name}</div>
                                    <div className="kmap-kps">
                                      {m.kps.map((kid) => {
                                        const kp = KP[kid];
                                        const st = mastery[kid] ?? 'unseen';
                                        const meta = TRI[st];
                                        return (
                                          <button className={`kp-chip ${st} ${flaggedKp.includes(kid) ? 'is-flagged' : ''}`} key={kid} onClick={() => setMapKpOpen(kid)}>
                                            <span className="kp-dot" style={{ background: meta.color, boxShadow: `0 0 0 3px ${meta.color}26` }} />
                                            <span className="kp-chip-text"><b>{kp.title}</b><i>{kp.oneLine}</i></span>
                                            {flaggedKp.includes(kid) ? <span className="kp-flag-mark" title="你标记了没懂">🚩</span> : null}
                                            <span className="kp-mark" style={{ color: meta.color }}>{st === 'mastered' ? '✓' : st === 'learning' ? '●' : '○'}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
            {mapKpOpen && KP[mapKpOpen] ? (() => {
              const kp = KP[mapKpOpen];
              const st = mastery[mapKpOpen] ?? 'unseen';
              const meta = TRI[st];
              const hasQ = kp.quizIds.length > 0;
              const hasStory = !!kp.teachNodeId;
              return (
                <div className="kp-popup-layer" onClick={() => setMapKpOpen(null)}>
                  <div className="kp-popup" onClick={(e) => e.stopPropagation()}>
                    <header>
                      <div className="kp-popup-tags">
                        <span className="tag-subj">{kp.subject}</span>
                        <span className="tag-mod">{kp.module}</span>
                        <span className="tag-state" style={{ background: `${meta.color}33`, color: meta.color }}>{meta.label}</span>
                      </div>
                      <h2>{kp.title}</h2>
                    </header>
                    <section>
                      {kp.oneLine ? <p className="kp-oneline">{kp.oneLine}</p> : null}
                      <label>{hasStory ? '知识点速记' : '微课要点 · 这就是这个考点的讲授'}</label>
                      <div className="kp-points">
                        {kp.points.map((p) => <div className="kp-point" key={p}><span>◆</span>{p}</div>)}
                      </div>
                      <div className="kp-actions">
                        <button className="kp-learn" onClick={() => kpLearn(mapKpOpen)}>{hasStory ? '去剧情里学 ▶' : '学要点 ✦'}</button>
                        <button className={`kp-practice ${hasQ ? '' : 'is-disabled'}`} onClick={() => kpPractice(mapKpOpen)}>{hasQ ? '去练 ✎' : '暂无题'}</button>
                        <button className={`kp-flag ${flaggedKp.includes(mapKpOpen) ? 'is-on' : ''}`} onClick={() => toggleFlagKp(mapKpOpen)} title="自己觉得没懂就标一下，今日备考会优先复习">{flaggedKp.includes(mapKpOpen) ? '🚩 已标记没懂' : '🏳️ 标记没懂'}</button>
                      </div>
                    </section>
                  </div>
                </div>
              );
            })() : null}
          </div>
        ) : null}

        {overlay === 'profile' ? (
          <div className="modal-layer">
            <div className="profile-card">
              <div className="profile-art" style={{ '--char': characters[profileId].color, '--char-deep': characters[profileId].deep } as CSSProperties}>
                <img className="profile-photo" src={charArt[profileId].smile ?? charArt[profileId].neutral} alt={characters[profileId].name} />
              </div>
              <section>
                <button className="icon-close" onClick={() => setOverlay('notebook')}><X size={18} /></button>
                <small>{characters[profileId].role}</small>
                <h2>{characters[profileId].name}</h2>
                <blockquote>「{characters[profileId].signature}」</blockquote>
                <div className="profile-gallery">
                  <label>福利立绘 · 收藏馆（{stars} ★）</label>
                  <div className="pg-row">
                    {GALLERY.filter((g) => g.char === profileId).map((g) => {
                      const u = unlocked.includes(g.id);
                      return (
                        <button key={g.id} className={`pg-item ${u ? '' : 'is-locked'}`} onClick={() => unlockItem(g)}>
                          <img src={galUrl(g.thumb) || galUrl(g.full)} alt={g.title} />
                          {u ? null : <span className="pg-lock">🔒 {g.cost}★</span>}
                          <em>{(g.title.split('·')[1] ?? g.title).trim()}</em>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="profile-switch">
                  {(['lu', 'jiang', 'gu', 'shen'] as ProfileId[]).map((id) => (
                    <button key={id} className={profileId === id ? 'is-on' : ''} onClick={() => setProfileId(id)}>{characters[id].name}</button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {overlay === 'review' ? (
          <div className="modal-layer modal-layer--dark">
            <div className="review">
              <small>CHAPTER {String(currentChapter + 1).padStart(2, '0')} · {chapterDone ? 'COMPLETE' : `进度 ${clearedChecks.length}/3`}</small>
              <h2>{chapter.title} · 复盘</h2>
              {chapterDone ? (
                <div className="eval-banner">
                  <b>见习首日评价 · {evalResult.tier}</b>
                  <span>{evalResult.note}</span>
                </div>
              ) : null}
              {(() => {
                // 复盘知识卡：按本章考点(knowledge_map)生成，每章都有可点开的速记卡（答错的模块置顶高亮）
                const kmCh = KMAP.chapters.find((c) => c.id === chapter.chapterId);
                const cards = (kmCh?.modules ?? []).flatMap((m) => m.kps)
                  .map((kid) => ({ kid, k: KP[kid] }))
                  .filter((x): x is { kid: string; k: KPInfo } => !!x.k && !!x.k.points?.length)
                  .map(({ kid, k }) => ({ kpId: kid, module: k.module, title: k.title, points: k.points }));
                if (!cards.length) return reviewData?.recommendedReview?.length ? (
                  <div className="review-points">
                    <h3>📌 复习建议</h3>
                    {reviewData.recommendedReview.map((r) => <p key={r} className="rp-tip">· {r}</p>)}
                  </div>
                ) : null;
                cards.sort((a, b) => Number(wrongKps.has(b.kpId)) - Number(wrongKps.has(a.kpId)));
                return (
                  <div className="review-points">
                    <h3>📌 知识点速记 · 点开复习{wrongKps.size ? '（⚠ 标记的是你答错的，先看）' : ''}</h3>
                    {cards.map((rp) => {
                      const open = openPoint === rp.kpId;
                      const weak = wrongKps.has(rp.kpId);
                      return (
                        <div className={`rp-card ${open ? 'is-open' : ''} ${weak ? 'is-weak' : ''}`} key={rp.kpId}>
                          <button className="rp-head" onClick={() => setOpenPoint(open ? null : rp.kpId)}>
                            <span className="rp-title">{weak ? '⚠ ' : ''}{rp.module} · {rp.title}</span>
                            <span className="rp-meta">点开速记 <i>{open ? '▲' : '▼'}</i></span>
                          </button>
                          {open ? (
                            <div className="rp-body">
                              {rp.points.map((p) => <p key={p}>· {p}</p>)}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              <div className="review-actions">
                <button className="glass-button" onClick={() => setOverlay(null)}>返回剧情</button>
                {chapterDone
                  ? <button className="primary-button" onClick={startMock}>开始月考 · 冷测 →</button>
                  : <button className="glass-button" disabled>完成本章后解锁月考</button>}
              </div>
            </div>
          </div>
        ) : null}

        {overlay === 'mockResult' && mock?.full ? (() => {
          const cfg = FULL_MOCK[mock.full.subject];
          const mcqResults = mock.results.filter((r) => r.stage !== '主观题');
          const mcqRight = mcqResults.filter((r) => r.correct).length;
          const mcqScore = mcqRight * cfg.mcqPts;
          const mcqFull = cfg.mcq * cfg.mcqPts;
          // 主观题按 correct(采分点≥50%) 估分：达标给 70%、未达给 35%
          const subjResults = mock.results.filter((r) => r.stage === '主观题');
          let subjScore = 0, subjFull = 0; let si = 0;
          const secLines: { name: string; got: number; full: number }[] = [];
          for (const sec of cfg.sections) {
            let got = 0; const full = sec.n * sec.pts;
            for (let k = 0; k < sec.n; k++) { const r = subjResults[si++]; if (r) got += Math.round((r.correct ? 0.7 : 0.35) * sec.pts); }
            subjScore += got; subjFull += full; secLines.push({ name: sec.type, got, full });
          }
          const total = mcqScore + subjScore; const fullPts = mcqFull + subjFull;
          const rate = total / fullPts; const pass = rate >= 0.6;
          return (
            <div className="modal-layer modal-layer--dark">
              <div className="review">
                <small>FULL MOCK EXAM · {mock.full.label}</small>
                <h2>{pass ? '✅ 模考通过（估）' : '模考 · 未达合格线'}</h2>
                <p className="mock-score">估计得分 <b>{total}</b> / {fullPts}　·　{Math.round(rate * 100)}%（合格线 60%）</p>
                <div className="review-grid two">
                  <section>
                    <h3>分区得分</h3>
                    <p>· 单项选择：{mcqScore} / {mcqFull}（答对 {mcqRight}/{cfg.mcq}）</p>
                    {secLines.map((s) => <p key={s.name}>· {s.name}：{s.got} / {s.full}</p>)}
                  </section>
                  <section>
                    <h3>提示</h3>
                    <p>客观题自动判分；主观题按你勾选的采分点估分（达标≈70%）。真实考试合格线约 70/120（折算）。</p>
                    <p>{pass ? '这套卷你已具备上场水平，保持手感。' : '主观题多列采分点、客观题回错题本巩固，再来一卷。'}</p>
                  </section>
                </div>
                <div className="review-actions">
                  <button className="glass-button" onClick={() => startFullMock(mock!.full!.subject)}>再来一卷</button>
                  <button className="primary-button" onClick={() => { setMock(null); setOverlay(null); }}>返回</button>
                </div>
              </div>
            </div>
          );
        })() : overlay === 'mockResult' && mock?.exam ? (() => {
          const right = mock.results.filter((r) => r.correct).length;
          const rate = right / mock.results.length;
          const passed = rate >= mock.exam.passLine;
          const mcq = mock.results.filter((r) => r.stage !== '主观题');
          const subj = mock.results.filter((r) => r.stage === '主观题');
          return (
            <div className="modal-layer modal-layer--dark">
              <div className="review">
                <small>ROUTE FINAL EXAM · RESULT</small>
                <h2>{passed ? '🎓 终极考试 · 通过！' : '终极考试 · 未过线'}</h2>
                <p className="mock-score">
                  客观题 答对 <b>{mcq.filter((r) => r.correct).length}</b> / {mcq.length}　·　总正确率 <b>{Math.round(rate * 100)}%</b>（过线 {Math.round(mock.exam.passLine * 100)}%）
                </p>
                {subj.length ? <p className="mock-subj-note">含主观题 {subj.length} 道 · 采分点自评{subj.every((r) => r.correct) ? '达标' : '可再练'}（计入总正确率）</p> : null}
                <div className="eval-banner">
                  <b>{mock.exam.label}</b>
                  <span>{passed
                    ? '近真题难度过关——这条线的「告白 / Good End」已解锁，回到剧情走到结局即可圆满。'
                    : '差一点。这是近真题难度，回去把该模块考点再练扎实，重考即可（不影响已走的剧情）。'}</span>
                </div>
                <div className="review-actions">
                  <button className="glass-button" onClick={() => startRouteExam(mock.exam!.routeKey)}>重考</button>
                  {passed && ENDINGS.routes[mock.exam.routeKey]
                    ? <button className="primary-button" onClick={() => openEnding(mock.exam!.routeKey)}>查看本线结局 ✦</button>
                    : <button className="primary-button" onClick={() => { setMock(null); setOverlay(null); }}>返回</button>}
                </div>
              </div>
            </div>
          );
        })() : overlay === 'mockResult' && mock ? (
          <div className="modal-layer modal-layer--dark">
            <div className="review">
              <small>MONTHLY TEST · RESULT</small>
              <h2>月考结果</h2>
              <p className="mock-score">
                客观题 答对 <b>{mock.results.filter((r) => r.stage !== '主观题' && r.correct).length}</b> / {mock.results.filter((r) => r.stage !== '主观题').length}　·　考点掌握 +{mock.results.filter((r) => r.stage !== '主观题' && r.correct).length * 2}
              </p>
              {mock.results.some((r) => r.stage === '主观题') ? (
                <p className="mock-subj-note">主观题 {mock.results.filter((r) => r.stage === '主观题').length} 道 · 采分点自评{mock.results.filter((r) => r.stage === '主观题').every((r) => r.correct) ? '达标 ✓' : '可再练'}（按你勾的采分点，不计入客观对错）</p>
              ) : null}
              <div className="review-grid two">
                <section>
                  <h3>{mockWeakModules.length ? '薄弱模块（找导师重学）' : '全部答对 🎉'}</h3>
                  {mockWeakModules.length
                    ? mockWeakModules.map((m) => <p key={m}>· {m}</p>)
                    : <p>这三个考点你都记住了，进入下一章再巩固。</p>}
                </section>
                <ReviewColumn title="本章学到的考点" items={reviewData?.learnedExamPoints ?? []} />
              </div>
              <div className="eval-banner">
                <b>见习首日评价 · {evalResult.tier}</b>
                <span>{evalResult.note}</span>
              </div>
              <div className="review-actions">
                <button className="glass-button" onClick={startMock}>再考一次</button>
                {currentChapter + 1 < CHAPTERS.length && chFamily(currentChapter + 1) === chFamily(currentChapter)
                  ? <button className="primary-button" onClick={() => { setMock(null); setOverlay(null); startChapter(true, currentChapter + 1); }}>{currentChapter < MAIN_COUNT ? `进入第${CH_NO[currentChapter + 1]}章 →` : '进入下一篇 →'}</button>
                  : <button className="primary-button" onClick={() => { setMock(null); setOverlay(null); setScreen('menu'); }}>完结 · 返回菜单</button>}
              </div>
            </div>
          </div>
        ) : null}

        {/* ===== 路线结局（Good / Normal / Bad） ===== */}
        {overlay === 'ending' && endingRoute && ENDINGS.routes[endingRoute] ? (() => {
          const tier = routeTier(endingRoute);
          const e = ENDINGS.routes[endingRoute][tier];
          const tierLabel = tier === 'good' ? 'GOOD END ★' : tier === 'normal' ? 'NORMAL END' : 'BAD END';
          return (
            <div className="modal-layer modal-layer--dark">
              <div className="review ending-card">
                <small>{ENDINGS.routes[endingRoute].label} · {tierLabel}</small>
                <h2>{e.title}</h2>
                <p className="ending-text">{e.text}</p>
                <div className="eval-banner">
                  <b>{tier === 'good' ? '圆满 ✦' : tier === 'normal' ? '尚可 · 还能更近一步' : '遗憾 · 可重练重走'}</b>
                  <span>{tier === 'good' ? '羁绊≥24 且终极考试达标——恋爱与备考双线圆满。' : tier === 'normal' ? '关系到位但未到羁绊档（≥24）或考点尚需打磨，提升好感与终极考试可解锁 Good End。' : '好感不足（<16）。多走这条线的剧情、把锚定模块练扎实再来。'}</span>
                </div>
                <div className="review-actions">
                  <button className="primary-button" onClick={() => { setEndingRoute(null); setOverlay(null); setScreen('menu'); }}>完结 · 返回主菜单</button>
                </div>
              </div>
            </div>
          );
        })() : null}

        {/* ===== 教师成长 True / 独走 True（凌驾单线·学习目标达成解锁） ===== */}
        {overlay === 'teacherEnd' ? (() => {
          const e = anyGoodEnd ? ENDINGS.teacherTrue : ENDINGS.teacherSolo;
          return (
            <div className="modal-layer modal-layer--dark">
              <div className="review ending-card">
                <small>{anyGoodEnd ? 'GRAND TRUE END ★' : 'TEACHER SOLO · TRUE'}</small>
                <h2>{e.title}</h2>
                <p className="ending-text">{e.text}</p>
                <div className="eval-banner">
                  <b>真结局达成 ✦ 主考纲掌握 {mainCleared}/{MAIN_KP_IDS.length}</b>
                  <span>{anyGoodEnd ? '掌握≥90%考点、总冷测达标，且有一段恋爱圆满——你真正站上了讲台。' : '未走恋爱线，纯靠学习走到讲台前的「教师独走」True，呼应第一章铃声。'}</span>
                </div>
                <div className="review-actions">
                  <button className="primary-button" onClick={() => { setOverlay(null); setScreen('menu'); }}>完结 · 返回主菜单</button>
                </div>
              </div>
            </div>
          );
        })() : null}

        {overlay === 'preferences' ? (
          <div className="modal-layer">
            <div className="prefs-simple">
              <header>
                <h2>设置 · 存档</h2>
                <button className="icon-close" onClick={() => setOverlay(null)}><X size={18} /></button>
              </header>
              <section>
                <p className="muted">网页版存档保存在本机浏览器；换设备 / 清缓存前请先导出。</p>
                <p className="muted small" style={{ marginTop: 0 }}>📌 考点地图 / 错题本 / ★星 为<b>全局进度</b>，跨存档槽共享、不随读档切换（备考数据只攒不丢）。</p>
                {screen === 'story' ? (
                  <div className="setting-row"><button className="glass-button" onClick={() => { setOverlay(null); setScreen('menu'); }}>← 返回主菜单（进度自动保存）</button></div>
                ) : null}
                <div className="setting-row"><button className="glass-button" onClick={() => { setSaveMode('save'); setOverlay('saveload'); }}>存档 / 读取（多槽位）</button></div>
                <div className="setting-row"><button className="glass-button" onClick={exportSave}>导出存档（下载 .json）</button></div>
                <div className="setting-row">
                  <label className="glass-button" style={{ display: 'inline-block', cursor: 'pointer' }}>
                    导入存档
                    <input type="file" accept="application/json" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) importSave(f); }} />
                  </label>
                </div>
                <div className="setting-row"><button className="glass-button" onClick={reset}><RotateCcw size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />重新开始（清空进度）</button></div>
                <div className="setting-block">
                  <label>文字速度</label>
                  <div className="seg-btns">
                    {SPEED_OPTS.map((o) => (
                      <button key={o.label} className={textSpeed === o.ms ? 'is-on' : ''} onClick={() => setTextSpeed(o.ms)}>{o.label}</button>
                    ))}
                  </div>
                </div>
                <p className="muted small">音量 / 全屏等设置将在音频接入后开放。</p>
                <button className="primary-button block" onClick={() => setOverlay(null)}>完成 ✓</button>
              </section>
            </div>
          </div>
        ) : null}

        {overlay === 'saveload' ? (
          <div className="modal-layer">
            <div className="saveload" data-ver={slotsVer}>
              <header>
                <h2>{saveMode === 'save' ? '存档' : '读取存档'}</h2>
                <div className="sl-toggle">
                  <button className={saveMode === 'save' ? 'is-on' : ''} onClick={() => setSaveMode('save')}>存档</button>
                  <button className={saveMode === 'load' ? 'is-on' : ''} onClick={() => setSaveMode('load')}>读取</button>
                </div>
                <button className="icon-close" onClick={() => setOverlay(null)}><X size={18} /></button>
              </header>
              <div className="sl-grid">
                {Array.from({ length: SLOT_COUNT }, (_, k) => k + 1).map((i) => {
                  const d = readSlot(i);
                  return (
                    <button
                      key={i}
                      className={`sl-slot ${d ? '' : 'is-empty'}`}
                      onClick={() => (saveMode === 'save' ? saveToSlot(i) : d ? loadFromSlot(i) : undefined)}
                    >
                      <span className="sl-no">{i}</span>
                      <div>
                        {d ? (<><strong>{d.nodeTitle}…</strong><em>{d.savedAt}</em></>) : <strong>＋ 空档位</strong>}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="muted sl-foot">
                {saveMode === 'save' ? '点击槽位存入当前进度（会覆盖）。' : '点击已有存档的槽位读取进度。'}
              </p>
            </div>
          </div>
        ) : null}

        {overlay === 'log' ? (
          <div className="modal-layer">
            <div className="logbook">
              <header><h2>回看 · BACKLOG</h2><button className="icon-close" onClick={() => setOverlay(null)}><X size={18} /></button></header>
              <div className="log-list">
                {backlog.length ? backlog.map((e, idx) => (
                  <div key={idx} className={`log-line ${e.kind === 'choice' ? 'is-choice' : ''}`}>
                    <b>{e.kind === 'choice' ? '▶ 我的选择' : e.speaker}</b>
                    <span>{e.text}</span>
                  </div>
                )) : <p className="muted">还没有对话记录。</p>}
              </div>
            </div>
          </div>
        ) : null}

        <div className={`boot-screen ${booting ? '' : 'boot-screen--hidden'}`}>
          <div className="boot-card">
            <div className="boot-kicker">TEACHER CERT · PROTOTYPE</div>
            <h1>备课铃响之前</h1>
            <p>正在整理教案、考点与角色档案</p>
            <div className="boot-progress"><span /></div>
          </div>
        </div>
      </main>
      {/* 章节进入动画：必须放在 .stage(有 transform)之外，否则 position:fixed 会相对被缩放的舞台、只占一小块 */}
      {introCh !== null ? (
        <ChapterIntro
          chapterNo={String(introCh + 1).padStart(2, '0')}
          chapterCn={`第${CH_NO[introCh] ?? introCh + 1}章`}
          chapterTitle={(CHAPTERS[introCh]?.title ?? '').replace(/^第.+?章\s*·\s*/, '')}
          onDone={() => setIntroCh(null)}
        />
      ) : null}
      {/* 「我的教室」养成 Hub：同样放在 .stage 之外，自带 16:9 缩放铺满视口 */}
      {showClassroom ? (
        <MyClassroom
          completion={classbathhouseata.completion}
          modules={classbathhouseata.modules}
          furniture={classbathhouseata.furniture}
          honors={classbathhouseata.honors}
          mementos={classbathhouseata.mementos}
          achievements={classbathhouseata.achievements}
          onPlaceFurniture={(id, slot) => setClassroomPlace((m) => ({ ...m, [id]: slot }))}
          onClose={() => setShowClassroom(false)}
        />
      ) : null}
    </div>
  );
}

function ReviewColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3>{title}</h3>
      {items.length ? items.map((item) => <p key={item}>· {item}</p>) : <p className="muted">—</p>}
    </section>
  );
}
