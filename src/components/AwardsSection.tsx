import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Medal,
  Star,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  ZoomIn,
  ExternalLink,
  Calendar,
  MapPin,
  X,
  FileCheck2,
  Eye,
  Download
} from 'lucide-react';
import { Language } from '../types';

interface AwardsSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export interface FeaturedCertificate {
  id: string;
  badgeEn: string;
  badgeHi: string;
  badgeColor: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  imageUrl: string;
  altImageUrl?: string;
  altLabelEn?: string;
  altLabelHi?: string;
  yearEn: string;
  yearHi: string;
  venueEn: string;
  venueHi: string;
  conferredByEn: string;
  conferredByHi: string;
  verificationCode: string;
  descriptionEn: string;
  descriptionHi: string;
  highlightsEn: string[];
  highlightsHi: string[];
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ lang, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'convocation' | 'conclave'>('all');
  const [previewCert, setPreviewCert] = useState<{
    title: string;
    image: string;
    desc: string;
    venue: string;
    verificationCode?: string;
  } | null>(null);

  // The 3 official certificate images explicitly requested in the award section
  const featuredCertificates: FeaturedCertificate[] = [
    {
      id: 'cert_advance_placement',
      badgeEn: 'Advance Placement Credential',
      badgeHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) प्रमाण-पत्र',
      badgeColor: 'bg-teal-50 text-teal-900 border-teal-300',
      titleEn: 'Advance Placement Course Certificate',
      titleHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम पूर्णता प्रमाण-पत्र',
      subtitleEn: 'Successfully Completing the Advance placement Course · ISO-9001:2015',
      subtitleHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा अधिकृत पूर्णता प्रमाण-पत्र',
      imageUrl: '/assets/aistudio/Certificate-4_637f7316.jpeg',
      yearEn: '23 NOV 2024',
      yearHi: '23 नवंबर 2024',
      venueEn: 'Dr. Rohit Gadkari Accreditation (UDYAM-GJ-22-0158332)',
      venueHi: 'डॉ. रोहित गड़करी राष्ट्रीय प्रमाणन (UDYAM-GJ-22-0158332)',
      conferredByEn: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      conferredByHi: 'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट)',
      verificationCode: 'UDYAM-GJ-22-0158332 / REG NO: A-G 62',
      descriptionEn:
        'Official Certificate acknowledging and honoring Randhir Singh for successfully completing the Advance placement Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Formally accredited with Government UDYAM-GJ-22-0158332 and ISO-9001: 2015 standards.',
      descriptionHi:
        'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट) द्वारा रणधीर सिंह जी को उन्नत दिशात्मक स्थापन (एडवांस प्लेसमेंट) पाठ्यक्रम सफलतापूर्वक पूर्ण करने पर प्रदान किया गया अधिकृत पूर्णता प्रमाण पत्र (REG NO: A-G 62, ISO-9001: 2015)।',
      highlightsEn: [
        'Official Registration: REG NO: A-G 62 (Conferred 23 NOV 2024)',
        'Signed by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
        'National UDYAM-GJ-22-0158332 & ISO-9001: 2015 Certified',
        'Official teal geometric framing with emerald rosette star seal'
      ],
      highlightsHi: [
        'आधिकारिक पंजीकरण क्रमांक: REG NO: A-G 62 (23 नवंबर 2024)',
        'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट) द्वारा हस्ताक्षरित',
        'राष्ट्रीय उद्यम UDYAM-GJ-22-0158332 एवं ISO-9001: 2015 गुणवत्ता मानक प्रमाणित',
        'आधिकारिक टील ज्योमेट्रिक डिज़ाइन एवं रोसेट स्टार सील युक्त मूल प्रमाण पत्र'
      ]
    },
    {
      id: 'cert_excellence',
      badgeEn: 'National Excellence & Gold Seal',
      badgeHi: 'राष्ट्रीय उत्कृष्टता एवं स्वर्ण सील अलंकरण',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      titleEn: 'National Certificate of Excellence in Numerology',
      titleHi: 'राष्ट्रीय उत्कृष्टता प्रमाण-पत्र (Certificate of Excellence)',
      subtitleEn: 'Outstanding Performance, Dedication & Valuable Contribution',
      subtitleHi: 'अंक ज्योतिष सेवा, निष्ठा एवं उत्कृष्ट योगदान हेतु सर्वोच्च सम्मान',
      imageUrl: '/assets/certificates/certificate-of-excellence.svg',
      altImageUrl: '/assets/awards/certificate-of-excellence-celebration.svg',
      altLabelEn: 'View Ceremony Celebration Scene',
      altLabelHi: 'समारोह मंच दृश्य देखें',
      yearEn: 'Mega Convocation 2024',
      yearHi: 'विशाल दीक्षांत समारोह 2024',
      venueEn: 'Radisson Blu Assembly',
      venueHi: 'रेडिसन ब्लू सम्मेलन',
      conferredByEn: 'Director & Chairman Numerologist & Healer · Randhir Singh',
      conferredByHi: 'निदेशक एवं अध्यक्ष अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह',
      verificationCode: 'EXC-NUM/CONV/GOLD-2024',
      descriptionEn:
        'Bestowed in recognition of exceptional research, diagnostic precision in watch numerology and name vibrations, and unwavering commitment to ethical seeker empowerment. Features embossed gold Guilloché border and golden rosette seal.',
      descriptionHi:
        'अंक ज्योतिष एवं उपचारात्मक साधनाओं में अद्वितीय योगदान, उत्कृष्ट प्रदर्शन एवं सेवा भाव के लिए प्रदान किया गया स्वर्ण-मुद्रित सर्वोच्च उत्कृष्टता प्रमाण पत्र। यह गहन शोध व अचूक गणना का प्रतीक है।',
      highlightsEn: [
        'Embossed gold guilloché ornamental borders with floral corners',
        'Official citation for outstanding performance & dedicated contribution',
        'Certified by Council Director and Chairman Numerologist & Healer · Randhir Singh',
        'Includes celebration stage ceremony conferral capture'
      ],
      highlightsHi: [
        'स्वर्ण गिलौश बॉर्डर एवं आकर्षक कोणीय अलंकरण',
        'उत्कृष्ट कार्य प्रदर्शन एवं समर्पित सेवा का आधिकारिक प्रशस्ति पत्र',
        'परिषद निदेशक एवं अध्यक्ष अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह द्वारा प्रमाणित',
        'मंच पर प्रदान किए गए गरिमामय समारोह दृश्य सहित'
      ]
    },
    {
      id: 'cert_keynote',
      badgeEn: 'Historic Keynote & Presidential Crest',
      badgeHi: 'ऐतिहासिक मुख्य व्याख्याता एवं अध्यक्षीय क्रेस्ट',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      titleEn: '2nd Mega Convocation Keynote Address & Crest',
      titleHi: 'द्वितीय विशाल दीक्षांत समारोह — रेडिसन ब्लू मुख्य व्याख्यान गौरव',
      subtitleEn: '"NUMBER OF NUMEROLOGISTS TO EXPLORE THE WORLD"',
      subtitleHi: '"विश्व भर में अंक शास्त्रियों का प्रसार एवं जन-कल्याण"',
      imageUrl: '/assets/certificates/radisson-blu-convocation-crest.svg',
      altImageUrl: '/assets/awards/numerologists-mega-convocation-speech.svg',
      altLabelEn: 'View Keynote Speech from Podium',
      altLabelHi: 'मंच से मुख्य भाषण दृश्य देखें',
      yearEn: '16th June 2024',
      yearHi: '16 जून 2024',
      venueEn: 'Radisson Blu Grand Ballroom',
      venueHi: 'रेडिसन ब्लू ग्रैण्ड बॉलरूम',
      conferredByEn: 'Numerologist & Healer · Randhir Singh (Keynote Speaker & Presiding Master)',
      conferredByHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह (मुख्य वक्ता एवं पीठासीन गुरु)',
      verificationCode: 'RAD-BLU/CONV/2024-JUN16',
      descriptionEn:
        'Numerologist & Healer · Randhir Singh presided and delivered the historic keynote address "NUMBER OF NUMEROLOGISTS TO EXPLORE THE WORLD" with the sacred Tree of Life Chakra emblem at Radisson Blu before hundreds of international delegates and certified practitioners.',
      descriptionHi:
        '16 जून 2024 को रेडिसन ब्लू में आयोजित भव्य द्वितीय दीक्षांत समारोह, जहाँ अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह ने "Number of Numerologists to Explore the World" पर ऐतिहासिक मुख्य व्याख्यान दिया और पावन ट्री ऑफ लाइफ चक्र क्रेस्ट का अनावरण किया।',
      highlightsEn: [
        'Conclave Venue: Radisson Blu Luxury Ballroom (16th June 2024)',
        'Historic Keynote: Number of Numerologists to Explore the World',
        'Tree of Life & Meditating Chakra Yogi Presidential Crest',
        'Attended by hundreds of scholars and certified practitioners worldwide'
      ],
      highlightsHi: [
        'सम्मेलन स्थल: रेडिसन ब्लू लक्ज़री बॉलरूम (16 जून 2024)',
        'ऐतिहासिक संबोधन: "Number of Numerologists to Explore the World"',
        'पावन ट्री ऑफ लाइफ एवं ध्यानस्थ योगी चक्र अध्यक्षीय प्रतीक',
        'देश-विदेश के सैकड़ों विद्वानों एवं अभ्यासियों की उपस्थिति'
      ]
    }
  ];

  const majorHonors = [
    {
      id: 'c1',
      type: 'convocation',
      year: '16th June 2024',
      yearHi: '16 जून 2024',
      venue: 'Radisson Blu',
      venueHi: 'रेडिसन ब्लू',
      title: '2nd Mega Convocation Keynote Address',
      titleHi: 'द्वितीय विशाल दीक्षांत समारोह — मुख्य व्याख्याता सम्मान',
      organization: 'Global Council of Certified Numerologists & Healers',
      organizationHi: 'ग्लोबल काउंसिल ऑफ सर्टिफाइड न्यूमेरोलॉजिस्ट्स एंड हीलर्स',
      description:
        'Presided and delivered the keynote address "NUMBER OF NUMEROLOGISTS TO EXPLORE THE WORLD" with Tree of Life Chakra emblem before hundreds of international delegates.',
      descriptionHi:
        'सैकड़ों अंतरराष्ट्रीय प्रतिनिधियों के समक्ष "Number of Numerologists to Explore the World" विषय पर मुख्य व्याख्यान प्रस्तुत किया एवं ट्री ऑफ लाइफ चक्र से अलंकृत हुए।',
      icon: Trophy,
      badge: 'Historic Keynote',
      badgeHi: 'ऐतिहासिक मुख्य वक्ता',
      image: '/assets/certificates/radisson-blu-convocation-crest.svg'
    },
    {
      id: 'c2',
      type: 'convocation',
      year: 'Conferred 2024',
      yearHi: 'सत्र 2024',
      venue: 'Radisson Blu Assembly',
      venueHi: 'रेडिसन ब्लू सभा',
      title: 'National Certificate of Excellence in Numerology',
      titleHi: 'राष्ट्रीय उत्कृष्टता प्रमाण-पत्र (Certificate of Excellence)',
      organization: 'All India Numerology & Esoteric Board',
      organizationHi: 'अखिल भारतीय अंक ज्योतिष एवं गूढ़ विज्ञान परिषद',
      description:
        'Awarded with gold rosette seal in recognition of outstanding performance, devotion, and monumental contribution to Vedic science and human empowerment.',
      descriptionHi:
        'अंक ज्योतिष शोध, समर्पण एवं मानव कल्याण में अभूतपूर्व योगदान हेतु स्वर्ण रोसेट सील से सुशोभित राष्ट्रीय उत्कृष्टता प्रमाण-पत्र।',
      icon: Award,
      badge: 'Gold Merit Seal',
      badgeHi: 'स्वर्ण मेरिट सील',
      image: '/assets/certificates/certificate-of-excellence.svg'
    },
    {
      id: 'c3',
      type: 'convocation',
      year: '23 NOV 2024',
      yearHi: '23 नवंबर 2024',
      venue: 'UDYAM-GJ-22-0158332',
      venueHi: 'उद्यम GJ-22-0158332',
      title: 'Advance Placement Course Certificate Conferral',
      titleHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम पूर्णता प्रमाण-पत्र',
      organization: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      organizationHi: 'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट)',
      description:
        'Official credential acknowledging and honoring Randhir Singh for successfully completing the Advance placement Course under Dr. Rohit Gadkari.',
      descriptionHi:
        'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट) द्वारा रणधीर सिंह जी को एडवांस प्लेसमेंट कोर्स पूर्णता हेतु प्रदान किया गया अधिकृत प्रमाण-पत्र (REG NO: A-G 62)।',
      icon: Medal,
      badge: 'ISO-9001:2015 Accredited',
      badgeHi: 'ISO-9001:2015 प्रमाणित',
      image: '/assets/aistudio/Certificate-4_637f7316.jpeg'
    },
    {
      id: 'a1',
      type: 'conclave',
      year: 'National Conclave',
      yearHi: 'राष्ट्रीय सम्मेलन',
      venue: 'New Delhi',
      venueHi: 'नई दिल्ली',
      title: 'Vedic Jyotish & Numerology Ratna',
      titleHi: 'वैदिक ज्योतिष एवं अंक रत्न सम्मान',
      organization: 'All India Vedic Astrological Research Society',
      organizationHi: 'अखिल भारतीय वैदिक ज्योतिष अनुसंधान संस्थान',
      description:
        'Conferred for master-level synthesis of ancient Vedic numerology with Lo-Shu magic grid matrices and precision karmic remediation.',
      descriptionHi:
        'प्राचीन वैदिक अंक शास्त्र एवं लो-शू जादुई ग्रिड के अद्भुत समन्वय व अचूक कर्माधारित उपायों हेतु प्रदान किया गया रत्न सम्मान।',
      icon: Trophy,
      badge: 'Ratna Honor',
      badgeHi: 'रत्न सम्मान'
    },
    {
      id: 'a2',
      type: 'conclave',
      year: 'Jaipur Conclave',
      yearHi: 'जयपुर सम्मेलन',
      venue: 'Jaipur, Rajasthan',
      venueHi: 'जयपुर, राजस्थान',
      title: 'Rajasthan Spiritual Excellence Samman',
      titleHi: 'राजस्थान आध्यात्मिक सेवा सम्मान',
      organization: 'Heritage & Traditional Sciences Forum, Jaipur',
      organizationHi: 'धरोहर एवं पारंपरिक विज्ञान मंच, जयपुर',
      description:
        'Celebrated for continuous selfless guidance to seekers and upholding the cherished tradition of offering Free Sunday Consultations to the community.',
      descriptionHi:
        'साधकों को निरंतर निःस्वार्थ मार्गदर्शन प्रदान करने एवं प्रति रविवार निःशुल्क परामर्श की जनकल्याणकारी परंपरा के लिए सम्मानित।',
      icon: Medal,
      badge: 'State Honor',
      badgeHi: 'राज्य सम्मान'
    },
    {
      id: 'a3',
      type: 'conclave',
      year: 'Holistic Assembly',
      yearHi: 'समग्र स्वास्थ्य सभा',
      venue: 'National Summit',
      venueHi: 'राष्ट्रीय शिखर सम्मेलन',
      title: 'Pioneer in Watch Numerology & Therapy Watches',
      titleHi: 'वॉच एनालिसिस एवं थेरेपी वॉचेस प्रवर्तक सम्मान',
      organization: 'National Esoteric & Vibrational Sciences Council',
      organizationHi: 'राष्ट्रीय गूढ़ एवं तरंग विज्ञान परिषद',
      description:
        'Felicitation acknowledging innovative research on radial pulse meridian frequencies, wristwatch dial geometry, and subconscious wealth alignment.',
      descriptionHi:
        'कलाई की नब्ज (रेडियल पल्स), घड़ी के डायल की ज्यामिति एवं अवचेतन धन आकर्षण पर मौलिक शोध हेतु विशेष सम्मान।',
      icon: Award,
      badge: 'Innovation Award',
      badgeHi: 'नवाचार सम्मान'
    }
  ];

  const filteredHonors = majorHonors.filter((h) => {
    if (activeTab === 'all') return true;
    return h.type === activeTab;
  });

  return (
    <section id="awards-recognition" className="relative py-12 sm:py-16 bg-[#faf6ee] border-b border-amber-200/80">
      {/* Target anchor for direct #awards URL navigation */}
      <div id="awards" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'प्रतिष्ठित राष्ट्रीय सम्मान व अलंकरण' : 'Prestigious Honors & Felicitations'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'पुरस्कार एवं राष्ट्रीय सम्मान' : 'AWARDS & NATIONAL RECOGNITION'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi'
              ? 'ज्योतिष और आध्यात्मिक साधना में उत्कृष्ट योगदान हेतु राष्ट्रीय सम्मेलनों, विश्वविद्यालयों एवं वैदिक पीठों द्वारा सम्मानित।'
              : 'Celebrated across prestigious national assemblies, universities, and Vedic conclaves for exceptional contribution to Jyotish and spiritual mentorship.'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'वैदिक अंक ज्योतिष, वॉच एनालिसिस, एडवांस प्लेसमेंट एवं 16 जून 2024 रेडिसन ब्लू विशाल दीक्षांत समारोह में मुख्य व्याख्याता गौरव सहित अधिकृत प्रमाण-पत्रों से अलंकृत।'
              : 'Recognized for decades of unwavering devotion to authentic Vedic sciences, keynote leadership at Radisson Blu 2024 Mega Convocation, and official Advance Placement Course accreditations.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3 FEATURED CERTIFICATE IMAGES SHOWCASE */}
        {/* ========================================================================= */}
        <div className="mb-14 bg-gradient-to-br from-amber-900/5 via-stone-100/80 to-amber-900/10 rounded-3xl p-5 sm:p-8 border-2 border-amber-300/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-300/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center shadow-xs">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sacred text-lg sm:text-xl font-extrabold text-stone-900">
                  {lang === 'hi'
                    ? 'प्रमुख 3 आधिकारिक प्रमाण-पत्र एवं दीक्षांत अलंकरण'
                    : 'Featured Official Certificates & Convocation Credentials (3 Assets)'}
                </h3>
                <p className="text-xs text-amber-900 font-medium">
                  {lang === 'hi'
                    ? 'रेडिसन ब्लू विशाल दीक्षांत समारोह एवं डॉ. रोहित गड़करी द्वारा अधिकृत मूल प्रमाण-पत्र'
                    : 'Authentic Conferred Assets from Radisson Blu Mega Convocation & Dr. Rohit Gadkari'}
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? '3 मूल प्रमाण-पत्र' : '3 Verified Assets'}</span>
            </span>
          </div>

          {/* 3 Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCertificates.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border-2 border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Certificate Frame with Image */}
                <div className="relative bg-gradient-to-b from-stone-100 to-amber-50/60 p-4 border-b border-amber-200/70">
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${cert.badgeColor}`}
                    >
                      {lang === 'hi' ? cert.badgeHi : cert.badgeEn}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-stone-600 bg-white/80 px-2 py-0.5 rounded border border-stone-200">
                      {lang === 'hi' ? cert.yearHi : cert.yearEn}
                    </span>
                  </div>

                  {/* Certificate Image Frame */}
                  <div
                    onClick={() =>
                      setPreviewCert({
                        title: lang === 'hi' ? cert.titleHi : cert.titleEn,
                        image: cert.imageUrl,
                        desc: lang === 'hi' ? cert.descriptionHi : cert.descriptionEn,
                        venue: lang === 'hi' ? cert.venueHi : cert.venueEn,
                        verificationCode: cert.verificationCode
                      })
                    }
                    className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border-2 border-amber-300/80 bg-white cursor-pointer group-hover:shadow-lg transition-all flex items-center justify-center p-2"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.titleEn}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-amber-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                        <span>{lang === 'hi' ? 'बड़ा देखें' : 'Inspect Fullscreen'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-6 right-6">
                    <span className="text-[10px] font-bold bg-stone-900/75 text-amber-200 px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
                      #{index + 1} of 3
                    </span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sacred text-base font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                      {lang === 'hi' ? cert.titleHi : cert.titleEn}
                    </h4>

                    <p className="text-xs font-semibold text-amber-900 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>
                        {lang === 'hi' ? cert.venueHi : cert.venueEn} · {lang === 'hi' ? cert.yearHi : cert.yearEn}
                      </span>
                    </p>

                    <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                      {lang === 'hi' ? cert.conferredByHi : cert.conferredByEn}
                    </p>

                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                      {lang === 'hi' ? cert.descriptionHi : cert.descriptionEn}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-3.5 space-y-1.5 pt-3 border-t border-stone-100">
                      {(lang === 'hi' ? cert.highlightsHi : cert.highlightsEn).slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-medium text-stone-500 truncate max-w-[150px]">
                      {cert.verificationCode}
                    </span>

                    <div className="flex items-center gap-2">
                      {cert.altImageUrl && (
                        <button
                          onClick={() =>
                            setPreviewCert({
                              title: lang === 'hi' ? `${cert.titleHi} (मंच समारोह)` : `${cert.titleEn} (Ceremony Scene)`,
                              image: cert.altImageUrl!,
                              desc: lang === 'hi' ? cert.descriptionHi : cert.descriptionEn,
                              venue: lang === 'hi' ? cert.venueHi : cert.venueEn,
                              verificationCode: cert.verificationCode
                            })
                          }
                          className="text-[11px] font-bold text-stone-600 hover:text-amber-900 inline-flex items-center gap-1"
                          title={lang === 'hi' ? cert.altLabelHi : cert.altLabelEn}
                        >
                          <Eye className="w-3 h-3 text-amber-700" />
                          <span>{lang === 'hi' ? 'मंच दृश्य' : 'Scene'}</span>
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setPreviewCert({
                            title: lang === 'hi' ? cert.titleHi : cert.titleEn,
                            image: cert.imageUrl,
                            desc: lang === 'hi' ? cert.descriptionHi : cert.descriptionEn,
                            venue: lang === 'hi' ? cert.venueHi : cert.venueEn,
                            verificationCode: cert.verificationCode
                          })
                        }
                        className="text-xs font-bold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                      >
                        <span>{lang === 'hi' ? 'प्रमाण-पत्र खोलें' : 'View Asset'}</span>
                        <ZoomIn className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills for All Honors */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-200/70 p-1 rounded-xl flex flex-wrap items-center justify-center gap-1 border border-stone-300">
            {[
              { id: 'all', labelEn: 'All Honors & Felicitations', labelHi: 'सभी सम्मान एवं पुरस्कार' },
              { id: 'convocation', labelEn: '2nd Mega Convocation & Certificates (2024)', labelHi: 'द्वितीय दीक्षांत समारोह एवं प्रमाण-पत्र' },
              { id: 'conclave', labelEn: 'National Vedic Conclaves', labelHi: 'राष्ट्रीय वैदिक सम्मेलन' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {lang === 'hi' ? tab.labelHi : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredHonors.map((honor) => {
            const Icon = honor.icon;
            return (
              <div
                key={honor.id}
                className="bg-white rounded-2xl border-2 border-amber-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Visual certificate preview banner if image exists */}
                {honor.image && (
                  <div className="h-44 bg-gradient-to-b from-stone-100 to-amber-50/50 p-3 border-b border-amber-200/70 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={honor.image}
                      alt={honor.title}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <button
                      onClick={() =>
                        setPreviewCert({
                          title: lang === 'hi' ? honor.titleHi : honor.title,
                          image: honor.image!,
                          desc: lang === 'hi' ? honor.descriptionHi : honor.description,
                          venue: lang === 'hi' ? honor.venueHi : honor.venue
                        })
                      }
                      className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs"
                    >
                      <span className="inline-flex items-center gap-1 bg-amber-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                        <span>{lang === 'hi' ? 'प्रमाण-पत्र का निरीक्षण करें' : 'Inspect Certificate'}</span>
                      </span>
                    </button>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5 text-amber-200" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {lang === 'hi' ? honor.badgeHi : honor.badge}
                      </span>
                    </div>

                    <h3 className="font-sacred text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {lang === 'hi' ? honor.titleHi : honor.title}
                    </h3>

                    <p className="text-xs font-semibold text-amber-900 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>
                        {lang === 'hi' ? honor.venueHi : honor.venue} · {lang === 'hi' ? honor.yearHi : honor.year}
                      </span>
                    </p>

                    <p className="text-[11px] font-semibold text-stone-600 mt-0.5">
                      {lang === 'hi' ? honor.organizationHi : honor.organization}
                    </p>

                    <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                      {lang === 'hi' ? honor.descriptionHi : honor.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'hi' ? 'अधिकृत सम्मेलन सम्मान' : 'Verified Conclave Honor'}</span>
                    </span>

                    {honor.image && (
                      <button
                        onClick={() =>
                          setPreviewCert({
                            title: lang === 'hi' ? honor.titleHi : honor.title,
                            image: honor.image!,
                            desc: lang === 'hi' ? honor.descriptionHi : honor.description,
                            venue: lang === 'hi' ? honor.venueHi : honor.venue
                          })
                        }
                        className="text-xs font-bold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1"
                      >
                        <span>{lang === 'hi' ? 'प्रमाण-पत्र देखें' : 'View Asset'}</span>
                        <ZoomIn className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Endorsement Strip */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-400/50 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
              <Star className="w-7 h-7 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h3 className="font-sacred text-lg sm:text-xl font-bold text-white">
                {lang === 'hi'
                  ? 'राष्ट्रीय सम्मेलनों से अलंकृत वैदिक मार्गदर्शन प्राप्त करें'
                  : 'Experience Conclave-Honored Vedic Mentorship'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xl">
                {lang === 'hi'
                  ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी से करियर, व्यापार, वैवाहिक समन्वय एवं थेरेपी घड़ियों पर प्रामाणिक मार्गदर्शन हेतु संपर्क करें।'
                  : 'Consult with Numerologist & Healer · Randhir Singh for deep clarity on career milestones, financial expansion, marriage harmony, and therapy watches.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-stone-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            {lang === 'hi' ? 'अपना परामर्श सत्र बुक करें' : 'Schedule Your Consultation'}
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Certificate in Awards */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[90vh] flex flex-col">
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between border-b border-amber-500/40">
              <div>
                <h4 className="font-sacred font-bold text-base text-amber-200">
                  {previewCert.title}
                </h4>
                <p className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                  <span>{previewCert.venue}</span>
                  {previewCert.verificationCode && (
                    <span className="font-mono text-[10px] text-amber-400/90 bg-stone-800 px-1.5 py-0.5 rounded">
                      {previewCert.verificationCode}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setPreviewCert(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-stone-100 flex-1 flex flex-col items-center justify-center overflow-y-auto">
              <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-amber-300 max-w-xl w-full">
                <img
                  src={previewCert.image}
                  alt={previewCert.title}
                  className="w-full h-auto object-contain rounded"
                />
              </div>
              <p className="text-xs text-stone-600 mt-4 text-center max-w-xl leading-relaxed">
                {previewCert.desc}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={previewCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3.5 py-1.5 rounded-lg border border-amber-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'मूल प्रारूप में खोलें' : 'Open Full Vector Asset'}</span>
                </a>

                <button
                  onClick={() => setPreviewCert(null)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5"
                >
                  {lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
