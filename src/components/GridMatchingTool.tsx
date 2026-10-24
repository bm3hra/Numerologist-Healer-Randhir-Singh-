import React, { useState } from 'react';
import { Users, Heart, Briefcase, UserCheck, Sparkles, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { calculateNumerologyProfile, PLANETARY_ARCHETYPES } from '../data/numerologyData';
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

  // Synergy evaluation
  const driverA = profileA.driverNumber;
  const driverB = profileB.driverNumber;

  const conductorA = profileA.conductorNumber;
  const conductorB = profileB.conductorNumber;

  let score = 65;
  const synergyPoints: string[] = [];
  const frictionPoints: string[] = [];

  // Check driver harmony
  if (PLANETARY_ARCHETYPES[driverA].friendly.includes(driverB)) {
    score += 15;
    synergyPoints.push(`Harmonious Driver Chemistry: Person A (Number ${driverA} - ${PLANETARY_ARCHETYPES[driverA].planet}) and Person B (Number ${driverB} - ${PLANETARY_ARCHETYPES[driverB].planet}) naturally support each other's core temperaments.`);
  } else if (PLANETARY_ARCHETYPES[driverA].enemy.includes(driverB)) {
    score -= 15;
    frictionPoints.push(`Driver Opposition: Number ${driverA} and Number ${driverB} may experience clashes of ego and stubborn viewpoints if remedies are not implemented.`);
  }

  // Check conductor destiny harmony
  if (PLANETARY_ARCHETYPES[conductorA].friendly.includes(conductorB)) {
    score += 12;
    synergyPoints.push(`Aligned Destiny Paths: Conductors ${conductorA} and ${conductorB} navigate life milestones in synchronicity.`);
  }

  // Check Kua directional compatibility (East vs West Groups)
  const isEastGroup = (k: number) => [1, 3, 4, 9].includes(k);
  const sameKuaGroup =
    (isEastGroup(profileA.kuaNumber) && isEastGroup(profileB.kuaNumber)) ||
    (!isEastGroup(profileA.kuaNumber) && !isEastGroup(profileB.kuaNumber));
  if (sameKuaGroup) {
    score += 8;
    synergyPoints.push(`Harmonious Kua Direction: Person A (Kua ${profileA.kuaNumber}) and Person B (Kua ${profileB.kuaNumber}) both resonate with the ${isEastGroup(profileA.kuaNumber) ? 'East' : 'West'} Group, blessing shared spaces and bedroom with natural Vastu peace.`);
  } else {
    frictionPoints.push(`Opposite Kua Directions: Kua ${profileA.kuaNumber} (${isEastGroup(profileA.kuaNumber) ? 'East Group' : 'West Group'}) and Kua ${profileB.kuaNumber} (${isEastGroup(profileB.kuaNumber) ? 'East Group' : 'West Group'}). Randhir Ji advises a directional remedy for bedroom headboard alignment.`);
  }

  // Check complementary grid numbers
  const mutualCompletedNumbers = profileA.missingNumbers.filter((m) =>
    profileB.presentNumbers.includes(m)
  );

  if (mutualCompletedNumbers.length > 0) {
    score += mutualCompletedNumbers.length * 3;
    synergyPoints.push(`Lo-Shu Mutual Grid Blessing: Person B fills missing numbers [${mutualCompletedNumbers.join(', ')}] in Person A's grid, creating psychological wholeness.`);
  }

  const loshuPositions = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  const bFillsA = profileA.missingNumbers.filter((m) => profileB.presentNumbers.includes(m));
  const aFillsB = profileB.missingNumbers.filter((m) => profileA.presentNumbers.includes(m));

  // Normalize score
  score = Math.min(96, Math.max(48, score));

  return (
    <section id="grid-matching" className="py-12 sm:py-16 bg-[#faf7f0] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>Service #10 · Lo-Shu Dual Matrix Matching</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            GRID MATCHING &amp; COMPATIBILITY
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            For Marriage · Business Partners · Key Employees
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'दो व्यक्तियों की जन्म तिथियों का पारस्परिक लो-शू ग्रिड मिलान यह सुनिश्चित करता है कि उनका संबंध दीर्घकालिक विश्वास, समृद्धि और पूरक ऊर्जा पर आधारित हो।'
              : 'Cross-analyze two birth charts to evaluate emotional compatibility, financial honesty, and complementary elemental balance.'}
          </p>
        </div>

        {/* Relationship Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-200/70 p-1 rounded-xl flex items-center gap-1 border border-stone-300">
            {[
              { id: 'marriage', label: '1. Marriage / Life Partner', icon: Heart },
              { id: 'business', label: '2. Business Partners', icon: Briefcase },
              { id: 'employees', label: '3. Employees & Hiring', icon: UserCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMatchType(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    matchType === tab.id
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Input Form */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Person A */}
            <div className="space-y-4 md:pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">A</span>
                <span>{matchType === 'marriage' ? 'Partner 1 (दूल्हा / स्वयं)' : matchType === 'business' ? 'Partner 1 (Director A)' : 'Employer / Company Founder'}</span>
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                <strong>Driver:</strong> {profileA.driverNumber} ({PLANETARY_ARCHETYPES[profileA.driverNumber].planet}) · <strong>Conductor:</strong> {profileA.conductorNumber} · <strong>Kua:</strong> {profileA.kuaNumber}
              </div>
            </div>

            {/* Person B */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">B</span>
                <span>{matchType === 'marriage' ? 'Partner 2 (दुल्हन / जीवनसाथी)' : matchType === 'business' ? 'Partner 2 (Co-Founder)' : 'Key Candidate / Employee'}</span>
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
                    onChange={(e) => setYearB(parseInt(e.target.value, 10) || 1992)}
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
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                <strong>Driver:</strong> {profileB.driverNumber} ({PLANETARY_ARCHETYPES[profileB.driverNumber].planet}) · <strong>Conductor:</strong> {profileB.conductorNumber} · <strong>Kua:</strong> {profileB.kuaNumber}
              </div>
            </div>
          </div>

          {/* Visual Dual Lo-Shu Grids with Complementary Highlights */}
          <div className="mt-6 pt-6 border-t border-stone-200">
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                Visual Dual Lo-Shu Grid Synastry
              </span>
              <p className="text-xs text-stone-600 mt-1">
                Numbers glowing in emerald are missing voids in one partner's grid that are healed by the other partner!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Partner A Lo-Shu Grid */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-300 text-center">
                <span className="text-xs font-bold text-amber-950 block mb-2">
                  Partner A Lo-Shu Grid ({dayA}/{monthA}/{yearA})
                </span>
                <div className="grid grid-cols-3 gap-2 max-w-[210px] mx-auto">
                  {loshuPositions.map((row) =>
                    row.map((num) => {
                      const count = profileA.loShuCounts[num] || 0;
                      const isFillsFromB = count === 0 && profileB.presentNumbers.includes(num);
                      const isDriver = num === profileA.driverNumber;
                      const isConductor = num === profileA.conductorNumber;

                      return (
                        <div
                          key={num}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 font-mono text-xs font-bold transition-all ${
                            count > 0
                              ? 'bg-amber-800 text-white shadow-2xs'
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
                          {isFillsFromB && <span className="text-[7px] text-emerald-800 font-bold leading-none">By B</span>}
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="text-[10px] text-stone-600 mt-2">
                  Missing: [{profileA.missingNumbers.join(', ')}]
                </div>
              </div>

              {/* Partner B Lo-Shu Grid */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-300 text-center">
                <span className="text-xs font-bold text-amber-950 block mb-2">
                  Partner B Lo-Shu Grid ({dayB}/{monthB}/{yearB})
                </span>
                <div className="grid grid-cols-3 gap-2 max-w-[210px] mx-auto">
                  {loshuPositions.map((row) =>
                    row.map((num) => {
                      const count = profileB.loShuCounts[num] || 0;
                      const isFillsFromA = count === 0 && profileA.presentNumbers.includes(num);
                      const isDriver = num === profileB.driverNumber;
                      const isConductor = num === profileB.conductorNumber;

                      return (
                        <div
                          key={num}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 font-mono text-xs font-bold transition-all ${
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
                          {isFillsFromA && <span className="text-[7px] text-emerald-800 font-bold leading-none">By A</span>}
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="text-[10px] text-stone-600 mt-2">
                  Missing: [{profileB.missingNumbers.join(', ')}]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Output Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-4 mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Mutual Compatibility Verdict
              </span>
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                {score >= 80 ? 'Highly Auspicious Karmic Resonance' : score >= 65 ? 'Favorable Synergy with Minor Balancing' : 'Needs Conscious Remedy & Clear Boundaries'}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl font-black text-amber-900">
                {score}%
              </span>
              <div className="text-[11px] text-stone-500 font-medium">Synergy Score</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Harmonious Vibrations:
              </span>
              <ul className="text-xs text-stone-700 space-y-1.5 pl-5 list-disc">
                {synergyPoints.map((pt, idx) => (
                  <li key={idx} className="leading-relaxed">{pt}</li>
                ))}
              </ul>
            </div>

            {frictionPoints.length > 0 && (
              <div className="bg-amber-100/70 p-3.5 rounded-lg border border-amber-300 space-y-1 text-xs text-amber-950">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  Areas Requiring Conscious Alignment:
                </span>
                <ul className="space-y-1 pl-5 list-disc">
                  {frictionPoints.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600">
              For complete Vedic Ashtakoot Guna Milan and business partnership equity structuring.
            </span>
            <button
              onClick={() => onBookMatchingSession(`Grid Matching - ${matchType}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 px-5 rounded-lg text-xs shadow-sm transition-all"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>Book In-Depth Grid Matching Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
