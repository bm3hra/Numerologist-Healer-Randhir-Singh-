import React, { useState } from 'react';
import { Sparkles, Shield, Droplets, Home, Wind, CheckCircle2, ChevronRight, Info, HeartHandshake } from 'lucide-react';
import { SALT_THERAPY_RITUALS, SALT_THERAPY_PHILOSOPHY } from '../data/saltTherapyData';
import { Language, SaltTherapyRitual } from '../types';

interface SaltTherapySectionProps {
  lang: Language;
  onBookSaltSession: () => void;
}

export const SaltTherapySection: React.FC<SaltTherapySectionProps> = ({
  lang,
  onBookSaltSession
}) => {
  const [selectedRitual, setSelectedRitual] = useState<SaltTherapyRitual>(SALT_THERAPY_RITUALS[0]);

  return (
    <section id="salt-therapy" className="relative py-12 sm:py-16 bg-[#fbf8f2] border-b border-amber-200/80">
      {/* Target anchor for direct #salt URL navigation */}
      <div id="salt" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100/90 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Traditional Holistic Cleansing</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            NEGATIVITY REMOVAL &amp; SALT THERAPY
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {SALT_THERAPY_PHILOSOPHY.tagline}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'सेंधा नमक एवं समुद्री लवण प्राचीन काल से आभा-मंडल (Aura) एवं गृह-वास्तु की भारी व अवरुद्ध तरंगों को सोखने का सबसे सरल और प्राकृतिक माध्यम रहे हैं। जानिए दैनिक जीवन में इसके प्रभावी विधान।'
              : 'Unprocessed mineral salts have been revered across Vedic, Vastu, and esoteric traditions as extraordinary bio-energetic absorbers of psychic fatigue, static stress, and heavy environmental impressions.'}
          </p>
        </div>

        {/* Ethical / Traditional Guidance Notice */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 mb-10 max-w-4xl mx-auto flex items-start gap-3 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Traditional Practice Note:</strong> {SALT_THERAPY_PHILOSOPHY.disclaimer}
          </p>
        </div>

        {/* 4 Ritual Tabs & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Ritual Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-sacred text-xs uppercase tracking-wider text-stone-500 font-bold px-1">
              Select Cleansing Ritual:
            </h3>

            {SALT_THERAPY_RITUALS.map((ritual) => {
              const isSelected = selectedRitual.id === ritual.id;
              return (
                <button
                  key={ritual.id}
                  onClick={() => setSelectedRitual(ritual)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-400'
                      : 'bg-white/60 hover:bg-white border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {ritual.id === 'padabhyanga_foot_soak' && <Droplets className="w-5 h-5" />}
                      {ritual.id === 'space_clearing_threshold' && <Home className="w-5 h-5" />}
                      {ritual.id === 'aura_mist_spray' && <Wind className="w-5 h-5" />}
                      {ritual.id === 'floor_mop_purification' && <Shield className="w-5 h-5" />}
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-bold leading-snug ${
                          isSelected ? 'text-amber-950' : 'text-stone-800'
                        }`}
                      >
                        {lang === 'hi' ? ritual.titleHi : ritual.titleEn}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {ritual.purpose}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-amber-700 translate-x-1' : 'text-stone-400'
                    }`}
                  />
                </button>
              );
            })}

            {/* Special Cleanse Blend Card */}
            <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-amber-100 rounded-xl p-5 border border-amber-400/40 mt-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-sacred text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Specialized Cleansing Salts</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Consult with Randhir Singh for consecrated, mantra-energized cleansing salts infused with natural camphor, cloves, and Vedic herbs for stubborn home disputes and aura replenishment.
              </p>
              <button
                onClick={onBookSaltSession}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold py-2 rounded-lg text-xs transition-colors"
              >
                Request Cleansing Salt Guidance
              </button>
            </div>
          </div>

          {/* Right: Selected Ritual Step-by-Step Procedure */}
          <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-amber-200/90 p-6 sm:p-8 shadow-md">
            <div className="border-b border-amber-100 pb-5 mb-6">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700">
                Traditional Ritual Protocol
              </span>
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                {lang === 'hi' ? selectedRitual.titleHi : selectedRitual.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {selectedRitual.purpose}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-stone-600">
                <span className="bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 font-medium">
                  ⏳ <strong>Duration:</strong> {selectedRitual.duration}
                </span>
                <span className="bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 font-medium">
                  🌅 <strong>Ideal Timing:</strong> {selectedRitual.idealTime}
                </span>
              </div>

              {/* Animated Bio-Energetic Aura Cleansing Wave Graphic */}
              <div className="mt-5 p-3.5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-xl border border-amber-500/40 relative overflow-hidden flex items-center justify-between gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  {/* Expanding Aura Wave Rings */}
                  <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ripple" />
                  <div className="absolute inset-2 rounded-full border border-amber-300/60 animate-ripple" style={{ animationDelay: '1.2s' }} />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-bold text-xs shadow-md z-10 animate-pulse-glow">
                    🧂
                  </div>
                </div>

                <div className="flex-1 text-[11px] space-y-0.5">
                  <div className="text-amber-300 font-bold font-sacred uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Bio-Energetic Ionic Extraction Wave</span>
                  </div>
                  <p className="text-stone-300 text-[10px] leading-relaxed">
                    Unprocessed Himalayan crystals emit negative ions that bond with and neutralize static psychic fatigue, dissolving heavy auric impressions into saline brine.
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients Needed */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                Required Elements &amp; Ingredients:
              </h4>
              <ul className="space-y-1.5">
                {selectedRitual.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Step-by-Step Execution:
              </h4>
              <div className="space-y-3">
                {selectedRitual.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-stone-50/70 p-3 rounded-lg border border-stone-200/70">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Precautions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Primary Benefits:
                </span>
                <ul className="text-xs text-emerald-950 space-y-1 pl-4 list-disc">
                  {selectedRitual.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-100/70 border border-stone-200 rounded-xl p-4">
                <span className="text-xs font-bold text-stone-800 block mb-2">
                  Traditional Precautions:
                </span>
                <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc">
                  {selectedRitual.precautions.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consultant Note */}
            <div className="bg-amber-100/60 rounded-xl p-4 border border-amber-300/70 text-xs text-amber-950 flex items-start gap-3">
              <span className="font-sacred font-bold shrink-0">💡 Note:</span>
              <p className="leading-relaxed">
                {selectedRitual.consultantNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
