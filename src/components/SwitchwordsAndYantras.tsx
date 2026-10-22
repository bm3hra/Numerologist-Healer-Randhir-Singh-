import React, { useState } from 'react';
import { Sparkles, Grid, Volume2, Play, RotateCcw, CheckCircle2, Copy, Check, ArrowRight, Shield } from 'lucide-react';
import { SWITCHWORDS_LIST } from '../data/switchwordsData';
import { YANTRAS_LIST } from '../data/yantrasData';
import { Language, YantraItem } from '../types';

interface SwitchwordsAndYantrasProps {
  lang: Language;
  onBookYantraGuidance: (yantraName?: string) => void;
}

export const SwitchwordsAndYantras: React.FC<SwitchwordsAndYantrasProps> = ({
  lang,
  onBookYantraGuidance
}) => {
  const [activeSection, setActiveSection] = useState<'switchwords' | 'yantras'>('switchwords');

  // Switchword & Japa state
  const [activeSwitchword, setActiveSwitchword] = useState(SWITCHWORDS_LIST[0]);
  const [japaCount, setJapaCount] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Yantra state
  const [selectedYantra, setSelectedYantra] = useState<YantraItem>(YANTRAS_LIST[0]);

  const handleIncrementJapa = () => {
    if (japaCount < 108) {
      setJapaCount((prev) => prev + 1);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="yantras-codes" className="relative py-12 sm:py-16 bg-[#faf6ee] border-b border-amber-200/80">
      {/* Target anchor for direct #remedies URL navigation */}
      <div id="remedies" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Grid className="w-3.5 h-3.5 text-amber-700" />
            <span>Services #11, 13, 14, 15 · Sacred Frequencies</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            YANTRAS, HEALING CODES &amp; SWITCHWORDS
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Vedic Magic Matrices &amp; Sacred Quantum Word Energies
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'वैदिक संख्यात्मक यंत्र और दिव्य स्विच वर्ड्स आपकी चेतना और स्थान की ऊर्जा को तुरंत उच्च आवृत्ति पर ट्यून करते हैं।'
              : 'Sacred numerical yantras and high-frequency switchwords bypass conscious barriers to magnetize health, victory, and wealth.'}
          </p>
        </div>

        {/* Section Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-200/70 p-1 rounded-xl flex items-center gap-1 border border-stone-300">
            <button
              onClick={() => setActiveSection('switchwords')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeSection === 'switchwords'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Health Switch Words &amp; Healing Codes</span>
            </button>

            <button
              onClick={() => setActiveSection('yantras')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeSection === 'yantras'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Numerical Magic Square Yantras</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SWITCHWORDS & HEALING CODES */}
        {activeSection === 'switchwords' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Catalog List */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block px-1">
                Sacred Frequency Catalog:
              </span>

              {SWITCHWORDS_LIST.map((item) => {
                const isSelected = activeSwitchword.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveSwitchword(item);
                      setJapaCount(0);
                    }}
                    className={`cursor-pointer rounded-xl p-4 border transition-all text-left flex items-start justify-between ${
                      isSelected
                        ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-400'
                        : 'bg-white/70 hover:bg-white border-stone-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.category.toUpperCase()}
                        </span>
                        {item.healingCode && (
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Code: {item.healingCode}
                          </span>
                        )}
                      </div>

                      <h4 className="font-mono text-sm font-black text-amber-950 tracking-wide">
                        {item.switchword}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {item.purpose}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.id, `${item.switchword} | Healing Code: ${item.healingCode || ''}`);
                      }}
                      className="text-stone-400 hover:text-amber-800 p-1.5 rounded"
                      title="Copy"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Interactive Japa Chanting Tracker */}
            <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-lg sticky top-24">
              <div className="border-b border-amber-100 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Interactive Chanting Shrine
                </span>
                <h3 className="font-mono text-base sm:text-lg font-black text-stone-900 mt-1">
                  {activeSwitchword.switchword}
                </h3>
                {activeSwitchword.healingCode && (
                  <p className="text-xs font-mono font-bold text-emerald-800 mt-0.5">
                    Divine Code: {activeSwitchword.healingCode}
                  </p>
                )}
              </div>

              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                {activeSwitchword.purpose}
              </p>

              {/* 108 Mala Tracker */}
              <div className="bg-[#fcfaf5] p-6 rounded-2xl border border-amber-200 text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  108 Japa Repetition Counter
                </span>

                <div className="text-5xl font-black font-mono text-amber-900 my-2">
                  {japaCount}
                  <span className="text-lg text-stone-400 font-normal"> / 108</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden my-3">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-800 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((japaCount / 108) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={handleIncrementJapa}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Chant (+1)</span>
                  </button>

                  <button
                    onClick={handleResetJapa}
                    className="p-3 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-stone-600 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                <strong className="text-amber-950 block mb-1">How to Use:</strong>
                <p>{activeSwitchword.howToChant}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SACRED NUMERICAL YANTRAS */}
        {activeSection === 'yantras' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Yantra Selector */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block px-1">
                Select Sacred Yantra:
              </span>

              {YANTRAS_LIST.map((yantra) => {
                const isSelected = selectedYantra.id === yantra.id;
                return (
                  <button
                    key={yantra.id}
                    onClick={() => setSelectedYantra(yantra)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-400'
                        : 'bg-white/70 hover:bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">
                        {yantra.planetOrDeity}
                      </span>
                      <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded">
                        Sum = {yantra.sumNumber}
                      </span>
                    </div>
                    <h4 className="font-sacred font-bold text-stone-900 text-sm mt-1">
                      {yantra.name}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Right: Rendered Numerical Matrix */}
            <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-lg">
              <div className="border-b border-amber-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Vedic Numerical Magic Square
                  </span>
                  <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {selectedYantra.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Row/Col Constant</span>
                  <span className="text-2xl font-black font-mono text-amber-900">
                    {selectedYantra.sumNumber}
                  </span>
                </div>
              </div>

              {/* 3x3 Magic Square Rendering */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-br from-amber-50 to-[#faf6ee] rounded-2xl border-2 border-amber-400 max-w-xs mx-auto mb-6 shadow-inner">
                {selectedYantra.matrix.map((row, rowIdx) =>
                  row.map((val, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="aspect-square bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-100 rounded-xl flex items-center justify-center text-2xl font-black font-mono shadow-md border border-amber-400"
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>

              {/* Activation Mantra */}
              <div className="bg-amber-900 text-amber-100 p-4 rounded-xl border border-amber-800 mb-4 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Sacred Activation Seed Mantra
                </span>
                <p className="font-serif italic text-sm tracking-wide text-amber-100">
                  "{selectedYantra.mantra}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700 mb-6">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="block text-stone-900 mb-0.5">Recommended Placement:</strong>
                  <span>{selectedYantra.placementDirection}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="block text-stone-900 mb-0.5">Auspicious Day:</strong>
                  <span>{selectedYantra.bestDay}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                <strong>Benefits:</strong> {selectedYantra.benefits}
              </p>

              <button
                onClick={() => onBookYantraGuidance(selectedYantra.name)}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all"
              >
                <Grid className="w-4 h-4 text-amber-300" />
                <span>Request Consecrated Yantra on Bhojpatra / Copper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
