import { NumerologyProfile } from '../types';

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

// Calculate Full Numerology Profile from Date of Birth
export function calculateNumerologyProfile(day: number, month: number, year: number, gender: 'male' | 'female' = 'male'): NumerologyProfile {
  // Mulank (Driver): day reduced to 1-9
  const driverNumber = reduceToSingleDigit(day);

  // Bhagyank (Conductor): sum of all digits DD + MM + YYYY
  const dateStr = `${day}${month}${year}`;
  const sumAll = dateStr
    .split('')
    .reduce((acc, ch) => acc + parseInt(ch, 10), 0);
  const conductorNumber = reduceToSingleDigit(sumAll);

  // Kua Number calculation
  // Year reduced to single digit
  const yearSum = reduceToSingleDigit(
    year.toString().split('').reduce((acc, ch) => acc + parseInt(ch, 10), 0)
  );
  let kuaNumber: number;
  if (gender === 'male') {
    // Male: 11 - yearSum (for 2000+: 9 - yearSum or 10 - yearSum depending on system, standard Vedic/Fengshui is:
    // Before 2000: 10 - yearSum. 2000 onwards: 9 - yearSum)
    kuaNumber = year >= 2000 ? 9 - yearSum : 10 - yearSum;
    if (kuaNumber <= 0) kuaNumber += 9;
    kuaNumber = reduceToSingleDigit(kuaNumber);
    if (kuaNumber === 5) kuaNumber = 2; // For male, 5 becomes 2
  } else {
    // Female: Before 2000: yearSum + 5. 2000 onwards: yearSum + 6
    kuaNumber = year >= 2000 ? yearSum + 6 : yearSum + 5;
    kuaNumber = reduceToSingleDigit(kuaNumber);
    if (kuaNumber === 5) kuaNumber = 8; // For female, 5 becomes 8
  }

  // Lo-Shu Grid Counts
  // Standard Lo-Shu takes digits of: Day + Month + Year + Kua (optional) + Driver + Conductor
  // Pure Classical Loshu: Day digits, Month digits, Year digits + Conductor
  const loshuDigits: number[] = [];

  // Add day digits
  day.toString().split('').forEach(d => {
    const val = parseInt(d, 10);
    if (val > 0) loshuDigits.push(val);
  });
  // Add month digits
  month.toString().split('').forEach(d => {
    const val = parseInt(d, 10);
    if (val > 0) loshuDigits.push(val);
  });
  // Add year digits
  year.toString().split('').forEach(d => {
    const val = parseInt(d, 10);
    if (val > 0) loshuDigits.push(val);
  });
  // Add Conductor (Bhagyank)
  if (conductorNumber > 0) {
    loshuDigits.push(conductorNumber);
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
