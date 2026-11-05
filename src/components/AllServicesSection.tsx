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
  Search,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { ALL_SERVICES } from '../data/servicesData';
import { SERVICES_DETAIL_DATA } from '../data/servicesDetailData';
import { Language, ServiceItem } from '../types';

interface AllServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onNavigateToService?: (serviceId: number) => void;
  onOpenBooking?: (serviceName?: string, price?: string) => void;
}

export const AllServicesSection: React.FC<AllServicesSectionProps> = ({
  lang,
  onSelectService,
  onNavigateToService,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredServices = ALL_SERVICES.filter((svc) => {
    if (selectedFilter !== 'all' && svc.category !== selectedFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        svc.titleEn.toLowerCase().includes(q) ||
        svc.titleHi.toLowerCase().includes(q) ||
        svc.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCardClick = (service: ServiceItem) => {
    if (onNavigateToService) {
      onNavigateToService(service.id);
    } else {
      onSelectService(service);
    }
  };

  return (
    <section id="all-services" className="relative py-12 sm:py-16 bg-[#fbf9f4] border-b border-amber-200/80">
      {/* Target anchors for unified navigation */}
      <div id="services" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="tariff" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="fees" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="consultancy-fees" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="consultancy-healing-fees" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Unified All 16 Divine Services & Consultancy Fees */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'रणधीर सिंह जी का संपूर्ण 16 प्रमाणित सेवा पोर्टफोलियो एवं फीस' : 'Complete Visiting Card Portfolio · Randhir Singh'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ एवं परामर्श फीस' : 'ALL 16 DIVINE SERVICES & CONSULTANCY FEES'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi' ? 'अपनी जन्मतिथि के रहस्यों को जानें · अपने जीवन को समझें और अपने भविष्य को नई दिशा दें।' : 'Decode Your Date of Birth · Change Your Life and Destiny · Transparent Divine Tariffs'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'अंक ज्योतिष, घड़ी विश्लेषण एवं थेरेपी, पारंपरिक नमक शुद्धिकरण, पवित्र यंत्र, हीलिंग कोड्स और आध्यात्मिक परामर्श सहित सभी 16 विशेष सेवाओं की संपूर्ण सूची एवं पारदर्शी परामर्श फीस। प्रत्येक सेवा का एक समर्पित अलग पृष्ठ भी उपलब्ध है।'
              : 'Explore the complete repertoire of divine numerology, watch therapy, traditional salt clearing, consecrated yantras, and healing services with official verified consultation fees and dedicated pages.'}
          </p>

          {/* 3 Value Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs font-semibold text-stone-700">
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'hi' ? '100% प्राइवेट व गोपनीय' : '100% Confidential'}
            </span>
            <span className="flex items-center gap-1.5 text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              {lang === 'hi' ? 'पूर्व-निर्धारित समय स्लॉट' : 'Pre-scheduled Confirmed Sessions'}
            </span>
            <a
              href="#bank"
              className="inline-flex items-center gap-1.5 text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full border border-blue-200 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-blue-700" />
              <span>{lang === 'hi' ? 'UPI, QR कोड व बैंक ट्रांसफर' : 'UPI, QR & Direct Bank Transfer'}</span>
            </a>
          </div>

          {/* Quick Shortcuts to Specialized Services & Bank Tab */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#specialized-services"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-purple-400/50 shadow-2xs transition-all hover:scale-102"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>{lang === 'hi' ? '11 विशिष्ट हीलिंग एवं सुधार सेवाएं देखें' : '11 Specialized Healing & Correction Services'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#bank"
              className="inline-flex items-center gap-1.5 bg-amber-950 hover:bg-stone-900 text-amber-200 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-amber-500/40 shadow-2xs transition-all"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'बैंक और UPI पेमेंट (3 QR कोड्स)' : 'Bank & UPI Details (3 QR Codes)'}</span>
            </a>
          </div>
        </div>

        {/* Top 2 Primary Offerings: Sunday Free + Flagship Consultation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* 1. Sunday Free Consultation */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-2xl p-6 sm:p-7 border-2 border-amber-400/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-2.5 py-1 rounded border border-white/20">
                  {lang === 'hi' ? 'रविवार की फ्री सेवा' : 'Sunday Free Privilege'}
                </span>
                <span className="text-xs text-amber-300 font-mono font-bold">
                  {lang === 'hi' ? 'जयपुर व ऑनलाइन' : 'Jaipur & Online'}
                </span>
              </div>

              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-white leading-snug">
                {lang === 'hi' ? 'रविवार को फ्री 1-on-1 कंसल्टेशन' : 'Sunday Free 1-on-1 Consultation'}
              </h3>
              <p className="text-xs text-amber-200/80 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'हर रविवार, रणधीर सिंह जी पहले 5 लोगों को फ्री में सलाह (कंसल्टेशन) देते हैं। इसमें जन्मतिथि और लो-शू ग्रिड की पूरी जांच शामिल है।'
                  : 'Every Sunday, Numerologist & Healer · Randhir Singh offers the first 5 consultations 100% FREE on appointment. Includes complete Date of Birth & Lo-Shu diagnosis.'}
              </p>

              <div className="my-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-300">{lang === 'hi' ? 'निःशुल्क (FREE)' : 'FREE'}</span>
                <span className="text-xs text-amber-200/60 line-through">{lang === 'hi' ? 'नियमित ₹2,100' : 'Regular ₹2,100'}</span>
              </div>

              <ul className="text-xs text-amber-100 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === 'hi' ? 'समय: 20 मिनट (ऑनलाइन या जयपुर क्लिनिक में)' : 'Duration: 20 Minutes (Virtual or Jaipur Clinic)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === 'hi' ? 'मूलांक, भाग्यांक और मिसिंग नंबर की जांच' : 'Lucky Number (Birth Number), Destiny Number & Missing numbers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === 'hi' ? 'पहले आओ, पहले पाओ के आधार पर' : 'Allocated strictly on first-come confirmed booking'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking ? onOpenBooking('Sunday Free Consultation', 'FREE') : null}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-stone-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>{lang === 'hi' ? 'रविवार का फ्री स्लॉट बुक करें' : 'Claim Sunday Free Slot Now'}</span>
              <ArrowRight className="w-4 h-4 text-stone-900" />
            </button>
          </div>

          {/* 2. Flagship Most Popular: Personalized Spiritual Consultation */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-500 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
              ★ {lang === 'hi' ? 'सबसे ज्यादा लोकप्रिय' : 'Most Popular'}
            </div>

            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{lang === 'hi' ? 'समय: 45-60 मिनट' : 'Duration: 45-60 mins'}</span>
                <span>·</span>
                <span className="text-amber-900 font-semibold">{lang === 'hi' ? 'विस्तार से व्यक्तिगत बातचीत' : 'Personalized In-depth Analysis'}</span>
              </div>

              <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                {lang === 'hi' ? 'पर्सनल अंक ज्योतिष एवं लाइफ गाइडेंस' : 'Personalized Spiritual & Numerology Consultation'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'एक संपूर्ण 1-on-1 सेशन जिसमें आपकी जन्मतिथि, हाथ की घड़ी (वॉच थेरेपी) और आसान उपायों द्वारा नौकरी, व्यापार, शादी और जीवन की समस्याओं का समाधान किया जाता है।'
                  : 'A personalized 1-on-1 consultation session dedicated to understanding your queries, life circumstances, and life path through Vedic wisdom, Watch Analysis & Therapy Watch Guidance, and Simple Remedial Guidance.'}
              </p>

              <div className="my-4 p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-stone-500 block">
                    {lang === 'hi' ? 'कंसल्टेशन फीस' : 'Consultancy Fee'}
                  </span>
                  <div className="text-3xl font-black text-amber-900">
                    ₹5,100
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {lang === 'hi' ? 'प्रति सेशन (वीडियो कॉल / फोन / क्लिनिक)' : 'Per session (Virtual / Phone / In-Person)'}
                  </span>
                </div>

                <div className="text-right text-xs text-stone-600">
                  <span className="block font-bold text-amber-950">{lang === 'hi' ? 'सत्र में शामिल:' : 'Includes:'}</span>
                  <span>{lang === 'hi' ? 'जन्मतिथि + घड़ी + नाम की जांच' : 'DOB + Watch + Name review'}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'hi' ? 'पूरा लो-शू 3×3 ग्रिड और 8 योग (तलों) का विश्लेषण' : 'Full Lo-Shu 3x3 Magic Grid and 8 Planes evaluation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'hi' ? 'आपके लिए लकी थेरेपी वॉच का सही मॉडल व रंग का सुझाव' : 'Signature Therapy Watch prescription & color frequencies'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'hi' ? 'करियर, व्यापार, शादी व सेहत के लिए आसान व असरदार उपाय' : 'Personalized remedies for marriage, health, and career growth'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking('Personalized Spiritual Consultation', '₹5,100') : null}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>{lang === 'hi' ? 'परामर्श बुक करें (₹5,100)' : 'Book Consultation (₹5,100)'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <a
                href="#bank"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-stone-600" />
                <span>{lang === 'hi' ? 'पेमेंट का विवरण' : 'Payment Info'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Heading for All 16 Services Grid */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {lang === 'hi' ? 'विजिटिंग कार्ड पोर्टफोलियो' : 'Complete 16 Services Portfolio'}
            </span>
            <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'hi' ? '16 प्रमाणित सेवाओं की संपूर्ण फीस एवं विवरण' : 'All 16 Divine Services & Tariffs'}
            </h3>
          </div>
          <div className="text-xs text-stone-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            {lang === 'hi' ? 'कार्ड पर क्लिक करके अलग समर्पित पृष्ठ देखें' : 'Click any card to open its dedicated individual page'}
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', labelEn: 'All 16 Services', labelHi: 'सभी 16 सेवाएँ' },
              { id: 'numerology', labelEn: 'Numerology & DOB', labelHi: 'अंक ज्योतिष व जन्म तिथि' },
              { id: 'watch', labelEn: 'Watch Consultation', labelHi: 'घड़ी का विश्लेषण' },
              { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नमक चिकित्सा (सॉल्ट थेरेपी)' },
              { id: 'crystal', labelEn: 'Crystals', labelHi: 'क्रिस्टल थेरेपी' },
              { id: 'yantra', labelEn: 'Yantras', labelHi: 'पवित्र यंत्र' },
              { id: 'healing', labelEn: 'Healings & Codes', labelHi: 'हीलिंग एवं कोड्स' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-900 text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                }`}
              >
                {lang === 'hi' ? f.labelHi : f.labelEn}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'सेवा खोजें...' : 'Search service...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Services Grid (Numbered 1 to 16 matching visiting card!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            const detail = SERVICES_DETAIL_DATA[service.id];
            const price = detail?.suggestedTariff || '₹5,100';

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-stone-200 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center font-mono">
                        {service.id < 10 ? `0${service.id}` : service.id}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                        {price}
                      </span>
                    </div>

                    {service.badge && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {lang === 'hi' ? (() => {
                          const badgeMap: Record<string, string> = {
                            'Popular': 'अत्यधिक लोकप्रिय',
                            'Signature Specialist': 'विशेषज्ञता प्राप्त',
                            'Core Foundation': 'मूल आधार',
                            'Unique Remedy': 'अद्वितीय उपाय',
                            'Family Blessing': 'पारिवारिक वरदान',
                            'High Impact': 'उच्च प्रभाव',
                            'Divine Cleansing': 'पवित्र शुद्धि',
                            'Holistic Shield': 'ऊर्जा कवच',
                            'Empowerment': 'आत्म-उत्थान',
                            'Direct Healing': 'प्रत्यक्ष उपचार',
                            'Frequency Code': 'ऊर्जा कोड',
                            'Vedic Matrix': 'वैदिक यंत्र',
                            'Divine Word': 'दिव्य शब्द',
                            'Chakra Stone': 'चक्र रत्न',
                            'Divine Aura': 'दिव्य आभामंडल',
                            'Vedic Healing': 'वैदिक उपचार',
                            'High Potency': 'उच्च शक्ति',
                            'Earth Energy': 'प्राकृतिक रत्न'
                          };
                          return badgeMap[service.badge] || service.badge;
                        })() : service.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-amber-100 transition-all">
                    <Icon className="w-5 h-5 text-amber-800" />
                  </div>

                  <h3 className="font-sacred font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-amber-900 transition-colors">
                    {lang === 'hi' ? service.titleHi : service.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-amber-900 group-hover:underline flex items-center gap-1">
                      <span>{lang === 'hi' ? 'विस्तृत पृष्ठ' : 'Dedicated Page'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="inline-flex items-center text-[11px] font-black text-amber-950 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-md font-mono shadow-2xs">
                      {price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenBooking) {
                        onOpenBooking(service.titleEn, price);
                      } else {
                        onSelectService(service);
                      }
                    }}
                    className="text-[11px] font-bold text-stone-700 hover:text-white bg-stone-100 hover:bg-amber-800 px-2.5 py-1 rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    {lang === 'hi' ? 'परामर्श' : 'Consult Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
