import React, { useState } from 'react';
import {
  Sparkles,
  Watch,
  Calendar,
  Clock,
  Baby,
  PhoneCall,
  ShieldAlert,
  FileSignature,
  HeartHandshake,
  Users,
  Volume2,
  Sun,
  Binary,
  Grid,
  Trophy,
  Gem,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  Shield,
  Coins,
  Crown,
  Award,
  Heart,
  Briefcase,
  HelpCircle,
  MapPin,
  Gift,
  ChevronRight,
  Share2
} from 'lucide-react';
import { SERVICES_DETAIL_DATA, ServiceDetailItem } from '../../data/servicesDetailData';
import { ALL_SERVICES } from '../../data/servicesData';
import { Language } from '../../types';
import { useCmsPages } from '../../context/CmsPageContext';

interface IndividualServicePageProps {
  serviceId: number;
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToService: (serviceId: number) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

export const IndividualServicePage: React.FC<IndividualServicePageProps> = ({
  serviceId,
  lang,
  onNavigateHome,
  onNavigateToService,
  onOpenBooking
}) => {
  // Ensure serviceId is in bounds 1-16
  const validId = Math.max(1, Math.min(16, serviceId || 1));
  const service = SERVICES_DETAIL_DATA[validId] || SERVICES_DETAIL_DATA[1];

  const { getPage } = useCmsPages();
  const cmsPage = getPage(`service-${validId}`);
  const cmsHeroBlock = cmsPage?.blocks?.find((b) => b.type === 'hero');
  const cmsTextBlock = cmsPage?.blocks?.find((b) => b.type === 'text');
  const cmsCardBlock = cmsPage?.blocks?.find((b) => b.type === 'consultation' || b.type === 'booking-card');

  const displayTitle = lang === 'hi'
    ? (cmsPage?.titleHi || cmsHeroBlock?.title || service.titleHi)
    : (cmsPage?.title || cmsHeroBlock?.title || service.titleEn);

  const displayTagline = lang === 'hi'
    ? (cmsHeroBlock?.subtitle || service.taglineHi)
    : (cmsHeroBlock?.subtitle || service.taglineEn);

  const displayFullDesc = cmsTextBlock?.content || (lang === 'hi' ? service.fullDescHi : service.fullDescEn);
  const displayTariff = cmsCardBlock?.price || service.suggestedTariff || '₹5,100';
  const displayImage = cmsHeroBlock?.imageUrl || (validId === 2 ? '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png' : '/Randhir Singh.png');

  // Quick Interactive Mini-Tools State per service
  const [interactiveInput, setInteractiveInput] = useState<string>('');
  const [interactiveResult, setInteractiveResult] = useState<string | null>(null);
  const [japaCount, setJapaCount] = useState<number>(0);

  // Switchwords helper
  const handleCountJapa = () => {
    setJapaCount((prev) => (prev + 1) % 109);
  };

  // Icon mapping
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Watch': return Watch;
      case 'Calendar': return Calendar;
      case 'Clock': return Clock;
      case 'Baby': return Baby;
      case 'PhoneCall': return PhoneCall;
      case 'ShieldAlert': return ShieldAlert;
      case 'FileSignature': return FileSignature;
      case 'HeartHandshake': return HeartHandshake;
      case 'Users': return Users;
      case 'Volume2': return Volume2;
      case 'Sun': return Sun;
      case 'Binary': return Binary;
      case 'Grid': return Grid;
      case 'Trophy': return Trophy;
      case 'Gem': return Gem;
      default: return Sparkles;
    }
  };

  const getBenefitIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return Briefcase;
      case 'Shield': return Shield;
      case 'Heart': return Heart;
      case 'Coins': return Coins;
      case 'Zap': return Sparkles;
      case 'Award': return Award;
      case 'Crown': return Crown;
      case 'PhoneCall': return PhoneCall;
      case 'Sun': return Sun;
      case 'Users': return Users;
      case 'Trophy': return Trophy;
      case 'Sparkles': return Sparkles;
      default: return CheckCircle2;
    }
  };

  const ServiceIcon = getServiceIcon(service.iconName);

  // Prev & Next navigation
  const prevId = validId === 1 ? 16 : validId - 1;
  const nextId = validId === 16 ? 1 : validId + 1;
  const prevService = SERVICES_DETAIL_DATA[prevId];
  const nextService = SERVICES_DETAIL_DATA[nextId];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${service.titleEn} · Numerologist & Healer · Randhir Singh`,
        text: service.taglineEn,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Service link copied to clipboard!');
    }
  };

  return (
    <div className="py-6 sm:py-10 bg-[#fdfbf7] min-h-screen">
      {/* Top Breadcrumb & Quick Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? '← मुख्य पृष्ठ' : '← Back Home'}</span>
            </button>
            <span className="text-stone-300">/</span>
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('all-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-medium text-stone-600 hover:text-amber-900"
            >
              {lang === 'hi' ? '16 पवित्र सेवाएँ' : 'All 16 Divine Services'}
            </button>
            <span className="text-stone-300">/</span>
            <span className="font-bold text-stone-900 truncate max-w-[150px] sm:max-w-xs">
              {lang === 'hi' ? service.titleHi : service.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-amber-900 bg-stone-50 hover:bg-amber-50 px-2.5 py-1.5 rounded-lg border border-stone-200"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'साझा करें' : 'Share'}</span>
            </button>

            {/* Service 01..16 Selector Dropdown */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-400 font-mono hidden sm:inline">{lang === 'hi' ? 'सेवा चुनें:' : 'Jump to:'}</span>
              <select
                value={validId}
                onChange={(e) => onNavigateToService(Number(e.target.value))}
                className="bg-amber-50 text-amber-900 font-bold text-xs py-1.5 px-2.5 rounded-lg border border-amber-300 focus:outline-none"
              >
                {ALL_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id < 10 ? `0${s.id}` : s.id}. {s.titleEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header for This Specific Service */}
        <div className="relative bg-gradient-to-br from-stone-950 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-2xl overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400 text-amber-300 font-mono font-bold text-sm flex items-center justify-center">
                  {validId < 10 ? `0${validId}` : validId}
                </span>

                <span className="bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md">
                  {service.badge}
                </span>

                <span className="text-amber-200/80 text-xs border border-amber-400/30 px-3 py-1 rounded-md">
                  {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह प्रामाणिक सेवा' : 'Authentic Numerologist & Healer · Randhir Singh Portfolio'}
                </span>
              </div>

              <h1 className="font-sacred text-2xl sm:text-4xl lg:text-5xl font-black text-amber-100 leading-tight">
                {displayTitle}
              </h1>

              <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-2xl leading-relaxed">
                {displayTagline}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking(displayTitle, displayTariff)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black py-3 px-6 rounded-xl text-xs sm:text-sm shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4 text-stone-900" />
                  <span>{lang === 'hi' ? 'यह परामर्श बुक करें' : 'Book This Consultation'}</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </button>

                <a
                  href={`https://wa.me/919509593150?text=Hello%20Master%20Randhir%20Singh%20Ji%2C%20I%20am%20interested%20in%20Service%20${validId}%3A%20${encodeURIComponent(displayTitle)}.%20Please%20guide%20me.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'WhatsApp Randhir Ji'}</span>
                </a>
              </div>
            </div>

            {/* Right Card: Quick Honorarium & Sanctuary Highlight */}
            <div className="lg:col-span-4 bg-stone-900/90 border border-amber-400/40 rounded-2xl p-5 backdrop-blur-xs space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-stone-300">{lang === 'hi' ? 'परामर्श सहयोग राशि' : 'Consultation Honorarium'}</span>
                <span className="text-xl font-sacred font-extrabold text-amber-400 font-mono">
                  {displayTariff}
                </span>
              </div>

              <div className="text-xs text-stone-300 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Mahadev Nagar, Jagatpura, Jaipur (302017)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>9:00 AM – 6:00 PM Daily (Worldwide Online Available)</span>
                </div>
                <div className="flex items-start gap-2 text-amber-300 font-semibold bg-amber-950/60 p-2 rounded-lg border border-amber-500/30">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Sunday Special: First 5 consultations FREE (Appointment required)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column: Deep Scientific & Practical Breakdown */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. In-Depth Vedic & Subconscious Analysis */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-md w-fit border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{lang === 'hi' ? 'गहन पद्धति एवं कार्यप्रणाली' : 'Comprehensive Methodology & Overview'}</span>
              </div>

              <h2 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900">
                {lang === 'hi' ? 'इस सेवा का गूढ़ वैदिक एवं उपचारात्मक विज्ञान' : 'The Divine Vedic & Energetic Science Behind This Service'}
              </h2>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {lang === 'hi' ? service.fullDescHi : service.fullDescEn}
              </p>
            </div>

            {/* 2. Core Scientific Principles (3 Pillars) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-6">
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-700" />
                <span>{lang === 'hi' ? '3 प्रमुख तात्विक आधार एवं नियम' : '3 Core Energetic & Mathematical Pillars'}</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {service.sciencePrinciples.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#fdfbf7] border border-amber-200 hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <h4 className="font-sacred font-bold text-stone-900 text-base">
                        {lang === 'hi' ? pillar.titleHi : pillar.titleEn}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 pl-8 leading-relaxed">
                      {lang === 'hi' ? pillar.descHi : pillar.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Interactive Quick Tool / Visual Preview Tailored to This Service */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                    Interactive Live Diagnostic
                  </span>
                  <h3 className="font-sacred text-lg sm:text-xl font-bold text-stone-900 mt-1">
                    {lang === 'hi' ? `सेवा #${validId} का त्वरित परीक्षण` : `Service #${validId} Instant Diagnostic Check`}
                  </h3>
                </div>
                <ServiceIcon className="w-7 h-7 text-amber-800" />
              </div>

              {/* Specific interactive module based on service ID */}
              {validId === 1 && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'अपनी जन्म तारीख का दिन दर्ज करें (जैसे 1 से 31) और अपना मूलांक एवं स्वामी ग्रह जानें:'
                      : 'Enter your birth day (1 to 31) to instantly calculate your core Driver (Mulank) and ruling planet:'}
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="e.g. 24"
                      value={interactiveInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInteractiveInput(val);
                        const n = Number(val);
                        if (n >= 1 && n <= 31) {
                          const root = n <= 9 ? n : (n % 9 === 0 ? 9 : n % 9);
                          const planets = ['', 'Surya (Sun) · 1', 'Chandra (Moon) · 2', 'Guru (Jupiter) · 3', 'Rahu · 4', 'Budh (Mercury) · 5', 'Shukra (Venus) · 6', 'Ketu · 7', 'Shani (Saturn) · 8', 'Mangal (Mars) · 9'];
                          setInteractiveResult(`Mulank: ${root} — Ruled by ${planets[root]}`);
                        } else {
                          setInteractiveResult(null);
                        }
                      }}
                      className="px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs w-32 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                    {interactiveResult && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-2 rounded-xl border border-amber-300">
                        {interactiveResult}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {(validId === 2 || validId === 4) && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'अपनी वर्तमान घड़ी का डायल रंग चुनें और उसकी ऊर्जा जानें:'
                      : 'Select your watch dial color to discover its energetic impulse on your pulse:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'White / Silver', eff: 'Lunar Calm, Venusian Elegance & Mental Peace' },
                      { name: 'Royal Blue', eff: 'Saturnine Discipline, Jupiterian Wisdom & High Authority' },
                      { name: 'Gold / Champagne', eff: 'Solar Vitality, Leadership, and Regal Confidence' },
                      { name: 'Black', eff: 'Deep Focus but can trigger emotional heaviness if Saturn is afflicted' }
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setInteractiveResult(c.eff)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-colors"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                  {interactiveResult && (
                    <div className="text-xs font-bold text-amber-900 bg-amber-100/90 p-2.5 rounded-xl border border-amber-300">
                      {interactiveResult}
                    </div>
                  )}
                </div>
              )}

              {validId === 6 && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'अपने 10 अंकों के मोबाइल नंबर के अंक दर्ज करें और एकल योग (Root Number) निकालें:'
                      : 'Enter your 10-digit mobile number to calculate its single root sum and financial compatibility:'}
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="e.g. 9509593150"
                      value={interactiveInput}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '');
                        setInteractiveInput(digits);
                        if (digits.length > 0) {
                          const sum = digits.split('').reduce((acc, d) => acc + Number(d), 0);
                          let root = sum;
                          while (root > 9) {
                            root = String(root).split('').reduce((acc, d) => acc + Number(d), 0);
                          }
                          setInteractiveResult(`Compound Sum: ${sum} → Single Root: ${root}`);
                        } else {
                          setInteractiveResult(null);
                        }
                      }}
                      className="px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs w-44 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                    {interactiveResult && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-2 rounded-xl border border-amber-300 font-mono">
                        {interactiveResult}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {validId === 8 && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'अपना नाम टाइप करें और काल्डियन अक्षर मान का कुल योग देखें:'
                      : 'Type your name to test its primary Chaldean acoustic vibration:'}
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. RANDHIR"
                      value={interactiveInput}
                      onChange={(e) => {
                        const str = e.target.value.toUpperCase();
                        setInteractiveInput(str);
                        const chaldeanMap: Record<string, number> = {
                          A: 1, I: 1, J: 1, Q: 1, Y: 1,
                          B: 2, K: 2, R: 2,
                          C: 3, G: 3, L: 3, S: 3,
                          D: 4, M: 4, T: 4,
                          E: 5, H: 5, N: 5, X: 5,
                          U: 6, V: 6, W: 6,
                          O: 7, Z: 7,
                          F: 8, P: 8
                        };
                        let sum = 0;
                        for (const char of str) {
                          if (chaldeanMap[char]) sum += chaldeanMap[char];
                        }
                        if (sum > 0) {
                          let root = sum;
                          while (root > 9) {
                            root = String(root).split('').reduce((acc, d) => acc + Number(d), 0);
                          }
                          setInteractiveResult(`Chaldean Value: ${sum} (Root ${root})`);
                        } else {
                          setInteractiveResult(null);
                        }
                      }}
                      className="px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs w-44 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase font-mono"
                    />
                    {interactiveResult && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-2 rounded-xl border border-amber-300 font-mono">
                        {interactiveResult}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {validId === 11 && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'दिव्य स्विचवर्ड का 28 या 108 बार मानसिक जप करें (काउंटर पर टैप करें):'
                      : 'Chant this divine wellness switchword and tap to count your japa cycles (Target: 28x or 108x):'}
                  </p>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="font-sacred font-black text-amber-950 text-base sm:text-lg tracking-wider">
                      GOLDEN SUNRISE · RESTORE · DIVINE LIGHT
                    </span>
                    <button
                      onClick={handleCountJapa}
                      className="ml-auto bg-amber-800 text-white font-mono font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-amber-900 transition-colors shrink-0 shadow-2xs"
                    >
                      Count: {japaCount} / 108
                    </button>
                  </div>
                </div>
              )}

              {validId === 13 && (
                <div className="space-y-2">
                  <p className="text-xs text-stone-600">
                    {lang === 'hi' ? 'लोकप्रिय सिद्ध हीलिंग कोड्स:' : 'Most Popular Grabovoi & Divine Numerical Frequencies:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200 font-mono">
                      <strong className="text-amber-900 block text-sm">520 741 8</strong>
                      <span className="text-[11px] text-stone-500">Unexpected Cash Inflow &amp; Wealth</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200 font-mono">
                      <strong className="text-amber-900 block text-sm">1814321</strong>
                      <span className="text-[11px] text-stone-500">Universal Health &amp; Bodily Wellness</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback general interactive note for other services */}
              {![1, 2, 4, 6, 8, 11, 13].includes(validId) && (
                <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-stone-600 flex items-center justify-between">
                  <span>
                    {lang === 'hi'
                      ? 'इस सेवा की व्यक्तिगत गणना एवं चार्ट निर्माण अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी द्वारा विशेष रूप से किया जाता है।'
                      : 'Personalized calculations, Bhojpatra inscriptions, and synchronizations are performed directly by Numerologist & Healer · Randhir Singh during consultation.'}
                  </span>
                  <button
                    onClick={() => onOpenBooking(service.titleEn, service.suggestedTariff)}
                    className="shrink-0 text-amber-900 font-bold hover:underline ml-2"
                  >
                    Consult →
                  </button>
                </div>
              )}
            </div>

            {/* 4. What You Receive (Deliverables & Process) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-5">
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>{lang === 'hi' ? 'परामर्श में आपको क्या प्राप्त होगा (Deliverables)' : 'What You Receive in This Session'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center font-mono">
                      0{idx + 1}
                    </div>
                    <h4 className="font-sacred font-bold text-stone-900 text-sm">
                      {lang === 'hi' ? deliv.titleHi : deliv.titleEn}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'hi' ? deliv.descHi : deliv.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Key Life Benefits & Transformations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-5">
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <span>{lang === 'hi' ? 'जीवन में होने वाले प्रत्यक्ष लाभ' : 'Key Transformations & Life Benefits'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.benefits.map((b, idx) => {
                  const BIcon = getBenefitIcon(b.icon);
                  return (
                    <div
                      key={idx}
                      className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <BIcon className="w-4 h-4 text-amber-800" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        {lang === 'hi' ? b.titleHi : b.titleEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. Who Needs This Service? */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-4">
              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                <span>{lang === 'hi' ? 'यह परामर्श किन परिस्थितियों में आवश्यक है?' : 'Who Needs This Service?'}</span>
              </h3>

              <ul className="space-y-2.5">
                {service.whoNeedsThis.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{lang === 'hi' ? item.hi : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. FAQs for this service */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm space-y-4">
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}
                </h3>

                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                      <h4 className="font-sacred font-bold text-stone-900 text-xs sm:text-sm">
                        Q: {lang === 'hi' ? faq.qHi : faq.qEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 pl-4 leading-relaxed">
                        {lang === 'hi' ? faq.aHi : faq.aEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Column: Booking, Master Credentials & Services List */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Direct Booking Card */}
            <div className="bg-gradient-to-br from-[#faf7f0] to-white rounded-3xl p-6 border-2 border-amber-300 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                  Direct Commissioning
                </span>
                <span className="text-lg font-sacred font-black text-amber-900 font-mono">
                  {service.suggestedTariff}
                </span>
              </div>

              <h3 className="font-sacred font-bold text-stone-900 text-lg leading-snug">
                {lang === 'hi' ? 'परामर्श हेतु अभी समय आरक्षित करें' : 'Reserve Your Consultation Slot'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'hi'
                  ? 'जयपुर क्लिनिक पर व्यक्तिगत भेंट अथवा देश-विदेश से व्हाट्सएप वीडियो/वॉइस कॉल परामर्श।'
                  : 'Available in-person at Jaipur sanctuary or globally via WhatsApp audio/video consultation.'}
              </p>

              <button
                onClick={() => onOpenBooking(service.titleEn, service.suggestedTariff)}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment Now'}</span>
              </button>

              <a
                href={`https://wa.me/919509593150?text=Hello%20Master%20Randhir%20Singh%20Ji%2C%20I%20would%20like%20to%20consult%20for%20Service%20${validId}%3A%20${encodeURIComponent(service.titleEn)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp +91-9509593150</span>
              </a>

              <a
                href="tel:+919509593150"
                className="w-full inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2 px-4 rounded-xl text-xs border border-stone-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-800" />
                <span>{lang === 'hi' ? 'सीधा कॉल करें' : 'Direct Call'}</span>
              </a>
            </div>

            {/* Numerologist & Healer · Randhir Singh Verified Card */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/Randhir_Singh_8dc81223.png"
                  alt="Numerologist & Healer · Randhir Singh"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 bg-stone-900 shrink-0"
                />
                <div>
                  <h4 className="font-sacred font-bold text-stone-900 text-sm">
                    Numerologist & Healer · Randhir Singh
                  </h4>
                  <p className="text-[11px] text-amber-800 font-semibold">
                    {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · जयपुर' : 'Numerologist & Healer · Jaipur'}
                  </p>
                  <span className="text-[10px] text-stone-500 block">
                    Royal Skills Academy Regd. 10115
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2">
                {lang === 'hi'
                  ? 'दशकों की साधना, 16 पावन सेवाएं, एवं 24 भारतीय व वैश्विक भाषाओं में साधकों को प्रामाणिक समाधान।'
                  : 'Decades of Vedic practice, 16 certified specialties, and serving seekers across 24 global languages.'}
              </p>
            </div>

            {/* Complete 16 Services Quick Navigator */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-sacred font-bold text-stone-900 text-xs uppercase tracking-wider">
                  {lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ' : 'All 16 Divine Services'}
                </h4>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  16 Pages
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {ALL_SERVICES.map((s) => {
                  const isCurrent = s.id === validId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => onNavigateToService(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-900 text-white font-bold shadow-2xs'
                          : 'bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`font-mono text-[10px] ${isCurrent ? 'text-amber-300' : 'text-stone-400'}`}>
                          {s.id < 10 ? `0${s.id}` : s.id}
                        </span>
                        <span className="truncate">{s.titleEn}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-300' : 'text-stone-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Previous & Next Service Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-amber-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigateToService(prevId)}
              className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all text-left flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                <ArrowLeft className="w-4 h-4 text-amber-800" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  {lang === 'hi' ? '← पिछली सेवा' : '← Previous Service'}
                </span>
                <span className="font-sacred font-bold text-stone-900 text-sm truncate block group-hover:text-amber-900">
                  {prevId < 10 ? `0${prevId}` : prevId}. {lang === 'hi' ? prevService.titleHi : prevService.titleEn}
                </span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToService(nextId)}
              className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all text-right flex items-center justify-end gap-3 group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  {lang === 'hi' ? 'अगली सेवा →' : 'Next Service →'}
                </span>
                <span className="font-sacred font-bold text-stone-900 text-sm truncate block group-hover:text-amber-900">
                  {nextId < 10 ? `0${nextId}` : nextId}. {lang === 'hi' ? nextService.titleHi : nextService.titleEn}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-amber-800" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
