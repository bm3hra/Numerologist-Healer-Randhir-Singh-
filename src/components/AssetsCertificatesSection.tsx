import React, { useState } from 'react';
import { Award, ShieldCheck, Download, ExternalLink, CheckCircle2, ZoomIn, X, Sparkles, FileText, Calendar, MapPin, Trophy } from 'lucide-react';
import { Language } from '../types';

interface AssetsCertificatesSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string, price?: string) => void;
}

export interface OfficialCertificateAsset {
  id: string;
  badge: string;
  badgeColor: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  assetUrl: string;
  date: string;
  venue: string;
  conferredBy: string;
  verificationCode: string;
  descriptionEn: string;
  descriptionHi: string;
  highlights: string[];
}

export const OFFICIAL_CERTIFICATE_ASSETS: OfficialCertificateAsset[] = [
  {
    id: 'cert_advance_numerology',
    badge: 'Consultant Practice Licensed',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
    titleEn: 'Advance Numerology Course Certificate of Completion',
    titleHi: 'उन्नत अंक ज्योतिष पाठ्यक्रम पूर्णता प्रमाण-पत्र (परामर्श अधिकृत)',
    subtitleEn: 'Licensed to Practice as a Consultant · DD Consultants · ISO-9001:2015',
    subtitleHi: 'अधिकृत अंक ज्योतिष परामर्शदाता अभ्यास हेतु मान्य · DD कंसल्टेंट्स',
    assetUrl: '/assets/certificates/certificate-advance-numerology.svg',
    date: 'Conferred Nov 2024',
    venue: 'DD Consultants National Accreditation (UDYAM-GJ-22-0158332)',
    conferredBy: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
    verificationCode: 'UDYAM-GJ-22-0158332 / REG: G-65',
    descriptionEn: 'Official Certificate of Completion awarded to Master Randhir Singh Ji upon successfully undergoing the Advance Numerology Course under Dr. Rohit Gadkari. Formally validates adequate mastery over numerological diagnostics and authorizes practice as a professional consultant.',
    descriptionHi: 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट) द्वारा मास्टर रणधीर सिंह जी को उन्नत अंक ज्योतिष पाठ्यक्रम सफलतापूर्वक पूर्ण करने पर प्रदान किया गया अधिकृत प्रमाण पत्र, जो उन्हें परामर्शदाता के रूप में अभ्यास हेतु अधिकृत करता है।',
    highlights: [
      'Official Registration Number: G-65 (UDYAM-GJ-22-0158332 & ISO-9001: 2015)',
      'Signed by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Formally authorizes professional practice as a Numerology Consultant',
      'Inscribed with sacred Lord Ganesha & Maa Saraswati auspicious seals'
    ]
  },
  {
    id: 'cert_advanced_wristwatch',
    badge: 'Signature Horological Therapy',
    badgeColor: 'bg-amber-50 text-amber-950 border-amber-300',
    titleEn: 'Advanced Wrist Watch Course Certificate of Achievement',
    titleHi: 'उन्नत कलाई घड़ी (रिस्ट वॉच) विश्लेषण उपलब्धि प्रमाण-पत्र',
    subtitleEn: 'Signature Horological Pulse Vibration & Dial Therapy Specialization',
    subtitleHi: 'हस्त घड़ी ऊर्जा विश्लेषण, डायल आकार व नब्ज स्पंदन विशेषज्ञता',
    assetUrl: '/assets/certificates/certificate-advanced-wristwatch.svg',
    date: '24th November 2024',
    venue: 'National Horological & Astro-Analysis Council',
    conferredBy: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
    verificationCode: 'UDYAM-GJ-22-0158332 / REG: A-H 44',
    descriptionEn: 'Certificate of Achievement acknowledging and honoring Randhir Singh for successfully completing the rigorous Advanced Wrist Watch Course. Certifies expert mastery in diagnosing watch dial shapes, metal bands, second-hand frequencies, and radial artery pulse resonances.',
    descriptionHi: 'कलाई घड़ी के डायल, रंग, धातु एवं नब्ज स्पंदन के आधार पर भाग्य व स्वास्थ्य परीक्षण की विशेषज्ञता हेतु डॉ. रोहित गड़करी द्वारा 24 नवंबर 2024 को प्रदत्त अधिकृत उपलब्धि प्रमाण पत्र।',
    highlights: [
      'Official Registration: A-H 44 (Conferred 24 NOV 2024)',
      'Certified by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Specialized mastery over dial geometry, pulse meridian, and therapy watches',
      'Vintage baroque filigree and sacred Lord Ganesha insignia'
    ]
  },
  {
    id: 'cert_advance_name_correction',
    badge: 'Chaldean & Sound Frequency Mastery',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-300',
    titleEn: 'Advance Name Correction Course Certificate',
    titleHi: 'उन्नत नाम सुधार (नेम करेक्शन) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    subtitleEn: 'Chaldean, Pythagorean & Vibrational Sound Frequency Mastery',
    subtitleHi: 'कीरो, कॉस्मिक एवं वाइब्रेशनल ध्वनि आवृत्ति द्वारा नाम सामंजस्य',
    assetUrl: '/assets/certificates/certificate-advance-name-correction.svg',
    date: '22nd November 2024',
    venue: 'Vedic Numerology & Sound Frequency Institute',
    conferredBy: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
    verificationCode: 'UDYAM-GJ-22-0158332 / REG: A-F 55',
    descriptionEn: 'Official credential honoring Randhir Singh for successfully completing the Advance Name Correction Course. Validates precision calculation of compound vibrational numbers, Chaldean alphabet values, and harmonizing personal/business names with Mulank & Bhagyank.',
    descriptionHi: 'व्यक्तिगत, व्यापारिक एवं नवजात शिशुओं के नाम में शुभ अक्षरों के संयोजन द्वारा भाग्योदय हेतु डॉ. रोहित गड़करी द्वारा 22 नवंबर 2024 को प्रदान किया गया अधिकृत प्रमाण पत्र।',
    highlights: [
      'Official Registration: A-F 55 (Conferred 22 NOV 2024)',
      'Certified by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Advanced training in business, personal, and baby name vibrational calibration',
      'Official teal geometric rosette star credential format'
    ]
  },
  {
    id: 'cert_advance_placement',
    badge: 'Spatial Energy & Placement Alignment',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-300',
    titleEn: 'Advance Placement Course Certificate',
    titleHi: 'उन्नत दिशात्मक स्थापन (प्लेसमेंट) पाठ्यक्रम अधिकृत प्रमाण-पत्र',
    subtitleEn: 'Successfully Completing the Advance placement Course · ISO-9001:2015',
    subtitleHi: 'दिशात्मक ऊर्जा, कुआं अंक आधारित स्थापन एवं कार्य-व्यापार भाग्योदय',
    assetUrl: '/assets/aistudio/Certificate-4_637f7316.jpeg',
    date: '23rd November 2024',
    venue: 'Dr. Rohit Gadkari Accreditation (UDYAM-GJ-22-0158332)',
    conferredBy: 'Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
    verificationCode: 'UDYAM-GJ-22-0158332 / REG NO: A-G 62',
    descriptionEn: 'Official Certificate acknowledging and honoring Randhir Singh for successfully completing the Advance placement Course under Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist). Certifies mastery in directional placement of remedies, sacred yantras, cash lockers, and workspace alignment per Vedic and Kua numerical vibrations.',
    descriptionHi: 'डॉ. रोहित गड़करी (ऐस न्यूमेरोलॉजिस्ट, पीएचडी गोल्ड मेडलिस्ट) द्वारा रणधीर सिंह जी को कुआं अंक एवं दिशात्मक ऊर्जा के अनुसार यंत्रों, तिजोरी, कार्यस्थल एवं शयन कक्ष में वस्तुओं के सटीक स्थापन हेतु 23 नवंबर 2024 को प्रदत्त मूल अधिकृत प्रमाण पत्र (REG NO: A-G 62, ISO-9001: 2015)।',
    highlights: [
      'Official Registration: REG NO: A-G 62 (Conferred 23 NOV 2024)',
      'Certified & Signed by Dr. Rohit Gadkari (Ace Numerologer, PHD Gold Medalist)',
      'Accredited under UDYAM-GJ-22-0158332 & ISO-9001: 2015 Quality Standards',
      'Original official certificate photograph featuring teal geometric chevron & star rosette seal'
    ]
  },
  {
    id: 'cert_convocation_speech',
    badge: 'Keynote Address & Presidential Credential',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    titleEn: '2nd Mega Convocation — Radisson Blu Keynote Credential',
    titleHi: 'द्वितीय विशाल दीक्षांत समारोह — रेडिसन ब्लू मुख्य व्याख्यान गौरव',
    subtitleEn: '"NUMBER OF NUMEROLOGISTS TO EXPLORE THE WORLD"',
    subtitleHi: '"विश्व भर में अंक शास्त्रियों का प्रसार एवं जन-कल्याण"',
    assetUrl: '/assets/certificates/radisson-blu-convocation-crest.svg',
    date: '16th June 2024',
    venue: 'Radisson Blu Grand Ballroom',
    conferredBy: 'Master Randhir Singh (Keynote Speaker & Presiding Master)',
    verificationCode: 'RAD-BLU/CONV/2024-JUN16',
    descriptionEn: 'The historic convocation where Master Randhir Singh addressed a packed auditorium of scholars, healers, and numerologists worldwide at Radisson Blu, delivering the visionary keynote "Number of Numerologists to Explore the World" alongside the sacred Tree of Life Chakra emblem.',
    descriptionHi: '16 जून 2024 को रेडिसन ब्लू में आयोजित भव्य द्वितीय दीक्षांत समारोह, जहाँ मास्टर रणधीर सिंह ने "Number of Numerologists to Explore the World" पर ऐतिहासिक मुख्य व्याख्यान दिया।',
    highlights: [
      'Conclave Venue: Radisson Blu Luxury Ballroom (16th June 2024)',
      'Official Convocation Motto: Number of Numerologists to Explore the World',
      'Tree of Life & Meditating Chakra Yogi Presidential Emblem',
      'Global delegates honoring Vedic numerology in 24 languages'
    ]
  },
  {
    id: 'cert_excellence',
    badge: 'National Merit & Excellence',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
    titleEn: 'Certificate of Excellence Celebration',
    titleHi: 'उत्कृष्टता प्रमाण-पत्र सम्मान (Certificate of Excellence)',
    subtitleEn: 'Outstanding Performance, Dedication & Valuable Contribution',
    subtitleHi: 'अंक ज्योतिष सेवा, निष्ठा एवं उत्कृष्ट योगदान हेतु सर्वोच्च सम्मान',
    assetUrl: '/assets/certificates/certificate-of-excellence.svg',
    date: 'Conferred at Mega Convocation',
    venue: 'Radisson Blu Assembly',
    conferredBy: 'Director & Chairman Master Randhir Singh',
    verificationCode: 'EXC-NUM/CONV/GOLD-2024',
    descriptionEn: 'Bestowed in recognition of exceptional research, diagnostic precision in watch numerology and name vibrations, and unwavering commitment to ethical seeker empowerment. Features embossed gold Guilloché border, golden rosette seal, and director signatures.',
    descriptionHi: 'अंक ज्योतिष एवं उपचारात्मक साधनाओं में अद्वितीय योगदान, उत्कृष्ट प्रदर्शन एवं सेवा भाव के लिए प्रदान किया गया स्वर्ण-मुद्रित सर्वोच्च उत्कृष्टता प्रमाण पत्र।',
    highlights: [
      'Embossed gold guilloché ornamental borders with floral corners',
      'Official citation for outstanding performance & dedicated contribution',
      'Certified by Council Director and Chairman Master Randhir Singh',
      'High-grade archival paper credential format'
    ]
  }
];

export const AssetsCertificatesSection: React.FC<AssetsCertificatesSectionProps> = ({
  lang,
  onOpenBooking
}) => {
  const [selectedAsset, setSelectedAsset] = useState<OfficialCertificateAsset | null>(null);
  const [certFilter, setCertFilter] = useState<'all' | 'licenses' | 'convocation'>('all');

  const filteredCerts = OFFICIAL_CERTIFICATE_ASSETS.filter((cert) => {
    if (certFilter === 'licenses') {
      return [
        'cert_advance_numerology',
        'cert_advanced_wristwatch',
        'cert_advance_name_correction',
        'cert_advance_placement'
      ].includes(cert.id);
    }
    if (certFilter === 'convocation') {
      return ['cert_convocation_speech', 'cert_excellence'].includes(cert.id);
    }
    return true;
  });

  return (
    <section id="assets-certificates" className="relative py-12 sm:py-16 bg-[#f7f3eb] border-b border-amber-200/80">
      {/* Universal URL Anchors for #certificates, #assets, and #assets-certificates */}
      <div id="certificates" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="assets" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'आधिकारिक प्रमाण-पत्र एवं अलंकरण संग्रह (6 अधिकृत प्रपत्र)' : 'Official Credentials & Conferred Assets (6 Official Documents)'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'आधिकारिक प्रमाण-पत्र एवं एसेट्स वॉल्ट' : 'OFFICIAL CERTIFICATES & CREDENTIALS VAULT'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi'
              ? 'उन्नत अंक ज्योतिष, कलाई घड़ी, नाम सुधार, दिशात्मक स्थापन (REG NO: A-G 62) एवं दीक्षांत समारोह सम्मान'
              : 'Advance Numerology, Wrist Watch, Name Correction, Advance Placement (REG NO: A-G 62) & 2nd Mega Convocation Honors'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'डॉ. रोहित गड़करी (पीएचडी गोल्ड मेडलिस्ट, उद्यम GJ-22-0158332 एवं ISO-9001:2015) द्वारा मास्टर रणधीर सिंह जी को प्रदत्त 4 विशिष्ट उपलब्धि प्रमाण-पत्र एवं 16 जून 2024 रेडिसन ब्लू राष्ट्रीय सम्मेलन में प्रदत्त उपाधियों का आधिकारिक डिजिटल संग्रह।'
              : 'Authentic credentials conferred by Dr. Rohit Gadkari (PhD Gold Medalist, UDYAM-GJ-22-0158332 & ISO-9001:2015) alongside Radisson Blu Mega Convocation presidential honors.'}
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCertFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                certFilter === 'all'
                  ? 'bg-amber-900 text-white shadow-sm ring-2 ring-amber-400'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              {lang === 'hi' ? 'सभी 6 प्रमाण-पत्र' : 'All 6 Credentials'}
            </button>
            <button
              onClick={() => setCertFilter('licenses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                certFilter === 'licenses'
                  ? 'bg-amber-900 text-white shadow-sm ring-2 ring-amber-400'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'hi' ? '4 नवीन अधिकृत प्रमाण-पत्र (New)' : '4 Conferred Practice Licenses (New)'}</span>
            </button>
            <button
              onClick={() => setCertFilter('convocation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                certFilter === 'convocation'
                  ? 'bg-amber-900 text-white shadow-sm ring-2 ring-amber-400'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'hi' ? 'दीक्षांत एवं राष्ट्रीय सम्मान (2)' : 'Convocation & National Conclave (2)'}</span>
            </button>
          </div>
        </div>

        {/* 3 or 4 Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border-2 border-amber-200/90 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Visual Preview Container with Framed Shadow */}
              <div className="p-4 bg-gradient-to-b from-stone-100 to-amber-50/40 border-b border-amber-200/70 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${cert.badgeColor}`}>
                    {cert.badge}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-stone-500">
                    {cert.date}
                  </span>
                </div>

                {/* Simulated Certificate Frame with hover zoom */}
                <div
                  onClick={() => setSelectedAsset(cert)}
                  className="relative aspect-4/3 rounded-xl overflow-hidden shadow-inner border border-stone-300/80 bg-white cursor-pointer group-hover:shadow-lg transition-all"
                >
                  <img
                    src={cert.assetUrl}
                    alt={cert.titleEn}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                    <span className="inline-flex items-center gap-1.5 bg-amber-900 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                      <span>Inspect Full Asset</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-sacred text-lg font-bold text-stone-900 leading-snug">
                    {lang === 'hi' ? cert.titleHi : cert.titleEn}
                  </h3>
                  <p className="text-xs font-semibold text-amber-900 mt-1">
                    {lang === 'hi' ? cert.subtitleHi : cert.subtitleEn}
                  </p>

                  <div className="mt-3 py-2 px-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-700">Venue:</span>
                      <span className="text-stone-900 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        {cert.venue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-700">Conferred by:</span>
                      <span className="text-stone-900 font-medium truncate max-w-[180px]">
                        {cert.conferredBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-semibold text-stone-700">Verify Code:</span>
                      <span className="text-emerald-700 font-bold">{cert.verificationCode}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {lang === 'hi' ? cert.descriptionHi : cert.descriptionEn}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5">
                    {cert.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedAsset(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-200"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'प्रमाण-पत्र देखें' : 'View Certificate'}</span>
                  </button>

                  <a
                    href={cert.assetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 hover:text-stone-900 py-1.5 px-2.5 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                    <span>{lang === 'hi' ? 'मूल SVG फाइल' : 'Direct SVG Asset'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential Verification Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 rounded-2xl p-6 sm:p-8 border-2 border-amber-400/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h3 className="font-sacred text-lg sm:text-xl font-bold text-white">
                Learn from Conclave-Honored Master Randhir Singh
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl">
                Benefit from authentic Vedic and Lo-Shu numerological guidance recognized across national convocations, Radisson Blu assemblies, and government skill initiatives.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking('Certificate & Honors Mentorship Consultation', '₹5,100')}
            className="shrink-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-stone-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Consult With Master Randhir Singh
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL RESOLUTION CERTIFICATE INSPECTION LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-stone-900 text-amber-100 px-6 py-4 flex items-center justify-between border-b border-amber-500/40 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-sacred text-base sm:text-lg font-bold text-white">
                    {selectedAsset.titleEn}
                  </h3>
                  <p className="text-[11px] text-amber-300 font-mono">
                    Official Asset Code: {selectedAsset.verificationCode}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Large Preview Box */}
            <div className="p-4 sm:p-6 bg-stone-100 overflow-y-auto flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-2 border-4 border-amber-400/80">
                <img
                  src={selectedAsset.assetUrl}
                  alt={selectedAsset.titleEn}
                  className="w-full h-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Meta information */}
              <div className="mt-6 w-full max-w-3xl bg-white rounded-xl p-5 border border-stone-200 text-xs text-stone-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 pb-3 border-b border-stone-100 font-medium">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Venue &amp; Date:</span>
                    <span className="text-stone-900 font-bold">{selectedAsset.venue} ({selectedAsset.date})</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Conferred By:</span>
                    <span className="text-stone-900 font-bold">{selectedAsset.conferredBy}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Authenticity Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Conclave Verified
                    </span>
                  </div>
                </div>

                <p className="text-stone-600 leading-relaxed mb-4">
                  {lang === 'hi' ? selectedAsset.descriptionHi : selectedAsset.descriptionEn}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={selectedAsset.assetUrl}
                    download={`${selectedAsset.id}.svg`}
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Download Official SVG Asset</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedAsset(null);
                      onOpenBooking(selectedAsset.titleEn);
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    <span>Schedule Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
