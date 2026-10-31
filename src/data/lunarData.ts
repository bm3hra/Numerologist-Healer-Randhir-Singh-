export interface MoonPhaseInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  sanskritName: string;
  tithiEn: string;
  tithiHi: string;
  symbol: string;
  illuminationRange: string;
  spiritualTheme: string;
  numerologyImpact: string;
  idealActivities: string[];
  cautionPoints: string[];
  recommendedRitual: string;
}

export const LUNAR_PHASES: MoonPhaseInfo[] = [
  {
    id: 'new_moon',
    nameEn: 'New Moon',
    nameHi: 'अमावस्या (नव चंद्र)',
    sanskritName: 'Amavasya',
    tithiEn: 'Amavasya Tithi',
    tithiHi: 'अमावस्या तिथि',
    symbol: '🌑',
    illuminationRange: '0% - 1%',
    spiritualTheme: 'Introspection, Blank Canvas, Releasing Old Karmic Cycles',
    numerologyImpact: 'Prana turns inward. High-energy numbers (1, 9) may experience temporary low stamina. Water numbers (2, 7) feel deep intuitive stillness.',
    idealActivities: [
      'Write down new month intentions and life goals in a private diary',
      'Perform Himalayan Rock Salt foot bath to dissolve past month fatigue',
      'Cleanse work desks, discard broken items, and reset crystal altars'
    ],
    cautionPoints: [
      'Avoid launching massive commercial advertising campaigns',
      'Refrain from aggressive contract signings or ego confrontations'
    ],
    recommendedRitual: 'Himalayan Rock Salt Foot Soak with 2 drops of Sandalwood oil at twilight.'
  },
  {
    id: 'waxing_crescent',
    nameEn: 'Waxing Crescent',
    nameHi: 'शुक्ल प्रतिपदा से तृतीया (बाल चंद्र)',
    sanskritName: 'Shukla Bal Chandra',
    tithiEn: 'Shukla Pratipada to Tritiya',
    tithiHi: 'शुक्ल प्रतिपदा - तृतीया',
    symbol: '🌒',
    illuminationRange: '2% - 49%',
    spiritualTheme: 'Sprouting Seeds, Hope, First Steps of Manifestation',
    numerologyImpact: 'Awakening energy. Numbers 3 (Jupiter) and 5 (Mercury) experience swift ideation and verbal optimism.',
    idealActivities: [
      'Send proposals, register new domain names, make initial client contact',
      'Begin a 21-day Name Correction chanting cycle (Switchwords)',
      'Purchase new stationery, books, or green plants for North zone'
    ],
    cautionPoints: [
      'Do not rush results; allow the early seedling of your plans to take root'
    ],
    recommendedRitual: 'Chant "GOLDEN-SUNRISE" 28 times facing East at sunrise.'
  },
  {
    id: 'first_quarter',
    nameEn: 'First Quarter (Half Moon)',
    nameHi: 'शुक्ल अष्टमी (प्रथम चतुर्थांश)',
    sanskritName: 'Shukla Ashtami',
    tithiEn: 'Shukla Ashtami',
    tithiHi: 'शुक्ल अष्टमी',
    symbol: '🌓',
    illuminationRange: '50%',
    spiritualTheme: 'Overcoming Friction, Decisive Momentum, Willpower',
    numerologyImpact: 'Internal tension between old comfort and new vision. Numbers 1, 8, and 9 thrive under this decisive pressure.',
    idealActivities: [
      'Tackle delayed administrative tasks, clear pending invoices',
      'Schedule demanding negotiations and legal reviews',
      'Wear Golden Tiger Eye on right wrist to boost courage'
    ],
    cautionPoints: [
      'Watch your temper; lunar pull can trigger impatience in teamwork'
    ],
    recommendedRitual: 'Light a mustard oil lamp facing East and recite Hanuman Chalisa.'
  },
  {
    id: 'waxing_gibbous',
    nameEn: 'Waxing Gibbous',
    nameHi: 'शुक्ल एकादशी से चतुर्दशी (संवर्धन चंद्र)',
    sanskritName: 'Shukla Ekadashi - Chaturdashi',
    tithiEn: 'Shukla Ekadashi to Chaturdashi',
    tithiHi: 'शुक्ल एकादशी - चतुर्दशी',
    symbol: '🌔',
    illuminationRange: '51% - 99%',
    spiritualTheme: 'Refinement, Patience, Magnetic Momentum',
    numerologyImpact: 'High vibrational expansion. Numbers 5 (Mercury) and 6 (Venus) enjoy peak commercial attraction.',
    idealActivities: [
      'Finalize partnerships, approve final product designs, market launches',
      'Conduct Grid Matching for business collaborations',
      'Fast on Ekadashi to purify the astral nervous pathways'
    ],
    cautionPoints: [
      'Avoid overpromising or stretching financial budgets excessively'
    ],
    recommendedRitual: 'Offer water to Tulsi plant and chant "FIND-DIVINE-COUNT-NOW-DONE".'
  },
  {
    id: 'full_moon',
    nameEn: 'Full Moon',
    nameHi: 'पूर्णिमा (पूर्ण चंद्र प्रकाश)',
    sanskritName: 'Purnima',
    tithiEn: 'Purnima Tithi',
    tithiHi: 'पूर्णिमा तिथि',
    symbol: '🌕',
    illuminationRange: '100%',
    spiritualTheme: 'Peak Illumination, Culmination, Overflowing Prana',
    numerologyImpact: 'The absolute energetic zenith. Governed by Number 2 (Moon). High emotional sensitivity. Healers and intuitive seekers experience profound lucidity.',
    idealActivities: [
      'Expose crystals (Pyrite, Amethyst, Quartz) to moonlight overnight for full charging',
      'First activation and wearing of prescribed Therapy Watches on active wrist',
      'Perform Pranic distance healing and gratitude prayers'
    ],
    cautionPoints: [
      'Avoid taking volatile emotional decisions late at night',
      'Avoid alcohol or overly spicy foods that agitate blood pressure'
    ],
    recommendedRitual: 'Charge drinking water in a glass bottle under moonlight; drink next morning.'
  },
  {
    id: 'waning_gibbous',
    nameEn: 'Waning Gibbous (Disseminating)',
    nameHi: 'कृष्ण प्रतिपदा से पंचमी (वितरण चंद्र)',
    sanskritName: 'Krishna Paksha Shuru',
    tithiEn: 'Krishna Pratipada to Panchami',
    tithiHi: 'कृष्ण प्रतिपदा - पंचमी',
    symbol: '🌖',
    illuminationRange: '99% - 51%',
    spiritualTheme: 'Sharing Wisdom, Gratitude, Integration of Harvest',
    numerologyImpact: 'Prana shifts from outward expansion to consolidation. Numbers 3 and 7 excel in mentoring, writing, and counseling.',
    idealActivities: [
      'Publish research, share case studies, mentor junior team members',
      'Distribute gifts or charity to deserving workers and helpers',
      'Re-examine financial savings and debt payoff plans'
    ],
    cautionPoints: [
      'Do not initiate high-risk speculative gambles'
    ],
    recommendedRitual: 'Sprinkle Camphor & Rock Salt mist around living room corners.'
  },
  {
    id: 'last_quarter',
    nameEn: 'Last Quarter (Third Quarter)',
    nameHi: 'कृष्ण अष्टमी (अंतिम चतुर्थांश)',
    sanskritName: 'Krishna Ashtami',
    tithiEn: 'Krishna Ashtami',
    tithiHi: 'कृष्ण अष्टमी',
    symbol: '🌗',
    illuminationRange: '50%',
    spiritualTheme: 'Forgiveness, Breaking Outdated Habits, Karmic Cleansing',
    numerologyImpact: 'Saturnian grounding energy. Numbers 4, 7, and 8 find extraordinary breakthroughs in deep research and inner discipline.',
    idealActivities: [
      'Break addictions, cut toxic energetic cords from past relationships',
      'Conduct space purification with salt mopping (Griha Shuddhi)',
      'Organize accounts, audit bookkeeping, and eliminate waste expenses'
    ],
    cautionPoints: [
      'Avoid harboring old resentments or holding grudges'
    ],
    recommendedRitual: 'Chant "CANCEL-CLEAR-DELETE-PEACE" 21 times while exhaling deeply.'
  },
  {
    id: 'waning_crescent',
    nameEn: 'Waning Crescent (Balsamic Moon)',
    nameHi: 'कृष्ण एकादशी से चतुर्दशी (विश्रांति चंद्र)',
    sanskritName: 'Krishna Chaturdashi',
    tithiEn: 'Krishna Ekadashi to Chaturdashi',
    tithiHi: 'कृष्ण एकादशी - चतुर्दशी',
    symbol: '🌘',
    illuminationRange: '49% - 1%',
    spiritualTheme: 'Deep Rest, Surrender, Divine Hibernation',
    numerologyImpact: 'Low physical prana but supreme psychic sensitivity. All numbers benefit from quiet meditation and nourishing sleep.',
    idealActivities: [
      'Rest, restorative sleep, gentle yoga, and contemplative reading',
      'Prepare for upcoming New Moon intention setting',
      'Soak in warm salt bath to discharge accumulated electromagnetic static'
    ],
    cautionPoints: [
      'Do not push your physical body to exhaustion or sign binding lifetime pacts'
    ],
    recommendedRitual: 'Bedside glass bowl therapy: keep rock salt near pillow to absorb insomnia.'
  }
];

// Calculate approximate real-time moon phase from any Date
export function getMoonPhaseDetails(date: Date = new Date()) {
  // Known reference New Moon: Jan 11, 2024 at 11:57 UTC
  const refDate = new Date(Date.UTC(2024, 0, 11, 11, 57));
  const synodicMonth = 29.53058867; // average lunar cycle in days

  const diffMs = date.getTime() - refDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const phaseDay = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const illuminationFraction = (1 - Math.cos((phaseDay / synodicMonth) * 2 * Math.PI)) / 2;
  const illuminationPercent = Math.round(illuminationFraction * 100);

  let phaseIndex = 0;
  if (phaseDay < 1.84) {
    phaseIndex = 0; // New Moon
  } else if (phaseDay < 7.38) {
    phaseIndex = 1; // Waxing Crescent
  } else if (phaseDay < 9.22) {
    phaseIndex = 2; // First Quarter
  } else if (phaseDay < 13.82) {
    phaseIndex = 3; // Waxing Gibbous
  } else if (phaseDay < 16.61) {
    phaseIndex = 4; // Full Moon
  } else if (phaseDay < 21.15) {
    phaseIndex = 5; // Waning Gibbous
  } else if (phaseDay < 23.99) {
    phaseIndex = 6; // Last Quarter
  } else {
    phaseIndex = 7; // Waning Crescent
  }

  const currentPhase = LUNAR_PHASES[phaseIndex];
  const paksha = phaseDay <= 14.76 ? 'Shukla Paksha (Waxing Light)' : 'Krishna Paksha (Waning Light)';
  const pakshaHi = phaseDay <= 14.76 ? 'शुक्ल पक्ष (बढ़ती चंद्रकला)' : 'कृष्ण पक्ष (घटती चंद्रकला)';

  return {
    phaseDay: Math.round(phaseDay * 10) / 10,
    illuminationPercent,
    currentPhase,
    paksha,
    pakshaHi
  };
}

// Mulank interaction with Lunar Cycle
export const MULANK_LUNAR_SYNERGY: Record<
  number,
  {
    rulingPlanet: string;
    waxingAdvice: string;
    fullMoonAdvice: string;
    waningAdvice: string;
    bestHour: string;
    favCrystal: string;
  }
> = {
  1: {
    rulingPlanet: 'Sun (Surya)',
    waxingAdvice: 'Surging leadership prana. Perfect time to pitch to directors, launch initiatives, and sign career ventures.',
    fullMoonAdvice: 'Solar ego might clash with lunar emotions. Stay humble, drink water from silver glass to balance Pitta heat.',
    waningAdvice: 'Focus on strategic audit, delegating tasks to team, and recharging physical vitality before next cycle.',
    bestHour: 'Sunrise Hora (7:00 AM - 8:30 AM)',
    favCrystal: 'Pyrite & Sunstone'
  },
  2: {
    rulingPlanet: 'Moon (Chandra)',
    waxingAdvice: 'Your innate ruling frequency is rising! Trust intuitive hunches; creative artistic writing flows seamlessly.',
    fullMoonAdvice: 'Peak sensitivity. You are an emotional sponge today. Meditate under moonlight; avoid crowded, noisy places.',
    waningAdvice: 'Deep rest, evening Himalayan salt foot soak to ground overthinking and soothe restless dreams.',
    bestHour: 'Twilight Sandhya Hora (6:30 PM - 8:00 PM)',
    favCrystal: 'Pearl, Moonstone & Clear Quartz'
  },
  3: {
    rulingPlanet: 'Jupiter (Brihaspati)',
    waxingAdvice: 'Wisdom expands effortlessly. Excellent for starting higher study courses, legal counsel, and business mentorship.',
    fullMoonAdvice: 'Profound spiritual clarity. Ideal day to conduct Guru Puja, activate Brihaspati Yantra, or chant Gayatri Mantra.',
    waningAdvice: 'Organize teaching material, review financial portfolios, and weed out unprofitable distractions.',
    bestHour: 'Thursday Morning (8:00 AM - 9:30 AM)',
    favCrystal: 'Citrine & Yellow Sapphire'
  },
  4: {
    rulingPlanet: 'Rahu (North Node)',
    waxingAdvice: 'Out-of-the-box digital innovation. Great for tech software architecture and unconventional breakthroughs.',
    fullMoonAdvice: 'High mental restlessness. Avoid speculative day-trading; ground nervous system with cold water rinses.',
    waningAdvice: 'Your prime focus period. Deep analytical problem solving, debugging, and structural systematization thrive.',
    bestHour: 'Mid-afternoon (2:00 PM - 3:30 PM)',
    favCrystal: 'Hessonite & Black Tourmaline'
  },
  5: {
    rulingPlanet: 'Mercury (Budh)',
    waxingAdvice: 'Supreme merchant charisma! Highest client inquiries, effortless sales closures, and rapid networking turnover.',
    fullMoonAdvice: 'Communication speed reaches climax. Verify contracts twice before dispatching; celebrate team victories.',
    waningAdvice: 'Tidy bookkeeping, clear unread emails, and schedule salt bath relaxation to ease screen fatigue.',
    bestHour: 'Wednesday Morning (9:30 AM - 11:00 AM)',
    favCrystal: 'Green Aventurine & Emerald'
  },
  6: {
    rulingPlanet: 'Venus (Shukra)',
    waxingAdvice: 'Sensual charm and romantic magnetic attraction. Ideal for purchasing luxury items, fashion, and counseling couples.',
    fullMoonAdvice: 'Supreme romantic harmony and artistic inspiration. Perfect evening to wear and activate your Therapy Watch.',
    waningAdvice: 'Declutter your living space and wardrobe. Perform rose-water cleansing to keep auric boundaries sweet.',
    bestHour: 'Friday Twilight (6:00 PM - 7:30 PM)',
    favCrystal: 'Rose Quartz & Opal'
  },
  7: {
    rulingPlanet: 'Ketu (South Node)',
    waxingAdvice: 'Mystical insights and researcher clarity. Favorable for occult investigations and deep academic reading.',
    fullMoonAdvice: 'Direct psychic channel opens. Spiritual visions and deep meditative absorption occur effortlessly.',
    waningAdvice: 'Detachment from worldly drama. Solitary walks in nature and grounding salt soaks bring profound peace.',
    bestHour: 'Brahma Muhurta (4:30 AM - 6:00 AM)',
    favCrystal: 'Cat’s Eye & Amethyst'
  },
  8: {
    rulingPlanet: 'Saturn (Shani)',
    waxingAdvice: 'Build foundations with steady discipline. Favorable for long-term construction contracts and physical labor.',
    fullMoonAdvice: 'Emotional pressure may feel intense. Assist helpers, cleaners, or street animals to alleviate karmic weight.',
    waningAdvice: 'Your most potent power window! Unwavering patience to resolve complex legal disputes and real estate deals.',
    bestHour: 'Saturday Evening (5:30 PM - 7:00 PM)',
    favCrystal: 'Black Tourmaline & Blue Sapphire / Amethyst'
  },
  9: {
    rulingPlanet: 'Mars (Mangal)',
    waxingAdvice: 'Fearless pioneering energy. Conquer procrastinated challenges, launch physical workout routines, and lead.',
    fullMoonAdvice: 'Martian fire meets lunar tide. Guard against hasty anger, reckless driving, or sharp disputes.',
    waningAdvice: 'Channel excess adrenaline into disciplined execution, fitness, and helping family members resolve matters.',
    bestHour: 'Tuesday Noon (11:30 AM - 1:00 PM)',
    favCrystal: 'Red Carnelian & Golden Tiger Eye'
  }
};
