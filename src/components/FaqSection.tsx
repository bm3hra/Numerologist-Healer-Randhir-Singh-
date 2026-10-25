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
    questionHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह के साथ ऑनलाइन परामर्श कैसे आयोजित होते हैं?',
    answerEn: 'All sessions are conducted seamlessly via high-definition Google Meet, Zoom, or WhatsApp video call. You receive an instant confirmation and preparation guide once booked. Distance does not diminish the accuracy or potency of spiritual and numerological consultations.',
    answerHi: 'सभी सत्र हाई-डेफिनिशन गूगल मीट, ज़ूम या व्हाट्सएप वीडियो कॉल द्वारा आयोजित होते हैं। बुकिंग के तुरंत बाद पुष्टि और तैयारी निर्देश प्राप्त होते हैं। दूरी आध्यात्मिक एवं अंक ज्योतिषीय परामर्श की प्रभावशीलता को कम नहीं करती।'
  },
  {
    id: 'c2',
    category: 'numerology',
    categoryLabel: 'Vedic Numerology',
    questionEn: 'What details are needed for a Vedic Numerology reading?',
    questionHi: 'वैदिक अंक ज्योतिष परामर्श के लिए किन जानकारियों की आवश्यकता होती है?',
    answerEn: 'Only your exact Date of Birth (Day, Month, Year) and the official spelling of your full name. Unlike astrology, exact birth time is not required, making numerological readings accessible and accurate for everyone.',
    answerHi: 'केवल आपकी सटीक जन्म तिथि (दिन, माह, वर्ष) और आपके पूरे नाम की वर्तनी। ज्योतिष के विपरीत, अंक गणना हेतु जन्म समय अनिवार्य नहीं है।'
  },
  {
    id: 'c3',
    category: 'ethics',
    categoryLabel: 'Intuitive Tarot',
    questionEn: 'What is the difference between Tarot and Fortune Telling?',
    questionHi: 'टैरो कार्ड रीडिंग और भविष्य कथन (Fortune Telling) में क्या अंतर है?',
    answerEn: 'Fortune telling implies rigid fatalism, whereas intuitive Tarot is a sacred mirror reflecting subconscious patterns, energetic crossroads, and empowered choices to help you shape your destiny with conscious clarity.',
    answerHi: 'भविष्य कथन एक पूर्वनिर्धारित भाग्य का दावा करता है, जबकि अंतर्ज्ञानी टैरो आपके अवचेतन मन और ऊर्जावान चौराहों का पावन दर्पण है, जो आपको सचेत निर्णयों से अपना भविष्य संवारने में समर्थ बनाता है।'
  },
  {
    id: 'c4',
    category: 'salt_crystal',
    categoryLabel: 'Distance Healing',
    questionEn: 'Can Energy Healing work remotely?',
    questionHi: 'क्या ऊर्जा उपचार (Energy Healing) दूर बैठकर भी प्रभावी रूप से कार्य कर सकता है?',
    answerEn: 'Yes, completely. In quantum and Pranic energy sciences, subtle consciousness and life prana transcend physical space. Remote sessions channel focused intentional frequency and chakra rebalancing without physical touch.',
    answerHi: 'हाँ, शत-प्रतिशत। क्वांटम और प्राणिक ऊर्जा विज्ञान में प्राण और चेतना भौतिक दूरी से परे कार्य करते हैं। दूरस्थ सत्रों द्वारा चक्र संतुलन और मानसिक शांति समान प्रभाव से प्राप्त होती है।'
  },

  // Booking & Process
  {
    id: 'b1',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'How does the consultation session work, and can I consult from outside Jaipur / internationally?',
    questionHi: 'परामर्श सत्र कैसे आयोजित होता है और क्या मैं जयपुर से बाहर या विदेश से भी परामर्श ले सकता हूँ?',
    answerEn: 'Yes, absolutely. We serve clients across Jaipur, all states of India, and internationally (USA, UK, Canada, UAE, Australia, etc.). Consultations are held either in-person at our Jaipur Spiritual Clinic (H.No. 45, Mahadev Nagar, Jagatpura, PIN- 302017) or via high-definition 1-on-1 WhatsApp video/audio call. Both formats offer the exact same personalized analysis, live chart calculation, and remedy guidance.',
    answerHi: 'हाँ, बिल्कुल। हम जयपुर, पूरे भारत एवं विदेशों (अमेरिका, ब्रिटेन, कनाडा, यूएई, ऑस्ट्रेलिया आदि) के साधकों को परामर्श प्रदान करते हैं। आप हमारे जयपुर केंद्र (जगतपुरा) में प्रत्यक्ष आ सकते हैं अथवा 1-ऑन-1 व्हाट्सएप वीडियो/ऑडियो कॉल द्वारा घर बैठे संपूर्ण परामर्श प्राप्त कर सकते हैं।'
  },
  {
    id: 'b2',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'How do I claim one of the 5 FREE Sunday Consultation slots?',
    questionHi: 'रविवार के 5 निःशुल्क परामर्श स्लॉट में से एक कैसे प्राप्त करें?',
    answerEn: 'Every Sunday, Numerologist & Healer · Randhir Singh offers the first 5 consultations 100% FREE for 20 minutes as a sacred service. Slots are granted strictly on a first-come, first-served basis upon prior appointment. Simply click "Claim Free Sunday Slot" on this website or message on WhatsApp at +91-9509593150 with your Name and Date of Birth to secure an available time slot for the upcoming Sunday.',
    answerHi: 'प्रत्येक रविवार प्रथम 5 परामर्श (20 मिनट) पूर्णतः निःशुल्क दिए जाते हैं। यह स्लॉट पूर्व अपॉइंटमेंट के आधार पर पहले आओ-पहले पाओ के नियम पर मिलते हैं। वेबसाइट पर "फ्री संडे स्लॉट" बटन दबाकर या व्हाट्सएप (+91-9509593150) पर अपना नाम व जन्म तिथि भेजकर अपनी सीट आरक्षित कर सकते हैं।'
  },
  {
    id: 'b3',
    category: 'booking',
    categoryLabel: 'Booking & Consultations',
    questionEn: 'What is the payment procedure and how do I verify my booking?',
    questionHi: 'भुगतान की प्रक्रिया क्या है और बुकिंग की पुष्टि कैसे होती है?',
    answerEn: 'You can transfer the applicable consultation fee directly via UPI (PhonePe, Google Pay, Paytm, BHIM) to our official number +91-9509593150 (Account Name: RANDHIR SINGH). Once transferred, please take a screenshot of the payment receipt and share it via WhatsApp (+91-9509593150) along with your Full Name and Date of Birth. Our team will promptly confirm your locked appointment timing.',
    answerHi: 'आप हमारे आधिकारिक यूपीआई नंबर +91-9509593150 (खाताधारक: रणधीर सिंह) पर PhonePe, Google Pay, Paytm या BHIM द्वारा सीधे शुल्क भेज सकते हैं। इसके बाद रसीद का स्क्रीनशॉट अपने नाम और जन्म तिथि के साथ व्हाट्सएप पर साझा करें। हमारी टीम तुरंत आपका स्लॉट कन्फर्म कर देगी।'
  },

  // Numerology & Lo-Shu
  {
    id: 'n1',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'Do I need my exact birth time for Numerology or only the Date of Birth?',
    questionHi: 'क्या अंक ज्योतिष के लिए जन्म समय आवश्यक है या केवल जन्म तिथि?',
    answerEn: 'Vedic and Lo-Shu Numerology primarily requires your exact Date of Birth (Day, Month, and Year). An exact birth time is not mandatory for calculating your Mulank (Driver), Bhagyank (Conductor), Kua Number, or the 3x3 Magic Grid. If you do know your birth time, it can provide subtle additional insights into your planetary hora.',
    answerHi: 'वैदिक एवं लो-शू अंक ज्योतिष में केवल जन्म तिथि (दिन, माह, वर्ष) ही पर्याप्त होती है। मूलांक, भाग्यांक, कुआ अंक और 3x3 ग्रिड हेतु जन्म समय अनिवार्य नहीं है। यदि समय ज्ञात हो, तो होरा विश्लेषण में सहायक होता है।'
  },
  {
    id: 'n2',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'What happens if I have multiple missing numbers in my Lo-Shu Grid?',
    questionHi: 'यदि मेरे लो-शू ग्रिड में कई अंक गायब (Missing) हैं तो क्या होगा?',
    answerEn: 'Almost every human birth chart has 2 to 4 missing numbers. Missing numbers do not mean misfortune; they merely indicate life lessons or elemental vibrations that need external supplementation. Randhir Singh Ji specializes in practical, non-invasive remedies—such as Therapy Watches, consecrated crystal combinations, specific colors, and salt rituals—that replenish the energetic balance without disruption.',
    answerHi: 'लगभग हर व्यक्ति की जन्म तिथि में 2 से 4 अंक लुप्त होते हैं। इसका अर्थ दुर्भाग्य नहीं, बल्कि यह है कि उन विशिष्ट तत्वों की ऊर्जा को बाहरी उपायों (जैसे थेरेपी घड़ी, क्रिस्टल, विशेष रंग व सॉल्ट थेरेपी) द्वारा संतुलित करने की आवश्यकता है।'
  },
  {
    id: 'n3',
    category: 'numerology',
    categoryLabel: 'Numerology & Lo-Shu Grid',
    questionEn: 'Does a Chaldean Name Correction require legally changing my name on government IDs and passports?',
    questionHi: 'क्या नाम सुधार (Chaldean Correction) के लिए पासपोर्ट या सरकारी दस्तावेजों में कानूनी बदलाव जरूरी है?',
    answerEn: 'No! You do NOT need to change your official passport, Aadhaar, or bank documents. In vibrational numerology, energy responds to conscious daily repetition. You only need to use the corrected spelling in your daily signature, social media profiles, email sign-offs, business cards, and on a dedicated affirmation notebook for 21 to 45 days to align your subconscious field with the higher frequency.',
    answerHi: 'बिल्कुल नहीं! आपको सरकारी दस्तावेजों या पासपोर्ट में कानूनी बदलाव की आवश्यकता नहीं है। सुधरे हुए नाम का उपयोग केवल दैनिक हस्ताक्षर, सोशल मीडिया, विजिटिंग कार्ड और अभ्यास डायरी में 21 से 45 दिन करने से ही अवचेतन मन उस सकारात्मक आवृत्ति को ग्रहण कर लेता है।'
  },

  // Watch Analysis & Therapeutic Watch Consultation
  {
    id: 'w1',
    category: 'watch',
    categoryLabel: 'Watch Analysis & Therapeutic Watch Consultation',
    questionEn: 'How does a wristwatch influence my subconscious mind, career, and finances?',
    questionHi: 'कलाई घड़ी मेरे अवचेतन मन, करियर और धन प्रवाह को कैसे प्रभावित करती है?',
    answerEn: 'Your watch rests directly over the radial artery and wrist pulse points—the primary physiological and energetic pathway communicating continuous rhythmic micro-vibrations to the heart meridian and nervous system. The dial geometry (round, square, octagonal), metallic conductive properties, dial color frequency, and ticking tempo subtly imprint your subconscious perception of deadlines, opportunities, and financial punctuality 24 hours a day.',
    answerHi: 'आपकी घड़ी सीधे रेडियल नाड़ी (Radial Artery) पर बंधी होती है, जो हृदय और तंत्रिका तंत्र से जुड़ी है। घड़ी का आकार (गोल, चौकोर, अष्टकोणीय), रंग और धातु हर पल आपके मस्तिष्क को संकेत भेजते हैं, जिससे समयबद्धता, निर्णय क्षमता और धन का प्रवाह निर्धारित होता है।'
  },
  {
    id: 'w2',
    category: 'watch',
    categoryLabel: 'Watch Analysis & Therapeutic Watch Consultation',
    questionEn: 'Can I keep wearing my existing watch, or do I necessarily need a new Therapy Watch?',
    questionHi: 'क्या मैं अपनी पुरानी घड़ी पहन सकता हूँ या नई थेरेपी वॉच लेना जरूरी है?',
    answerEn: 'During a Watch Analysis session, Randhir Singh Ji first audits your existing watches. If your current watch’s shape, color, and metal already align with your birth grid and goals, he will simply advise minor adjustments (such as switching the wrist from left to right, replacing a worn leather strap with a metallic mesh, or activating it during an auspicious planetary Hora). A new Therapy Watch is only prescribed if your existing watch exhibits severe negative energetic friction or stops intermittently.',
    answerHi: 'परामर्श में पहले आपकी मौजूदा घड़ियों का विश्लेषण किया जाता है। यदि वे आपके अनुकूल हैं, तो केवल कलाई बदलने (दाएं से बाएं) या पट्टा बदलने जैसे सामान्य सुझाव दिए जाते हैं। नई थेरेपी वॉच की सलाह तभी दी जाती है जब पुरानी घड़ी में भारी दोष या बार-बार रुकने की समस्या हो।'
  },

  // Salt & Crystal Therapy
  {
    id: 's1',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'How does Negativity Removal & Salt Therapy work and can I do it at home?',
    questionHi: 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी) कैसे कार्य करती है और क्या इसे घर पर किया जा सकता है?',
    answerEn: 'Unprocessed Himalayan Rock Salt (Sendha Namak) and sea salt have been revered in Vedic Vastu and esoteric healing as unmatched bio-energetic absorbers of heavy atmospheric static, astral fatigue, and envy (Nazar). Yes, our DIY home rituals—such as the Himalayan Rock Salt Foot Soak and Doorway Threshold Bowls—are simple, safe, and can be done at home. For stubborn chronic disputes or heavy emotional fatigue, Numerologist & Healer · Randhir Singh also prepares specially consecrated herbal salt blends.',
    answerHi: 'सेंधा नमक और समुद्री नमक नकारात्मक ऊर्जा और नजर दोष को सोखने का सबसे प्राकृतिक माध्यम हैं। हमारे बताए गए रॉक सॉल्ट फुट सोक और चौखट शुद्धिकरण को आप आसानी से घर पर कर सकते हैं। अधिक पुरानी परेशानियों के लिए विशेष रूप से अभिमंत्रित लवण मिश्रण भी उपलब्ध कराया जाता है।'
  },
  {
    id: 's2',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'Why is salt mopping strictly avoided on Thursdays?',
    questionHi: 'गुरुवार को नमक का पोछा लगाना क्यों वर्जित माना जाता है?',
    answerEn: 'In traditional Vedic Vastu and astrological wisdom, Thursday is ruled by Devaguru Brihaspati (Jupiter), the planet of spiritual elevation, family wisdom, and golden prosperity. Salt represents Rahu/Ketu absorbent oceanic energy, and using it on Thursday can symbolically dissipate the benevolent blessings of Jupiter in household spaces. Tuesday and Saturday are the ideal days for salt purification.',
    answerHi: 'गुरुवार देवगुरु बृहस्पति का दिन है, जो ज्ञान, समृद्धि और परिवार के कारक हैं। नमक का संबंध राहु-केतु से माना जाता है, इसलिए गुरुवार को नमक का पोछा लगाने से गुरु का शुभ प्रभाव कम हो सकता है। यह विधान मंगलवार या शनिवार को करना सर्वोत्तम है।'
  },
  {
    id: 's3',
    category: 'salt_crystal',
    categoryLabel: 'Salt Therapy & Crystals',
    questionEn: 'How do I know which crystal is right for my profession (e.g. Pyrite vs Citrine vs Amethyst)?',
    questionHi: 'मुझे कैसे पता चलेगा कि मेरे पेशे के लिए कौन सा क्रिस्टल सही है?',
    answerEn: 'Crystals hold crystalline geometric frequencies that vibrate in resonance with specific occupational goals. For example, Pyrite & Citrine are master wealth magnets ideal for businessmen, traders, and real estate developers; Green Aventurine is favored for career interviewees and corporate promotions; Amethyst is ideal for doctors, healers, and stressed executives; while Black Tourmaline shields high-exposure professionals from psychic fatigue and digital EMF. Randhir Singh Ji provides precise matching based on your birth numbers.',
    answerHi: 'प्रत्येक क्रिस्टल की अपनी ऊर्जा होती है। जैसे व्यापारियों के लिए पाइराइट व सिट्रीन धन और ग्राहक वृद्धि के लिए श्रेष्ठ हैं; नौकरीपेशा लोगों के लिए ग्रीन एवेंट्यूरिन; डॉक्टरों व तनावग्रस्त व्यक्तियों के लिए अमेथिस्ट (कटैला); तथा नकारात्मकता से रक्षा हेतु ब्लैक टूमलाइन उत्तम है। परामर्श में आपकी जन्म तिथि अनुसार सटीक मिलान किया जाता है।'
  },

  // Ethics & Trust
  {
    id: 'e1',
    category: 'ethics',
    categoryLabel: 'Confidentiality & Ethics',
    questionEn: 'Is my personal information and consultation completely confidential?',
    questionHi: 'क्या मेरी व्यक्तिगत जानकारी और परामर्श पूर्णतः गोपनीय रहेगा?',
    answerEn: 'Yes, 100%. We adhere to strict sacred confidentiality. Your date of birth, personal questions, relationship queries, business deliberations, and session discussions are never shared, published, or stored on public servers. Your sacred space is honored with complete dignity and trust.',
    answerHi: 'जी हाँ, शत-प्रतिशत। आपकी जन्म तिथि, पारिवारिक या व्यावसायिक बातचीत और परामर्श से जुड़ी प्रत्येक जानकारी पूर्णतः गोपनीय रखी जाती है। इसे किसी तीसरे पक्ष से कभी साझा नहीं किया जाता।'
  },
  {
    id: 'e2',
    category: 'ethics',
    categoryLabel: 'Confidentiality & Ethics',
    questionEn: 'Do your healing sessions substitute for medical, psychiatric, or legal counsel?',
    questionHi: 'क्या ये आध्यात्मिक परामर्श चिकित्सीय या कानूनी सलाह का विकल्प हैं?',
    answerEn: 'No. As clearly stated in our ethical disclaimer, our numerology calculations, watch analyses, salt cleansings, and energy healing sessions are designed purely for personal reflection, spiritual insight, and conscious self-development. They do not substitute for licensed medical diagnosis, psychiatric therapy, financial auditing, or legal representation.',
    answerHi: 'नहीं। जैसा कि हमारी आचार संहिता में स्पष्ट है, ये सत्र व्यक्तिगत आत्म-विकास, मानसिक शांति और आध्यात्मिक मार्गदर्शन के लिए हैं। यह किसी योग्य चिकित्सक, मनोचिकित्सक या कानूनी सलाहकार के परामर्श का विकल्प नहीं हैं।'
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
            <span>Clarifications &amp; Questions</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Everything you need to know about scheduling, confidentiality, and what to expect.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'अपॉइंटमेंट शेड्यूलिंग, गोपनीयता, सत्र की कार्यप्रणाली एवं उपचार से संबंधित आपके सभी सामान्य प्रश्नों के स्पष्ट और प्रामाणिक उत्तर।'
              : 'Clear answers on how online and in-person sessions work, details required, tarot reflections, and remote energy healing.'}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'booking', label: 'Booking & Sunday Free' },
              { id: 'numerology', label: 'Numerology & DOB' },
              { id: 'watch', label: 'Watch Analysis & Consultation' },
              { id: 'salt_crystal', label: 'Salt & Crystals' },
              { id: 'ethics', label: 'Trust & Ethics' }
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
              placeholder="Search questions..."
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
              No matching questions found. Please try another search term or ask us directly on WhatsApp.
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
              Direct Personal Support
            </span>
            <h3 className="font-sacred text-lg sm:text-2xl font-bold text-white">
              Still have questions or special requirements?
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl leading-relaxed">
              Connect directly with our team. We are happy to clarify any questions prior to booking.
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
              <span>Chat on WhatsApp (+91-9509593150)</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
