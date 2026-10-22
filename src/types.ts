export type Language = string;

export interface NumerologyProfile {
  day: number;
  month: number;
  year: number;
  driverNumber: number; // Mulank (1-9)
  conductorNumber: number; // Bhagyank (1-9)
  kuaNumber: number;
  loShuCounts: Record<number, number>; // counts of 1-9 in the grid
  presentNumbers: number[];
  missingNumbers: number[];
  strengths: string[];
  challenges: string[];
  remedies: string[];
  luckyDays: string[];
  luckyColors: string[];
  luckyGems: string[];
  friendlyNumbers: number[];
  enemyNumbers: number[];
  neutralNumbers: number[];
}

export interface WatchAnalysisInput {
  dialShape: 'round' | 'square' | 'rectangle' | 'octagonal' | 'oval' | 'triangular';
  dialColor: 'white' | 'silver' | 'gold' | 'black' | 'blue' | 'green' | 'brown' | 'red';
  strapType: 'gold_metal' | 'silver_metal' | 'black_metal' | 'brown_leather' | 'black_leather' | 'silicone_rubber';
  secondHand: 'smooth_gold' | 'silver' | 'red' | 'ticking' | 'none';
  wornWrist: 'right' | 'left';
  condition: 'perfect' | 'scratched' | 'stopped_sometimes' | 'loose_fit';
  currentGoal: 'career_growth' | 'wealth_flow' | 'mental_peace' | 'relationship_harmony' | 'confidence';
}

export interface WatchTherapyResult {
  vibrationScore: number;
  energyAssessment: string;
  element: string;
  impactOnSubconscious: string[];
  keyStrengths: string[];
  cautionPoints: string[];
  therapyWatchPrescription: {
    recommendedShape: string;
    recommendedDialColor: string;
    recommendedStrap: string;
    recommendedWrist: string;
    activationTiming: string;
    specialTip: string;
  };
}

export interface SaltTherapyRitual {
  id: string;
  titleEn: string;
  titleHi: string;
  purpose: string;
  ingredients: string[];
  duration: string;
  idealTime: string;
  procedure: string[];
  benefits: string[];
  precautions: string[];
  consultantNote: string;
}

export interface CrystalItem {
  id: string;
  nameEn: string;
  nameHi: string;
  sanskritName?: string;
  category: 'wealth' | 'protection' | 'peace' | 'love' | 'health' | 'career';
  rulingNumber: number[];
  bestProfessions: string[];
  primaryBenefit: string;
  chakra: string;
  cleansingMethod: string;
  wearingMethod: string;
  affirmation: string;
}

export interface YantraItem {
  id: string;
  name: string;
  planetOrDeity: string;
  sumNumber: number;
  matrix: number[][]; // 3x3
  mantra: string;
  benefits: string;
  bestDay: string;
  placementDirection: string;
}

export interface SwitchwordItem {
  id: string;
  switchword: string;
  healingCode?: string;
  category: 'health' | 'wealth' | 'peace' | 'relationship' | 'success';
  purpose: string;
  howToChant: string;
}

export interface ServiceItem {
  id: number;
  titleEn: string;
  titleHi: string;
  category: 'numerology' | 'watch' | 'salt' | 'crystal' | 'yantra' | 'healing';
  shortDesc: string;
  fullDesc: string;
  badge?: string;
  iconName: string;
}
