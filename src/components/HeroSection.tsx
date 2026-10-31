import React from 'react';
import { Compass, Watch, Droplets, Gem, Sparkles, MessageCircle, Phone, Clock, ArrowRight, ShieldCheck, MapPin, CreditCard } from 'lucide-react';
import { Language, PageBlock } from '../types';
import { getTranslation, ALL_LANGUAGES } from '../i18n/languages';
import { useCmsPages } from '../context/CmsPageContext';

interface HeroSectionProps {
  lang: string;
  setLang: (l: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  setLang,
  onNavigate,
  onOpenBooking
}) => {
  const t = getTranslation(lang);
  const { getPageBySectionId } = useCmsPages();
  const cmsHero = getPageBySectionId('hero-section');
  const heroBlock = cmsHero?.blocks?.find((b: PageBlock) => b.type === 'hero');

  const rawHeadline = (lang === 'hi' ? cmsHero?.titleHi : cmsHero?.title) || t.motto;
  const cleanHeadline = (rawHeadline || '')
    .replace(/Hero Banner & Tagline/gi, '')
    .replace(/शीर्ष मुख्य बैनर[^]*/gi, '')
    .trim() || t.motto;
  const headline = cleanHeadline.startsWith('“') ? cleanHeadline : `“${cleanHeadline}”`;
  const subHeadline = heroBlock?.subtitle || (lang === 'hi' 
    ? 'अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें।' 
    : 'Understand your Date of Birth. Recognize your life patterns. Move forward with confidence.');

  return (
    <section id="home" className="relative overflow-hidden scroll-mt-20 bg-gradient-to-b from-[#faf6ee] via-[#f7f2e5] to-[#faf6ee] pt-8 pb-14 border-b border-amber-200/80">
      {/* Divine Rotating Vedic Mandala & Celestial Geometry Graphic with 9 Navagraha Cosmic Spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[980px] sm:h-[980px] pointer-events-none opacity-[0.24] select-none overflow-hidden">
        {/* Outer Rotating 12-Ray Solar Sun Wheel & Lotus Circle */}
        <svg viewBox="0 0 800 800" className="w-full h-full animate-spin-slow">
          <circle cx="400" cy="400" r="380" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6,8" />
          <circle cx="400" cy="400" r="340" fill="none" stroke="#b45309" strokeWidth="1" />
          {/* 12 Zodiac Axis Lines */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="400"
              y1="40"
              x2="400"
              y2="90"
              stroke="#d97706"
              strokeWidth="2.5"
              transform={`rotate(${deg} 400 400)`}
            />
          ))}
          {/* 16 Lotus Petals */}
          {[...Array(16)].map((_, i) => (
            <path
              key={i}
              d="M 400 120 C 425 180 435 240 400 300 C 365 240 375 180 400 120 Z"
              fill="none"
              stroke="#b45309"
              strokeWidth="1.2"
              transform={`rotate(${i * 22.5} 400 400)`}
            />
          ))}
          {/* 9 Planetary Spheres (Navagraha Orbital Nodes) */}
          {[
            { angle: 0, r: 340, name: 'Surya', color: '#f59e0b' },
            { angle: 40, r: 310, name: 'Chandra', color: '#fef3c7' },
            { angle: 80, r: 340, name: 'Mangala', color: '#ef4444' },
            { angle: 120, r: 310, name: 'Budha', color: '#10b981' },
            { angle: 160, r: 340, name: 'Guru', color: '#fbbf24' },
            { angle: 200, r: 310, name: 'Shukra', color: '#fbcfe8' },
            { angle: 240, r: 340, name: 'Shani', color: '#3b82f6' },
            { angle: 280, r: 310, name: 'Rahu', color: '#854d0e' },
            { angle: 320, r: 340, name: 'Ketu', color: '#78716c' },
          ].map((planet, idx) => (
            <g key={idx} transform={`rotate(${planet.angle} 400 400)`}>
              <circle cx="400" cy={400 - planet.r} r="7" fill={planet.color} stroke="#78350f" strokeWidth="1.5" />
              <circle cx="400" cy={400 - planet.r} r="12" fill="none" stroke={planet.color} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Counter-Rotating Divine Sri Yantra Interlocking Triangles */}
        <svg viewBox="0 0 800 800" className="w-full h-full absolute inset-0 animate-spin-reverse">
          <circle cx="400" cy="400" r="280" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,6" />
          {/* Upward Triangles */}
          <polygon points="400,160 580,480 220,480" fill="none" stroke="#b45309" strokeWidth="1.8" />
          <polygon points="400,200 550,460 250,460" fill="none" stroke="#d97706" strokeWidth="1.4" />
          {/* Downward Triangles */}
          <polygon points="400,640 220,320 580,320" fill="none" stroke="#b45309" strokeWidth="1.8" />
          <polygon points="400,600 250,340 550,340" fill="none" stroke="#d97706" strokeWidth="1.4" />
          {/* Central Chakra Ring */}
          <circle cx="400" cy="400" r="140" fill="none" stroke="#f59e0b" strokeWidth="2" />
        </svg>

        {/* Pulsing Central Aura Disc */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-radial from-amber-400/40 via-amber-600/20 to-transparent blur-2xl animate-aura-pulse" />
      </div>

      {/* Floating Starlight Particle Gleams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-amber-400 animate-float-subtle opacity-60 blur-[0.5px]" />
        <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-amber-300 animate-float-delayed opacity-50 blur-[0.5px]" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-500 animate-float-delayed opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 rounded-full bg-amber-200 animate-float-subtle opacity-70 blur-[0.5px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bilingual Base Language Switcher & 24 National/International Languages Bar */}
        <div className="mb-6 p-3 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-amber-300/80 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Base Language Switcher: English & हिन्दी */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Base Languages:
              </span>
              <div className="inline-flex items-center p-1 bg-amber-50 rounded-xl border border-amber-300">
                <button
                  onClick={() => setLang('en')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-xs scale-102'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English (Primary Base)</span>
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'hi'
                      ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-xs scale-102'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
                  }`}
                >
                  <span>🇮🇳</span>
                  <span>हिन्दी (मुख्य आधार)</span>
                </button>
              </div>
            </div>

            {/* National & International Language Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
              <span className="text-[11px] font-semibold text-stone-500 shrink-0 hidden sm:inline">
                National &amp; International:
              </span>
              {ALL_LANGUAGES.filter((l) => l.code !== 'en' && l.code !== 'hi').map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-all font-medium border ${
                    lang === l.code
                      ? 'bg-amber-800 text-white font-bold border-amber-800 shadow-2xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                  title={`${l.name} (${l.category === 'national' ? 'National / Indian' : 'International'})`}
                >
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divine Header Invocation (Om Shri Ganeshay Namh) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/10 via-amber-700/20 to-amber-900/10 text-amber-950 px-4 py-1.5 rounded-full border border-amber-300/80 text-xs font-sacred font-bold tracking-widest shadow-2xs">
            <span>卐</span>
            <span>{t.divineHeader}</span>
            <span>卐</span>
          </div>

          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-900 mt-3">
            {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}
          </h2>
        </div>

        {/* Core Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
            {headline}
          </h1>

          <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-3 tracking-wide">
            {subHeadline}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            {cmsHero?.description || t.subMotto}
          </p>

          {/* Location & Quick Credentials Pill */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-6 text-xs text-stone-700 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/80 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'रणधीर सिंह · जयपुर, राजस्थान · ऑनलाइन परामर्श उपलब्ध' : 'Randhir Singh · Jaipur, Rajasthan · Online Consultations Available'}</span>
            </span>
            <span className="hidden sm:inline text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'समय: सुबह 9:00 से शाम 6:00 बजे तक' : 'Timings: 9:00 AM to 6:00 PM (IST)'}</span>
            </span>
            <span className="hidden sm:inline text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'व्हाट्सएप/कॉल/UPI: ' : 'WhatsApp/Call/UPI: '}<strong>+91-9509593150</strong></span>
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => onNavigate('dob')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5 shrink-0"
            >
              <Compass className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t.calculateButton}</span>
              <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-bold py-3.5 px-6 rounded-xl text-sm border-2 border-stone-300 hover:border-amber-400 shadow-2xs transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.bookConsultation}</span>
            </button>

            <button
              onClick={() => onNavigate('tariff')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold py-3.5 px-5 rounded-xl text-sm border-2 border-amber-300 hover:border-amber-400 shadow-2xs transition-all shrink-0"
              title={lang === 'hi' ? 'परामर्श एवं हीलिंग सेवाएं फीस' : 'Consultancy & Healing Services Fees'}
            >
              <CreditCard className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{lang === 'hi' ? 'परामर्श व हीलिंग फीस' : 'Consultancy & Healing Fees'}</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Specialty Launchpads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Card 1: Watch Analysis */}
          <div
            onClick={() => onNavigate('watch')}
            className="cursor-pointer bg-white/95 rounded-xl p-5 border-2 border-amber-300/80 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Watch className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {lang === 'hi' ? 'खास सेवा' : 'Signature Service'}
            </span>
            <h3 className="font-sacred font-bold text-stone-900 text-base mt-2 group-hover:text-amber-900">
              {lang === 'hi' ? 'हाथ की घड़ी (वॉच थेरेपी गाइडेंस)' : 'Watch Analysis & Therapy Guidance'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">
              {lang === 'hi' 
                ? 'कलाई की घड़ी का डायल, रंग और शेप आपकी ऊर्जा और तरक्की पर गहरा असर डालते हैं। जानिए आपके लिए कौन सी घड़ी लकी है।' 
                : 'Your wristwatch sits on your pulse. Discover how dial shape, color, and metal influence your focus, career, and personal energy.'}
            </p>
            <div className="mt-3 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>{lang === 'hi' ? 'घड़ी की जांच करें →' : 'Analyze Watch →'}</span>
            </div>
          </div>

          {/* Card 2: Salt Therapy */}
          <div
            onClick={() => onNavigate('salt')}
            className="cursor-pointer bg-white/95 rounded-xl p-5 border-2 border-amber-300/80 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {lang === 'hi' ? 'सरल घरेलू उपाय' : 'Simple Remedy'}
            </span>
            <h3 className="font-sacred font-bold text-stone-900 text-base mt-2 group-hover:text-amber-900">
              {lang === 'hi' ? 'सॉल्ट थेरेपी (सेंधा नमक से नेगेटिविटी दूर करें)' : 'Negativity Removal & Salt Therapy'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">
              {lang === 'hi'
                ? 'सेंधा नमक के पानी से पैर धोना, घर में पोछा लगाना और औरा साफ करने के आसान और असरदार तरीके।'
                : 'Traditional rock salt foot soaks, doorstep energy shields, and easy home cleansing techniques.'}
            </p>
            <div className="mt-3 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>{lang === 'hi' ? 'उपाय देखें →' : 'View Salt Remedies →'}</span>
            </div>
          </div>

          {/* Card 3: Crystal Therapy */}
          <div
            onClick={() => onNavigate('crystal')}
            className="cursor-pointer bg-white/95 rounded-xl p-5 border-2 border-amber-300/80 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Gem className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {lang === 'hi' ? 'नेचुरल स्टोन' : 'Healing Crystals'}
            </span>
            <h3 className="font-sacred font-bold text-stone-900 text-base mt-2 group-hover:text-amber-900">
              {lang === 'hi' ? 'बिजनेस और जॉब के लिए क्रिस्टल थेरेपी' : 'Crystal Therapy for Career & Money'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">
              {lang === 'hi'
                ? 'पायराइट, सिट्रीन और ग्रीन एवेंच्यूरिन जैसे असली क्रिस्टल जो धन, सफलता और शांति लाते हैं।'
                : 'Natural Pyrite, Citrine, and Green Aventurine crystals chosen to attract wealth, confidence, and peace.'}
            </p>
            <div className="mt-3 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>{lang === 'hi' ? 'क्रिस्टल देखें →' : 'View Crystals →'}</span>
            </div>
          </div>

          {/* Card 4: Date of Birth & Lo-Shu */}
          <div
            onClick={() => onNavigate('dob')}
            className="cursor-pointer bg-white/95 rounded-xl p-5 border-2 border-amber-300/80 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {lang === 'hi' ? 'फ्री कैलकुलेटर' : 'Free Tool'}
            </span>
            <h3 className="font-sacred font-bold text-stone-900 text-base mt-2 group-hover:text-amber-900">
              {lang === 'hi' ? 'लो-शू मैजिक ग्रिड और जन्मतिथि कैलकुलेटर' : '3×3 Lo-Shu Magic Grid Calculator'}
            </h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">
              {lang === 'hi'
                ? 'अपनी जन्मतिथि डालकर अपना मूलांक (ड्राइवर), भाग्यांक (कंडक्टर) और लकी नंबर तुरंत जानें।'
                : 'Enter your date of birth to discover your Driver number, Conductor number, and lucky grid planes.'}
            </p>
            <div className="mt-3 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>{lang === 'hi' ? 'नंबर जानें →' : 'Check Your Numbers →'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
