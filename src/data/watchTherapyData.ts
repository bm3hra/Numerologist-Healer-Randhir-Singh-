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
    nameEn: 'Round Dial (वृत्ताकार)',
    nameHi: 'गोल डायल',
    element: 'Water / Infinite Cycle',
    bestFor: 'Healers, Counselors, Public Speakers, Harmonious Relationships & Fluid Cash Flow',
    subconsciousEffect: 'Encourages continuous movement, emotional ease, peace, adaptability, and open opportunities.',
    recommendedForNumbers: [1, 2, 3, 5, 7],
    avoidForNumbers: []
  },
  {
    shape: 'square',
    nameEn: 'Square Dial (चौकोर)',
    nameHi: 'वर्गाकार डायल',
    element: 'Earth / Solid Foundation',
    bestFor: 'Accountants, Engineers, Real Estate Developers, Administrators & Strict Planners',
    subconsciousEffect: 'Instills grounding, unwavering discipline, timely deliverables, and financial containment.',
    recommendedForNumbers: [4, 8, 6],
    avoidForNumbers: [2]
  },
  {
    shape: 'rectangle',
    nameEn: 'Rectangular Dial (आयताकार)',
    nameHi: 'आयताकार डायल',
    element: 'Wood / Upward Growth',
    bestFor: 'Corporate Executives, Bureaucrats, Lawyers, Academics & Structural Visionaries',
    subconsciousEffect: 'Stimulates vertical professional elevation, long-term legacy thinking, and authoritative bearing.',
    recommendedForNumbers: [1, 3, 4, 8],
    avoidForNumbers: [7]
  },
  {
    shape: 'octagonal',
    nameEn: 'Octagonal Dial (अष्टकोणीय / Hexagonal)',
    nameHi: 'अष्टकोणीय डायल',
    element: 'Air / Omnidirectional Expansion',
    bestFor: 'Stock Traders, Global Importers/Exporters, Tech Innovators & Multi-Venture Entrepreneurs',
    subconsciousEffect: 'Attracts luck from all eight cardinal directions (Ashta Lakshmi), multidimensional breakthrough.',
    recommendedForNumbers: [5, 6, 9],
    avoidForNumbers: []
  },
  {
    shape: 'oval',
    nameEn: 'Oval Dial (अंडाकार)',
    nameHi: 'दीर्घवृत्ताकार डायल',
    element: 'Water & Wind Harmony',
    bestFor: 'Designers, Artists, Hospitality Managers, Writers & Luxury Lifestyle Curators',
    subconsciousEffect: 'Refines aesthetic magnetism, creative diplomacy, and graceful persuasion without conflict.',
    recommendedForNumbers: [2, 6, 3],
    avoidForNumbers: [8]
  },
  {
    shape: 'triangular',
    nameEn: 'Triangular / Avant-Garde Dial',
    nameHi: 'त्रिकोणीय डायल',
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
    titleHi: 'नब्ज (रेडियल पल्स) से सीधा ऊर्जा संपर्क',
    desc: 'The radial artery and wrist pulse point connect directly to heart energy and nervous pathways. The metal, shape, and ticking frequency of your watch send micro-vibrations 24 hours a day into your energetic matrix.',
    descHi: 'कलाई की रेडियल धमनी सीधे हृदय और केंद्रीय स्नायुतंत्र से जुड़ी होती है। घड़ी की धातु, डायल का आकार और सुईयों की गति 24 घंटे आपके सूक्ष्म शरीर में ऊर्जा का संचार करती है।'
  },
  {
    title: 'The Psychology of Time Mastery',
    titleHi: 'समय प्रबंधन व मानसिक स्पष्टता',
    desc: 'A broken, scratched, or stopped watch creates subconscious delays in career promotions and debt clearance. Randhir Singh’s Therapy Watches ensure continuous positive momentum.',
    descHi: 'बंद, टूटी या खरोंच लगी घड़ी अवचेतन मन में विलंब, रुकावटें और कर्ज की स्थिति पैदा करती है। रणधीर सिंह जी द्वारा सुझाई गई थेरेपी वॉच जीवन को निरंतर प्रगति देती है।'
  },
  {
    title: 'Active vs. Receptive Wrist Dynamics',
    titleHi: 'दाहिनी बनाम बायीं कलाई का प्रभाव',
    desc: 'Wearing your therapy watch on the active hand (usually right) projects leadership, authority, and financial attraction outward. Wearing on the left hand cultivates inner intuition, stress relief, and receptive blessings.',
    descHi: 'सक्रिय हाथ (प्रायः दायां) पर घड़ी धारण करने से नेतृत्व क्षमता, पराक्रम और धन आकर्षण बढ़ता है; जबकि बायीं कलाई पर पहनने से मानसिक शांति, अंतर्ज्ञान और तनाव से मुक्ति मिलती है।'
  },
  {
    title: 'Dial Numbering & Numerological Alignment',
    titleHi: 'डायल अंक एवं अंक ज्योतिषीय संतुलन',
    desc: 'Whether your dial features Roman numerals, Arabic numbers, or minimalist baton markers significantly alters how your brain computes deadlines, growth ceilings, and opportunities.',
    descHi: 'घड़ी में रोमन अंक, सामान्य अंक या सादे निशान होने का मस्तिष्क की कार्यप्रणाली और वित्तीय निर्णय लेने की गति पर गहरा प्रभाव पड़ता है।'
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
