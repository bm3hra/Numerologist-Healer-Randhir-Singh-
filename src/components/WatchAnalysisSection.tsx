import React, { useState } from 'react';
import { Watch, Clock, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Compass, Shield, Zap, Crown, Award } from 'lucide-react';
import { WATCH_SHAPES, WATCH_DIAL_COLORS, WATCH_PRINCIPLES, diagnoseWatch } from '../data/watchTherapyData';
import { PLANETARY_ARCHETYPES } from '../data/numerologyData';
import { WatchAnalysisInput, Language } from '../types';
import { useCmsPages } from '../context/CmsPageContext';

interface WatchAnalysisSectionProps {
  lang: Language;
  onBookWatchConsultation: () => void;
}

export const WatchAnalysisSection: React.FC<WatchAnalysisSectionProps> = ({
  lang,
  onBookWatchConsultation
}) => {
  const { getPage } = useCmsPages();
  const cmsPage = getPage('watch-analysis');
  const headingBlock = cmsPage?.blocks?.find((b) => b.type === 'heading');
  const textBlock = cmsPage?.blocks?.find((b) => b.type === 'text');
  const heroImageBlock = cmsPage?.blocks?.find((b) => b.type === 'image');
  const videoBlock = cmsPage?.blocks?.find((b) => b.type === 'video');

  const watchImageUrl = heroImageBlock?.imageUrl || '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png';
  const watchSectionTitle = lang === 'hi' 
    ? (cmsPage?.titleHi || headingBlock?.title || 'घड़ी विश्लेषण एवं चिकित्सीय घड़ी परामर्श')
    : (cmsPage?.title || headingBlock?.title || 'Watch Analysis & Therapeutic Watch Consultation');
  const watchSectionSubtitle = headingBlock?.subtitle || (lang === 'hi'
    ? 'आपकी कलाई पर बंधी घड़ी केवल समय देखने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद, जीवनशैली और व्यक्तित्व की अभिव्यक्ति भी हो सकती है।'
    : 'Your wristwatch is not merely a tool for telling time, but also an expression of your personal preferences, lifestyle, and personality.');
  const [userDriver, setUserDriver] = useState<number>(5);
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
            {watchSectionTitle}
          </h2>
          <div className="mt-4 space-y-3 text-stone-700 leading-relaxed text-sm sm:text-base">
            <p>
              {watchSectionSubtitle}
            </p>
            <p className="text-xs sm:text-sm text-stone-600">
              {lang === 'hi'
                ? 'इस विशेष परामर्श में घड़ी की मजबूती, आकार, डिज़ाइन, रंग, डायल और अंकों की संरचना का विश्लेषण किया जाता है। इसका उद्देश्य घड़ी से जुड़े प्रतीकात्मक अर्थों और उनके प्रति आपकी व्यक्तिगत धारणाओं को समझना है, ताकि आत्म-जागरूकता, व्यक्तिगत पसंद और जीवन के लक्ष्यों पर एक नया दृष्टिकोण प्राप्त किया जा सके।'
                : 'In this specialized consultation, the build, shape, design, color, dial, and numeral structure of your watch are carefully analyzed. The objective is to understand the symbolic meanings associated with your watch and your personal perceptions toward them, helping you gain fresh perspectives on self-awareness, personal choices, and life goals.'}
            </p>
            <p className="text-[11px] sm:text-xs text-amber-900/90 bg-amber-100/70 p-2.5 rounded-lg border border-amber-300/70 max-w-2xl mx-auto italic">
              {lang === 'hi'
                ? 'यह परामर्श अंक ज्योतिष एवं प्रतीकात्मक व्याख्याओं पर आधारित है। इसे वैज्ञानिक रूप से प्रमाणित निदान या जीवन में परिणामों की गारंटी के रूप में नहीं समझना चाहिए।'
                : 'This consultation is rooted in numerological and symbolic interpretations. It should not be construed as a medically or scientifically proven diagnosis or guarantee of specific outcomes.'}
            </p>
          </div>
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

        {/* Precision Therapy Watches Exhibition — Numerologist & Healer · Randhir Singh Bespoke Masterpiece */}
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
                    ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह सिग्नेचर थेरेपी वॉच · 18K गोल्ड व रॉयल ब्लू'
                    : 'Numerologist & Healer · Randhir Singh Signature Victorinox Therapy Watch'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                  {lang === 'hi'
                    ? '18K स्वर्ण पॉलिश, डीप रॉयल ब्लू रोटेटिंग बेज़ल, मध्य में प्राण-प्रतिष्ठित ॐ यंत्र, मास्टर नंबर 22 दिनांक विंडो एवं पावन स्वर्ण कमल।'
                    : '18K yellow gold finish, royal azure blue rotating bezel, consecrated central Om (ॐ) mandala, Master Number 22 date aperture & divine blooming lotus.'}
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
                    src={watchImageUrl}
                    alt="Numerologist & Healer · Randhir Singh Luxury Watch"
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
                      ? 'हस्तनिर्मित व वैदिक मंत्रों से अभिमंत्रित · अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह'
                      : 'Personally Consecrated & Vedic Energized · Numerologist & Healer · Randhir Singh'}
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
                        : 'Golden 12-petal divine geometry mandala at the central pivot constantly radiating deep grounding and cosmic focus to the subconscious.'}
                    </p>
                  </div>

                  {/* Feature 2: Inscriptions */}
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3.5 hover:border-amber-400/70 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'द्वैत ऊर्जा महामंत्र' : 'Divine Dual Inscriptions'}
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
              {/* Step 0: Driver / Mulank Selection */}
              <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{lang === 'hi' ? '०. आपका मूलांक (ड्राइवर अंक):' : '0. Your Driver / Mulank (मूलांक):'}</span>
                  </label>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                    {PLANETARY_ARCHETYPES[userDriver]?.planet || ''}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setUserDriver(n)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        userDriver === n
                          ? 'bg-amber-900 text-white shadow-xs scale-105'
                          : 'bg-white text-stone-700 border border-stone-300 hover:border-amber-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-stone-600 mt-2">
                  {lang === 'hi'
                    ? 'आपके मूलांक एवं ग्रह स्वामी के अनुकूल डायल आकार, धातु व रंगों का सटीक निर्धारण।'
                    : 'Personalizes dial geometry, metal resonance, and color frequencies specifically to your birth ruler.'}
                </p>
              </div>

              {/* Dial Shape */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {lang === 'hi' ? '१. डायल का आकार (Dial Shape)' : '1. Dial Shape (डायल का आकार)'}
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
                      <span className="text-[11px] capitalize">
                        {lang === 'hi'
                          ? item.shape === 'round'
                            ? 'गोल'
                            : item.shape === 'square'
                            ? 'चौकोर'
                            : item.shape === 'rectangle'
                            ? 'आयताकार'
                            : item.shape === 'octagonal'
                            ? 'अष्टकोणीय'
                            : item.shape === 'oval'
                            ? 'अंडाकार'
                            : 'त्रिकोणीय'
                          : item.shape}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dial Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {lang === 'hi' ? '२. डायल का रंग (Face Color)' : '2. Dial Face Color (डायल का रंग)'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { id: 'white', labelEn: 'White / Silver', labelHi: 'श्वेत / सिल्वर', hex: '#f8fafc' },
                    { id: 'gold', labelEn: 'Gold / Champagne', labelHi: 'स्वर्ण / शैंपेन', hex: '#fef08a' },
                    { id: 'blue', labelEn: 'Navy / Blue', labelHi: 'गहरा नीला / नेवी', hex: '#1e3a8a' },
                    { id: 'green', labelEn: 'Emerald Green', labelHi: 'पन्ना हरा', hex: '#166534' },
                    { id: 'black', labelEn: 'Jet Black', labelHi: 'गहरा काला', hex: '#0f172a' },
                    { id: 'brown', labelEn: 'Warm Brown', labelHi: 'कत्थई / भूरा', hex: '#78350f' }
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
                      <span className="text-[11px] truncate">
                        {lang === 'hi' ? color.labelHi : color.labelEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strap Material */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {lang === 'hi' ? '३. पट्टा या ब्रेसलेट धातु (Strap Material)' : '3. Strap / Bracelet Material (पट्टा या ब्रेसलेट)'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'gold_metal', labelEn: 'Golden Metal Links', labelHi: 'स्वर्ण धातु लिंक्स' },
                    { id: 'silver_metal', labelEn: 'Stainless Steel / Silver', labelHi: 'स्टेनलेस स्टील / सिल्वर' },
                    { id: 'brown_leather', labelEn: 'Brown / Tan Leather', labelHi: 'भूरा चमड़ा (लेदर)' },
                    { id: 'black_leather', labelEn: 'Black Leather', labelHi: 'काला चमड़ा (लेदर)' },
                    { id: 'black_metal', labelEn: 'Black PVD Metal', labelHi: 'ब्लैक मेटल (PVD)' },
                    { id: 'silicone_rubber', labelEn: 'Silicone / Rubber Strap', labelHi: 'सिलिकॉन / रबर' }
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
                      {lang === 'hi' ? strap.labelHi : strap.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wrist & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    {lang === 'hi' ? '४. किस हाथ पर पहनते हैं (Hand Worn On)' : '4. Hand Worn On (किस हाथ पर पहनते हैं)'}
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
                      {lang === 'hi' ? 'दायाँ हाथ (सूर्य / सक्रिय)' : 'Right (Active / Sun)'}
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
                      {lang === 'hi' ? 'बायाँ हाथ (चंद्र / ग्रहणशील)' : 'Left (Receptive / Moon)'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    {lang === 'hi' ? '५. घड़ी की स्थिति (Condition)' : '5. Physical Condition (घड़ी की स्थिति)'}
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleUpdate({ condition: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="perfect">{lang === 'hi' ? 'एकदम सही / नई जैसी स्थिति' : 'Pristine / Excellent condition'}</option>
                    <option value="scratched">{lang === 'hi' ? 'खरोंच युक्त शीशा या पुराना केस' : 'Scratched glass or worn case'}</option>
                    <option value="stopped_sometimes">{lang === 'hi' ? 'कभी-कभी रुकती है / समय पीछे रहता है' : 'Stops sometimes / Delay in time'}</option>
                    <option value="loose_fit">{lang === 'hi' ? 'कलाई पर बहुत ढीली या असंतुलित' : 'Very loose or unstable fit'}</option>
                  </select>
                </div>
              </div>

              {/* Primary Life Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {lang === 'hi' ? '६. वर्तमान मुख्य लक्ष्य (Primary Goal)' : '6. Your Primary Goal (वर्तमान मुख्य लक्ष्य)'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'career_growth', labelEn: 'Career Growth', labelHi: 'करियर वृद्धि' },
                    { id: 'wealth_flow', labelEn: 'Wealth Inflow', labelHi: 'धन प्रवाह व समृद्धि' },
                    { id: 'mental_peace', labelEn: 'Mental Peace', labelHi: 'मानसिक शांति' },
                    { id: 'relationship_harmony', labelEn: 'Relationships', labelHi: 'पारिवारिक संबंध' }
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
                      {lang === 'hi' ? goal.labelHi : goal.labelEn}
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
                      {lang === 'hi' ? 'ऊर्जा निदान परिणाम' : 'Diagnostic Result'}
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
                    <div className="text-[10px] text-stone-500">{lang === 'hi' ? 'ऊर्जा सूचकांक' : 'Vibration Index'}</div>
                  </div>
                </div>

                {/* Live Animated Horological Watch & Pulse Meridian Graphic */}
                <div className="bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-xl p-4 mb-5 border border-amber-500/40 relative overflow-hidden shadow-inner">
                  {/* Background Radial Glow */}
                  <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/80 mb-2 pb-1 border-b border-amber-800/60">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{lang === 'hi' ? 'नाड़ी एवं कलाई ऊर्जा तरंग' : 'LIVE MERIDIAN SIMULATION'}</span>
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
                        {lang === 'hi' ? 'रेडियल नाड़ी स्पंदन एवं ऊर्जा अनुनाद' : 'Radial Artery Pulse Resonance'}
                      </div>
                      <p className="text-[10px] text-stone-300 leading-tight">
                        {lang === 'hi' ? (
                          <span>
                            कलाई:{' '}
                            <strong>
                              {formData.wornWrist === 'right' ? 'दायाँ हाथ (सूर्य / सक्रिय ऊर्जा)' : 'बायाँ हाथ (चंद्र / ग्रहणशील ऊर्जा)'}
                            </strong>{' '}
                            · ऊर्जा प्रवाह: <strong>{diagnosis.energyAssessment}</strong>
                          </span>
                        ) : (
                          <span>
                            Worn on{' '}
                            <strong>{formData.wornWrist === 'right' ? 'Right (Surya / Active)' : 'Left (Chandra / Receptive)'}</strong>{' '}
                            wrist · Energy flow: <strong>{diagnosis.energyAssessment}</strong>
                          </span>
                        )}
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
                    {lang === 'hi' ? 'घड़ी से जुड़े सकारात्मक ऊर्जा प्रभाव:' : 'Observed Energetic Alignments:'}
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
                      {lang === 'hi' ? 'घड़ी से जुड़ी सुधारात्मक चेतावनी:' : 'Key Watch Remedy Alert:'}
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
                  <span className="font-bold text-stone-800 block">
                    {lang === 'hi' ? 'अवचेतन मन पर प्रभाव:' : 'Subconscious Pulse Polarity:'}
                  </span>
                  {diagnosis.impactOnSubconscious.map((imp, idx) => (
                    <p key={idx}>{imp}</p>
                  ))}
                </div>

                {/* Driver Specific Watch Prescription */}
                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-300 text-xs text-amber-950 mb-4 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'hi'
                        ? `अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी द्वारा मूलांक ${userDriver} (${PLANETARY_ARCHETYPES[userDriver].planet.split(' ')[0]}) हेतु अनुकूल घड़ी निर्देश:`
                        : `Numerologist & Healer · Randhir Singh’s Driver ${userDriver} (${PLANETARY_ARCHETYPES[userDriver].planet.split(' ')[0]}) Watch Calibration:`}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-700 leading-relaxed">
                    {lang === 'hi'
                      ? userDriver === 1
                        ? 'सूर्य (Surya): गोल स्वर्ण डायल, स्टेनलेस स्टील केसिंग एवं सक्रिय सेकंड हैंड, जो नेतृत्व क्षमता, प्रशासनिक अधिकार एवं प्रतिष्ठा को सुदृढ़ करते हैं।'
                        : userDriver === 2
                        ? 'चंद्र (Chandra): गोल रजत (सिल्वर) घड़ी, मोती श्वेत या चमकदार सिल्वर डायल, जो भावनात्मक चंचलता को शांत कर रचनात्मकता बढ़ाते हैं।'
                        : userDriver === 3
                        ? 'गुरु (Guru): गोल स्वर्ण-युक्त घड़ी, पीला, सुनहरा या क्रीम डायल, जो ज्ञान, गुरु-कृपा एवं स्थाई समृद्धि का विस्तार करते हैं।'
                        : userDriver === 4
                        ? 'राहु (Rahu): अष्टकोणीय या संतुलित चौकोर डायल, स्लेटी या नेवी ब्लू रंग; अनियमित ज़िगज़ैग डायल से बचें ताकि करियर में स्थिरता बनी रहे।'
                        : userDriver === 5
                        ? 'बुध (Budh): संतुलित चौकोर अथवा गोल डायल, पन्ना हरा, फ़िरोज़ी या स्वच्छ श्वेत रंग, जो व्यापारिक लेन-देन व विक्रय क्षमता को गति देते हैं।'
                        : userDriver === 6
                        ? 'शुक्र (Shukra): पॉलिश की हुई सिल्वर या रोज़-गोल्ड लक्ज़री घड़ी, डायमंड-कट बेज़ल एवं पेस्टल डायल, जो दांपत्य सुख व आकर्षण बढ़ाते हैं।'
                        : userDriver === 7
                        ? 'केतु (Ketu): परिष्कृत स्टेनलेस स्टील सिल्वर घड़ी, स्मोकी ग्रे या मैट व्हाइट डायल, जो शोध, गहन चिंतन व आध्यात्मिक एकाग्रता को साधते हैं।'
                        : userDriver === 8
                        ? 'शनि (Shani): सुदृढ़ भारी-धातु, गहरा नीला या काला डायल, अनुशासन से धारण करने पर दीर्घकालीन संघर्षों को विशाल सफलता में बदलता है।'
                        : 'मंगल (Mangal): डायनामिक गोल स्पोर्ट्स या स्टील क्रोनोग्राफ, लाल/मैरून सेकंड हैंड, जो साहस, ऊर्जा और विजय का मार्ग प्रशस्त करते हैं।'
                      : userDriver === 1
                      ? 'For Sun (Surya): Round gold dial with stainless steel casing and active second hand to command unshakeable leadership and administrative power.'
                      : userDriver === 2
                      ? 'For Moon (Chandra): Round silver watch with pearl white or shimmering silver dial to calm emotional restlessness and ignite intuitive creativity.'
                      : userDriver === 3
                      ? 'For Jupiter (Guru): Round gold-toned watch with bright yellow, golden, or cream dial to expand wisdom, mentorship, and high ethical wealth.'
                      : userDriver === 4
                      ? 'For Rahu: Octagonal or clean square dial in grey, navy, or khaki; avoid irregular zigzag dials to stabilize sudden career fluctuations.'
                      : userDriver === 5
                      ? 'For Mercury (Budh): Balanced square or round dial with emerald green, turquoise, or clean white face to accelerate commercial cashflow and sales magnetism.'
                      : userDriver === 6
                      ? 'For Venus (Shukra): Luxury polished silver or rose gold watch with sparkling or diamond-accented bezel and pastel/white dial for romantic harmony and brand glamour.'
                      : userDriver === 7
                      ? 'For Ketu: Refined stainless steel silver watch with smoky grey or matte white dial to anchor spiritual focus and intuitive research skills.'
                      : userDriver === 8
                      ? 'For Saturn (Shani): Sturdy heavy-metal blue or black dial watch worn with strict discipline to convert long struggles into massive permanent legacy.'
                      : 'For Mars (Mangal): Dynamic round sports or steel chronograph with bold maroon or red second-hand to channel courageous action into unstoppable victory.'}
                  </p>
                </div>

                {/* Therapy Watch Recommendation Box */}
                <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-amber-100 rounded-xl p-4 border border-amber-400/50 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-300 font-sacred text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'थेरेपी वॉच अनुशंसा' : 'Therapy Watch Prescription'}</span>
                  </div>
                  <div className="text-xs space-y-1 text-amber-100/90">
                    <p><strong className="text-amber-200">{lang === 'hi' ? 'अनुकूल आकार:' : 'Recommended Geometry:'}</strong> {diagnosis.therapyWatchPrescription.recommendedShape}</p>
                    <p><strong className="text-amber-200">{lang === 'hi' ? 'डायल का रंग:' : 'Dial Hue:'}</strong> {diagnosis.therapyWatchPrescription.recommendedDialColor}</p>
                    <p><strong className="text-amber-200">{lang === 'hi' ? 'पट्टा / ब्रेसलेट:' : 'Strap / Mesh:'}</strong> {diagnosis.therapyWatchPrescription.recommendedStrap}</p>
                    <p><strong className="text-amber-200">{lang === 'hi' ? 'पहनने का हाथ:' : 'Wear On:'}</strong> {diagnosis.therapyWatchPrescription.recommendedWrist}</p>
                    <p><strong className="text-amber-200">{lang === 'hi' ? 'शुभ मुहूर्त:' : 'Best Muhurat:'}</strong> {diagnosis.therapyWatchPrescription.activationTiming}</p>
                  </div>
                  <p className="text-[11px] text-amber-300/80 pt-1 border-t border-amber-800/80 italic">
                    {lang === 'hi' ? '💡 विशेष सुझाव:' : '💡 Tip:'} {diagnosis.therapyWatchPrescription.specialTip}
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
                  <span>{lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी से व्यक्तिगत घड़ी परामर्श प्राप्त करें' : 'Get Numerologist & Healer · Randhir Singh’s Personal Watch Analysis'}</span>
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
                <h4 className="font-sacred font-bold text-stone-900 text-sm">
                  {lang === 'hi' ? 'समयबद्ध धन प्रवाह' : 'Punctuality of Wealth'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'जब आपकी घड़ी की गति एवं डायल ग्रहों के अनुकूल होते हैं, तो अटके हुए सौदे तेज़ी से पूरे होते हैं और धन का आवक सुगम बनता है।'
                    : 'When your watch movement and dial reflect planetary harmony, contracts clear faster and cash rotation becomes prompt and frictionless.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sacred font-bold text-stone-900 text-sm">
                  {lang === 'hi' ? 'अवचेतन विलंब का निवारण' : 'Eliminates Subconscious Delays'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'खरोंच युक्त शीशा या रुकने वाली घड़ी अवचेतन मन में काम टालने की आदत बनाती है। अनुकूलित थेरेपी वॉच जीवन को नई गति प्रदान करती है।'
                    : 'Scratched crystals or lagging battery cells subtly program your neural pathways to accept delayed results. A prescribed therapy watch restores swift momentum.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sacred font-bold text-stone-900 text-sm">
                  {lang === 'hi' ? 'लो-शू ग्रिड अनुसार संतुलन' : 'Customized to Your Lo-Shu Grid'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'यदि आपकी जन्म कुंडली में अग्नि या पृथ्वी तत्व की कमी है, तो घड़ी की धातु, डायल आकार एवं सेकंड की सुई उस रिक्तता को पूर्ण करते हैं।'
                    : 'If your birth grid lacks the Fire or Earth element, the watch metal, dial geometry, and ticking tempo act as a physical supplement to fill the void.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
