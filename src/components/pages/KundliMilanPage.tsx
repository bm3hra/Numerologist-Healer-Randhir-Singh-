import React, { useState } from 'react';
import {
  Heart,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Compass,
  Calendar,
  Layers,
  Shield,
  Star,
  FileCheck2,
  Clock,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { calculateNumerologyProfile, PLANETARY_ARCHETYPES } from '../../data/numerologyData';
import { Language } from '../../types';

interface KundliMilanPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToPage: (pageId: string) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

export const KundliMilanPage: React.FC<KundliMilanPageProps> = ({
  lang,
  onNavigateHome,
  onNavigateToPage,
  onOpenBooking
}) => {
  const [matchType, setMatchType] = useState<'marriage' | 'business' | 'partner'>('marriage');

  // Person A (Groom / Partner 1)
  const [nameA, setNameA] = useState('Rahul Sharma');
  const [dayA, setDayA] = useState(15);
  const [monthA, setMonthA] = useState(8);
  const [yearA, setYearA] = useState(1993);
  const [genderA, setGenderA] = useState<'male' | 'female'>('male');

  // Person B (Bride / Partner 2)
  const [nameB, setNameB] = useState('Priya Sharma');
  const [dayB, setDayB] = useState(24);
  const [monthB, setMonthB] = useState(6);
  const [yearB, setYearB] = useState(1996);
  const [genderB, setGenderB] = useState<'male' | 'female'>('female');

  const profileA = calculateNumerologyProfile(dayA, monthA, yearA, genderA);
  const profileB = calculateNumerologyProfile(dayB, monthB, yearB, genderB);

  // 36-Point Guna Milan Calculation
  const driverA = profileA.driverNumber;
  const driverB = profileB.driverNumber;
  const condA = profileA.conductorNumber;
  const condB = profileB.conductorNumber;

  // 1. Driver Match (max 6 pts)
  let driverPts = 3.5;
  if (PLANETARY_ARCHETYPES[driverA].friendly.includes(driverB)) driverPts = 6;
  else if (PLANETARY_ARCHETYPES[driverA].neutral.includes(driverB)) driverPts = 4.5;
  else if (PLANETARY_ARCHETYPES[driverA].enemy.includes(driverB)) driverPts = 1.5;

  // 2. Conductor Match (max 7 pts)
  let condPts = 4.5;
  if (PLANETARY_ARCHETYPES[condA].friendly.includes(condB)) condPts = 7;
  else if (PLANETARY_ARCHETYPES[condA].neutral.includes(condB)) condPts = 5;
  else if (PLANETARY_ARCHETYPES[condA].enemy.includes(condB)) condPts = 2;

  // 3. Grid Mutual Completion (max 8 pts)
  const bFillsA = profileA.missingNumbers.filter((n) => profileB.presentNumbers.includes(n));
  const aFillsB = profileB.missingNumbers.filter((n) => profileA.presentNumbers.includes(n));
  const totalMutualFills = bFillsA.length + aFillsB.length;
  const gridPts = Math.min(8, Math.max(3, totalMutualFills * 1.5));

  // 4. Kua Directional Energy (max 5 pts)
  const kuaPts = (profileA.kuaNumber + profileB.kuaNumber) % 2 === 0 ? 5 : 3.5;

  // 5. Emotional Plane (3-5-7) (max 5 pts)
  const emotionalCountA = (profileA.loShuCounts[3] || 0) + (profileA.loShuCounts[5] || 0) + (profileA.loShuCounts[7] || 0);
  const emotionalCountB = (profileB.loShuCounts[3] || 0) + (profileB.loShuCounts[5] || 0) + (profileB.loShuCounts[7] || 0);
  const emotionalPts = Math.abs(emotionalCountA - emotionalCountB) <= 2 ? 5 : 3;

  // 6. Wealth & Prosperity Raj Yoga Synergy (4-5-6 or 2-5-8) (max 5 pts)
  const combinedNumbers = new Set([...profileA.presentNumbers, ...profileB.presentNumbers]);
  const hasGoldenYoga = combinedNumbers.has(4) && combinedNumbers.has(5) && combinedNumbers.has(6);
  const hasSilverYoga = combinedNumbers.has(2) && combinedNumbers.has(5) && combinedNumbers.has(8);
  const wealthPts = hasGoldenYoga && hasSilverYoga ? 5 : hasGoldenYoga || hasSilverYoga ? 4 : 2.5;

  const totalPoints = Math.round((driverPts + condPts + gridPts + kuaPts + emotionalPts + wealthPts) * 10) / 10;

  // Verdict category
  let verdictEn = 'Uttam (Extraordinary Harmony)';
  let verdictHi = 'अति उत्तम (दिव्य एवं अत्यंत शुभ योग)';
  let verdictColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  if (totalPoints < 18) {
    verdictEn = 'Niyantrit (Remedies Strongly Advised)';
    verdictHi = 'नियंत्रित (उपाय अनिवार्य)';
    verdictColor = 'text-rose-700 bg-rose-50 border-rose-300';
  } else if (totalPoints < 25) {
    verdictEn = 'Madhyam (Average - Specific Adjustments Needed)';
    verdictHi = 'मध्यम (विशिष्ट सुधार आवश्यक)';
    verdictColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else if (totalPoints < 30) {
    verdictEn = 'Shreshtha (Very Good Compatibility)';
    verdictHi = 'श्रेष्ठ (शुभ एवं अनुकूल संबंध)';
    verdictColor = 'text-teal-700 bg-teal-50 border-teal-300';
  }

  const loshuPositions = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  return (
    <div className="min-h-screen bg-[#faf6ee] text-stone-900 pb-20">
      {/* Top Breadcrumb & Page Switcher */}
      <div className="bg-white border-b border-amber-200/80 sticky top-14 sm:top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-amber-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-700" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="font-bold text-amber-950 truncate">
              {lang === 'hi' ? 'अंक ज्योतिष कुंडली मिलान' : 'Kundli Milan as per Numerology'}
            </span>
          </div>

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-medium">
            <button
              onClick={() => onNavigateToPage('yantra-healings')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'यंत्र हीलिंग विज्ञान' : 'Yantra Healings'}
            </button>
            <button
              onClick={() => onNavigateToPage('special-yantras')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'विशेष यंत्र (व्यापार/नौकरी)' : 'Special Yantras'}
            </button>
            <button
              onClick={() => onNavigateToPage('dob-yantras')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'जन्मतिथि अनुसार यंत्र' : 'DOB Yantras'}
            </button>
            <button
              onClick={() => onNavigateToPage('and-more')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'और भी... (रेमेडीज वॉल्ट)' : 'And More....'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f7f2e5] via-[#faf6ee] to-[#fbf8f0] py-12 sm:py-16 border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-950 px-4 py-1.5 rounded-full border border-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === 'hi' ? '36 गुण वैदिक अंक ज्योतिष मिलान' : '36-Point Vedic Numerological Matchmaking'}</span>
          </div>

          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
            {lang === 'hi' ? 'अंक ज्योतिष कुंडली मिलान' : 'Kundli Milan as per Numerology'}
          </h1>

          <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-4 tracking-wide">
            {lang === 'hi'
              ? 'विवाह, दांपत्य जीवन एवं व्यापारिक साझेदारी हेतु 36-बिंदु अष्टकूट वैज्ञानिक मिलान'
              : 'Cross-Analyzing Driver, Conductor & Dual Lo-Shu Magic Grids for Marriage & Business Partners'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'पारंपरिक पंचांग मिलान के साथ-साथ जन्मतिथि का लो-शू ग्रिड मिलान यह स्पष्ट कर देता है कि दोनों व्यक्तियों के बीच स्वभाव, आर्थिक ईमानदारी, संतान सुख एवं दीर्घकालिक प्रेम कैसा रहेगा। यदि कोई दोष हो, तो मास्टर रणधीर सिंह उसके अचूक निवारक उपाय बताते हैं।'
              : 'Evaluates subconscious temperament, emotional resonance, financial honesty, and complementary missing numbers across both partners. Unlocks practical remedial solutions for differences.'}
          </p>

          {/* Relationship Type Selector */}
          <div className="flex justify-center mt-8">
            <div className="bg-white p-1 rounded-2xl border border-amber-300 shadow-sm inline-flex items-center gap-1">
              {[
                { id: 'marriage', labelEn: '1. Marriage / Life Partners', labelHi: '1. दांपत्य / विवाह मिलान', icon: Heart },
                { id: 'business', labelEn: '2. Business Partnership', labelHi: '2. व्यापारिक साझेदार मिलान', icon: Briefcase },
                { id: 'partner', labelEn: '3. Team & Key Collaborators', labelHi: '3. प्रमुख सहयोगी चयन', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMatchType(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      matchType === tab.id
                        ? 'bg-amber-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{lang === 'hi' ? tab.labelHi : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Inputs Section: Person A & Person B */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card: Person A */}
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {matchType === 'marriage' ? 'Groom / Person A (वर)' : 'Partner 1 (प्रथम साझेदार)'}
              </span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded">
                Driver {profileA.driverNumber} · Conductor {profileA.conductorNumber}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameA}
                  onChange={(e) => setNameA(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Day (दिन)</label>
                  <select
                    value={dayA}
                    onChange={(e) => setDayA(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Month (माह)</label>
                  <select
                    value={monthA}
                    onChange={(e) => setMonthA(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Year (वर्ष)</label>
                  <input
                    type="number"
                    value={yearA}
                    onChange={(e) => setYearA(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Person B */}
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {matchType === 'marriage' ? 'Bride / Person B (कन्या)' : 'Partner 2 (द्वितीय साझेदार)'}
              </span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded">
                Driver {profileB.driverNumber} · Conductor {profileB.conductorNumber}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameB}
                  onChange={(e) => setNameB(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Day (दिन)</label>
                  <select
                    value={dayB}
                    onChange={(e) => setDayB(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Month (माह)</label>
                  <select
                    value={monthB}
                    onChange={(e) => setMonthB(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Year (वर्ष)</label>
                  <input
                    type="number"
                    value={yearB}
                    onChange={(e) => setYearB(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-stone-300 bg-[#fcfaf5] text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 36-Point Kundli Score Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/40 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Official Numerological Ashta-Kuta Compatibility Index
              </span>
              <h3 className="font-sacred text-2xl sm:text-3xl font-black text-white mt-1">
                {nameA} &amp; {nameB}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                Drivers: {driverA} &amp; {driverB} · Conductors: {condA} &amp; {condB}
              </p>
            </div>

            {/* Score Box */}
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-amber-400/50">
              <div className="text-center">
                <span className="text-4xl sm:text-5xl font-black font-mono text-amber-400">
                  {totalPoints}
                </span>
                <span className="text-stone-400 text-base"> / 36</span>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Guna Points</div>
              </div>

              <div className={`px-4 py-2 rounded-xl border font-bold text-xs sm:text-sm ${verdictColor}`}>
                {lang === 'hi' ? verdictHi : verdictEn}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Sub-Metrics Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            {
              title: '1. Driver Chemistry (स्वभाव व मानसिक मेल)',
              score: `${driverPts} / 6`,
              desc: `Driver ${driverA} (${PLANETARY_ARCHETYPES[driverA].planet}) and Driver ${driverB} (${PLANETARY_ARCHETYPES[driverB].planet})`
            },
            {
              title: '2. Conductor Alignment (भाग्य व कर्म मेल)',
              score: `${condPts} / 7`,
              desc: `Conductor ${condA} and Conductor ${condB} life milestone synchronization`
            },
            {
              title: '3. Lo-Shu Complement (परस्पर ग्रिड पूर्ति)',
              score: `${gridPts} / 8`,
              desc: `${totalMutualFills} missing numbers filled across both individual grids`
            },
            {
              title: '4. Kua Energy (दिशात्मक ऊर्जा सामंजस्य)',
              score: `${kuaPts} / 5`,
              desc: `Kua numbers ${profileA.kuaNumber} and ${profileB.kuaNumber} bedroom Vastu resonance`
            },
            {
              title: '5. Emotional Plane (3-5-7 भावनात्मक मेल)',
              score: `${emotionalPts} / 5`,
              desc: 'Balanced communication and empathy during domestic stress'
            },
            {
              title: '6. Prosperity & Raj Yoga (आर्थिक संवृद्धि)',
              score: `${wealthPts} / 5`,
              desc: hasGoldenYoga || hasSilverYoga ? 'Active Raj Yoga created in combined union' : 'Co-financial growth with yantric support'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sacred font-bold text-xs text-stone-900">{item.title}</span>
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.score}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Side-by-Side Dual Lo-Shu Grids */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">
              Visual Comparative Energy Overlay
            </span>
            <h3 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
              Lo-Shu Grids: Person A vs Person B vs Combined Union
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grid A */}
            <div className="bg-[#faf6ee] p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-3">
                {nameA}’s Grid
              </span>
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                {loshuPositions.map((row, rIdx) =>
                  row.map((num) => {
                    const cnt = profileA.loShuCounts[num] || 0;
                    return (
                      <div
                        key={num}
                        className={`aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                          cnt > 0 ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-400 border border-dashed border-stone-300'
                        }`}
                      >
                        {cnt > 0 ? num : '-'}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Grid B */}
            <div className="bg-[#faf6ee] p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-3">
                {nameB}’s Grid
              </span>
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                {loshuPositions.map((row, rIdx) =>
                  row.map((num) => {
                    const cnt = profileB.loShuCounts[num] || 0;
                    return (
                      <div
                        key={num}
                        className={`aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                          cnt > 0 ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-400 border border-dashed border-stone-300'
                        }`}
                      >
                        {cnt > 0 ? num : '-'}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Combined Union Grid */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-2xl border-2 border-amber-400 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-3">
                Combined Union Synergy
              </span>
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                {loshuPositions.map((row, rIdx) =>
                  row.map((num) => {
                    const present = combinedNumbers.has(num);
                    return (
                      <div
                        key={num}
                        className={`aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                          present ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-stone-400 border border-dashed border-stone-300'
                        }`}
                      >
                        {present ? num : '-'}
                      </div>
                    );
                  })
                )}
              </div>
              <span className="text-[10px] text-emerald-800 font-bold block mt-3">
                {combinedNumbers.size} / 9 Numbers Active Together
              </span>
            </div>
          </div>
        </div>

        {/* Personalized Remedy Consultation CTA */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Master Randhir Singh’s Astrological Remedy Protocol
            </span>
            <h4 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
              Need Personal Advice on Delayed Marriage, Doshas or Friction?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Get an in-depth relationship consultation with custom watch analysis for both partners, bedroom color frequencies, and sacred Bhojpatra Yantra remedies to guarantee lifelong harmony.
            </p>
          </div>

          <button
            onClick={() =>
              onOpenBooking(
                `Full Numerological Kundli Milan Consultation (${nameA} & ${nameB})`,
                '₹3,500'
              )
            }
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            <Heart className="w-4 h-4 text-rose-300" />
            <span>Book Kundli Milan Reading</span>
          </button>
        </div>
      </section>
    </div>
  );
};
