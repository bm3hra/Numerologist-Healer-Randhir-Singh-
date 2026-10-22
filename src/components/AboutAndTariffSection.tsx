import React, { useState } from 'react';
import { Award, ShieldCheck, QrCode, CreditCard, Sparkles, Star, CheckCircle, ArrowRight, Phone, MessageCircle, MapPin, Clock, Heart, Filter, Shield, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/languages';

interface AboutAndTariffSectionProps {
  lang: Language;
  onBookService: (serviceTitle: string, price: string) => void;
}

export interface SpecializedHealingService {
  id: number;
  category: 'energy' | 'numerology' | 'mind' | 'plr';
  categoryLabel: string;
  badge?: string;
  name: string;
  nameHi: string;
  price: string;
  duration?: string;
  description: string;
  note?: string;
  confidential: boolean;
}

export const SPECIALIZED_SERVICES_11: SpecializedHealingService[] = [
  {
    id: 1,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    name: 'Aura Cleaning',
    nameHi: 'आभा-मंडल शुद्धिकरण (Aura Cleaning)',
    price: '₹3,100',
    duration: '20 minutes',
    description: 'Aura cleaning is a sacred spiritual practice focusing on subtle energy balance, cleansing lingering dense energies to cultivate positivity, serenity, and inner awareness.',
    confidential: true
  },
  {
    id: 2,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    name: 'Negativity Healing',
    nameHi: 'नकारात्मकता निवारण हीलिंग',
    price: '₹5,100',
    duration: '30 minutes',
    description: 'This session assists in consciously dissipating negative thought patterns, emotional residue, and mental heaviness using harmonizing spiritual techniques.',
    confidential: true
  },
  {
    id: 3,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    badge: '7-Day Intensive',
    name: 'Chakra Healing (7-Day Intensive)',
    nameHi: 'चक्र हीलिंग (7 दिवसीय गहन साधना)',
    price: '₹31,000',
    duration: '7 Days',
    description: 'An intensive 7-day deep vibrational alignment addressing the 7 prime subtle chakras through meditation, sacred resonance, and transformative energy work.',
    confidential: true
  },
  {
    id: 4,
    category: 'numerology',
    categoryLabel: 'Numerological Correction',
    name: 'Mobile Number Numerology Correction',
    nameHi: 'मोबाइल नंबर अंक ज्योतिष सुधार',
    price: '₹5,100',
    duration: 'Full Report & Audit',
    description: 'Vedic numerological analysis of your mobile digits and vibrational frequencies to guide auspicious number combinations aligned with career and wealth.',
    confidential: true
  },
  {
    id: 5,
    category: 'numerology',
    categoryLabel: 'Numerological Correction',
    name: 'Name Spelling & Numerology Correction',
    nameHi: 'नाम वर्तनी एवं अंक ज्योतिष सुधार (Chaldean)',
    price: '₹1,100',
    duration: 'Detailed Analysis',
    description: 'Comprehensive study of name syllables and compound vibrations to synchronize your name frequency with your Mulank and Bhagyank destiny rulers.',
    confidential: true
  },
  {
    id: 6,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    name: 'Relationship & Harmony Healing',
    nameHi: 'संबंध एवं दांपत्य सौहार्द्र हीलिंग',
    price: '₹11,000',
    duration: '45-60 minutes',
    description: 'Spiritual and awareness-based guidance to heal emotional discord, bridge communication barriers, and restore mutual compassion in relationships.',
    confidential: true
  },
  {
    id: 7,
    category: 'energy',
    categoryLabel: 'Energy & Healing',
    name: 'Sacred Sound Healing',
    nameHi: 'पवित्र ध्वनि उपचार (Sound Healing)',
    price: '₹11,000',
    duration: '45 minutes',
    description: 'Harnessing sacred sound frequencies, singing bowls, resonant bells, and Vedic mantras to induce profound meditative states, cellular relaxation, and mental clarity.',
    confidential: true
  },
  {
    id: 8,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    name: 'Mind & Body Relaxation Therapy',
    nameHi: 'मन एवं देह विश्रांति थेरेपी',
    price: '₹5,100',
    duration: '45 minutes',
    description: 'A guided therapeutic session centering on somatic de-stressing, conscious breathwork (Pranayama), and deep tranquility for nervous system reset.',
    confidential: true
  },
  {
    id: 9,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    name: 'Anxiety & Emotional Support Therapy',
    nameHi: 'चिंता मुक्ति एवं संवेगात्मक संबल थेरेपी',
    price: '₹5,100',
    duration: '45 minutes',
    description: 'Supportive spiritual mentorship cultivating mindfulness, calm grounding, and emotional resilience for those navigating anxiety or prolonged low moods.',
    note: 'Important: This service is for spiritual and mindful support and is not a substitute for clinical medical treatment or psychiatric care.',
    confidential: true
  },
  {
    id: 10,
    category: 'plr',
    categoryLabel: 'Deep Soul Exploration',
    badge: 'Specialized Session',
    name: 'Past Life Regression (PLR) Session',
    nameHi: 'पूर्व जन्म स्मृति अन्वेषण (PLR Session)',
    price: '₹15,000',
    duration: '90-120 minutes',
    description: 'Past Life Regression spiritual exploration delving into soul impressions, karmic patterns, and deep subconscious emotional layers.',
    note: 'PLR is understood as a spiritual meditative exploration of subconscious patterns and inner symbols rather than verified historic memories.',
    confidential: true
  },
  {
    id: 11,
    category: 'mind',
    categoryLabel: 'Mind Balance & Therapy',
    name: 'Mind Peace Therapy',
    nameHi: 'मनः शांति एवं संतुलन थेरेपी',
    price: '₹5,100',
    duration: '45 minutes',
    description: 'Gentle meditative practices focused on quieting overactive mental chatter, cultivating enduring peace, and restoring emotional equilibrium.',
    confidential: true
  }
];

export const AboutAndTariffSection: React.FC<AboutAndTariffSectionProps> = ({
  lang,
  onBookService
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'tariff' | 'about' | 'bank' | 'testimonials'>('tariff');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      serviceHi: 'वैदिक अंक ज्योतिष एवं मार्गदर्शन',
      review: 'Master Randhir Singh’s Mulank and Bhagyank breakdown was astoundingly precise. Practical remedies and watch corrections yielded a senior leadership offer within 3 months.',
      reviewHi: 'मास्टर रणधीर सिंह का मूलांक और भाग्यांक विश्लेषण अत्यंत सटीक था। व्यावहारिक उपायों और कलाई घड़ी के सुझाव से 3 महीने के भीतर मुझे वरिष्ठ पद का प्रस्ताव मिला।',
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
      serviceHi: 'टैरो रीडिंग एवं प्राणिक हीलिंग',
      review: 'I came during an emotionally stressful chapter. The session brought instant clarity and peace. The distance energy healing calmed my anxiety remarkably.',
      reviewHi: 'मानसिक तनाव के समय मैंने परामर्श लिया। इस सत्र से मुझे अद्भुत शांति और स्पष्टता मिली। दूरस्थ हीलिंग ने मेरी चिंता को पूरी तरह शांत कर दिया।',
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
      serviceHi: 'जीवन मार्गदर्शन एवं चक्र शुद्धि',
      review: 'A rare combination of genuine spiritual depth with practical grounding. The actionable advice transformed my career and personal relationships.',
      reviewHi: 'गहरे आध्यात्मिक ज्ञान और व्यावहारिक दृष्टिकोण का अद्भुत संगम। दिए गए उपायों से मेरे करियर और पारिवारिक संबंधों में सकारात्मक बदलाव आया।',
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
      serviceHi: 'संबंध अंक ज्योतिष एवं ग्रिड मिलान',
      review: 'We consulted for relationship and business compatibility. Compassionate guidance resolved friction patterns and gave us total confidence to move forward.',
      reviewHi: 'हमने व्यापार विस्तार और आपसी तालमेल के लिए ग्रिड मिलान करवाया। आदरणीय रणधीर जी के मार्गदर्शन से आपसी सामंजस्य और विश्वास सुदृढ़ हुआ।',
      rating: 5
    }
  ];

  return (
    <section id="tariff-about" className="py-12 sm:py-16 bg-[#faf7f0] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'tariff', label: lang === 'hi' ? 'परामर्श एवं हीलिंग शुल्क' : 'Consultancy & Healing Tariff', icon: Sparkles },
            { id: 'about', label: lang === 'hi' ? 'रणधीर सिंह जी का परिचय' : 'About Randhir Singh Ji', icon: Award },
            { id: 'bank', label: lang === 'hi' ? 'बैंक एवं यूपीआई विवरण' : 'Bank & UPI Details', icon: CreditCard },
            { id: 'testimonials', label: lang === 'hi' ? 'अनुभव एवं समीक्षाएँ' : 'Transformational Stories', icon: Star }
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
                {lang === 'hi' ? 'आध्यात्मिक मार्गदर्शन एवं हीलिंग सेवाएँ' : 'Spiritual Guidance & Healing Services'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 mt-3">
                {lang === 'hi' ? 'परामर्श एवं हीलिंग सेवा शुल्क सूची' : 'Consultancy & Healing Services Tariff'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'व्यक्तिगत 1-on-1 सत्र, पूर्ण गोपनीयता, आध्यात्मिक ऊर्जा और प्रामाणिक वैदिक उपायों के साथ।'
                  : 'Dedicated 1-on-1 sessions designed with complete confidentiality, sacred awareness, and profound spiritual healing.'}
              </p>

              {/* 3 Value Pillars */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-5 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {lang === 'hi' ? '100% गोपनीय मार्गदर्शन' : '100% Confidential Guidance'}
                </span>
                <span className="flex items-center gap-1.5 text-amber-900">
                  <Clock className="w-4 h-4 text-amber-700" />
                  {lang === 'hi' ? 'पूर्व-निर्धारित प्रामाणिक सत्र' : 'Pre-scheduled Authentic Sessions'}
                </span>
                <span className="flex items-center gap-1.5 text-blue-900">
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  {lang === 'hi' ? 'UPI, QR व सीधा बैंक ट्रांसफर' : 'UPI, QR & Direct Bank Transfer'}
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
                      {lang === 'hi' ? 'साप्ताहिक पावन सेवा' : 'Weekly Sacred Privilege'}
                    </span>
                    <span className="text-xs text-amber-300 font-mono font-bold">
                      {lang === 'hi' ? 'जयपुर व ऑनलाइन' : 'Jaipur & Online'}
                    </span>
                  </div>

                  <h3 className="font-sacred text-xl sm:text-2xl font-bold text-white leading-snug">
                    {lang === 'hi' ? 'रविवार निःशुल्क 1-on-1 परामर्श' : 'Sunday Free 1-on-1 Consultation'}
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-2 leading-relaxed">
                    {lang === 'hi'
                      ? 'प्रत्येक रविवार, मास्टर रणधीर सिंह प्रथम 5 परामर्श पूर्व अपॉइंटमेंट पर 100% निःशुल्क प्रदान करते हैं। इसमें संपूर्ण जन्म तिथि एवं लो-शू ग्रिड निदान शामिल है।'
                      : 'Every Sunday, Master Randhir Singh offers the first 5 consultations 100% FREE on appointment. Includes complete Date of Birth & Lo-Shu diagnosis.'}
                  </p>

                  <div className="my-5 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-300">{lang === 'hi' ? 'निःशुल्क' : 'FREE'}</span>
                    <span className="text-xs text-amber-200/60 line-through">{lang === 'hi' ? 'नियमित ₹2,100' : 'Regular ₹2,100'}</span>
                  </div>

                  <ul className="text-xs text-amber-100 space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{lang === 'hi' ? 'अवधि: 20 मिनट (ऑनलाइन या जयपुर क्लिनिक)' : 'Duration: 20 Minutes (Virtual or Jaipur Clinic)'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{lang === 'hi' ? 'मूलांक, भाग्यांक व अनुपस्थित अंकों का परीक्षण' : 'Mulank, Bhagyank & Missing numbers identification'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{lang === 'hi' ? 'केवल पूर्व पुष्टि प्राप्त बुकिंग पर आधारित' : 'Allocated strictly on first-come confirmed booking'}</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => onBookService('Sunday Free Consultation', 'FREE')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-stone-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-stone-900" />
                  <span>{lang === 'hi' ? 'फ्री रविवार स्लॉट बुक करें' : 'Claim Sunday Free Slot Now'}</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </button>
              </div>

              {/* Flagship Most Popular: Personalized Spiritual Consultation */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-500 shadow-xl relative flex flex-col justify-between">
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                  ★ {lang === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}
                </div>

                <div>
                  <div className="flex items-center gap-2 text-stone-500 text-xs mb-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>{lang === 'hi' ? 'अवधि: 45-60 मिनट' : 'Duration: 45-60 mins'}</span>
                    <span>·</span>
                    <span className="text-amber-900 font-semibold">{lang === 'hi' ? 'गहन व्यक्तिगत विश्लेषण' : 'Personalized In-depth Analysis'}</span>
                  </div>

                  <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                    {lang === 'hi' ? 'व्यक्तिगत आध्यात्मिक व अंक ज्योतिष परामर्श' : 'Personalized Spiritual Consultation'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {lang === 'hi'
                      ? 'एक संपूर्ण व्यक्तिगत 1-on-1 परामर्श सत्र जिसमें वैदिक अंक ज्योतिष, वॉच एनालिसिस और व्यावहारिक उपायों द्वारा आपके जीवन, करियर व विवाह संबंधी प्रश्नों का समाधान किया जाता है।'
                      : 'A personalized 1-on-1 consultation session dedicated to understanding your queries, life circumstances, and life path through Vedic wisdom, Watch Analysis, and Remedial Guidance.'}
                  </p>

                  <div className="my-5 p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-stone-500 block">
                        {lang === 'hi' ? 'परामर्श शुल्क' : 'Consultancy Fee'}
                      </span>
                      <div className="text-3xl font-black text-amber-900">
                        ₹5,100
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {lang === 'hi' ? 'प्रति सत्र (ऑनलाइन वीडियो / फोन / क्लिनिक)' : 'Per session (Virtual / Telephonic / In-Person)'}
                      </span>
                    </div>

                    <div className="text-right text-xs text-stone-600">
                      <span className="block font-bold text-amber-950">{lang === 'hi' ? 'सत्र में शामिल:' : 'Includes:'}</span>
                      <span>{lang === 'hi' ? 'जन्म तिथि + घड़ी + नाम विश्लेषण' : 'DOB + Watch + Name review'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{lang === 'hi' ? 'संपूर्ण लो-शू 3×3 मैजिक ग्रिड और 8 तलों (Planes) का विश्लेषण' : 'Full Lo-Shu 3x3 Magic Grid and 8 Planes evaluation'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{lang === 'hi' ? 'सिग्नेचर थेरेपी वॉच प्रिस्क्रिप्शन एवं रंग आवृत्ति निर्धारण' : 'Signature Therapy Watch prescription & color frequencies'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{lang === 'hi' ? 'करियर, व्यापार, विवाह व स्वास्थ्य हेतु व्यक्तिगत उपाय' : 'Personalized Remedies for marriage, health, and career growth'}</span>
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
                    <span>{lang === 'hi' ? 'भुगतान विवरण' : 'Payment Info'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 11 Specialized Healing & Correction Services */}
            <div>
              <div className="border-t border-amber-200/80 pt-10 mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Targeted Restorative Sessions
                  </span>
                  <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                    11 Specialized Healing &amp; Correction Services
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All Services (11)' },
                    { id: 'energy', label: 'Energy & Healing (5)' },
                    { id: 'numerology', label: 'Numerology Corrections (2)' },
                    { id: 'mind', label: 'Mind Balance & Therapy (3)' },
                    { id: 'plr', label: 'PLR Regression (1)' }
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
                      {f.label}
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
                              {svc.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                            {svc.categoryLabel}
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
                            ⏱ {svc.duration}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {svc.description}
                      </p>

                      {svc.note && (
                        <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-950 mb-3 flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <p className="leading-snug">{svc.note}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        Confidential
                      </span>

                      <button
                        onClick={() => onBookService(svc.name, svc.price)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-colors shadow-2xs"
                      >
                        <span>Book Session</span>
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
                  alt="Master Randhir Singh"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>{lang === 'hi' ? 'वैदिक अंक ज्योतिषी एवं हीलर' : 'A Numerologist & Healer'}</span>
                </div>
                <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {lang === 'hi' ? 'रणधीर सिंह जी' : 'Randhir Singh Ji'}
                </h3>
                <p className="text-amber-900 font-medium text-sm">
                  {lang === 'hi' ? '“अपनी जन्म तिथि को डिकोड करें। अपना जीवन एवं भाग्य बदलें।”' : '“Decode Your Date of Birth. Change Your Life and Destiny.”'}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'जयपुर (राजस्थान) के प्रतिष्ठित वैदिक अंक ज्योतिषी, आध्यात्मिक साधक एवं प्राणिक हीलर। जन्म तिथि (लो-शू ग्रिड), थेरेपी वॉचेस, पारंपरिक लवण शुद्धि (सॉल्ट थेरेपी) एवं सिद्ध यंत्रों के माध्यम से देश-विदेश के साधकों को प्रामाणिक मार्गदर्शन प्रदान करते हैं।'
                    : 'Dedicated spiritual practitioner, Vedic numerologist, and energetic healer based in Jaipur, Rajasthan. Serving seekers across all 24 major Indian and international languages with profound expertise in Date of Birth Lo-Shu analysis, Therapy Watches, Traditional Salt Cleansing, and Sacred Yantras.'}
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
                  {lang === 'hi' ? '⏰ परामर्श समय' : '⏰ Consultation Timings'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi' ? 'प्रातः 9:00 से सायं 6:00 बजे तक (IST)' : '9:00 A.M. to 6:00 P.M. (IST)'}<br />
                  {lang === 'hi' ? 'पूर्व अपॉइंटमेंट आवश्यक।' : 'Prior appointment recommended.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-950 block mb-1">
                  {lang === 'hi' ? '🎁 साप्ताहिक निःशुल्क सेवा' : '🎁 Weekly Free Privilege'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'प्रत्येक रविवार प्रथम 5 परामर्श पूर्व अपॉइंटमेंट पर 100% निःशुल्क हैं।'
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
                <span>{lang === 'hi' ? 'व्हाट्सएप पर सीधा संपर्क करें' : 'Connect Directly on WhatsApp'}</span>
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
                {lang === 'hi' ? 'बैंक एवं यूपीआई भुगतान विवरण' : 'Bank & UPI Payment Details'}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'hi'
                  ? 'परामर्श शुल्क, थेरेपी वॉचेस व यंत्रों हेतु प्रामाणिक एवं सत्यापित भुगतान विवरण।'
                  : 'Direct and verified payment credentials for consultancy fees, therapy watches, and consecrated materials.'}
              </p>
            </div>

            {/* UPI Box */}
            <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-400/50 mb-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {lang === 'hi' ? 'आधिकारिक तुरंत यूपीआई नंबर' : 'Official Instant UPI Number'}
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
                {lang === 'hi' ? 'अपनी अपॉइंटमेंट की पुष्टि कैसे करें:' : 'How to Confirm Your Appointment:'}
              </span>
              <p>
                {lang === 'hi'
                  ? '1. निर्धारित परामर्श शुल्क UPI द्वारा +91-9509593150 पर भेजें।'
                  : '1. Transfer the applicable consultancy fee using UPI to +91-9509593150.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '2. सफल भुगतान का स्क्रीनशॉट प्राप्त करें।'
                  : '2. Take a screenshot of the completed payment transaction receipt.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '3. स्क्रीनशॉट, अपना पूरा नाम और जन्म तिथि व्हाट्सएप +91-9509593150 पर भेजें।'
                  : '3. Share the screenshot along with your Full Name and Date of Birth directly on WhatsApp at +91-9509593150.'}
              </p>
              <p>
                {lang === 'hi'
                  ? '4. हमारी टीम तुरंत समय स्लॉट निर्धारित कर आपको पुष्टि भेजेगी।'
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
                {lang === 'hi' ? 'सकारात्मक जीवन परिवर्तन' : 'Transformational Stories'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                {lang === 'hi' ? 'साधकों के अनुभव व विचार' : 'Client Words & Reflections'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {lang === 'hi'
                  ? 'मास्टर रणधीर सिंह के साथ स्पष्टता, ऊर्जा उपचार एवं सफलता के वास्तविक अनुभव।'
                  : 'Real experiences of clarity, healing, and empowered transformation with Master Randhir Singh'}
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
