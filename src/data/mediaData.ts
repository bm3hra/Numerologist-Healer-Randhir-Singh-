export interface PhotoItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'clinic' | 'watches' | 'salt' | 'crystals' | 'certificates' | 'portraits' | 'cards' | 'convocation' | 'awards';
  categoryLabel: string;
  imageUrl: string;
  descriptionEn: string;
  descriptionHi: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'masterclass' | 'watch' | 'salt' | 'crystals' | 'testimonials' | 'convocation';
  categoryLabel: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  embedUrl?: string; // YouTube embed or video stream
  descriptionEn: string;
  descriptionHi: string;
  keyTakeaways: string[];
}

export const PHOTO_GALLERY: PhotoItem[] = [
  {
    id: 'p_formal_portrait',
    titleEn: 'Enhanced Portrait of Randhir Singh — Official Formal Portrait',
    titleHi: 'मास्टर रणधीर सिंह — आधिकारिक गरिमामय पोर्ट्रेट',
    category: 'portraits',
    categoryLabel: 'Official Portrait',
    imageUrl: '/assets/aistudio/Randhir_Singh_8dc81223.png',
    descriptionEn: 'Official high-resolution formal portrait of Master Randhir Singh in royal blue formal attire, reflecting deep wisdom, calm authority, and mastery in Lo-Shu numerology and pulse horology.',
    descriptionHi: 'मास्टर रणधीर सिंह का आधिकारिक गरिमामय पोर्ट्रेट। रॉयल ब्लू औपचारिक परिधान में वैदिक ज्ञान, सकारात्मकता एवं दशकों के अनुभव का जीवंत स्वरूप।',
    tags: ['Master Randhir Singh', 'Jaipur Healer', 'Vedic Numerologist', 'Enhanced Portrait']
  },
  {
    id: 'p_card_services',
    titleEn: 'Official Visiting Card (Front) — All 16 Sacred Services',
    titleHi: 'आधिकारिक विजिटिंग कार्ड (सामने) — समस्त 16 पावन सेवाएं',
    category: 'cards',
    categoryLabel: 'Visiting Card',
    imageUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    descriptionEn: 'Authentic visiting card specifying all 16 sacred services: Numerology Consultation, Watch Analysis, Date of Birth Analysis, Therapy Watches, Child Birth Dates, Mobile Number Analysis, Negativity Removal & Salt Therapy, Name Corrections, Marriage & Health Remedies, Grid Matching, Health Switch Words, Spiritual & Pranic Healings, Sacred Healing Codes, DOB Yantras, Special Business/Job Yantras, and Growth Crystals.',
    descriptionHi: 'मास्टर रणधीर सिंह का अधिकृत विजिटिंग कार्ड जिसमें अंक ज्योतिष, वॉच एनालिसिस, थेरेपी वॉचेस, नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी), यंत्र एवं हीलिंग कोड्स सहित सभी 16 प्रमुख सेवाओं का संपूर्ण विवरण अंकित है।',
    tags: ['Visiting Card', '16 Services', 'Om Shri Ganeshay Namh', 'Remedies']
  },
  {
    id: 'p_card_address',
    titleEn: 'Official Visiting Card (Back) — Sanctuary Address & Timings',
    titleHi: 'आधिकारिक विजिटिंग कार्ड (पीछे) — परामर्श केंद्र पता एवं समय',
    category: 'cards',
    categoryLabel: 'Visiting Card',
    imageUrl: '/assets/about/visiting-card-address.svg',
    descriptionEn: 'Official card showing sanctuary address at Mahadev Nagar, Jagatpura, Jaipur. Consultation hours 9 A.M. to 6 P.M., special privilege of First 5 Consultations Free on every Sunday, and direct WhatsApp contact (9509593150 / 9694723150).',
    descriptionHi: 'महादेव नगर, जगतपुरा, जयपुर स्थित परामर्श केंद्र का आधिकारिक कार्ड। परामर्श समय प्रातः 9 से सायं 6 बजे तक, एवं प्रत्येक रविवार प्रथम 5 परामर्श निःशुल्क की विशेष घोषणा।',
    tags: ['Jaipur Address', 'Timings', 'Free Sunday Consultations', 'WhatsApp']
  },
  {
    id: 'p_convocation_achievement',
    titleEn: 'Proud Convocation Achievement in Delhi — Dual Honors',
    titleHi: 'दीक्षांत समारोह दोहरा गौरव — नई दिल्ली सम्मान',
    category: 'awards',
    categoryLabel: 'Academic Award',
    imageUrl: '/assets/about/proud-convocation-achievement-delhi.svg',
    descriptionEn: 'Master Randhir Singh in academic doctoral convocation regalia holding the framed Royal Skills Academy Certificate (Regd. No. 10115) and 3-star wooden trophy from Dr. Rohit Sachdev (11th June 2024, Navgal Saikk Academy, New Delhi).',
    descriptionHi: 'दीक्षांत पोशाक एवं स्वर्ण फुंदने वाली कैप में मास्टर रणधीर सिंह। रॉयल स्किल्स एकेडमी प्रमाण-पत्र (पंजीकरण 10115) तथा डॉ. रोहित सचदेव द्वारा प्रदत्त 3-स्टार काष्ठ स्मृति-चिह्न के साथ।',
    tags: ['Royal Skills Academy', 'Regd 10115', 'Dr. Rohit Sachdev', 'Advance Numerology']
  },
  {
    id: 'p_cert_advance_placement',
    titleEn: 'Official Advance Placement Course Certificate (REG NO: A-G 62)',
    titleHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    category: 'certificates',
    categoryLabel: 'Accreditation',
    imageUrl: '/assets/aistudio/Certificate-4_637f7316.jpeg',
    descriptionEn: 'High-resolution original photograph of the official completion certificate conferred upon Randhir Singh by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Validated under UDYAM-GJ-22-0158332 and ISO-9001:2015 on 23 NOV 2024.',
    descriptionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा मास्टर रणधीर सिंह जी को उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम पूर्णता पर प्रदान किया गया मूल फोटो प्रमाण-पत्र (REG NO: A-G 62)।',
    tags: ['Advance Placement', 'Dr. Rohit Gadkari', 'REG: A-G 62', 'ISO-9001:2015']
  },
  {
    id: 'p_watch_victorinox',
    titleEn: 'Precision Therapy Watches Exhibition — Victorinox Gold & Royal Azure Edition',
    titleHi: 'विशेष थेरेपी घड़ियों का प्रदर्शन — विक्टोरिनॉक्स 18K गोल्ड एवं रॉयल ब्लू',
    category: 'watches',
    categoryLabel: 'Therapy Watches',
    imageUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    descriptionEn: 'Consecrated Victorinox 18K Gold & Royal Azure Blue Precision Therapy Watch personally energized by Master Randhir Singh. Engineered with a sunburst cosmic dial, central Golden Om (ॐ) mandala, "NUMEROLOGY GUIDANCE" and "HEALING ENERGY POSITIVITY" sacred inscriptions, Master Number 22 date aperture, and a divine golden blooming lotus at 6 o\'clock. Calibrated to transmit steady wealth vibration, career promotion, and mental clarity through the radial artery pulse meridian.',
    descriptionHi: 'मास्टर रणधीर सिंह द्वारा सिद्ध एवं प्राण-प्रतिष्ठित विक्टोरिनॉक्स 18K स्वर्ण व डीप रॉयल ब्लू थेरेपी वॉच। डायल पर केंद्र में स्वर्ण ॐ यंत्र, "न्यूमेरोलॉजी गाइडेंस" एवं "हीलिंग एनर्जी पॉजिटिविटी" महामंत्र, मास्टर नंबर 22 दिनांक चक्र, और 6 बजे दिव्य स्वर्ण कमल पुष्प अंकित है।',
    tags: ['Therapy Watches', 'Victorinox Gold & Blue', 'Om Mandala', 'Master Number 22', 'Radial Pulse']
  },
  {
    id: 'p_watch_pearl_gold',
    titleEn: 'Watch Dial Diagnostic Station — Consecrated Victorinox Pearl White & 18K Gold Edition',
    titleHi: 'घड़ी डायल डायग्नोस्टिक स्टेशन — विक्टोरिनॉक्स पर्ल व्हाइट एवं 18K स्वर्ण थेरेपी वॉच',
    category: 'watches',
    categoryLabel: 'Therapy Watches',
    imageUrl: '/assets/aistudio/Luxury_Gold_Numerology_Watch_0e113989.png',
    descriptionEn: 'Master Randhir Singh’s bespoke Victorinox precision diagnostic therapy watch crafted in solid 18K yellow gold with a pristine ceramic pearl white bezel and textured white Guilloche dial. Features a sacred central Golden Om (ॐ) 12-petal yantra mandala, dual protective inscriptions "NUMEROLOGY GUIDANCE" & "HEALING ENERGY POSITIVITY", Master Number 22 date aperture at 6 o’clock, and an auspicious golden blooming lotus.',
    descriptionHi: 'मास्टर रणधीर सिंह द्वारा प्राण-प्रतिष्ठित विक्टोरिनॉक्स 18K स्वर्ण एवं शुद्ध पर्ल व्हाइट सिरेमिक थेरेपी वॉच। डायल पर केंद्र में स्वर्ण ॐ यंत्र, "न्यूमेरोलॉजी गाइडेंस" एवं "हीलिंग एनर्जी पॉजिटिविटी" महामंत्र, 6 बजे मास्टर नंबर 22 दिनांक विंडो और दिव्य स्वर्ण कमल पुष्प स्थापित है।',
    tags: ['Watch Diagnostic', 'Pearl White & Gold', 'Om Mandala', 'Master Number 22', 'Radial Pulse']
  },
  {
    id: 'p_graduation_tassel',
    titleEn: 'Proud Graduation Portrait with Golden Tassel',
    titleHi: 'दीक्षांत उपाधि पोर्ट्रेट — स्वर्ण फुंदने के साथ',
    category: 'convocation',
    categoryLabel: 'Convocation',
    imageUrl: '/assets/about/proud-graduation-portrait-golden-tassel.svg',
    descriptionEn: 'Ceremonial graduation portrait wearing the black doctoral convocation gown, formal suit with tie clip, and mortarboard cap with radiant golden yellow tassel.',
    descriptionHi: 'भव्य दीक्षांत समारोह गाउन, सूट, टाई क्लिप एवं सुनहरे पीले फुंदने से सुशोभित कैप में मास्टर रणधीर सिंह का गौरवशाली उपाधि चित्र।',
    tags: ['Golden Tassel', 'Graduation Robe', 'Convocation 2024']
  },
  {
    id: 'p_collage_wall',
    titleEn: 'Man Presenting a Portrait Collage Wall of Scholars',
    titleHi: 'विद्वत दीवार प्रदर्शन — साथी अंक शास्त्रियों के साथ',
    category: 'portraits',
    categoryLabel: 'Scholars Wall',
    imageUrl: '/assets/about/randhir-singh-collage-wall.svg',
    descriptionEn: 'Master Randhir Singh in tailored black two-piece suit and patterned blue silk tie presenting the commemorative tree wall featuring certified numerology leaders across India.',
    descriptionHi: 'काले औपचारिक सूट व नीली सिल्क टाई में मास्टर रणधीर सिंह, भारत भर के प्रमाणित अंक शास्त्रियों की ज्ञान-वृक्ष स्मृति दीवार का भावपूर्ण प्रदर्शन करते हुए।',
    tags: ['Community Wall', 'Black Suit', 'Fellow Numerologists']
  },
  {
    id: 'p_convocation_speech',
    titleEn: 'Numerologists’ Mega Convocation Speech — Radisson Blu Keynote',
    titleHi: 'द्वितीय महा दीक्षांत व्याख्यान — रैडिसन ब्लू नई दिल्ली',
    category: 'convocation',
    categoryLabel: 'Convocation Keynote',
    imageUrl: '/assets/about/numerologists-mega-convocation-speech.svg',
    descriptionEn: 'Master Randhir Singh delivering the keynote address on pulse vibration and subconscious numerology at the 2nd Mega Convocation on 16th June 2024 at Radisson Blu, New Delhi.',
    descriptionHi: '16 जून 2024 को रैडिसन ब्लू, नई दिल्ली में आयोजित द्वितीय महा दीक्षांत समारोह के मंच से कलाई स्पंदन एवं अंक ज्योतिष पर मुख्य व्याख्यान प्रस्तुत करते हुए।',
    tags: ['Radisson Blu', 'Keynote Speech', '16 June 2024', 'Convocation']
  },
  {
    id: 'p_podium_address',
    titleEn: 'Randhir Singh at the Numerologists’ Convocation Podium',
    titleHi: 'अंक ज्योतिषी सम्मेलन मंच — मुख्य वक्ता उद्बोधन',
    category: 'convocation',
    categoryLabel: 'Convocation Podium',
    imageUrl: '/assets/about/randhir-singh-at-convocation-podium.svg',
    descriptionEn: 'Master Randhir Singh addressing international delegates with golden nameplate pinned to his suit lapel, speaking on the historic 2nd Mega Convocation stage in New Delhi.',
    descriptionHi: 'सूट लैपल पर रणधीर सिंह नेमप्लेट के साथ पोडियम से देश-विदेश से पधारे अंक ज्योतिष शोधार्थियों एवं साधकों को संबोधित करते हुए।',
    tags: ['Podium Speech', 'Nameplate', 'New Delhi Convention']
  },
  {
    id: 'p_excellence_celebration',
    titleEn: 'Certificate of Excellence Celebration on Stage',
    titleHi: 'सर्टिफिकेट ऑफ एक्सीलेंस उत्सव मंच',
    category: 'awards',
    categoryLabel: 'Excellence Award',
    imageUrl: '/assets/about/certificate-of-excellence-celebration.svg',
    descriptionEn: 'Celebrating the conferral of the prestigious Certificate of Excellence on stage alongside distinguished colleagues and faculty mentors.',
    descriptionHi: 'मंच पर प्रख्यात विद्वानों एवं गुरुजनों के साथ सर्टिफिकेट ऑफ एक्सीलेंस (उत्कृष्टता प्रमाण-पत्र) प्राप्त कर आनंद साझा करते हुए।',
    tags: ['Certificate of Excellence', 'Stage Felicitation', 'Distinction']
  },
  {
    id: 'p_completion_ceremony',
    titleEn: 'Certificate Celebration Ceremony with Faculty',
    titleHi: 'प्रमाण-पत्र वितरण उत्सव — संकाय सदस्यों के साथ',
    category: 'awards',
    categoryLabel: 'Ceremony',
    imageUrl: '/assets/about/certificate-celebration-ceremony.svg',
    descriptionEn: 'Felicitation ceremony presenting certificates under stage illuminations and floral garlands, acknowledging supreme proficiency in Vedic occult sciences.',
    descriptionHi: 'दीक्षांत मंच पर पुष्पमालाओं एवं मंच प्रकाश के बीच वरिष्ठ आचार्यों के साथ दीक्षांत प्रमाणपत्र वितरण उत्सव का गरिमामय दृश्य।',
    tags: ['Ceremony', 'Faculty Felicitation', 'Occult Science']
  },
  {
    id: 'p_cert_advance_numerology',
    titleEn: 'Advance Numerology Course Certificate of Completion (Reg: G-65)',
    titleHi: 'उन्नत अंक ज्योतिष पाठ्यक्रम पूर्णता प्रमाण-पत्र (परामर्श अधिकृत)',
    category: 'certificates',
    categoryLabel: 'Official Credential',
    imageUrl: '/assets/certificates/certificate-advance-numerology.svg',
    descriptionEn: 'Official Certificate of Completion awarded to Mr. RANDHIR SINGH JI for successfully undergoing the Advance Numerology Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist), accredited under DD Consultants, UDYAM-GJ-22-0158332 and ISO-9001:2015.',
    descriptionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा रणधीर सिंह जी को उन्नत अंक ज्योतिष पाठ्यक्रम पूर्ण करने पर प्रदान किया गया अधिकृत पूर्णता प्रमाण पत्र (पंजीकरण सं. G-65)।',
    tags: ['Reg G-65', 'Advance Numerology', 'DD Consultants', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_cert_advanced_wristwatch',
    titleEn: 'Advanced Wrist Watch Course Certificate of Achievement (Reg: A-H 44)',
    titleHi: 'उन्नत कलाई घड़ी (रिस्ट वॉच) विश्लेषण उपलब्धि प्रमाण-पत्र',
    category: 'certificates',
    categoryLabel: 'Horology Credential',
    imageUrl: '/assets/certificates/certificate-advanced-wristwatch.svg',
    descriptionEn: 'Certificate of Achievement acknowledging and honoring Randhir Singh for successfully completing the Advanced Wrist Watch Course on 24 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-H 44).',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा 24 नवंबर 2024 को प्रदान किया गया कलाई घड़ी विश्लेषण उपलब्धि प्रमाण पत्र (REG NO: A-H 44)।',
    tags: ['Reg A-H 44', 'Advanced Wrist Watch', 'Radial Pulse', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_cert_advance_name_correction',
    titleEn: 'Advance Name Correction Course Certificate (Reg: A-F 55)',
    titleHi: 'उन्नत नाम सुधार (नेम करेक्शन) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    category: 'certificates',
    categoryLabel: 'Name Frequency',
    imageUrl: '/assets/certificates/certificate-advance-name-correction.svg',
    descriptionEn: 'Official Credential acknowledging and honoring Randhir Singh for successfully completing the Advance Name Correction Course on 22 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-F 55).',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा 22 नवंबर 2024 को प्रदत्त उन्नत नाम सुधार पाठ्यक्रम प्रमाण पत्र (REG NO: A-F 55)।',
    tags: ['Reg A-F 55', 'Name Correction', 'Chaldean', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_watch_swiss_dive_gold',
    titleEn: 'Victorinox Swiss Dive Watch — 18K Gold & Azure Ceramic Edition',
    titleHi: 'विक्टोरिनॉक्स 18K गोल्ड स्विस डाइव वॉच (रॉयल ब्लू डायल)',
    category: 'watches',
    categoryLabel: 'Swiss Dive Watch',
    imageUrl: '/assets/watches/victorinox-swiss-dive-watch-gold.svg',
    descriptionEn: 'Victorinox Swiss Dive Watch in solid 18K yellow gold casing and bracelet with deep azure ceramic rotating bezel, horizontal textured blue dial, Swiss Made automatic movement, and Master Date aperture at 6 o’clock.',
    descriptionHi: 'विक्टोरिनॉक्स स्विस डाइव वॉच — 18K येलो गोल्ड केस व ब्रेसलेट, डीप अज़ूर सिरेमिक बेज़ल, हॉरिजॉन्टल टेक्सचर्ड ब्लू डायल और 6 बजे दिनांक विंडो युक्त उत्कृष्ट स्विस घड़ी।',
    tags: ['18K Gold Case', 'Azure Bezel', 'Swiss Made', 'Dive Watch']
  },
  {
    id: 'p_watch_swiss_dive_steel',
    titleEn: 'Precision Victorinox Swiss Stainless Steel Watch — Azure Dial',
    titleHi: 'विक्टोरिनॉक्स स्विस स्टेनलेस स्टील वॉच (क्लासिक ब्लू डायल)',
    category: 'watches',
    categoryLabel: 'Stainless Steel Edition',
    imageUrl: '/assets/watches/victorinox-swiss-dive-watch-steel.svg',
    descriptionEn: 'Classic Victorinox Swiss dive watch with solid brushed stainless steel case and 3-link bracelet, deep navy rotating dive bezel, luminous hands, and date at 6 o’clock. The baseline diagnostic standard for pulse and horological balance.',
    descriptionHi: 'सॉलिड ब्रश स्टेनलेस स्टील केस व 3-लिंक ब्रेसलेट, डीप नेवी रोटेटिंग बेज़ल एवं ल्यूमिनस हैंड्स युक्त विक्टोरिनॉक्स स्विस डाइव घड़ी।',
    tags: ['Stainless Steel', 'Navy Bezel', 'Swiss Army', 'Luminescent']
  }
];

export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: 'v_convocation',
    titleEn: '2nd Mega Convocation Keynote: "Number of Numerologists to Explore the World"',
    titleHi: 'द्वितीय विशाल दीक्षांत समारोह: "दुनिया भर में अंक ज्योतिष का प्रसार"',
    category: 'convocation',
    categoryLabel: 'Convocation Keynote Video',
    duration: '28:50 mins',
    views: '68K+ Views',
    thumbnailUrl: '/assets/about/numerologists-mega-convocation-speech.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Live recorded address by Master Randhir Singh from the podium at Radisson Blu (16th June 2024). Inspiring hundreds of certified numerologists on ethics, karmic alignment, and global outreach.',
    descriptionHi: '16 जून 2024, रेडिसन ब्लू से लाइव रिकॉर्डेड मुख्य व्याख्यान: सैकड़ों प्रमाणित अंक शास्त्रियों को संबोधित करते हुए कर्म सिद्धांत, सत्यनिष्ठा और वैश्विक प्रसार का संदेश।',
    keyTakeaways: [
      'The sacred duty of a numerologist: guiding human destiny without fear-mongering',
      'Why modern business leaders urgently require vibrational watch analysis and date balancing',
      'The global roadmap for Vedic and Lo-Shu consciousness across 24 world languages'
    ]
  },
  {
    id: 'v_excellence',
    titleEn: 'Grand Certificate Conferral & Excellence Felicitation Ceremony',
    titleHi: 'भव्य प्रमाण-पत्र वितरण एवं प्रतिभा सम्मान समारोह',
    category: 'convocation',
    categoryLabel: 'Ceremony Highlights',
    duration: '21:18 mins',
    views: '42K+ Views',
    thumbnailUrl: '/assets/about/certificate-celebration-ceremony.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Highlights of the Advance Placement and Certificate of Excellence conferrals, felicitation of top performing practitioners, flower showers, and convocation blessings.',
    descriptionHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पूर्णता प्रमाण पत्र एवं एक्सीलेंस अवॉर्ड्स का गरिमामय वितरण, मंच अलंकरण और साधकों को आशीर्वाद।',
    keyTakeaways: [
      'Official credentials presentation to practitioners who mastered the 3x3 Lo-Shu matrix',
      'Case study demonstrations on correcting chronic life obstacles through name vibrations',
      'Oath of sacred confidentiality and ethical counseling taken by certified healers'
    ]
  },
  {
    id: 'v1',
    titleEn: 'The Science of Watch Analysis & Therapy Watches',
    titleHi: 'वॉच एनालिसिस और थेरेपी घड़ियों का रहस्य',
    category: 'watch',
    categoryLabel: 'Specialty Masterclass',
    duration: '18:42 mins',
    views: '24K+ Views',
    thumbnailUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Master Randhir Singh reveals how your wristwatch dial geometry, colors, and radial artery contact subtly influence your financial income, career promotions, and sleep.',
    descriptionHi: 'मास्टर रणधीर सिंह द्वारा विस्तृत व्याख्या: कलाई की घड़ी आपकी नब्ज और अवचेतन मन से जुड़कर किस प्रकार करियर में गति या रुकावट लाती है।',
    keyTakeaways: [
      'Why round dials promote harmony while octagonal dials unlock multidirectional wealth',
      'The silent damage of wearing a stopped or scratched watch',
      'Active (Right) vs Receptive (Left) wrist polarity dynamics'
    ]
  },
  {
    id: 'v2',
    titleEn: 'How to Read Your 3×3 Lo-Shu Magic Grid',
    titleHi: 'अपना 3x3 लो-शू ग्रिड कैसे देखें और समझें',
    category: 'masterclass',
    categoryLabel: 'Vedic Numerology',
    duration: '22:15 mins',
    views: '45K+ Views',
    thumbnailUrl: '/assets/about/randhir-singh-collage-wall.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Step-by-step masterclass explaining the 8 planes of consciousness, Mulank (Driver), Bhagyank (Conductor), and the Golden Raj Yoga (4-5-6).',
    descriptionHi: 'मूलांक, भाग्यांक, 8 प्लेन्स (माइंड, हार्ट, प्रैक्टिकल) तथा 4-5-6 गोल्डन राजयोग की संपूर्ण गणना और व्यावहारिक उपाय।',
    keyTakeaways: [
      'How to calculate your exact Driver and Conductor numbers in seconds',
      'Identifying which elemental planes are active or dormant in your life',
      'Practical lifestyle and gemstone remedies for missing numbers'
    ]
  },
  {
    id: 'v3',
    titleEn: 'Himalayan Salt Cleansing Ritual: Step-by-Step Guide',
    titleHi: 'हिमालयन रॉक सॉल्ट पाद-स्नान एवं औरा शुद्धि विधि',
    category: 'salt',
    categoryLabel: 'Holistic Ritual',
    duration: '14:10 mins',
    views: '31K+ Views',
    thumbnailUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Learn the exact authentic technique of the evening Himalayan Rock Salt foot soak (Padabhyanga) to drain emotional fatigue and negative static.',
    descriptionHi: 'संध्याकाल में सेंधा नमक द्वारा पाद-प्रक्षालन स्नान का संपूर्ण विधान, जो मानसिक तनाव व बुरी नजर को तुरंत समाप्त करता है।',
    keyTakeaways: [
      'Correct proportion of rock salt to warm water',
      'Mindful intention setting to discharge static nervous tension',
      'Why salt mopping must never be performed on Thursdays'
    ]
  },
  {
    id: 'v4',
    titleEn: 'Crystals for Wealth & Career: Pyrite, Citrine & Aventurine',
    titleHi: 'व्यापार व करियर वृद्धि हेतु चमत्कारी क्रिस्टल्स',
    category: 'crystals',
    categoryLabel: 'Crystal Therapy',
    duration: '16:30 mins',
    views: '19K+ Views',
    thumbnailUrl: '/assets/about/proud-convocation-achievement-delhi.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'A guide to authentic raw crystals for entrepreneurs and professionals. How to cleanse with dry salt, charge with sunlight, and wear on the correct wrist.',
    descriptionHi: 'व्यापारियों और नौकरीपेशा साधकों के लिए पाइराइट, सिट्रीन एवं ग्रीन एवेंट्यूरिन की प्राण-प्रतिष्ठा एवं सही हाथ में धारण करने का नियम।',
    keyTakeaways: [
      'How Pyrite cluster attracts sales orders and prevents financial leakage',
      'Activating your solar plexus chakra for decisive executive authority',
      'Step-by-step method to cleanse crystals without chemical damage'
    ]
  }
];
