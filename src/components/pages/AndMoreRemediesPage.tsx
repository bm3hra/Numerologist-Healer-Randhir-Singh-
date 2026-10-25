import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Droplets,
  Layers,
  Shield,
  Zap,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Flame,
  Search,
  BookOpen,
  Filter,
  Eye,
  Heart
} from 'lucide-react';
import { SWITCHWORDS_LIST } from '../../data/switchwordsData';
import { Language } from '../../types';

interface AndMoreRemediesPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToPage: (pageId: string) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

interface GrabovoiCode {
  id: string;
  category: string;
  intentEn: string;
  intentHi: string;
  code: string;
  instruction: string;
}

const GRABOVOI_CODES: GrabovoiCode[] = [
  {
    id: 'g1',
    category: 'wealth',
    intentEn: 'Unexpected Sudden Financial Flow',
    intentHi: 'आकस्मिक धन लाभ एवं वित्तीय संकट निवारण',
    code: '520 741 8',
    instruction: 'Write with green pen on left wrist or paste on water bottle and chant 28 times.'
  },
  {
    id: 'g2',
    category: 'wealth',
    intentEn: 'Permanent Financial Abundance & Cash Inflow',
    intentHi: 'स्थायी धन समृद्धि एवं वित्तीय स्वतंत्रता',
    code: '318 798',
    instruction: 'Write on currency note inside wallet or near cash register facing North.'
  },
  {
    id: 'g3',
    category: 'health',
    intentEn: 'Perfect Health & Complete Cellular Regeneration',
    intentHi: 'संपूर्ण शारीरिक स्वास्थ्य एवं रोग मुक्ति',
    code: '1814321',
    instruction: 'Inscribe with blue ink on a glass coaster or chant while drinking morning water.'
  },
  {
    id: 'g4',
    category: 'protection',
    intentEn: 'Divine Shield from Toxic People & Evil Eye (Nazar)',
    intentHi: 'बुरी नजर, ईर्ष्या एवं नकारात्मक लोगों से दैवीय सुरक्षा',
    code: '8888',
    instruction: 'Visualize in luminous golden light surrounding your whole body (aura shield).'
  },
  {
    id: 'g5',
    category: 'career',
    intentEn: 'Ideal Job Offer & Desired Promotion',
    intentHi: 'मनचाही नौकरी, पदोन्नति एवं साक्षात्कार सफलता',
    code: '493151 864 1491',
    instruction: 'Write on your resume / interview folder and chant 21 times each morning.'
  },
  {
    id: 'g6',
    category: 'relationships',
    intentEn: 'Harmonious Marriage & Romantic Reconciliation',
    intentHi: 'दांपत्य मधुरता, प्रेम एवं कलह निवारण',
    code: '888 412 1289018',
    instruction: 'Write on a photo of the couple inside a pink sacred energy circle.'
  }
];

export const AndMoreRemediesPage: React.FC<AndMoreRemediesPageProps> = ({
  lang,
  onNavigateHome,
  onNavigateToPage,
  onOpenBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'switchwords' | 'grabovoi' | 'salt' | 'rudraksha' | 'pyramids'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSwitchwords = SWITCHWORDS_LIST.filter((item) => {
    if (!searchQuery) return true;
    return (
      item.switchword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
              {lang === 'hi' ? 'और भी... (संपूर्ण रेमेडीज एवं हीलिंग वॉल्ट)' : 'And More.... (Holistic Remedies Vault)'}
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
              onClick={() => onNavigateToPage('special-yantras')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'विशेष यंत्र (व्यापार/नौकरी)' : 'Special Yantras'}
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
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f7f2e5] via-[#faf6ee] to-[#fbf8f0] py-12 sm:py-16 border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-950 px-4 py-1.5 rounded-full border border-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह का संपूर्ण उपचारात्मक संग्रह' : 'Numerologist & Healer · Randhir Singh’s Complete Esoteric Treasury'}</span>
          </div>

          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
            {lang === 'hi' ? 'और भी... दिव्य उपचार एवं गुप्त विधाएं' : 'And More.... Sacred Remedies Vault'}
          </h1>

          <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-4 tracking-wide">
            {lang === 'hi'
              ? 'स्विच वर्ड्स, दिव्य हीलिंग कोड्स, सिद्ध रुद्राक्ष, एनर्जी सर्कल्स एवं कॉपर पिरामिड ऊर्जा'
              : 'Switchwords, Quantum Healing Codes, Consecrated Rudraksha, Energy Circles & Vastu Pyramids'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'वैदिक अंक ज्योतिष के अलावा अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह अनेक सिद्ध उपचारात्मक पद्धतियों में सिद्धहस्त हैं। यहाँ उन सभी गुप्त एवं व्यावहारिक विधाओं की विस्तृत जानकारी है जो तुरंत आपके जीवन की दिशा बदल सकती हैं।'
              : 'Beyond classic birth grid calculations, explore the complete arsenal of quantum frequency cures, sacred switchwords, salt detox protocols, and certified authentic natural gemstones & rudrakshas.'}
          </p>

          {/* Quick Category Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', labelEn: 'All Remedies', labelHi: 'सभी वैदिक उपाय' },
              { id: 'switchwords', labelEn: 'Switchwords Catalog', labelHi: 'स्विचवर्ड्स संग्रह' },
              { id: 'grabovoi', labelEn: 'Divine Healing Codes', labelHi: 'दिव्य हीलिंग कोड्स' },
              { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नमक चिकित्सा (सॉल्ट थेरेपी)' },
              { id: 'rudraksha', labelEn: 'Certified Rudraksha Combinations', labelHi: 'प्रामाणिक रुद्राक्ष संयोजन' },
              { id: 'pyramids', labelEn: 'Copper Vastu Pyramids', labelHi: 'ताम्र वास्तु पिरामिड' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
                }`}
              >
                {lang === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* SECTION 1: SACRED GRABOVOI HEALING CODES */}
        {(activeCategory === 'all' || activeCategory === 'grabovoi') && (
          <section className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {lang === 'hi' ? 'क्वांटम अंक ऊर्जा तरंगें' : 'Quantum Numeric Resonance'}
                </span>
                <h2 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? 'दिव्य हीलिंग कोड्स एवं चमत्कारी अंक' : 'Sacred Divine Healing Numbers & Codes'}
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'वित्तीय, शारीरिक एवं मानसिक अवरोधों को दूर कर जीवन में शुभता आकर्षित करने वाले ऊर्जा कोड।'
                    : 'Direct frequency bypass codes to shift physical reality and eliminate financial/emotional blocks.'}
                </p>
              </div>
              <button
                onClick={() => onOpenBooking('Personalized Healing Codes Prescription', '₹1,500')}
                className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 transition-colors"
              >
                <span>{lang === 'hi' ? 'व्यक्तिगत कोड का निवेदन करें' : 'Request Custom Codes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GRABOVOI_CODES.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fcfaf5] rounded-2xl p-5 border border-amber-200 flex flex-col justify-between hover:border-amber-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {item.category.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleCopy(item.id, item.code)}
                        className="text-stone-400 hover:text-amber-800 p-1 rounded"
                        title="Copy Code"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="font-sacred font-bold text-stone-900 text-sm">
                      {lang === 'hi' ? item.intentHi : item.intentEn}
                    </h3>

                    {/* Numeric Code Display */}
                    <div className="my-3 py-2 px-3 bg-white rounded-xl border border-amber-300 font-mono text-xl sm:text-2xl font-black text-amber-950 text-center tracking-widest shadow-2xs">
                      {item.code}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong>{lang === 'hi' ? 'प्रयोग विधि:' : 'How to Use:'}</strong> {item.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: HIGH FREQUENCY SWITCHWORDS CATALOG */}
        {(activeCategory === 'all' || activeCategory === 'switchwords') && (
          <section className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {lang === 'hi' ? 'अवचेतन मन के सकारात्मक शब्द' : 'Subconscious Quantum Triggers'}
                </span>
                <h2 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? 'प्रमुख स्विचवर्ड्स संग्रह' : 'Master Switchwords Catalog'}
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'अवचेतन मन को तुरंत सकारात्मक ऊर्जा, आत्मविश्वास और सफलता के प्रति जागृत करने वाले पावन शब्द।'
                    : 'Universal vocal triggers that bypass rational resistance to program immediate luck, courage, and vitality.'}
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'hi' ? 'स्विचवर्ड खोजें...' : 'Search switchword...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredSwitchwords.map((sw) => (
                <div
                  key={sw.id}
                  className="bg-[#faf7f0] rounded-xl p-4 border border-stone-200 hover:border-amber-400 transition-colors flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="font-mono font-bold text-amber-950 text-sm tracking-wide">
                      {sw.switchword}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      {sw.purpose}
                    </p>
                    {sw.healingCode && (
                      <span className="inline-block mt-1.5 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {lang === 'hi' ? 'कोड: ' : 'Code: '}{sw.healingCode}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(sw.id, `${sw.switchword} ${sw.healingCode || ''}`)}
                    className="p-1.5 text-stone-400 hover:text-amber-800 shrink-0"
                    title={lang === 'hi' ? 'स्विचवर्ड कॉपी करें' : 'Copy Switchword'}
                  >
                    {copiedId === sw.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: CERTIFIED NATURAL RUDRAKSHA COMBINATIONS */}
        {(activeCategory === 'all' || activeCategory === 'rudraksha') && (
          <section className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl">
            <div className="border-b border-amber-100 pb-5 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {lang === 'hi' ? 'पवित्र वानस्पतिक प्राण-ऊर्जा' : 'Sacred Botanical Bio-Energy'}
              </span>
              <h2 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                {lang === 'hi' ? 'प्रामाणिक एवं सिद्ध रुद्राक्ष संयोजन' : 'Authentic Certified Rudraksha Combinations'}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'hi'
                  ? 'प्रत्येक मनका पूर्णतः प्रामाणिक, प्राण-प्रतिष्ठित एवं आपके ग्रह दोषों व जन्मतिथि के अनुसार निर्धारित।'
                  : 'Each bead tested with silver-thread dielectric test, energized in Shiva temple, and customized to your planetary dosha.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: lang === 'hi' ? '१ मुखी से ७ मुखी सर्व सिद्धि माला' : '1 Mukhi to 7 Mukhi Sarva Siddhi Mala',
                  benefits: lang === 'hi' ? 'आभामंडल का संपूर्ण रक्षा कवच, सूर्य से शनि तक के ग्रह दोषों का शमन एवं गहन मानसिक शांति।' : 'Complete aura shield, pacifies Surya (1 Mukhi) to Shani (7 Mukhi) doshas, brings mental serenity.',
                  rulingNos: lang === 'hi' ? 'अंक १, २, ३, ४, ५, ६, ७' : 'Numbers 1, 2, 3, 4, 5, 6, 7',
                  idealFor: lang === 'hi' ? 'प्रशासनिक अधिकारी, कॉर्पोरेट निदेशक, चिकित्सक' : 'Government officials, corporate directors, physicians'
                },
                {
                  title: lang === 'hi' ? 'गौरी शंकर + १० मुखी कृष्ण कवच' : 'Gauri Shankar + 10 Mukhi Krishna Kavach',
                  benefits: lang === 'hi' ? 'संबंधों में कलह निवारण, विवाह में विलंब की शांति एवं बुरी नजर व ईर्ष्या से सुरक्षा।' : 'Heals severe relationship rifts, blesses delayed marriages, and protects from jealousy and legal sabotage.',
                  rulingNos: lang === 'hi' ? 'अंक २, ६, ८' : 'Numbers 2, 6, 8',
                  idealFor: lang === 'hi' ? 'दंपत्ति, वैवाहिक सुख चाहने वाले साधक' : 'Couples, young women seeking matrimonial joy'
                },
                {
                  title: lang === 'hi' ? '१२ मुखी सूर्य + १४ मुखी देवमणि' : '12 Mukhi Surya + 14 Mukhi Devamani',
                  benefits: lang === 'hi' ? 'सर्वोच्च नेतृत्व क्षमता, आत्मविश्वास, मानसिक थकान से मुक्ति एवं सम्मान वृद्धि।' : 'Highest administrative authority, cures chronic fatigue, commands deep respect from adversaries.',
                  rulingNos: lang === 'hi' ? 'अंक १, ९' : 'Numbers 1, 9',
                  idealFor: lang === 'hi' ? 'उद्योगपति, राजनेता, सिविल सेवा अभ्यर्थी' : 'Industrialists, politicians, civil service aspirants'
                }
              ].map((rud, i) => (
                <div key={i} className="bg-[#fcfaf5] p-5 rounded-2xl border border-amber-200 flex flex-col justify-between">
                  <div>
                    <span className="text-amber-700 font-bold text-xs uppercase tracking-wider block mb-1">
                      {rud.rulingNos}
                    </span>
                    <h3 className="font-sacred font-bold text-stone-900 text-base mb-2">
                      {rud.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {rud.benefits}
                    </p>
                    <div className="text-[11px] text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>{lang === 'hi' ? 'अनुकूल:' : 'Best For:'}</strong> {rud.idealFor}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(`Certified Rudraksha Consultation: ${rud.title}`, '₹3,100')}
                    className="mt-4 w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 rounded-lg text-xs transition-colors"
                  >
                    {lang === 'hi' ? 'अनुकूलता एवं परामर्श' : 'Check Suitability & Price'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: COPPER VASTU PYRAMIDS & AURA DETOX */}
        {(activeCategory === 'all' || activeCategory === 'pyramids' || activeCategory === 'salt') && (
          <section className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-500/40">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {lang === 'hi' ? 'वास्तु शुद्धि एवं ऊर्जा रक्षा कवच' : 'Space Harmonization & Geopathic Shield'}
              </span>
              <h2 className="font-sacred text-2xl sm:text-3xl font-black text-white mt-1">
                {lang === 'hi' ? 'शुद्ध ताम्र वास्तु पिरामिड एवं आभामंडल लवण शुद्धि' : 'Pure Copper Vastu Pyramids & Aura Salt Detox'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'पिरामिड ज्यामिति स्वाभाविक रूप से एक जैव-सकारात्मक ऊर्जा क्षेत्र उत्पन्न करती है जो वास्तु दोष, विद्युत-चुंबकीय विकिरण (WiFi/मोबाइल) और पारिवारिक तनाव को शांत करती है। इसके साथ सिद्ध हिमालयन रॉक सॉल्ट का प्रयोग आपके घर व आभामंडल को पूर्णतः शुद्ध रखता है।'
                  : "Pyramidal geometry naturally generates a bio-positive ionic field that cancels geopathic stress, WiFi electromagnetic smog, and stubborn domestic tensions. Combined with Numerologist & Healer · Randhir Singh's energized Himalayan rock salt foot soaks, your home and personal aura stay completely unburdened."}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
                <button
                  onClick={() => onOpenBooking('Copper Vastu Pyramid Energy Audit', '₹5,100')}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  {lang === 'hi' ? 'सिद्ध ताम्र पिरामिड का निवेदन करें' : 'Order Energized Copper Pyramids'}
                </button>

                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-amber-100 font-bold px-6 py-3 rounded-xl text-xs border border-amber-400/40 transition-colors"
                >
                  {lang === 'hi' ? '← मुख्य पृष्ठ पर वापस जाएं' : '← Back to Main Home'}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
