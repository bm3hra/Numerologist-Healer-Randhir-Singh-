import React, { useState } from 'react';
import { Gem, Sparkles, Filter, Briefcase, CheckCircle2, ArrowRight, ShieldCheck, Moon, Sun } from 'lucide-react';
import { CRYSTALS_COLLECTION, PROFESSION_CRYSTAL_MAP } from '../data/crystalTherapyData';
import { Language, CrystalItem } from '../types';

interface CrystalTherapySectionProps {
  lang: Language;
  onBookCrystalSession: (crystalName?: string) => void;
}

export const CrystalTherapySection: React.FC<CrystalTherapySectionProps> = ({
  lang,
  onBookCrystalSession
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [activeCrystal, setActiveCrystal] = useState<CrystalItem>(CRYSTALS_COLLECTION[0]);

  const filteredCrystals = CRYSTALS_COLLECTION.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section id="crystal-therapy" className="relative py-12 sm:py-16 bg-[#faf7f0] border-b border-amber-200/80">
      {/* Target anchor for direct #crystal URL navigation */}
      <div id="crystal" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100/90 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Gem className="w-3.5 h-3.5 text-amber-700" />
            <span>Sacred Mineral Energies · Randhir Singh</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            CRYSTAL THERAPY &amp; PERSONALIZED GUIDANCE
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Discover Crystals. Explore Traditional Practices. Create Your Personal Ritual.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'पृथ्वी के गर्भ में लाखों वर्षों में निर्मित प्राकृतिक क्रिस्टल्स विशिष्ट विद्युत-चुंबकीय आवृत्तियाँ (Electromagnetic Frequencies) उत्सर्जित करते हैं। अपने पेशे, जन्म अंक एवं चक्रों के अनुकूल सही क्रिस्टल धारण करें।'
              : 'Natural earth crystals hold precise geometric crystalline structures that harmonize auric fields. Discover the most auspicious crystal companions for your profession, wealth expansion, and peaceful living.'}
          </p>
        </div>

        {/* Filter Pills / Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Crystals' },
            { id: 'wealth', label: 'Wealth & Business (Pyrite/Citrine)' },
            { id: 'career', label: 'Career Luck (Aventurine/Tiger Eye)' },
            { id: 'protection', label: 'Shield & Nazar (Black Tourmaline)' },
            { id: 'peace', label: 'Mental Peace & Sleep (Amethyst)' },
            { id: 'love', label: 'Heart & Relationships (Rose Quartz)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-900 text-white shadow-sm ring-1 ring-amber-700'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Crystal Grid & Interactive Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCrystals.map((crystal) => {
              const isSelected = activeCrystal.id === crystal.id;
              return (
                <div
                  key={crystal.id}
                  onClick={() => setActiveCrystal(crystal)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-amber-600 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-white/70 hover:bg-white border-stone-200 hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {crystal.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        Ruling Nos: {crystal.rulingNumber.join(', ')}
                      </span>
                    </div>

                    <h3 className="font-sacred font-bold text-stone-900 text-base">
                      {lang === 'hi' ? crystal.nameHi : crystal.nameEn}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                      {crystal.primaryBenefit}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900">
                    <span>Chakra: {crystal.chakra.split(' ')[0]}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Ritual →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Spotlight: Chosen Crystal Deep Dive */}
          <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-lg">
            <div className="border-b border-amber-100 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Detailed Ritual Profile
                </span>
                <span className="text-xs bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded">
                  Chakra: {activeCrystal.chakra}
                </span>
              </div>
              <h3 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                {lang === 'hi' ? activeCrystal.nameHi : activeCrystal.nameEn}
              </h3>
              {activeCrystal.sanskritName && (
                <p className="text-xs text-amber-900 font-serif italic">
                  Vedic Classification: {activeCrystal.sanskritName}
                </p>
              )}
            </div>

            <p className="text-xs text-stone-700 leading-relaxed mb-4">
              {activeCrystal.primaryBenefit}
            </p>

            {/* Recommended Professions */}
            <div className="mb-4 bg-amber-50/70 p-3.5 rounded-lg border border-amber-200/80">
              <span className="text-xs font-bold text-amber-950 block mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                Ideal Professions &amp; Roles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCrystal.bestProfessions.map((prof, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-white text-stone-800 px-2 py-0.5 rounded border border-amber-200"
                  >
                    {prof}
                  </span>
                ))}
              </div>
            </div>

            {/* Cleansing & Wearing Instructions */}
            <div className="space-y-3 mb-4 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-stone-900 block mb-1 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  Cleansing &amp; Consecration Method:
                </strong>
                <p>{activeCrystal.cleansingMethod}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-stone-900 block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  How to Wear or Place:
                </strong>
                <p>{activeCrystal.wearingMethod}</p>
              </div>

              <div className="p-3 bg-amber-900 text-amber-100 rounded-lg border border-amber-800">
                <strong className="text-amber-300 block mb-1">
                  Sacred Activation Affirmation:
                </strong>
                <p className="font-serif italic text-xs">
                  "{activeCrystal.affirmation}"
                </p>
              </div>
            </div>

            <button
              onClick={() => onBookCrystalSession(activeCrystal.nameEn)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold py-2.5 rounded-lg shadow-sm text-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Request Personal Crystal Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Profession-Based Quick Match Matrix */}
        <div className="bg-white rounded-xl border border-amber-200 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="font-sacred text-lg sm:text-xl font-bold text-stone-900">
              Crystals Matched by Profession &amp; Industry
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Select your domain to see the primary crystal combinations recommended by Randhir Singh:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFESSION_CRYSTAL_MAP.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#faf8f4] p-4 rounded-xl border border-amber-200/80 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-amber-950 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                    {item.profession}
                  </h4>
                  <ul className="text-xs text-stone-700 space-y-1 mb-2">
                    {item.crystals.map((c, i) => (
                      <li key={i} className="flex items-center gap-1.5 font-medium text-amber-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-stone-500 italic border-t border-amber-100 pt-2 mt-2">
                  {item.advice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
