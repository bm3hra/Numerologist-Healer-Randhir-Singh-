import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  Sparkles,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  Sun,
  Shield,
  Layers,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { calculateNumerologyProfile, PLANETARY_ARCHETYPES } from '../../data/numerologyData';
import { Language } from '../../types';

interface DobYantrasPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToPage: (pageId: string) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

// Numerical Magic Square Matrices based on Ruling Planet / Driver Number (1 to 9)
const PLANETARY_DOB_MATRICES: Record<number, {
  planet: string;
  magicSum: number;
  matrix: number[][];
  deity: string;
  metal: string;
  mantra: string;
  bestDay: string;
  direction: string;
  gemstone: string;
  purpose: string;
}> = {
  1: {
    planet: 'Surya (Sun) - King of Solar Will',
    magicSum: 15,
    matrix: [
      [6, 1, 8],
      [7, 5, 3],
      [2, 9, 4]
    ],
    deity: 'Surya Bhagwan & Lord Rama',
    metal: 'Pure Copper or Consecrated Bhojpatra with Rakt Chandan',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    bestDay: 'Sunday morning at sunrise',
    direction: 'East',
    gemstone: 'Ruby (Manikya) or Red Garnet',
    purpose: 'Commands respect, leadership charisma, administrative dominance, vital energy, and paternal blessings.'
  },
  2: {
    planet: 'Chandra (Moon) - Queen of Subconscious Mind',
    magicSum: 18,
    matrix: [
      [7, 2, 9],
      [8, 6, 4],
      [3, 10, 5]
    ],
    deity: 'Lord Shiva & Goddess Parvati',
    metal: 'Pure Sterling Silver or White Chandan Inscribed Bhojpatra',
    mantra: 'Om Shram Shreem Shroum Sah Chandraya Namah',
    bestDay: 'Monday evening during Moonrise',
    direction: 'North-West (Vayavya Kona)',
    gemstone: 'Natural Pearl (Moti) or Moonstone',
    purpose: 'Stabilizes emotional fluctuations, heals insomnia, deepens psychic intuition, and attracts graceful public appeal.'
  },
  3: {
    planet: 'Brihaspati (Jupiter) - Guru of Wisdom & Wealth',
    magicSum: 27,
    matrix: [
      [10, 5, 12],
      [11, 9, 7],
      [6, 13, 8]
    ],
    deity: 'Lord Vishnu, Brihaspati & Dattatreya',
    metal: 'Yellow Brass, 24K Gold-Foil or Haldi-Kesar Bhojpatra',
    mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    bestDay: 'Thursday morning before 9:00 AM',
    direction: 'North-East (Ishan Kona)',
    gemstone: 'Yellow Sapphire (Pukhraj) or Citrine',
    purpose: 'Expands intellectual brilliance, brings matrimonial harmony, ensures child happiness, and attracts high financial wealth.'
  },
  4: {
    planet: 'Rahu (North Lunar Node) - Master of Quantum Strategy',
    magicSum: 36,
    matrix: [
      [13, 8, 15],
      [14, 12, 10],
      [9, 16, 11]
    ],
    deity: 'Lord Bhairava & Goddess Saraswati',
    metal: 'Ashtadhatu (8 Sacred Metals) or Ashtagandha Bhojpatra',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    bestDay: 'Saturday twilight after sunset',
    direction: 'South-West (Nairritya Kona)',
    gemstone: 'Hessonite Garnet (Gomedh)',
    purpose: 'Protects against unexpected betrayal, turns sudden crises into massive windfalls, and grants mastery in technology and politics.'
  },
  5: {
    planet: 'Budha (Mercury) - Prince of Commerce & Speech',
    magicSum: 24,
    matrix: [
      [9, 4, 11],
      [10, 8, 6],
      [5, 12, 7]
    ],
    deity: 'Lord Ganesha & Lord Budh',
    metal: 'Bronze, Green-Ink Inscribed Bhojpatra or Polished Brass',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namah',
    bestDay: 'Wednesday morning facing North',
    direction: 'North (Kubera Dik)',
    gemstone: 'Emerald (Panna) or Green Tourmaline',
    purpose: 'Unlocks persuasive eloquence, retail business trading growth, sharp calculation, and nervous system tranquility.'
  },
  6: {
    planet: 'Shukra (Venus) - Preceptor of Luxury & Beauty',
    magicSum: 30,
    matrix: [
      [11, 6, 13],
      [12, 10, 8],
      [7, 14, 9]
    ],
    deity: 'Goddess Mahalakshmi & Shukracharya',
    metal: 'Pure Silver, White Sandalwood or Rose-Infused Bhojpatra',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
    bestDay: 'Friday morning during Venus Hora',
    direction: 'South-East (Agni Kona)',
    gemstone: 'Diamond, White Zircon or Opal',
    purpose: 'Attracts vehicular opulence, artistic fame, refined romantic union, exquisite personal charm, and lavish home comfort.'
  },
  7: {
    planet: 'Ketu (South Lunar Node) - Moksha & Spiritual Mastery',
    magicSum: 39,
    matrix: [
      [14, 9, 16],
      [15, 13, 11],
      [10, 17, 12]
    ],
    deity: 'Lord Ganesha & Lord Matsya Avatar',
    metal: 'Pure Copper or Consecrated Bhojpatra with Kasturi',
    mantra: 'Om Sram Sreem Sroum Sah Ketave Namah',
    bestDay: 'Tuesday or Thursday twilight',
    direction: 'North-East or Center of meditation altar',
    gemstone: 'Cat’s Eye (Lehsuniya)',
    purpose: 'Awakens occult knowledge, cures mysterious psychosomatic ailments, eliminates enemies invisibly, and grants spiritual enlightenment.'
  },
  8: {
    planet: 'Shani (Saturn) - Lord of Karma & Enduring Legacy',
    magicSum: 33,
    matrix: [
      [12, 7, 14],
      [13, 11, 9],
      [8, 15, 10]
    ],
    deity: 'Lord Shani Dev & Lord Hanuman',
    metal: 'Pure Iron, Heavy Darkened Brass or Consecrated Bhojpatra',
    mantra: 'Om Sham Shanaishcharaya Namah',
    bestDay: 'Saturday evening after sunset',
    direction: 'West (Varuna Dik)',
    gemstone: 'Blue Sapphire (Neelam) or Amethyst',
    purpose: 'Pacifies Sade Sati & Dhaiya, builds enduring industrial empire, grants real estate dominance, and provides judicial victory.'
  },
  9: {
    planet: 'Mangala (Mars) - Commander of Courage & Real Estate',
    magicSum: 21,
    matrix: [
      [8, 3, 10],
      [9, 7, 5],
      [4, 11, 6]
    ],
    deity: 'Lord Hanuman & Kartikeya (Murugan)',
    metal: 'Pure Red Copper Plate or Consecrated Bhojpatra with Sindoor',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    bestDay: 'Tuesday morning at sunrise',
    direction: 'South (Yama Dik)',
    gemstone: 'Red Coral (Moonga)',
    purpose: 'Bestows heroic courage, land and building acquisitions, swift victory over legal challenges, and resolves Manglik dosha.'
  }
};

export const DobYantrasPage: React.FC<DobYantrasPageProps> = ({
  lang,
  onNavigateHome,
  onNavigateToPage,
  onOpenBooking
}) => {
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(8);
  const [year, setYear] = useState<number>(1995);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [fullName, setFullName] = useState<string>('Randhir Singh');

  const [profile, setProfile] = useState(() =>
    calculateNumerologyProfile(day, month, year, gender)
  );

  const handleRecalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProfile(calculateNumerologyProfile(day, month, year, gender));
  };

  const driverNumber = profile.driverNumber;
  const conductorNumber = profile.conductorNumber;
  const yantraData = PLANETARY_DOB_MATRICES[driverNumber] || PLANETARY_DOB_MATRICES[1];
  const conductorData = PLANETARY_DOB_MATRICES[conductorNumber] || PLANETARY_DOB_MATRICES[1];

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
              {lang === 'hi' ? 'जन्मतिथि अनुसार यंत्र' : 'Yantras as per Date of Birth'}
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
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'व्यक्तिगत जन्मतिथि आधारित यंत्र विधान' : 'Personalized DOB Yantra Calculation'}</span>
          </div>

          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
            {lang === 'hi' ? 'अपनी जन्मतिथि अनुसार सिद्ध यंत्र जानें' : 'Yantras as per Your Date of Birth'}
          </h1>

          <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-4 tracking-wide">
            {lang === 'hi'
              ? 'मूलांक (Driver) एवं भाग्यांक (Conductor) द्वारा अपने व्यक्तिगत कॉस्मिक मैजिक स्क्वायर यंत्र की गणना करें'
              : 'Calculate Your Custom Planetary Magic Matrix Based on Your Driver & Conductor Frequencies'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'प्रत्येक व्यक्ति का जन्म किसी विशेष ग्रहीय कंपन के तहत होता है। अपनी जन्मतिथि दर्ज करें और जानिए कि कौन सा संख्यात्मक जादुई यंत्र, कौन सा बीज मंत्र और कौन सी धातु आपके जीवन में धन, स्वास्थ्य एवं सफलता का स्थायी द्वार खोल सकती है।'
              : 'Every soul incarnates under a precise numerical planetary rhythm. Enter your birth details below to calculate your personal 3x3 Magic Square Yantra, customized consecration medium, and energization ritual.'}
          </p>
        </div>
      </section>

      {/* Interactive Calculation Studio */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DOB Input Form Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Step 1: Enter Birth Information
              </span>
              <h2 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                Enter Your Date of Birth (अपनी जन्म तिथि दर्ज करें)
              </h2>
            </div>
            <div className="text-xs text-stone-500 font-mono">
              Live Vedic Numerology Algorithm
            </div>
          </div>

          <form onSubmit={handleRecalculate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Full Name (पूरा नाम)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#fcfaf5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Birth Day (दिन: 1-31)
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#fcfaf5]"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Birth Month (माह: 1-12)
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#fcfaf5]"
              >
                {[
                  'January (01)', 'February (02)', 'March (03)', 'April (04)',
                  'May (05)', 'June (06)', 'July (07)', 'August (08)',
                  'September (09)', 'October (10)', 'November (11)', 'December (12)'
                ].map((m, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Birth Year (वर्ष)
              </label>
              <input
                type="number"
                min="1920"
                max="2035"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#fcfaf5]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-amber-300" />
                <span>Calculate Yantra</span>
              </button>
            </div>
          </form>
        </div>

        {/* Calculated Results & Personal Yantra Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Numerology Identifiers */}
          <div className="lg:col-span-5 space-y-5">
            {/* 3 Metric Pills */}
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-4">
                Personal Planetary Coordinates for {fullName}:
              </span>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-300">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block">मूलांक (Driver)</span>
                  <span className="text-3xl font-black font-sacred text-amber-900 my-1 block">
                    {profile.driverNumber}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 truncate block">
                    {yantraData.planet.split(' ')[0]}
                  </span>
                </div>

                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-300">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block">भाग्यांक (Destiny)</span>
                  <span className="text-3xl font-black font-sacred text-amber-900 my-1 block">
                    {profile.conductorNumber}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 truncate block">
                    {conductorData.planet.split(' ')[0]}
                  </span>
                </div>

                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-300">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block">कुआं अंक (Kua)</span>
                  <span className="text-3xl font-black font-sacred text-amber-900 my-1 block">
                    {profile.kuaNumber}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 truncate block">
                    Vastu Direction
                  </span>
                </div>
              </div>
            </div>

            {/* Custom 3x3 Magic Matrix Visual */}
            <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-3xl p-6 border border-amber-500/40 shadow-xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Your Primary Driver Yantra (Matrix {yantraData.magicSum})
              </span>
              <h3 className="font-sacred text-xl font-bold text-white mb-4">
                {yantraData.planet}
              </h3>

              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto p-4 bg-black/40 rounded-2xl border border-amber-400/60 shadow-inner">
                {yantraData.matrix.map((row, rIdx) =>
                  row.map((val, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="aspect-square bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white rounded-xl flex items-center justify-center font-mono font-black text-2xl border border-amber-400 shadow-md group hover:scale-105 transition-transform"
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 text-xs font-mono text-amber-300 flex items-center justify-between px-2">
                <span>Row Constant: {yantraData.magicSum}</span>
                <span>Diagonal Constant: {yantraData.magicSum}</span>
              </div>
            </div>

            {/* Missing Numbers in Your Lo-Shu Grid */}
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-2">
                Missing Numbers Requiring Yantric Activation:
              </span>
              <p className="text-xs text-stone-600 mb-3">
                Your birth date lacks numbers: <strong>[{profile.missingNumbers.join(', ')}]</strong>. Master Randhir Singh consecrates specific yantras to fill these psychological energy gaps.
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.missingNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 font-black font-mono flex items-center justify-center border border-stone-300 text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Full Prescription & Consecration Protocol */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-amber-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Personalized Yantra Prescription
              </span>
              <h3 className="font-sacred text-2xl font-bold text-stone-900 mt-1">
                Customized Remedial Blueprint for {fullName}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Based on Driver {driverNumber} ({yantraData.planet.split(' ')[0]}) &amp; Conductor {conductorNumber} ({conductorData.planet.split(' ')[0]})
              </p>
            </div>

            {/* Core Purpose */}
            <div className="bg-[#fcfaf5] p-4 rounded-2xl border border-amber-200">
              <strong className="text-amber-950 block text-xs uppercase tracking-wider mb-1 font-bold">
                Why this Yantra is Essential for You:
              </strong>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {yantraData.purpose}
              </p>
            </div>

            {/* Mantra Box */}
            <div className="bg-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                Your Personal Daily Beej Mantra:
              </span>
              <p className="font-serif italic text-base text-amber-100 mb-2">
                "{yantraData.mantra}"
              </p>
              <span className="text-xs text-amber-300 block">
                Recite 108 times daily facing {yantraData.direction}.
              </span>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Recommended Metal/Medium:</strong>
                <span>{yantraData.metal}</span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Auspicious Consecration Day:</strong>
                <span>{yantraData.bestDay}</span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Vastu Placement Direction:</strong>
                <span className="text-amber-900 font-bold">{yantraData.direction}</span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Synergistic Gemstone / Crystal:</strong>
                <span>{yantraData.gemstone}</span>
              </div>
            </div>

            {/* Consecration Order CTA */}
            <div className="p-5 bg-gradient-to-r from-amber-100/70 to-orange-100/70 rounded-2xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-sacred font-bold text-amber-950 text-base">
                  {lang === 'hi' ? 'हस्तनिर्मित अष्टगंध भोजपत्र यंत्र तैयार करवाएं' : 'Order Hand-Etched Bhojpatra Yantra'}
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-md">
                  Inscribed by Master Randhir Singh during your auspicious Nakshatra hora with consecrated mantras and delivered with framing.
                </p>
              </div>

              <button
                onClick={() =>
                  onOpenBooking(
                    `Personalized DOB Yantra (Driver ${driverNumber}, Conductor ${conductorNumber})`,
                    '₹3,500'
                  )
                }
                className="inline-flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <FileCheck2 className="w-4 h-4 text-amber-300" />
                <span>Order My Personal Yantra</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
