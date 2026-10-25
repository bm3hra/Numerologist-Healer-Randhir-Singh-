import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  Sparkles,
  Award,
  Crown,
  Building,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Compass,
  FileCheck2,
  DollarSign,
  Sun,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Language } from '../../types';

interface SpecialYantrasPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToPage: (pageId: string) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

interface SpecialYantra {
  id: string;
  category: 'business' | 'job' | 'desire';
  categoryLabelEn: string;
  categoryLabelHi: string;
  nameEn: string;
  nameHi: string;
  deity: string;
  purposeEn: string;
  purposeHi: string;
  magicSum?: number;
  matrix?: number[][];
  mantra: string;
  bestDay: string;
  idealDirection: string;
  metalOptions: string[];
  keyBenefits: string[];
  ritualProcedure: string[];
}

const SPECIAL_YANTRAS: SpecialYantra[] = [
  {
    id: 'vyapar_vridhi',
    category: 'business',
    categoryLabelEn: 'Business Growth & Cash Inflow',
    categoryLabelHi: 'व्यापार वृद्धि एवं धन आगमन',
    nameEn: 'Shri Vyapar Vridhi & Lakshmi Ganesha Yantra',
    nameHi: 'श्री व्यापार वृद्धि एवं लक्ष्मी गणेश यंत्र',
    deity: 'Goddess Mahalakshmi & Lord Ganesha',
    purposeEn: 'Unlocks stuck payments, multiplies footfall and sales, protects against competitor jealousy.',
    purposeHi: 'अटके हुए धन की वसूली, ग्राहकों की संख्या में वृद्धि एवं व्यापारिक प्रतिस्पर्धा से रक्षा।',
    matrix: [
      [14, 19, 12],
      [13, 15, 17],
      [18, 11, 16]
    ],
    magicSum: 45,
    mantra: 'Om Shreem Hreem Kleem Glaum Gam Ganapataye Vara Varada Sarvajanam Me Vashamaanaya Svaha · Om Shreem Maha Lakshmyai Namah',
    bestDay: 'Wednesday or Friday morning during Shukla Paksha',
    idealDirection: 'North (Kubera Dik) or East above cash drawer / POS counter',
    metalOptions: ['Himalayan Bhojpatra with Ashtagandha', 'Pure Heavy Copper Plate', '24K Gold-Plated Brass'],
    keyBenefits: [
      'Magnetizes new clientele and lucrative business contracts',
      'Removes evil eye (bazar nazar) from shopfront or factory premises',
      'Eliminates sudden unexplained financial leakages and inventory loss',
      'Harmonizes partnership dynamics and resolves vendor disputes'
    ],
    ritualProcedure: [
      'Install on a Friday morning between 7:30 AM and 9:00 AM.',
      'Light a desi cow-ghee lamp and offer pure rose incense (Dhoop).',
      'Anoint the four corners with Kesar (saffron) Chandan paste.',
      'Recite the Vyapar Vridhi Beej Mantra 21 times before opening the day’s ledger.'
    ]
  },
  {
    id: 'kuber_yantra',
    category: 'business',
    categoryLabelEn: 'Wealth Preservation & Treasury',
    categoryLabelHi: 'धन संचय एवं कुबेर भंडार',
    nameEn: 'Ashta-Dhanada Shri Kuber Yantra (Matrix 72)',
    nameHi: 'अष्ट-धनद श्री कुबेर यंत्र (जादुई योग 72)',
    deity: 'Lord Kuber (Celestial Treasurer)',
    purposeEn: 'Guards accumulated wealth, prevents capital depletion, stimulates unexpected windfalls.',
    purposeHi: 'संचित पूंजी की रक्षा, आकस्मिक धन लाभ एवं ऋण मुक्ति का अचूक विधान।',
    matrix: [
      [27, 20, 25],
      [22, 24, 26],
      [23, 28, 21]
    ],
    magicSum: 72,
    mantra: 'Om Shreem Hreem Kleem Shreem Kleem Vitteshvaraya Namah',
    bestDay: 'Thursday or Friday evening during Dhanteras / Diwali or Shukla Paksha',
    idealDirection: 'North wall of office or placed directly inside cash safe facing North',
    metalOptions: ['Bhojpatra Inscribed with Gold Dust', 'Heavy Embossed Copper Plate', 'Solid Sterling Silver'],
    keyBenefits: [
      'Row, Column & Diagonal constant equals 72 (Mystical 9-frequency)',
      'Unlocks blocked bank accounts, inherited assets and stuck recovery',
      'Prevents reckless spending and debt escalation',
      'Establishes permanent wealth vibration in retail and corporate offices'
    ],
    ritualProcedure: [
      'Keep inside your cash box, locker, or audit cabin.',
      'Place 5 energized Gomti Chakras and 1 yellow cowrie beside the yantra.',
      'Sprinkle raw milk and saffron water every Purnima (Full Moon).',
      'Chant Kuber Beej Mantra 108 times facing North.'
    ]
  },
  {
    id: 'surya_yantra_job',
    category: 'job',
    categoryLabelEn: 'Government Job & Authority',
    categoryLabelHi: 'सरकारी नौकरी एवं प्रशासनिक पद',
    nameEn: 'Surya Yantra for Competitive Exams & Govt Promotions (Matrix 15)',
    nameHi: 'सूर्य यंत्र — सिविल सेवा, सरकारी नौकरी एवं पदोन्नति (योग 15)',
    deity: 'Lord Surya (Solar Deity of Authority & Soul)',
    purposeEn: 'Blessings for UPSC, state PSC, banking exams, administrative dominance and high social prestige.',
    purposeHi: 'प्रतियोगी परीक्षाओं में सफलता, उच्च पद, राजकीय सम्मान एवं सामाजिक प्रतिष्ठा प्राप्ति।',
    matrix: [
      [6, 1, 8],
      [7, 5, 3],
      [2, 9, 4]
    ],
    magicSum: 15,
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah · Om Ghrinih Suryaya Adityah',
    bestDay: 'Sunday morning at sunrise (during Ravi Hora)',
    idealDirection: 'East wall of study room or executive work desk',
    metalOptions: ['Pure Red Copper Plate', 'Consecrated Bhojpatra with Rakt Chandan'],
    keyBenefits: [
      'Eliminates self-doubt and boosts mental retention for examinations',
      'Wins favor of senior bureaucrats, interview panels, and political authorities',
      'Strengthens weak Sun (Surya dosha) in birth chart',
      'Enhances leadership charisma and public speaking confidence'
    ],
    ritualProcedure: [
      'Wake up at Brahmamuhurta (before sunrise) on a Sunday.',
      'Offer Arghya to the rising Sun with copper pot containing water, kumkum and red flowers.',
      'Perform 12 Surya Namaskars while gazing at the center of the Yantra.',
      'Chant the Surya Beej Mantra 108 times with Ruby/Rudraksha mala.'
    ]
  },
  {
    id: 'brihaspati_job',
    category: 'job',
    categoryLabelEn: 'Corporate Promotion & High Salary',
    categoryLabelHi: 'कॉर्पोरेट पदोन्नति एवं वेतन वृद्धि',
    nameEn: 'Brihaspati Guru Yantra for Executive Leadership (Matrix 27)',
    nameHi: 'गुरु बृहस्पति यंत्र — बहुराष्ट्रीय कंपनी पदोन्नति एवं वेतन वृद्धि (योग 27)',
    deity: 'Guru Brihaspati (Preceptor of Gods & Wisdom)',
    purposeEn: 'Catapults corporate managers into Vice-President, Director, and C-Suite executive leadership roles.',
    purposeHi: 'प्रबंधकीय पदों से निदेशक/सी-सूट पदों पर पदोन्नति एवं उच्च वेतन पैकेज आकर्षण।',
    matrix: [
      [10, 5, 12],
      [11, 9, 7],
      [6, 13, 8]
    ],
    magicSum: 27,
    mantra: 'Om Gram Greem Groum Sah Gurave Namah · Om Brihaspataye Namah',
    bestDay: 'Thursday morning before 9:00 AM',
    idealDirection: 'North-East (Ishan Kona) or office laptop background',
    metalOptions: ['Pure Yellow Brass Plate', 'Bhojpatra Inscribed with Haldi & Kesar', '24K Gold Plated'],
    keyBenefits: [
      'Attracts international assignments and lucrative offshore relocations',
      'Resolves appraisal friction with difficult reporting managers',
      'Sharpens strategic decision making, negotiation and mentorship skills',
      'Brings financial abundance and peaceful career stability'
    ],
    ritualProcedure: [
      'Install on a Thursday during waxing moon (Shukla Paksha).',
      'Offer yellow flowers, chana dal (split chickpeas), and jaggery.',
      'Apply a saffron tilak to the center and on your own forehead.',
      'Meditate for 15 minutes visualizing expansive golden light surrounding your career.'
    ]
  },
  {
    id: 'sarva_karya_siddhi',
    category: 'desire',
    categoryLabelEn: 'All Legitimate Desires & Breakthroughs',
    categoryLabelHi: 'सर्व कार्य सिद्धि एवं मनोकामना पूर्ति',
    nameEn: 'Sarva Karya Siddhi Mahayantra',
    nameHi: 'सर्व कार्य सिद्धि महायंत्र',
    deity: 'Unified Trimurti & Adishakti',
    purposeEn: 'Clears seemingly impossible bottlenecks in property, court cases, foreign visas, and marriage delays.',
    purposeHi: 'भूमि-भवन क्रय, न्यायालयीन विजय, विदेश यात्रा एवं विवाह में आ रही समस्त बाधाओं का निवारण।',
    matrix: [
      [13, 8, 15],
      [14, 12, 10],
      [9, 16, 11]
    ],
    magicSum: 36,
    mantra: 'Om Hreem Kleem Namah · Om Sarva Kaamya Siddhi Karaye Hreem Namah',
    bestDay: 'Tuesday, Thursday or Purnima morning',
    idealDirection: 'North-East or Home Mandir altar',
    metalOptions: ['Panchdhatu (5 Sacred Metals)', 'Bhojpatra in Ashtagandha', 'Sterling Silver Foil'],
    keyBenefits: [
      'Combines 7 divine energetic circuits into an integrated power grid',
      'Destroys invisible karmic roadblocks preventing long-cherished dreams',
      'Speedy resolution of disputed ancestral land, property, or legal contracts',
      'Guarantees victory in competitive ventures and personal aspirations'
    ],
    ritualProcedure: [
      'Write your specific desire on a small parchment slip under the yantra.',
      'Offer 5 cloves and a camphor piece lit in a brass diya.',
      'Chant 108 repetitions of the Siddhi Beej Mantra daily for 21 days.',
      'Maintain pure thoughts, truthful speech, and benevolent intent.'
    ]
  },
  {
    id: 'manorath_siddhi',
    category: 'desire',
    categoryLabelEn: 'Cherished Heart Desires & Dreams',
    categoryLabelHi: 'विशेष मनोरथ एवं महत्वाकांक्षी लक्ष्य',
    nameEn: 'Divine Manorath Siddhi & Kamadhenu Kalpavriksha Yantra',
    nameHi: 'दिव्य मनोरथ सिद्धि एवं कामधेनु कल्पवृक्ष यंत्र',
    deity: 'Maa Kamadhenu & Kalpavriksha',
    purposeEn: 'Manifests extraordinary personal goals: buying dream luxury home, prestigious awards, marital bliss.',
    purposeHi: 'सपनों का घर, राष्ट्रीय/अंतर्राष्ट्रीय सम्मान, दांपत्य सुख एवं दुर्लभ सिद्धियों की प्राप्ति।',
    mantra: 'Om Shreem Hreem Kleem Aim Sauh Sarva Manorath Poornam Kuru Kuru Svaha',
    bestDay: 'Friday morning or Akshaya Tritiya / Navratri',
    idealDirection: 'East or North-East wall of master suite or living sanctum',
    metalOptions: ['Consecrated Bhojpatra with Ashtagandha & Kasturi', 'Pure Silver Plate'],
    keyBenefits: [
      'Amplifies the law of attraction by aligning your subconscious with cosmic prana',
      'Attracts benevolent mentors, investors, and divine synchronicities',
      'Harmonizes personal lifestyle, luxury, and spiritual contentment',
      'Consecrated with Numerologist & Healer · Randhir Singh’s personalized Sankalpa'
    ],
    ritualProcedure: [
      'Perform Pradakshina (clockwise walking) 7 times around the home mandir.',
      'Offer sweet white kheer (rice pudding) or fresh white sweets on Fridays.',
      'Affirm your specific goal in present tense with absolute unwavering faith.',
      'Keep the sanctified yantra away from impure contact and negative speech.'
    ]
  }
];

export const SpecialYantrasPage: React.FC<SpecialYantrasPageProps> = ({
  lang,
  onNavigateHome,
  onNavigateToPage,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'business' | 'job' | 'desire'>('all');
  const [activeYantra, setActiveYantra] = useState<SpecialYantra>(SPECIAL_YANTRAS[0]);

  const filteredYantras = SPECIAL_YANTRAS.filter((y) => {
    if (selectedFilter === 'all') return true;
    return y.category === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-[#faf6ee] text-stone-900 pb-20">
      {/* Top Breadcrumb & Page Switcher */}
      <div className="bg-white border-b border-amber-200/80 sticky top-14 sm:top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-amber-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-700" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="font-bold text-amber-950 truncate">
              {lang === 'hi' ? 'विशेष यंत्र (व्यापार, नौकरी, मनोरथ)' : 'Special Yantras (Business, Job, Desire)'}
            </span>
          </div>

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-medium">
            <button
              onClick={() => onNavigateToPage('yantra-healings')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'यंत्र हीलिंग विज्ञान' : 'Yantra Healings'}
            </button>
            <button
              onClick={() => onNavigateToPage('dob-yantras')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'जन्मतिथि अनुसार यंत्र' : 'DOB Yantras'}
            </button>
            <button
              onClick={() => onNavigateToPage('kundli-milan')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'अंक ज्योतिष कुंडली मिलान' : 'Kundli Milan'}
            </button>
            <button
              onClick={() => onNavigateToPage('and-more')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'और भी... (रेमेडीज वॉल्ट)' : 'And More....'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f7f2e5] via-[#faf6ee] to-[#fbf8f0] py-12 sm:py-16 border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-950 px-4 py-1.5 rounded-full border border-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'व्यापार, पदोन्नति एवं महत्वाकांक्षी मनोरथ' : 'Business, Career & Special Desires'}</span>
          </div>

          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
            {lang === 'hi' ? 'विशेष सिद्ध यंत्र संग्रह' : 'Specialized Yantras for High Ambitions'}
          </h1>

          <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-4 tracking-wide">
            {lang === 'hi'
              ? 'व्यापार में चौगुना विस्तार, उच्च सरकारी/कॉर्पोरेट पद एवं विशिष्ट मनोकामनाओं की निर्बाध सिद्धि'
              : 'Empowering Corporate Leaders, Entrepreneurs, Government Aspirants & Cherished Life Goals'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'जब सामान्य प्रयास अवरुद्ध हो जाएं, तब वैदिक संख्यात्मक यंत्रों की अचूक शक्ति दिशा बदल देती है। प्रत्येक यंत्र को ग्राहक के नाम, जन्मतिथि, गोत्र एवं व्यापारिक लक्ष्य के अनुसार अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह (जयपुर) द्वारा विशेष मुहूर्त में भोजपत्र अथवा शुद्ध ताम्र-पत्र पर तैयार किया जाता है।'
              : 'Engineered with mathematical numerical matrices where every horizontal, vertical, and diagonal axis adds to a sacred cosmic constant. These yantras bypass obstacles to magnetize capital, administrative authority, and fulfillment of high-stakes desires.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', labelEn: 'All Special Yantras', labelHi: 'सभी विशेष यंत्र' },
              { id: 'business', labelEn: '1. Business & Commerce', labelHi: '1. व्यापार एवं व्यवसाय वृद्धि' },
              { id: 'job', labelEn: '2. Job, Promotion & Authority', labelHi: '2. नौकरी, पदोन्नति व प्रतियोगी परीक्षा' },
              { id: 'desire', labelEn: '3. Special Desires & Breakthroughs', labelHi: '3. विशेष मनोकामना एवं सर्व कार्य सिद्धि' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-amber-900 text-white shadow-md ring-2 ring-amber-600'
                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
                }`}
              >
                {lang === 'hi' ? tab.labelHi : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Yantra Explorer Grid & Deep Dive */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Yantra List Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-sacred text-xs uppercase tracking-wider text-stone-500 font-bold px-1">
              {lang === 'hi' ? 'यंत्र का चयन करें:' : 'Select Specialized Yantra:'}
            </h3>

            {filteredYantras.map((yantra) => {
              const isSelected = activeYantra.id === yantra.id;
              return (
                <div
                  key={yantra.id}
                  onClick={() => setActiveYantra(yantra)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all text-left ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-lg ring-2 ring-amber-400/60 scale-[1.01]'
                      : 'bg-white/80 hover:bg-white border-stone-200 hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {lang === 'hi' ? yantra.categoryLabelHi : yantra.categoryLabelEn}
                    </span>
                    {yantra.magicSum && (
                      <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded">
                        Sum = {yantra.magicSum}
                      </span>
                    )}
                  </div>

                  <h4 className="font-sacred font-bold text-base text-stone-900 leading-snug">
                    {lang === 'hi' ? yantra.nameHi : yantra.nameEn}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'hi' ? yantra.purposeHi : yantra.purposeEn}
                  </p>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                    <span>{yantra.deity.split(' ')[0]}</span>
                    <span>{isSelected ? '● Viewing Details' : 'Inspect Protocol →'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Yantra Comprehensive Blueprint */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            {/* Header */}
            <div className="border-b border-amber-100 pb-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {lang === 'hi' ? activeYantra.categoryLabelHi : activeYantra.categoryLabelEn}
                  </span>
                  <h3 className="font-sacred text-2xl sm:text-3xl font-black text-stone-900 mt-0.5">
                    {lang === 'hi' ? activeYantra.nameHi : activeYantra.nameEn}
                  </h3>
                </div>
                {activeYantra.magicSum && (
                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Magic Constant</span>
                    <span className="text-3xl font-black font-mono text-amber-800">
                      {activeYantra.magicSum}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {lang === 'hi' ? activeYantra.purposeHi : activeYantra.purposeEn}
              </p>
            </div>

            {/* 3x3 Magic Matrix Visual if available */}
            {activeYantra.matrix && (
              <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 via-[#faf6ee] to-amber-100/70 rounded-2xl border-2 border-amber-300">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 block text-center mb-3">
                  Consecrated 3×3 Numerical Energy Grid
                </span>
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {activeYantra.matrix.map((row, rIdx) =>
                    row.map((val, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="aspect-square bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-100 rounded-xl flex items-center justify-center font-mono font-black text-2xl shadow-md border border-amber-400"
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
                <p className="text-center text-[11px] text-stone-500 mt-3 font-mono">
                  All 3 rows, 3 columns &amp; 2 diagonals sum exactly to <strong>{activeYantra.magicSum}</strong>.
                </p>
              </div>
            )}

            {/* Mantra Section */}
            <div className="bg-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-800 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Vedic Activation Seed Mantra:
              </span>
              <p className="font-serif italic text-sm sm:text-base leading-relaxed text-amber-100">
                "{activeYantra.mantra}"
              </p>
            </div>

            {/* Placement & Auspicious Muhurat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 mb-6">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  Vastu Orientation:
                </strong>
                <span>{activeYantra.idealDirection}</span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Auspicious Day &amp; Time:
                </strong>
                <span>{activeYantra.bestDay}</span>
              </div>
            </div>

            {/* Key Benefits List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Transformative Core Benefits:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {activeYantra.keyBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#fcfaf5] p-2.5 rounded-lg border border-amber-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consecration Metal Options */}
            <div className="mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="text-xs font-bold text-stone-900 block mb-2">
                Available Consecrated Formats:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeYantra.metalOptions.map((opt, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white text-stone-800 font-medium px-3 py-1 rounded-md border border-amber-300 shadow-2xs"
                  >
                    ★ {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking(`Custom Energized ${activeYantra.nameEn}`, '₹5,100')}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <FileCheck2 className="w-4 h-4 text-amber-300" />
                <span>Order Consecrated {activeYantra.nameEn.split(' ')[0]} Yantra</span>
              </button>

              <button
                onClick={() => onOpenBooking(`Consultation for ${activeYantra.nameEn}`, '₹2,100')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-800 font-bold py-3 px-5 rounded-xl text-xs border border-stone-300 transition-colors"
              >
                Consult Numerologist & Healer · Randhir Singh
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
