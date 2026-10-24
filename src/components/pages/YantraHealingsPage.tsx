import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Heart,
  Activity,
  Zap,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Flame,
  Layers,
  Star,
  FileCheck2,
  Clock,
  MapPin,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { Language } from '../../types';

interface YantraHealingsPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToPage: (pageId: string) => void;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

interface HealingYantra {
  id: string;
  nameEn: string;
  nameHi: string;
  deity: string;
  healingDomain: string;
  healingDomainHi: string;
  geometryType: string;
  matrix?: number[][];
  matrixConstant?: number;
  mantra: string;
  mantraCount: string;
  frequencyHz: string;
  idealMaterial: string;
  placementDirection: string;
  symptomsAddressed: string[];
  ritualSteps: string[];
}

const HEALING_YANTRAS: HealingYantra[] = [
  {
    id: 'mahamrityunjaya',
    nameEn: 'Mahamrityunjaya Sanjeevani Yantra',
    nameHi: 'महामृत्युंजय संजीवनी यंत्र',
    deity: 'Lord Shiva (Mahadev)',
    healingDomain: 'Longevity, Severe Disease Protection & Vitality Recovery',
    healingDomainHi: 'दीर्घायु, असाध्य रोग रक्षा एवं प्राण ऊर्जा पुनरुत्थान',
    geometryType: '8-Petal Lotus with Sacred Concentric Triangle Complex',
    matrix: [
      [28, 21, 26],
      [23, 25, 27],
      [24, 29, 22]
    ],
    matrixConstant: 75,
    mantra: 'Om Hroum Joom Sah, Om Bhoor Bhuvah Svah, Om Tryambakam Yajaamahe Sugandhim Pushti-Vardhanam, Urvaarukam-Iva Bandhanaan Mrityor-Muksheeya Ma-Amritaat',
    mantraCount: '108 times daily facing North/East',
    frequencyHz: '136.1 Hz (Cosmic Om Frequency)',
    idealMaterial: 'Pure Copper Plate or Consecrated Bhojpatra with Ashtagandha Ink',
    placementDirection: 'North-East (Ishan Kona) or headside of healing room',
    symptomsAddressed: [
      'Chronic and unexplained physical fatigue',
      'Accident phobia and recurring minor health hazards',
      'Karmic planetary afflictions (Shani-Rahu-Ketu doshas)',
      'Aura leakage and susceptibility to psychic exhaustion'
    ],
    ritualSteps: [
      'Cleanse with pure Gangajal and raw cow milk on Monday morning.',
      'Anoint with fresh Chandan (sandalwood) paste at the central Bindu.',
      'Light a pure desi cow-ghee lamp facing North-East.',
      'Chant the Mahamrityunjaya Beej Mantra 108 times using Rudraksha mala.'
    ]
  },
  {
    id: 'dhanvantari',
    nameEn: 'Bhagwan Dhanvantari Arogya Yantra',
    nameHi: 'भगवान धन्वंतरि आरोग्य यंत्र',
    deity: 'Lord Dhanvantari (Celestial Physician of Ayurveda)',
    healingDomain: 'Cellular Regeneration, Medicine Potentiation & Digestive Agni',
    healingDomainHi: 'कोशिकीय स्वास्थ्य, औषधीय प्रभाव वृद्धि एवं जठराग्नि संतुलन',
    geometryType: 'Amrit Kalash Core with 12 Sun Rays & Hexagonal Shield',
    matrix: [
      [31, 24, 29],
      [26, 28, 30],
      [27, 32, 25]
    ],
    matrixConstant: 84,
    mantra: 'Om Namo Bhagavate Vasudevaya Dhanvantaraye Amrita-Kalasha Hastaya Sarvamaya Vinashanaya Trailokyanathaya Shri Mahavishnave Namah',
    mantraCount: '21 times morning before consuming first glass of water',
    frequencyHz: '528 Hz (Miracle Transformation & DNA Repair)',
    idealMaterial: 'Brass or Sterling Silver Plate',
    placementDirection: 'East or Kitchen / Wellness apothecary shelf',
    symptomsAddressed: [
      'Delayed recovery after medical treatments',
      'Digestive sluggishness, metabolic imbalances and toxic buildup',
      'Side-effects from heavy medicines and allergic sensitivities',
      'Support for physicians, healers, and practitioners'
    ],
    ritualSteps: [
      'Keep a copper glass of drinking water placed over the yantra overnight.',
      'Drink the consecrated energized water first thing in the morning.',
      'Offer yellow flowers and green tulsi leaves on Thursdays.',
      'Meditate on divine radiant golden-green light entering your crown chakra.'
    ]
  },
  {
    id: 'gayatri',
    nameEn: 'Veda Mata Gayatri Prana Yantra',
    nameHi: 'वेदमाता गायत्री प्राण यंत्र',
    deity: 'Goddess Gayatri / Savitur (Solar Divine Consciousness)',
    healingDomain: 'Mental Peace, Depressive Mood Cleansing & Pineal Activation',
    healingDomainHi: 'मानसिक शांति, अवसाद निवारण एवं आज्ञा चक्र जागरण',
    geometryType: '24-Syllable Petal Mandala with Solar Concentric Rays',
    mantra: 'Om Bhoor Bhuvah Svah, Tat-Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayaat',
    mantraCount: '24 or 108 times at Brahmamuhurta or Sunrise',
    frequencyHz: '432 Hz (Natural Harmonic Resonance)',
    idealMaterial: 'Panchdhatu (5 Sacred Metals) or Gold-Plated Copper',
    placementDirection: 'East wall where first morning sunrays touch',
    symptomsAddressed: [
      'Chronic overthinking, brain fog, and scattered focus',
      'Anxiety, sleeplessness, and psychic gloom',
      'Lack of spiritual purpose and intellectual blockages',
      'Children experiencing exam fear and memory retention weakness'
    ],
    ritualSteps: [
      'Perform Surya Arghya (water offering to the rising Sun) while visualizing the Yantra.',
      'Place the yantra at eye level in the puja room or study space.',
      'Perform 3 rounds of Anulom-Vilom pranayama facing the Yantra.',
      'Chant Gayatri Mantra with awareness focused on the third-eye chakra.'
    ]
  },
  {
    id: 'baglamukhi',
    nameEn: 'Maa Baglamukhi Shatru & Nazar Nivaran Yantra',
    nameHi: 'माँ बगलामुखी शत्रु एवं नजर निवारण यंत्र',
    deity: 'Maa Baglamukhi (Pitambara Mahavidya)',
    healingDomain: 'Psychic Armor, Evil Eye Neutralization & Paralysis of Negativity',
    healingDomainHi: 'दैवीय सुरक्षा कवच, बुरी नजर निवारण एवं नकारात्मकता का स्तम्भन',
    geometryType: 'Golden Triangular Stambhana Grid with Yellow Lotus Halo',
    matrix: [
      [35, 28, 33],
      [30, 32, 34],
      [31, 36, 29]
    ],
    matrixConstant: 96,
    mantra: 'Om Hleem Baglamukhi Sarva-Dushtanaam Vaacham Mukham Padam Stambhaya Jihvaam Keelaya Buddhim Naashaya Hleem Om Svaha',
    mantraCount: '36 or 108 times wearing yellow attire on Tuesday/Saturday',
    frequencyHz: '741 Hz (Awakening Intuition & Toxin Cleansing)',
    idealMaterial: 'Yellow Turmeric-Infused Bhojpatra or Polished Yellow Brass',
    placementDirection: 'South or South-West entrance facing outward',
    symptomsAddressed: [
      'Sudden unexplainable business or domestic disputes',
      'Heavy, suffocating atmosphere at home or commercial workplace',
      'Malicious jealousy, gossip, and unfair legal/bureaucratic traps',
      'Severe nazar (evil eye) causing continuous minor setbacks'
    ],
    ritualSteps: [
      'Wear clean yellow clothing during the consecration ritual.',
      'Apply Haldi (turmeric) paste and yellow mustard seeds to the corners.',
      'Light a sesame oil or mustard oil lamp at twilight.',
      'Consecrate with Randhir Singh’s specially blessed Baglamukhi kavach.'
    ]
  },
  {
    id: 'navagraha',
    nameEn: 'Sarva Navagraha Shanti Samputit Yantra',
    nameHi: 'सर्व नवग्रह शांति सम्पुटित यंत्र',
    deity: 'The 9 Cosmic Planetary Lords (Surya to Ketu)',
    healingDomain: 'Total Planetary Harmony, Karmic Balance & Dasha Relief',
    healingDomainHi: 'संपूर्ण नवग्रह शांति, प्रारब्ध कर्म संतुलन एवं दशा-महादशा दोष निवारण',
    geometryType: '9 Intersecting Sub-Matrices with Central Solar Sovereign Node',
    mantra: 'Om Brahma Murari Stripurantakari Bhanuh Shashi Bhumisuto Budhashcha, Gurushcha Shukrah Shani-Rahu-Ketavah Sarve Graha Shantikara Bhavantu',
    mantraCount: '9 times daily for universal balance',
    frequencyHz: 'All 9 Solfeggio Harmonic Scales',
    idealMaterial: 'Navaratna Embedded Copper or 9-Layered Hand-Etched Bhojpatra',
    placementDirection: 'Central Brahmasthan of home or North-East altar',
    symptomsAddressed: [
      'Planetary clashes where one area flourishes while another collapses',
      'Ongoing Sade Sati, Dhaiya, Rahu Mahadasha or Ketu transit phases',
      'Kundli Gandmool, Manglik, or Kaal Sarp doshas causing roadblocks',
      'General feeling of life being pulled in chaotic opposing directions'
    ],
    ritualSteps: [
      'Place in the center of the house (Brahmasthan) or main puja room.',
      'Offer 9 grains (Navadhanya) once a month during Amavasya or Purnima.',
      'Sprinkle holy water infused with Tulsi leaves every Sunday.',
      'Perform circumambulation (Pradakshina) 3 times with reverence.'
    ]
  },
  {
    id: 'saraswati',
    nameEn: 'Maa Saraswati Medha & Vak Yantra',
    nameHi: 'माँ सरस्वती मेधा एवं वाक् सिद्धि यंत्र',
    deity: 'Goddess Saraswati (Deity of Learning, Arts & Wisdom)',
    healingDomain: 'Speech Stammering, Memory Boost, Exam Success & Creative Flow',
    healingDomainHi: 'वाक् शुद्धि, स्मरण शक्ति संवर्धन, परीक्षा सफलता एवं कलात्मक सृजन',
    geometryType: 'Veena-Shaped Sacred Crescent with 8 Lotus Petals',
    mantra: 'Om Shreem Hreem Saraswatyai Namah · Om Aim Hreem Kleem Maha Saraswati Devyai Namah',
    mantraCount: '21 times before morning study or creative work',
    frequencyHz: '639 Hz (Harmonious Brainwave Coherence)',
    idealMaterial: 'Pure Silver Plate or White Chandan Inscribed Bhojpatra',
    placementDirection: 'North-East or directly above study desk / music altar',
    symptomsAddressed: [
      'Speech hesitation, stage fright, and lack of verbal clarity',
      'Difficulty in learning new skills, coding, or retaining complex data',
      'Creative artistic blocks in writing, music, architecture or public speaking',
      'Restless, hyperactive children struggling to focus during studies'
    ],
    ritualSteps: [
      'Place near books, laptop, or musical instrument.',
      'Offer white flowers and a drop of pure white honey on Wednesdays.',
      'Chant the Aim Beej Mantra while visualizing brilliant white moonbeams.',
      'Touch the yantra with right index finger before commencing exams or speeches.'
    ]
  }
];

export const YantraHealingsPage: React.FC<YantraHealingsPageProps> = ({
  lang,
  onNavigateHome,
  onNavigateToPage,
  onOpenBooking
}) => {
  const [selectedYantra, setSelectedYantra] = useState<HealingYantra>(HEALING_YANTRAS[0]);

  return (
    <div className="min-h-screen bg-[#faf6ee] text-stone-900 pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
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
              {lang === 'hi' ? 'यंत्र हीलिंग विज्ञान' : 'Yantra Healings Detailed Page'}
            </span>
          </div>

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-medium">
            <button
              onClick={() => onNavigateToPage('special-yantras')}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {lang === 'hi' ? 'विशेष यंत्र (व्यापार/नौकरी)' : 'Special Yantras (Business/Job)'}
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

      {/* Hero Banner with Sacred Geometry Visual */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f2e5] via-[#faf6ee] to-[#fbf8f0] py-12 sm:py-16 border-b border-amber-200/80">
        {/* Sacred Geometry Background Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 select-none overflow-hidden">
          <svg viewBox="0 0 800 800" className="w-full h-full animate-spin-slow">
            <circle cx="400" cy="400" r="360" fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="6,8" />
            <circle cx="400" cy="400" r="280" fill="none" stroke="#d97706" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="400"
                y1="60"
                x2="400"
                y2="120"
                stroke="#b45309"
                strokeWidth="2"
                transform={`rotate(${deg} 400 400)`}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-950 px-4 py-1.5 rounded-full border border-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'प्राचीन वैदिक ज्यामितीय चिकित्सा' : 'Ancient Vedic Geometric Energy Medicine'}</span>
            </div>

            <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
              {lang === 'hi' ? 'यंत्र हीलिंग विज्ञान एवं ऊर्जा उपचार' : 'Sacred Yantra Healings & Bio-Energetic Therapy'}
            </h1>

            <p className="font-sacred text-base sm:text-xl font-bold text-amber-900 mt-4 tracking-wide">
              {lang === 'hi'
                ? 'वैदिक ज्यामिति, बीज मंत्र एवं अष्टगंध भोजपत्र द्वारा शारीरिक, मानसिक एवं वास्तु ऊर्जा का कायाकल्प'
                : 'Restoring Physical Vitality, Cellular Resonance & Spatial Harmony via Consecrated Geometries'}
            </p>

            <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-4 max-w-3xl mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'यंत्र केवल धातु या कागज पर बना चित्र नहीं है; यह ब्रह्मांडीय ऊर्जा (Cosmic Prana) को आकर्षित करने वाला एक जीवित एंटीना है। मास्टर रणधीर सिंह (जयपुर) द्वारा सिद्ध एवं अभिमंत्रित यंत्र आपके औरा की विकृतियों को दूर कर आरोग्य, अभय एवं शांति प्रदान करते हैं।'
                : 'In Vedic cosmology, a Yantra is an electro-magnetic resonant blueprint that interfaces directly with human biophotons and cellular memory. Master Randhir Singh personalizes each healing yantra according to the client’s astrological vulnerabilities, bio-pulse, and radial meridian.'}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 max-w-md sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenBooking('Custom Consecrated Healing Yantra', '₹3,500')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{lang === 'hi' ? 'सिद्ध हीलिंग यंत्र अभिमंत्रित करवाएं' : 'Order Consecrated Healing Yantra'}</span>
              </button>

              <button
                onClick={() => onOpenBooking('Yantra Healing Consultation', '₹2,100')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-bold py-3 px-6 rounded-xl text-sm border-2 border-stone-300 hover:border-amber-400 shadow-2xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'रणधीर जी से परामर्श बुक करें' : 'Consult Master Randhir Singh'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Yantra Science */}
      <section className="py-12 border-b border-amber-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-sacred text-xl sm:text-3xl font-bold text-stone-900">
              {lang === 'hi' ? 'यंत्र हीलिंग कैसे कार्य करती है?' : 'How Yantra Energy Healing Works'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              The 4 Scientific &amp; Spiritual Mechanisms of Geometrical Healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: lang === 'hi' ? 'ज्यामितीय प्रतिध्वनि' : 'Geometric Resonance',
                desc: lang === 'hi'
                  ? 'यंत्र के कोण, वृत और त्रिकोण अवचेतन मस्तिष्क को शांत कर ब्रह्मरंध्र में सूक्ष्म ऊर्जा तरंगें उत्पन्न करते हैं।'
                  : 'Precise angles, interlocking triangles, and lotus petals emit coherent micro-frequency electromagnetic waves.',
                icon: Compass
              },
              {
                step: '02',
                title: lang === 'hi' ? 'बीज मंत्र स्पंदन' : 'Sonic Beej Vibration',
                desc: lang === 'hi'
                  ? 'यंत्र के साथ 108 बार उच्चारित बीज मंत्र व्यक्ति के 72,000 नाड़ियों के अवरोधों को खोलता है।'
                  : 'Specific primordial acoustic frequencies (432Hz/528Hz) shatter auric stagnations and cellular fatigue.',
                icon: Volume2
              },
              {
                step: '03',
                title: lang === 'hi' ? 'प्राण प्रतिष्ठा एवं शुद्धि' : 'Prana Pratishtha Consecration',
                desc: lang === 'hi'
                  ? 'अष्टगंध, गो-घृत, गंगाजल एवं वैदिक संपुटित आहुतियों द्वारा यंत्र में दिव्य चेतना स्थापित की जाती है।'
                  : 'Infusing inert metal or organic birch bark with living bio-energy through intense mantra sadhana.',
                icon: Flame
              },
              {
                step: '04',
                title: lang === 'hi' ? 'वास्तु एवं औरा कवच' : 'Spatial Aura Shielding',
                desc: lang === 'hi'
                  ? 'घर या कार्यस्थल की दिशाओं में स्थापित होकर यह नकारात्मक भू-गर्भीय व मानसिक तरंगों को सोख लेता है।'
                  : 'Neutralizes geopathic stress, psychic eye (nazar), and creates an unbroken 360-degree protective torus.',
                icon: Shield
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#faf7f0] rounded-2xl p-6 border border-amber-200/90 hover:border-amber-500 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-amber-800" />
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-800/60">{pillar.step}</span>
                  </div>
                  <h3 className="font-sacred font-bold text-stone-900 text-base mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Yantra Explorer Studio */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-md mb-2 inline-block border border-amber-300">
            {lang === 'hi' ? '6 प्रमुख वैदिक हीलिंग यंत्र' : 'The 6 Major Vedic Healing Yantras'}
          </span>
          <h2 className="font-sacred text-2xl sm:text-4xl font-black text-stone-900 mt-2">
            {lang === 'hi' ? 'अपने स्वास्थ्य व लक्ष्य के अनुकूल यंत्र चुनें' : 'Explore Each Healing Yantra in Depth'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Click on any healing yantra below to inspect its consecrated matrix, sound frequency, ideal metal, and application protocol.
          </p>
        </div>

        {/* 6 Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {HEALING_YANTRAS.map((yantra) => {
            const isSelected = selectedYantra.id === yantra.id;
            return (
              <button
                key={yantra.id}
                onClick={() => setSelectedYantra(yantra)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-500/50 scale-[1.02]'
                    : 'bg-white hover:bg-amber-50/70 border-stone-200 text-stone-800 shadow-2xs'
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                      isSelected ? 'text-amber-200' : 'text-amber-800'
                    }`}
                  >
                    {yantra.deity.split(' ')[0]}
                  </span>
                  <h4 className="font-sacred font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                    {lang === 'hi' ? yantra.nameHi : yantra.nameEn}
                  </h4>
                </div>
                <div
                  className={`mt-2 pt-2 border-t text-[10px] flex items-center justify-between font-mono ${
                    isSelected ? 'border-amber-800 text-amber-200' : 'border-stone-100 text-stone-500'
                  }`}
                >
                  <span>{yantra.frequencyHz.split(' ')[0]}</span>
                  <span>{isSelected ? (lang === 'hi' ? '● सक्रिय' : '● Active') : (lang === 'hi' ? 'चुनें →' : 'Select →')}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Yantra Deep Dive Showcase */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
          {/* Card Header Strip */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>{selectedYantra.deity}</span>
                  <span>·</span>
                  <span className="font-mono">{selectedYantra.frequencyHz}</span>
                </div>
                <h3 className="font-sacred text-2xl sm:text-3xl font-black text-white mt-1">
                  {lang === 'hi' ? selectedYantra.nameHi : selectedYantra.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-1 max-w-2xl">
                  {lang === 'hi' ? selectedYantra.healingDomainHi : selectedYantra.healingDomain}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onOpenBooking(`Consecrated ${selectedYantra.nameEn}`, '₹3,500')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'यह यंत्र मंगवाएं' : 'Order Energized Yantra'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Visual Sacred Matrix / Geometric Plate */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 via-[#faf6ee] to-amber-100/60 rounded-2xl border border-amber-300">
              <div className="text-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                  {lang === 'hi' ? 'सिद्ध पावन वैदिक स्वरूप' : 'Sacred Consecrated Representation'}
                </span>
                <span className="font-sacred text-xs text-stone-600">
                  {selectedYantra.geometryType}
                </span>
              </div>

              {/* 3x3 Magic Numerical Matrix if available, else sacred concentric diagram */}
              {selectedYantra.matrix ? (
                <div className="w-full max-w-xs">
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-gradient-to-br from-amber-900 to-stone-950 rounded-2xl border-2 border-amber-400 shadow-xl">
                    {selectedYantra.matrix.map((row, rIdx) =>
                      row.map((val, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className="aspect-square bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white rounded-xl flex flex-col items-center justify-center font-mono font-black text-xl sm:text-2xl border border-amber-400/60 shadow-md group hover:scale-105 transition-transform"
                        >
                          <span>{val}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-3 text-center text-xs font-mono font-bold text-amber-900">
                    {lang === 'hi' ? 'पंक्ति, स्तंभ व विकर्ण योग = ' : 'Row, Column & Diagonal Sum = '}<span className="text-amber-800 text-sm font-black">{selectedYantra.matrixConstant}</span>
                  </div>
                </div>
              ) : (
                /* Concentric Geometric Sacred Star Vector for non-matrix yantras */
                <div className="w-64 h-64 relative flex items-center justify-center bg-radial from-amber-200/50 to-transparent rounded-full p-4 border border-amber-300/60">
                  <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="4,4" />
                    <circle cx="100" cy="100" r="75" fill="none" stroke="#d97706" strokeWidth="1.5" />
                    <polygon points="100,20 170,140 30,140" fill="none" stroke="#b45309" strokeWidth="2" />
                    <polygon points="100,180 30,60 170,60" fill="none" stroke="#d97706" strokeWidth="2" />
                    <circle cx="100" cy="100" r="25" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-sacred text-2xl font-bold text-amber-950">
                    ॐ
                  </div>
                </div>
              )}

              {/* Consecration Metadata Pills */}
              <div className="w-full mt-6 pt-4 border-t border-amber-200/80 space-y-2 text-xs text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-500">{lang === 'hi' ? 'उत्तम धातु / माध्यम:' : 'Ideal Metal/Medium:'}</span>
                  <span className="font-bold text-stone-900 text-right">{selectedYantra.idealMaterial}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-500">{lang === 'hi' ? 'वास्तु स्थापना दिशा:' : 'Vastu Placement:'}</span>
                  <span className="font-bold text-amber-900">{selectedYantra.placementDirection}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-500">{lang === 'hi' ? 'जप संख्या व नियम:' : 'Chanting Rhythm:'}</span>
                  <span className="font-bold text-stone-900">{selectedYantra.mantraCount}</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Healing Breakdown & Protocol */}
            <div className="lg:col-span-7 space-y-5">
              {/* Mantra Audio/Visual Box */}
              <div className="bg-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-700/80">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    {lang === 'hi' ? 'सिद्ध प्राण-प्रतिष्ठा बीज मंत्र' : 'Sacred Consecrated Activation Mantra'}
                  </span>
                  <span className="text-[10px] font-mono bg-amber-900 px-2 py-0.5 rounded">
                    Freq: {selectedYantra.frequencyHz}
                  </span>
                </div>
                <p className="font-serif italic text-sm sm:text-base leading-relaxed text-amber-100 tracking-wide">
                  "{selectedYantra.mantra}"
                </p>
                <div className="mt-3 pt-3 border-t border-amber-800/80 flex items-center justify-between text-[11px] text-amber-300">
                  <span>{lang === 'hi' ? 'रुद्राक्ष अथवा स्फटिक माला से प्रतिदिन जप करें' : 'Recite daily with Rudraksha / Sphatik Mala'}</span>
                  <span>{lang === 'hi' ? 'प्रतिदिन १०८ जप अनुशंसित' : '108 Repetitions Recommended'}</span>
                </div>
              </div>

              {/* Symptoms & Conditions Addressed */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-600" />
                  <span>{lang === 'hi' ? 'शारीरिक, मानसिक व ऊर्जा अवरोधों का निवारण:' : 'Target Symptoms & Energetic Blockages Addressed:'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {selectedYantra.symptomsAddressed.map((sym, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ritual & Consecration Protocol */}
              <div className="bg-[#fcfaf5] p-5 rounded-2xl border border-amber-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'hi' ? '४-चरणीय प्राण-प्रतिष्ठा एवं दैनिक साधना विधान:' : '4-Step Energization & Daily Maintenance Protocol:'}</span>
                </h4>
                <ol className="space-y-2 text-xs text-stone-700">
                  {selectedYantra.ritualSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Consultation Callout */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-amber-950 block font-sacred text-sm">
                    {lang === 'hi' ? 'विशेष अष्टगंध भोजपत्र निर्माण' : 'Hand-Etched Bhojpatra with Ashtagandha'}
                  </strong>
                  <span className="text-stone-600">
                    {lang === 'hi' ? 'आपकी जन्म तिथि, मूलांक-भाग्यांक एवं नक्षत्र के अनुकूल विशेष रूप से सिद्ध।' : 'Consecrated specifically under your birth star (Nakshatra) and Driver-Conductor numbers.'}
                  </span>
                </div>
                <button
                  onClick={() => onOpenBooking(`Handcrafted Bhojpatra ${selectedYantra.nameEn}`, '₹5,100')}
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2 rounded-lg text-xs shrink-0 transition-colors"
                >
                  {lang === 'hi' ? 'रणधीर जी से परामर्श लें' : 'Consult Master Randhir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Consecration Authenticity FAQ */}
      <section className="py-12 bg-white border-t border-amber-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-sacred text-2xl font-bold text-stone-900">
              {lang === 'hi' ? 'यंत्र सामग्री एवं प्रामाणिकता निर्देश' : 'Materials, Consecration & Authenticity'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {lang === 'hi'
                ? 'यंत्र स्थापित करने अथवा मंगवाने से पूर्व महत्वपूर्ण वैदिक मार्गदर्शन'
                : 'Important insights before purchasing or placing any sacred yantra'}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700">
            <div className="p-4 bg-[#faf7f0] rounded-xl border border-amber-200">
              <strong className="text-amber-950 block mb-1 font-sacred">
                {lang === 'hi'
                  ? '१. मास्टर रणधीर सिंह जी द्वारा सिद्ध यंत्र बाज़ारू यंत्रों से भिन्न क्यों हैं?'
                  : "1. What makes Master Randhir Singh's Yantras different from market items?"}
              </strong>
              <p className="text-stone-600 leading-relaxed">
                {lang === 'hi'
                  ? 'बाज़ार में मिलने वाले यंत्र मशीनों द्वारा छापे जाते हैं, जिनमें न तो उचित ऊर्जा होती है और न ही अंकों का सही संतुलन। मास्टर रणधीर सिंह प्रत्येक अंक-यंत्र के गणितीय योग की गहन जाँच करते हैं, उन्हें अनार की कलम व अष्टगंध से असली भोजपत्र पर अथवा शुद्ध तांबे की प्लेट पर वैदिक संपुटित मंत्रों से प्राण-प्रतिष्ठित करते हैं।'
                  : 'Market machine-stamped plates are often mathematically flawed and mechanically cold. Master Randhir Singh inspects every matrix cell for mathematical sums, hand-etches them on authentic Himalayan Bhojpatra using Pomegranate stylus (Anar ki Kalam) and Ashtagandha ink, or uses heavy unadulterated copper sheets energized through 1,100 Vedic samputit mantras.'}
              </p>
            </div>

            <div className="p-4 bg-[#faf7f0] rounded-xl border border-amber-200">
              <strong className="text-amber-950 block mb-1 font-sacred">
                {lang === 'hi'
                  ? '२. क्या एक साथ एक से अधिक हीलिंग यंत्र स्थापित किए जा सकते हैं?'
                  : '2. Can I place multiple healing yantras together?'}
              </strong>
              <p className="text-stone-600 leading-relaxed">
                {lang === 'hi'
                  ? 'हाँ, बशर्ते उनकी दिशा और तत्वों में टकराव न हो। उदाहरण के लिए, सूर्य व गायत्री यंत्र पूर्व दिशा (अग्नि/प्रकाश) में स्थापित होते हैं, जबकि कुबेर व महामृत्युंजय यंत्र उत्तर या उत्तर-पूर्व (ईशान कोण) में। व्यक्तिगत परामर्श के दौरान रणधीर जी आपके घर या कार्यालय के अनुसार सही दिशा बताते हैं।'
                  : 'Yes, provided their elemental orientations do not conflict. For example, Surya and Gayatri align with the East (Solar Agni), while Kuber and Mahamrityunjaya align with the North / North-East (Kubera & Shiva dik). During your personalized consultation, Master Randhir Singh provides an exact Vastu blueprint for your residence or office.'}
              </p>
            </div>

            <div className="p-4 bg-[#faf7f0] rounded-xl border border-amber-200">
              <strong className="text-amber-950 block mb-1 font-sacred">
                {lang === 'hi'
                  ? '३. यदि कुछ दिनों तक मंत्र जप छूट जाए तो क्या करना चाहिए?'
                  : '3. What if I miss chanting for a few days?'}
              </strong>
              <p className="text-stone-600 leading-relaxed">
                {lang === 'hi'
                  ? 'विधिपूर्वक प्राण-प्रतिष्ठित यंत्र का ऊर्जा क्षेत्र दीर्घकाल तक सक्रिय रहता है। यदि दैनिक जप में अंतराल आ जाए, तो सोमवार अथवा गुरुवार की प्रातः धूप-दीप (देसी घी) दिखाकर क्षमा प्रार्थना करें और पुनः नियमित साधना प्रारंभ करें।'
                  : 'A properly consecrated yantra holds an enduring electro-magnetic charge for up to 3 years. If you miss daily japa, gently re-consecrate by showing incense (Dhoop) and a desi ghee lamp on any Monday or Thursday morning to reactivate the latent field.'}
              </p>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="mt-10 text-center">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 hover:text-amber-950 border border-amber-300 hover:border-amber-500 bg-amber-50 hover:bg-amber-100 px-6 py-3 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएँ' : 'Back to Main Home'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
