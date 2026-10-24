import { NumerologyProfile, KuaDetails } from '../types';

// Chaldean Numerology Letter Values
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Pythagorean Numerology Letter Values (1-9)
export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Single digit reducer
export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num === 0 ? 9 : num;
}

export interface PlanetInfo {
  planet: string;
  element: string;
  rulingDeity: string;
  gemstone: string;
  luckyColor: string;
  luckyDays: string[];
  friendly: number[];
  enemy: number[];
  neutral: number[];
  traits: string[];
}

export const PLANETARY_ARCHETYPES: Record<number, PlanetInfo> = {
  1: {
    planet: 'Sun (Surya)',
    element: 'Fire',
    rulingDeity: 'Lord Shiva / Lord Rama',
    gemstone: 'Ruby (Manik)',
    luckyColor: 'Golden, Orange, Yellow, Ruby Red',
    luckyDays: ['Sunday', 'Monday'],
    friendly: [1, 2, 3, 5, 9],
    enemy: [8],
    neutral: [4, 6, 7],
    traits: ['Leadership', 'Originality', 'Willpower', 'Dignity', 'Ambition']
  },
  2: {
    planet: 'Moon (Chandra)',
    element: 'Water',
    rulingDeity: 'Lord Shiva / Goddess Parvati',
    gemstone: 'Pearl (Moti) / Moonstone',
    luckyColor: 'White, Cream, Silver, Light Green',
    luckyDays: ['Monday', 'Sunday'],
    friendly: [1, 2, 3, 5],
    enemy: [4, 8, 9],
    neutral: [6, 7],
    traits: ['Intuition', 'Sensitivity', 'Empathy', 'Creative Mind', 'Diplomacy']
  },
  3: {
    planet: 'Jupiter (Brihaspati / Guru)',
    element: 'Space (Ether)',
    rulingDeity: 'Lord Vishnu / Brihaspati',
    gemstone: 'Yellow Sapphire (Pukhraj) / Citrine',
    luckyColor: 'Bright Yellow, Saffron, Golden, Violet',
    luckyDays: ['Thursday', 'Tuesday'],
    friendly: [1, 2, 3, 5, 9],
    enemy: [6],
    neutral: [4, 7, 8],
    traits: ['Wisdom', 'Mentorship', 'Expansion', 'Ethics', 'High Knowledge']
  },
  4: {
    planet: 'Rahu (North Node / Uranus)',
    element: 'Wood / Air',
    rulingDeity: 'Lord Ganesha / Bhairav',
    gemstone: 'Hessonite (Gomed)',
    luckyColor: 'Electric Blue, Grey, Khaki',
    luckyDays: ['Saturday', 'Sunday'],
    friendly: [1, 5, 6, 7],
    enemy: [2, 8, 9],
    neutral: [3],
    traits: ['Revolutionary Thinking', 'Out of the Box', 'Structural Intellect', 'Tech Genius']
  },
  5: {
    planet: 'Mercury (Budh)',
    element: 'Earth',
    rulingDeity: 'Lord Vishnu / Budh Dev',
    gemstone: 'Emerald (Panna) / Green Tourmaline',
    luckyColor: 'Emerald Green, Light Grey, Turquoise',
    luckyDays: ['Wednesday', 'Friday'],
    friendly: [1, 2, 3, 5, 6],
    enemy: [],
    neutral: [4, 7, 8, 9],
    traits: ['Communication', 'Commercial Astuteness', 'Balance', 'Versatility', 'Sales & Trade']
  },
  6: {
    planet: 'Venus (Shukra)',
    element: 'Metal / Air',
    rulingDeity: 'Goddess Lakshmi / Shukracharya',
    gemstone: 'Diamond (Heera) / White Zircon / Opal',
    luckyColor: 'Diamond White, Rose Pink, Pastel Shades',
    luckyDays: ['Friday', 'Wednesday'],
    friendly: [1, 5, 6, 7],
    enemy: [3],
    neutral: [2, 4, 8, 9],
    traits: ['Luxury', 'Magnetic Charm', 'Artistic Refinement', 'Family Love', 'Glamour']
  },
  7: {
    planet: 'Ketu (South Node / Neptune)',
    element: 'Metal / Water',
    rulingDeity: 'Lord Ganesha / Matsya Avatar',
    gemstone: "Cat's Eye (Lehsuniya)",
    luckyColor: 'Smoky Grey, Light Green, White',
    luckyDays: ['Monday', 'Tuesday'],
    friendly: [1, 4, 5, 6],
    enemy: [2, 9],
    neutral: [3, 7, 8],
    traits: ['Spiritual Seeker', 'Deep Research', 'Intuitive Healer', 'Occult Sciences', 'Wisdom']
  },
  8: {
    planet: 'Saturn (Shani)',
    element: 'Earth',
    rulingDeity: 'Lord Shani / Lord Hanuman',
    gemstone: 'Blue Sapphire (Neelam) / Amethyst',
    luckyColor: 'Royal Blue, Navy, Dark Grey, Black',
    luckyDays: ['Saturday', 'Friday'],
    friendly: [3, 5, 6, 7],
    enemy: [1, 2, 4, 9],
    neutral: [],
    traits: ['Justice', 'Relentless Discipline', 'Mass Leadership', 'Hard Work', 'Karmic Mastery']
  },
  9: {
    planet: 'Mars (Mangal)',
    element: 'Fire',
    rulingDeity: 'Lord Hanuman / Kartikeya',
    gemstone: 'Red Coral (Moonga) / Carnelian',
    luckyColor: 'Crimson Red, Coral, Maroon, Copper',
    luckyDays: ['Tuesday', 'Sunday'],
    friendly: [1, 2, 3, 5],
    enemy: [2, 4, 8],
    neutral: [6, 7],
    traits: ['Courage', 'Pioneering Energy', 'Humanitarian Zeal', 'Protective Force', 'Endurance']
  }
};

export const LOSHU_PLANES_INFO = [
  {
    name: 'Mental Plane (माइंड प्लेन)',
    numbers: [4, 9, 2],
    description: 'Intellectual processing, visual memory, and academic thinking.'
  },
  {
    name: 'Emotional / Spiritual Plane (हार्ट प्लेन)',
    numbers: [3, 5, 7],
    description: 'Intuition, emotional intelligence, empathy, and spiritual connection.'
  },
  {
    name: 'Practical Plane (प्रैक्टिकल प्लेन)',
    numbers: [8, 1, 6],
    description: 'Material grounding, execution, financial management, and hands-on skills.'
  },
  {
    name: 'Thought Plane (विचार प्लेन)',
    numbers: [4, 3, 8],
    description: 'Planning, ideation, legal acumen, and structured vision.'
  },
  {
    name: 'Will Power Plane (इच्छाशक्ति प्लेन)',
    numbers: [9, 5, 1],
    description: 'Determination, persistence, leadership, and unwavering commitment.'
  },
  {
    name: 'Action Plane (कर्म प्लेन)',
    numbers: [2, 7, 6],
    description: 'Speed of execution, courage to act, and bringing dreams into physical reality.'
  },
  {
    name: 'Golden Raj Yoga (गोल्डन राजयोग)',
    numbers: [4, 5, 6],
    description: 'Extreme prosperity, wealth magnetism, social fame, and holistic victory.'
  },
  {
    name: 'Silver Raj Yoga (सिल्वर राजयोग)',
    numbers: [2, 5, 8],
    description: 'Landed property, real estate stability, ancestral blessings, and steady growth.'
  }
];

export const MISSING_NUMBER_REMEDIES: Record<number, { title: string; remedies: string[] }> = {
  1: {
    title: 'Missing Number 1 (Sun Energy - Lack of Career Confidence or Independence)',
    remedies: [
      'Offer Arghya (fresh water in copper vessel) to the rising Sun daily facing East.',
      'Wear a red thread (Kalawa) on the right wrist on Sundays.',
      'Touch father’s or elders’ feet for blessings and boost of solar dignity.',
      'Use a wooden pen or incorporate a dash of ruby red/golden in daily attire.'
    ]
  },
  2: {
    title: 'Missing Number 2 (Moon Energy - Emotional Restlessness or Indecisiveness)',
    remedies: [
      'Drink water from a pure silver glass or keep silver square piece in wallet.',
      'Fast or consume white milk/kheer on Mondays; respect mother figure.',
      'Wear a silver bracelet or Pearl / Moonstone after consultation.',
      'Avoid taking major emotional decisions late at night.'
    ]
  },
  3: {
    title: 'Missing Number 3 (Jupiter Energy - Lack of Knowledge Guidance or Spiritual Focus)',
    remedies: [
      'Apply yellow sandalwood or saffron (Kesar) tilak on forehead daily.',
      'Water a Peepal or Tulsi tree on Thursday; donate yellow gram (chana dal).',
      'Wear a brass or gold-colored watch with round dial.',
      'Keep a Jupiter Yantra in the North-East (Ishan) zone of your study.'
    ]
  },
  4: {
    title: 'Missing Number 4 (Rahu / Wood - Lack of Discipline, Structure or Tech Focus)',
    remedies: [
      'Wear a 5-Mukhi Rudraksha or holy basil (Tulsi) wooden beads bracelet.',
      'Place a lush indoor green plant in the South-East zone of your living room.',
      'Keep an eight-sided octagonal wooden coaster or decor on your work desk.',
      'Feed street dogs on Saturdays to neutralize ungrounded restlessness.'
    ]
  },
  5: {
    title: 'Missing Number 5 (Mercury / Earth - Imbalanced Communication, Business & Health)',
    remedies: [
      'Wear a Green Aventurine crystal bracelet on the active right wrist.',
      'Hang a green crystal ball or keep green tourmaline in the center (Brahmasthan) of home.',
      'Feed green grass or spinach to cows on Wednesdays.',
      'Keep personal financial accounts written in a green diary.'
    ]
  },
  6: {
    title: 'Missing Number 6 (Venus / Luxury - Strained Relationships, Delay in Luxury)',
    remedies: [
      'Keep your home fragrant using rose or sandalwood essential oil / aroma diffuser.',
      'Wear clean, well-ironed white or light pastel clothes; use quality perfume daily.',
      'Wear a clear quartz or opal bracelet; gift sweets to women on Fridays.',
      'Respect spouse and life partner; place a pair of Rose Quartz swans in South-West.'
    ]
  },
  7: {
    title: 'Missing Number 7 (Ketu / Metal - Lack of Spiritual Depth, Intuition or Focus on Studies)',
    remedies: [
      'Wear a pure silver chain or silver ring without joints on little finger.',
      'Hang metal wind chimes (7 rods) in the West or North-West direction.',
      'Keep Lord Ganesha idol on study desk and chant "Om Gan Ganapataye Namah".',
      'Meditate in silence for 10 minutes every morning at sunrise.'
    ]
  },
  8: {
    title: 'Missing Number 8 (Saturn / Earth - Lack of Patience, Persistence & Financial Management)',
    remedies: [
      'Light a mustard oil lamp (Diya) under a Peepal tree or near Shani temple on Saturday evenings.',
      'Help and respect laborers, helpers, cleaners, and daily wage workers.',
      'Wear an Amethyst or Black Tourmaline crystal bracelet for karmic grounding.',
      'Keep an earthy clay pot with fresh water in the North-East zone.'
    ]
  },
  9: {
    title: 'Missing Number 9 (Mars / Fire - Low Motivation, Timidity, Lack of Courage to Execute)',
    remedies: [
      'Recite Hanuman Chalisa daily, especially on Tuesdays.',
      'Wear a red thread (Kalawa) or red carnelian crystal on right hand.',
      'Donate red lentils (Masoor Dal) or jaggery on Tuesday to needy people.',
      'Keep a red pyramid or copper swastika in the South zone of home.'
    ]
  }
};

export interface KuaArchetype {
  element: string;
  elementHi: string;
  trigram: string;
  trigramHi: string;
  direction: string;
  directionHi: string;
  group: 'East Group' | 'West Group';
  groupHi: string;
  favorableDirections: string[];
  favorableDirectionsHi: string[];
}

export const KUA_ARCHETYPES: Record<number, KuaArchetype> = {
  1: {
    element: 'Water',
    elementHi: 'जल तत्व',
    trigram: 'Kan (कन)',
    trigramHi: 'कन (Kan)',
    direction: 'North',
    directionHi: 'उत्तर दिशा',
    group: 'East Group',
    groupHi: 'पूर्व समूह',
    favorableDirections: [
      'North (Fu Wei - Personal Growth & Stability)',
      'South (Yan Nian - Relationships & Harmony)',
      'East (Tien Yi - Health & Longevity)',
      'South-East (Sheng Chi - Wealth & Success)'
    ],
    favorableDirectionsHi: [
      'उत्तर (व्यक्तिगत स्थिरता व विकास)',
      'दक्षिण (मधुर संबंध व सौहार्द्र)',
      'पूर्व (आरोग्य एवं दीर्घायु)',
      'दक्षिण-पूर्व (समृद्धि व सफलता)'
    ]
  },
  2: {
    element: 'Earth',
    elementHi: 'पृथ्वी तत्व',
    trigram: 'Kun (कुन)',
    trigramHi: 'कुन (Kun)',
    direction: 'South-West',
    directionHi: 'दक्षिण-पश्चिम दिशा',
    group: 'West Group',
    groupHi: 'पश्चिम समूह',
    favorableDirections: [
      'North-East (Sheng Chi - Success & Wealth)',
      'West (Yan Nian - Love & Harmony)',
      'North-West (Tien Yi - Health & Peace)',
      'South-West (Fu Wei - Stability & Grounding)'
    ],
    favorableDirectionsHi: [
      'उत्तर-पूर्व (सफलता व धन प्रवाह)',
      'पश्चिम (प्रेम व पारिवारिक सौहार्द्र)',
      'उत्तर-पश्चिम (आरोग्य व मानसिक शांति)',
      'दक्षिण-पश्चिम (स्थिरता व सुरक्षा)'
    ]
  },
  3: {
    element: 'Wood',
    elementHi: 'काष्ठ (लकड़ी) तत्व',
    trigram: 'Zhen (झेन)',
    trigramHi: 'झेन (Zhen)',
    direction: 'East',
    directionHi: 'पूर्व दिशा',
    group: 'East Group',
    groupHi: 'पूर्व समूह',
    favorableDirections: [
      'South (Sheng Chi - Fame & Recognition)',
      'North (Tien Yi - Health & Vitality)',
      'South-East (Yan Nian - Relationships)',
      'East (Fu Wei - Personal Growth & Ambition)'
    ],
    favorableDirectionsHi: [
      'दक्षिण (यश, कीर्ति व सफलता)',
      'उत्तर (आरोग्य व ऊर्जा)',
      'दक्षिण-पूर्व (प्रेम संबंध व मेलजोल)',
      'पूर्व (व्यक्तिगत प्रगति व संकल्प शक्ति)'
    ]
  },
  4: {
    element: 'Wood',
    elementHi: 'काष्ठ (वायु/लचीला काष्ठ) तत्व',
    trigram: 'Xun (शुन)',
    trigramHi: 'शुन (Xun)',
    direction: 'South-East',
    directionHi: 'दक्षिण-पूर्व दिशा',
    group: 'East Group',
    groupHi: 'पूर्व समूह',
    favorableDirections: [
      'North (Sheng Chi - Wealth & Abundance)',
      'South (Tien Yi - Health & Wellness)',
      'East (Yan Nian - Matrimony & Peace)',
      'South-East (Fu Wei - Wisdom & Expansion)'
    ],
    favorableDirectionsHi: [
      'उत्तर (धन लाभ व प्रचुरता)',
      'दक्षिण (स्वास्थ्य व ऊर्जा)',
      'पूर्व (वैवाहिक शांति व सौहार्द्र)',
      'दक्षिण-पूर्व (ज्ञान व आध्यात्मिक उन्नति)'
    ]
  },
  6: {
    element: 'Hard Metal',
    elementHi: 'कठोर धातु (स्वर्ण/स्टील) तत्व',
    trigram: 'Qian (चियान)',
    trigramHi: 'चियान (Qian)',
    direction: 'North-West',
    directionHi: 'उत्तर-पश्चिम दिशा',
    group: 'West Group',
    groupHi: 'पश्चिम समूह',
    favorableDirections: [
      'West (Sheng Chi - Business & Authority)',
      'North-East (Tien Yi - Health & Longevity)',
      'South-West (Yan Nian - Harmony & Alliances)',
      'North-West (Fu Wei - Leadership & Dignity)'
    ],
    favorableDirectionsHi: [
      'पश्चिम (व्यापार, अधिकार व समृद्धि)',
      'उत्तर-पूर्व (आरोग्य व दीर्घायु)',
      'दक्षिण-पश्चिम (पारिवारिक व व्यावसायिक सौहार्द्र)',
      'उत्तर-पश्चिम (नेतृत्व, गरिमा व मार्गदर्शन)'
    ]
  },
  7: {
    element: 'Soft Metal',
    elementHi: 'कोमल धातु (रजत/चांदी) तत्व',
    trigram: 'Dui (दुई)',
    trigramHi: 'दुई (Dui)',
    direction: 'West',
    directionHi: 'पश्चिम दिशा',
    group: 'West Group',
    groupHi: 'पश्चिम समूह',
    favorableDirections: [
      'North-West (Sheng Chi - Prosperity & Opportunities)',
      'South-West (Tien Yi - Physical Vitality)',
      'North-East (Yan Nian - Romantic & Family Bliss)',
      'West (Fu Wei - Joy, Creativity & Eloquence)'
    ],
    favorableDirectionsHi: [
      'उत्तर-पश्चिम (समृद्धि व नए अवसर)',
      'दक्षिण-पश्चिम (शारीरिक ऊर्जा व आरोग्य)',
      'उत्तर-पूर्व (वैवाहिक सुख व पारिवारिक शांति)',
      'पश्चिम (प्रसन्नता, रचनात्मकता व वाणी प्रभाव)'
    ]
  },
  8: {
    element: 'Earth',
    elementHi: 'पृथ्वी (पर्वत/स्थिर पृथ्वी) तत्व',
    trigram: 'Gen (गेन)',
    trigramHi: 'गेन (Gen)',
    direction: 'North-East',
    directionHi: 'उत्तर-पूर्व (ईशान) दिशा',
    group: 'West Group',
    groupHi: 'पश्चिम समूह',
    favorableDirections: [
      'South-West (Sheng Chi - Massive Wealth & Assets)',
      'North-West (Tien Yi - Good Health & Focus)',
      'West (Yan Nian - Loyal Relationships)',
      'North-East (Fu Wei - Knowledge, Meditation & Stillness)'
    ],
    favorableDirectionsHi: [
      'दक्षिण-पश्चिम (अचल संपत्ति व धन संचय)',
      'उत्तर-पश्चिम (उत्तम स्वास्थ्य व एकाग्रता)',
      'पश्चिम (सच्चे मित्र व निष्ठावान संबंध)',
      'उत्तर-पूर्व (विद्या, ध्यान व अंतःशांति)'
    ]
  },
  9: {
    element: 'Fire',
    elementHi: 'अग्नि तत्व',
    trigram: 'Li (ली)',
    trigramHi: 'ली (Li)',
    direction: 'South',
    directionHi: 'दक्षिण दिशा',
    group: 'East Group',
    groupHi: 'पूर्व समूह',
    favorableDirections: [
      'East (Sheng Chi - High Fame & Recognition)',
      'South-East (Tien Yi - Health & Vital Glow)',
      'North (Yan Nian - Harmonious Social Network)',
      'South (Fu Wei - Inspiration, Passion & Brilliance)'
    ],
    favorableDirectionsHi: [
      'पूर्व (उच्च मान-सम्मान व प्रसिद्धि)',
      'दक्षिण-पूर्व (आरोग्य व ओजस्वी कांति)',
      'उत्तर (सामाजिक सामंजस्य व सहयोग)',
      'दक्षिण (प्रेरणा, उत्साह व आंतरिक तेज)'
    ]
  }
};

/**
 * Authentic Kua Number Calculation
 * Based on Classical Feng Shui / Lo Shu Numerology:
 * 1. Takes full DOB (Day, Month, Year) & Gender.
 * 2. Determines Solar Year (Li Chun / वसंत ऋतु आगमन - begins Feb 4).
 *    If birth is Jan 1 - Feb 3, the solar birth year is `year - 1`.
 * 3. Takes the LAST TWO DIGITS of the solar year, sums them and reduces to single digit.
 *    (e.g., 1967 -> 67 -> 6+7=13 -> 1+3=4).
 * 4. Formula:
 *    - Before 2000:
 *      Male: 10 - lastTwoDigitsSum. (1967 Male: 10 - 4 = 6).
 *      Female: 5 + lastTwoDigitsSum. (1967 Female: 5 + 4 = 9).
 *    - 2000 Onwards:
 *      Male: 9 - lastTwoDigitsSum.
 *      Female: 6 + lastTwoDigitsSum.
 * 5. Special Rule for 5:
 *    The central palace (5) has no Bagua trigram.
 *    Male 5 shifts to 2 (Kun / Earth).
 *    Female 5 shifts to 8 (Gen / Earth).
 */
export function calculateKuaNumber(
  day: number,
  month: number,
  year: number,
  gender: 'male' | 'female' = 'male'
): KuaDetails {
  // Chinese Solar Year (Li Chun / सौर वर्ष) begins on February 4
  const isSolarYearAdjusted = month === 1 || (month === 2 && day < 4);
  const solarYear = isSolarYearAdjusted ? year - 1 : year;

  // Last two digits of the solar year
  const lastTwoDigits = Math.abs(solarYear) % 100;
  const tens = Math.floor(lastTwoDigits / 10);
  const units = lastTwoDigits % 10;
  let lastTwoDigitsSum = tens + units;
  while (lastTwoDigitsSum > 9) {
    lastTwoDigitsSum = lastTwoDigitsSum
      .toString()
      .split('')
      .reduce((acc, c) => acc + parseInt(c, 10), 0);
  }

  let kuaNumber: number;
  let formulaEn = '';
  let formulaHi = '';

  if (solarYear < 2000) {
    if (gender === 'male') {
      let raw = 10 - lastTwoDigitsSum;
      if (raw <= 0) raw += 9;
      raw = reduceToSingleDigit(raw);
      if (raw === 5) {
        kuaNumber = 2; // For male, 5 becomes 2 (Kun / Earth)
        formulaEn = `Solar Year ${solarYear} last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Male formula: 10 - ${lastTwoDigitsSum} = 5. (As Kua 5 has no Bagua palace, Male 5 shifts to 2 - Kun Earth).`;
        formulaHi = `सौर वर्ष ${solarYear} के अंतिम दो अंक: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}। पुरुष सूत्र: 10 - ${lastTwoDigitsSum} = 5। (कुआं 5 का कोई स्वतंत्र कोण नहीं होता, अतः पुरुष के लिए 5 बदलकर 2 बन जाता है)।`;
      } else {
        kuaNumber = raw;
        formulaEn = `Solar Year ${solarYear} last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Male formula: 10 - ${lastTwoDigitsSum} = ${kuaNumber}.`;
        formulaHi = `सौर वर्ष ${solarYear} के अंतिम दो अंक: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}। पुरुष सूत्र: 10 - ${lastTwoDigitsSum} = ${kuaNumber}।`;
      }
    } else {
      let raw = 5 + lastTwoDigitsSum;
      raw = reduceToSingleDigit(raw);
      if (raw === 5) {
        kuaNumber = 8; // For female, 5 becomes 8 (Gen / Earth)
        formulaEn = `Solar Year ${solarYear} last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Female formula: 5 + ${lastTwoDigitsSum} = 5. (As Kua 5 has no Bagua palace, Female 5 shifts to 8 - Gen Earth).`;
        formulaHi = `सौर वर्ष ${solarYear} के अंतिम दो अंक: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}। महिला सूत्र: 5 + ${lastTwoDigitsSum} = 5। (कुआं 5 का कोई स्वतंत्र कोण नहीं होता, अतः महिला के लिए 5 बदलकर 8 बन जाता है)।`;
      } else {
        kuaNumber = raw;
        formulaEn = `Solar Year ${solarYear} last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Female formula: 5 + ${lastTwoDigitsSum} = ${5 + lastTwoDigitsSum}${5 + lastTwoDigitsSum > 9 ? ` -> ${kuaNumber}` : ''}.`;
        formulaHi = `सौर वर्ष ${solarYear} के अंतिम दो अंक: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}। महिला सूत्र: 5 + ${lastTwoDigitsSum} = ${5 + lastTwoDigitsSum}${5 + lastTwoDigitsSum > 9 ? ` -> ${kuaNumber}` : ''}।`;
      }
    }
  } else {
    // 2000 onwards
    if (gender === 'male') {
      let raw = 9 - lastTwoDigitsSum;
      if (raw <= 0) raw += 9;
      raw = reduceToSingleDigit(raw);
      if (raw === 5) {
        kuaNumber = 2;
        formulaEn = `Solar Year ${solarYear} (2000+) last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Male formula: 9 - ${lastTwoDigitsSum} = 5 -> shifts to 2 (Kun).`;
        formulaHi = `सौर वर्ष ${solarYear} (२०००+) के अंतिम दो अंक: ${tens}+${units} = ${tens + units}। पुरुष सूत्र: 9 - ${lastTwoDigitsSum} = 5 -> बदलकर 2 (कुन)।`;
      } else {
        kuaNumber = raw;
        formulaEn = `Solar Year ${solarYear} (2000+) last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Male formula: 9 - ${lastTwoDigitsSum} = ${kuaNumber}.`;
        formulaHi = `सौर वर्ष ${solarYear} (२०००+) के अंतिम दो अंक: ${tens}+${units} = ${tens + units}। पुरुष सूत्र: 9 - ${lastTwoDigitsSum} = ${kuaNumber}।`;
      }
    } else {
      let raw = 6 + lastTwoDigitsSum;
      raw = reduceToSingleDigit(raw);
      if (raw === 5) {
        kuaNumber = 8;
        formulaEn = `Solar Year ${solarYear} (2000+) last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Female formula: 6 + ${lastTwoDigitsSum} = 5 -> shifts to 8 (Gen).`;
        formulaHi = `सौर वर्ष ${solarYear} (२०००+) के अंतिम दो अंक: ${tens}+${units} = ${tens + units}। महिला सूत्र: 6 + ${lastTwoDigitsSum} = 5 -> बदलकर 8 (गेन)।`;
      } else {
        kuaNumber = raw;
        formulaEn = `Solar Year ${solarYear} (2000+) last 2 digits: ${tens}+${units} = ${tens + units}${tens + units > 9 ? ` -> ${lastTwoDigitsSum}` : ''}. Female formula: 6 + ${lastTwoDigitsSum} = ${6 + lastTwoDigitsSum}${6 + lastTwoDigitsSum > 9 ? ` -> ${kuaNumber}` : ''}.`;
        formulaHi = `सौर वर्ष ${solarYear} (२०००+) के अंतिम दो अंक: ${tens}+${units} = ${tens + units}। महिला सूत्र: 6 + ${lastTwoDigitsSum} = ${6 + lastTwoDigitsSum}${6 + lastTwoDigitsSum > 9 ? ` -> ${kuaNumber}` : ''}।`;
      }
    }
  }

  const archetype = KUA_ARCHETYPES[kuaNumber] || KUA_ARCHETYPES[1];

  return {
    kuaNumber,
    solarYear,
    isSolarYearAdjusted,
    gender,
    lastTwoDigits,
    lastTwoDigitsSum,
    element: archetype.element,
    elementHi: archetype.elementHi,
    trigram: archetype.trigram,
    trigramHi: archetype.trigramHi,
    direction: archetype.direction,
    directionHi: archetype.directionHi,
    group: archetype.group,
    groupHi: archetype.groupHi,
    formulaEn,
    formulaHi,
    favorableDirections: archetype.favorableDirections,
    favorableDirectionsHi: archetype.favorableDirectionsHi
  };
}

// Calculate Full Numerology Profile from Date of Birth
export function calculateNumerologyProfile(
  day: number,
  month: number,
  year: number,
  gender: 'male' | 'female' = 'male',
  includeKua: boolean = false
): NumerologyProfile {
  // Mulank (Driver): day reduced to 1-9
  const driverNumber = reduceToSingleDigit(day);

  // Bhagyank (Conductor): sum of all digits DD + MM + YYYY
  const dateStr = `${day}${month}${year}`;
  const sumAll = dateStr
    .split('')
    .reduce((acc, ch) => acc + parseInt(ch, 10), 0);
  const conductorNumber = reduceToSingleDigit(sumAll);

  // Kua Number calculation (accurate last two digits + Chinese solar year cut-off algorithm)
  const kuaDetails = calculateKuaNumber(day, month, year, gender);
  const kuaNumber = kuaDetails.kuaNumber;

  // Lo-Shu Grid Counts
  // In authentic Vedic & Classical Lo-Shu numerology:
  // 1. All non-zero digits of Date of Birth (Day, Month, Full Year)
  // 2. Driver Number (Mulank) — essential soul vibration.
  //    - If day is compound (11-31), day digits are entered AND reduced Driver is entered (e.g. 14 -> 1, 4 + Driver 5).
  //    - If day is single-digit (1-9) or 10/20/30, the single digit already embodies the Driver.
  // 3. Conductor Number (Bhagyank) — life path destiny vibration, always entered.
  // 4. Optionally Kua Number — directional energy pillar.
  const loshuDigits: number[] = [];
  const digitSources: Record<number, string[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []
  };

  // Add day digits
  if (day > 9) {
    day.toString().split('').forEach(d => {
      const val = parseInt(d, 10);
      if (val > 0) {
        loshuDigits.push(val);
        digitSources[val].push(`Day (${day})`);
      }
    });

    // Add Driver / Mulank for compound dates (e.g., 14 -> 5, 23 -> 5, 15 -> 6)
    // For 10, 20, 30, the single non-zero digit already entered is the Driver.
    if (day !== 10 && day !== 20 && day !== 30 && driverNumber > 0) {
      loshuDigits.push(driverNumber);
      digitSources[driverNumber].push(`Driver / Mulank (${driverNumber})`);
    } else if (driverNumber > 0) {
      digitSources[driverNumber].push(`Driver / Mulank (${driverNumber})`);
    }
  } else {
    // Single-digit birth day (1-9): Day itself embodies the Driver / Mulank
    if (driverNumber > 0) {
      loshuDigits.push(driverNumber);
      digitSources[driverNumber].push(`Day & Driver (${driverNumber})`);
    }
  }

  // Add month digits
  month.toString().split('').forEach(d => {
    const val = parseInt(d, 10);
    if (val > 0) {
      loshuDigits.push(val);
      digitSources[val].push(`Month (${month})`);
    }
  });

  // Add year digits
  year.toString().split('').forEach(d => {
    const val = parseInt(d, 10);
    if (val > 0) {
      loshuDigits.push(val);
      digitSources[val].push(`Year (${year})`);
    }
  });

  // Add Conductor (Bhagyank)
  if (conductorNumber > 0) {
    loshuDigits.push(conductorNumber);
    digitSources[conductorNumber].push(`Conductor / Bhagyank (${conductorNumber})`);
  }

  // Add Kua Number if option enabled
  if (includeKua && kuaNumber > 0) {
    loshuDigits.push(kuaNumber);
    digitSources[kuaNumber].push(`Kua Number (${kuaNumber})`);
  }

  const loShuCounts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  loshuDigits.forEach(num => {
    if (num >= 1 && num <= 9) {
      loShuCounts[num] = (loShuCounts[num] || 0) + 1;
    }
  });

  const presentNumbers = Object.keys(loShuCounts)
    .map(Number)
    .filter(n => loShuCounts[n] > 0);

  const missingNumbers = Object.keys(loShuCounts)
    .map(Number)
    .filter(n => loShuCounts[n] === 0);

  const driverData = PLANETARY_ARCHETYPES[driverNumber];
  const conductorData = PLANETARY_ARCHETYPES[conductorNumber];

  const strengths = [
    `Driver ${driverNumber} (${driverData.planet}): Endowed with innate ${driverData.traits.slice(0, 3).join(', ')}.`,
    `Conductor ${conductorNumber} (${conductorData.planet}): Life destiny is steered towards ${conductorData.traits.slice(0, 3).join(', ')}.`,
    ...presentNumbers.slice(0, 3).map(num => `Active Vibration ${num}: Boosts ${PLANETARY_ARCHETYPES[num].planet} energy in your life grid.`)
  ];

  const challenges: string[] = [];
  if (driverData.enemy.includes(conductorNumber)) {
    challenges.push(`Driver ${driverNumber} and Conductor ${conductorNumber} are in natural friction. Name correction and remedy watches are strongly advised to bridge this vibration.`);
  }
  missingNumbers.forEach(m => {
    challenges.push(`Missing Number ${m}: May cause gaps in ${PLANETARY_ARCHETYPES[m].element} element and ${PLANETARY_ARCHETYPES[m].traits[0]} attributes.`);
  });

  const remedies: string[] = [];
  missingNumbers.slice(0, 3).forEach(m => {
    const rem = MISSING_NUMBER_REMEDIES[m];
    if (rem && rem.remedies.length > 0) {
      remedies.push(`${rem.title}: ${rem.remedies[0]}`);
    }
  });

  return {
    day,
    month,
    year,
    driverNumber,
    conductorNumber,
    kuaNumber,
    kuaDetails,
    includeKua,
    digitSources,
    loShuCounts,
    presentNumbers,
    missingNumbers,
    strengths,
    challenges,
    remedies,
    luckyDays: Array.from(new Set([...driverData.luckyDays, ...conductorData.luckyDays])),
    luckyColors: [driverData.luckyColor, conductorData.luckyColor],
    luckyGems: [driverData.gemstone, conductorData.gemstone],
    friendlyNumbers: driverData.friendly,
    enemyNumbers: driverData.enemy,
    neutralNumbers: driverData.neutral
  };
}
