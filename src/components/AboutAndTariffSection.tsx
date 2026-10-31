import React, { useState } from 'react';
import { Award, ShieldCheck, QrCode, CreditCard, Sparkles, Star, CheckCircle, ArrowRight, Phone, MessageCircle, MapPin, Clock, Heart, Filter, Shield, AlertCircle } from 'lucide-react';
import { Language, PageBlock } from '../types';
import { getTranslation } from '../i18n/languages';
import { useCmsPages } from '../context/CmsPageContext';

interface AboutAndTariffSectionProps {
  lang: Language;
  onBookService: (serviceTitle: string, price: string) => void;
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
    price: '₹3,100',
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
    description: 'Careful study of name letters and sound frequencies to align your name vibration with your birth Driver and Conductor numbers.',
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
  onBookService
}) => {
  const t = getTranslation(lang);
  const { getPageBySectionId } = useCmsPages();
  const cmsTariff = getPageBySectionId('tariff-about');
  const [activeTab, setActiveTab] = useState<'tariff' | 'about' | 'bank' | 'testimonials'>('tariff');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Listen to window hash changes to activate corresponding tab
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '').trim();
      if (hash === 'tariff' || hash === 'fees' || hash === 'consultancy-fees' || hash === 'healing-fees') {
        setActiveTab('tariff');
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
      <div id="tariff" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="fees" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="consultancy-fees" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="healing-fees" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'tariff', label: lang === 'hi' ? 'परामर्श और हीलिंग फीस' : 'Consultancy & Healing Fees', icon: Sparkles },
            { id: 'about', label: lang === 'hi' ? 'रणधीर सिंह जी के बारे में' : 'About Randhir Singh Ji', icon: Award },
            { id: 'bank', label: lang === 'hi' ? 'बैंक और UPI से पेमेंट' : 'Bank & UPI Details', icon: CreditCard },
            { id: 'testimonials', label: lang === 'hi' ? 'लोगों के अनुभव (रिव्यू)' : 'Client Reviews & Stories', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
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

        {/* TAB 1: CONSULTANCY & HEALING SERVICES TARIFF */}
        {activeTab === 'tariff' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                {lang === 'hi' ? 'आध्यात्मिक सलाह और हीलिंग सेवाएँ' : 'Spiritual Guidance & Healing Services'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 mt-3">
                {lang === 'hi' ? 'परामर्श और हीलिंग फीस लिस्ट' : 'Consultancy & Healing Services Fees'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'पर्सनल 1-on-1 बातचीत, पूरी प्राइवेसी, पॉजिटिव एनर्जी और सरल वैदिक उपायों के साथ।'
                  : 'Dedicated 1-on-1 sessions designed with complete confidentiality, divine awareness, and simple practical guidance.'}
              </p>

              {/* 3 Value Pillars */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-5 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {lang === 'hi' ? '100% प्राइवेट व गोपनीय' : '100% Confidential'}
                </span>
                <span className="flex items-center gap-1.5 text-amber-900">
                  <Clock className="w-4 h-4 text-amber-700" />
                  {lang === 'hi' ? 'पहले से बुक किया गया समय' : 'Pre-scheduled Confirmed Sessions'}
                </span>
                <span className="flex items-center gap-1.5 text-blue-900">
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  {lang === 'hi' ? 'UPI, QR कोड व बैंक ट्रांसफर' : 'UPI, QR & Direct Bank Transfer'}
                </span>
              </div>
            </div>

            {/* Sunday Free Highlight & Flagship Consultation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Sunday Free Slot Card */}
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

                  <div className="my-5 flex items-baseline gap-2">
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
                      <span>{lang === 'hi' ? 'मूलांक, भाग्यांक और मिसिंग नंबर की जांच' : 'Driver, Conductor & Missing numbers identification'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{lang === 'hi' ? 'पहले आओ, पहले पाओ के आधार पर' : 'Allocated strictly on first-come confirmed booking'}</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => onBookService('Sunday Free Consultation', 'FREE')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-stone-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-stone-900" />
                  <span>{lang === 'hi' ? 'रविवार का फ्री स्लॉट बुक करें' : 'Claim Sunday Free Slot Now'}</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </button>
              </div>

              {/* Flagship Most Popular: Personalized Spiritual Consultation */}
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

                  <div className="my-5 p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-stone-500 block">
                        {lang === 'hi' ? 'कंसल्टेशन फीस' : 'Consultancy Fee'}
                      </span>
                      <div className="text-3xl font-black text-amber-900">
                        {cmsTariff?.blocks?.find((b: PageBlock) => b.type === 'consultation')?.price || '₹5,100'}
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
                    onClick={() => onBookService('Personalized Spiritual Consultation', '₹5,100')}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'hi' ? 'परामर्श बुक करें (₹5,100)' : 'Book Consultation (₹5,100)'}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>

                  <button
                    onClick={() => setActiveTab('bank')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
                  >
                    <CreditCard className="w-4 h-4 text-stone-600" />
                    <span>{lang === 'hi' ? 'पेमेंट का विवरण' : 'Payment Info'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 11 Specialized Healing & Correction Services */}
            <div>
              <div className="border-t border-amber-200/80 pt-10 mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {lang === 'hi' ? 'खास समाधान और हीलिंग' : 'Targeted Restorative Sessions'}
                  </span>
                  <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                    {lang === 'hi' ? '11 खास हीलिंग और सुधार सेवाएँ' : '11 Specialized Healing & Correction Services'}
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedCategory === f.id
                          ? 'bg-amber-900 text-white shadow-2xs'
                          : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      {lang === 'hi' ? f.labelHi : f.labelEn}
                    </button>
                  ))}
                </div>
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
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-10 shadow-lg max-w-3xl mx-auto animate-in fade-in duration-200">
            <div className="text-center max-w-md mx-auto mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <QrCode className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-sacred text-2xl font-bold text-stone-900">
                {lang === 'hi' ? 'बैंक और UPI पेमेंट की जानकारी' : 'Bank & UPI Payment Details'}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'hi'
                  ? 'फीस, थेरेपी वॉच या यंत्र मंगवाने के लिए सही और सुरक्षित पेमेंट डिटेल्स।'
                  : 'Direct and verified payment credentials for consultancy fees, therapy watches, and materials.'}
              </p>
            </div>

            {/* UPI Box */}
            <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-400/50 mb-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {lang === 'hi' ? 'ऑफिशियल UPI नंबर' : 'Official Instant UPI Number'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                    +91-9509593150
                  </div>
                  <p className="text-xs text-amber-200/80 mt-1">
                    {lang === 'hi' ? 'खाता धारक:' : 'Account Name:'} <strong>RANDHIR SINGH</strong>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-amber-300 font-semibold">
                    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">PhonePe</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">Google Pay (GPay)</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">Paytm</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">BHIM UPI</span>
                  </div>
                </div>

                <div className="shrink-0 bg-white p-3 rounded-xl border-2 border-amber-400 text-center shadow-md">
                  <div className="w-28 h-28 bg-stone-100 flex flex-col items-center justify-center rounded border border-stone-200 text-stone-700 text-xs font-mono">
                    <QrCode className="w-16 h-16 text-stone-900 mb-1" />
                    <span className="text-[9px] font-bold">{lang === 'hi' ? 'स्कैन कर भुगतान करें' : 'SCAN & PAY'}</span>
                  </div>
                  <span className="text-[10px] text-stone-600 font-mono mt-1 block">
                    9509593150@upi
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Instructions */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-xs text-stone-700 space-y-2">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {lang === 'hi' ? 'अपॉइंटमेंट कैसे पक्की (कन्फर्म) करें:' : 'How to Confirm Your Appointment:'}
              </span>
              <p>
                {lang === 'hi'
                  ? '1. तय की गई फीस UPI नंबर +91-9509593150 पर भेजें।'
                  : '1. Transfer the applicable consultancy fee using UPI to +91-9509593150.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '2. पेमेंट का स्क्रीनशॉट ले लें।'
                  : '2. Take a screenshot of the completed payment transaction receipt.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '3. स्क्रीनशॉट, अपना नाम और जन्मतिथि व्हाट्सएप (+91-9509593150) पर भेजें।'
                  : '3. Share the screenshot along with your Full Name and Date of Birth directly on WhatsApp at +91-9509593150.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '4. हमारी टीम तुरंत आपको समय स्लॉट देकर कन्फर्मेशन भेज देगी।'
                  : '4. Our team will verify and lock in your priority appointment slot and confirm time.'}
              </p>
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
    </section>
  );
};
