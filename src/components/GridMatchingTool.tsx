import React, { useState } from 'react';
import {
  Users,
  Heart,
  Briefcase,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
  Compass,
  Check,
  Info,
  Award,
  Zap
} from 'lucide-react';
import {
  calculateNumerologyProfile,
  PLANETARY_ARCHETYPES,
  VEDIC_GRID_POSITIONS,
  VEDIC_PLANETARY_DEITIES,
  VEDIC_PLANES_INFO
} from '../data/numerologyData';
import { Language } from '../types';

interface GridMatchingToolProps {
  lang: Language;
  onBookMatchingSession: (type: string) => void;
}

export const GridMatchingTool: React.FC<GridMatchingToolProps> = ({
  lang,
  onBookMatchingSession
}) => {
  const [matchType, setMatchType] = useState<'marriage' | 'business' | 'employees'>('marriage');
  const [gridMode, setGridMode] = useState<'both' | 'vedic' | 'loshu'>('both');

  // Person A
  const [dayA, setDayA] = useState<number>(10);
  const [monthA, setMonthA] = useState<number>(4);
  const [yearA, setYearA] = useState<number>(1992);
  const [genderA, setGenderA] = useState<'male' | 'female'>('male');

  // Person B
  const [dayB, setDayB] = useState<number>(23);
  const [monthB, setMonthB] = useState<number>(9);
  const [yearB, setYearB] = useState<number>(1994);
  const [genderB, setGenderB] = useState<'male' | 'female'>('female');

  const profileA = calculateNumerologyProfile(dayA, monthA, yearA, genderA);
  const profileB = calculateNumerologyProfile(dayB, monthB, yearB, genderB);

  // Core numbers
  const driverA = profileA.driverNumber;
  const driverB = profileB.driverNumber;
  const conductorA = profileA.conductorNumber;
  const conductorB = profileB.conductorNumber;

  // Lo-Shu Complementary Numbers
  const loshuBFillsA = profileA.missingNumbers.filter((m) => profileB.presentNumbers.includes(m));
  const loshuAFillsB = profileB.missingNumbers.filter((m) => profileA.presentNumbers.includes(m));

  // Vedic Complementary Numbers (Missing houses healed by partner)
  const vedicBFillsA = profileA.vedicMissingNumbers.filter((m) => profileB.vedicPresentNumbers.includes(m));
  const vedicAFillsB = profileB.vedicMissingNumbers.filter((m) => profileA.vedicPresentNumbers.includes(m));

  // Joint Vedic Planes Analysis
  const jointVedicNumbers = new Set([...profileA.vedicPresentNumbers, ...profileB.vedicPresentNumbers]);
  const jointCompletedPlanes = VEDIC_PLANES_INFO.map((plane) => {
    const isAComplete = plane.numbers.every((n) => profileA.vedicPresentNumbers.includes(n));
    const isBComplete = plane.numbers.every((n) => profileB.vedicPresentNumbers.includes(n));
    const isJointComplete = plane.numbers.every((n) => jointVedicNumbers.has(n));
    const isNewlyCompletedTogether = !isAComplete && !isBComplete && isJointComplete;

    return {
      plane,
      isAComplete,
      isBComplete,
      isJointComplete,
      isNewlyCompletedTogether
    };
  });

  const newlyFormedVedicPlanes = jointCompletedPlanes.filter((p) => p.isNewlyCompletedTogether);

  // Synergy evaluation
  let score = 62;
  const synergyPoints: string[] = [];
  const frictionPoints: string[] = [];

  // Check driver harmony
  if (PLANETARY_ARCHETYPES[driverA].friendly.includes(driverB)) {
    score += 14;
    synergyPoints.push(
      lang === 'hi'
        ? `शुभ मूलांक मैत्री: व्यक्ति A (अंक ${driverA} - ${VEDIC_PLANETARY_DEITIES[driverA]?.nameHi || 'ग्रह'}) और व्यक्ति B (अंक ${driverB} - ${VEDIC_PLANETARY_DEITIES[driverB]?.nameHi || 'ग्रह'}) स्वाभाविक रूप से एक-दूसरे के स्वभाव का सम्मान करते हैं।`
        : `Harmonious Driver Chemistry: Person A (Number ${driverA} - ${PLANETARY_ARCHETYPES[driverA].planet}) and Person B (Number ${driverB} - ${PLANETARY_ARCHETYPES[driverB].planet}) naturally support each other's core temperaments.`
    );
  } else if (PLANETARY_ARCHETYPES[driverA].enemy.includes(driverB)) {
    score -= 12;
    frictionPoints.push(
      lang === 'hi'
        ? `विरोधी मूलांक प्रभाव: अंक ${driverA} और अंक ${driverB} में अहं का टकराव संभव है। रणधीर जी इसके लिए विशेष नामांक या भोजपत्र यंत्र उपाय की सलाह देते हैं।`
        : `Driver Opposition: Number ${driverA} and Number ${driverB} may experience clashes of ego and stubborn viewpoints if remedies are not implemented.`
    );
  }

  // Check conductor destiny harmony
  if (PLANETARY_ARCHETYPES[conductorA].friendly.includes(conductorB)) {
    score += 12;
    synergyPoints.push(
      lang === 'hi'
        ? `भाग्यांक समन्वय: भाग्यांक ${conductorA} और ${conductorB} जीवन के लक्ष्यों और लंबी अवधि की योजनाओं में एकरूपता लाते हैं।`
        : `Aligned Destiny Paths: Conductors ${conductorA} and ${conductorB} navigate life milestones in synchronicity.`
    );
  }

  // Check Kua directional compatibility (East vs West Groups)
  const isEastGroup = (k: number) => [1, 3, 4, 9].includes(k);
  const sameKuaGroup =
    (isEastGroup(profileA.kuaNumber) && isEastGroup(profileB.kuaNumber)) ||
    (!isEastGroup(profileA.kuaNumber) && !isEastGroup(profileB.kuaNumber));
  if (sameKuaGroup) {
    score += 6;
    synergyPoints.push(
      lang === 'hi'
        ? `समान कुआ ऊर्जा: दोनों व्यक्ति ${isEastGroup(profileA.kuaNumber) ? 'पूर्व दिशा समूह (East Group)' : 'पश्चिम दिशा समूह (West Group)'} से जुड़े हैं, जिससे घर, बेडरूम व कार्यस्थल में वास्तु शांति बनी रहती है।`
        : `Harmonious Kua Direction: Person A (Kua ${profileA.kuaNumber}) and Person B (Kua ${profileB.kuaNumber}) both resonate with the ${isEastGroup(profileA.kuaNumber) ? 'East' : 'West'} Group, blessing shared spaces and bedroom with natural Vastu peace.`
    );
  } else {
    frictionPoints.push(
      lang === 'hi'
        ? `विपरीत कुआ दिशाएं: कुआ ${profileA.kuaNumber} (${isEastGroup(profileA.kuaNumber) ? 'पूर्व समूह' : 'पश्चिम समूह'}) और कुआ ${profileB.kuaNumber} (${isEastGroup(profileB.kuaNumber) ? 'पूर्व समूह' : 'पश्चिम समूह'})। बेडरूम में सिरहाने की सही दिशा के लिए सरल वास्तु उपाय की सलाह दी जाती है।`
        : `Opposite Kua Directions: Kua ${profileA.kuaNumber} (${isEastGroup(profileA.kuaNumber) ? 'East Group' : 'West Group'}) and Kua ${profileB.kuaNumber} (${isEastGroup(profileB.kuaNumber) ? 'East Group' : 'West Group'}). Randhir Ji advises a directional remedy for bedroom headboard alignment.`
    );
  }

  // Lo-Shu mutual healing points
  if (loshuBFillsA.length > 0) {
    score += Math.min(8, loshuBFillsA.length * 2.5);
    synergyPoints.push(
      lang === 'hi'
        ? `लो-शू पूरक ऊर्जा: पार्टनर B पार्टनर A के लो-शू ग्रिड के मिसिंग (खाली) अंक [${loshuBFillsA.join(', ')}] की कमी को पूरा करता है।`
        : `Lo-Shu Mutual Grid Blessing: Person B fills missing numbers [${loshuBFillsA.join(', ')}] in Person A's grid, creating psychological wholeness.`
    );
  }
  if (loshuAFillsB.length > 0) {
    score += Math.min(8, loshuAFillsB.length * 2.5);
    synergyPoints.push(
      lang === 'hi'
        ? `लो-शू परस्पर संतुलन: पार्टनर A पार्टनर B के लो-शू ग्रिड के मिसिंग (खाली) अंक [${loshuAFillsB.join(', ')}] को पूरा करता है।`
        : `Lo-Shu Mutual Balance: Person A activates missing numbers [${loshuAFillsB.join(', ')}] in Person B's grid.`
    );
  }

  // Vedic mutual healing points
  if (vedicBFillsA.length > 0) {
    score += Math.min(8, vedicBFillsA.length * 2.5);
    synergyPoints.push(
      lang === 'hi'
        ? `वैदिक नवग्रह पूरकता: पार्टनर B पार्टनर A के वैदिक ग्रिड के खाली ग्रह घरों [${vedicBFillsA.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.nameHi}`).join(', ')}] को अपनी ऊर्जा से पूरा करता है।`
        : `Vedic Navagraha Synergy: Partner B awakens missing houses [${vedicBFillsA.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.name}`).join(', ')}] in Partner A's Vedic Kundali.`
    );
  }
  if (vedicAFillsB.length > 0) {
    score += Math.min(8, vedicAFillsB.length * 2.5);
    synergyPoints.push(
      lang === 'hi'
        ? `वैदिक नवग्रह संवर्धन: पार्टनर A पार्टनर B के वैदिक ग्रिड के खाली ग्रह घरों [${vedicAFillsB.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.nameHi}`).join(', ')}] की ऊर्जा को पूरा करता है।`
        : `Vedic House Enhancement: Partner A completes missing houses [${vedicAFillsB.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.name}`).join(', ')}] in Partner B's chart.`
    );
  }

  // Newly formed joint Vedic planes
  if (newlyFormedVedicPlanes.length > 0) {
    score += Math.min(10, newlyFormedVedicPlanes.length * 4);
    newlyFormedVedicPlanes.forEach(({ plane }) => {
      synergyPoints.push(
        lang === 'hi'
          ? `दोनों के मिलने से शुभ महायोग पूर्ण: दोनों मिलकर "${plane.nameHi}" बनाते हैं! ${plane.predictionFullHi}`
          : `Sacred Vedic Yoga Formed Jointly: Together, both unite to form "${plane.name}"! ${plane.predictionFull}`
      );
    });
  }

  // Normalize score
  score = Math.min(97, Math.max(50, Math.round(score)));

  const loshuPositions = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  return (
    <section id="grid-matching" className="py-12 sm:py-16 bg-[#faf7f0] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {lang === 'hi' ? 'सेवा #10 · वैदिक एवं लो-शू दोहरा ग्रिड मिलान' : 'Service #10 · Vedic & Lo-Shu Dual Matrix Matching'}
            </span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'ग्रिड मिलान व अनुकूलता विश्लेषण' : 'GRID MATCHING & COMPATIBILITY'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi'
              ? 'विवाह (Marriage) · व्यापारिक साझीदार (Business Partners) · मुख्य कर्मचारी (Key Employees)'
              : 'For Marriage · Business Partners · Key Employees'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'दो व्यक्तियों की जन्मतिथियों का वैदिक अंक कुंडली (3×3) और लो-शू ग्रिड द्वारा आसान मिलान। देखें कि दोनों एक-दूसरे की कमियों को कैसे पूरा करते हैं और मिलकर कौन-सा शुभ योग बनाते हैं।'
              : 'Cross-analyze two birth charts using both the Sanatan 3×3 Vedic Grid and the classic Lo-Shu Matrix. Discover how missing planetary houses are healed and which sacred Yogas are formed jointly.'}
          </p>
        </div>

        {/* Relationship Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-stone-200/70 p-1 rounded-xl flex items-center gap-1 border border-stone-300">
            {[
              { id: 'marriage', labelEn: '1. Marriage / Life Partner', labelHi: '1. वैवाहिक / जीवनसाथी', icon: Heart },
              { id: 'business', labelEn: '2. Business Partners', labelHi: '2. व्यापारिक साझीदार', icon: Briefcase },
              { id: 'employees', labelEn: '3. Employees & Hiring', labelHi: '3. कर्मचारी व नियुक्ति', icon: UserCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMatchType(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    matchType === tab.id
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? tab.labelHi : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Input Form */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Person A */}
            <div className="space-y-4 md:pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">A</span>
                <span>
                  {matchType === 'marriage'
                    ? lang === 'hi' ? 'साथी 1 (दूल्हा / स्वयं)' : 'Partner 1 (Groom / Self)'
                    : matchType === 'business'
                    ? lang === 'hi' ? 'साझेदार 1 (डायरेक्टर A)' : 'Partner 1 (Director A)'
                    : lang === 'hi' ? 'नियोक्ता / संस्थापक' : 'Employer / Founder'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Day</label>
                  <select
                    value={dayA}
                    onChange={(e) => setDayA(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Month</label>
                  <select
                    value={monthA}
                    onChange={(e) => setMonthA(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Year</label>
                  <input
                    type="number"
                    value={yearA}
                    onChange={(e) => setYearA(parseInt(e.target.value, 10) || 1990)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Gender</label>
                  <select
                    value={genderA}
                    onChange={(e) => setGenderA(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    <option value="male">{lang === 'hi' ? 'पुरुष' : 'Male'}</option>
                    <option value="female">{lang === 'hi' ? 'स्त्री' : 'Female'}</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-700 leading-relaxed border border-stone-200">
                <strong>{lang === 'hi' ? 'मूलांक (Driver):' : 'Driver:'}</strong> {profileA.driverNumber} (
                {lang === 'hi' ? (VEDIC_PLANETARY_DEITIES[profileA.driverNumber]?.nameHi || 'ग्रह') : PLANETARY_ARCHETYPES[profileA.driverNumber].planet}
                ) · <strong>{lang === 'hi' ? 'भाग्यांक:' : 'Conductor:'}</strong> {profileA.conductorNumber} · <strong>{lang === 'hi' ? 'कुआ अंक:' : 'Kua:'}</strong> {profileA.kuaNumber}
                <div className="text-[11px] text-amber-900 font-medium mt-1">
                  {lang === 'hi' ? 'वैदिक वर्ष अंक (शताब्दी 19 छोड़ कर):' : 'Vedic Year Digits (Century Excluded):'}{' '}
                  [{profileA.vedicYearDigits.join(', ')}]
                </div>
              </div>
            </div>

            {/* Person B */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">B</span>
                <span>
                  {matchType === 'marriage'
                    ? lang === 'hi' ? 'साथी 2 (दुल्हन / जीवनसाथी)' : 'Partner 2 (Bride / Partner)'
                    : matchType === 'business'
                    ? lang === 'hi' ? 'साझेदार 2 (को-फाउंडर)' : 'Partner 2 (Co-Founder)'
                    : lang === 'hi' ? 'कर्मचारी उम्मीदवार' : 'Key Candidate / Employee'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Day</label>
                  <select
                    value={dayB}
                    onChange={(e) => setDayB(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Month</label>
                  <select
                    value={monthB}
                    onChange={(e) => setMonthB(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Year</label>
                  <input
                    type="number"
                    value={yearB}
                    onChange={(e) => setYearB(parseInt(e.target.value, 10) || 1994)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Gender</label>
                  <select
                    value={genderB}
                    onChange={(e) => setGenderB(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    <option value="female">{lang === 'hi' ? 'स्त्री' : 'Female'}</option>
                    <option value="male">{lang === 'hi' ? 'पुरुष' : 'Male'}</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-700 leading-relaxed border border-stone-200">
                <strong>{lang === 'hi' ? 'मूलांक (Driver):' : 'Driver:'}</strong> {profileB.driverNumber} (
                {lang === 'hi' ? (VEDIC_PLANETARY_DEITIES[profileB.driverNumber]?.nameHi || 'ग्रह') : PLANETARY_ARCHETYPES[profileB.driverNumber].planet}
                ) · <strong>{lang === 'hi' ? 'भाग्यांक:' : 'Conductor:'}</strong> {profileB.conductorNumber} · <strong>{lang === 'hi' ? 'कुआ अंक:' : 'Kua:'}</strong> {profileB.kuaNumber}
                <div className="text-[11px] text-amber-900 font-medium mt-1">
                  {lang === 'hi' ? 'वैदिक वर्ष अंक (शताब्दी 19 छोड़ कर):' : 'Vedic Year Digits (Century Excluded):'}{' '}
                  [{profileB.vedicYearDigits.join(', ')}]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix View Filter / Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider mr-2">
            {lang === 'hi' ? 'ग्रिड विन्यास चुनें:' : 'Select Matrix View:'}
          </span>
          {[
            { id: 'both', labelEn: 'Both Grids Side-by-Side (Vedic & Lo-Shu)', labelHi: 'वैदिक व लो-शू दोनों ग्रिड (तुलनात्मक)' },
            { id: 'vedic', labelEn: '3×3 Vedic Grid Matrix Only', labelHi: 'केवल 3×3 वैदिक अंक कुंडली' },
            { id: 'loshu', labelEn: '3×3 Lo-Shu Grid Matrix Only', labelHi: 'केवल 3×3 लो-शू ग्रिड' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setGridMode(mode.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                gridMode === mode.id
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
              }`}
            >
              {lang === 'hi' ? mode.labelHi : mode.labelEn}
            </button>
          ))}
        </div>

        {/* VEDIC GRID MATCHING SECTION */}
        {(gridMode === 'both' || gridMode === 'vedic') && (
          <div className="bg-white rounded-2xl border-2 border-amber-400 p-6 sm:p-8 shadow-md max-w-5xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-3 mb-6 gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  {lang === 'hi' ? 'सनातन वैदिक अंक कुंडली मिलान' : 'Sanatan Vedic Kundali Synastry'}
                </span>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? '3×3 नवग्रह वैदिक ग्रिड मिलान' : '3×3 Navagraha Vedic Grid Matching'}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {lang === 'hi'
                    ? 'विन्यास: [3, 1, 9] / [6, 7, 5] / [2, 8, 4] · शताब्दी अंक (जैसे 19) गणना से पूर्णतः पृथक हैं'
                    : 'Navagraha Layout: [3, 1, 9] / [6, 7, 5] / [2, 8, 4] · Century digits (19/20) strictly excluded'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                  {lang === 'hi' ? 'हरे रंग के खाने = साथी द्वारा पूरी हुई कमी' : 'Green cells = Void healed by partner'}
                </span>
              </div>
            </div>

            {/* Dual Vedic Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
              {/* Partner A Vedic Grid */}
              <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/50 p-5 rounded-2xl border-2 border-amber-300 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                      {lang === 'hi' ? 'पार्टनर A: वैदिक अंक कुंडली' : 'Partner A: Vedic Kundali Grid'}
                    </span>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {dayA}/{monthA}/{yearA} · {genderA}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    {lang === 'hi' ? 'मूलांक:' : 'Driver:'} {profileA.driverNumber}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 max-w-[270px] mx-auto">
                  {VEDIC_GRID_POSITIONS.map((row) =>
                    row.map((num) => {
                      const count = profileA.vedicCounts[num] || 0;
                      const isPresent = count > 0;
                      const isFillsFromB = !isPresent && profileB.vedicPresentNumbers.includes(num);
                      const isDriver = num === profileA.driverNumber;
                      const isConductor = num === profileA.conductorNumber;
                      const deity = VEDIC_PLANETARY_DEITIES[num];

                      return (
                        <div
                          key={`vedic-a-${num}`}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-between p-1.5 transition-all relative overflow-hidden ${
                            isPresent
                              ? 'bg-gradient-to-br from-amber-800 to-amber-950 text-white shadow-sm border border-amber-400'
                              : isFillsFromB
                              ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-xs'
                              : 'bg-stone-100 text-stone-400 border border-dashed border-stone-300'
                          }`}
                        >
                          <div className="w-full flex items-center justify-between text-[8px] font-sans px-0.5 leading-none">
                            <span className={`font-bold truncate ${isPresent ? 'text-amber-200' : isFillsFromB ? 'text-emerald-800' : 'text-stone-500'}`}>
                              {lang === 'hi' ? deity?.nameHi.split(' ')[0] : deity?.name.split(' ')[0]}
                            </span>
                            <span className="font-mono text-[7.5px] opacity-75">#{num}</span>
                          </div>

                          <div className="text-sm font-black my-auto">
                            {isPresent ? (
                              Array.from({ length: count }, () => num).join('')
                            ) : isFillsFromB ? (
                              <span className="text-emerald-700 font-extrabold text-xs">+{num}</span>
                            ) : (
                              '-'
                            )}
                          </div>

                          <div className="w-full text-center text-[7.5px] font-bold leading-none">
                            {isDriver && <span className="text-amber-200">Driver</span>}
                            {isConductor && !isDriver && <span className="text-amber-300">Cond</span>}
                            {isFillsFromB && (
                              <span className="text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-black">
                                {lang === 'hi' ? 'B द्वारा पूर्ण' : 'Healed by B'}
                              </span>
                            )}
                            {!isPresent && !isFillsFromB && <span className="text-stone-400">रिक्त</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-stone-600 space-y-1">
                  <div>
                    <span className="font-bold text-amber-950">{lang === 'hi' ? 'उपस्थित वैदिक ग्रह:' : 'Present Vedic Energies:'}</span>{' '}
                    [{profileA.vedicPresentNumbers.join(', ')}]
                  </div>
                  <div>
                    <span className="font-bold text-stone-700">{lang === 'hi' ? 'रिक्त वैदिक कक्ष:' : 'Missing Houses:'}</span>{' '}
                    [{profileA.vedicMissingNumbers.join(', ')}]
                  </div>
                  {vedicBFillsA.length > 0 && (
                    <div className="text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      ✓ {lang === 'hi' ? 'पार्टनर B द्वारा पूर्ण कक्ष:' : 'Houses healed by Partner B:'}{' '}
                      [{vedicBFillsA.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.name}`).join(', ')}]
                    </div>
                  )}
                </div>
              </div>

              {/* Partner B Vedic Grid */}
              <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/50 p-5 rounded-2xl border-2 border-amber-300 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                      {lang === 'hi' ? 'पार्टनर B: वैदिक अंक कुंडली' : 'Partner B: Vedic Kundali Grid'}
                    </span>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {dayB}/{monthB}/{yearB} · {genderB}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    {lang === 'hi' ? 'मूलांक:' : 'Driver:'} {profileB.driverNumber}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 max-w-[270px] mx-auto">
                  {VEDIC_GRID_POSITIONS.map((row) =>
                    row.map((num) => {
                      const count = profileB.vedicCounts[num] || 0;
                      const isPresent = count > 0;
                      const isFillsFromA = !isPresent && profileA.vedicPresentNumbers.includes(num);
                      const isDriver = num === profileB.driverNumber;
                      const isConductor = num === profileB.conductorNumber;
                      const deity = VEDIC_PLANETARY_DEITIES[num];

                      return (
                        <div
                          key={`vedic-b-${num}`}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-between p-1.5 transition-all relative overflow-hidden ${
                            isPresent
                              ? 'bg-gradient-to-br from-stone-850 via-stone-900 to-amber-950 text-white shadow-sm border border-stone-700'
                              : isFillsFromA
                              ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-xs'
                              : 'bg-stone-100 text-stone-400 border border-dashed border-stone-300'
                          }`}
                        >
                          <div className="w-full flex items-center justify-between text-[8px] font-sans px-0.5 leading-none">
                            <span className={`font-bold truncate ${isPresent ? 'text-amber-200' : isFillsFromA ? 'text-emerald-800' : 'text-stone-500'}`}>
                              {lang === 'hi' ? deity?.nameHi.split(' ')[0] : deity?.name.split(' ')[0]}
                            </span>
                            <span className="font-mono text-[7.5px] opacity-75">#{num}</span>
                          </div>

                          <div className="text-sm font-black my-auto">
                            {isPresent ? (
                              Array.from({ length: count }, () => num).join('')
                            ) : isFillsFromA ? (
                              <span className="text-emerald-700 font-extrabold text-xs">+{num}</span>
                            ) : (
                              '-'
                            )}
                          </div>

                          <div className="w-full text-center text-[7.5px] font-bold leading-none">
                            {isDriver && <span className="text-amber-300">Driver</span>}
                            {isConductor && !isDriver && <span className="text-amber-400">Cond</span>}
                            {isFillsFromA && (
                              <span className="text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-black">
                                {lang === 'hi' ? 'A द्वारा पूर्ण' : 'Healed by A'}
                              </span>
                            )}
                            {!isPresent && !isFillsFromA && <span className="text-stone-400">रिक्त</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-stone-600 space-y-1">
                  <div>
                    <span className="font-bold text-amber-950">{lang === 'hi' ? 'उपस्थित वैदिक ग्रह:' : 'Present Vedic Energies:'}</span>{' '}
                    [{profileB.vedicPresentNumbers.join(', ')}]
                  </div>
                  <div>
                    <span className="font-bold text-stone-700">{lang === 'hi' ? 'रिक्त वैदिक कक्ष:' : 'Missing Houses:'}</span>{' '}
                    [{profileB.vedicMissingNumbers.join(', ')}]
                  </div>
                  {vedicAFillsB.length > 0 && (
                    <div className="text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      ✓ {lang === 'hi' ? 'पार्टनर A द्वारा पूर्ण कक्ष:' : 'Houses healed by Partner A:'}{' '}
                      [{vedicAFillsB.map((n) => `${n} - ${VEDIC_PLANETARY_DEITIES[n]?.name}`).join(', ')}]
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sacred Joint Vedic Planes Completion Section */}
            <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-300">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <h4 className="font-sacred text-base font-bold text-amber-950">
                  {lang === 'hi'
                    ? 'पारस्परिक संयोग से निर्मित वैदिक महायोग (Joint Vedic Planes & Yogas)'
                    : 'Jointly Manifested Vedic Planes & Yogas'}
                </h4>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                {lang === 'hi'
                  ? 'वैदिक अंक शास्त्र में जब दो व्यक्ति जुड़ते हैं, तो उनकी संयुक्त ऊर्जाएं उन तलों को पूर्ण कर देती हैं जो व्यक्तिगत रूप से अपूर्ण थीं। यह विवाह व व्यापारिक सफलता का सबसे सटीक पैमाना है।'
                  : 'In Vedic Numerology, when two destinies merge, their combined planetary vibrations activate planes that neither possessed alone, unlocking wealth, spiritual harmony, and endurance.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {jointCompletedPlanes.map(({ plane, isAComplete, isBComplete, isJointComplete, isNewlyCompletedTogether }) => (
                  <div
                    key={plane.id}
                    className={`p-3 rounded-lg border text-xs transition-all ${
                      isNewlyCompletedTogether
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs ring-1 ring-emerald-300'
                        : isJointComplete
                        ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                        : 'bg-white border-stone-200 text-stone-500 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px]">
                        {lang === 'hi' ? plane.nameHi.split('(')[0] : plane.name.split('(')[0]}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 border border-stone-200">
                        {plane.numbers.join('-')}
                      </span>
                    </div>

                    <div className="text-[10px] text-stone-600 mb-1.5 line-clamp-1">
                      {lang === 'hi' ? plane.planetsHi : plane.planets}
                    </div>

                    <div className="text-[10px] font-semibold">
                      {isNewlyCompletedTogether ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-bold">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {lang === 'hi' ? '★ दोनों के मिलने से पूरा हुआ योग!' : '★ Manifested Jointly!'}
                        </span>
                      ) : isAComplete && isBComplete ? (
                        <span className="text-amber-800">
                          {lang === 'hi' ? 'दोनों में पहले से मौजूद' : 'Present in both charts'}
                        </span>
                      ) : isAComplete ? (
                        <span className="text-stone-700">
                          {lang === 'hi' ? 'पार्टनर A में पूरा' : 'Complete in Partner A'}
                        </span>
                      ) : isBComplete ? (
                        <span className="text-stone-700">
                          {lang === 'hi' ? 'पार्टनर B में पूरा' : 'Complete in Partner B'}
                        </span>
                      ) : (
                        <span className="text-stone-400">
                          {lang === 'hi' ? 'अधूरा (सरल उपाय की सलाह)' : 'Incomplete (Remedy advised)'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LO-SHU GRID MATCHING SECTION */}
        {(gridMode === 'both' || gridMode === 'loshu') && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-5xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-3 mb-6 gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  {lang === 'hi' ? 'पारंपरिक लो-शू ग्रिड अनुकूलता' : 'Classic Lo-Shu Matrix Synastry'}
                </span>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? '3×3 लो-शू ग्रिड मिलान' : '3×3 Lo-Shu Grid Matching'}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {lang === 'hi'
                    ? 'विन्यास: [4, 9, 2] / [3, 5, 7] / [8, 1, 6] · चीनी व पश्चिमी अंक ज्योतिष का प्रामाणिक ढांचा'
                    : 'Layout: [4, 9, 2] / [3, 5, 7] / [8, 1, 6] · Traditional Lo-Shu element balancing'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                  {lang === 'hi' ? 'हरे रंग के अंक = साथी द्वारा पूरी हुई कमी' : 'Green numbers = Gifted by partner'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Partner A Lo-Shu Grid */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-300 text-center">
                <div className="flex items-center justify-between mb-3 text-left">
                  <span className="text-xs font-bold text-amber-950">
                    {lang === 'hi' ? 'पार्टनर A: लो-शू ग्रिड' : 'Partner A: Lo-Shu Grid'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {dayA}/{monthA}/{yearA}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 max-w-[210px] mx-auto">
                  {loshuPositions.map((row) =>
                    row.map((num) => {
                      const count = profileA.loShuCounts[num] || 0;
                      const isFillsFromB = count === 0 && profileB.presentNumbers.includes(num);
                      const isDriver = num === profileA.driverNumber;
                      const isConductor = num === profileA.conductorNumber;

                      return (
                        <div
                          key={`loshu-a-${num}`}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 font-mono text-xs font-bold transition-all ${
                            count > 0
                              ? 'bg-amber-850 text-white shadow-2xs'
                              : isFillsFromB
                              ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-xs'
                              : 'bg-stone-200 text-stone-400 border border-dashed border-stone-300'
                          }`}
                        >
                          <span className="text-[9px] opacity-75">P{num}</span>
                          <span className="text-sm font-black">
                            {count > 0 ? Array.from({ length: count }, () => num).join('') : isFillsFromB ? `+${num}` : '-'}
                          </span>
                          {isDriver && <span className="text-[7px] text-amber-200 leading-none">Driver</span>}
                          {isConductor && !isDriver && <span className="text-[7px] text-amber-200 leading-none">Cond</span>}
                          {isFillsFromB && (
                            <span className="text-[7px] text-emerald-800 font-bold leading-none">
                              {lang === 'hi' ? 'B द्वारा' : 'By B'}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="text-[11px] text-stone-600 mt-3 pt-2 border-t border-amber-200">
                  {lang === 'hi' ? 'लो-शू मिसिंग (खाली) अंक:' : 'Lo-Shu Missing:'} [{profileA.missingNumbers.join(', ')}]
                </div>
              </div>

              {/* Partner B Lo-Shu Grid */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-300 text-center">
                <div className="flex items-center justify-between mb-3 text-left">
                  <span className="text-xs font-bold text-amber-950">
                    {lang === 'hi' ? 'पार्टनर B: लो-शू ग्रिड' : 'Partner B: Lo-Shu Grid'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {dayB}/{monthB}/{yearB}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 max-w-[210px] mx-auto">
                  {loshuPositions.map((row) =>
                    row.map((num) => {
                      const count = profileB.loShuCounts[num] || 0;
                      const isFillsFromA = count === 0 && profileA.presentNumbers.includes(num);
                      const isDriver = num === profileB.driverNumber;
                      const isConductor = num === profileB.conductorNumber;

                      return (
                        <div
                          key={`loshu-b-${num}`}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 font-mono text-xs font-bold transition-all ${
                            count > 0
                              ? 'bg-stone-900 text-white shadow-2xs'
                              : isFillsFromA
                              ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-xs'
                              : 'bg-stone-200 text-stone-400 border border-dashed border-stone-300'
                          }`}
                        >
                          <span className="text-[9px] opacity-75">P{num}</span>
                          <span className="text-sm font-black">
                            {count > 0 ? Array.from({ length: count }, () => num).join('') : isFillsFromA ? `+${num}` : '-'}
                          </span>
                          {isDriver && <span className="text-[7px] text-amber-300 leading-none">Driver</span>}
                          {isConductor && !isDriver && <span className="text-[7px] text-amber-300 leading-none">Cond</span>}
                          {isFillsFromA && (
                            <span className="text-[7px] text-emerald-800 font-bold leading-none">
                              {lang === 'hi' ? 'A द्वारा' : 'By A'}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="text-[11px] text-stone-600 mt-3 pt-2 border-t border-amber-200">
                  {lang === 'hi' ? 'लो-शू मिसिंग (खाली) अंक:' : 'Lo-Shu Missing:'} [{profileB.missingNumbers.join(', ')}]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compatibility Output Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-lg max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-4 mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {lang === 'hi' ? 'आपसी अंक मिलान का नतीजा' : 'Mutual Compatibility Verdict'}
              </span>
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                {score >= 82
                  ? lang === 'hi'
                    ? 'अति शुभ व उत्तम तालमेल (Auspicious Compatibility)'
                    : 'Highly Auspicious Karmic Resonance'
                  : score >= 68
                  ? lang === 'hi'
                    ? 'अनुकूल तालमेल व अच्छी साझेदारी'
                    : 'Favorable Synergy with Minor Balancing'
                  : lang === 'hi'
                  ? 'सावधानी व सरल उपायों की आवश्यकता'
                  : 'Needs Conscious Remedy & Clear Boundaries'}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl sm:text-4xl font-black text-amber-900">
                {score}%
              </span>
              <div className="text-[11px] text-stone-500 font-medium">
                {lang === 'hi' ? 'तालमेल स्कोर (Synergy Score)' : 'Synergy Score'}
              </div>
            </div>
          </div>

          <div className="space-y-5 mb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {lang === 'hi' ? 'सकारात्मक खूबियाँ व शुभ संयोग (Key Strengths):' : 'Key Harmonious Vibrations:'}
              </span>
              <ul className="text-xs text-stone-700 space-y-2 pl-5 list-disc">
                {synergyPoints.map((pt, idx) => (
                  <li key={idx} className="leading-relaxed">{pt}</li>
                ))}
              </ul>
            </div>

            {frictionPoints.length > 0 && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 space-y-2 text-xs text-amber-950">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  {lang === 'hi'
                    ? 'सावधानी व उपाय वाले क्षेत्र (जहाँ ध्यान देने की जरूरत है):'
                    : 'Areas Requiring Conscious Alignment:'}
                </span>
                <ul className="space-y-1.5 pl-5 list-disc">
                  {frictionPoints.map((f, idx) => (
                    <li key={idx} className="leading-relaxed">{f}</li>
                  ))}
                </ul>
                <div className="text-[11px] text-stone-600 pt-1 border-t border-amber-200">
                  {lang === 'hi'
                    ? '💡 रणधीर जी का सुझाव: इन छोटी-मोटी कमियों को नाम सुधार (Name Correction), थेरेपी घड़ी, एवं सिद्ध भोजपत्र यंत्र के आसान उपायों से पूरी तरह ठीक किया जा सकता है।'
                    : '💡 Healer Randhir Singh\'s Note: These friction points are effectively neutralized through custom Name Correction, Consecrated Victorinox Therapy Watch, and energized Bhojpatra Yantras.'}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 text-center sm:text-left">
              {lang === 'hi'
                ? 'विवाह में 36 गुण मिलान, व्यापार में हिस्सेदारी व कोर्ट एग्रीमेंट की शुभ तिथियों के संपूर्ण व्यक्तिगत विश्लेषण हेतु।'
                : 'For complete Vedic Ashtakoot Guna Milan, partnership equity distribution, and auspicious agreement dates.'}
            </span>
            <button
              onClick={() => onBookMatchingSession(`Grid Matching - ${matchType}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-xs shadow-md transition-all hover:scale-[1.01]"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>
                {lang === 'hi' ? 'विस्तृत ग्रिड मिलान परामर्श बुक करें' : 'Book In-Depth Grid Matching Session'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
