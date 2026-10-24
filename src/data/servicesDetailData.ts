export interface ServiceDetailItem {
  id: number;
  slug: string;
  badge: string;
  titleEn: string;
  titleHi: string;
  category: 'numerology' | 'watch' | 'salt' | 'crystal' | 'yantra' | 'healing';
  taglineEn: string;
  taglineHi: string;
  shortDesc: string;
  fullDescEn: string;
  fullDescHi: string;
  sciencePrinciples: {
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
  }[];
  deliverables: {
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
  }[];
  benefits: {
    titleEn: string;
    titleHi: string;
    icon: string;
  }[];
  whoNeedsThis: {
    en: string;
    hi: string;
  }[];
  faqs: {
    qEn: string;
    qHi: string;
    aEn: string;
    aHi: string;
  }[];
  suggestedTariff: string;
  iconName: string;
}

export const SERVICES_DETAIL_DATA: Record<number, ServiceDetailItem> = {
  1: {
    id: 1,
    slug: 'service-1',
    badge: 'Popular',
    titleEn: 'Numerology Consultation',
    titleHi: 'अंक ज्योतिष परामर्श (न्यूमेरोलॉजी)',
    category: 'numerology',
    iconName: 'Sparkles',
    suggestedTariff: '₹5,100',
    taglineEn: 'Complete blueprint of your life’s core numbers, karmic patterns, and upcoming golden periods.',
    taglineHi: 'मूलांक, भाग्यांक, कुआ नंबर एवं जीवन के स्वर्णिम काल का प्रामाणिक वैदिक अंक ज्योतिषीय विश्लेषण।',
    shortDesc: 'Complete blueprint of your life’s core numbers, karmic patterns, and upcoming golden periods.',
    fullDescEn: 'A personalized one-on-one consultation with Master Randhir Singh decoding your complete numerical matrix: Driver (Mulank), Conductor (Bhagyank), Name Vibration (Namank), and Kua Number. This comprehensive reading maps out your life purpose, hidden talents, karmic debt numbers, personal year transitions, and optimal timing for major life decisions like marriage, investments, and career shifts.',
    fullDescHi: 'मास्टर रणधीर सिंह जी के साथ व्यक्तिगत एक-पर-एक परामर्श, जिसमें आपके मूलांक, भाग्यांक, नामांक एवं कुआ नंबर का गूढ़ अध्ययन किया जाता है। यह परामर्श आपके जीवन के उद्देश्य, अंतर्निहित प्रतिभाओं, कार्मिक ऋणों, महादशा-अंतर्दशा तथा विवाह, व्यापार एवं निवेश हेतु अत्यंत शुभ समयावधि का अचूक मार्गदर्शन प्रदान करता है।',
    sciencePrinciples: [
      {
        titleEn: 'Driver (Mulank) & Conductor (Bhagyank) Synergy',
        titleHi: 'मूलांक एवं भाग्यांक का तात्विक संतुलन',
        descEn: 'Your birth date reflects your raw soul frequency (Mulank), while the full sum of Day + Month + Year reveals your life destiny path (Bhagyank). When these two numbers clash, friction ensues.',
        descHi: 'जन्म तिथि आपकी आत्मा की मूल प्रकृति (मूलांक) दर्शाती है, जबकि पूर्ण योग जीवन के अंतिम गंतव्य (भाग्यांक) का बोध कराता है। इनका संतुलित होना परम आवश्यक है।'
      },
      {
        titleEn: '9-Year Cyclic Energy Periods',
        titleHi: '9-वर्षीय व्यक्तिगत चक्र (Personal Year)',
        descEn: 'Life moves in sacred 9-year mathematical waves. Knowing your active Personal Year dictates whether you should plant new seeds, consolidate wealth, or withdraw from risky speculations.',
        descHi: 'प्रकृति 9 वर्षों के गणितीय चक्र में कार्य करती है। वर्तमान व्यक्तिगत वर्ष (Personal Year) के ज्ञान से आप जान सकते हैं कि कब नया व्यापार शुरू करें और कब धैर्य रखें।'
      },
      {
        titleEn: 'Kua Compass & Planetary Directions',
        titleHi: 'कुआ नंबर एवं शुभ दिशा विज्ञान',
        descEn: 'Derived from your birth year and biological gender, your Kua number governs the 4 auspicious compass directions for wealth accumulation, health restoration, and deep sleep.',
        descHi: 'जन्म वर्ष एवं लिंग आधारित कुआ नंबर आपके लिए 4 शुभ एवं 4 अशुभ दिशाओं का निर्धारण करता है, जिससे धन आकर्षण व स्वास्थ्य लाभ होता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Complete Destiny Blueprint PDF',
        titleHi: 'पूर्ण भाग्य पत्रक (PDF रिपोर्ट)',
        descEn: 'Detailed multi-page report containing your Mulank, Bhagyank, Kua, Lo-Shu Grid, and next 3 years planetary predictions.',
        descHi: 'मूलांक, भाग्यांक, कुआ, लो-शू ग्रिड एवं आगामी 3 वर्षों के भविष्यफल की संपूर्ण हस्तलिखित व डिजिटल रिपोर्ट।'
      },
      {
        titleEn: '1-on-1 Consultation Session',
        titleHi: 'व्यक्तिगत परामर्श सत्र (45 मिनट)',
        descEn: 'Direct confidential consultation with Master Randhir Singh in Jaipur or via WhatsApp video call globally.',
        descHi: 'मास्टर रणधीर सिंह जी के साथ जयपुर केंद्र पर अथवा व्हाट्सएप वीडियो कॉल पर आमने-सामने विस्तृत वार्ता।'
      },
      {
        titleEn: 'Remedies & Auspicious Calendar',
        titleHi: 'वैदिक उपाय एवं शुभ मुहूर्त कैलेंडर',
        descEn: 'Custom planetary color prescriptions, auspicious days of the week, and non-invasive daily practices.',
        descHi: 'अनुकूल रंग, शुभ वार, दान सामग्री एवं दैनिक जीवन में अपनाए जाने वाले सरल वैदिक नियमों की सूची।'
      }
    ],
    benefits: [
      { titleEn: 'Clarity on Career & Business Moves', titleHi: 'करियर एवं व्यापार में पूर्ण स्पष्टता', icon: 'Briefcase' },
      { titleEn: 'Removal of Karmic Blockages', titleHi: 'कार्मिक अवरोधों व असफलताओं से मुक्ति', icon: 'Shield' },
      { titleEn: 'Harmonious Relationships & Marriage Timing', titleHi: 'विवाह योग एवं पारिवारिक सुख-शांति', icon: 'Heart' },
      { titleEn: 'Wealth Flow & Auspicious Timings', titleHi: 'धन लाभ एवं सर्वार्थ सिद्धि मुहूर्त', icon: 'Coins' }
    ],
    whoNeedsThis: [
      { en: 'Experiencing repetitive career stagnation despite hard work', hi: 'कठिन परिश्रम के बावजूद बार-बार करियर या व्यापार में रुकावट' },
      { en: 'Facing delays in marriage, business partnership confusion, or family discord', hi: 'विवाह में अप्रत्याशित विलंब या साझेदार चयन में असमंजस' },
      { en: 'Planning to launch a major business venture or purchase property', hi: 'नया व्यापार, दुकान या अचल संपत्ति क्रय करने की योजना बना रहे हों' },
      { en: 'Seeking self-realization of innate spiritual and psychological strengths', hi: 'अपनी अंतर्निहित शक्तियों एवं जीवन उद्देश्य को जानने की अभिलाषा' }
    ],
    faqs: [
      {
        qEn: 'Do I need exact birth time for Numerology?',
        qHi: 'क्या अंक ज्योतिष के लिए जन्म का सटीक समय अनिवार्य है?',
        aEn: 'No! Unlike Vedic astrology which requires birth minutes, Numerology works accurately with your verified Date of Birth (Day, Month, Full Year).',
        aHi: 'नहीं! अंक ज्योतिष में जन्म का सटीक मिनट आवश्यक नहीं होता; केवल आपकी सही जन्म तिथि (दिन, माह, वर्ष) ही पर्याप्त है।'
      },
      {
        qEn: 'Can consultations be done online via WhatsApp?',
        qHi: 'क्या देश-विदेश से ऑनलाइन व्हाट्सएप पर परामर्श संभव है?',
        aEn: 'Yes, Master Randhir Singh conducts consultations for clients worldwide in Hindi and English via high-definition WhatsApp video or voice call.',
        aHi: 'हाँ! देश-विदेश के साधक घर बैठे उच्च गुणवत्ता वाली व्हाट्सएप वीडियो कॉल या वॉइस कॉल पर परामर्श प्राप्त कर सकते हैं।'
      }
    ]
  },
  2: {
    id: 2,
    slug: 'service-2',
    badge: 'Signature Specialist',
    titleEn: 'Watch Analysis & Therapeutic Watch Consultation',
    titleHi: 'घड़ी का विश्लेषण एवं चिकित्सीय परामर्श',
    category: 'watch',
    iconName: 'Watch',
    suggestedTariff: '₹1,800',
    taglineEn: 'Your wristwatch sits near the radial artery, where your pulse can be felt. This unique approach explores the symbolism of your watch’s design, shape, and time-display patterns, examining their potential connection to personal energy, subconscious perceptions, and your life path.',
    taglineHi: 'आपकी कलाई पर पहनी जाने वाली घड़ी केवल समय बताने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद और व्यक्तित्व का भी प्रतीक है। इस विशेष पद्धति में घड़ी की बनावट, आकार, डिज़ाइन और समय-अंकों की संरचना का विश्लेषण किया जाता है, ताकि इनके प्रतीकात्मक अर्थों तथा आपकी मानसिक धारणाओं, व्यक्तिगत ऊर्जा और जीवन की दिशा से इनके संभावित संबंधों को समझा जा सके।',
    shortDesc: 'Your wristwatch sits near the radial artery, where your pulse can be felt. This unique approach explores the symbolism of your watch’s design, shape, and time-display patterns, examining their potential connection to personal energy, subconscious perceptions, and your life path.',
    fullDescEn: 'Your wristwatch sits near the radial artery, where your pulse can be felt. This unique approach explores the symbolism of your watch’s design, shape, and time-display patterns, examining their potential connection to personal energy, subconscious perceptions, and your life path. Master Randhir Singh performs a meticulous audit of your current wristwatch—inspecting dial geometry (round, rectangle, square), dial background shade, strap metal/leather composition, index markers, and movement rhythm—identifying energetic disharmonies and prescribing therapeutic configurations for harmony and growth.',
    fullDescHi: 'आपकी कलाई पर पहनी जाने वाली घड़ी केवल समय बताने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद और व्यक्तित्व का भी प्रतीक है। इस विशेष पद्धति में घड़ी की बनावट, आकार, डिज़ाइन और समय-अंकों की संरचना का विश्लेषण किया जाता है, ताकि इनके प्रतीकात्मक अर्थों तथा आपकी मानसिक धारणाओं, व्यक्तिगत ऊर्जा और जीवन की दिशा से इनके संभावित संबंधों को समझा जा सके। मास्टर रणधीर सिंह जी आपकी घड़ी का सूक्ष्म विश्लेषण कर आपकी प्रगति व समृद्धि हेतु सटीक मार्गदर्शन प्रदान करते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'Radial Pulse Meridian Interaction',
        titleHi: 'रेडियल नाड़ी स्पंदन एवं विद्युत-चुंबकीय प्रभाव',
        descEn: 'The radial artery pulses millions of times per year right beneath your watch case. Metallic or energetic dissonance here directly modulates your nervous system and aura.',
        descHi: 'घड़ी के नीचे से गुजरने वाली नाड़ी वर्ष भर में लाखों बार धड़कती है। यहाँ धातु या रंग का असंतुलन सीधे आपके तंत्रिका तंत्र एवं औरा को प्रभावित करता है।'
      },
      {
        titleEn: 'Dial Geometry as Sacred Yantra',
        titleHi: 'डायल ज्यामिति: ब्रह्मांडीय यंत्र स्वरूप',
        descEn: 'Round dials reflect Solar wholeness; rectangular dials stimulate Mercury analytical focus; square dials anchor Saturnian grounding. Wrong geometry triggers psychological fatigue.',
        descHi: 'गोल डायल सूर्य व पूर्णता, आयताकार डायल बुध व व्यापारिक बुद्धि, तथा चौकोर डायल शनि व स्थिरता का प्रतीक है। गलत आकार मानसिक विचलन देता है।'
      },
      {
        titleEn: 'Color Vibration Frequency on Wrist',
        titleHi: 'रंग तरंगें एवं ग्रहीय प्रभाव',
        descEn: 'A black dial activates deep Saturnian discipline or depressive slowness; blue connects with Jupiter/Saturn wisdom; gold invokes Solar leadership and sovereign prosperity.',
        descHi: 'काला डायल शनि की एकाग्रता या कभी-कभी अवसाद लाता है; नीला बृहस्पति व शनि का संतुलन; तथा स्वर्ण डायल सूर्य के तेज व ऐश्वर्य को जाग्रत करता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Comprehensive Watch Diagnostic Card',
        titleHi: 'घड़ी परीक्षण एवं दोष निवारण पत्रक',
        descEn: 'Detailed scorecard evaluating your watch across 6 core parameters: Shape, Color, Metal, Strap, Numerals, and Crown orientation.',
        descHi: 'डायल आकार, रंग, धातु, स्ट्रैप, अंक शैली एवं क्राउन स्थिति पर आधारित 6-बिंदु मूल्यांकन रिपोर्ट।'
      },
      {
        titleEn: 'Remedial Alteration Guidance',
        titleHi: 'स्ट्रैप एवं डायल संशोधन सलाह',
        descEn: 'Guidance on whether your current watch can be energetically corrected with a strap swap or if a new horological frequency is required.',
        descHi: 'क्या केवल स्ट्रैप बदलने से दोष दूर हो सकता है या नई थेरेपी घड़ी आवश्यक है, इसका प्रामाणिक निर्देश।'
      }
    ],
    benefits: [
      { titleEn: 'Stops Unexplained Financial Drain', titleHi: 'अनावश्यक धन व्यय एवं फिजूलखर्ची पर रोक', icon: 'ShieldAlert' },
      { titleEn: 'Accelerates Decision-Making Confidence', titleHi: 'त्वरित एवं सटीक निर्णय लेने का आत्मविश्वास', icon: 'Zap' },
      { titleEn: 'Calms Anxiety & Pulse Jitter', titleHi: 'मानसिक बेचैनी व नाड़ी स्पंदन में स्थिरता', icon: 'Heart' },
      { titleEn: 'Enhances Executive Authority & Respect', titleHi: 'कार्यक्षेत्र में प्रभाव, प्रतिष्ठा एवं सम्मान वृद्धि', icon: 'Award' }
    ],
    whoNeedsThis: [
      { en: 'People who noticed sudden business losses after switching or buying a new wristwatch', hi: 'जिन्हें नई घड़ी पहनने के बाद व्यापार में अचानक गिरावट या धन हानि का अनुभव हुआ हो' },
      { en: 'Executives and professionals feeling constantly rushed, fatigued, or unable to meet deadlines', hi: 'जो दिनभर भागदौड़ व तनाव महसूस करते हैं और काम समय पर पूरे नहीं हो पाते' },
      { en: 'Anyone wearing smartwatches with constant vibration causing nervous agitation', hi: 'स्मार्टवॉच के लगातार वाइब्रेशन से नाड़ी में बेचैनी महसूस करने वाले व्यक्ति' }
    ],
    faqs: [
      {
        qEn: 'Can I send photos of my watch for analysis on WhatsApp?',
        qHi: 'क्या मैं अपनी घड़ी की तस्वीरें व्हाट्सएप पर भेजकर जांच करवा सकता हूँ?',
        aEn: 'Yes! Send clear front, back, and wrist photos of your watch along with your Date of Birth for an exhaustive diagnostic audit.',
        aHi: 'हाँ! अपनी घड़ी की आगे, पीछे व कलाई पर बंधी तस्वीरें अपनी जन्म तिथि के साथ व्हाट्सएप पर भेजकर पूर्ण परीक्षण करा सकते हैं।'
      }
    ]
  },
  3: {
    id: 3,
    slug: 'service-3',
    badge: 'Core Foundation',
    titleEn: 'Date of Birth Analysis',
    titleHi: 'जन्म तिथि विश्लेषण (Lo-Shu Grid)',
    category: 'numerology',
    iconName: 'Calendar',
    suggestedTariff: '₹2,500',
    taglineEn: 'Complete 3x3 Lo-Shu Magic Grid analysis identifying planetary planes and missing numbers.',
    taglineHi: '3x3 लो-शू जादुई ग्रिड के माध्यम से 8 तलों एवं लुप्त अंकों का वैज्ञानिक विश्लेषण।',
    shortDesc: 'Complete 3x3 Lo-Shu Magic Grid analysis identifying planetary planes and missing numbers.',
    fullDescEn: 'The Lo-Shu Magic Square is a 4,000-year-old sacred mathematical matrix where every horizontal, vertical, and diagonal row adds up to 15. By transposing your birth date digits into this 9-chamber cosmic grid, Master Randhir Singh analyzes the 8 Planes of Existence: Mental Plane (4-9-2), Emotional Plane (3-5-7), Practical Plane (8-1-6), Thought Plane (4-3-8), Will Plane (9-5-1), Action Plane (2-7-6), and the supreme Raj Yogas (Golden & Silver Planes). Crucially, he identifies missing numbers and provides targeted non-invasive remedies to fill the energetic voids.',
    fullDescHi: 'लो-शू मैजिक स्क्वायर एक प्राचीन एवं प्रामाणिक 3x3 कॉस्मिक ग्रिड है, जिसमें प्रत्येक पंक्ति का योग 15 होता है। आपकी जन्म तिथि के अंकों को इस ग्रिड में स्थापित कर मास्टर रणधीर सिंह जी 8 प्रमुख तलों का अध्ययन करते हैं: मानसिक तल (4-9-2), भावनात्मक तल (3-5-7), व्यावहारिक तल (8-1-6), विचार तल (4-3-8), इच्छा शक्ति तल (9-5-1), कर्म तल (2-7-6) तथा स्वर्ण व रजत राजयोग। विशेष रूप से लुप्त अंकों की पहचान कर उनके संतुलन हेतु अचूक वैदिक उपाय दिए जाते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'The 8 Cosmic Planes of Lo-Shu',
        titleHi: 'लो-शू के 8 ब्रह्मांडीय ऊर्जा तल',
        descEn: 'Full rows create potent psychological engines. A full 4-3-8 plane confers razor-sharp analytical planning; a full 9-5-1 bestows unshakeable determination; a full 2-7-6 gives lightning-fast execution.',
        descHi: 'पूर्ण पंक्तियां राजयोग बनाती हैं: 4-3-8 से दूरदर्शी योजना, 9-5-1 से अदम्य इच्छाशक्ति, और 2-7-6 से तत्काल कर्मठता प्राप्त होती है।'
      },
      {
        titleEn: 'Missing Numbers as Karmic Voids',
        titleHi: 'लुप्त अंक (Missing Numbers) एवं जीवन की चुनौतियाँ',
        descEn: 'A missing 5 weakens central equilibrium and financial stability; a missing 6 hinders luxury and family harmony; a missing 8 causes financial delay. Remedies neutralize these gaps.',
        descHi: 'अंक 5 के अभाव से जीवन में स्थिरता व संतुलन डगमगाता है; अंक 6 के अभाव से भौतिक सुख व वाहन में बाधा आती है; अंक 8 के अभाव से धन संचय में विलंब होता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Personalized 3x3 Lo-Shu Chart Diagram',
        titleHi: 'व्यक्तिगत 3x3 लो-शू ग्रिड चार्ट आरेख',
        descEn: 'High-resolution colored chart mapping every number in your birth chart with active yogas highlighted.',
        descHi: 'आपकी जन्म तिथि के सभी सक्रिय योगों एवं रिक्त खानों को दर्शाने वाला रंगीन प्रामाणिक चार्ट।'
      },
      {
        titleEn: 'Missing Number Balancing Protocol',
        titleHi: 'लुप्त अंक पूरक उपाय योजना',
        descEn: 'Exact recommendations: planetary metals, sacred crystals, yantras, and dietary frequencies to supply the missing vibrations.',
        descHi: 'रिक्त अंकों की ऊर्जा की पूर्ति हेतु विशेष धातु, क्रिस्टल ब्रेसलेट, भोजपत्र यंत्र एवं दैनिक नियम।'
      }
    ],
    benefits: [
      { titleEn: 'Awakens Dormant Raj Yogas', titleHi: 'सुप्त राजयोगों का सक्रियण एवं उत्थान', icon: 'Sparkles' },
      { titleEn: 'Fills Karmic Energy Voids', titleHi: 'लुप्त अंकों के दोषों का पूर्ण निवारण', icon: 'ShieldCheck' },
      { titleEn: 'Aligns Career with Innate Planetary Strengths', titleHi: 'स्वाभाविक क्षमताओं के अनुकूल कार्यक्षेत्र चयन', icon: 'Briefcase' }
    ],
    whoNeedsThis: [
      { en: 'Anyone struggling to find balance between planning, execution, and emotional stability', hi: 'जो योजना तो बहुत बनाते हैं परंतु क्रियान्वयन या स्थिरता में कठिनाई पाते हैं' },
      { en: 'Parents wanting to understand the innate psychological blueprint of their children', hi: 'अभिभावक जो अपने बच्चों की प्रतिभा, स्वभाव एवं पढ़ाई के अनुकूल क्षेत्र जानना चाहते हैं' }
    ],
    faqs: [
      {
        qEn: 'What if many numbers are missing in my grid?',
        qHi: 'यदि मेरे ग्रिड में कई अंक गायब हों तो क्या उपाय है?',
        aEn: 'It is completely normal! Most individuals have 2 to 4 missing numbers. Master Randhir Singh uses yantras, therapy watches, and crystals to supply those missing frequencies.',
        aHi: 'यह सामान्य है! अधिकांश लोगों के ग्रिड में 2 से 4 अंक लुप्त होते हैं। मास्टर रणधीर सिंह जी सिद्ध यंत्रों, थेरेपी घड़ियों एवं क्रिस्टल द्वारा इन रिक्तियों को पूर्ण करते हैं।'
      }
    ]
  },
  4: {
    id: 4,
    slug: 'service-4',
    badge: 'Unique Remedy',
    titleEn: 'Therapy Watches',
    titleHi: 'थेरेपी वॉचेस (औषधीय एवं भाग्यशाली घड़ियाँ)',
    category: 'watch',
    iconName: 'Clock',
    suggestedTariff: '₹11,000+',
    taglineEn: 'Customized prescription watches designed to accelerate career growth, wealth flow, and mental peace.',
    taglineHi: 'कलाई की नाड़ी के माध्यम से करियर उन्नति, लक्ष्मी आकर्षण एवं शांति हेतु सिद्ध प्रिस्क्रिप्शन घड़ियाँ।',
    shortDesc: 'Customized prescription watches designed to accelerate career growth, wealth flow, and mental peace.',
    fullDescEn: 'Therapy Watches are Master Randhir Singh’s celebrated signature horological innovation. Unlike generic luxury timepieces, a Therapy Watch is individually consecrated and custom-configured based on your missing Lo-Shu numbers, ruling planet, and immediate life objectives. Featuring sacred geometry dials (such as 18K Yellow Gold with Royal Azure dials for Jupiter/Saturn mastery or Pearl White dials for Lunar peace), energized Om Yantras, and specific metallic alloy links, these watches serve as continuous bio-resonance energy anchors right on your radial pulse meridian.',
    fullDescHi: 'थेरेपी वॉचेस मास्टर रणधीर सिंह जी का सुविख्यात एवं विशिष्ट उपचारात्मक नवाचार है। साधारण घड़ियों के विपरीत, थेरेपी घड़ी को आपकी जन्म तिथि के लुप्त अंकों, स्वामी ग्रह एवं तात्कालिक लक्ष्य के आधार पर विशेष रूप से तैयार व अभिमंत्रित किया जाता है। इसमें 18K स्वर्ण पॉलिश, रॉयल अज़्योर ब्लू अथवा पर्ल व्हाइट डायल, केंद्र में प्रतिष्ठित ॐ यंत्र, तथा विशिष्ट धातुओं के मेल से बनी कलाई चेन होती है, जो दिनभर आपकी नाड़ी के माध्यम से सकारात्मक ऊर्जा का संचार करती है।',
    sciencePrinciples: [
      {
        titleEn: 'Continuous Pulse Energy Entrainment',
        titleHi: 'नाड़ी स्पंदन के साथ सतत ऊर्जा सामंजस्य',
        descEn: 'The human radial pulse beats ~100,000 times a day. Wearing a consecrated therapy watch subjects this vital blood-flow conduit to auspicious frequencies with every heartbeat.',
        descHi: 'मानव नाड़ी प्रतिदिन लगभग 1 लाख बार धड़कती है। सिद्ध थेरेपी घड़ी पहनने से प्रत्येक स्पंदन के साथ शुभ ऊर्जा शरीर व मस्तिष्क में प्रवाहित होती है।'
      },
      {
        titleEn: 'Planetary Metal & Color Alchemy',
        titleHi: 'धातु एवं रंग रस-शास्त्र (Horological Alchemy)',
        descEn: 'Gold stimulates Solar prana and leadership charisma; royal blue awakens Saturnian discipline and Jupiterian wealth; emerald green fosters rapid commercial sales.',
        descHi: 'स्वर्ण धातु सूर्य का तेज व नेतृत्व क्षमता जगाती है; नीला रंग शनि की एकाग्रता व गुरु का ज्ञान देता है; हरा रंग बुध का व्यापारिक कौशल बढ़ाता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Individually Consecrated Timepiece',
        titleHi: 'व्यक्तिगत रूप से अभिमंत्रित थेरेपी घड़ी',
        descEn: 'Bespoke watch assembled and energized under Master Randhir Singh’s guidance with sacred mantras and correct muhurta activation.',
        descHi: 'मास्टर रणधीर सिंह जी द्वारा शुभ मुहूर्त में वैदिक मंत्रों से अभिमंत्रित एवं तैयार की गई अनूठी थेरेपी घड़ी।'
      },
      {
        titleEn: 'Muhurta Activation Protocol',
        titleHi: 'प्रथम धारण शुभ मुहूर्त एवं संकल्प विधि',
        descEn: 'Exact day, tithi, and hour to wear the watch for the first time, including the accompanying seed mantra invocation.',
        descHi: 'घड़ी को पहली बार धारण करने का सटीक शुभ मुहूर्त, बीज मंत्र एवं संकल्प विधि।'
      }
    ],
    benefits: [
      { titleEn: 'Magnetizes High-Value Opportunities', titleHi: 'करियर एवं व्यापार में उच्च अवसरों का आकर्षण', icon: 'Crown' },
      { titleEn: 'Stabilizes Emotional Nervousness', titleHi: 'तनाव, घबराहट एवं अनिर्णय से स्थायी मुक्ति', icon: 'ShieldCheck' },
      { titleEn: 'Sovereign Presence & Public Influence', titleHi: 'समाज एवं कार्यक्षेत्र में प्रभावशाली व्यक्तित्व', icon: 'Award' }
    ],
    whoNeedsThis: [
      { en: 'Entrepreneurs, CEOs, and senior executives striving for accelerated expansion', hi: 'उद्योगपति, व्यापारी एवं उच्च अधिकारी जो व्यापार में तीव्र विस्तार चाहते हैं' },
      { en: 'Individuals with missing numbers 1, 5, or 6 seeking an effortless daily wearable remedy', hi: 'जिनके चार्ट में अंक 1, 5 या 6 लुप्त है और जो सरल दैनिक उपाय चाहते हैं' }
    ],
    faqs: [
      {
        qEn: 'How is a Therapy Watch different from a normal luxury watch?',
        qHi: 'थेरेपी घड़ी सामान्य लग्जरी घड़ी से किस प्रकार भिन्न है?',
        aEn: 'A normal watch only tells time. A Therapy Watch integrates sacred geometry, planetary dial colors, correct strap grounding, and Vedic consecration aligned with your unique pulse.',
        aHi: 'सामान्य घड़ी केवल समय दिखाती है। थेरेपी घड़ी में पवित्र ज्यामिति, ग्रहीय रंग, सही धातु का स्ट्रैप एवं आपकी नाड़ी के अनुकूल वैदिक प्राण-प्रतिष्ठा की जाती है।'
      }
    ]
  },
  5: {
    id: 5,
    slug: 'service-5',
    badge: 'Family Blessing',
    titleEn: 'Best Dates of Months for Child Birth',
    titleHi: 'संतान जन्म हेतु शुभ तिथि चयन (मुहूर्त)',
    category: 'numerology',
    iconName: 'Baby',
    suggestedTariff: '₹5,100',
    taglineEn: 'Vedic numerological planning for planned deliveries to bestow a harmonious destiny upon your newborn.',
    taglineHi: 'नियोजित प्रसव (C-Section) हेतु शुभ तिथि, वार एवं नक्षत्र का चयन ताकि नवजात को मिले स्वर्णिम भविष्य।',
    shortDesc: 'Vedic numerological planning for planned deliveries to bestow a harmonious destiny upon your newborn.',
    fullDescEn: 'When medical conditions necessitate a planned delivery or caesarean section within a recommended clinical window, selecting the exact date and hour becomes a sacred parental responsibility. Master Randhir Singh cross-calculates the candidate delivery dates against parental charts to identify dates with high-frequency Driver-Conductor synergy (such as 1-1, 1-5, 3-3, 5-1, or 6-3), avoiding conflicting enemy numbers (like 1-8, 2-8, or 4-8) and ensuring the newborn is blessed with vibrant health, intellectual brilliance, and filial affection.',
    fullDescHi: 'जब चिकित्सीय कारणों से सी-सेक्शन (नियोजित प्रसव) की सलाह दी जाती है, तब उस अनुशंसित समयावधि में से सर्वोत्तम शुभ तिथि एवं समय का चयन करना संतान के उज्ज्वल भविष्य का आधार बनता है। मास्टर रणधीर सिंह जी माता-पिता के अंकों के साथ तालमेल बिठाते हुए ऐसे शुभ मूलांक-भाग्यांक (जैसे 1-1, 1-5, 3-3, 5-1, 6-3) का चयन करते हैं, जो शत्रु अंकों (जैसे 1-8, 2-8, 4-8) से मुक्त हों और नवजात को उत्तम स्वास्थ्य, दीर्घायु, कुशाग्र बुद्धि एवं पारिवारिक प्रेम प्रदान करें।',
    sciencePrinciples: [
      {
        titleEn: 'Driver-Conductor Harmonic Affinity',
        titleHi: 'मूलांक-भाग्यांक की मैत्रीपूर्ण युति',
        descEn: 'The newborn’s Driver (day of birth) and Conductor (total sum) must be mutual friends. A harmonious combination guarantees a smooth life path without unnecessary early struggles.',
        descHi: 'जन्म दिवस एवं कुल योग के स्वामी ग्रह परस्पर मित्र होने चाहिए, जिससे बालक का जीवन संघर्षों से परे और प्रगतिशील बने।'
      },
      {
        titleEn: 'Parental Synastry Integration',
        titleHi: 'माता-पिता के साथ भाग्य सामंजस्य',
        descEn: 'The chosen birth date must not conflict with either the mother’s or the father’s ruling numbers, fostering lifelong mutual respect, peace, and domestic blessing.',
        descHi: 'चुनी गई तिथि माता व पिता दोनों के मूलांक के अनुकूल होनी चाहिए, ताकि परिवार में सौभाग्य, शांति व स्नेह बना रहे।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Recommended Date Ranking & Time Windows',
        titleHi: 'शुभ तिथियों की प्राथमिकता सूची व समय स्लॉट',
        descEn: 'Ranked list of top 3 to 5 candidate delivery dates with preferred morning/afternoon muhurta hours matching the doctor’s schedule.',
        descHi: 'डॉक्टर की सुविधानुसार 3 से 5 सर्वश्रेष्ठ तिथियों की क्रमबद्ध सूची एवं शुभ लग्न समय।'
      },
      {
        titleEn: 'Newborn Planetary Potential Blueprint',
        titleHi: 'नवजात शिशु ग्रहीय संभावना पत्रक',
        descEn: 'Preview of the child’s future Lo-Shu strengths, auspicious naming initials, and lucky colors.',
        descHi: 'शिशु के भविष्य के लो-शू योग, शुभ नाम अक्षर एवं लकी रंगों का प्रारंभिक मार्गदर्शन।'
      }
    ],
    benefits: [
      { titleEn: 'Bestows a Golden Destiny from Day One', titleHi: 'प्रथम दिवस से ही स्वर्णिम भाग्य का वरदान', icon: 'Sparkles' },
      { titleEn: 'Prevents Inimical Karmic Combinations', titleHi: 'शत्रु ग्रहीय दोषों एवं प्रारंभिक कष्टों से बचाव', icon: 'Shield' },
      { titleEn: 'Lifelong Family Prosperity & Cohesion', titleHi: 'परिवार में स्थाई संपन्नता, आरोग्य एवं सौहार्द्र', icon: 'Heart' }
    ],
    whoNeedsThis: [
      { en: 'Expecting parents advised by doctors to schedule a planned delivery within a 7-to-14 day window', hi: 'गर्भवती माता-पिता जिन्हें डॉक्टरों द्वारा 7 से 14 दिनों के भीतर नियोजित प्रसव की सलाह दी गई हो' },
      { en: 'Families desiring their child to be born under peaceful, leadership-oriented planetary vibrations', hi: 'जो चाहते हैं कि उनकी संतान उच्च नेतृत्व, विद्या एवं आरोग्यता के संस्कारों के साथ जन्मे' }
    ],
    faqs: [
      {
        qEn: 'Can we consult before the doctor confirms the exact week?',
        qHi: 'क्या डॉक्टर द्वारा सप्ताह निश्चित करने से पूर्व परामर्श ले सकते हैं?',
        aEn: 'Yes, as soon as your expected due month is established, Master Randhir Singh can prepare the most auspicious astrological windows for your medical team.',
        aHi: 'हाँ! संभावित माह की जानकारी मिलते ही आप परामर्श ले सकते हैं ताकि अग्रिम रूप से शुभ तिथियों का चयन किया जा सके।'
      }
    ]
  },
  6: {
    id: 6,
    slug: 'service-6',
    badge: 'High Impact',
    titleEn: 'Mobile Number Analysis & Lucky Mobile Numbers',
    titleHi: 'मोबाइल नंबर विश्लेषण एवं लकी मोबाइल नंबर',
    category: 'numerology',
    iconName: 'PhoneCall',
    suggestedTariff: '₹1,500',
    taglineEn: 'Diagnose your active phone number vibrations and select high-frequency auspicious numbers.',
    taglineHi: 'वर्तमान मोबाइल नंबर की सूक्ष्म जांच एवं व्यापार-करियर के अनुकूल लकी मोबाइल नंबर का चयन।',
    shortDesc: 'Diagnose your active phone number vibrations and select high-frequency auspicious numbers.',
    fullDescEn: 'Your mobile phone is dialed dozens of times daily, held against your aura constantly, and typed into financial banking transactions. A phone number whose 10 digits sum to an enemy number or contain conflicting interior pairs (like 2-8, 4-8, or multiple repeating zeros) creates subconscious barriers in client calls, delayed payments, and frequent misunderstandings. Master Randhir Singh analyzes your active SIM number and assists you in selecting a new lucky phone number calibrated to your Mulank and business goals.',
    fullDescHi: 'आपका मोबाइल नंबर दिनभर में अनगिनत बार डायल होता है, आपके औरा क्षेत्र में रहता है तथा समस्त व्यापारिक व बैंकिंग लेन-देन से जुड़ा है। यदि 10 अंकों का कुल योग या आंतरिक जोड़ शत्रु अंकों (जैसे 2-8, 4-8, या अधिक शून्य) पर आ रहा हो, तो यह ग्राहकों से बातचीत में अड़चन, पेमेंट में देरी तथा अनचाहे विवाद उत्पन्न करता है। मास्टर रणधीर सिंह जी आपके वर्तमान नंबर का विश्लेषण कर आपके मूलांक व व्यवसाय के अनुकूल लकी मोबाइल नंबर चुनते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'Single Root and Compound Total Energy',
        titleHi: 'एकल मूलांक एवं कंपाउंड योग प्रभाव',
        descEn: 'A phone number summing to Compound 37 (Sun-Jupiter luck) or 41 attracts sudden commercial breakthroughs, whereas a sum to Compound 26 or 28 causes stress.',
        descHi: 'कंपाउंड 37 या 41 पर समाप्त होने वाला नंबर व्यापार में अचानक वृद्धि देता है, जबकि 26 या 28 तनाव व कानूनी उलझनें ला सकता है।'
      },
      {
        titleEn: 'Internal Digit Pair Rhythm',
        titleHi: 'आंतरिक अंकों के जोड़ों की ऊर्जा',
        descEn: 'Beyond the final sum, the arrangement of the last 4 digits acts as an energetic funnel for inbound opportunities.',
        descHi: 'अंतिम 4 अंकों का अनुक्रम ग्राहकों के विश्वास एवं धन के आवक प्रवाह को सीधे नियंत्रित करता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Active Mobile Number Diagnostic Report',
        titleHi: 'वर्तमान मोबाइल नंबर परीक्षण रिपोर्ट',
        descEn: 'Full breakdown of whether your current number is supporting or hindering your profession.',
        descHi: 'वर्तमान नंबर की सकारात्मक एवं नकारात्मक ऊर्जा का स्पष्ट विश्लेषण।'
      },
      {
        titleEn: 'Custom Lucky Number Selection Guide',
        titleHi: 'शुभ मोबाइल नंबर चयन मार्गदर्शिका',
        descEn: 'Precise mathematical criteria (total sum, ending digits, forbidden pairs) to select a new SIM card from any telecom store.',
        descHi: 'नया नंबर खरीदते समय किन अंकों का योग, अंतिम अंक एवं निषेध जोड़ देखने हैं, उसका सरल फार्मूला।'
      }
    ],
    benefits: [
      { titleEn: 'Accelerates Inbound Client Inquiries', titleHi: 'नए ग्राहकों के कॉल्स व इंक्वायरी में वृद्धि', icon: 'PhoneCall' },
      { titleEn: 'Smooth Recovery of Stuck Payments', titleHi: 'रुके हुए धन व पेमेंट की सुगम वसूली', icon: 'Coins' },
      { titleEn: 'Fosters Constructive Communication', titleHi: 'सकारात्मक संवाद एवं संबंधों में मिठास', icon: 'Sparkles' }
    ],
    whoNeedsThis: [
      { en: 'Sales executives, real estate consultants, and business owners relying on phone calls for revenue', hi: 'सेल्स प्रोफेशनल्स, रियल एस्टेट कंसल्टेंट्स एवं व्यापारी जिनका कारोबार फोन पर निर्भर है' },
      { en: 'Anyone noticing a spike in disputes or loss of leads after recently changing phone numbers', hi: 'जिन्होंने हाल ही में नंबर बदला हो और उसके बाद से काम में मंदी या विवाद बढ़े हों' }
    ],
    faqs: [
      {
        qEn: 'Do I need to buy an expensive VIP fancy number?',
        qHi: 'क्या मुझे बहुत महंगा वीआईपी नंबर खरीदना पड़ेगा?',
        aEn: 'Not at all! Fancy numbers (like 9999 or 0000) are often numerologically harmful. Master Randhir Singh identifies inexpensive regular numbers that possess supreme mathematical harmony.',
        aHi: 'बिल्कुल नहीं! अक्सर चार बार 9 या 0 वाले फैंसी नंबर नुकसानदायक होते हैं। सामान्य दरों पर मिलने वाले ऐसे नंबर जो आपके मूलांक से मेल खाते हों, सर्वोत्तम परिणाम देते हैं।'
      }
    ]
  },
  7: {
    id: 7,
    slug: 'service-7',
    badge: 'Specialized Healing',
    titleEn: 'Negativity Removal & Salt Therapy',
    titleHi: 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी)',
    category: 'salt',
    iconName: 'ShieldAlert',
    suggestedTariff: '₹5,100',
    taglineEn: 'Traditional salt-cleansing rituals and auric shielding for peaceful spaces and positive mindsets.',
    taglineHi: 'प्राकृतिक सेंधा व समुद्री लवण द्वारा नकारात्मक ऊर्जा, नजर दोष एवं वास्तु अवरोधों का संपूर्ण निवारण।',
    shortDesc: 'Traditional salt-cleansing rituals and auric shielding for peaceful spaces and positive mindsets.',
    fullDescEn: 'For thousands of years, Vedic sages and traditional healers have revered authentic Rock Salt (Sendha Namak) and Sea Salt (Samudri Namak) for their unyielding ionic capacity to absorb psychic debris, the evil eye (Nazar dosha), etheric fatigue, and geopathic stress. Master Randhir Singh prescribes personalized salt rituals, threshold barrier placements, auric foot bath protocols, and consecrated salt water glass traps to purge stuck negative vibrations from homes, offices, and human bio-fields.',
    fullDescHi: 'हजारों वर्षों से वैदिक ऋषि एवं पारम्परिक हीलर सेंधा व समुद्री नमक को नकारात्मक ऊर्जा, नजर दोष, मानसिक अशांति एवं घर के भारीपन को सोखने का सबसे शक्तिशाली प्राकृतिक माध्यम मानते आए हैं। मास्टर रणधीर सिंह जी व्यक्तिगत परामर्श के आधार पर नमक के पोछे, मुख्य द्वार पर रक्षा पोटली, चरण लवण स्नान तथा कांच के पात्र में जल-नमक के विशेष उपाय बताते हैं, जिससे घर व कार्यस्थल की नकारात्मकता तुरंत समाप्त होती है।',
    sciencePrinciples: [
      {
        titleEn: 'Ionic Absorption of Psychic & Etheric Residue',
        titleHi: 'नकारात्मक तरंगों का प्राकृतिक आयनिक अवशोषण',
        descEn: 'Raw crystalline salt creates a natural negative ion micro-climate that neutralizes heavy static electromagnetic and emotional fields in living spaces.',
        descHi: 'कच्चा सेंधा नमक प्राकृतिक नकारात्मक आयन उत्पन्न करता है, जो घर के भारी विद्युत-चुंबकीय व भावनात्मक तनाव को सोख लेता है।'
      },
      {
        titleEn: 'Threshold Auric Shielding',
        titleHi: 'चौखट रक्षा एवं ऊर्जा अवरोधक विधि',
        descEn: 'Placing consecrated rock salt bowls at the main entrance traps jealousy and toxic vibrations before they cross your home threshold.',
        descHi: 'मुख्य द्वार की चौखट पर अभिमंत्रित नमक रखने से ईर्ष्या, नजर दोष व बाहरी क्लेश घर के भीतर प्रवेश नहीं कर पाते।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Personalized 21-Day Salt Cleansing Protocol',
        titleHi: '21-दिवसीय लवण शुद्धि कार्ययोजना',
        descEn: 'Day-by-day instructions on morning threshold washes, evening aura foot soaks, and disposal protocols.',
        descHi: 'प्रतिदिन सुबह मुख्य द्वार पोछा, संध्या समय औरा शुद्धि एवं नमक विसर्जन की सम्पूर्ण चरणबद्ध विधि।'
      },
      {
        titleEn: 'Commercial & Residential Energy Barrier Chart',
        titleHi: 'घर एवं प्रतिष्ठान हेतु ऊर्जा रक्षा मानचित्र',
        descEn: 'Directional map showing exact corners where salt bowls must be positioned to dissolve heavy stagnancy.',
        descHi: 'घर या दुकान के किन कोनों में कांच की कटोरी में नमक रखना है, उसका स्पष्ट दिशा निर्देश।'
      }
    ],
    benefits: [
      { titleEn: 'Instantly Lightens Heavy Household Atmospheres', titleHi: 'घर के भारीपन व घुटन से तत्काल मुक्ति', icon: 'Sun' },
      { titleEn: 'Restores Deep, Restful Sleep', titleHi: 'गहरी, शांत एवं बुरे सपनों से मुक्त निद्रा', icon: 'Heart' },
      { titleEn: 'Clears Unexplained Chronic Exhaustion', titleHi: 'बिना कारण की थकान व आलस्य का समूल नाश', icon: 'Sparkles' }
    ],
    whoNeedsThis: [
      { en: 'Homes suffering from constant unexplained arguments, illness, or oppressive heaviness', hi: 'जिन घरों में बिना किसी बात के रोज झगड़े, अशांति या अस्वस्थता का माहौल रहता हो' },
      { en: 'Businesses where footfall is high but conversion and cash collection are constantly stalled', hi: 'दुकान या ऑफिस जहाँ ग्राहक तो आते हैं परंतु बिक्री या भुगतान में अड़चनें आती हैं' }
    ],
    faqs: [
      {
        qEn: 'Can regular refined table salt be used?',
        qHi: 'क्या साधारण खाने वाला रिफाइंड नमक उपयोग किया जा सकता है?',
        aEn: 'No! Modern iodized table salt is chemically processed and lacks energetic potency. Only raw unrefined rock salt (Lahori/Sendha) or raw whole sea salt is effective.',
        aHi: 'नहीं! बाजार का रिफाइंड नमक रासायनिक प्रक्रिया से गुजरता है। केवल साबुत प्राकृतिक सेंधा नमक या कच्चा समुद्री नमक ही प्रभावी होता है।'
      }
    ]
  },
  8: {
    id: 8,
    slug: 'service-8',
    badge: 'Transformational',
    titleEn: 'Name Analysis, Suggestions and Corrections',
    titleHi: 'नाम विश्लेषण, सुझाव एवं नाम सुधार (Chaldean)',
    category: 'numerology',
    iconName: 'FileSignature',
    suggestedTariff: '₹3,500',
    taglineEn: 'Harmonize your name vibrations with your birth chart using Chaldean and Pythagorean sciences.',
    taglineHi: 'काल्डियन एवं पाइथागोरियन पद्धति से नाम के अक्षरों का सूक्ष्म संशोधन ताकि भाग्य बने चुंबकीय।',
    shortDesc: 'Harmonize your name vibrations with your birth chart using Chaldean and Pythagorean sciences.',
    fullDescEn: 'Every letter of your name carries a distinct cosmic numerical frequency. If your birth numbers are governed by the Sun (1) or Venus (6), but your existing name sums to a conflicting Saturnine 8 or deceptive 4, an internal vibrational civil war takes place in your life. Master Randhir Singh utilizes ancient Chaldean numerology to suggest subtle, elegant spelling modifications (often adding or modifying a single letter) that realign your Name Compound with wealth-generating master vibrations (such as 19, 23, 37, 41, or 42) without requiring cumbersome legal changes on official passports or IDs.',
    fullDescHi: 'आपके नाम का प्रत्येक अक्षर एक विशिष्ट ब्रह्मांडीय अंक से जुड़ा है। यदि आपका मूलांक सूर्य (1) या शुक्र (6) है, परंतु नाम का कुल योग शत्रु अंक 8 या 4 पर आ रहा है, तो जीवन में लगातार संघर्ष व असफलता बनी रहती है। मास्टर रणधीर सिंह जी प्राचीन काल्डियन अंक ज्योतिष द्वारा नाम के केवल एक या दो अक्षरों में ऐसा सूक्ष्म व सुरुचिपूर्ण सुधार करते हैं, जो आपके नाम को अत्यंत भाग्यशाली कंपाउंड (जैसे 19, 23, 37, 41, 42) पर ले आता है, बिना किसी कानूनी दस्तावेज बदलने के झंझट के।',
    sciencePrinciples: [
      {
        titleEn: 'Chaldean Sound Vibration Alphabet',
        titleHi: 'काल्डियन ध्वनि-अंक विज्ञान',
        descEn: 'Unlike modern arbitrary alphabets, the Chaldean system calculates the actual sonic frequency produced when your name is pronounced aloud in the universe.',
        descHi: 'काल्डियन पद्धति आपके नाम के उच्चारण से ब्रह्मांड में गूंजने वाली वास्तविक ध्वनि तरंगों की गणना करती है।'
      },
      {
        titleEn: 'Compound Name Number Destiny',
        titleHi: 'कंपाउंड नामांक का गुप्त प्रभाव',
        descEn: 'The root number governs the outward persona, but the compound number (e.g. 23 - the Royal Star of the Lion) governs miraculous protection and career ascension.',
        descHi: 'एकल अंक बाहरी प्रभाव दिखाता है, परंतु कंपाउंड अंक (जैसे 23 - सिंह का राजतारा) अप्रत्याशित सफलता व प्रतिष्ठा दिलाता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Name Diagnostic & Phonetic Audit Sheet',
        titleHi: 'नाम परीक्षण एवं ध्वनि विश्लेषण पत्रक',
        descEn: 'Evaluation of your current first name, full name, and social media/professional signatures.',
        descHi: 'वर्तमान नाम, हस्ताक्षर एवं सोशल मीडिया नाम का पूर्ण तुलनात्मक विश्लेषण।'
      },
      {
        titleEn: '3 Optimized Auspicious Spelling Options',
        titleHi: '3 सर्वोत्तम संशोधित नाम विकल्प',
        descEn: 'Elegant, modern spelling options tailored to your birth chart with signature activation instructions.',
        descHi: 'मूलांक-भाग्यांक से पूर्णतः मेल खाते हुए 3 सुंदर नाम विकल्प एवं हस्ताक्षर करने की सही विधि।'
      }
    ],
    benefits: [
      { titleEn: 'Awakens Social Charisma & Respect', titleHi: 'सामाजिक मान-सम्मान एवं आकर्षण में वृद्धि', icon: 'Crown' },
      { titleEn: 'Removes Stumbling Blocks in Career Growth', titleHi: 'पदोन्नति व करियर की अड़चनों का समाधान', icon: 'Briefcase' },
      { titleEn: 'Zero Legal Burden for ID Documents', titleHi: 'सरकारी दस्तावेजों में बदलाव की कोई आवश्यकता नहीं', icon: 'ShieldCheck' }
    ],
    whoNeedsThis: [
      { en: 'Professionals, artists, and business owners whose careers feel perpetually stuck despite immense talent', hi: 'प्रतिभाशाली व्यक्ति जो वर्षों से मेहनत कर रहे हैं परंतु नाम व पहचान नहीं बन पा रही' },
      { en: 'Newborns and children whose parents seek the most auspicious start in life', hi: 'नवजात शिशु जिनका नामकरण शुभ वैदिक अक्षरों व अंकों पर करना हो' }
    ],
    faqs: [
      {
        qEn: 'Do I have to change my Aadhaar card or passport?',
        qHi: 'क्या मुझे आधार कार्ड या पासपोर्ट में नाम बदलना होगा?',
        aEn: 'No! The universe responds to the frequency with which you write your signature, save your phone contact, and use your daily name. Legal document changes are entirely optional.',
        aHi: 'बिल्कुल नहीं! ब्रह्मांड आपके प्रतिदिन लिखने, हस्ताक्षर करने एवं उपयोग करने वाले नाम से सक्रिय होता है। कानूनी कागजात बदलने की आवश्यकता नहीं होती।'
      }
    ]
  },
  9: {
    id: 9,
    slug: 'service-9',
    badge: 'Holistic Solution',
    titleEn: 'Special Remedies for Marriage, Health & Professions',
    titleHi: 'विवाह, स्वास्थ्य एवं व्यवसाय हेतु विशेष उपाय',
    category: 'healing',
    iconName: 'HeartHandshake',
    suggestedTariff: '₹3,500',
    taglineEn: 'Tailored, non-invasive Vedic, cosmic, and behavioral remedies for delayed marriages and career blocks.',
    taglineHi: 'विवाह में आ रहे व्यवधान, पुरानी बीमारियों एवं व्यापारिक मंदी हेतु सरल व अचूक वैदिक समाधान।',
    shortDesc: 'Tailored, non-invasive Vedic, cosmic, and behavioral remedies for delayed marriages and career blocks.',
    fullDescEn: 'Life problems often arise not from lack of effort, but from subtle energetic misalignments between personal karma and planetary time-periods. Master Randhir Singh prescribes practical, non-invasive, and cost-effective remedies tailored to your birth chart. From resolving delayed marriage proposals and restoring spousal harmony, to dissipating chronic health lethargy and breaking commercial stagnation, these remedies encompass planetary color therapy, directional energization, specific charity acts, and Vedic behavioral protocols.',
    fullDescHi: 'जीवन में समस्याएं अक्सर परिश्रम की कमी से नहीं, बल्कि व्यक्तिगत कर्म एवं ग्रहीय दशाओं के असंतुलन से उत्पन्न होती हैं। मास्टर रणधीर सिंह जी आपकी जन्म तिथि के अनुसार अत्यंत व्यावहारिक, सरल एवं बिना किसी आडंबर वाले उपाय प्रदान करते हैं। चाहे विवाह प्रस्तावों में अड़चन हो, दांपत्य जीवन में तनाव हो, स्वास्थ्य में सुस्ती हो या व्यापार में मंदी—इनके समाधान हेतु रंग चिकित्सा, दिशा शोधन, विशिष्ट दान एवं सात्विक जीवन शैली के अचूक नियम बताए जाते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'Planetary Element Rebalancing',
        titleHi: 'पंचतत्व एवं ग्रहीय तत्वों का संतुलन',
        descEn: 'Fire governs action and career momentum; Water governs emotions and marital bonding; Earth governs wealth stability. Remedies balance whichever element is deficient.',
        descHi: 'अग्नि तत्व कर्म व प्रतिष्ठा, जल तत्व भावनाएं व विवाह, तथा पृथ्वी तत्व धन व स्थिरता का कारक है। उपाय द्वारा क्षीण तत्व को पुष्ट किया जाता है।'
      },
      {
        titleEn: 'Karmic Cause-and-Effect Alignment',
        titleHi: 'दान एवं कर्म शुद्धि का विज्ञान',
        descEn: 'Specific charitable donations made on designated weekdays to birds, cows, or the underprivileged neutralize heavy ancestral and karmic blockages.',
        descHi: 'निश्चित वार को पक्षियों, गौमाता अथवा जरूरतमंदों को विशिष्ट वस्तुओं का दान करने से प्रारब्ध के भारी दोष शांत होते हैं।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Customized Remedies Roadmap',
        titleHi: 'व्यक्तिगत उपाय कार्ययोजना पत्रक',
        descEn: 'Clear checklist of daily, weekly, and monthly practices with exact timings and materials.',
        descHi: 'दैनिक, साप्ताहिक एवं मासिक सरल उपायों की स्पष्ट चेकलिस्ट, समय एवं सामग्री सहित।'
      },
      {
        titleEn: 'Direct Guidance on Implementation',
        titleHi: 'उपाय क्रियान्वयन मार्गदर्शन',
        descEn: '1-on-1 explanation of how to execute each remedy correctly to avoid accidental errors.',
        descHi: 'प्रत्येक उपाय को सही विधि से कैसे किया जाए, उसका व्यक्तिगत परामर्श।'
      }
    ],
    benefits: [
      { titleEn: 'Clears Obstacles in Marriage Alliances', titleHi: 'विवाह में आ रहे अप्रत्याशित व्यवधानों का निवारण', icon: 'Heart' },
      { titleEn: 'Revives Dormant Business Sales', titleHi: 'रुके हुए व्यापार एवं बिक्री में नई गति', icon: 'Briefcase' },
      { titleEn: 'Boosts Physical Immunity & Vitality', titleHi: 'शारीरिक ऊर्जा, रोग प्रतिरोधक क्षमता एवं उत्साह', icon: 'Sun' }
    ],
    whoNeedsThis: [
      { en: 'Individuals facing repeated cancellation of marriage talks at the final stage', hi: 'जिनके विवाह की बातचीत पक्की होते-होते अंतिम समय पर टूट जाती है' },
      { en: 'Business owners experiencing sudden drops in profitability or chronic customer attrition', hi: 'दुकानदार या व्यापारी जिनका व्यापार अच्छा चलते-चलते अचानक रुक गया हो' }
    ],
    faqs: [
      {
        qEn: 'Are the remedies expensive or hard to perform?',
        qHi: 'क्या ये उपाय महंगे या कठिन होते हैं?',
        aEn: 'No! Master Randhir Singh never prescribes costly gemstones or fear-based rituals. All remedies use natural elements, colors, charity, and simple daily consciousness adjustments.',
        aHi: 'बिल्कुल नहीं! मास्टर रणधीर सिंह जी कभी भी महंगे रत्नों या भयभीत करने वाले अनुष्ठानों की सलाह नहीं देते। सभी उपाय सरल, सात्विक एवं घर पर आसानी से किए जाने योग्य होते हैं।'
      }
    ]
  },
  10: {
    id: 10,
    slug: 'service-10',
    badge: 'Compatibility Tool',
    titleEn: 'Grid Matching (Marriage, Business Partners, Employees)',
    titleHi: 'ग्रिड मिलान (विवाह, व्यापारिक साझेदार, कर्मचारी)',
    category: 'numerology',
    iconName: 'Users',
    suggestedTariff: '₹3,100',
    taglineEn: 'Cross-analyzing two or more Lo-Shu charts to verify karmic synergy, trust, and mutual growth.',
    taglineHi: 'विवाह, व्यापार साझेदारी अथवा मुख्य कर्मचारियों के चयन हेतु 36-बिंदु वैज्ञानिक ग्रिड मिलान।',
    shortDesc: 'Cross-analyzing two or more Lo-Shu charts to verify karmic synergy, trust, and mutual growth.',
    fullDescEn: 'A partnership—whether matrimonial or commercial—is an energetic merger of two distinct vibrational fields. Traditional astrology often limits compatibility to Moon signs, overlooking the vital day-to-day behavioral and financial interactions. Master Randhir Singh cross-analyzes the 3x3 Lo-Shu grids of both individuals to evaluate mutual compatibility: identifying complementary numbers that fill each other’s voids, warning against destructive enemy clashes, and calculating a 36-point compatibility index for long-term trust, prosperity, and peace.',
    fullDescHi: 'साझेदारी—चाहे वैवाहिक हो या व्यापारिक—दो भिन्न ऊर्जा क्षेत्रों का परस्पर सम्मिलन है। केवल राशि मिलान अक्सर व्यावहारिक स्वभाव व आर्थिक तालमेल को स्पष्ट नहीं कर पाता। मास्टर रणधीर सिंह जी दोनों व्यक्तियों के 3x3 लो-शू ग्रिड का तुलनात्मक अध्ययन कर यह देखते हैं कि क्या एक के अंक दूसरे के रिक्त स्थानों को पूर्ण कर रहे हैं, या दोनों के बीच गंभीर ग्रहीय टकराव है। इससे 36-गुणांक वैज्ञानिक इंडेक्स तैयार कर दीर्घकालिक सफलता सुनिश्चित की जाती है।',
    sciencePrinciples: [
      {
        titleEn: 'Grid Void Complementarity',
        titleHi: 'ग्रिड रिक्तियों का पारस्परिक पूरक सिद्धांत',
        descEn: 'If Partner A lacks number 5 (stability) but Partner B has a strong 5, the union balances both. If both lack the same numbers, the joint venture faces severe vulnerability.',
        descHi: 'यदि एक के पास अंक 5 (स्थिरता) नहीं है और दूसरे के पास है, तो दोनों मिलकर पूर्ण होते हैं। यदि दोनों में एक ही अंक गायब हो, तो विशेष उपाय आवश्यक होते हैं।'
      },
      {
        titleEn: 'Driver-Conductor Cross Resonance',
        titleHi: 'मूलांक-भाग्यांक का द्विपक्षीय तालमेल',
        descEn: 'Evaluating mutual harmony across 4 critical axes: Intellectual resonance, Emotional vulnerability, Financial trust, and Physical longevity.',
        descHi: 'बौद्धिक समझ, भावनात्मक संवेदनशीलता, आर्थिक ईमानदारी एवं दांपत्य सुख—इन 4 आधारों पर गहन परीक्षण।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Dual Lo-Shu Synastry Comparative Report',
        titleHi: 'तुलनात्मक लो-शू ग्रिड मिलान पत्रक',
        descEn: 'Side-by-side visual chart showing shared yogas, opposing elements, and compatibility score out of 36.',
        descHi: 'दोनों व्यक्तियों के ग्रिड की आमने-सामने तुलना, संयुक्त राजयोग एवं 36 में से प्राप्त गुणांक रिपोर्ट।'
      },
      {
        titleEn: 'Remedial Harmony Protocol',
        titleHi: 'पारस्परिक तालमेल वृद्धि हेतु उपाय',
        descEn: 'If clashes exist, specific spatial, color, and communication remedies to neutralize interpersonal friction.',
        descHi: 'यदि कोई वैचारिक टकराव हो, तो उसे दूर करने हेतु शयनकक्ष व कार्यस्थल में अपनाए जाने वाले सरल उपाय।'
      }
    ],
    benefits: [
      { titleEn: 'Prevents Catastrophic Business Partnership Breakups', titleHi: 'व्यापारिक धोखे व पार्टनरशिप टूटने से पूर्ण सुरक्षा', icon: 'Shield' },
      { titleEn: 'Guarantees Matrimonial Emotional Understanding', titleHi: 'दांपत्य जीवन में गहरा विश्वास एवं प्रेम', icon: 'Heart' },
      { titleEn: 'Identifies Key Complementary Roles for Employees', titleHi: 'कर्मचारियों की सही जिम्मेदारी का सटीक चयन', icon: 'Users' }
    ],
    whoNeedsThis: [
      { en: 'Couples and families evaluating marriage proposals before finalizing engagements', hi: 'विवाह पक्का करने से पूर्व वर-वधू की वास्तविक मानसिक व भाग्य अनुकूलता जानने वाले परिवार' },
      { en: 'Entrepreneurs signing joint ventures or taking on equity business partners', hi: 'व्यापारी जो नया पार्टनर जोड़ रहे हैं या बड़े निवेश की साझेदारी कर रहे हैं' }
    ],
    faqs: [
      {
        qEn: 'What if our compatibility score is low but we really want to marry?',
        qHi: 'यदि मिलान कम आए परंतु हम विवाह करना चाहते हों तो?',
        aEn: 'Master Randhir Singh specializes in non-invasive Vedic and color adjustments that bridge energetic gaps, allowing couples to thrive harmoniously despite chart differences.',
        aHi: 'मास्टर रणधीर सिंह जी ऐसे विशेष उपचारात्मक उपाय प्रदान करते हैं, जिससे ग्रहीय भिन्नताओं के बावजूद दांपत्य में सामंजस्य स्थापित किया जा सकता है।'
      }
    ]
  },
  11: {
    id: 11,
    slug: 'service-11',
    badge: 'Daily Practice',
    titleEn: 'Health Switch Words',
    titleHi: 'स्वास्थ्य स्विच वर्ड्स (Divine Switchwords)',
    category: 'healing',
    iconName: 'Volume2',
    suggestedTariff: '₹1,500',
    taglineEn: 'High-frequency verbal switchwords that bypass subconscious resistance to accelerate wellness.',
    taglineHi: 'अवचेतन मन के अवरोधों को भेदकर त्वरित स्वास्थ्य लाभ एवं तनावमुक्ति देने वाले दिव्य स्विचवर्ड्स।',
    shortDesc: 'High-frequency verbal switchwords that bypass subconscious resistance to accelerate wellness.',
    fullDescEn: 'Switchwords are single-word verbal energetic keys that communicate directly with the subconscious mind, bypassing conscious doubt, anxiety, and mental resistance. Discovered by James T. Mangan and integrated with Vedic acoustic science, switchwords like GOLDEN SUNRISE, RESTORE, CANCEL-CLEAR, and DIVINE LIGHT shift cellular vibration within minutes. Master Randhir Singh formulates personalized switchword combinations and energy circles (EC) tailored to your specific physical ailments, sleep disorders, or emotional stress.',
    fullDescHi: 'स्विचवर्ड्स वे शक्तिशाली एकल शब्द हैं जो सचेतन मन के संशय एवं चिंता को पार कर सीधे अवचेतन मन में परिवर्तन लाते हैं। वैदिक नाद विज्ञान एवं आधुनिक मनोविज्ञान के समन्वय से बने ये दिव्य शब्द—जैसे GOLDEN SUNRISE, RESTORE, CANCEL-CLEAR, DIVINE LIGHT—शरीर की ऊर्जा में तुरंत सकारात्मक बदलाव लाते हैं। मास्टर रणधीर सिंह जी आपकी शारीरिक व्याधि, अनिद्रा अथवा मानसिक तनाव के अनुसार व्यक्तिगत स्विचवर्ड्स एवं एनर्जी सर्कल प्रदान करते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'Acoustic Subconscious Neurological Bypassing',
        titleHi: 'ध्वनि तरंगों द्वारा अवचेतन का त्वरित जाग्रत होना',
        descEn: 'Unlike lengthy affirmations that the logical mind disputes, a switchword directly flips the neural switch in the limbic system to trigger cellular recovery.',
        descHi: 'लंबे वाक्यों पर हमारा तार्किक मन संदेह करता है, जबकि एकल स्विचवर्ड सीधे तंत्रिका तंत्र को स्वास्थ्य का संदेश देता है।'
      },
      {
        titleEn: 'Energy Circles (EC) Water Charging',
        titleHi: 'एनर्जी सर्कल एवं जल अभिमंत्रित विधि',
        descEn: 'Writing the switchword inside a consecrated circular geometry and placing a water glass over it imprints memory crystals with healing frequencies.',
        descHi: 'कागज पर एनर्जी सर्कल बनाकर उस पर जल का पात्र रखने से जल में वह सकारात्मक आवृत्ति समाहित हो जाती है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Personalized Health Switchword Prescription',
        titleHi: 'व्यक्तिगत स्वास्थ्य स्विचवर्ड पत्रक',
        descEn: 'Targeted single words and paired sequences calibrated to your health concern.',
        descHi: 'आपकी स्वास्थ्य समस्या के सटीक निवारण हेतु चयनित विशिष्ट स्विचवर्ड्स।'
      },
      {
        titleEn: 'Chanting & Energy Circle Protocol',
        titleHi: 'जप एवं एनर्जी सर्कल निर्माण विधि',
        descEn: 'Guide on chanting counts (28x or 108x daily), water charging, and visualization.',
        descHi: 'प्रतिदिन 28 या 108 बार जप करने, जल चार्ज करने एवं लिखने की सरल विधि।'
      }
    ],
    benefits: [
      { titleEn: 'Relieves Acute Stress & Headaches Within Minutes', titleHi: 'सिरदर्द, बेचैनी व तनाव में मिनटों में राहत', icon: 'Zap' },
      { titleEn: 'Accelerates Natural Bodily Recovery', titleHi: 'शरीर की प्राकृतिक रोग-निवारक शक्ति में वृद्धि', icon: 'Heart' },
      { titleEn: 'Effortless Practice with Zero Side Effects', titleHi: 'बिना किसी दुष्प्रभाव के अत्यंत सरल व सुलभ अभ्यास', icon: 'Sparkles' }
    ],
    whoNeedsThis: [
      { en: 'Individuals suffering from chronic insomnia, panic attacks, or daily work-induced anxiety', hi: 'जो अनिद्रा, घबराहट या अत्यधिक मानसिक कार्यभार से परेशान रहते हैं' },
      { en: 'Anyone seeking a fast, portable verbal frequency tool that can be used anywhere, anytime', hi: 'जो कहीं भी, कभी भी प्रयोग किए जा सकने वाले सरल ऊर्जा उपाय की तलाश में हैं' }
    ],
    faqs: [
      {
        qEn: 'Do I have to believe in them for switchwords to work?',
        qHi: 'क्या स्विचवर्ड्स के काम करने के लिए अत्यधिक विश्वास होना जरूरी है?',
        aEn: 'No! Switchwords operate on acoustic resonance rather than belief. Simply chanting or writing them consistently produces measurable biofield calming effects.',
        aHi: 'नहीं! स्विचवर्ड्स विश्वास पर नहीं बल्कि ध्वनि के भौतिक प्रभाव पर काम करते हैं। केवल शांत भाव से इनका जप करने पर भी औरा शांत होता है।'
      }
    ]
  },
  12: {
    id: 12,
    slug: 'service-12',
    badge: 'Energetic Care',
    titleEn: 'S. Healings (Spiritual & Pranic Healings)',
    titleHi: 'एस. हीलिंग्स (आध्यात्मिक व प्राणिक उपचार)',
    category: 'healing',
    iconName: 'Sun',
    suggestedTariff: '₹3,500',
    taglineEn: 'Distance and in-person Pranic and spiritual energy alignment to clear etheric blockages.',
    taglineHi: 'सूक्ष्म प्राणिक ऊर्जा द्वारा चक्रों की शुद्धि, मानसिक शांति एवं दूरस्थ ऊर्जा उपचार।',
    shortDesc: 'Distance and in-person Pranic and spiritual energy alignment to clear etheric blockages.',
    fullDescEn: 'Before an illness or distress manifests in the physical flesh, it appears as an energetic congestion or depletion in the subtle etheric bioplasmic body (Pranamaya Kosha). In S. Healings sessions, Master Randhir Singh projects pure spiritual and Pranic prana to sweep away dirty, diseased energy from the 11 major chakras, dissolving emotional grief, energetic cords, and psychic exhaustion. Sessions are conducted both in-person at his peaceful Jaipur sanctuary and remotely across distances for seekers worldwide.',
    fullDescHi: 'किसी भी रोग या अशांति के भौतिक शरीर में प्रकट होने से पहले, वह हमारे सूक्ष्म प्राणमय शरीर (चक्रों व नाड़ियों) में ऊर्जा अवरोध के रूप में दिखाई देती है। एस. हीलिंग्स सत्र में मास्टर रणधीर सिंह जी शुद्ध प्राणिक एवं आध्यात्मिक ऊर्जा का संप्रेषण कर 11 प्रमुख चक्रों की शुद्धि करते हैं। इससे पुराना मानसिक अवसाद, नकारात्मक विचार एवं ऊर्जा की कमी दूर होती है। यह उपचार जयपुर केंद्र पर अथवा देश-विदेश में दूरस्थ (Distance Healing) माध्यम से संपन्न होता है।',
    sciencePrinciples: [
      {
        titleEn: 'Bioplasmic Body Sweeping & Energizing',
        titleHi: 'प्राणमय शरीर की शुद्धि एवं ऊर्जा भरण',
        descEn: 'Cleansing (sweeping) removes blocked contaminated energy; energizing infuses fresh golden and violet prana to speed up natural recuperation.',
        descHi: 'पहले दूषित ऊर्जा को हटाया जाता है, फिर ताजा प्राण ऊर्जा भरकर शरीर के प्राकृतिक उपचार को तीव्र किया जाता है।'
      },
      {
        titleEn: 'Quantum Non-Local Distance Healing',
        titleHi: 'क्वांटम नॉन-लोकल दूरस्थ उपचार विज्ञान',
        descEn: 'Energy is not bound by physical distance. Through focused meditative intent and photographic connection, healing transcends geographical borders.',
        descHi: 'प्राण ऊर्जा भौतिक दूरी से बंधी नहीं है। ध्यान व संकल्प द्वारा सात समंदर पार भी रोगी को स्वस्थ किया जा सकता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Full 11-Chakra Diagnostic Assessment',
        titleHi: '11 प्रमुख चक्रों का ऊर्जा परीक्षण',
        descEn: 'Status report on which chakras are congested, depleted, or over-activated.',
        descHi: 'किस चक्र में ऊर्जा अवरुद्ध है और किसमें क्षीण है, इसका स्पष्ट विवरण।'
      },
      {
        titleEn: 'Consecutive Healing Sessions & Aura Shield',
        titleHi: 'हीलिंग सत्र एवं औरा रक्षा कवच',
        descEn: 'Dedicated spiritual healing transmission accompanied by an etheric auric shield to prevent vulnerability.',
        descHi: 'नियमित हीलिंग सत्र तथा बाहरी नकारात्मकता से रक्षा हेतु अभिमंत्रित सुरक्षा आवरण।'
      }
    ],
    benefits: [
      { titleEn: 'Dissolves Deep Emotional Trauma & Grief', titleHi: 'गहरे मानसिक तनाव, शोक एवं अवसाद से मुक्ति', icon: 'Heart' },
      { titleEn: 'Replenishes Depleted Vitality & Stamina', titleHi: 'शरीर में नई ताजगी, स्फूर्ति एवं सकारात्मकता', icon: 'Sun' },
      { titleEn: 'Accelerates Recovery Alongside Medical Care', titleHi: 'चिकित्सीय इलाज के साथ-साथ त्वरित स्वास्थ्य लाभ', icon: 'Sparkles' }
    ],
    whoNeedsThis: [
      { en: 'Individuals recovering from severe emotional heartbreak, burnout, or bereavement', hi: 'जो मानसिक आघात, अत्यधिक काम के दबाव या पारिवारिक शोक से उबरने का प्रयास कर रहे हैं' },
      { en: 'Patients undergoing prolonged medical treatments seeking complementary energetic rejuvenation', hi: 'जो लंबे समय से किसी बीमारी का इलाज करा रहे हैं और ऊर्जा की कमी महसूस करते हैं' }
    ],
    faqs: [
      {
        qEn: 'Does Pranic Healing replace medical doctors?',
        qHi: 'क्या प्राणिक हीलिंग डॉक्टरी इलाज का विकल्प है?',
        aEn: 'No. Master Randhir Singh emphasizes that S. Healings is a complementary spiritual therapy that supports medical science, never replacing your certified physician’s advice.',
        aHi: 'नहीं! मास्टर रणधीर सिंह जी सदैव स्पष्ट करते हैं कि यह पूरक आध्यात्मिक चिकित्सा है, जो डॉक्टरी दवाओं के प्रभाव को बढ़ाती है, उनका स्थान नहीं लेती।'
      }
    ]
  },
  13: {
    id: 13,
    slug: 'service-13',
    badge: 'Sacred Science',
    titleEn: 'Healing Codes (Sacred Numerical Sequences)',
    titleHi: 'हीलिंग कोड्स (पवित्र संख्यात्मक अनुक्रम)',
    category: 'healing',
    iconName: 'Binary',
    suggestedTariff: '₹1,800',
    taglineEn: 'Sacred numerical frequencies (Grabovoi & Divine Codes) for targeted energetic restoration.',
    taglineHi: 'ग्रैबोवोई एवं वैदिक दिव्य संख्यात्मक अनुक्रमों द्वारा धन, स्वास्थ्य व मनोकामना पूर्ति।',
    shortDesc: 'Sacred numerical frequencies (Grabovoi & Divine Codes) for targeted energetic restoration.',
    fullDescEn: 'Everything in the cosmos—from the orbit of Jupiter to the DNA helix—is constructed upon sacred mathematical ratios. Healing Codes (including the acclaimed sequences of Dr. Grigori Grabovoi and ancient Vedic numerical mantras) are specific numerical vibrations that restore distorted biophysical frequencies back to the divine norm. Master Randhir Singh provides verified codes (such as 520 741 8 for unexpected cash inflows, 1814321 for overall health restoration, and 8888 for divine protection), complete with exact methods for writing on wrist pulse points, charging water, and silent mental visualization.',
    fullDescHi: 'समस्त ब्रह्मांड—तारों की गति से लेकर हमारे डीएनए तक—पवित्र गणितीय अनुपातों पर आधारित है। हीलिंग कोड्स (जिनमें डॉ. ग्रिगोरी ग्रैबोवोई के विश्वप्रसिद्ध कोड्स एवं वैदिक संख्यात्मक मंत्र शामिल हैं) वे विशिष्ट आवृत्तियां हैं जो जीवन की विकृत ऊर्जा को पुनः संतुलित करती हैं। मास्टर रणधीर सिंह जी प्रामाणिक कोड्स (जैसे अप्रत्याशित धन आगमन हेतु 520 741 8, सम्पूर्ण स्वास्थ्य हेतु 1814321, तथा दिव्य सुरक्षा हेतु 8888) प्रदान करते हैं, जिन्हें बाईं कलाई पर लिखने, जल चार्ज करने एवं ध्यान करने की सटीक विधि सिखाई जाती है।',
    sciencePrinciples: [
      {
        titleEn: 'Numerical Frequency Resonator Theory',
        titleHi: 'संख्यात्मक आवृत्ति अनुनाद का नियम',
        descEn: 'Each digit emits a precise micro-hertz frequency. When spoken with deliberate rhythmic pauses (e.g. 5-2-0 [pause] 7-4-1 [pause] 8), the sequence retunes your biofield.',
        descHi: 'प्रत्येक अंक एक निश्चित सूक्ष्म तरंग उत्पन्न करता है। विराम के साथ इनका उच्चारण करने पर औरा में तुरंत खिंचाव व सक्रियता आती है।'
      },
      {
        titleEn: 'Left-Side Pulse Writing Conduit',
        titleHi: 'बाईं कलाई नाड़ी पर अंक अंकन का प्रभाव',
        descEn: 'Writing the code with blue or green ink on the left inner wrist allows the subconscious to process the frequency continuously as blood circulates.',
        descHi: 'बाईं कलाई पर नीले या हरे पेन से कोड लिखने से रक्त संचार के साथ अवचेतन मन उस आवृत्ति को ग्रहण करता रहता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Personalized Healing Codes Prescription Sheet',
        titleHi: 'व्यक्तिगत हीलिंग कोड्स निर्देश पत्रक',
        descEn: 'Curated list of 5 to 7 high-potency codes matched to your current life priority.',
        descHi: 'आपकी वर्तमान प्राथमिकता के अनुसार 5 से 7 शक्तिशाली कोड्स की सूची।'
      },
      {
        titleEn: 'Water Bottle Frequency Charging Sticker Guide',
        titleHi: 'जल बोतल चार्जिंग एवं विज़ुअलाइज़ेशन विधि',
        descEn: 'Exact formatting for writing codes on clear glass water bottles to energize your daily drinking water.',
        descHi: 'कांच की बोतल पर कोड लिखकर जल को अभिमंत्रित कर पीने की वैज्ञानिक विधि।'
      }
    ],
    benefits: [
      { titleEn: 'Accelerates Unexpected Financial Inflows', titleHi: 'अप्रत्याशित धन लाभ एवं आर्थिक राहत', icon: 'Coins' },
      { titleEn: 'Soothes Acute Bodily Discomfort', titleHi: 'शारीरिक कष्ट एवं दर्द में सुखद कमी', icon: 'Heart' },
      { titleEn: 'Creates a Protective Energetic Cocoon', titleHi: 'सुरक्षात्मक दिव्य ऊर्जा आवरण का निर्माण', icon: 'Shield' }
    ],
    whoNeedsThis: [
      { en: 'Individuals struggling with stubborn financial logjams or pending legal settlements', hi: 'जो लंबे समय से अटके हुए धन या अदालती मामलों से परेशान हैं' },
      { en: 'Anyone interested in cutting-edge vibrational frequency tools that cost nothing to practice', hi: 'जो बिना किसी खर्च के आधुनिक क्वांटम हीलिंग विधियों का लाभ लेना चाहते हैं' }
    ],
    faqs: [
      {
        qEn: 'Can I use multiple codes at the same time?',
        qHi: 'क्या मैं एक साथ कई कोड्स का उपयोग कर सकता हूँ?',
        aEn: 'It is recommended to focus on 1 or 2 primary codes at a time to keep your subconscious focus sharp and concentrated for maximum manifestation power.',
        aHi: 'सर्वोत्तम परिणामों हेतु एक समय में 1 या 2 मुख्य कोड्स पर ही ध्यान केंद्रित करना चाहिए ताकि ऊर्जा का बिखराव न हो।'
      }
    ]
  },
  14: {
    id: 14,
    slug: 'service-14',
    badge: 'Sacred Geometry',
    titleEn: 'Yantras Based on Your Date of Birth',
    titleHi: 'जन्म तिथि आधारित वैदिक यंत्र',
    category: 'yantra',
    iconName: 'Grid',
    suggestedTariff: '₹5,100',
    taglineEn: 'Authentic 3x3 planetary numerical magic square yantras prepared for your weakest or ruling planets.',
    taglineHi: 'आपकी जन्म तिथि के अनुसार तैयार किए जाने वाले 3x3 नवग्रह भोजपत्र एवं तांबे के सिद्ध यंत्र।',
    shortDesc: 'Authentic 3x3 planetary numerical magic square yantras prepared for your weakest or ruling planets.',
    fullDescEn: 'A Yantra is a physical cosmic antenna inscribed with sacred geometric and numerical codes. In Vedic numerology, every planet—from Surya (Sum 15) and Chandra (Sum 18) to Brihaspati (Sum 27) and Shukra (Sum 30)—has an authentic 3x3 planetary numerical magic square. Master Randhir Singh calculates your exact ruling planet and identifies the weakest planet in your birth chart, inscribing the corresponding authentic yantra on consecrated Bhojpatra (sacred birch bark) or pure copper plates, empowered through Prana Pratishtha rituals.',
    fullDescHi: 'यंत्र एक भौतिक ब्रह्मांडीय एंटीना है जो शुभ ग्रहीय तरंगों को आकर्षित करता है। वैदिक अंक ज्योतिष में प्रत्येक ग्रह का एक प्रामाणिक 3x3 संख्यात्मक जादुई वर्ग होता है—जैसे सूर्य यंत्र (योग 15), चंद्र यंत्र (योग 18), गुरु यंत्र (योग 27), तथा शुक्र यंत्र (योग 30)। मास्टर रणधीर सिंह जी आपकी जन्म तिथि के अनुसार आपके कमजोर व कारक ग्रह का निर्धारण कर, पवित्र भोजपत्र अथवा शुद्ध तांबे पर हस्तलिखित यंत्र तैयार कर वैदिक प्राण-प्रतिष्ठा करते हैं।',
    sciencePrinciples: [
      {
        titleEn: 'The Invariant Mathematical Sum of Planetary Squares',
        titleHi: 'नवग्रह यंत्रों का स्थिर गणितीय योग',
        descEn: 'Every planetary yantra possesses a sacred immutable sum. In Surya Yantra, every row, column, and diagonal equals exactly 15; in Brihaspati Yantra, every line equals 27.',
        descHi: 'प्रत्येक ग्रह यंत्र का योग स्थिर होता है: सूर्य यंत्र में प्रत्येक पंक्ति 15, तथा गुरु यंत्र में प्रत्येक पंक्ति का योग ठीक 27 होता है।'
      },
      {
        titleEn: 'Ashta-Gandha & Bhojpatra Consecration',
        titleHi: 'अष्टगंध एवं भोजपत्र प्राण-प्रतिष्ठा',
        descEn: 'Inscribing the matrix using natural Pomegranate stylus (Anar kalam) and Ashta-Gandha ink during the planet’s auspicious Hora locks in living spiritual prana.',
        descHi: 'अनार की कलम व अष्टगंध की स्याही से शुभ होरा में भोजपत्र पर यंत्र लिखने से उसमें सजीव ऊर्जा प्रतिष्ठित होती है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Hand-Inscribed Energized Bhojpatra Yantra',
        titleHi: 'हस्तलिखित सिद्ध भोजपत्र यंत्र',
        descEn: 'Laminated or framed sacred birch-bark yantra personally inscribed and energized with your name and gotra.',
        descHi: 'आपके नाम व गोत्र से अभिमंत्रित, फ्रेम अथवा लैमिनेटेड पवित्र भोजपत्र यंत्र।'
      },
      {
        titleEn: 'Placement & Seed Mantra Protocol',
        titleHi: 'स्थापना दिशा एवं बीज मंत्र जप विधि',
        descEn: 'Exact compass direction for your altar/wallet and accompanying daily 11-time beeja mantra.',
        descHi: 'घर के पूजा स्थल या पर्स में रखने की दिशा तथा दैनिक 11 बार जपे जाने वाले बीज मंत्र की विधि।'
      }
    ],
    benefits: [
      { titleEn: 'Strengthens Weak & Debilitated Ruling Planets', titleHi: 'कुंडली के निर्बल व अस्त ग्रहों को बल प्रदान करना', icon: 'Sun' },
      { titleEn: 'Forms a Shield Against Planetary Transits', titleHi: 'शनि की साढ़ेसाती व राहु के कष्टों से अभेद्य सुरक्षा', icon: 'Shield' },
      { titleEn: 'Channels Constant Divine Grace into the Household', titleHi: 'घर में निरंतर सुख, शांति एवं समृद्धि का वास', icon: 'Sparkles' }
    ],
    whoNeedsThis: [
      { en: 'Seekers whose charts show weak Sun (lack of confidence/fame) or afflicted Jupiter (financial stalls)', hi: 'जिनका सूर्य कमजोर होने से मान-सम्मान में कमी हो या गुरु कमजोर होने से धन न टिकता हो' },
      { en: 'Anyone seeking a lifelong authentic Vedic yantra instead of mass-produced plastic replicas', hi: 'जो बाजार के नकली प्रिंटेड यंत्रों के स्थान पर प्रामाणिक हस्तलिखित यंत्र चाहते हैं' }
    ],
    faqs: [
      {
        qEn: 'How long does a Bhojpatra Yantra retain its energy?',
        qHi: 'भोजपत्र यंत्र की ऊर्जा कितने समय तक सक्रिय रहती है?',
        aEn: 'A properly consecrated Bhojpatra yantra remains active for years. Master Randhir Singh includes simple periodic incense and mantra rejuvenation instructions.',
        aHi: 'प्राण-प्रतिष्ठित भोजपत्र यंत्र वर्षों तक सक्रिय रहता है। इसे केवल समय-समय पर अगरबत्ती व दीपक का दर्शन कराना पर्याप्त होता है।'
      }
    ]
  },
  15: {
    id: 15,
    slug: 'service-15',
    badge: 'High Potency',
    titleEn: 'Special Yantras (Job Promotions, Special Desires, Business)',
    titleHi: 'विशेष यंत्र (पदोन्नति, मनोरथ सिद्धि, व्यापार वृद्धि)',
    category: 'yantra',
    iconName: 'Trophy',
    suggestedTariff: '₹7,100',
    taglineEn: 'Dedicated Sri Yantra, Kuber Yantra (Sum 72), and Vyapar Vridhi Yantras for major life triumphs.',
    taglineHi: 'कुबेर महायंत्र (योग 72), श्री महालक्ष्मी यंत्र एवं व्यापार वृद्धि यंत्र द्वारा असाधारण सफलता।',
    shortDesc: 'Dedicated Sri Yantra, Kuber Yantra (Sum 72), and Vyapar Vridhi Yantras for major life triumphs.',
    fullDescEn: 'When facing monumental life goals—such as clearing competitive government examinations, winning massive corporate tenders, acquiring commercial property, or breaking out of generational debt—standard remedies must be elevated to High-Potency Special Yantras. Master Randhir Singh crafts and consecrates three supreme specialized yantras: The sacred Kuber Yantra (where every row sums to the master wealth frequency 72), the authentic Vyapar Vridhi Yantra for sales acceleration, and the Sarva Karya Siddhi Yantra for fulfilling cherished life desires.',
    fullDescHi: 'जब जीवन में कोई बहुत बड़ा लक्ष्य हो—जैसे सरकारी नौकरी, प्रतियोगी परीक्षा, बड़ा व्यापारिक टेंडर, भूमि-भवन क्रय, या पुराने कर्ज से मुक्ति—तब उच्च शक्ति वाले विशेष यंत्रों की आवश्यकता होती है। मास्टर रणधीर सिंह जी तीन सर्वोच्च विशेष यंत्र सिद्ध करते हैं: कुबेर महायंत्र (जिसमें प्रत्येक पंक्ति का योग 72 होता है जो कुबेर का धन अंक है), व्यापार वृद्धि यंत्र (व्यापारिक बिक्री बढ़ाने हेतु), तथा सर्व कार्य सिद्धि यंत्र (मनवांछित मनोरथों को पूर्ण करने हेतु)।',
    sciencePrinciples: [
      {
        titleEn: 'The Kuber Sum 72 Matrix Frequency',
        titleHi: 'कुबेर यंत्र योग 72 का अद्भुत रहस्य',
        descEn: 'The 3x3 Kuber square (24, 28, 20, etc.) maintains the constant mathematical sum of 72. In esoteric numerology, 72 (7+2=9) represents Mars-Kuber unstoppable wealth manifestation.',
        descHi: 'कुबेर यंत्र की प्रत्येक पंक्ति का योग 72 होता है। 7+2=9 पूर्ण अंक है जो धन के अवरोधों को तोड़कर आकस्मिक लाभ कराता है।'
      },
      {
        titleEn: 'Directional Installation in North / Kuber Sector',
        titleHi: 'उत्तर दिशा (कुबेर स्थान) में प्राण-प्रतिष्ठा',
        descEn: 'Installed in the true North of a commercial office, cash safe, or billing counter, these yantras redirect cosmic wealth prana straight into cash flow.',
        descHi: 'व्यापारिक प्रतिष्ठान या घर के उत्तर कोने अथवा तिजोरी में रखने से धन का प्रवाह निरंतर बना रहता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Empowered Heavy-Gauge Copper / Bhojpatra Yantra',
        titleHi: 'सिद्ध शुद्ध तांबे अथवा भोजपत्र पर विशेष यंत्र',
        descEn: 'Hand-crafted high-potency yantra energized through 108 japa cycles of the specific deity beeja mantra.',
        descHi: '108 विशिष्ट बीज मंत्रों द्वारा अभिमंत्रित एवं प्राण-प्रतिष्ठित प्रभावशाली यंत्र।'
      },
      {
        titleEn: 'Installation Muhurta & Cash Safe Alignment Guide',
        titleHi: 'तिजोरी स्थापना मुहूर्त एवं दिशा निर्देश',
        descEn: 'Precise timings to place the yantra inside your business locker or cashier counter.',
        descHi: 'दुकान की तिजोरी, गल्ले अथवा पूजा स्थान में स्थापित करने का शुभ समय।'
      }
    ],
    benefits: [
      { titleEn: 'Unlocks Heavy Stagnant Commercial Sales', titleHi: 'व्यापार में भारी ग्राहक आवक एवं मुनाफे में उछाल', icon: 'Briefcase' },
      { titleEn: 'Aids Rapid Executive Promotion & Job Selection', titleHi: 'पदोन्नति, उच्च पद एवं प्रतियोगी परीक्षाओं में सफलता', icon: 'Award' },
      { titleEn: 'Fulfills Deeply Cherished Long-Pending Desires', titleHi: 'लंबे समय से अटके विशेष मनोरथों की शीघ्र सिद्धि', icon: 'Trophy' }
    ],
    whoNeedsThis: [
      { en: 'Business owners with high fixed overheads striving to double client footfall and billings', hi: 'व्यापारी एवं उद्योगपति जो बिक्री बढ़ाकर व्यापार को नई ऊँचाइयों पर ले जाना चाहते हैं' },
      { en: 'Aspirants preparing for competitive civil services, judiciary, or executive promotion boards', hi: 'प्रतियोगी परीक्षाओं की तैयारी कर रहे छात्र एवं अधिकारी जो पदोन्नति की प्रतीक्षा में हैं' }
    ],
    faqs: [
      {
        qEn: 'Where should the Kuber Yantra be placed?',
        qHi: 'कुबेर यंत्र को कहाँ स्थापित करना चाहिए?',
        aEn: 'The ideal location is the North wall of your business, inside the cash drawer facing North, or at your home prayer sanctuary facing East.',
        aHi: 'इसे व्यापारिक प्रतिष्ठान की उत्तर दिशा में, तिजोरी/गल्ले में, या घर के मंदिर में स्थापित करना सर्वोत्तम होता है।'
      }
    ]
  },
  16: {
    id: 16,
    slug: 'service-16',
    badge: 'Earth Energy',
    titleEn: 'Best Crystals for Your Profession & Growth',
    titleHi: 'व्यवसाय व प्रगति हेतु सर्वश्रेष्ठ क्रिस्टल व रत्न',
    category: 'crystal',
    iconName: 'Gem',
    suggestedTariff: '₹2,500',
    taglineEn: 'Profession-matched gemstones and crystal bracelets (Pyrite, Citrine, Aventurine, Amethyst).',
    taglineHi: 'आपके पेशे एवं जन्म तिथि के अनुकूल प्राकृतिक क्रिस्टल ब्रेसलेट (पायराइट, सिट्रीन, एवेंच्यूरिन)।',
    shortDesc: 'Profession-matched gemstones and crystal bracelets (Pyrite, Citrine, Aventurine, Amethyst).',
    fullDescEn: 'Crystals are Mother Earth’s most stable crystalline resonators, formed over millions of years under extreme telluric pressure. Wearing the wrong crystal can scatter your energy, while wearing the correct profession-matched gemstone acts like a precision psychic amplifier. Master Randhir Singh evaluates your occupation—matching Iron Pyrite (Fool’s Gold) for entrepreneurs needing cash liquidity, Citrine for merchants, Green Aventurine for new venture luck, Amethyst for stressful professions, and Tiger Eye for bold decision-making—complete with salt cleansing and sun/moon charging protocols.',
    fullDescHi: 'क्रिस्टल पृथ्वी की सबसे स्थिर प्राकृतिक संरचनाएं हैं जो लाखों वर्षों के भूगर्भीय दबाव से बनती हैं। गलत क्रिस्टल पहनने से ऊर्जा बिखर सकती है, जबकि अपने पेशे एवं मूलांक के अनुकूल सही क्रिस्टल धारण करने से अद्भुत सफलता मिलती है। मास्टर रणधीर सिंह जी आपके कार्यक्षेत्र के अनुसार चयन करते हैं: व्यापारियों हेतु पायराइट (धन आकर्षण), दुकानदारों हेतु सिट्रीन (व्यापार वृद्धि), नए प्रोजेक्ट्स हेतु ग्रीन एवेंच्यूरिन (सौभाग्य), तथा तनावग्रस्त व्यक्तियों हेतु अमेथिस्ट। साथ ही लवण शुद्धि व धूप-दीप से चार्ज करने की विधि भी सिखाई जाती है।',
    sciencePrinciples: [
      {
        titleEn: 'Piezoelectric Micro-Current Amplification',
        titleHi: 'क्रिस्टल का पीजोइलेक्ट्रिक ऊर्जा प्रवाह',
        descEn: 'Natural quartz crystals emit subtle micro-currents when touching human skin, tuning your body’s nervous frequency to abundance vibrations.',
        descHi: 'त्वचा के संपर्क में आने पर प्राकृतिक क्रिस्टल सूक्ष्म तरंगें छोड़ते हैं जो मन को एकाग्र व औरा को चमकीला बनाती हैं।'
      },
      {
        titleEn: 'Salt Purification & Solar/Lunar Activation',
        titleHi: 'लवण शोधन एवं सूर्य-चंद्र प्राण-प्रतिष्ठा',
        descEn: 'Crystals must be purified in natural rock salt to dissolve past handling memories, followed by early morning solar exposure to awaken vitality.',
        descHi: 'धारण करने से पूर्व क्रिस्टल को सेंधा नमक में रखकर पुरानी ऊर्जा साफ की जाती है, फिर सूर्य की पहली किरणों में चार्ज किया जाता है।'
      }
    ],
    deliverables: [
      {
        titleEn: 'Profession-Matched Crystal Selection Blueprint',
        titleHi: 'पेशा-आधारित क्रिस्टल चयन मार्गदर्शन पत्रक',
        descEn: 'Exact crystal stones, bead sizes (8mm/10mm), and hand orientation (Left wrist for receiving vs Right for giving).',
        descHi: 'आपके लिए उपयुक्त क्रिस्टल, मनकों का आकार तथा किस हाथ की कलाई पर पहनना है, इसका स्पष्ट निर्देश।'
      },
      {
        titleEn: 'Purification & Charging Guide',
        titleHi: 'क्रिस्टल शुद्धि एवं चार्जिंग विधि पत्रक',
        descEn: 'Monthly salt cleansing and full moon charging calendar to keep your crystal perpetually potent.',
        descHi: 'महीने में एक बार नमक में रखने एवं पूर्णिमा की चांदनी में चार्ज करने का सरल कैलेंडर।'
      }
    ],
    benefits: [
      { titleEn: 'Magnifies Personal Charisma & Aura Radiance', titleHi: 'व्यक्तित्व में चुंबकीय आकर्षण एवं औरा में चमक', icon: 'Sparkles' },
      { titleEn: 'Attracts Constant Financial Wealth Flow', titleHi: 'धन, व्यापार एवं नए संपर्कों का निरंतर प्रवाह', icon: 'Coins' },
      { titleEn: 'Shields Against Energy Vampires & Envy', titleHi: 'नकारात्मक लोगों एवं बुरी नजर से सुरक्षा', icon: 'Shield' }
    ],
    whoNeedsThis: [
      { en: 'Entrepreneurs, traders, and freelancers desiring higher conversion and effortless cash flow', hi: 'व्यापारी, फ्रीलांसर्स एवं दुकानदार जो धन के निरंतर प्रवाह के आकांक्षी हैं' },
      { en: 'Healers, counselors, and executives needing an energetic shield against exhaustion', hi: 'डॉक्टर, परामर्शदाता एवं अधिकारी जो दिनभर लोगों से मिलकर थकान महसूस करते हैं' }
    ],
    faqs: [
      {
        qEn: 'Which wrist should I wear my crystal bracelet on?',
        qHi: 'क्रिस्टल ब्रेसलेट किस हाथ में पहनना चाहिए?',
        aEn: 'The left wrist is the receiving hand (to absorb wealth, healing, peace). The right wrist is the projecting hand (for leadership and protection). Master Randhir Singh specifies the correct hand for your specific crystal.',
        aHi: 'बायां हाथ ऊर्जा ग्रहण करने वाला (धन, शांति, स्वास्थ्य) होता है; दायां हाथ ऊर्जा प्रवाहित करने वाला (प्रभाव, रक्षा) होता है। आपके क्रिस्टल के आधार पर सही हाथ बताया जाता है।'
      }
    ]
  }
};
