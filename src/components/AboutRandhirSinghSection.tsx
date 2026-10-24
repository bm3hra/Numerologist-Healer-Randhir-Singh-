import React, { useState } from 'react';
import { Award, Sparkles, MapPin, Clock, Gift, Phone, Mail, MessageCircle, X, ZoomIn, ArrowRight, CheckCircle2, Crown, BookOpen, Star, Watch, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface AboutRandhirSinghSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export interface AboutPhotoItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'cards' | 'portraits' | 'convocation' | 'awards' | 'certificates' | 'watches';
  categoryLabelEn: string;
  categoryLabelHi: string;
  imageUrl: string;
  captionEn: string;
  captionHi: string;
  tags: string[];
}

export const ABOUT_PHOTOS: AboutPhotoItem[] = [
  // 1. Official Enhanced Formal Portrait
  {
    id: 'photo_portrait_formal',
    titleEn: 'Enhanced Portrait of Randhir Singh — Official Formal Portrait',
    titleHi: 'मास्टर रणधीर सिंह — आधिकारिक गरिमामय पोर्ट्रेट',
    category: 'portraits',
    categoryLabelEn: 'Master Portrait',
    categoryLabelHi: 'मास्टर पोर्ट्रेट',
    imageUrl: '/assets/aistudio/Randhir_Singh_8dc81223.png',
    captionEn: 'High-definition formal portrait of Master Randhir Singh in azure blue formal attire with pocket pens and official nameplate, radiating calm authority, clarity, and mastery in Vedic numerology and pulse horology.',
    captionHi: 'मास्टर रणधीर सिंह का आधिकारिक गरिमामय पोर्ट्रेट। रॉयल ब्लू औपचारिक परिधान एवं नेमप्लेट में वैदिक ज्ञान, सकारात्मकता एवं दशकों के अनुभव का जीवंत स्वरूप।',
    tags: ['Master Randhir Singh', 'Jaipur Sanctuary', 'Vedic Numerologist', 'Enhanced Portrait']
  },

  // 2. Official Visiting Card Front (16 Sacred Services)
  {
    id: 'photo_card_services',
    titleEn: 'Official Visiting Card (Front) — All 16 Sacred Services',
    titleHi: 'आधिकारिक विजिटिंग कार्ड (सामने) — समस्त 16 पावन सेवाएं',
    category: 'cards',
    categoryLabelEn: 'Visiting Card',
    categoryLabelHi: 'विजिटिंग कार्ड',
    imageUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    captionEn: 'Authentic visiting card specifying all 16 sacred services: Numerology Consultation, Watch Analysis, Date of Birth Analysis, Therapy Watches, Child Birth Dates, Mobile Number Analysis, Negativity Removal & Salt Therapy, Name Corrections, Marriage & Health Remedies, Grid Matching, Health Switch Words, Spiritual & Pranic Healings, Sacred Healing Codes, DOB Yantras, Special Business/Job Yantras, and Growth Crystals.',
    captionHi: 'मास्टर रणधीर सिंह का अधिकृत विजिटिंग कार्ड जिसमें अंक ज्योतिष, वॉच एनालिसिस, थेरेपी वॉचेस, नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी), यंत्र एवं हीलिंग कोड्स सहित सभी 16 प्रमुख सेवाओं का संपूर्ण विवरण अंकित है।',
    tags: ['Visiting Card', '16 Sacred Services', 'Om Shri Ganeshay Namh', 'Remedies']
  },

  // 3. Official Visiting Card Back (Address, Timings & Free Sunday)
  {
    id: 'photo_card_address',
    titleEn: 'Official Visiting Card (Back) — Sanctuary Address & Timings',
    titleHi: 'आधिकारिक विजिटिंग कार्ड (पीछे) — परामर्श केंद्र पता एवं समय',
    category: 'cards',
    categoryLabelEn: 'Visiting Card',
    categoryLabelHi: 'विजिटिंग कार्ड',
    imageUrl: '/assets/about/visiting-card-address.svg',
    captionEn: 'Sanctuary address at H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur, Rajasthan (PIN: 302017). Consultation hours: 9 A.M. to 6 P.M., direct WhatsApp & UPI (+91-9509593150), email (randhirjpr@gmail.com), and the sacred privilege: "Every Sunday First Five Consultations Are Free {On Appointments}".',
    captionHi: 'मकान नं. 45, महादेव नगर, रामनगरिया रोड, जगतपुरा, जयपुर स्थित परामर्श केंद्र का आधिकारिक कार्ड। समय प्रातः 9 से सायं 6 बजे तक, एवं प्रत्येक रविवार प्रथम 5 परामर्श निःशुल्क की विशेष घोषणा।',
    tags: ['Jaipur Address', 'Timings', 'Free Sunday Consultations', 'WhatsApp +91-9509593150']
  },

  // 4. Proud Graduation Portrait with Golden Tassel
  {
    id: 'photo_graduation_tassel',
    titleEn: 'Proud Graduation Portrait with Golden Tassel',
    titleHi: 'दीक्षांत उपाधि पोर्ट्रेट — स्वर्ण फुंदने के साथ',
    category: 'portraits',
    categoryLabelEn: 'Convocation Portrait',
    categoryLabelHi: 'दीक्षांत पोर्ट्रेट',
    imageUrl: '/assets/about/proud-graduation-portrait-golden-tassel.svg',
    captionEn: 'Ceremonial full-length graduation portrait in black doctoral convocation gown, formal three-piece suit, patterned blue tie with tie clip, and mortarboard cap with radiant golden yellow tassel against champagne drapery.',
    captionHi: 'भव्य दीक्षांत समारोह गाउन, सूट, सिल्क टाई क्लिप एवं सुनहरे पीले फुंदने से सुशोभित कैप में मास्टर रणधीर सिंह का गौरवशाली उपाधि चित्र।',
    tags: ['Golden Tassel', 'Graduation Robe', 'Convocation 2024', 'Doctoral Regalia']
  },

  // 5. Man Presenting a Portrait Collage Wall
  {
    id: 'photo_collage_wall',
    titleEn: 'Man Presenting a Portrait Collage Wall of Scholars',
    titleHi: 'विद्वत दीवार प्रदर्शन — साथी अंक शास्त्रियों के साथ',
    category: 'portraits',
    categoryLabelEn: 'Scholars Wall',
    categoryLabelHi: 'विद्वत स्मृति दीवार',
    imageUrl: '/assets/about/randhir-singh-collage-wall.svg',
    captionEn: 'Master Randhir Singh in tailored black two-piece suit and patterned blue silk tie presenting the commemorative tree wall featuring certified numerology leaders and fellow practitioners across India.',
    captionHi: 'काले औपचारिक सूट व नीली सिल्क टाई में मास्टर रणधीर सिंह, भारत भर के प्रमाणित अंक शास्त्रियों की ज्ञान-वृक्ष स्मृति दीवार का भावपूर्ण प्रदर्शन करते हुए।',
    tags: ['Community Wall', 'Black Suit', 'Fellow Numerologists', 'Tree of Knowledge']
  },

  // 6. Proud Convocation Achievement in Delhi
  {
    id: 'photo_convocation_achievement',
    titleEn: 'Proud Convocation Achievement in Delhi — Dual Honors',
    titleHi: 'दीक्षांत समारोह दोहरा गौरव — नई दिल्ली सम्मान',
    category: 'convocation',
    categoryLabelEn: 'Academic Award',
    categoryLabelHi: 'अकादमिक पुरस्कार',
    imageUrl: '/assets/about/proud-convocation-achievement-delhi.svg',
    captionEn: 'Master Randhir Singh in academic graduation gown and golden tassel cap proudly holding the framed Royal Skills Academy Certificate (Regd. No. 10115) and 3-star wooden shield plaque from Dr. Rohit Sachdev (11th June 2024, Navgal Saikk Academy, New Delhi).',
    captionHi: 'दीक्षांत पोशाक एवं स्वर्ण फुंदने वाली कैप में मास्टर रणधीर सिंह। रॉयल स्किल्स एकेडमी प्रमाण-पत्र (पंजीकरण 10115) तथा डॉ. रोहित सचदेव द्वारा प्रदत्त 3-स्टार काष्ठ स्मृति-चिह्न के साथ।',
    tags: ['Royal Skills Academy', 'Regd 10115', 'Dr. Rohit Sachdev', 'Advance Numerology']
  },

  // 7. Randhir Singh at the Numerologists’ Convocation Podium
  {
    id: 'photo_podium_address',
    titleEn: 'Randhir Singh at the Numerologists’ Convocation (8th June 2024)',
    titleHi: 'अंक ज्योतिषी सम्मेलन मंच — 8 जून 2024 मुख्य उद्बोधन',
    category: 'convocation',
    categoryLabelEn: 'Convocation Podium',
    categoryLabelHi: 'दीक्षांत मंच',
    imageUrl: '/assets/about/randhir-singh-at-convocation-podium.svg',
    captionEn: 'Master Randhir Singh addressing international delegates from the official podium with golden nameplate pinned to his suit lapel, speaking on the historic 2nd Mega Convocation stage in New Delhi.',
    captionHi: 'सूट लैपल पर रणधीर सिंह नेमप्लेट के साथ पोडियम से देश-विदेश से पधारे अंक ज्योतिष शोधार्थियों एवं साधकों को संबोधित करते हुए।',
    tags: ['Podium Speech', 'Nameplate', 'New Delhi Convention', '8th June 2024']
  },

  // 8. Numerologists’ Mega Convocation Speech at Radisson Blu
  {
    id: 'photo_convocation_speech',
    titleEn: 'Numerologists’ Mega Convocation Speech — Radisson Blu Keynote',
    titleHi: 'द्वितीय महा दीक्षांत व्याख्यान — रैडिसन ब्लू नई दिल्ली',
    category: 'convocation',
    categoryLabelEn: 'Keynote Address',
    categoryLabelHi: 'मुख्य व्याख्यान',
    imageUrl: '/assets/about/numerologists-mega-convocation-speech.svg',
    captionEn: 'Delivering the keynote address on pulse vibration and subconscious numerology at the 2nd Mega Convocation on 16th June 2024 at Radisson Blu, New Delhi, before the "Number of Numerologists to Explore the World" tree backdrop.',
    captionHi: '16 जून 2024 को रैडिसन ब्लू, नई दिल्ली में आयोजित द्वितीय महा दीक्षांत समारोह के मंच से कलाई स्पंदन एवं अंक ज्योतिष पर मुख्य व्याख्यान प्रस्तुत करते हुए।',
    tags: ['Radisson Blu', 'Keynote Speech', '16 June 2024', 'Convocation']
  },

  // 9. Certificate of Excellence Celebration on Stage
  {
    id: 'photo_excellence_celebration',
    titleEn: 'Certificate of Excellence Celebration Ceremony on Stage',
    titleHi: 'सर्टिफिकेट ऑफ एक्सीलेंस उत्सव मंच',
    category: 'awards',
    categoryLabelEn: 'Excellence Award',
    categoryLabelHi: 'उत्कृष्टता सम्मान',
    imageUrl: '/assets/about/certificate-of-excellence-celebration.svg',
    captionEn: 'Celebrating the conferral of the prestigious Certificate of Excellence on stage alongside distinguished colleagues, faculty mentors, and bright practitioners in occult sciences.',
    captionHi: 'मंच पर प्रख्यात विद्वानों एवं गुरुजनों के साथ सर्टिफिकेट ऑफ एक्सीलेंस (उत्कृष्टता प्रमाण-पत्र) प्रदान कर गौरव एवं आनंद साझा करते हुए।',
    tags: ['Certificate of Excellence', 'Stage Felicitation', 'Distinction', 'Occult Sciences']
  },

  // 10. Certificate Celebration Ceremony with Faculty
  {
    id: 'photo_completion_ceremony',
    titleEn: 'Certificate Celebration Ceremony with Faculty Mentors',
    titleHi: 'प्रमाण-पत्र वितरण उत्सव — संकाय सदस्यों के साथ',
    category: 'awards',
    categoryLabelEn: 'Ceremony',
    categoryLabelHi: 'सम्मान समारोह',
    imageUrl: '/assets/about/certificate-celebration-ceremony.svg',
    captionEn: 'Felicitation ceremony presenting certificates under stage illuminations and floral garlands in front of the scholars tree wall, celebrating the completion of national skill empowerment programs.',
    captionHi: 'पुष्पमालाओं एवं भव्य प्रकाश से सुसज्जित दीक्षांत मंच पर संकाय सदस्यों के साथ अधिकृत कौशल पूर्णता प्रमाण-पत्र वितरण का गरिमामय दृश्य।',
    tags: ['Felicitation', 'Floral Stage', 'Ceremony', 'DDU-GKY']
  },

  // 11. Certificate-1: Advance Numerology Course (Reg: G-65)
  {
    id: 'photo_cert_completion_advance_numerology',
    titleEn: 'Advance Numerology Course Certificate of Completion (Reg: G-65)',
    titleHi: 'उन्नत अंक ज्योतिष पाठ्यक्रम पूर्णता प्रमाण-पत्र (परामर्श अधिकृत)',
    category: 'certificates',
    categoryLabelEn: 'Licensed Practice',
    categoryLabelHi: 'परामर्श अधिकृत',
    imageUrl: '/assets/certificates/certificate-advance-numerology.svg',
    captionEn: 'Official Certificate of Completion awarded to Mr. RANDHIR SINGH JI for successfully undergoing the Advance Numerology Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist), accredited under DD Consultants, UDYAM-GJ-22-0158332 and ISO-9001:2015. Formally authorizes professional practice as a consultant.',
    captionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा रणधीर सिंह जी को उन्नत अंक ज्योतिष पाठ्यक्रम पूर्ण करने पर प्रदान किया गया अधिकृत पूर्णता प्रमाण पत्र (पंजीकरण सं. G-65), जो उन्हें आधिकारिक परामर्शदाता के रूप में अभ्यास हेतु मान्यता देता है।',
    tags: ['Reg G-65', 'Advance Numerology', 'DD Consultants', 'Dr. Rohit Gadkari', 'Ganesha & Saraswati']
  },

  // 12. Certificate-2: Advanced Wrist Watch Course (Reg: A-H 44)
  {
    id: 'photo_cert_advanced_wristwatch',
    titleEn: 'Advanced Wrist Watch Course Certificate of Achievement (Reg: A-H 44)',
    titleHi: 'उन्नत कलाई घड़ी (रिस्ट वॉच) विश्लेषण उपलब्धि प्रमाण-पत्र',
    category: 'certificates',
    categoryLabelEn: 'Horology Credential',
    categoryLabelHi: 'हस्त घड़ी प्रमाण-पत्र',
    imageUrl: '/assets/certificates/certificate-advanced-wristwatch.svg',
    captionEn: 'Certificate of Achievement acknowledging and honoring Randhir Singh for successfully completing the Advanced Wrist Watch Course on 24 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-H 44). Validates supreme mastery in dial shapes, radial pulse vibrations, and customized therapy watches.',
    captionHi: 'डॉ. रोहित गड़करी द्वारा 24 नवंबर 2024 को प्रदान किया गया कलाई घड़ी विश्लेषण उपलब्धि प्रमाण पत्र (REG NO: A-H 44), जो डायल ज्यामिति, नब्ज स्पंदन एवं थेरेपी घड़ियों के प्रामाणिक ज्ञान को प्रमाणित करता है।',
    tags: ['Reg A-H 44', 'Advanced Wrist Watch', 'Radial Pulse', 'Dr. Rohit Gadkari', '24 Nov 2024']
  },

  // 13. Certificate-3: Advance Name Correction Course (Reg: A-F 55)
  {
    id: 'photo_cert_advance_name_correction',
    titleEn: 'Advance Name Correction Course Certificate (Reg: A-F 55)',
    titleHi: 'उन्नत नाम सुधार (नेम करेक्शन) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    category: 'certificates',
    categoryLabelEn: 'Name Vibration',
    categoryLabelHi: 'नामांक सामंजस्य',
    imageUrl: '/assets/certificates/certificate-advance-name-correction.svg',
    captionEn: 'Official Credential acknowledging and honoring Randhir Singh for successfully completing the Advance Name Correction Course on 22 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-F 55). Validates precision Chaldean, Pythagorean, and phonetic frequency name alignment.',
    captionHi: 'डॉ. रोहित गड़करी द्वारा 22 नवंबर 2024 को प्रदत्त उन्नत नाम सुधार पाठ्यक्रम प्रमाण पत्र (REG NO: A-F 55), जो कीरो एवं कॉस्मिक ध्वनि आवृत्तियों द्वारा नाम सामंजस्य की विशेषज्ञता प्रमाणित करता है।',
    tags: ['Reg A-F 55', 'Name Correction', 'Chaldean', 'Dr. Rohit Gadkari', '22 Nov 2024']
  },

  // 14. Certificate-4: Advance Placement Course (Reg: A-G 62)
  {
    id: 'photo_cert_advance_placement',
    titleEn: 'Advance Placement Course Certificate (Reg: A-G 62 · 23 NOV 2024)',
    titleHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    category: 'certificates',
    categoryLabelEn: 'Spatial Placement',
    categoryLabelHi: 'दिशात्मक स्थापन',
    imageUrl: '/assets/aistudio/Certificate-4_637f7316.jpeg',
    captionEn: 'Original photograph of official certificate honoring Randhir Singh for successfully completing the Advance Placement Course on 23 NOV 2024 under Dr. Rohit Gadkari (REG NO: A-G 62, UDYAM-GJ-22-0158332, ISO-9001:2015). Validates directional placement of sacred remedies and yantras.',
    captionHi: 'डॉ. रोहित गड़करी द्वारा रणधीर सिंह जी को 23 नवंबर 2024 को प्रदत्त मूल अधिकृत प्रमाण-पत्र (REG NO: A-G 62), जो कुआं अंक अनुसार यंत्रों एवं उपायों के दिशात्मक स्थापन को प्रमाणित करता है।',
    tags: ['Reg A-G 62', 'Advance Placement', 'Dr. Rohit Gadkari', '23 Nov 2024', 'ISO-9001:2015']
  },

  // 15. Luxury Gold and Blue Victorinox Numerology Watch
  {
    id: 'photo_watch_gold_blue',
    titleEn: 'Luxury Gold & Royal Blue Victorinox Precision Therapy Watch',
    titleHi: 'विक्टोरिनॉक्स 18K स्वर्ण एवं रॉयल ब्लू थेरेपी वॉच (ॐ यंत्र)',
    category: 'watches',
    categoryLabelEn: 'Therapy Watch',
    categoryLabelHi: 'थेरेपी वॉच',
    imageUrl: '/assets/aistudio/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png',
    captionEn: 'Master Randhir Singh’s consecrated Victorinox 18K Gold & Royal Azure Precision Therapy Watch. Designed with central golden Om (ॐ) mandala, dual protective inscriptions "NUMEROLOGY GUIDANCE" and "HEALING ENERGY POSITIVITY", Master Number 22 date aperture, and a divine golden blooming lotus at 6 o\'clock.',
    captionHi: 'मास्टर रणधीर सिंह द्वारा सिद्ध विक्टोरिनॉक्स 18K स्वर्ण व रॉयल ब्लू थेरेपी वॉच। डायल पर स्वर्ण ॐ यंत्र, "न्यूमेरोलॉजी गाइडेंस", "हीलिंग एनर्जी पॉजिटिविटी", मास्टर नंबर 22 दिनांक विंडो और दिव्य स्वर्ण कमल पुष्प अंकित है।',
    tags: ['Victorinox Gold & Blue', 'Om Mandala', 'Master Number 22', 'Radial Pulse', 'Lotus 6 O\'Clock']
  },

  // 16. Luxury Gold and Pearl White Ceramic Victorinox Watch
  {
    id: 'photo_watch_gold_white',
    titleEn: 'Luxury Gold & Pearl White Ceramic Victorinox Diagnostic Watch',
    titleHi: 'विक्टोरिनॉक्स पर्ल व्हाइट एवं 18K स्वर्ण डायग्नोस्टिक वॉच',
    category: 'watches',
    categoryLabelEn: 'Diagnostic Station',
    categoryLabelHi: 'डायग्नोस्टिक वॉच',
    imageUrl: '/assets/aistudio/Luxury_Gold_Numerology_Watch_0e113989.png',
    captionEn: 'Master Randhir Singh’s bespoke Victorinox precision diagnostic watch in solid 18K yellow gold with pristine ceramic pearl white bezel and textured Guilloche dial. Features central golden Om (ॐ) 12-petal yantra mandala, dual protective mantras, and Master Number 22 date aperture.',
    captionHi: 'विक्टोरिनॉक्स 18K स्वर्ण एवं शुद्ध पर्ल व्हाइट सिरेमिक थेरेपी वॉच। डायल पर केंद्र में स्वर्ण ॐ यंत्र, सुरक्षा मंत्र, 6 बजे मास्टर नंबर 22 दिनांक विंडो और स्वर्ण कमल पुष्प स्थापित है।',
    tags: ['Pearl White Ceramic', '18K Yellow Gold', 'Guilloche Dial', 'Om ॐ Yantra', 'Master 22']
  },

  // 17. Luxury Gold and Blue Swiss Dive Watch
  {
    id: 'photo_watch_swiss_dive_gold',
    titleEn: 'Victorinox Swiss Dive Watch — 18K Gold & Azure Ceramic Edition',
    titleHi: 'विक्टोरिनॉक्स 18K गोल्ड स्विस डाइव वॉच (रॉयल ब्लू डायल)',
    category: 'watches',
    categoryLabelEn: 'Swiss Dive Watch',
    categoryLabelHi: 'स्विस डाइव वॉच',
    imageUrl: '/assets/watches/victorinox-swiss-dive-watch-gold.svg',
    captionEn: 'Victorinox Swiss Dive Watch in solid 18K yellow gold casing and bracelet with deep azure ceramic rotating bezel, horizontal textured blue dial, Swiss Made automatic movement, and Master Date aperture at 6 o’clock.',
    captionHi: 'विक्टोरिनॉक्स स्विस डाइव वॉच — 18K येलो गोल्ड केस व ब्रेसलेट, डीप अज़ूर सिरेमिक बेज़ल, हॉरिजॉन्टल टेक्सचर्ड ब्लू डायल और 6 बजे दिनांक विंडो युक्त उत्कृष्ट स्विस घड़ी।',
    tags: ['18K Gold Case', 'Azure Bezel', 'Swiss Made', 'Dive Watch', 'Automatic']
  },

  // 18. Precision Victorinox Swiss Stainless Steel Watch (images.jpg)
  {
    id: 'photo_watch_swiss_dive_steel',
    titleEn: 'Precision Victorinox Swiss Stainless Steel Watch — Azure Dial',
    titleHi: 'विक्टोरिनॉक्स स्विस स्टेनलेस स्टील वॉच (क्लासिक ब्लू डायल)',
    category: 'watches',
    categoryLabelEn: 'Stainless Steel Edition',
    categoryLabelHi: 'स्टेनलेस स्टील',
    imageUrl: '/assets/watches/victorinox-swiss-dive-watch-steel.svg',
    captionEn: 'Classic Victorinox Swiss dive watch with solid brushed stainless steel case and 3-link bracelet, deep navy rotating dive bezel, luminous hands, and date at 6 o’clock. The baseline diagnostic standard for pulse and horological balance.',
    captionHi: 'सॉलिड ब्रश स्टेनलेस स्टील केस व 3-लिंक ब्रेसलेट, डीप नेवी रोटेटिंग बेज़ल एवं ल्यूमिनस हैंड्स युक्त विक्टोरिनॉक्स स्विस डाइव घड़ी, जो नाड़ी स्पंदन और समय संतुलन का प्रामाणिक आधार है।',
    tags: ['Stainless Steel', 'Navy Bezel', 'Swiss Army', 'Luminescent', 'Horology Baseline']
  }
];

export const AboutRandhirSinghSection: React.FC<AboutRandhirSinghSectionProps> = ({
  lang,
  onOpenBooking
}) => {
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<AboutPhotoItem | null>(null);

  const filteredPhotos = ABOUT_PHOTOS.filter((photo) => {
    if (photoFilter === 'all') return true;
    return photo.category === photoFilter;
  });

  return (
    <section id="about-randhir" className="relative py-14 sm:py-20 bg-[#fdfbf7] border-b border-amber-200/80">
      {/* Anchor targets for direct URL hash jumps */}
      <div id="about" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="randhir-singh" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'Numerologist & Healer · Randhir Singh | Jaipur'}</span>
          </div>

          <h2 className="font-sacred text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'मास्टर रणधीर सिंह जी का परिचय' : 'About Master Randhir Singh Ji'}
          </h2>

          <p className="font-sacred text-amber-900 font-semibold text-base sm:text-lg mt-2">
            {lang === 'hi'
              ? '“अपनी जन्मतिथि के रहस्यों को जानें। अपने जीवन को समझें और अपने भविष्य को नई दिशा दें।”'
              : '“DECODE YOUR DATE OF BIRTH. CHANGE YOUR LIFE AND DESTINY.”'}
          </p>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'जयपुर (राजस्थान) स्थित पावन परामर्श केंद्र से देश-विदेश के साधकों को वैदिक अंक ज्योतिष, थेरेपी वॉचेस, लवण शुद्धि एवं भोजपत्र यंत्रों द्वारा अचूक समाधान।'
              : 'Empowering thousands across India and worldwide from his Jaipur sanctuary through authentic Lo-Shu numerology, precision therapy horology, salt aura cleansing, and consecrated yantras.'}
          </p>
        </div>

        {/* Master Profile Hero Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  {lang === 'hi' ? 'जयपुर आध्यात्मिक पीठ' : 'Jaipur Spiritual Sanctuary'}
                </span>
                <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Master Randhir Singh (रणधीर सिंह)
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
                  Senior Vedic Numerologist · Horology Pulse Resonance Consultant · Pranic &amp; Crystal Healer
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold">
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Royal Skills Academy Regd. 10115</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Formal Portrait Card */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-64 sm:w-72 aspect-4/5 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg group bg-stone-900">
                <img
                  src="/assets/aistudio/Randhir_Singh_8dc81223.png"
                  alt="Master Randhir Singh Formal Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 inset-x-3 bg-stone-950/85 backdrop-blur-xs border border-amber-400/50 p-2 rounded-lg text-center">
                  <span className="text-xs font-bold text-amber-200 block">Master Randhir Singh</span>
                  <span className="text-[10px] text-stone-300">
                    {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · जयपुर' : 'Numerologist & Healer · Jaipur'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Biography & Pillars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
                <p>
                  {lang === 'hi' ? (
                    <>
                      <strong>मास्टर रणधीर सिंह</strong> जयपुर (राजस्थान) के सुविख्यात एवं वरिष्ठ वैदिक अंक ज्योतिषी, आध्यात्मिक हीलर एवं उपाय विशेषज्ञ हैं। विगत कई वर्षों से वे देश-विदेश के हजारों साधकों, उद्योगपतियों, कॉर्पोरेट लीडर्स एवं परिवारों को जन्म तिथि डिकोडिंग, करियर उन्नति, वैवाहिक सामंजस्य एवं आर्थिक स्थिरता हेतु प्रामाणिक मार्गदर्शन प्रदान कर रहे हैं।
                    </>
                  ) : (
                    <>
                      <strong>Master Randhir Singh</strong> is a celebrated Vedic Numerologist, Pulse Horology Expert, and Spiritual Healer based in Jaipur, Rajasthan. Serving seekers, business founders, and families across all 24 major Indian and international languages, his practice synthesizes authentic 3x3 Lo-Shu magic square vibrations with modern subconscious science.
                    </>
                  )}
                </p>

                <p>
                  {lang === 'hi' ? (
                    <>
                      रॉयल स्किल्स एकेडमी (पंजीकरण सं. 10115) एवं राष्ट्रीय कौशल सम्मेलन के गौरवशाली दीक्षांत उपाधि धारक, रणधीर सिंह जी विशेष रूप से <strong>थेरेपी वॉचेस (कलाई घड़ी नाड़ी स्पंदन विश्लेषण)</strong> तथा <strong>हिमालयन रॉक सॉल्ट ऊर्जा शुद्धि</strong> में विशेषज्ञता रखते हैं। उनके द्वारा अभिमंत्रित सिद्ध भोजपत्र यंत्र एवं हीलिंग कोड्स जीवन में अप्रत्याशित सफलता के द्वार खोलते हैं।
                    </>
                  ) : (
                    <>
                      Honored with the prestigious Royal Skills Academy doctoral convocation regalia (Regd. No. 10115) and keynote speaker recognition at the 2nd Mega Convocation at Radisson Blu, Master Randhir Singh is internationally renowned for his pioneer breakthroughs in <strong>Horological Pulse Resonance (Wristwatch Therapy)</strong> and <strong>Sendha Rock Salt Aura Shielding</strong>.
                    </>
                  )}
                </p>
              </div>

              {/* 3 Key Pillars Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? '16 पावन सेवाएं' : '16 Sacred Services'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'अंक ज्योतिष से लेकर विशेष भोजपत्र यंत्र व क्रिस्टल्स' : 'Complete repertoire from DOB analysis to Bhojpatra yantras'}
                  </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? 'कलाई घड़ी विशेषज्ञ' : 'Watch Therapy Master'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'डायल, रंग व नाड़ी स्पंदन से धन व शांति का संचार' : 'Radial artery pulse diagnosis & bespoke prescription dials'}
                  </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? 'रविवार निःशुल्क सेवा' : 'Sunday Free Gift'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'प्रत्येक रविवार प्रथम 5 परामर्श पूर्णतः निःशुल्क' : 'First 5 seekers receive free 20-min Vedic consultation'}
                  </p>
                </div>
              </div>

              {/* Jaipur Sanctuary Coordinates Bar */}
              <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-800 font-bold">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur, Rajasthan (PIN: 302017)</span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-600 text-[11px]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lang === 'hi' ? 'प्रातः 9:00 से सायं 6:00 बजे तक' : 'Timings: 9:00 AM – 6:00 PM'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>+91-9509593150 / 9694723150</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://wa.me/919509593150?text=Hello%20Master%20Randhir%20Ji%2C%20I%20would%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3.5 rounded-xl transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => onOpenBooking('About Randhir Singh Consultation')}
                    className="inline-flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-3.5 rounded-xl transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Session'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 18 Official Photos Gallery Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-md mb-2 border border-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'समस्त 18 आधिकारिक छायाचित्र एवं प्रमाण-पत्र' : 'All 18 Official Photos, Credentials & Timepieces'}</span>
            </div>
            <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-stone-900">
              {lang === 'hi' ? 'मास्टर रणधीर सिंह — संपूर्ण छायाचित्र एवं दीक्षांत यात्रा' : 'Master Randhir Singh — Complete Photo Portfolio'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {lang === 'hi'
                ? 'आधिकारिक विजिटिंग कार्ड (दोनों पक्ष), औपचारिक पोर्ट्रेट, रैडिसन ब्लू महा दीक्षांत व्याख्यान, अधिकृत कोर्स प्रमाण-पत्र एवं प्राण-प्रतिष्ठित थेरेपी घड़ियां।'
                : 'Explore official visiting cards, ceremonial convocation regalia, Radisson Blu keynote speeches, accredited course certificates, and consecrated luxury therapy timepieces.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { id: 'all', labelEn: `All 18 Photos (${ABOUT_PHOTOS.length})`, labelHi: `समस्त 18 छायाचित्र (${ABOUT_PHOTOS.length})` },
              { id: 'portraits', labelEn: 'Master Portraits (3)', labelHi: 'मास्टर पोर्ट्रेट (3)' },
              { id: 'convocation', labelEn: 'Mega Convocation (3)', labelHi: 'महा दीक्षांत समारोह (3)' },
              { id: 'awards', labelEn: 'Ceremony Honors (2)', labelHi: 'मंच सम्मान (2)' },
              { id: 'certificates', labelEn: 'Course Certificates (4)', labelHi: 'अधिकृत प्रमाण-पत्र (4)' },
              { id: 'watches', labelEn: 'Therapy Watches (4)', labelHi: 'थेरेपी घड़ियां (4)' },
              { id: 'cards', labelEn: 'Visiting Cards (2)', labelHi: 'विजिटिंग कार्ड (2)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPhotoFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  photoFilter === tab.id
                    ? 'bg-amber-900 text-white shadow-2xs ring-1 ring-amber-700'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400'
                }`}
              >
                {lang === 'hi' ? tab.labelHi : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-900 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                      {lang === 'hi' ? item.categoryLabelHi : item.categoryLabelEn}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-amber-800/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-sm">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'बड़ा देखें' : 'View Full'}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sacred text-sm sm:text-base font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === 'hi' ? item.captionHi : item.captionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center gap-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal for Full-Size Photo Inspection */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[92vh] flex flex-col">
              {/* Image Preview Container */}
              <div className="relative max-h-[62vh] bg-stone-950 flex items-center justify-center shrink-0 p-3 overflow-hidden">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[58vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Details & Actions Footer */}
              <div className="p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {lang === 'hi' ? selectedPhoto.categoryLabelHi : selectedPhoto.categoryLabelEn}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPhoto.tags.map((t, i) => (
                      <span key={i} className="text-[11px] text-stone-500 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'hi' ? selectedPhoto.titleHi : selectedPhoto.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {lang === 'hi' ? selectedPhoto.captionHi : selectedPhoto.captionEn}
                </p>

                <div className="pt-4 mt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-stone-500">
                    Master Randhir Singh · H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/919509593150?text=Hello%20Master%20Randhir%20Ji%2C%20I%20saw%20the%20photo%20%22${encodeURIComponent(selectedPhoto.titleEn)}%22%20and%20would%20like%20to%20inquire.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        const title = selectedPhoto.titleEn;
                        setSelectedPhoto(null);
                        onOpenBooking(title);
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
