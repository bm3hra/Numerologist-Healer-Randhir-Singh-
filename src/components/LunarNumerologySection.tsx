import React, { useState } from 'react';
import { Moon, Sparkles, Compass, CheckCircle2, AlertTriangle, Calendar, Clock, ArrowRight, ShieldCheck, Gem, Droplets } from 'lucide-react';
import { LUNAR_PHASES, getMoonPhaseDetails, MULANK_LUNAR_SYNERGY, MoonPhaseInfo } from '../data/lunarData';
import { PLANETARY_ARCHETYPES } from '../data/numerologyData';
import { Language } from '../types';

interface LunarNumerologySectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const LunarNumerologySection: React.FC<LunarNumerologySectionProps> = ({
  lang,
  onOpenBooking
}) => {
  // Real-time calculation for today
  const [todayLunar] = useState(() => getMoonPhaseDetails(new Date()));
  const [selectedPhase, setSelectedPhase] = useState<MoonPhaseInfo>(todayLunar.currentPhase);
  const [selectedMulank, setSelectedMulank] = useState<number>(5);

  const mulankData = MULANK_LUNAR_SYNERGY[selectedMulank];
  const planetInfo = PLANETARY_ARCHETYPES[selectedMulank];

  const isWaxing = selectedPhase.id.includes('waxing') || selectedPhase.id === 'first_quarter';
  const isFull = selectedPhase.id === 'full_moon';

  return (
    <section id="lunar-numerology" className="py-12 sm:py-16 bg-[#faf6ee] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Moon className="w-3.5 h-3.5 text-amber-700" />
            <span>Cosmic Biorhythms &amp; Chandra Frequencies</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            LUNAR CYCLES &amp; PERSONAL NUMEROLOGY
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Harmonize Your Daily Decisions with Moon Phases &amp; Birth Numbers
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? '“चन्द्रमा मनसो जातः” — चंद्रमा हमारे मन, भावनाओं और अवचेतन स्पंदनों का स्वामी है। जानें कि शुक्ल व कृष्ण पक्ष की चंद्रकलाएँ आपके मूलांक एवं ऊर्जा को प्रतिदिन कैसे प्रभावित करती हैं।'
              : 'The Moon governs fluid prana, emotional tides, and mental clarity. Discover how the 8 lunar phases amplify or ground your core Mulank (Driver number) to guide daily actions.'}
          </p>
        </div>

        {/* Live Real-Time Today's Moon Phase Banner */}
        <div className="bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 text-amber-100 rounded-2xl p-6 sm:p-8 border-2 border-amber-400/70 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center text-4xl shadow-md shrink-0">
                <span>{todayLunar.currentPhase.symbol}</span>
                <span className="text-[10px] text-amber-300 font-mono mt-0.5">
                  {todayLunar.illuminationPercent}% Lit
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 px-2.5 py-0.5 rounded border border-amber-500/30 mb-1">
                  <span>Live Astronomical Phase</span>
                  <span>·</span>
                  <span>{todayLunar.paksha}</span>
                </div>

                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-white">
                  {lang === 'hi' ? todayLunar.currentPhase.nameHi : todayLunar.currentPhase.nameEn}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1 max-w-xl leading-relaxed">
                  <strong>Today's Guidance:</strong> {todayLunar.currentPhase.spiritualTheme}. {todayLunar.currentPhase.numerologyImpact}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setSelectedPhase(todayLunar.currentPhase)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                <span>View Today’s Ritual</span>
              </button>

              <button
                onClick={() => onOpenBooking(`Lunar Guidance - ${todayLunar.currentPhase.nameEn}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-xl text-xs border border-white/20 transition-all"
              >
                <span>Consult on Timing</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Moon Phases Visual Selector Strip */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Explore the 8 Lunar Cycle Phases (चंद्रकलाएँ):
            </span>
            <span className="text-[11px] text-stone-500">
              Click a phase to inspect guidance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {LUNAR_PHASES.map((phase) => {
              const isSelected = selectedPhase.id === phase.id;
              const isLive = todayLunar.currentPhase.id === phase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setSelectedPhase(phase)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between relative ${
                    isSelected
                      ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-500'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 shadow-2xs'
                  }`}
                >
                  {isLive && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest bg-emerald-700 text-white px-1.5 rounded-full">
                      Today
                    </span>
                  )}
                  <span className="text-2xl mb-1">{phase.symbol}</span>
                  <div className="text-[11px] font-bold font-sacred leading-tight truncate w-full">
                    {phase.nameEn.split(' ')[0]}
                  </div>
                  <span
                    className={`text-[9px] font-mono mt-1 ${
                      isSelected ? 'text-amber-300' : 'text-stone-400'
                    }`}
                  >
                    {phase.illuminationRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Deep Dive Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md mb-12">
          <div className="border-b border-amber-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{selectedPhase.symbol}</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedPhase.sanskritName} · {selectedPhase.illuminationRange}
                </span>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? selectedPhase.nameHi : selectedPhase.nameEn}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Vedic Classification</span>
              <span className="text-xs font-bold font-mono text-amber-900">
                {selectedPhase.tithiEn}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Spiritual &amp; Mental Atmosphere:
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {selectedPhase.spiritualTheme}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950">
                <strong className="block font-bold mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  Numerological Frequency Impact:
                </strong>
                <p className="leading-relaxed">{selectedPhase.numerologyImpact}</p>
              </div>

              {/* Recommended Ritual */}
              <div className="p-3.5 bg-gradient-to-r from-amber-900 to-amber-950 text-amber-100 rounded-xl border border-amber-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Prescribed Lunar Ritual:
                </span>
                <p className="text-xs text-amber-100/90 leading-relaxed font-serif italic">
                  "{selectedPhase.recommendedRitual}"
                </p>
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Favored Activities for this Phase:
                </span>
                <ul className="text-xs text-emerald-950 space-y-1.5 pl-4 list-disc">
                  {selectedPhase.idealActivities.map((act, idx) => (
                    <li key={idx} className="leading-snug">{act}</li>
                  ))}
                </ul>
              </div>

              {selectedPhase.cautionPoints.length > 0 && (
                <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-xl">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    Points of Caution:
                  </span>
                  <ul className="text-xs text-amber-900 space-y-1.5 pl-4 list-disc">
                    {selectedPhase.cautionPoints.map((c, idx) => (
                      <li key={idx} className="leading-snug">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PERSONALIZED MULANK (DRIVER 1-9) & MOON SYNERGY ENGINE */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-lg">
          <div className="border-b border-amber-100 pb-4 mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Personalized Lunar Matrix
              </span>
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                Calculate Moon Synergy with Your Driver Number (मूलांक)
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Select your birth day root (1 to 9):
            </span>
          </div>

          {/* 1-9 Number Selector Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              const isCurrent = selectedMulank === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedMulank(num)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-white font-bold border-amber-600 shadow-md ring-2 ring-amber-400'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-2xl font-sacred font-black">{num}</div>
                  <div className="text-[10px] uppercase font-bold truncate mt-0.5">
                    {PLANETARY_ARCHETYPES[num].planet.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mulank Specific Cosmic Guidance Card */}
          <div className="bg-gradient-to-br from-[#fdfbf7] to-amber-50/50 rounded-xl p-6 border border-amber-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-4 mb-5 gap-3">
              <div>
                <span className="text-xs font-bold uppercase text-amber-800">
                  Mulank {selectedMulank} · {planetInfo.planet}
                </span>
                <h4 className="font-sacred text-lg sm:text-xl font-bold text-stone-900">
                  Lunar Resonance Profile for Number {selectedMulank}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-amber-100 text-amber-950 font-bold px-3 py-1 rounded-md border border-amber-300">
                  Ruling Element: {planetInfo.element}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 text-xs text-stone-700">
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                  <span className="text-base">🌒</span>
                  Waxing Moon (Shukla Paksha):
                </span>
                <p className="leading-relaxed">{mulankData.waxingAdvice}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                  <span className="text-base">🌕</span>
                  Full Moon (Purnima Zeniths):
                </span>
                <p className="leading-relaxed">{mulankData.fullMoonAdvice}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                  <span className="text-base">🌘</span>
                  Waning Moon (Krishna Paksha):
                </span>
                <p className="leading-relaxed">{mulankData.waningAdvice}</p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="p-4 bg-white rounded-xl border border-amber-200/90 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>
                  <strong>Auspicious Daily Hora:</strong> {mulankData.bestHour}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-amber-700" />
                <span>
                  <strong>Complementary Crystal:</strong> {mulankData.favCrystal}
                </span>
              </div>

              <button
                onClick={() =>
                  onOpenBooking(
                    `Lunar Alignment Consultation for Mulank ${selectedMulank}`
                  )
                }
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2 px-4 rounded-lg text-xs shadow-xs"
              >
                <span>Book Timing Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
