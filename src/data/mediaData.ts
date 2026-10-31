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
    titleHi: 'न्यूमेरोलॉजिस्ट और हीलर · रणधीर सिंह — ऑफिशियल फॉर्मल फोटो',
    category: 'portraits',
    categoryLabel: 'Official Portrait',
    imageUrl: '/assets/aistudio/Randhir_Singh_8dc81223.png',
    descriptionEn: 'Official high-resolution formal portrait of Numerologist & Healer · Randhir Singh in royal blue formal attire, reflecting deep wisdom, calm authority, and mastery in Lo-Shu numerology and pulse horology.',
    descriptionHi: 'न्यूमेरोलॉजिस्ट और हीलर · रणधीर सिंह जी की ऑफिशियल फॉर्मल फोटो। रॉयल ब्लू कोट और नेमप्लेट में शांत, अनुभवी और सकारात्मक स्वरूप।',
    tags: ['Numerologist & Healer · Randhir Singh', 'Jaipur Center', 'Vedic Numerologist', 'Enhanced Portrait']
  },
  {
    id: 'p_card_services',
    titleEn: 'Official Visiting Card (Front) — All 16 Divine Services',
    titleHi: 'विजिटिंग कार्ड (सामने) — सभी 16 प्रमुख सेवाएं',
    category: 'cards',
    categoryLabel: 'Visiting Card',
    imageUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    descriptionEn: 'Authentic visiting card specifying all 16 divine services: Numerology Consultation, Watch Analysis, Date of Birth Analysis, Therapy Watches, Child Birth Dates, Mobile Number Analysis, Negativity Removal & Salt Therapy, Name Corrections, Marriage & Health Remedies, Grid Matching, Health Switch Words, Spiritual & Pranic Healings, Divine Healing Codes, DOB Yantras, Special Business/Job Yantras, and Growth Crystals.',
    descriptionHi: 'रणधीर सिंह जी का ऑफिशियल विजिटिंग कार्ड, जिसमें न्यूमेरोलॉजी, वॉच एनालिसिस, थेरेपी वॉच, सॉल्ट थेरेपी, सिद्ध यंत्र और हीलिंग समेत सभी 16 सेवाओं की जानकारी है।',
    tags: ['Visiting Card', '16 Services', 'Om Shri Ganeshay Namh', 'Remedies']
  },
  {
    id: 'p_card_address',
    titleEn: 'Official Visiting Card (Back) — Sanctuary Address & Timings',
    titleHi: 'विजिटिंग कार्ड (पीछे) — जयपुर सेंटर का पता और समय',
    category: 'cards',
    categoryLabel: 'Visiting Card',
    imageUrl: '/assets/about/visiting-card-address.svg',
    descriptionEn: 'Official card showing sanctuary address at Mahadev Nagar, Jagatpura, Jaipur. Consultation hours 9 A.M. to 6 P.M., special privilege of First 5 Consultations Free on every Sunday, and direct WhatsApp contact (9509593150 / 9694723150).',
    descriptionHi: 'मकान नं. 45, महादेव नगर, रामनगरिया रोड, जगतपुरा, जयपुर सेंटर का कार्ड। समय सुबह 9 से शाम 6 बजे, और हर रविवार पहले 5 लोगों के लिए फ्री कंसल्टेशन।',
    tags: ['Jaipur Address', 'Timings', 'Free Sunday Consultations', 'WhatsApp']
  },
  {
    id: 'p_convocation_achievement',
    titleEn: 'Proud Convocation Achievement in Delhi — Dual Honors',
    titleHi: 'नई दिल्ली कन्वोकेशन — अवॉर्ड और सम्मान',
    category: 'awards',
    categoryLabel: 'Academic Award',
    imageUrl: '/assets/about/proud-convocation-achievement-delhi.svg',
    descriptionEn: 'Numerologist & Healer · Randhir Singh in academic doctoral convocation regalia holding the framed Royal Skills Academy Certificate (Regd. No. 10115) and 3-star wooden trophy from Dr. Rohit Sachdev (11th June 2024, Navgal Saikk Academy, New Delhi).',
    descriptionHi: 'ग्रेजुएशन गाउन में रणधीर सिंह जी, रॉयल स्किल्स एकेडमी का सर्टिफिकेट और डॉ. रोहित सचदेव द्वारा मिला 3-स्टार अवॉर्ड दिखाते हुए।',
    tags: ['Royal Skills Academy', 'Regd 10115', 'Dr. Rohit Sachdev', 'Advance Numerology']
  },
  {
    id: 'p_cert_advance_placement',
    titleEn: 'Official Advance Placement Course Certificate (REG NO: A-G 62)',
    titleHi: 'एडवांस प्लेसमेंट कोर्स सर्टिफिकेट (Reg: A-G 62)',
    category: 'certificates',
    categoryLabel: 'Accreditation',
    imageUrl: '/assets/aistudio/Certificate-4_637f7316.jpeg',
    descriptionEn: 'High-resolution original photograph of the official completion certificate conferred upon Randhir Singh by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Validated under UDYAM-GJ-22-0158332 and ISO-9001:2015 on 23 NOV 2024.',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा 23 नवंबर 2024 को दिया गया मूल सर्टिफिकेट (Reg: A-G 62), जो सही दिशा और उपायों के प्लेसमेंट को प्रमाणित करता है।',
    tags: ['Advance Placement', 'Dr. Rohit Gadkari', 'REG: A-G 62', 'ISO-9001:2015']
  },
  {
    id: 'p_watch_victorinox',
    titleEn: 'Precision Therapy Watches Exhibition — Victorinox Gold & Royal Azure Edition',
    titleHi: 'विक्टोरिनॉक्स 18K गोल्ड व रॉयल ब्लू थेरेपी वॉच',
    category: 'watches',
    categoryLabel: 'Therapy Watches',
    imageUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    descriptionEn: 'Consecrated Victorinox 18K Gold & Royal Azure Blue Precision Therapy Watch personally energized by Numerologist & Healer · Randhir Singh. Engineered with a sunburst cosmic dial, central Golden Om (ॐ) mandala, "NUMEROLOGY GUIDANCE" and "HEALING ENERGY POSITIVITY" divine inscriptions, Master Number 22 date aperture, and a divine golden blooming lotus at 6 o\'clock. Calibrated to transmit steady wealth vibration, career promotion, and mental clarity through the radial artery pulse meridian.',
    descriptionHi: 'रणधीर सिंह जी द्वारा तैयार विक्टोरिनॉक्स 18K गोल्ड और रॉयल ब्लू थेरेपी वॉच। डायल पर स्वर्ण ॐ यंत्र, सुरक्षा मंत्र, लकी नंबर 22 और कमल का फूल बना है।',
    tags: ['Therapy Watches', 'Victorinox Gold & Blue', 'Om Mandala', 'Master Number 22', 'Radial Pulse']
  },
  {
    id: 'p_watch_pearl_gold',
    titleEn: 'Watch Dial Diagnostic Station — Consecrated Victorinox Pearl White & 18K Gold Edition',
    titleHi: 'विक्टोरिनॉक्स पर्ल व्हाइट व 18K गोल्ड थेरेपी वॉच',
    category: 'watches',
    categoryLabel: 'Therapy Watches',
    imageUrl: '/assets/aistudio/Luxury_Gold_Numerology_Watch_0e113989.png',
    descriptionEn: 'Numerologist & Healer · Randhir Singh’s bespoke Victorinox precision diagnostic therapy watch crafted in solid 18K yellow gold with a pristine ceramic pearl white bezel and textured white Guilloche dial. Features a divine central Golden Om (ॐ) 12-petal yantra mandala, dual protective inscriptions "NUMEROLOGY GUIDANCE" & "HEALING ENERGY POSITIVITY", Master Number 22 date aperture at 6 o’clock, and an auspicious golden blooming lotus.',
    descriptionHi: 'विक्टोरिनॉक्स 18K गोल्ड और व्हाइट सिरेमिक थेरेपी वॉच। डायल पर केंद्र में स्वर्ण ॐ यंत्र, सुरक्षा मंत्र और कमल का निशान है।',
    tags: ['Watch Diagnostic', 'Pearl White & Gold', 'Om Mandala', 'Master Number 22', 'Radial Pulse']
  },
  {
    id: 'p_graduation_tassel',
    titleEn: 'Proud Graduation Portrait with Golden Tassel',
    titleHi: 'ग्रेजुएशन पोर्ट्रेट — गोल्डन कैप के साथ',
    category: 'convocation',
    categoryLabel: 'Convocation',
    imageUrl: '/assets/about/Certificate Celebration Ceremony.png',
    descriptionEn: 'Ceremonial graduation portrait wearing the black doctoral convocation gown, formal suit with tie clip, and mortarboard cap with radiant golden yellow tassel.',
    descriptionHi: 'दीक्षांत समारोह के काले गाउन, फॉर्मल सूट और गोल्डन कैप में रणधीर सिंह जी की यादगार फोटो।',
    tags: ['Golden Tassel', 'Graduation Robe', 'Convocation 2024']
  },
  {
    id: 'p_collage_wall',
    titleEn: 'Man Presenting a Portrait Collage Wall of Scholars',
    titleHi: 'साथी न्यूमेरोलॉजिस्ट्स की फोटो वॉल',
    category: 'portraits',
    categoryLabel: 'Scholars Wall',
    imageUrl: '/assets/about/randhir-singh-collage-wall.svg',
    descriptionEn: 'Numerologist & Healer · Randhir Singh in tailored black two-piece suit and patterned blue silk tie presenting the commemorative tree wall featuring certified numerology leaders across India.',
    descriptionHi: 'काले सूट में रणधीर सिंह जी, भारत भर के सर्टिफाइड न्यूमेरोलॉजिस्ट्स की वॉल दिखाते हुए।',
    tags: ['Community Wall', 'Black Suit', 'Fellow Numerologists']
  },
  {
    id: 'p_convocation_speech',
    titleEn: 'Numerologists’ Mega Convocation Speech — Radisson Blu Keynote',
    titleHi: 'रैडिसन ब्लू में मुख्य भाषण — 2nd मेगा कन्वोकेशन',
    category: 'convocation',
    categoryLabel: 'Convocation Keynote',
    imageUrl: '/assets/about/numerologists-mega-convocation-speech.svg',
    descriptionEn: 'Numerologist & Healer · Randhir Singh delivering the keynote address on pulse vibration and subconscious numerology at the 2nd Mega Convocation on 16th June 2024 at Radisson Blu, New Delhi.',
    descriptionHi: '16 जून 2024 को रैडिसन ब्लू, नई दिल्ली में आयोजित मेगा कन्वोकेशन में कलाई घड़ी और न्यूमेरोलॉजी पर मुख्य भाषण देते हुए।',
    tags: ['Radisson Blu', 'Keynote Speech', '16 June 2024', 'Convocation']
  },
  {
    id: 'p_podium_address',
    titleEn: 'Randhir Singh at the Numerologists’ Convocation Podium',
    titleHi: 'कॉन्फ्रेंस मंच पर भाषण (8 जून 2024)',
    category: 'convocation',
    categoryLabel: 'Convocation Podium',
    imageUrl: '/assets/about/randhir-singh-at-convocation-podium.svg',
    descriptionEn: 'Numerologist & Healer · Randhir Singh addressing international delegates with golden nameplate pinned to his suit lapel, speaking on the historic 2nd Mega Convocation stage in New Delhi.',
    descriptionHi: 'नई दिल्ली में आयोजित राष्ट्रीय सम्मेलन के मंच से देश-विदेश के लोगों को संबोधित करते हुए रणधीर सिंह जी।',
    tags: ['Podium Speech', 'Nameplate', 'New Delhi Convention']
  },
  {
    id: 'p_excellence_celebration',
    titleEn: 'Certificate of Excellence Celebration on Stage',
    titleHi: 'सर्टिफिकेट ऑफ एक्सीलेंस — स्टेज पर सम्मान',
    category: 'awards',
    categoryLabel: 'Excellence Award',
    imageUrl: '/assets/about/certificate-of-excellence-celebration.svg',
    descriptionEn: 'Celebrating the conferral of the prestigious Certificate of Excellence on stage alongside distinguished colleagues and faculty mentors.',
    descriptionHi: 'मंच पर वरिष्ठ गुरुजनों और साथियों के साथ सर्टिफिकेट ऑफ एक्सीलेंस (उत्कृष्टता सम्मान) प्राप्त करते हुए।',
    tags: ['Certificate of Excellence', 'Stage Felicitation', 'Distinction']
  },
  {
    id: 'p_completion_ceremony',
    titleEn: 'Certificate Celebration Ceremony with Faculty',
    titleHi: 'सर्टिफिकेट सेरेमनी — टीचर्स और मेंटर्स के साथ',
    category: 'awards',
    categoryLabel: 'Ceremony',
    imageUrl: '/assets/about/Certificate Celebration Ceremony.png',
    descriptionEn: 'Felicitation ceremony presenting certificates under stage illuminations and floral garlands, acknowledging supreme proficiency in Vedic occult sciences.',
    descriptionHi: 'समारोह के मंच पर टीचर्स और साथी मेंटर्स के साथ नेशनल स्किल सर्टिफिकेट लेते हुए रणधीर सिंह जी।',
    tags: ['Ceremony', 'Faculty Felicitation', 'Occult Science']
  },
  {
    id: 'p_cert_advance_numerology',
    titleEn: 'Advance Numerology Course Certificate of Completion (Reg: G-65)',
    titleHi: 'एडवांस न्यूमेरोलॉजी कोर्स सर्टिफिकेट (Reg: G-65)',
    category: 'certificates',
    categoryLabel: 'Official Credential',
    imageUrl: '/assets/certificates/certificate-advance-numerology.svg',
    descriptionEn: 'Official Certificate of Completion awarded to Mr. RANDHIR SINGH JI for successfully undergoing the Advance Numerology Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist), accredited under DD Consultants, UDYAM-GJ-22-0158332 and ISO-9001:2015.',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा रणधीर सिंह जी को एडवांस न्यूमेरोलॉजी कोर्स पूरा करने पर दिया गया ऑफिशियल सर्टिफिकेट (Reg: G-65)।',
    tags: ['Reg G-65', 'Advance Numerology', 'DD Consultants', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_cert_advanced_wristwatch',
    titleEn: 'Advanced Wrist Watch Course Certificate of Achievement (Reg: A-H 44)',
    titleHi: 'एडवांस रिस्ट वॉच कोर्स सर्टिफिकेट (Reg: A-H 44)',
    category: 'certificates',
    categoryLabel: 'Horology Credential',
    imageUrl: '/assets/certificates/certificate-advanced-wristwatch.svg',
    descriptionEn: 'Certificate of Achievement acknowledging and honoring Randhir Singh for successfully completing the Advanced Wrist Watch Course on 24 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-H 44).',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा 24 नवंबर 2024 को दिया गया कलाई घड़ी (रिस्ट वॉच) एनालिसिस का उपलब्धि सर्टिफिकेट (Reg: A-H 44)।',
    tags: ['Reg A-H 44', 'Advanced Wrist Watch', 'Radial Pulse', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_cert_advance_name_correction',
    titleEn: 'Advance Name Correction Course Certificate (Reg: A-F 55)',
    titleHi: 'एडवांस नेम करेक्शन कोर्स सर्टिफिकेट (Reg: A-F 55)',
    category: 'certificates',
    categoryLabel: 'Name Frequency',
    imageUrl: '/assets/certificates/certificate-advance-name-correction.svg',
    descriptionEn: 'Official Credential acknowledging and honoring Randhir Singh for successfully completing the Advance Name Correction Course on 22 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-F 55).',
    descriptionHi: 'डॉ. रोहित गड़करी द्वारा 22 नवंबर 2024 को दिया गया नाम सुधार (नेम करेक्शन) कोर्स का ऑफिशियल सर्टिफिकेट (Reg: A-F 55)।',
    tags: ['Reg A-F 55', 'Name Correction', 'Chaldean', 'Dr. Rohit Gadkari']
  },
  {
    id: 'p_watch_swiss_dive_gold',
    titleEn: 'Victorinox Swiss Dive Watch — 18K Gold & Azure Ceramic Edition',
    titleHi: 'विक्टोरिनॉक्स 18K गोल्ड स्विस डाइव वॉच (रॉयल ब्लू डायल)',
    category: 'watches',
    categoryLabel: 'Swiss Dive Watch',
    imageUrl: '/assets/aistudio/Luxury_Gold_Numerology_Watch_0e113989.png',
    descriptionEn: 'Victorinox Swiss Dive Watch in solid 18K yellow gold casing and bracelet with deep azure ceramic rotating bezel, horizontal textured blue dial, Swiss Made automatic movement, and Master Date aperture at 6 o’clock.',
    descriptionHi: 'विक्टोरिनॉक्स स्विस डाइव वॉच — 18K येलो गोल्ड केस व ब्रेसलेट, ब्लू बेज़ल, टेक्सचर्ड ब्लू डायल और 6 बजे डेट विंडो युक्त उत्कृष्ट स्विस घड़ी।',
    tags: ['18K Gold Case', 'Azure Bezel', 'Swiss Made', 'Dive Watch']
  },
  {
    id: 'p_watch_swiss_dive_steel',
    titleEn: 'Precision Victorinox Swiss Stainless Steel Watch — Azure Dial',
    titleHi: 'विक्टोरिनॉक्स स्विस स्टेनलेस स्टील वॉच (क्लासिक ब्लू डायल)',
    category: 'watches',
    categoryLabel: 'Stainless Steel Edition',
    imageUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    descriptionEn: 'Classic Victorinox Swiss dive watch with solid brushed stainless steel case and 3-link bracelet, deep navy rotating dive bezel, luminous hands, and date at 6 o’clock. The baseline diagnostic standard for pulse and horological balance.',
    descriptionHi: 'स्टेनलेस स्टील केस व ब्रेसलेट, नेवी बेज़ल एवं ल्यूमिनस हैंड्स युक्त विक्टोरिनॉक्स स्विस घड़ी, जो पल्स और समय संतुलन का बेहतरीन आधार है।',
    tags: ['Stainless Steel', 'Navy Bezel', 'Swiss Army', 'Luminescent']
  }
];

export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: 'v_convocation',
    titleEn: '2nd Mega Convocation Keynote: "Number of Numerologists to Explore the World"',
    titleHi: '2nd मेगा कन्वोकेशन में मुख्य भाषण: अंक ज्योतिष का प्रसार',
    category: 'convocation',
    categoryLabel: 'Convocation Keynote Video',
    duration: '28:50 mins',
    views: '68K+ Views',
    thumbnailUrl: '/assets/about/numerologists-mega-convocation-speech.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Live recorded address by Numerologist & Healer · Randhir Singh from the podium at Radisson Blu (16th June 2024). Inspiring hundreds of certified numerologists on ethics, karmic alignment, and global outreach.',
    descriptionHi: '16 जून 2024, रेडिसन ब्लू से लाइव रिकॉर्डेड भाषण: सैकड़ों सर्टिफाइड न्यूमेरोलॉजिस्ट्स को संबोधित करते हुए सही मार्गदर्शन, ईमानदारी और सेवा का संदेश।',
    keyTakeaways: [
      'The divine duty of a numerologist: guiding people with care and truth',
      'Why modern business leaders benefit from wristwatch analysis and date balancing',
      'The global roadmap for Vedic and Lo-Shu numerology across world languages'
    ]
  },
  {
    id: 'v_excellence',
    titleEn: 'Grand Certificate Conferral & Excellence Felicitation Ceremony',
    titleHi: 'सर्टिफिकेट वितरण एवं सम्मान समारोह',
    category: 'convocation',
    categoryLabel: 'Ceremony Highlights',
    duration: '21:18 mins',
    views: '42K+ Views',
    thumbnailUrl: '/assets/about/Certificate Celebration Ceremony.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Highlights of the Advance Placement and Certificate of Excellence conferrals, felicitation of top performing practitioners, flower showers, and convocation blessings.',
    descriptionHi: 'एडवांस प्लेसमेंट सर्टिफिकेट और एक्सीलेंस अवॉर्ड्स का वितरण, स्टेज पर सम्मान और मेंटर्स का आशीर्वाद।',
    keyTakeaways: [
      'Official credentials presentation to practitioners who mastered the 3x3 Lo-Shu matrix',
      'Case study demonstrations on correcting chronic life obstacles through name vibrations',
      'Oath of complete confidentiality and honest counseling taken by certified healers'
    ]
  },
  {
    id: 'v1',
    titleEn: 'Watch Analysis & Therapeutic Watch Consultation Masterclass',
    titleHi: 'घड़ी विश्लेषण एवं चिकित्सीय घड़ी परामर्श',
    category: 'watch',
    categoryLabel: 'Specialty Masterclass',
    duration: '18:42 mins',
    views: '24K+ Views',
    thumbnailUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Numerologist & Healer · Randhir Singh explains how your wristwatch build, dial geometry, colors, and numbers connect to your personal habits, mindset, and life direction.',
    descriptionHi: 'आपकी कलाई पर बंधी घड़ी केवल समय देखने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद, जीवनशैली और व्यक्तित्व की अभिव्यक्ति भी हो सकती है। इस विशेष वीडियो में घड़ी की मजबूती, आकार, डिज़ाइन, रंग, डायल और अंकों की संरचना का विश्लेषण समझें।',
    keyTakeaways: [
      'Understanding how dial shape and colors reflect your personal mindset and daily focus',
      'The silent damage of wearing a stopped, broken or scratched watch',
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
    descriptionHi: 'मूलांक, भाग्यांक, 8 प्लेन्स (माइंड, हार्ट, प्रैक्टिकल) तथा 4-5-6 गोल्डन राजयोग की पूरी गणना और आसान उपाय।',
    keyTakeaways: [
      'How to calculate your exact Driver and Conductor numbers in seconds',
      'Identifying which elemental planes are active or dormant in your life',
      'Practical lifestyle and gemstone remedies for missing numbers'
    ]
  },
  {
    id: 'v3',
    titleEn: 'Himalayan Salt Cleansing Ritual: Step-by-Step Guide',
    titleHi: 'सेंधा नमक से औरा शुद्धि और आसान विधि',
    category: 'salt',
    categoryLabel: 'Holistic Ritual',
    duration: '14:10 mins',
    views: '31K+ Views',
    thumbnailUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'Learn the exact authentic technique of the evening Himalayan Rock Salt foot soak (Padabhyanga) to drain emotional fatigue and negative static.',
    descriptionHi: 'शाम को सेंधा नमक के गुनगुने पानी में पैर रखने (फुट सोक) का आसान तरीका, जो पूरे दिन का तनाव और नेगेटिविटी दूर करता है।',
    keyTakeaways: [
      'Correct proportion of rock salt to warm water',
      'Simple intention to clear stress and heavy thoughts',
      'Why salt mopping must never be performed on Thursdays'
    ]
  },
  {
    id: 'v4',
    titleEn: 'Crystals for Wealth & Career: Pyrite, Citrine & Aventurine',
    titleHi: 'व्यापार व करियर में तरक्की के लिए लकी क्रिस्टल्स',
    category: 'crystals',
    categoryLabel: 'Crystal Therapy',
    duration: '16:30 mins',
    views: '19K+ Views',
    thumbnailUrl: '/assets/about/proud-convocation-achievement-delhi.svg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    descriptionEn: 'A guide to authentic raw crystals for entrepreneurs and professionals. How to cleanse with dry salt, charge with sunlight, and wear on the correct wrist.',
    descriptionHi: 'बिजनेस और नौकरी करने वालों के लिए पाइराइट, सिट्रीन और ग्रीन एवेंट्यूरिन को साफ करने, धूप में चार्ज करने और सही हाथ में पहनने के नियम।',
    keyTakeaways: [
      'How Pyrite cluster attracts sales orders and prevents financial leakage',
      'Activating confidence and clarity for strong decision making',
      'Step-by-step method to cleanse crystals safely at home'
    ]
  }
];
