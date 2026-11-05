import React, { useState } from 'react';
import { Award, ShieldCheck, QrCode, CreditCard, Sparkles, Star, CheckCircle, ArrowRight, Phone, MessageCircle, MapPin, Clock, Heart, Filter, Shield, AlertCircle, Copy, Check, ZoomIn, Smartphone, ExternalLink, X } from 'lucide-react';
import { Language, PageBlock } from '../types';
import { getTranslation } from '../i18n/languages';
import { useCmsPages } from '../context/CmsPageContext';

interface AboutAndTariffSectionProps {
  lang: Language;
  onBookService: (serviceTitle: string, price: string) => void;
  currentTab?: string;
}

export interface SpecializedHealingService {
  id: number;
  category: 'energy' | 'numerology' | 'mind' | 'plr';
  categoryLabel: string;
  categoryLabelHi?: string;
  badge?: string;
  badgeHi?: string;
  name: string;
  nameHi: string;
  price: string;
  duration?: string;
  durationHi?: string;
  description: string;
  descriptionHi?: string;
  note?: string;
  noteHi?: string;
  confidential: boolean;
}

export const SPECIALIZED_SERVICES_11: SpecializedHealingService[] = [
  {
    id: 1,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    categoryLabelHi: 'एनर्जी और हीलिंग',
    name: 'Aura Cleaning',
    nameHi: 'औरा क्लीनिंग (Aura Cleaning)',
    price: '₹5,100',
    duration: '20 minutes',
    durationHi: '20 मिनट',
    description: 'Aura cleaning balances your subtle personal energy, clearing dense and negative vibrations to restore peace, clarity, and positivity.',
    descriptionHi: 'औरा क्लीनिंग से शरीर के आसपास की नकारात्मक ऊर्जा दूर होती है और मन में शांति, सुकून और नई ताजगी आती है।',
    confidential: true
  },
  {
    id: 2,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    categoryLabelHi: 'एनर्जी और हीलिंग',
    name: 'Negativity Removal & Salt Therapy',
    nameHi: 'नेगेटिविटी हटाना और सॉल्ट थेरेपी',
    price: '₹5,100',
    duration: '30 minutes',
    durationHi: '30 मिनट',
    description: 'This session helps release heavy negative thoughts, lingering emotional stress, and mental tiredness using gentle, proven energy methods.',
    descriptionHi: 'नेगेटिव सोच, तनाव और मानसिक भारीपन को दूर कर मन को हल्का, शांत और तनावमुक्त करने का खास सेशन।',
    confidential: true
  },
  {
    id: 3,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    categoryLabelHi: 'एनर्जी और हीलिंग',
    badge: '7-Day Intensive',
    badgeHi: '7 दिन का स्पेशल सेशन',
    name: 'Chakra Healing (7-Day Intensive)',
    nameHi: '7 दिन की चक्र हीलिंग',
    price: '₹31,000',
    duration: '7 Days',
    durationHi: '7 दिन',
    description: 'An intensive 7-day deep vibrational alignment addressing the 7 prime subtle chakras through meditation, sound harmony, and energy work.',
    descriptionHi: 'ध्यान और हीलिंग द्वारा शरीर के 7 मुख्य चक्रों को संतुलित करने का 7 दिवसीय स्पेशल प्रोग्राम।',
    confidential: true
  },
  {
    id: 4,
    category: 'numerology',
    categoryLabel: 'Numerological Correction',
    categoryLabelHi: 'न्यूमेरोलॉजी सुधार',
    name: 'Mobile Number Numerology Correction',
    nameHi: 'लकी मोबाइल नंबर सुधार',
    price: '₹5,100',
    duration: 'Full Report & Audit',
    durationHi: 'पूरी रिपोर्ट और जांच',
    description: 'Vedic numerology analysis of your mobile digits and frequency to guide lucky number combinations matching your career and wealth flow.',
    descriptionHi: 'आपके मोबाइल नंबर की जांच करके करियर और पैसों की तरक्की के लिए लकी नंबर चुनने की सलाह दी जाती है।',
    confidential: true
  },
  {
    id: 5,
    category: 'numerology',
    categoryLabel: 'Numerological Correction',
    categoryLabelHi: 'न्यूमेरोलॉजी सुधार',
    name: 'Name Spelling & Numerology Correction',
    nameHi: 'नेम स्पेलिंग करेक्शन (लकी नाम)',
    price: '₹11,000',
    duration: 'Detailed Analysis',
    durationHi: 'विस्तृत विश्लेषण',
    description: 'Careful study of name letters and sound frequencies to align your name vibration with your Lucky Number (Birth Number) and Destiny Number.',
    descriptionHi: 'जन्मतिथि के अनुसार नाम की स्पेलिंग में हल्का बदलाव करके किस्मत और सफलता के नए रास्ते खोलना।',
    confidential: true
  },
  {
    id: 6,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    categoryLabelHi: 'एनर्जी और हीलिंग',
    name: 'Relationship & Harmony Healing',
    nameHi: 'रिश्तों में प्यार और समझ (रिलेशनशिप हीलिंग)',
    price: '₹11,000',
    duration: '45-60 minutes',
    durationHi: '45-60 मिनट',
    description: 'Spiritual and awareness-based guidance to heal emotional misunderstandings, soften conflicts, and restore mutual love and trust in relationships.',
    descriptionHi: 'आपसी रिश्तों में तनाव और गलतफहमियां दूर करने और प्यार, अपनापन व शांति बढ़ाने के लिए हीलिंग सेशन।',
    confidential: true
  },
  {
    id: 7,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    categoryLabelHi: 'एनर्जी और हीलिंग',
    name: 'Divine Sound Healing',
    nameHi: 'साउंड हीलिंग (ध्वनि ध्यान)',
    price: '₹11,000',
    duration: '45 minutes',
    durationHi: '45 मिनट',
    description: 'Using gentle sound frequencies, Tibetan singing bowls, bells, and sacred mantras to induce deep relaxation, quiet the mind, and restore inner peace.',
    descriptionHi: 'सिंगिंग बाउल और मंत्रों की सुखद ध्वनि से गहरे ध्यान, तनाव मुक्ति और मानसिक शांति का अनुभव।',
    confidential: true
  },
  {
    id: 8,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    categoryLabelHi: 'माइंड और बॉडी संतुलन',
    name: 'Mind & Body Relaxation Therapy',
    nameHi: 'माइंड और बॉडी रिलैक्सेशन थेरेपी',
    price: '₹5,100',
    duration: '45 minutes',
    durationHi: '45 मिनट',
    description: 'A guided therapeutic session centering on somatic de-stressing, conscious breathwork (Pranayama), and deep tranquility for nervous system reset.',
    descriptionHi: 'गहरे तनाव से राहत, प्राणायाम और शरीर-मन को शांत करके नई ताजगी देने वाला थेरेपी सत्र।',
    confidential: true
  },
  {
    id: 9,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    categoryLabelHi: 'माइंड और बॉडी संतुलन',
    name: 'Anxiety & Emotional Support Therapy',
    nameHi: 'तनाव और चिंता मुक्ति थेरेपी',
    price: '₹5,100',
    duration: '45 minutes',
    durationHi: '45 मिनट',
    description: 'Supportive guidance cultivating calm grounding and emotional strength for those dealing with stress, overthinking, or low moods.',
    descriptionHi: 'चिंता, घबराहट या ज्यादा सोचने की आदत से परेशान लोगों के लिए मन को शांत और मजबूत बनाने वाला सेशन।',
    note: 'Important: This service is for spiritual and mindful support and is not a substitute for clinical medical treatment or psychiatric care.',
    noteHi: 'नोट: यह सेवा आध्यात्मिक और मानसिक शांति के लिए है, यह किसी डॉक्टर या मेडिकल इलाज का विकल्प नहीं है।',
    confidential: true
  },
  {
    id: 10,
    category: 'plr',
    categoryLabel: 'Deep Soul Exploration',
    categoryLabelHi: 'पास्ट लाइफ एक्सप्लोरेशन',
    badge: 'Specialized Session',
    badgeHi: 'स्पेशल सेशन',
    name: 'Past Life Regression (PLR) Session',
    nameHi: 'पास्ट लाइफ रिग्रेशन (PLR सेशन)',
    price: '₹15,000',
    duration: '90-120 minutes',
    durationHi: '90-120 मिनट',
    description: 'Past Life Regression meditative exploration delving into subconscious impressions, habits, and deep emotional patterns.',
    descriptionHi: 'अवचेतन मन के पुराने पैटर्न और जीवन की गहरी आदतों को समझने के लिए एक ध्यान-आधारित सेशन।',
    note: 'PLR is understood as a spiritual meditative exploration of subconscious patterns and inner symbols rather than verified historic memories.',
    noteHi: 'नोट: इसे अवचेतन मन और जीवन की गहरी आदतों को समझने के आध्यात्मिक तरीके के रूप में देखा जाता है।',
    confidential: true
  },
  {
    id: 11,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    categoryLabelHi: 'माइंड और बॉडी संतुलन',
    name: 'Mind Peace Therapy',
    nameHi: 'मन की शांति (माइंड पीस थेरेपी)',
    price: '₹5,100',
    duration: '45 minutes',
    durationHi: '45 मिनट',
    description: 'Gentle meditative practices focused on quieting overactive mental chatter, cultivating enduring peace, and restoring emotional equilibrium.',
    descriptionHi: 'अशांत और उलझे विचारों को शांत करने और मन में गहरी शांति लाने के लिए ध्यान और हीलिंग।',
    confidential: true
  }
];

export const AboutAndTariffSection: React.FC<AboutAndTariffSectionProps> = ({
  lang,
  onBookService,
  currentTab
}) => {
  const t = getTranslation(lang);
  const { getPageBySectionId } = useCmsPages();
  const cmsTariff = getPageBySectionId('tariff-about');
  const [activeTab, setActiveTab] = useState<'specialized' | 'about' | 'bank' | 'testimonials'>('specialized');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedUpi, setCopiedUpi] = useState<string | null>(null);
  const [activeQrTab, setActiveQrTab] = useState<'all' | 'phonepe' | 'gpay' | 'paytm'>('all');
  const [zoomedQr, setZoomedQr] = useState<{ title: string; image: string; upiId: string } | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(key);
    setTimeout(() => {
      setCopiedUpi(null);
    }, 2500);
  };

  // Sync tab with currentTab prop or URL hash
  React.useEffect(() => {
    const target = (currentTab || window.location.hash.replace('#', '')).toLowerCase().trim();
    if (
      target === 'specialized-services' ||
      target === '11-specialized-healing-services' ||
      target === 'specialized' ||
      target === 'specialized-healing' ||
      target === 'healing' ||
      target === 'healing-fees'
    ) {
      setActiveTab('specialized');
    } else if (target === 'bank' || target === 'payment') {
      setActiveTab('bank');
    } else if (target === 'about' || target === 'randhir-singh') {
      setActiveTab('about');
    } else if (target === 'testimonials' || target === 'reviews') {
      setActiveTab('testimonials');
    }
  }, [currentTab]);

  // Listen to window hash changes to activate corresponding tab
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '').trim();
      if (
        hash === 'specialized-services' ||
        hash === '11-specialized-healing-services' ||
        hash === 'specialized' ||
        hash === 'specialized-healing' ||
        hash === 'healing' ||
        hash === 'healing-fees'
      ) {
        setActiveTab('specialized');
      } else if (hash === 'bank' || hash === 'payment') {
        setActiveTab('bank');
      } else if (hash === 'about' || hash === 'randhir-singh') {
        setActiveTab('about');
      } else if (hash === 'testimonials' || hash === 'reviews') {
        setActiveTab('testimonials');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const filteredHealingServices = SPECIALIZED_SERVICES_11.filter((svc) => {
    if (selectedCategory === 'all') return true;
    return svc.category === selectedCategory;
  });

  const testimonials = [
    {
      date: 'February 2026',
      dateHi: 'फरवरी 2026',
      name: 'Ananya Sharma',
      nameHi: 'अनन्या शर्मा',
      location: 'Dehradun, India',
      locationHi: 'देहरादून, भारत',
      service: 'Vedic Numerology & Guidance',
      serviceHi: 'वैदिक अंक ज्योतिष व मार्गदर्शन',
      review: 'Numerologist & Healer · Randhir Singh’s Mulank and Bhagyank breakdown was astoundingly precise. Practical remedies and watch corrections yielded a senior leadership offer within 3 months.',
      reviewHi: 'रणधीर सिंह जी का मूलांक और भाग्यांक विश्लेषण बहुत सटीक था। उनके बताए आसान उपायों और रिस्ट वॉच के सुझाव से 3 महीने में मुझे सीनियर जॉब का ऑफर मिल गया।',
      rating: 5
    },
    {
      date: 'January 2026',
      dateHi: 'जनवरी 2026',
      name: 'Vikram Malhotra',
      nameHi: 'विक्रम मल्होत्रा',
      location: 'Mumbai, India',
      locationHi: 'मुंबई, भारत',
      service: 'Tarot Reading & Energy Healing',
      serviceHi: 'टैरो कार्ड व एनर्जी हीलिंग',
      review: 'I came during an emotionally stressful chapter. The session brought instant clarity and peace. The distance energy healing calmed my anxiety remarkably.',
      reviewHi: 'काफी मानसिक तनाव के समय मैंने इनसे बात की। इस सेशन से मुझे बहुत शांति और मन की स्पष्टता मिली। डिस्टेंस हीलिंग से मेरी चिंता व घबराहट दूर हो गई।',
      rating: 5
    },
    {
      date: 'December 2025',
      dateHi: 'दिसंबर 2025',
      name: 'Priyanka Sen',
      nameHi: 'प्रियंका सेन',
      location: 'Bengaluru, India',
      locationHi: 'बेंगलुरु, भारत',
      service: 'Life Guidance & Chakra Alignment',
      serviceHi: 'जीवन मार्गदर्शन व चक्र संतुलन',
      review: 'A rare combination of genuine spiritual depth with practical grounding. The actionable advice transformed my career and personal relationships.',
      reviewHi: 'गहरा आध्यात्मिक ज्ञान और बहुत ही आसान, काम आने वाले उपाय। इनके बताए सुझावों से मेरे करियर और परिवार के रिश्तों में बहुत अच्छा बदलाव आया।',
      rating: 5
    },
    {
      date: 'March 2026',
      dateHi: 'मार्च 2026',
      name: 'Rajesh & Meera Verma',
      nameHi: 'राजेश एवं मीरा वर्मा',
      location: 'Jaipur, India',
      locationHi: 'जयपुर, भारत',
      service: 'Relationship Numerology & Grid Match',
      serviceHi: 'रिलेशनशिप व ग्रिड मिलान',
      review: 'We consulted for relationship and business compatibility. Compassionate guidance resolved friction patterns and gave us total confidence to move forward.',
      reviewHi: 'हमने बिजनेस और आपसी तालमेल के लिए ग्रिड मैचिंग करवाई। रणधीर जी की सरल सलाह से हमारे बीच आपसी समझ और विश्वास बहुत मजबूत हुआ।',
      rating: 5
    }
  ];

  return (
    <section id="tariff-about" className="relative py-12 sm:py-16 bg-[#faf7f0] border-b border-amber-200/80">
      {/* Anchor targets for direct URL jumps */}
      <div id="specialized-services" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="11-specialized-healing-services" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="specialized-healing" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="bank" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="payment" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'specialized', label: lang === 'hi' ? '11 विशिष्ट हीलिंग एवं सुधार सेवाएं' : '11 Specialized Healing & Correction Services', icon: Sparkles },
            { id: 'about', label: lang === 'hi' ? 'रणधीर सिंह जी के बारे में' : 'About Randhir Singh Ji', icon: Award },
            { id: 'bank', label: lang === 'hi' ? 'बैंक और UPI से पेमेंट' : 'Bank & UPI Details', icon: CreditCard },
            { id: 'testimonials', label: lang === 'hi' ? 'लोगों के अनुभव (रिव्यू)' : 'Client Reviews & Stories', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-900 text-white shadow-md ring-2 ring-amber-600'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 11 SPECIALIZED HEALING & CORRECTION SERVICES */}
        {activeTab === 'specialized' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                {lang === 'hi' ? 'गहन उपचारात्मक एवं सुधारात्मक सत्र' : 'Targeted Restorative Sessions'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 mt-3">
                {lang === 'hi' ? '11 विशिष्ट हीलिंग एवं सुधार सेवाएं' : '11 Specialized Healing & Correction Services'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'औरा शुद्धि, चक्र संतुलन, ध्वनि ध्यान, काल्डियन नाम संशोधन, लकी मोबाइल सुधार, सॉल्ट थेरेपी एवं पास्ट लाइफ रिग्रेशन — 11 विशिष्ट प्रमाणित उपचार।'
                  : 'Aura cleaning, chakra alignment, Tibetan sound healing, Chaldean name & mobile corrections, salt therapy, and Past Life Regression — 11 targeted restorative sessions.'}
              </p>

              {/* Navigation link to All 16 Divine Services & Fees */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ एवं परामर्श फीस देखें →' : 'View ALL 16 DIVINE SERVICES & FEES →'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className="inline-flex items-center gap-1.5 text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-blue-700" />
                  <span>{lang === 'hi' ? 'तीनों QR कोड व UPI विवरण देखें' : 'View 3 QR Codes & UPI'}</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-amber-200/60 pb-4">
              {[
                { id: 'all', labelEn: 'All Services (11)', labelHi: 'सभी सेवाएँ (11)' },
                { id: 'energy', labelEn: 'Energy & Healing (5)', labelHi: 'ऊर्जा और हीलिंग (5)' },
                { id: 'numerology', labelEn: 'Numerology Corrections (2)', labelHi: 'अंक ज्योतिष सुधार (2)' },
                { id: 'mind', labelEn: 'Mind Balance & Therapy (3)', labelHi: 'मन की शांति और थेरेपी (3)' },
                { id: 'plr', labelEn: 'Past Life Therapy (1)', labelHi: 'पूर्व जन्म थेरेपी (PLR) (1)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedCategory(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === f.id
                      ? 'bg-amber-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                  }`}
                >
                  {lang === 'hi' ? f.labelHi : f.labelEn}
                </button>
              ))}
            </div>

              {/* 11 Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredHealingServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center font-mono">
                          {svc.id}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {svc.badge && (
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                              {lang === 'hi' ? svc.badgeHi || svc.badge : svc.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                            {lang === 'hi' ? svc.categoryLabelHi || svc.categoryLabel : svc.categoryLabel}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-sacred text-base sm:text-lg font-bold text-stone-900 leading-snug">
                        {lang === 'hi' ? svc.nameHi : svc.name}
                      </h4>

                      <div className="my-3 flex items-baseline justify-between">
                        <span className="text-xl font-black text-amber-900">
                          {svc.price}
                        </span>
                        {svc.duration && (
                          <span className="text-[11px] font-medium text-stone-500">
                            ⏱ {lang === 'hi' ? svc.durationHi || svc.duration : svc.duration}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {lang === 'hi' ? svc.descriptionHi || svc.description : svc.description}
                      </p>

                      {svc.note && (
                        <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-950 mb-3 flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <p className="leading-snug">{lang === 'hi' ? svc.noteHi || svc.note : svc.note}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        <span>{lang === 'hi' ? 'पूर्णतः गोपनीय' : 'Confidential'}</span>
                      </span>

                      <button
                        onClick={() => onBookService(svc.name, svc.price)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-colors shadow-2xs"
                      >
                        <span>{lang === 'hi' ? 'सत्र बुक करें' : 'Book Session'}</span>
                        <ArrowRight className="w-3 h-3 text-amber-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* TAB 2: ABOUT RANDHIR SINGH JI */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-stone-900 group">
                <img
                  src="/assets/aistudio/Randhir_Singh_8dc81223.png"
                  alt="Numerologist & Healer · Randhir Singh"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>{lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}</span>
                </div>
                <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {lang === 'hi' ? 'रणधीर सिंह जी' : 'Randhir Singh Ji'}
                </h3>
                <p className="text-amber-900 font-medium text-sm">
                  {lang === 'hi' ? '“अपनी जन्मतिथि को समझें, अपनी ज़िंदगी और भविष्य को बेहतर बनाएँ।”' : '“DECODE YOUR DATE OF BIRTH. CHANGE YOUR LIFE AND DESTINY.”'}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'जयपुर (राजस्थान) के जाने-माने अंक ज्योतिषी और हीलर। जन्मतिथि (लो-शू ग्रिड), कलाई की घड़ी (थेरेपी वॉच), सॉल्ट थेरेपी (नमक के उपाय) और सिद्ध यंत्रों के माध्यम से लोगों को सरल, सटीक और सच्चा मार्गदर्शन प्रदान करते हैं।'
                    : 'Experienced numerologist and energetic healer based in Jaipur, Rajasthan. Serving seekers across languages with practical Date of Birth Lo-Shu analysis, Therapy Watches, Traditional Salt Cleansing, and Divine Yantras.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 pt-6 border-t border-stone-200">
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-950 block mb-1">
                  {lang === 'hi' ? '📍 जयपुर क्लिनिक' : '📍 Jaipur Spiritual Clinic'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur, Rajasthan PIN- 302017
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-950 block mb-1">
                  {lang === 'hi' ? '⏰ मिलने का समय' : '⏰ Consultation Timings'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi' ? 'सुबह 9:00 से शाम 6:00 बजे तक' : '9:00 A.M. to 6:00 P.M. (IST)'}<br />
                  {lang === 'hi' ? 'पहले से समय बुक करना जरूरी है।' : 'Prior appointment recommended.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-950 block mb-1">
                  {lang === 'hi' ? '🎁 हर हफ्ते फ्री सेवा' : '🎁 Weekly Free Sunday Privilege'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'हर रविवार पहले 5 लोगों को फ्री में सलाह दी जाती है (पहले से बुकिंग जरूरी)।'
                    : 'Every Sunday first 5 consultations are 100% FREE on confirmed appointments.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <div className="text-xs text-stone-600">
                <strong>Email:</strong> randhirjpr@gmail.com · <strong>Phone/UPI:</strong> +91-9509593150
              </div>
              <a
                href="https://wa.me/919509593150?text=Hello%20Randhir%20Ji%2C%20I%20would%20like%20to%20connect%20with%20you%20for%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-lg text-xs shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Connect Directly on WhatsApp'}</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: BANK & UPI PAYMENT DETAILS */}
        {activeTab === 'bank' && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <QrCode className="w-6 h-6 text-amber-800" />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'hi' ? 'ऑफिशियल अधिकृत पेमेंट क्रेडेंशियल्स' : 'Official Verified Payment Credentials'}</span>
              </div>
              <h3 className="font-sacred text-2xl sm:text-3xl font-bold text-stone-900">
                {lang === 'hi' ? 'बैंक और UPI पेमेंट की जानकारी' : 'Bank & UPI Payment Details'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {lang === 'hi'
                  ? 'परामर्श फीस, थेरेपी वॉच या सिद्ध भोजपत्र यंत्र हेतु सुरक्षित एवं अधिकृत UPI विवरण व QR कोड।'
                  : 'Verified credentials & authentic QR codes for consultation bookings, therapy watches, and yantras.'}
              </p>
            </div>

            {/* Primary Verified Account Banner */}
            <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-400/50 mb-8 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded border border-amber-400/30">
                      {lang === 'hi' ? 'ऑफिशियल अधिकृत खाता' : 'Official Certified Account'}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {lang === 'hi' ? 'सत्यापित' : 'Verified'}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {lang === 'hi' ? 'खाता धारक:' : 'Account Name:'} <span className="text-amber-300">RANDHIR SINGH</span>
                  </div>
                  <div className="text-xs text-amber-200/80">
                    A NUMEROLOGIST AND HEALER · Jaipur Sanctuary
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-amber-200">
                    <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 font-medium">PhonePe</span>
                    <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 font-medium">Google Pay</span>
                    <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 font-medium">Paytm UPI</span>
                    <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 font-medium">BHIM UPI</span>
                  </div>
                </div>

                {/* Mobile / Direct UPI Number Card */}
                <div className="w-full md:w-auto shrink-0 bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-amber-400/30 text-left md:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                    {lang === 'hi' ? 'ऑफिशियल मोबाइल / UPI नंबर' : 'Official Mobile / UPI Number'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-wider">
                    9509593150
                  </div>
                  <span className="text-[11px] text-amber-200/70 block mt-0.5 mb-3 font-mono">
                    +91-9509593150
                  </span>
                  <div className="flex items-center gap-2 md:justify-end">
                    <button
                      onClick={() => handleCopy('9509593150', 'tab-mobile')}
                      className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'tab-mobile' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-800" />
                          <span className="text-emerald-900">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-950" />
                          <span>{lang === 'hi' ? 'नंबर कॉपी करें' : 'Copy Number'}</span>
                        </>
                      )}
                    </button>
                    <a
                      href="tel:+919509593150"
                      className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 UPI IDs Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-sacred text-base sm:text-lg font-bold text-stone-900">
                  {lang === 'hi' ? 'तीनों अधिकृत UPI आईडी (One-Click Copy)' : 'Official 3 UPI IDs (Click to Copy)'}
                </h4>
                <span className="text-[11px] text-stone-500">
                  {lang === 'hi' ? 'किसी भी ऐप में पेस्ट कर भुगतान करें' : 'Use in any UPI application'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* 1. Paytm */}
                <div className="bg-sky-50/60 border border-sky-200 hover:border-sky-400 rounded-xl p-4 transition-all flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#002e6e] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Paytm UPI
                      </span>
                      <span className="text-[10px] text-sky-800 font-semibold">Randhir Singh</span>
                    </div>
                    <div className="bg-white border border-sky-200 rounded-lg p-2.5 font-mono text-xs font-extrabold text-stone-900 select-all break-all mb-2 shadow-2xs">
                      randhir.150@ptyes
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-sky-100">
                    <button
                      onClick={() => handleCopy('randhir.150@ptyes', 'paytm-id')}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-white hover:bg-sky-100 text-sky-950 font-bold py-1.5 px-2 rounded-lg border border-sky-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'paytm-id' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-sky-700" />
                          <span>{lang === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                    <a
                      href="upi://pay?pa=randhir.150@ptyes&pn=Randhir%20Singh&cu=INR"
                      className="inline-flex items-center justify-center gap-1 bg-[#002e6e] hover:bg-[#001d47] text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
                      title="Open in Paytm"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-sky-300" />
                      <span>{lang === 'hi' ? 'पे' : 'Pay'}</span>
                    </a>
                  </div>
                </div>

                {/* 2. Google Pay */}
                <div className="bg-blue-50/60 border border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#1a73e8] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Google Pay
                      </span>
                      <span className="text-[10px] text-blue-800 font-semibold">GPay Certified</span>
                    </div>
                    <div className="bg-white border border-blue-200 rounded-lg p-2.5 font-mono text-xs font-extrabold text-stone-900 select-all break-all mb-2 shadow-2xs">
                      randhirjpr-6@okicici
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-blue-100">
                    <button
                      onClick={() => handleCopy('randhirjpr-6@okicici', 'gpay-id')}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-white hover:bg-blue-100 text-blue-950 font-bold py-1.5 px-2 rounded-lg border border-blue-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'gpay-id' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-blue-700" />
                          <span>{lang === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                    <a
                      href="upi://pay?pa=randhirjpr-6@okicici&pn=Randhir%20Singh&cu=INR"
                      className="inline-flex items-center justify-center gap-1 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
                      title="Open in Google Pay"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-blue-200" />
                      <span>{lang === 'hi' ? 'पे' : 'Pay'}</span>
                    </a>
                  </div>
                </div>

                {/* 3. PhonePe */}
                <div className="bg-purple-50/60 border border-purple-200 hover:border-purple-400 rounded-xl p-4 transition-all flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#5f259f] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        PhonePe
                      </span>
                      <span className="text-[10px] text-purple-800 font-semibold">Randhir Singh</span>
                    </div>
                    <div className="bg-white border border-purple-200 rounded-lg p-2.5 font-mono text-xs font-extrabold text-stone-900 select-all break-all mb-2 shadow-2xs">
                      9509593150-3@ybl
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
                    <button
                      onClick={() => handleCopy('9509593150-3@ybl', 'phonepe-id')}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-white hover:bg-purple-100 text-purple-950 font-bold py-1.5 px-2 rounded-lg border border-purple-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'phonepe-id' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-700" />
                          <span>{lang === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                    <a
                      href="upi://pay?pa=9509593150-3@ybl&pn=Randhir%20Singh&cu=INR"
                      className="inline-flex items-center justify-center gap-1 bg-[#5f259f] hover:bg-[#4a1c7d] text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
                      title="Open in PhonePe"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-purple-200" />
                      <span>{lang === 'hi' ? 'पे' : 'Pay'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic QR Codes Showcase */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="font-sacred text-base sm:text-lg font-bold text-stone-900">
                    {lang === 'hi' ? 'ऑफिशियल QR कोड्स (Scan & Pay)' : 'Official QR Code Showcase (Scan & Pay)'}
                  </h4>
                  <p className="text-xs text-stone-600">
                    {lang === 'hi'
                      ? 'किसी भी कैमरा या UPI ऐप (Paytm, GPay, PhonePe, BHIM) से सीधे स्कैन करें।'
                      : 'Scan directly with any UPI scanner app on your smartphone.'}
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">
                  {[
                    { id: 'all', label: lang === 'hi' ? 'सभी 3 QR' : 'All 3 QR' },
                    { id: 'phonepe', label: 'PhonePe' },
                    { id: 'gpay', label: 'Google Pay' },
                    { id: 'paytm', label: 'Paytm' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setActiveQrTab(btn.id as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeQrTab === btn.id
                          ? 'bg-amber-900 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Cards Display */}
              <div className={`grid gap-4 ${activeQrTab === 'all' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-sm mx-auto'}`}>
                {/* PhonePe QR Card */}
                {(activeQrTab === 'all' || activeQrTab === 'phonepe') && (
                  <div className="bg-white rounded-2xl border-2 border-purple-300 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#5f259f] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          PhonePe
                        </span>
                        <button
                          onClick={() => setZoomedQr({ title: 'PhonePe QR Code', image: '/assets/aistudio/phonepe_4220b648.jpeg', upiId: '9509593150-3@ybl' })}
                          className="text-stone-400 hover:text-purple-800 p-1 rounded cursor-pointer"
                          title={lang === 'hi' ? 'बड़ा देखें' : 'Zoom In'}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>

                      <div
                        onClick={() => setZoomedQr({ title: 'PhonePe QR Code', image: '/assets/aistudio/phonepe_4220b648.jpeg', upiId: '9509593150-3@ybl' })}
                        className="bg-stone-50 border border-purple-200 rounded-xl p-2 mb-3 cursor-pointer relative overflow-hidden"
                      >
                        <img
                          src="/assets/aistudio/phonepe_4220b648.jpeg"
                          alt="PhonePe QR Code - Randhir Singh"
                          className="w-full h-56 sm:h-48 object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                            <ZoomIn className="w-3 h-3" /> {lang === 'hi' ? 'बड़ा करें' : 'Click to Zoom'}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-purple-950 mb-1">
                        9509593150-3@ybl
                      </div>
                      <p className="text-[10px] text-stone-500 mb-3">
                        RANDHIR SINGH · PhonePe Official
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy('9509593150-3@ybl', 'qr-phonepe')}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold py-2 rounded-lg border border-purple-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'qr-phonepe' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-700" />
                          <span>{lang === 'hi' ? 'UPI आईडी कॉपी' : 'Copy UPI ID'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Google Pay QR Card */}
                {(activeQrTab === 'all' || activeQrTab === 'gpay') && (
                  <div className="bg-white rounded-2xl border-2 border-blue-300 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#1a73e8] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          Google Pay
                        </span>
                        <button
                          onClick={() => setZoomedQr({ title: 'Google Pay (GPay) QR Code', image: '/assets/aistudio/randhir-upi_60fbe7e9.jpg', upiId: 'randhirjpr-6@okicici' })}
                          className="text-stone-400 hover:text-blue-800 p-1 rounded cursor-pointer"
                          title={lang === 'hi' ? 'बड़ा देखें' : 'Zoom In'}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>

                      <div
                        onClick={() => setZoomedQr({ title: 'Google Pay (GPay) QR Code', image: '/assets/aistudio/randhir-upi_60fbe7e9.jpg', upiId: 'randhirjpr-6@okicici' })}
                        className="bg-stone-50 border border-blue-200 rounded-xl p-2 mb-3 cursor-pointer relative overflow-hidden"
                      >
                        <img
                          src="/assets/aistudio/randhir-upi_60fbe7e9.jpg"
                          alt="Google Pay QR Code - Randhir Singh"
                          className="w-full h-56 sm:h-48 object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                            <ZoomIn className="w-3 h-3" /> {lang === 'hi' ? 'बड़ा करें' : 'Click to Zoom'}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-blue-950 mb-1">
                        randhirjpr-6@okicici
                      </div>
                      <p className="text-[10px] text-stone-500 mb-3">
                        A Numerologist & Healer. Randhir Singh
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy('randhirjpr-6@okicici', 'qr-gpay')}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-2 rounded-lg border border-blue-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'qr-gpay' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-blue-700" />
                          <span>{lang === 'hi' ? 'UPI आईडी कॉपी' : 'Copy UPI ID'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Paytm QR Card */}
                {(activeQrTab === 'all' || activeQrTab === 'paytm') && (
                  <div className="bg-white rounded-2xl border-2 border-sky-300 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#002e6e] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          Paytm UPI
                        </span>
                        <button
                          onClick={() => setZoomedQr({ title: 'Paytm UPI QR Code', image: '/assets/aistudio/paytm-upi_fe2f911c.jpg', upiId: 'randhir.150@ptyes' })}
                          className="text-stone-400 hover:text-sky-800 p-1 rounded cursor-pointer"
                          title={lang === 'hi' ? 'बड़ा देखें' : 'Zoom In'}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>

                      <div
                        onClick={() => setZoomedQr({ title: 'Paytm UPI QR Code', image: '/assets/aistudio/paytm-upi_fe2f911c.jpg', upiId: 'randhir.150@ptyes' })}
                        className="bg-stone-50 border border-sky-200 rounded-xl p-2 mb-3 cursor-pointer relative overflow-hidden"
                      >
                        <img
                          src="/assets/aistudio/paytm-upi_fe2f911c.jpg"
                          alt="Paytm UPI QR Code - Randhir Singh"
                          className="w-full h-56 sm:h-48 object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                            <ZoomIn className="w-3 h-3" /> {lang === 'hi' ? 'बड़ा करें' : 'Click to Zoom'}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-sky-950 mb-1">
                        randhir.150@ptyes
                      </div>
                      <p className="text-[10px] text-stone-500 mb-3">
                        Randhir Singh · Paytm Verified
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy('randhir.150@ptyes', 'qr-paytm')}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold py-2 rounded-lg border border-sky-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi === 'qr-paytm' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-sky-700" />
                          <span>{lang === 'hi' ? 'UPI आईडी कॉपी' : 'Copy UPI ID'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Instructions */}
            <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200 text-xs text-stone-700 space-y-3 mb-6">
              <span className="font-bold text-stone-900 block flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {lang === 'hi' ? 'अपॉइंटमेंट कैसे पक्की (कन्फर्म) करें — 4 आसान चरण:' : 'How to Confirm Your Appointment — 4 Easy Steps:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-amber-900 block text-xs">
                    {lang === 'hi' ? '१. फीस का भुगतान करें' : '1. Transfer the Fee'}
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {lang === 'hi'
                      ? 'ऊपर दिए गए किसी भी QR कोड को स्कैन करें या UPI ID / मोबाइल नंबर 9509593150 पर फीस भेजें।'
                      : 'Scan any of the verified QR codes or send fee to the official UPI ID or number 9509593150.'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-amber-900 block text-xs">
                    {lang === 'hi' ? '२. रसीद का स्क्रीनशॉट लें' : '2. Save Transaction Proof'}
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {lang === 'hi'
                      ? 'भुगतान सफल होने पर UTR / Ref नंबर वाला स्क्रीनशॉट अपने फोन में सुरक्षित कर लें।'
                      : 'Capture a screenshot of the completed transaction displaying the UTR or reference number.'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-amber-900 block text-xs">
                    {lang === 'hi' ? '३. व्हाट्सएप पर भेजें' : '3. Share on WhatsApp'}
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {lang === 'hi'
                      ? 'स्क्रीनशॉट, अपना पूरा नाम और जन्मतिथि (+91-9509593150) पर व्हाट्सएप करें।'
                      : 'Share the screenshot along with your Full Name and Date of Birth on WhatsApp (+91-9509593150).'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-amber-900 block text-xs">
                    {lang === 'hi' ? '४. स्लॉट सुरक्षित करें' : '4. Instant Confirmation'}
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {lang === 'hi'
                      ? 'हमारी टीम तुरंत आपका अपॉइंटमेंट स्लॉट सुरक्षित कर कन्फर्मेशन समय भेज देगी।'
                      : 'Our sanctuary desk will confirm your appointment timing and lock in your priority slot.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call-to-action */}
            <div className="text-center">
              <a
                href="https://wa.me/919509593150?text=Namaste%20Randhir%20Ji%2C%20I%20have%20transferred%20the%20consultancy%20fee%20via%20UPI.%20Please%20find%20my%20details%20attached%3A%0A-%20Name%3A%20%0A-%20Date%20of%20Birth%3A%20%0A-%20Service%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>
                  {lang === 'hi'
                    ? 'व्हाट्सएप पर पेमेंट स्क्रीनशॉट भेजकर स्लॉट पक्का करें (+91-9509593150)'
                    : 'Share Payment Receipt on WhatsApp to Confirm Slot (+91-9509593150)'}
                </span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: TRANSFORMATIONAL STORIES */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {lang === 'hi' ? 'सच्चे अनुभव' : 'Transformational Stories'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                {lang === 'hi' ? 'लोगों के अनुभव और रिव्यू' : 'Client Words & Reflections'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {lang === 'hi'
                  ? 'रणधीर सिंह जी से सलाह लेने के बाद लोगों के जीवन में आए सकारात्मक बदलाव।'
                  : 'Real experiences of clarity, healing, and empowered transformation with Numerologist & Healer · Randhir Singh'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {lang === 'hi' ? item.dateHi : item.date}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-5">
                      “{lang === 'hi' ? item.reviewHi : item.review}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">
                        {lang === 'hi' ? item.nameHi : item.name}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {lang === 'hi' ? item.locationHi : item.location}
                      </p>
                    </div>

                    <span className="text-[11px] font-semibold text-amber-900 bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 self-start sm:self-auto">
                      {lang === 'hi' ? item.serviceHi : item.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution QR Zoom Modal */}
      {zoomedQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full text-center relative border-2 border-amber-300 shadow-2xl">
            <button
              onClick={() => setZoomedQr(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-sacred text-base font-bold text-stone-900 mb-1">
              {zoomedQr.title}
            </h4>
            <p className="text-[11px] text-stone-500 mb-3">
              {lang === 'hi' ? 'किसी भी UPI ऐप से स्कैन करें' : 'Scan with any UPI application'}
            </p>
            <div className="bg-stone-50 border-2 border-stone-200 rounded-xl p-2 mb-3">
              <img
                src={zoomedQr.image}
                alt={zoomedQr.title}
                className="w-full h-64 object-contain mx-auto"
              />
            </div>
            <div className="bg-stone-100 p-2.5 rounded-lg font-mono text-xs font-bold text-stone-800 mb-3 select-all break-all">
              {zoomedQr.upiId}
            </div>
            <button
              onClick={() => handleCopy(zoomedQr.upiId, 'zoomed')}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-900 hover:bg-amber-950 text-white font-bold py-2 rounded-lg text-xs cursor-pointer shadow-xs"
            >
              {copiedUpi === 'zoomed' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'UPI आईडी कॉपी करें' : 'Copy UPI ID'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
