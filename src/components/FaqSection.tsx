import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface FaqItem {
  id: string;
  category: 'booking' | 'numerology' | 'watch' | 'salt_crystal' | 'ethics';
  categoryLabel: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  // Clarifications & Core Questions
  {
    id: 'c1',
    category: 'booking',
    categoryLabel: 'Online Consultations',
    questionEn: 'How do online consultations with Numerologist & Healer · Randhir Singh work?',
    questionHi: 'रणधीर सिंह जी के साथ ऑनलाइन कंसल्टेशन कैसे होता है?',
    answerEn: 'All sessions are conducted seamlessly via Google Meet, Zoom, or WhatsApp video call. You receive an instant confirmation and preparation guide once booked. Distance does not reduce the accuracy or benefits of spiritual and numerology guidance.',
    answerHi: 'सभी सेशन गूगल मीट, ज़ूम या व्हाट्सएप वीडियो कॉल पर आसानी से होते हैं। बुकिंग के तुरंत बाद आपको समय और जरूरी जानकारी मिल जाती है। दूरी से आपके मार्गदर्शन या उपायों पर कोई फर्क नहीं पड़ता।'
  },
  {
    id: 'c2',
    category: 'numerology',
    categoryLabel: 'Vedic Numerology',
    questionEn: 'What details are needed for a Vedic Numerology reading?',
    questionHi: 'अंक ज्योतिष (न्यूमेरोलॉजी) के लिए क्या-क्या जानकारी चाहिए?',
    answerEn: 'Only your exact Date of Birth (Day, Month, Year) and the spelling of your full name. Unlike astrology, exact birth time is not required, making numerological readings accessible and accurate for everyone.',
    answerHi: 'सिर्फ आपकी सही जन्मतिथि (दिन, महीना, साल) और आपके नाम की सही स्पेलिंग। ज्योतिष की तरह इसमें जन्म के सही समय की जरूरत नहीं होती, इसलिए यह सबके लिए आसान और सटीक है।'
  },
  {
    id: 'c3',
    category: 'ethics',
    categoryLabel: 'Intuitive Tarot',
    questionEn: 'What is the difference between Tarot and Fortune Telling?',
    questionHi: 'टैरो कार्ड रीडिंग और भविष्य बताने में क्या फर्क है?',
    answerEn: 'Fortune telling claims everything is rigidly fixed, whereas intuitive Tarot is a mirror reflecting your energy patterns and choices, empowering you to shape your future with clarity.',
    answerHi: 'भविष्य बताना यह कहता है कि सब कुछ पहले से तय है, जबकि टैरो कार्ड आपके मन, ऊर्जा और सही फैसले लेने का रास्ता दिखाते हैं ताकि आप अपना भविष्य खुद बेहतर बना सकें।'
  },
  {
    id: 'c4',
    category: 'salt_crystal',
    categoryLabel: 'Distance Healing',
    questionEn: 'Can Energy Healing work remotely?',
    questionHi: 'क्या दूर बैठे भी एनर्जी हीलिंग काम करती है?',
    answerEn: 'Yes, completely. In Pranic energy healing, life prana transcends physical distance. Remote sessions balance your chakras and calm your anxiety without needing to be physically present.',
    answerHi: 'हाँ, बिल्कुल। प्राणिक ऊर्जा और हीलिंग में दूरी कोई रुकावट नहीं होती। डिस्टेंस हीलिंग से आपके चक्रों का संतुलन और मन को गहरी शांति आसानी से मिलती है।'
  },

  // Booking & Process
  {
    id: 'b1',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'How does the consultation session work, and can I consult from outside Jaipur / internationally?',
    questionHi: 'कंसल्टेशन सेशन कैसे होता है? क्या मैं जयपुर से बाहर या विदेश से भी बात कर सकता हूँ?',
    answerEn: 'Yes, absolutely. We serve clients across Jaipur, all states of India, and internationally (USA, UK, Canada, UAE, Australia, etc.). Consultations are held either in-person at our Jaipur Clinic (H.No. 45, Mahadev Nagar, Jagatpura, PIN- 302017) or via 1-on-1 WhatsApp video/audio call. Both formats offer the exact same personalized analysis, live chart calculation, and remedy guidance.',
    answerHi: 'हाँ, बिल्कुल। हमारे क्लाइंट्स जयपुर, पूरे भारत और विदेशों (अमेरिका, यूके, कनाडा, दुबई आदि) से जुड़े हैं। आप जयपुर क्लिनिक (जगतपुरा) में आकर मिल सकते हैं या व्हाट्सएप वीडियो कॉल पर घर बैठे पूरी बात कर सकते हैं। दोनों में एक जैसी पूरी जांच और उपाय बताए जाते हैं।'
  },
  {
    id: 'b2',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'How do I claim one of the 5 FREE Sunday Consultation slots?',
    questionHi: 'रविवार को मिलने वाले 5 फ्री स्लॉट कैसे बुक करें?',
    answerEn: 'Every Sunday, Numerologist & Healer · Randhir Singh offers the first 5 consultations 100% FREE for 20 minutes. Slots are allocated on a first-come, first-served basis upon advance appointment. Simply click "Claim Free Sunday Slot" on this website or message on WhatsApp at +91-9509593150 with your Name and Date of Birth to secure your slot.',
    answerHi: 'हर रविवार रणधीर सिंह जी पहले 5 लोगों को 20 मिनट का कंसल्टेशन फ्री में देते हैं। यह पहले आओ-पहले पाओ के आधार पर होता है। आप वेबसाइट पर "फ्री स्लॉट बुक करें" बटन दबाकर या व्हाट्सएप (+91-9509593150) पर अपना नाम और जन्मतिथि भेजकर बुक कर सकते हैं।'
  },
  {
    id: 'b3',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'What is the payment procedure and how do I verify my booking?',
    questionHi: 'पेमेंट कैसे करें और बुकिंग कैसे पक्की (कन्फर्म) होगी?',
    answerEn: 'You can transfer the applicable consultation fee directly via UPI (PhonePe, Google Pay, Paytm, BHIM) to our official number +91-9509593150 (Account Name: RANDHIR SINGH). Once transferred, please take a screenshot of the payment receipt and share it via WhatsApp (+91-9509593150) along with your Full Name and Date of Birth. Our team will promptly confirm your locked appointment timing.',
    answerHi: 'आप तय फीस हमारे ऑफिशियल यूपीआई नंबर +91-9509593150 (नाम: RANDHIR SINGH) पर PhonePe, Google Pay या Paytm से भेज सकते हैं। इसके बाद पेमेंट का स्क्रीनशॉट अपने नाम और जन्मतिथि के साथ व्हाट्सएप पर भेज दें। हमारी टीम तुरंत आपका समय कन्फर्म कर देगी।'
  },

  // Numerology & Lo-Shu
  {
    id: 'n1',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'Do I need my exact birth time for Numerology or only the Date of Birth?',
    questionHi: 'क्या अंक ज्योतिष के लिए जन्म का सही समय भी चाहिए?',
    answerEn: 'Vedic and Lo-Shu Numerology primarily requires your exact Date of Birth (Day, Month, and Year). An exact birth time is not mandatory for calculating your Mulank (Driver), Bhagyank (Conductor), Kua Number, or the 3x3 Magic Grid.',
    answerHi: 'नहीं, सिर्फ आपकी जन्मतिथि (दिन, महीना, साल) ही काफी है। मूलांक, भाग्यांक और लो-शू ग्रिड निकालने के लिए जन्म के समय की जरूरत नहीं होती।'
  },
  {
    id: 'n2',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'What happens if I have multiple missing numbers in my Lo-Shu Grid?',
    questionHi: 'अगर मेरी जन्मतिथि में कुछ नंबर मिसिंग (गायब) हों, तो क्या परेशानी होगी?',
    answerEn: 'Almost every person has 2 to 4 missing numbers in their birth chart. Missing numbers do not mean misfortune; they merely indicate areas that benefit from simple remedies—such as a suitable Therapy Watch, crystals, specific colors, and salt therapy to bring energetic balance.',
    answerHi: 'लगभग हर इंसान की जन्मतिथि में 2 से 4 नंबर नहीं होते। इसका मतलब कोई बुरा भाग्य नहीं है। इसका सिर्फ यह मतलब है कि उन नंबरों की कमी को आसान उपायों, जैसे थेरेपी वॉच (सही घड़ी), क्रिस्टल, सही रंग और सॉल्ट थेरेपी से पूरा किया जा सकता है।'
  },
  {
    id: 'n3',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'Does a Chaldean Name Correction require legally changing my name on government IDs and passports?',
    questionHi: 'क्या नाम की स्पेलिंग बदलने के लिए आधार कार्ड या पासपोर्ट में भी बदलाव करना पड़ेगा?',
    answerEn: 'No! You do NOT need to change your official passport, Aadhaar, or bank documents. You only need to use the corrected spelling in your daily signature, social media profiles, email sign-offs, and an affirmation notebook for 21 to 45 days to align your subconscious mind with the positive frequency.',
    answerHi: 'बिल्कुल नहीं! आपको किसी सरकारी दस्तावेज या पासपोर्ट में नाम बदलने की जरूरत नहीं है। सुधरे हुए नाम का इस्तेमाल बस अपने रोज के सिग्नेचर, सोशल मीडिया, विजिटिंग कार्ड और डायरी में 21 से 45 दिन तक करना होता है।'
  },

  // Watch Analysis & Therapeutic Watch Consultation
  {
    id: 'w1',
    category: 'watch',
    categoryLabel: 'Watch Analysis & Guidance',
    questionEn: 'How does a wristwatch influence my subconscious mind, career, and finances?',
    questionHi: 'हाथ की घड़ी मेरे काम, करियर और पैसों को कैसे प्रभावित करती है?',
    answerEn: 'Your watch rests directly over the wrist pulse points and radial artery. The dial shape (round, square), dial color, and metal send continuous signals to your subconscious mind, influencing decision-making, focus, and financial punctuality.',
    answerHi: 'आपकी घड़ी कलाई की नाड़ी पर बंधी होती है, जो दिल और दिमाग से जुड़ी है। घड़ी का डायल (गोल या चौकोर), उसका रंग और धातु हर पल दिमाग को ऊर्जा देते हैं, जिससे समय पर सही फैसले लेने और तरक्की में मदद मिलती है।'
  },
  {
    id: 'w2',
    category: 'watch',
    categoryLabel: 'Watch Analysis & Guidance',
    questionEn: 'Can I keep wearing my existing watch, or do I necessarily need a new Therapy Watch?',
    questionHi: 'क्या मुझे अपनी पुरानी घड़ी बदलनी पड़ेगी या नई थेरेपी वॉच लेनी होगी?',
    answerEn: 'During a Watch Analysis session, Randhir Singh Ji first checks your current watches. If your existing watch is already suitable, he simply recommends minor adjustments (like wearing it on the other hand or changing the strap). A new Therapy Watch is only suggested if your existing watch stops frequently or clashes with your birth numbers.',
    answerHi: 'पहले आपकी पुरानी घड़ी की जांच की जाती है। अगर वह आपके लिए ठीक है, तो सिर्फ हाथ बदलने (दाएं से बाएं) या स्ट्रैप बदलने की सरल सलाह दी जाती है। नई घड़ी तभी सुझाई जाती है जब पुरानी घड़ी बार-बार रुकती हो या आपके अंकों के बिल्कुल विपरीत हो।'
  },

  // Salt & Crystal Therapy
  {
    id: 's1',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'How does Negativity Removal & Salt Therapy work and can I do it at home?',
    questionHi: 'सॉल्ट थेरेपी (नमक के उपाय) कैसे काम करती है और क्या इसे घर पर कर सकते हैं?',
    answerEn: 'Himalayan Rock Salt (Sendha Namak) and sea salt naturally absorb negative energies, heavy stress, and evil eye (nazar). Yes, simple DIY rituals like rock salt foot soaks and doorway salt bowls are easy, safe, and can be done at home.',
    answerHi: 'सेंधा नमक और समुद्री नमक घर और शरीर की सारी नकारात्मक ऊर्जा (नेगेटिव वाइब्स व नजर दोष) को सोख लेते हैं। गुनगुने पानी में नमक डालकर पैर धोना या मुख्य दरवाजे पर नमक रखना बहुत आसान है और आप इसे खुद घर पर कर सकते हैं।'
  },
  {
    id: 's2',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'Why is salt mopping strictly avoided on Thursdays?',
    questionHi: 'गुरुवार को नमक का पोछा क्यों नहीं लगाना चाहिए?',
    answerEn: 'Thursday is ruled by Jupiter (Brihaspati), the planet of wisdom and family prosperity. Salt has an absorbent energy associated with Rahu, so using salt on Thursdays can symbolically diminish the positive blessings of Jupiter. Tuesday and Saturday are the best days for salt mopping.',
    answerHi: 'गुरुवार देवगुरु बृहस्पति का दिन है, जो सुख-समृद्धि और ज्ञान के स्वामी हैं। नमक का संबंध राहु से माना जाता है, इसलिए गुरुवार को नमक का पोछा नहीं लगाया जाता। इसके लिए मंगलवार और शनिवार का दिन सबसे अच्छा होता है।'
  },
  {
    id: 's3',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'How do I know which crystal is right for my profession (e.g. Pyrite vs Citrine vs Amethyst)?',
    questionHi: 'मुझे कैसे पता चलेगा कि मेरे काम या बिजनेस के लिए कौन सा क्रिस्टल सही है?',
    answerEn: 'Each crystal has a specific natural frequency. Pyrite and Citrine attract money and clients for businessmen; Green Aventurine helps job growth and interviews; Amethyst calms anxiety and stress; and Black Tourmaline protects against negativity. Randhir Singh Ji selects the right crystal matching your date of birth.',
    answerHi: 'हर क्रिस्टल का अलग असर होता है। जैसे बिजनेस और धन के लिए पायराइट और सिट्रीन बहुत अच्छे हैं; नौकरी में तरक्की के लिए ग्रीन एवेंच्यूरिन; और मन की शांति व तनाव दूर करने के लिए एमेथिस्ट। रणधीर सिंह जी आपकी जन्मतिथि देखकर सही क्रिस्टल बताते हैं।'
  },

  // Ethics & Trust
  {
    id: 'e1',
    category: 'ethics',
    categoryLabel: 'Confidentiality & Ethics',
    questionEn: 'Is my personal information and consultation completely confidential?',
    questionHi: 'क्या मेरी निजी बातें और जानकारी पूरी तरह से प्राइवेट (गोपनीय) रहेंगी?',
    answerEn: 'Yes, 100%. Your date of birth, family matters, and discussions are kept strictly private and never shared with anyone.',
    answerHi: 'हाँ, 100% प्राइवेट। आपकी जन्मतिथि, परिवार की बातें और समस्याएं पूरी तरह गुप्त रखी जाती हैं और कभी किसी तीसरे व्यक्ति से साझा नहीं की जाती हैं।'
  },
  {
    id: 'e2',
    category: 'ethics',
    categoryLabel: 'Confidentiality & Ethics',
    questionEn: 'Do your healing sessions substitute for medical, psychiatric, or legal counsel?',
    questionHi: 'क्या यह आध्यात्मिक सलाह डॉक्टर या कानूनी सलाह का विकल्प है?',
    answerEn: 'No. Our numerology, watch guidance, and energy healing sessions are designed for personal clarity, self-growth, and peace of mind. They do not replace certified medical treatments, psychiatric therapy, or legal counsel.',
    answerHi: 'नहीं। यह सलाह मन की शांति, आत्म-विश्वास और जीवन को सही दिशा देने के लिए है। यह किसी मेडिकल डॉक्टर, इलाज या कानूनी वकील का विकल्प नहीं है।'
  }
];

interface FaqSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    b1: true,
    b2: true,
    n1: false,
    w1: false
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.questionEn.toLowerCase().includes(q) ||
        item.questionHi.toLowerCase().includes(q) ||
        item.answerEn.toLowerCase().includes(q) ||
        item.answerHi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section id="faq-section" className="py-12 sm:py-16 bg-[#fcfaf5] border-b border-amber-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'सवाल और जवाब' : 'Clarifications & Questions'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQ)' : 'FREQUENTLY ASKED QUESTIONS'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi' ? 'परामर्श, प्राइवेसी और बुकिंग से जुड़ी सभी जरूरी बातें' : 'Everything you need to know about scheduling, confidentiality, and what to expect.'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'अपॉइंटमेंट कैसे बुक करें, जन्मतिथि का विश्लेषण, हाथ की घड़ी (वॉच थेरेपी) और नमक के उपायों से जुड़े आपके सभी सवालों के आसान जवाब।'
              : 'Clear answers on how online and in-person sessions work, details required, tarot reflections, and remote energy healing.'}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: lang === 'hi' ? 'सभी सवाल' : 'All FAQs' },
              { id: 'booking', label: lang === 'hi' ? 'बुकिंग व रविवार फ्री स्लॉट' : 'Booking & Sunday Free' },
              { id: 'numerology', label: lang === 'hi' ? 'अंक ज्योतिष व जन्मतिथि' : 'Numerology & DOB' },
              { id: 'watch', label: lang === 'hi' ? 'हाथ की घड़ी (वॉच थेरेपी)' : 'Watch Analysis & Guidance' },
              { id: 'salt_crystal', label: lang === 'hi' ? 'सॉल्ट थेरेपी व क्रिस्टल' : 'Salt & Crystals' },
              { id: 'ethics', label: lang === 'hi' ? 'प्राइवेसी और विश्वास' : 'Trust & Ethics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-amber-900 text-white shadow-2xs ring-1 ring-amber-700'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'सवाल खोजें...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-stone-200 text-stone-500 text-xs">
              {lang === 'hi' ? 'कोई सवाल नहीं मिला। कृपया दूसरा शब्द खोजें या हमें व्हाट्सएप पर पूछें।' : 'No matching questions found. Please try another search term or ask us directly on WhatsApp.'}
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-amber-800 font-sacred text-base font-bold shrink-0 mt-0.5">
                        Q.
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1 inline-block">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="font-sacred text-sm sm:text-base font-bold text-stone-900 leading-snug">
                          {lang === 'hi' ? faq.questionHi : faq.questionEn}
                        </h3>
                      </div>
                    </div>

                    <div className="p-1 rounded-md text-stone-400 hover:text-stone-700 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-amber-700" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#fdfbf7]">
                      <div className="flex items-start gap-2 pt-2">
                        <span className="text-emerald-700 font-bold shrink-0">Ans:</span>
                        <p>{lang === 'hi' ? faq.answerHi : faq.answerEn}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-400/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'सीधी सहायता' : 'Direct Personal Support'}
            </span>
            <h3 className="font-sacred text-lg sm:text-2xl font-bold text-white">
              {lang === 'hi' ? 'क्या आपका कोई और सवाल है?' : 'Still have questions or special requirements?'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl leading-relaxed">
              {lang === 'hi' ? 'हमारी टीम से सीधे व्हाट्सएप पर बात करें। हम आपके हर सवाल का जवाब देने के लिए तैयार हैं।' : 'Connect directly with our team. We are happy to clarify any questions prior to booking.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/919509593150?text=Namaste%20Randhir%20Ji%2C%20I%20have%20a%20question%20regarding%20Numerology%20consultation%20and%20healing."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें (+91-9509593150)' : 'Chat on WhatsApp (+91-9509593150)'}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
