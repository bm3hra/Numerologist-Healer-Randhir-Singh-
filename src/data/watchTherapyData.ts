import { WatchAnalysisInput, WatchTherapyResult } from '../types';

export interface WatchShapeInfo {
  shape: string;
  nameEn: string;
  nameHi: string;
  element: string;
  bestFor: string;
  subconsciousEffect: string;
  recommendedForNumbers: number[];
  avoidForNumbers: number[];
}

export const WATCH_SHAPES: WatchShapeInfo[] = [
  {
    shape: 'round',
    nameEn: 'Round Dial',
    nameHi: 'गोल डायल',
    element: 'Water / Infinite Cycle',
    bestFor: 'Healers, Counselors, Public Speakers, Harmonious Relationships & Fluid Cash Flow',
    subconsciousEffect: 'Encourages continuous movement, emotional ease, peace, adaptability, and open opportunities.',
    recommendedForNumbers: [1, 2, 3, 5, 7],
    avoidForNumbers: []
  },
  {
    shape: 'square',
    nameEn: 'Square Dial',
    nameHi: 'चौकोर (स्क्वायर) डायल',
    element: 'Earth / Solid Foundation',
    bestFor: 'Accountants, Engineers, Real Estate Developers, Administrators & Strict Planners',
    subconsciousEffect: 'Instills grounding, unwavering discipline, timely deliverables, and financial containment.',
    recommendedForNumbers: [4, 8, 6],
    avoidForNumbers: [2]
  },
  {
    shape: 'rectangle',
    nameEn: 'Rectangular Dial',
    nameHi: 'आयताकार (रेक्टेंगल) डायल',
    element: 'Wood / Upward Growth',
    bestFor: 'Corporate Executives, Bureaucrats, Lawyers, Academics & Structural Visionaries',
    subconsciousEffect: 'Stimulates vertical professional elevation, long-term legacy thinking, and authoritative bearing.',
    recommendedForNumbers: [1, 3, 4, 8],
    avoidForNumbers: [7]
  },
  {
    shape: 'octagonal',
    nameEn: 'Octagonal Dial (8-Sided)',
    nameHi: '8 कोनों वाला (अष्टकोणीय) डायल',
    element: 'Air / Omnidirectional Expansion',
    bestFor: 'Stock Traders, Global Importers/Exporters, Tech Innovators & Multi-Venture Entrepreneurs',
    subconsciousEffect: 'Attracts luck from all eight cardinal directions (Ashta Lakshmi), multidimensional breakthrough.',
    recommendedForNumbers: [5, 6, 9],
    avoidForNumbers: []
  },
  {
    shape: 'oval',
    nameEn: 'Oval Dial',
    nameHi: 'अंडाकार (ओवल) डायल',
    element: 'Water & Wind Harmony',
    bestFor: 'Designers, Artists, Hospitality Managers, Writers & Luxury Lifestyle Curators',
    subconsciousEffect: 'Refines aesthetic magnetism, creative diplomacy, and graceful persuasion without conflict.',
    recommendedForNumbers: [2, 6, 3],
    avoidForNumbers: [8]
  },
  {
    shape: 'triangular',
    nameEn: 'Triangular Dial',
    nameHi: 'तिकोना (ट्रायंगल) डायल',
    element: 'Fire / Aggressive Breakthrough',
    bestFor: 'Special forces, competitive athletes, venture risk-takers (needs caution)',
    subconsciousEffect: 'Heightens sharp adrenaline and rapid execution, but can trigger emotional spikes and interpersonal friction.',
    recommendedForNumbers: [9],
    avoidForNumbers: [2, 6, 7]
  }
];

export const WATCH_DIAL_COLORS = [
  {
    color: 'white',
    name: 'Pure White / Silver Dial',
    vibration: 'Moon & Venus — Clarity, calm composure, honest financial dealings, mental serenity.'
  },
  {
    color: 'gold',
    name: 'Champagne / Golden Dial',
    vibration: 'Sun & Jupiter — Executive magnetism, royal status, wealth multiplication, respect from peers.'
  },
  {
    color: 'blue',
    name: 'Deep Blue / Navy Dial',
    vibration: 'Saturn & Jupiter — Strategic depth, focused foresight, long-term mastery, patience.'
  },
  {
    color: 'green',
    name: 'Emerald / Forest Green Dial',
    vibration: 'Mercury — Rapid commercial opportunities, merchant instincts, high cash rotation.'
  },
  {
    color: 'black',
    name: 'Jet Black Dial',
    vibration: 'Saturn — Formidable discipline and power, but if overused may cause mood heaviness or delays.'
  },
  {
    color: 'brown',
    name: 'Warm Brown / Rose Dial',
    vibration: 'Earth & Venus — Grounded warmth, domestic stability, sensual refinement.'
  }
];

export const WATCH_PRINCIPLES = [
  {
    title: 'Pulse Meridian Direct Connection',
    titleHi: 'कलाई की नाड़ी से सीधा संपर्क',
    desc: 'The radial artery and wrist pulse point connect directly to heart energy and nervous pathways. The metal, shape, and movement of your watch send continuous micro-vibrations into your energy field.',
    descHi: 'कलाई की नाड़ी सीधे दिल और दिमाग से जुड़ी होती है। घड़ी की धातु, डायल का आकार और सुइयों की चाल हर पल मन और शरीर को ऊर्जा देती है।'
  },
  {
    title: 'The Psychology of Time Mastery',
    titleHi: 'समय का सही उपयोग और मन की स्पष्टता',
    desc: 'A broken, scratched, or stopped watch creates subconscious delays in career promotions and pending work. Suitable Therapy Watches keep positive momentum flowing.',
    descHi: 'बंद, टूटी या रुकी हुई घड़ी काम में रुकावटें, देरी और तनाव लाती है। सही और चालू घड़ी जीवन में लगातार तरक्की और नए अवसर लाती है।'
  },
  {
    title: 'Active vs. Receptive Wrist Dynamics',
    titleHi: 'दाएं और बाएं हाथ में घड़ी पहनने का असर',
    desc: 'Wearing your therapy watch on the active hand (usually right) boosts leadership, active sales, and confidence. Wearing on the left hand supports inner peace, intuition, and stress relief.',
    descHi: 'दाएं हाथ में घड़ी पहनने से आत्मविश्वास, लीडरशिप और धन लाभ बढ़ता है; बाएं हाथ में पहनने से मन शांत रहता है और तनाव कम होता है।'
  },
  {
    title: 'Dial Numbering & Numerological Alignment',
    titleHi: 'डायल के अंक और सही नंबरों का असर',
    desc: 'Whether your dial features Roman numerals, simple numbers, or clean markers affects how your brain processes deadlines, goals, and opportunities.',
    descHi: 'घड़ी के डायल पर अंकों की बनावट का हमारे दिमाग, समय के सदुपयोग और सही फैसले लेने पर सीधा असर पड़ता है।'
  }
];

// Diagnostic Calculator Function
export function diagnoseWatch(input: WatchAnalysisInput): WatchTherapyResult {
  let score = 70;
  const impacts: string[] = [];
  const strengths: string[] = [];
  const cautions: string[] = [];

  // Shape analysis
  if (input.dialShape === 'round') {
    score += 8;
    strengths.push('Round geometry maintains an uninterrupted energetic flow and prevents career bottlenecks.');
  } else if (input.dialShape === 'square' || input.dialShape === 'rectangle') {
    score += 7;
    strengths.push('Structured angular dial enforces systematic execution, financial budgeting, and timely closures.');
  } else if (input.dialShape === 'octagonal') {
    score += 9;
    strengths.push('Octagonal geometry activates multi-directional prosperity and unexpected breakthrough avenues.');
  } else if (input.dialShape === 'triangular') {
    score -= 10;
    cautions.push('Sharp triangular angles generate excessive Martian heat, potentially leading to hasty decisions or workplace friction.');
  }

  // Dial Color
  if (input.dialColor === 'gold' || input.dialColor === 'silver' || input.dialColor === 'white') {
    score += 8;
    strengths.push(`${input.dialColor.toUpperCase()} dial amplifies solar dignity, transparency in deals, and graceful reception of wealth.`);
  } else if (input.dialColor === 'green') {
    score += 9;
    strengths.push('Green dial stimulates commercial acumen and business network expansion.');
  } else if (input.dialColor === 'black' && input.currentGoal === 'mental_peace') {
    score -= 8;
    cautions.push('Black dial with a desire for mental peace may induce subconscious heaviness or prolonged overthinking.');
  }

  // Strap
  if (input.strapType === 'gold_metal' || input.strapType === 'silver_metal') {
    strengths.push('Metallic mesh or links act as energetic antennas, focusing executive authority.');
  } else if (input.strapType === 'silicone_rubber') {
    cautions.push('Silicone/rubber straps can act as insulating barriers against ambient cosmic vibrations during professional negotiations.');
  }

  // Condition
  if (input.condition === 'stopped_sometimes' || input.condition === 'scratched') {
    score -= 20;
    cautions.push('CRITICAL REMEDY: Never wear a scratched crystal or a watch that stops intermittently; it manifests as delayed payments and pending approvals in life.');
  } else {
    score += 5;
    strengths.push('Pristine watch condition signals subconscious punctuality and cosmic readiness for blessings.');
  }

  // Wrist
  if (input.wornWrist === 'right') {
    impacts.push('Right wrist placement energizes your conscious, masculine (Pingala) channel for active negotiation, closing sales, and asserting leadership.');
  } else {
    impacts.push('Left wrist placement soothes your intuitive, receptive (Ida) channel, stabilizing emotional temper and attracting collaborative support.');
  }

  // Normalize score
  score = Math.min(98, Math.max(45, score));

  // Prescription based on Goal
  let recShape = 'Round or Octagonal';
  let recDial = 'Golden Champagne or Pure White';
  let recStrap = 'Polished Gold or Dual-Tone Stainless Steel';
  let recWrist = 'Right Hand (Active Wrist)';
  let timing = 'Thursday or Sunday morning between 7:15 AM and 9:00 AM (Shubha Choghadiya)';
  let specialTip = 'Clean your watch glass weekly with a few drops of rose water and a micro-fiber cloth to keep mental perception sharp.';

  if (input.currentGoal === 'wealth_flow') {
    recShape = 'Octagonal or Round';
    recDial = 'Champagne Gold or Emerald Green';
    recStrap = 'Golden link bracelet or Dark Green Italian leather';
    recWrist = 'Right Wrist';
    timing = 'Wednesday or Friday during Mercury / Venus Hora';
    specialTip = 'Ensure the number 12 and 6 are crystal clear on your dial to anchor uninterrupted money flow.';
  } else if (input.currentGoal === 'mental_peace') {
    recShape = 'Round';
    recDial = 'Pearl White, Opaline or Ice Silver';
    recStrap = 'Silver mesh or Warm Tan soft leather';
    recWrist = 'Left Wrist';
    timing = 'Monday morning during Shukla Paksha';
    specialTip = 'Avoid chronographs with cluttered sub-dials; choose a clean, minimalist 2-hand or 3-hand layout.';
  } else if (input.currentGoal === 'career_growth') {
    recShape = 'Rectangle or Octagonal';
    recDial = 'Deep Navy Blue or Sunray Golden';
    recStrap = 'Dual-tone Steel/Gold link strap';
    recWrist = 'Right Wrist';
    timing = 'Sunday or Thursday morning facing East';
    specialTip = 'Verify that the second hand sweeps steadily without stuttering, symbolizing uninterrupted career ascent.';
  }

  return {
    vibrationScore: score,
    energyAssessment: score >= 80 ? 'Harmonious & Wealth-Conductive' : score >= 65 ? 'Moderate Alignment — Needs Fine Tuning' : 'Energetically Conflicted — Therapy Watch Recommended',
    element: input.dialShape === 'round' ? 'Water' : input.dialShape === 'square' ? 'Earth' : input.dialShape === 'octagonal' ? 'Air / Cosmic' : 'Fire',
    impactOnSubconscious: impacts,
    keyStrengths: strengths,
    cautionPoints: cautions,
    therapyWatchPrescription: {
      recommendedShape: recShape,
      recommendedDialColor: recDial,
      recommendedStrap: recStrap,
      recommendedWrist: recWrist,
      activationTiming: timing,
      specialTip: specialTip
    }
  };
}
