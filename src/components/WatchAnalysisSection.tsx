import React, { useState } from 'react';
import { Watch, Clock, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Compass, Shield, Zap, Crown, Award } from 'lucide-react';
import { WATCH_SHAPES, WATCH_DIAL_COLORS, WATCH_PRINCIPLES, diagnoseWatch } from '../data/watchTherapyData';
import { WatchAnalysisInput, Language } from '../types';

interface WatchAnalysisSectionProps {
  lang: Language;
  onBookWatchConsultation: () => void;
}

export const WatchAnalysisSection: React.FC<WatchAnalysisSectionProps> = ({
  lang,
  onBookWatchConsultation
}) => {
  const [formData, setFormData] = useState<WatchAnalysisInput>({
    dialShape: 'round',
    dialColor: 'white',
    strapType: 'silver_metal',
    secondHand: 'smooth_gold',
    wornWrist: 'right',
    condition: 'perfect',
    currentGoal: 'career_growth'
  });

  const [diagnosis, setDiagnosis] = useState(() => diagnoseWatch(formData));

  const handleUpdate = (updates: Partial<WatchAnalysisInput>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
    setDiagnosis(diagnoseWatch(updated));
  };

  return (
    <section id="watch-analysis" className="relative py-12 sm:py-16 bg-[#faf6ee] border-y border-amber-200/80">
      {/* Target anchor for direct #watch URL navigation */}
      <div id="watch" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-100/90 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Watch className="w-4 h-4 text-amber-700" />
            <span>{lang === 'hi' ? 'विशेषज्ञ सेवा' : 'Signature Specialty'} · Randhir Singh</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'वॉच एनालिसिस एवं थेरेपी वॉचेस' : 'Watch Analysis & Therapy Watches'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 font-normal leading-relaxed">
            {lang === 'hi'
              ? 'आपकी कलाई पर बंधी घड़ी केवल समय नहीं बताती, बल्कि आपकी नब्ज (रेडियल पल्स) और अवचेतन मन के साथ 24 घंटे ऊर्जा का आदान-प्रदान करती है। जानिए आपकी घड़ी आपकी प्रगति में सहायक है या बाधा।'
              : 'Your wristwatch rests on the radial artery pulse meridian, continuously broadcasting geometric and electromagnetic frequencies to your subconscious mind and destiny path.'}
          </p>
        </div>

        {/* 4 Core Pillars of Watch Numerology */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {WATCH_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-xl p-5 border border-amber-200/70 shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm mb-3">
                0{idx + 1}
              </div>
              <h3 className="font-sacred font-bold text-stone-900 text-sm mb-1.5">
                {lang === 'hi' ? principle.titleHi : principle.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'hi' ? principle.descHi : principle.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Precision Therapy Watches Exhibition — Master Randhir Singh Bespoke Masterpiece */}
        <div className="bg-gradient-to-br from-stone-950 via-[#0d1627] to-stone-900 rounded-3xl border-2 border-amber-400/90 shadow-2xl p-6 sm:p-10 mb-14 text-white relative overflow-hidden">
          {/* Subtle cosmic background ambient glows */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/30 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-blue-500/20 border border-amber-400/50 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest mb-2">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {lang === 'hi' ? 'विशेष थेरेपी घड़ियों का प्रदर्शन' : 'Precision Therapy Watches Exhibition'}
                  </span>
                </div>
                <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {lang === 'hi'
                    ? 'मास्टर रणधीर सिंह सिग्नेचर थेरेपी वॉच · 18K गोल्ड व रॉयल ब्लू'
                    : 'Master Randhir Singh Signature Victorinox Therapy Watch'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                  {lang === 'hi'
                    ? '18K स्वर्ण पॉलिश, डीप रॉयल ब्लू रोटेटिंग बेज़ल, मध्य में प्राण-प्रतिष्ठित ॐ यंत्र, मास्टर नंबर 22 दिनांक विंडो एवं पावन स्वर्ण कमल।'
                    : '18K yellow gold finish, royal azure blue rotating bezel, consecrated central Om (ॐ) mandala, Master Number 22 date aperture & sacred blooming lotus.'}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-semibold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Bespoke Horology</span>
                </span>
              </div>
            </div>

            {/* Content: Photo + Horological Blueprint */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Authentic Watch High-Res Visual */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-64 sm:w-76 md:w-84 aspect-square rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] group bg-stone-950 p-2">
                  <img
                    src="/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png"
                    alt="Master Randhir Singh Luxury Gold and Royal Blue Victorinox Precision Therapy Watch"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-amber-400/50 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-amber-300">
                    VICTORINOX EDITION
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-950/90 backdrop-blur-md border border-blue-400/50 px-2.5 py-1 rounded text-[10px] font-bold text-blue-200">
                    MASTER NO. 22 · ॐ
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-[11px] text-amber-300/90 font-medium">
                    {lang === 'hi'
                      ? 'हस्तनिर्मित व वैदिक मंत्रों से अभिमंत्रित · मास्टर रणधीर सिंह'
                      : 'Personally Consecrated & Vedic Energized · Master Randhir Singh'}
                  </span>
                </div>
              </div>

              {/* Right Column: 6 Core Calibrated Numerology & Pulse Features */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Feature 1: Om Mandala */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-400 font-bold text-sm">ॐ</span>
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'केंद्रीय स्वर्ण ॐ यंत्र' : 'Central Golden Om (ॐ) Mandala'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'डायल के केंद्र में 12-दल वैदिक कमल के भीतर स्वर्ण ॐ, जो अवचेतन मन को अगाध शांति और ब्रह्मांडीय ऊर्जा प्रदान करता है।'
                        : 'Golden 12-petal sacred geometry mandala at the central pivot constantly radiating deep grounding and cosmic focus to the subconscious.'}
                    </p>
                  </div>

                  {/* Feature 2: Inscriptions */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'द्वैत ऊर्जा महामंत्र' : 'Sacred Dual Inscriptions'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? '9 बजे "NUMEROLOGY GUIDANCE" एवं 3 बजे "HEALING ENERGY POSITIVITY" जातक की निर्णय क्षमता व आत्मबल को सुदृढ़ रखते हैं।'
                        : '"NUMEROLOGY GUIDANCE" at 9 o’clock & "HEALING ENERGY POSITIVITY" at 3 o’clock shield against psychic fatigue & boost strategic confidence.'}
                    </p>
                  </div>

                  {/* Feature 3: Master Number 22 Date Window */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-400 font-mono font-bold text-xs">22</span>
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'मास्टर नंबर 22 दिनांक चक्र' : 'Master Number 22 Date Aperture'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? '6 बजे स्वर्ण फ्रेम में मास्टर नंबर 22 (मास्टर बिल्डर) स्थापित है, जो बड़े व्यापारिक लक्ष्यों और साम्राज्य निर्माण को गति देता है।'
                        : 'Framed in gold at 6 o’clock; Master Builder 22 vibration grounds high-level ambitions into tangible physical wealth and enterprise.'}
                    </p>
                  </div>

                  {/* Feature 4: Blooming Lotus */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-400 text-sm">🪷</span>
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'दिव्य स्वर्ण कमल पुष्प' : 'Golden Blooming Lotus'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'दिनांक चक्र के ठीक नीचे स्वर्ण कमल महालक्ष्मी की अखंड कृपा, वित्तीय प्रवाह और शुद्ध आध्यात्मिक उन्नति का प्रतीक है।'
                        : 'Embossed below the date window, symbolizing continuous Lakshmi wealth flow, spiritual purity, and unhindered upward growth.'}
                    </p>
                  </div>

                  {/* Feature 5: Color Alchemy */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-amber-400" />
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'स्वर्ण व रॉयल ब्लू ऊर्जा' : 'Gold & Azure Alchemy'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'सूर्य (स्वर्ण धातु) का आत्मबल एवं बृहस्पति/शनि (गहरा नीला रंग) का विवेक मिलकर जातक को स्थायित्व व नेतृत्व प्रदान करते हैं।'
                        : '18K gold (Surya / vitality & authority) balanced with royal blue (Jupiter & Saturn / wisdom, calm foresight, and steady governance).'}
                    </p>
                  </div>

                  {/* Feature 6: Radial Artery Pulse Resonance */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'रेडियल नाड़ी स्पंदन' : 'Pulse Meridian Alignment'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'कलाई की रेडियल आर्टरी से निरंतर संपर्क में रहकर घड़ी की सुइयां और आवृत्ति अवचेतन मन से विलंब व नकारात्मकता को समाप्त करती हैं।'
                        : 'Direct contact with the wrist’s radial artery transmits punctual rhythm to neural pathways, eliminating subconscious delays.'}
                    </p>
                  </div>
                </div>

                {/* Consultation CTA Bar inside Showcase */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 mt-2">
                  <div className="text-xs text-amber-200/90 text-center sm:text-left">
                    <strong className="text-white block font-sacred">
                      {lang === 'hi' ? 'कस्टम थेरेपी वॉच ऑर्डर करें' : 'Commission Your Personalized Therapy Watch'}
                    </strong>
                    <span className="text-[11px] text-stone-300">
                      {lang === 'hi'
                        ? 'आपकी जन्म तिथि एवं ग्रिड के अनुसार धातु, डायल व यंत्रों का व्यक्तिगत चयन।'
                        : 'Calibrated to your exact Date of Birth, Lo-Shu grid voids, and career targets.'}
                    </span>
                  </div>

                  <button
                    onClick={onBookWatchConsultation}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-stone-950 font-extrabold py-2 px-4 rounded-lg shadow-md text-xs transition-all hover:scale-102"
                  >
                    <Watch className="w-4 h-4 text-stone-950" />
                    <span>{lang === 'hi' ? 'थेरेपी वॉच हेतु संपर्क करें' : 'Inquire About Therapy Watch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Watch Diagnostic Studio */}
        <div className="bg-white rounded-2xl border-2 border-amber-300/80 shadow-xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  {lang === 'hi' ? 'इंटरएक्टिव परीक्षण' : 'Interactive Assessment'}
                </span>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-white mt-1">
                  {lang === 'hi' ? 'अपनी वर्तमान घड़ी का स्व-निदान करें' : 'Diagnose Your Wristwatch Vibration'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
                  {lang === 'hi' 
                    ? 'अपनी वर्तमान घड़ी के घटकों का चयन करें और अपनी ऊर्जा आवृत्ति का परीक्षण करें।' 
                    : 'Select your current watch specifications to evaluate its energetic frequency.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 px-3.5 py-2 rounded-lg text-xs font-medium text-amber-200">
                <Clock className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
                <span>{lang === 'hi' ? 'त्वरित अंक ज्योतिषीय विश्लेषण' : 'Instant Numerological Analysis'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls: Input Selectors */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dial Shape */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. Dial Shape (डायल का आकार)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {WATCH_SHAPES.map((item) => (
                    <button
                      key={item.shape}
                      type="button"
                      onClick={() => handleUpdate({ dialShape: item.shape as any })}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        formData.dialShape === item.shape
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-2xs ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700 text-xs'
                      }`}
                    >
                      <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                        {item.shape === 'round' && <div className="w-6 h-6 rounded-full border-2 border-current" />}
                        {item.shape === 'square' && <div className="w-5 h-5 rounded-xs border-2 border-current" />}
                        {item.shape === 'rectangle' && <div className="w-6 h-4 rounded-xs border-2 border-current" />}
                        {item.shape === 'octagonal' && (
                          <div className="w-5 h-5 rotate-45 border-2 border-current rounded-xs" />
                        )}
                        {item.shape === 'oval' && <div className="w-6 h-4 rounded-full border-2 border-current" />}
                        {item.shape === 'triangular' && (
                          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-current" />
                        )}
                      </div>
                      <span className="text-[11px] capitalize">{item.shape}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dial Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  2. Dial Face Color (डायल का रंग)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { id: 'white', label: 'White / Silver', hex: '#f8fafc' },
                    { id: 'gold', label: 'Gold / Champagne', hex: '#fef08a' },
                    { id: 'blue', label: 'Navy / Blue', hex: '#1e3a8a' },
                    { id: 'green', label: 'Emerald Green', hex: '#166534' },
                    { id: 'black', label: 'Jet Black', hex: '#0f172a' },
                    { id: 'brown', label: 'Warm Brown', hex: '#78350f' }
                  ].map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleUpdate({ dialColor: color.id as any })}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                        formData.dialColor === color.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700 text-xs'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-stone-300 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[11px] truncate">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strap Material */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  3. Strap / Bracelet Material (पट्टा या ब्रेसलेट)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'gold_metal', label: 'Golden Metal Links' },
                    { id: 'silver_metal', label: 'Stainless Steel / Silver' },
                    { id: 'brown_leather', label: 'Brown / Tan Leather' },
                    { id: 'black_leather', label: 'Black Leather' },
                    { id: 'black_metal', label: 'Black PVD Metal' },
                    { id: 'silicone_rubber', label: 'Silicone / Rubber Strap' }
                  ].map((strap) => (
                    <button
                      key={strap.id}
                      type="button"
                      onClick={() => handleUpdate({ strapType: strap.id as any })}
                      className={`p-2 rounded-lg border text-left text-xs transition-all ${
                        formData.strapType === strap.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {strap.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wrist & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    4. Hand Worn On (किस हाथ पर पहनते हैं)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdate({ wornWrist: 'right' })}
                      className={`p-2 text-center rounded-lg border text-xs ${
                        formData.wornWrist === 'right'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      Right (Active / Sun)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate({ wornWrist: 'left' })}
                      className={`p-2 text-center rounded-lg border text-xs ${
                        formData.wornWrist === 'left'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      Left (Receptive / Moon)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    5. Physical Condition (घड़ी की स्थिति)
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleUpdate({ condition: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="perfect">Pristine / Excellent condition</option>
                    <option value="scratched">Scratched glass or worn case</option>
                    <option value="stopped_sometimes">Stops sometimes / Delay in time</option>
                    <option value="loose_fit">Very loose or unstable fit</option>
                  </select>
                </div>
              </div>

              {/* Primary Life Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  6. Your Primary Goal (वर्तमान मुख्य लक्ष्य)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'career_growth', label: 'Career Growth' },
                    { id: 'wealth_flow', label: 'Wealth Inflow' },
                    { id: 'mental_peace', label: 'Mental Peace' },
                    { id: 'relationship_harmony', label: 'Relationships' }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleUpdate({ currentGoal: goal.id as any })}
                      className={`p-2 text-center rounded-lg border text-xs ${
                        formData.currentGoal === goal.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output: Diagnosis Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#fdfbf7] to-amber-50/50 rounded-xl p-6 border border-amber-300/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-4 mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold">
                      Diagnostic Result
                    </span>
                    <h4 className="font-sacred text-lg font-bold text-stone-900">
                      {diagnosis.energyAssessment}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-800">
                      {diagnosis.vibrationScore}
                      <span className="text-xs text-stone-500 font-normal">/100</span>
                    </span>
                    <div className="text-[10px] text-stone-500">Vibration Index</div>
                  </div>
                </div>

                {/* Live Animated Horological Watch & Pulse Meridian Graphic */}
                <div className="bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-xl p-4 mb-5 border border-amber-500/40 relative overflow-hidden shadow-inner">
                  {/* Background Radial Glow */}
                  <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/80 mb-2 pb-1 border-b border-amber-800/60">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>LIVE MERIDIAN SIMULATION</span>
                    </span>
                    <span className="uppercase text-amber-400 font-bold">{formData.dialShape} · {formData.dialColor}</span>
                  </div>

                  {/* Watch Visualizer with Sweeping Second Hand */}
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
                    {/* The Watch */}
                    <div className="relative flex flex-col items-center">
                      {/* Top Strap Piece */}
                      <div className={`w-8 h-4 rounded-t border-t border-x ${
                        formData.strapType === 'gold_metal' ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 border-amber-400' :
                        formData.strapType === 'silver_metal' ? 'bg-gradient-to-r from-stone-300 via-stone-100 to-stone-400 border-stone-300' :
                        formData.strapType === 'brown_leather' ? 'bg-amber-900 border-amber-800' :
                        formData.strapType === 'black_leather' ? 'bg-stone-950 border-stone-800' :
                        'bg-gradient-to-r from-rose-400 via-rose-300 to-amber-500 border-rose-400'
                      }`} />

                      {/* Main Watch Case */}
                      <div className="p-1 bg-gradient-to-br from-amber-400 via-stone-200 to-amber-600 rounded-2xl shadow-xl">
                        <div className={`relative flex items-center justify-center border-2 border-amber-500/80 shadow-inner bg-gradient-to-br ${
                          formData.dialColor === 'gold' ? 'from-amber-200 via-amber-400 to-amber-600 text-stone-950' :
                          formData.dialColor === 'black' ? 'from-stone-900 via-stone-950 to-black text-amber-300' :
                          formData.dialColor === 'blue' ? 'from-blue-900 via-indigo-950 to-blue-950 text-amber-200' :
                          formData.dialColor === 'green' ? 'from-emerald-900 via-teal-950 to-emerald-950 text-amber-200' :
                          formData.dialColor === 'white' ? 'from-stone-50 via-amber-50/60 to-white text-stone-900' :
                          'from-stone-200 via-stone-300 to-stone-400 text-stone-900'
                        } ${
                          formData.dialShape === 'round' ? 'rounded-full w-24 h-24' :
                          formData.dialShape === 'square' ? 'rounded-xl w-22 h-22' :
                          formData.dialShape === 'rectangle' ? 'rounded-lg w-20 h-26' :
                          formData.dialShape === 'octagonal' ? 'rounded-xl w-22 h-22 rotate-45' :
                          'rounded-[32px] w-20 h-26'
                        }`}>
                          {/* Dial Numerals */}
                          <div className={`absolute inset-0 flex flex-col justify-between items-center py-1.5 text-[9px] font-sacred font-bold select-none ${
                            formData.dialShape === 'octagonal' ? '-rotate-45' : ''
                          }`}>
                            <span>XII</span>
                            <div className="w-full flex justify-between px-1.5">
                              <span>IX</span>
                              <span>III</span>
                            </div>
                            <span>VI</span>
                          </div>

                          {/* Center Hands with CSS Keyframe Sweep */}
                          <div className={`relative w-full h-full flex items-center justify-center ${
                            formData.dialShape === 'octagonal' ? '-rotate-45' : ''
                          }`}>
                            {/* Hour Hand */}
                            <div className="absolute w-0.5 h-6 bg-amber-200 origin-bottom -translate-y-3 rounded-full rotate-45 shadow-xs" />
                            {/* Minute Hand */}
                            <div className="absolute w-0.5 h-8 bg-amber-100 origin-bottom -translate-y-4 rounded-full rotate-[160deg] shadow-xs" />
                            {/* Sweeping Second Hand with continuous smooth animation */}
                            <div className="absolute w-[1px] h-9 bg-rose-500 origin-bottom -translate-y-4.5 rounded-full animate-sweep-smooth shadow-xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 -translate-x-0.5" />
                            </div>
                            {/* Center Pinion Cap */}
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border border-stone-900 z-10 shadow-xs" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Strap Piece */}
                      <div className={`w-8 h-4 rounded-b border-b border-x ${
                        formData.strapType === 'gold_metal' ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 border-amber-400' :
                        formData.strapType === 'silver_metal' ? 'bg-gradient-to-r from-stone-300 via-stone-100 to-stone-400 border-stone-300' :
                        formData.strapType === 'brown_leather' ? 'bg-amber-900 border-amber-800' :
                        formData.strapType === 'black_leather' ? 'bg-stone-950 border-stone-800' :
                        'bg-gradient-to-r from-rose-400 via-rose-300 to-amber-500 border-rose-400'
                      }`} />
                    </div>

                    {/* Pulse Frequency & Meridian Biofeedback */}
                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <div className="text-[11px] font-bold text-amber-200">
                        Radial Artery Pulse Resonance
                      </div>
                      <p className="text-[10px] text-stone-300 leading-tight">
                        Worn on <strong>{formData.wornWrist === 'right' ? 'Right (Surya / Active)' : 'Left (Chandra / Receptive)'}</strong> wrist · Energy flow: <strong>{diagnosis.energyAssessment}</strong>
                      </p>

                      {/* Animated Pulse Waveform Graphic */}
                      <div className="h-6 bg-black/40 rounded-md border border-amber-500/30 flex items-center justify-center px-2 overflow-hidden relative">
                        <svg viewBox="0 0 200 40" className="w-full h-full text-amber-400">
                          <path
                            d="M 0 20 L 40 20 L 50 5 L 60 35 L 70 12 L 80 20 L 120 20 L 130 5 L 140 35 L 150 12 L 160 20 L 200 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="opacity-90"
                          />
                        </svg>
                        <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent animate-pulse-glow" />
                      </div>
                      <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-between">
                        <span>PULSE: 72 BPM</span>
                        <span>FREQUENCY: {formData.dialShape === 'octagonal' ? '8-AXIS WEALTH' : 'HARMONIC'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="space-y-3 mb-4">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Observed Energetic Alignments:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700 pl-5 list-disc">
                    {diagnosis.keyStrengths.map((s, idx) => (
                      <li key={idx} className="leading-relaxed">{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Cautions if any */}
                {diagnosis.cautionPoints.length > 0 && (
                  <div className="bg-amber-100/70 border border-amber-300/80 rounded-lg p-3.5 mb-4 space-y-1.5">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      Key Watch Remedy Alert:
                    </span>
                    <ul className="text-xs text-amber-900 space-y-1 pl-4 list-disc">
                      {diagnosis.cautionPoints.map((c, idx) => (
                        <li key={idx} className="leading-snug">{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Subconscious Impact */}
                <div className="bg-white/80 rounded-lg p-3.5 border border-stone-200 mb-4 text-xs text-stone-600 space-y-1">
                  <span className="font-bold text-stone-800 block">Subconscious Pulse Polarity:</span>
                  {diagnosis.impactOnSubconscious.map((imp, idx) => (
                    <p key={idx}>{imp}</p>
                  ))}
                </div>

                {/* Therapy Watch Recommendation Box */}
                <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-amber-100 rounded-xl p-4 border border-amber-400/50 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-300 font-sacred text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Therapy Watch Prescription</span>
                  </div>
                  <div className="text-xs space-y-1 text-amber-100/90">
                    <p><strong className="text-amber-200">Recommended Geometry:</strong> {diagnosis.therapyWatchPrescription.recommendedShape}</p>
                    <p><strong className="text-amber-200">Dial Hue:</strong> {diagnosis.therapyWatchPrescription.recommendedDialColor}</p>
                    <p><strong className="text-amber-200">Strap / Mesh:</strong> {diagnosis.therapyWatchPrescription.recommendedStrap}</p>
                    <p><strong className="text-amber-200">Wear On:</strong> {diagnosis.therapyWatchPrescription.recommendedWrist}</p>
                    <p><strong className="text-amber-200">Best Muhurat:</strong> {diagnosis.therapyWatchPrescription.activationTiming}</p>
                  </div>
                  <p className="text-[11px] text-amber-300/80 pt-1 border-t border-amber-800/80 italic">
                    💡 Tip: {diagnosis.therapyWatchPrescription.specialTip}
                  </p>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-4 mt-4 border-t border-amber-200/60">
                <button
                  onClick={onBookWatchConsultation}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm text-xs transition-all"
                >
                  <Watch className="w-4 h-4 text-amber-300" />
                  <span>Get Master Randhir’s Personal Watch Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why Therapy Watches Work */}
        <div className="bg-amber-100/40 rounded-xl p-6 sm:p-8 border border-amber-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sacred font-bold text-stone-900 text-sm">Punctuality of Wealth</h4>
                <p className="text-xs text-stone-600 mt-1">
                  When your watch movement and dial reflect planetary harmony, contracts clear faster and cash rotation becomes prompt and frictionless.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sacred font-bold text-stone-900 text-sm">Eliminates Subconscious Delays</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Scratched crystals or lagging battery cells subtly program your neural pathways to accept delayed results. A prescribed therapy watch restores swift momentum.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sacred font-bold text-stone-900 text-sm">Customized to Your Lo-Shu Grid</h4>
                <p className="text-xs text-stone-600 mt-1">
                  If your birth grid lacks the Fire or Earth element, the watch metal, dial geometry, and ticking tempo act as a physical supplement to fill the void.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
