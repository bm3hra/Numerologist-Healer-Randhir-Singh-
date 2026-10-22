import React, { useState } from 'react';
import { Phone, FileSignature, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Star } from 'lucide-react';
import { CHALDEAN_MAP, PYTHAGOREAN_MAP, reduceToSingleDigit, PLANETARY_ARCHETYPES } from '../data/numerologyData';
import { Language } from '../types';

interface MobileAndNameAnalyzerProps {
  lang: Language;
  onBookConsultation: (service: string) => void;
}

export const MobileAndNameAnalyzer: React.FC<MobileAndNameAnalyzerProps> = ({
  lang,
  onBookConsultation
}) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'name'>('mobile');

  // Mobile state
  const [mobileNumber, setMobileNumber] = useState<string>('9509593150'); // Default to Randhir Ji's number!

  // Name state
  const [nameInput, setNameInput] = useState<string>('RANDHIR SINGH');
  const [extraChar, setExtraChar] = useState<string>('');

  // Mobile Calculation
  const cleanPhone = mobileNumber.replace(/\D/g, '');
  const digits = cleanPhone.split('').map((d) => parseInt(d, 10));
  const mobileSum = digits.reduce((acc, curr) => acc + curr, 0);
  const mobileRoot = cleanPhone.length > 0 ? reduceToSingleDigit(mobileSum) : 0;

  // Digit occurrences in phone
  const digitCounts: Record<number, number> = {};
  digits.forEach((d) => {
    digitCounts[d] = (digitCounts[d] || 0) + 1;
  });

  // Name Calculation
  const cleanName = (nameInput + (extraChar ? extraChar : '')).toUpperCase().replace(/[^A-Z]/g, '');

  let chaldeanCompound = 0;
  const chaldeanBreakdown = cleanName.split('').map((char) => {
    const val = CHALDEAN_MAP[char] || 0;
    chaldeanCompound += val;
    return { char, val };
  });
  const chaldeanSingle = chaldeanCompound > 0 ? reduceToSingleDigit(chaldeanCompound) : 0;

  let pythagoreanCompound = 0;
  const pythagoreanBreakdown = cleanName.split('').map((char) => {
    const val = PYTHAGOREAN_MAP[char] || 0;
    pythagoreanCompound += val;
    return { char, val };
  });
  const pythagoreanSingle = pythagoreanCompound > 0 ? reduceToSingleDigit(pythagoreanCompound) : 0;

  // Evaluation of mobile root
  const getMobileEvaluation = (root: number, compound: number) => {
    if (root === 1) return { vibe: 'Leadership & High Authority', desc: 'Excellent for government officials, CEOs, and pioneers. Commands instant attention.', lucky: true };
    if (root === 2) return { vibe: 'Peace & Artistic Sensitivity', desc: 'Good for counselors, poets, and diplomats. May occasionally create over-emotional sensitivity.', lucky: true };
    if (root === 3) return { vibe: 'Wisdom & Expansion', desc: 'Favors teachers, consultants, advisors, and mentors. Attracts knowledge and respect.', lucky: true };
    if (root === 4) return { vibe: 'Revolutionary & Structural', desc: 'Great for tech innovators, but caution advised if overused in trading as Rahu brings sudden swings.', lucky: false };
    if (root === 5) return { vibe: 'Commercial Cashflow & Speed', desc: 'The most popular universal number for businessmen, traders, sales teams, and networking.', lucky: true };
    if (root === 6) return { vibe: 'Luxury, Media & Relationships', desc: 'Favors luxury goods, beauty, entertainment, cinema, and matrimonial harmony.', lucky: true };
    if (root === 7) return { vibe: 'Research & Spiritual Intuition', desc: 'Ideal for healers, occultists, researchers, and mystics. Less focused on gross commercial greed.', lucky: true };
    if (root === 8) return { vibe: 'Mass Leadership & Justice', desc: 'Strong Saturnian power, but may bring severe struggles or delayed payments if conflicted with birth date.', lucky: false };
    if (root === 9) return { vibe: 'Courage, Energy & Zeal', desc: 'Great for military, defense, surgeons, and high-energy performers. Can cause sudden heated arguments.', lucky: true };
    return { vibe: 'Awaiting Input', desc: 'Enter 10 digits to see vibration.', lucky: true };
  };

  const mobileEval = getMobileEvaluation(mobileRoot, mobileSum);

  return (
    <section id="mobile-name" className="py-12 sm:py-16 bg-[#fbf9f4] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Digital &amp; Phonetic Resonance</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            LUCKY MOBILE &amp; NAME ANALYSIS
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Harmonize Your Everyday Phone Numbers &amp; Name Spelling (Chaldean)
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-200/70 p-1 rounded-xl flex items-center gap-1 border border-stone-300">
            <button
              onClick={() => setActiveTab('mobile')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'mobile'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Mobile Number Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('name')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'name'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <FileSignature className="w-4 h-4" />
              <span>Name Spelling &amp; Correction</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MOBILE NUMBER ANALYSIS */}
        {activeTab === 'mobile' && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Input */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Enter 10-Digit Mobile Number (मोबाइल नंबर)
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="e.g. 9509593150"
                    className="w-full text-lg font-mono font-bold tracking-wider p-3 rounded-xl border border-stone-300 bg-stone-50 focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Digits count: {cleanPhone.length} / 10
                  </span>
                </div>

                {/* Repeating Digits Audit */}
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block mb-2">
                    Digit Frequency in this Number:
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
                      const count = digitCounts[digit] || 0;
                      return (
                        <div
                          key={digit}
                          className={`p-2 rounded text-center text-xs font-mono border ${
                            count > 0
                              ? 'bg-white border-amber-300 text-amber-950 font-bold shadow-2xs'
                              : 'bg-stone-50 border-stone-200 text-stone-300'
                          }`}
                        >
                          <div>Digit {digit}</div>
                          <div className="text-[11px] text-amber-800">{count}x</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
                  <span className="font-bold text-stone-900 block">Expert Rule by Randhir Singh:</span>
                  <p>• Avoid excessive repetition of 4 or 8 (e.g., 444, 888) if you are in high-velocity trading, as it causes recurring delays.</p>
                  <p>• Numbers ending in 5, 6, or 1 usually command higher sales responses and prompt repayments.</p>
                </div>
              </div>

              {/* Right Output */}
              <div className="md:col-span-6 bg-gradient-to-br from-[#fdfbf7] to-amber-50/60 rounded-xl p-6 border border-amber-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-amber-800">
                        Total Sum &amp; Root
                      </span>
                      <h4 className="font-sacred text-lg font-bold text-stone-900">
                        Compound: {mobileSum} → Root: {mobileRoot}
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center text-2xl font-black font-sacred shadow-sm">
                      {mobileRoot}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      Planetary Vibration: {PLANETARY_ARCHETYPES[mobileRoot]?.planet || 'Universal'}
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">
                      {mobileEval.vibe}
                    </h5>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {mobileEval.desc}
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-amber-200 text-xs text-stone-700 space-y-1 mb-4">
                    <strong className="text-stone-900 block">Is this number lucky for you?</strong>
                    <p>
                      A mobile number must synchronize with your Driver (Mulank) and Conductor (Bhagyank). If your driver is 1, a phone totaling 5 or 6 multiplies your incoming inquiries tenfold.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onBookConsultation('Lucky Mobile Number Selection')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Lucky Mobile Number Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NAME ANALYSIS & CORRECTIONS */}
        {activeTab === 'name' && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Input & Simulator */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Enter Name to Analyze (नाम दर्ज करें)
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. RANDHIR SINGH"
                    className="w-full text-base font-bold uppercase tracking-wider p-3 rounded-xl border border-stone-300 bg-stone-50 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Spelling Simulator */}
                <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block">
                    Interactive Spelling Correction Simulator:
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Test appending an auspicious letter (like A, E, R, S) to observe how your compound shifts:
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['', 'A', 'E', 'I', 'R', 'S', 'H'].map((char) => (
                      <button
                        key={char}
                        type="button"
                        onClick={() => setExtraChar(char)}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                          extraChar === char
                            ? 'bg-amber-800 text-white border-amber-800'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
                        }`}
                      >
                        {char === '' ? 'Original' : `+ ${char}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letter by Letter Breakdown */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    Chaldean Letter Values:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-stone-50 rounded-lg border border-stone-200">
                    {chaldeanBreakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-stone-300 rounded px-2 py-1 text-center font-mono text-xs shadow-2xs"
                      >
                        <div className="font-bold text-stone-900">{item.char}</div>
                        <div className="text-[10px] text-amber-700 font-semibold">{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output: Chaldean vs Pythagorean comparison */}
              <div className="md:col-span-6 bg-gradient-to-br from-[#fdfbf7] to-amber-50/60 rounded-xl p-6 border border-amber-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-amber-800">
                        Chaldean Vibration (Most Accurate)
                      </span>
                      <h4 className="font-sacred text-lg font-bold text-stone-900">
                        Compound: {chaldeanCompound} → Root: {chaldeanSingle}
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center text-2xl font-black font-sacred shadow-sm">
                      {chaldeanSingle}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1 mb-4">
                    <div className="flex justify-between font-semibold">
                      <span>Pythagorean Method:</span>
                      <span className="font-mono text-stone-900">{pythagoreanCompound} → Root {pythagoreanSingle}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      While Pythagorean assigns letters sequentially 1-9, the ancient Chaldean system maps precise vibrational energy frequencies.
                    </p>
                  </div>

                  {/* Fortunate Compound Highlights */}
                  <div className="bg-amber-100/60 p-3.5 rounded-lg border border-amber-300 text-xs text-amber-950 space-y-1 mb-4">
                    <span className="font-bold block flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
                      Fortunate Name Numbers:
                    </span>
                    <p>• <strong>14 &amp; 23 (Root 5)</strong>: Mercury magnetic fortune, mass popularity, financial expansion.</p>
                    <p>• <strong>24 &amp; 33 (Root 6)</strong>: Venus elegance, protection by elder mentors, social prestige.</p>
                    <p>• <strong>19 &amp; 37 (Root 1)</strong>: Solar royal success, leadership, unshakeable triumph.</p>
                  </div>
                </div>

                <button
                  onClick={() => onBookConsultation('Chaldean Name Correction')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all"
                >
                  <FileSignature className="w-3.5 h-3.5 text-amber-300" />
                  <span>Request Full Name Spelling Correction by Randhir Ji</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
