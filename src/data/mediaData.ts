export interface PhotoItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: string;
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
  duration?: string;
  views?: string;
  thumbnailUrl: string;
  embedUrl?: string;
  descriptionEn: string;
  descriptionHi: string;
  keyTakeaways: string[];
}

export const PHOTO_GALLERY: PhotoItem[] = [];

export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: 'v_convocation',
    titleEn: '2nd Mega Convocation Keynote: "Number of Numerologists to Explore the World"',
    titleHi: '2nd मेगा कन्वोकेशन में मुख्य भाषण: "Number of Numerologists to Explore the World"',
    category: 'convocation',
    categoryLabel: 'Mega Convocation Keynote',
    thumbnailUrl: '/assets/aistudio/Numerologists__Mega_Convocation_Speech_3be65ab9.png',
    descriptionEn: 'Authentic photograph of Numerologist & Healer · Randhir Singh presiding at the official podium at Radisson Blu (16th June 2024), delivering the historic keynote address "NUMBER OF NUMEROLOGISTS TO EXPLORE THE WORLD" before international delegates.',
    descriptionHi: '16 जून 2024, रेडिसन ब्लू नई दिल्ली में आयोजित भव्य द्वितीय मेगा दीक्षांत समारोह के मंच से "Number of Numerologists to Explore the World" विषय पर मुख्य व्याख्यान प्रस्तुत करते हुए रणधीर सिंह जी की मूल फोटो।',
    keyTakeaways: [
      'Venue & Date: Radisson Blu Grand Ballroom · 16th June 2024',
      'Keynote Topic: Number of Numerologists to Explore the World',
      'Tree of Life Conclave Backdrop with international certified numerologists'
    ]
  },
  {
    id: 'v_excellence',
    titleEn: 'Grand Certificate Conferral & Excellence Felicitation Ceremony',
    titleHi: 'सर्टिफिकेट वितरण एवं उत्कृष्टता सम्मान समारोह',
    category: 'convocation',
    categoryLabel: 'Certificate of Excellence',
    thumbnailUrl: '/assets/aistudio/Certificate_of_Excellence_Celebration_7f16b464.png',
    descriptionEn: 'Celebration and stage conferral of the prestigious Certificate of Excellence honoring Randhir Singh on stage before mentors and fellow practitioners in recognition of outstanding occult science leadership.',
    descriptionHi: 'वरिष्ठ गुरुजनों एवं विद्वानों के समक्ष मंच पर "Certificate of Excellence" (उत्कृष्टता सम्मान) प्राप्त करते हुए रणधीर सिंह जी की यादगार मूल फोटो।',
    keyTakeaways: [
      'Conferral of Certificate of Excellence on National Convocation Stage',
      'Honoring dedication and valuable contribution to occult science guidance',
      'Accompanied by faculty mentors, directors, and certified scholars'
    ]
  },
  {
    id: 'v1',
    titleEn: 'Consecrated Victorinox 18K Gold & Pearl White Precision Therapy Watch',
    titleHi: 'विक्टोरिनॉक्स 18K गोल्ड एवं पर्ल व्हाइट प्रेसिजन थेरेपी वॉच (ॐ मंडला)',
    category: 'watch',
    categoryLabel: 'Therapy Watch Showcase',
    thumbnailUrl: '/assets/aistudio/Luxury_Gold_Numerology_Watch_0e113989.png',
    descriptionEn: 'Bespoke Victorinox precision diagnostic therapy watch personally energized by Numerologist & Healer · Randhir Singh. Crafted with solid yellow gold finish, white ceramic rotating bezel, central Golden Om (ॐ) mandala, and sacred lotus crest.',
    descriptionHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी द्वारा प्राण-प्रतिष्ठित विक्टोरिनॉक्स 18K गोल्ड थेरेपी वॉच। मध्य में स्वर्णिम ॐ मंडला, सफेद सिरामिक बेज़ल एवं कमल चिन्ह युक्त कलाई घड़ी।',
    keyTakeaways: [
      'Solid Yellow Gold Casing with White Precision Rotating Dive Bezel',
      'Central Consecrated Golden Om (ॐ) Mandala and Sacred Lotus Emblem',
      'Aperture at 6 o’clock aligned for radial pulse & subconscious harmony'
    ]
  },
  {
    id: 'v2',
    titleEn: 'Advance Numerology Course Certificate of Completion (Reg: G-65)',
    titleHi: 'एडवांस न्यूमेरोलॉजी कोर्स प्रमाण-पत्र (Reg: G-65)',
    category: 'masterclass',
    categoryLabel: 'Advance Numerology Credential',
    thumbnailUrl: '/assets/aistudio/Certificate-1_9a231948.jpeg',
    descriptionEn: 'Official Certificate of Completion awarded to Mr. RANDHIR SINGH JI for successfully completing the Advance Numerology Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Certified under UDYAM-GJ-22-0158332 and ISO-9001:2015 (Reg: G-65, DD Consultants) authorizing professional practice and consultation in 3x3 Lo-Shu grid matrices.',
    descriptionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा श्री रणधीर सिंह जी को एडवांस न्यूमेरोलॉजी कोर्स सफलतापूर्वक संपन्न करने पर प्रदत्त अधिकृत प्रमाण-पत्र (Reg: G-65)। यह ISO-9001:2015 एवं UDYAM-GJ-22-0158332 के तहत 3x3 ग्रिड विश्लेषण एवं अंक ज्योतिषीय परामर्श हेतु पूर्ण मान्यता प्रदान करता है।',
    keyTakeaways: [
      'Reg. No: G-65 · Conferred by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Accredited under UDYAM-GJ-22-0158332 & ISO-9001: 2015 (DD Consultants)',
      'Formal credential authorizing professional consultation in 3×3 Grid & Vedic Numerology'
    ]
  },
  {
    id: 'v4',
    titleEn: 'Advance Name Correction Course Certificate (REG NO: A-F 55 · 22 NOV 2024)',
    titleHi: 'एडवांस नेम करेक्शन कोर्स प्रमाण-पत्र (REG NO: A-F 55 · 22 नवंबर 2024)',
    category: 'crystals',
    categoryLabel: 'Name Vibration Credential',
    thumbnailUrl: '/assets/aistudio/Certificate-3_816dda7e.jpeg',
    descriptionEn: 'Official Certificate of Achievement honoring RANDHIR SINGH for successfully completing the Advance Name Correction Course on 22 NOV 2024 under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Validated under UDYAM-GJ-22-0158332 and ISO-9001:2015 (REG NO: A-F 55) for precision Chaldean and phonetic name alignment.',
    descriptionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा श्री रणधीर सिंह जी को 22 नवंबर 2024 को एडवांस नेम करेक्शन (नाम सुधार) कोर्स सफलतापूर्वक पूरा करने पर प्रदत्त मूल प्रमाण-पत्र (REG NO: A-F 55, ISO-9001:2015)। यह कील्डियन एवं पाइथागोरियन अंक गणना द्वारा नाम सुधार की आधिकारिक विशेषज्ञता प्रमाणित करता है।',
    keyTakeaways: [
      'Registration No: A-F 55 · Date of Issue: 22 NOV 2024',
      'Conferred by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Accredited under UDYAM-GJ-22-0158332 & ISO-9001: 2015 Certification'
    ]
  },
  {
    id: 'v3',
    titleEn: 'Official Visiting Card (Front) — All 16 Divine Services Overview',
    titleHi: 'आधिकारिक विजिटिंग कार्ड — सभी 16 प्रमुख सेवाओं का विवरण',
    category: 'salt',
    categoryLabel: 'Visiting Card & Services',
    thumbnailUrl: '/assets/aistudio/Card-Back_682c94ca.jpg',
    descriptionEn: 'Authentic visiting card specifying all 16 divine services offered by Numerologist & Healer · Randhir Singh at the Jaipur Sanctuary: DOB Analysis, Therapy Watches, Salt Aura Cleansing, Yantras, Name Correction, and Sunday Free Consultations.',
    descriptionHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी का मूल विजिटिंग कार्ड, जिसमें सभी 16 प्रमुख सेवाओं (जन्मतिथि, कलाई घड़ी विश्लेषण, सॉल्ट थेरेपी, सिद्ध यंत्र एवं रविवार निःशुल्क परामर्श) की संपूर्ण जानकारी है।',
    keyTakeaways: [
      'All 16 Divine Services: DOB analysis, Watch diagnosis, Salt aura cleansing, Yantras',
      'Sanctuary Coordinates: H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur',
      'Divine Privilege: Every Sunday first five consultations are free (on appointment)'
    ]
  }
];
