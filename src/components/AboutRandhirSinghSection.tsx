import React from 'react';
import { Sparkles, MapPin, Clock, Phone, MessageCircle, CheckCircle2, Crown } from 'lucide-react';
import { Language } from '../types';
import { useCmsPages } from '../context/CmsPageContext';

interface AboutRandhirSinghSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export interface AboutPhotoItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: string;
  categoryLabelEn: string;
  categoryLabelHi: string;
  imageUrl: string;
  captionEn: string;
  captionHi: string;
  tags: string[];
}

export const ABOUT_PHOTOS: AboutPhotoItem[] = [];

export const AboutRandhirSinghSection: React.FC<AboutRandhirSinghSectionProps> = ({
  lang,
  onOpenBooking
}) => {
  const { getPageBySectionId } = useCmsPages();
  const cmsAbout = getPageBySectionId('about-randhir');

  const title = (lang === 'hi' ? cmsAbout?.titleHi : cmsAbout?.title) || (lang === 'hi' ? 'रणधीर सिंह जी का परिचय' : 'About Numerologist & Healer · Randhir Singh Ji');
  const description = cmsAbout?.description || (lang === 'hi'
    ? 'जयपुर (राजस्थान) सेंटर से पूरे देश और दुनिया भर के लोगों को अंक ज्योतिष, थेरेपी वॉच, सॉल्ट थेरेपी और सिद्ध यंत्रों से आसान और असरदार समाधान।'
    : 'Guiding clients across India and worldwide from his Jaipur center through authentic Lo-Shu numerology, precision therapy watches, salt aura cleansing, and consecrated yantras.');

  return (
    <section id="about-randhir" className="relative py-7 sm:py-9 bg-[#fdfbf7] border-b border-amber-200/80">
      {/* Anchor targets for direct URL hash jumps */}
      <div id="about" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="randhir-singh" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}</span>
          </div>

          <h2 className="font-sacred text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            {title}
          </h2>

          <p className="font-sacred text-amber-900 font-semibold text-base sm:text-lg mt-2">
            {lang === 'hi'
              ? '“अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें।”'
              : '“Understand your Date of Birth. Recognize your life patterns. Move forward with confidence.”'}
          </p>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Master Profile Hero Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  {lang === 'hi' ? 'जयपुर सेंटर' : 'Jaipur Center'}
                </span>
                <h3 className="font-sacred text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {lang === 'hi'
                    ? 'न्यूमरोलॉजिस्ट एवं हीलर · रणधीर सिंह'
                    : 'Numerologist & Healer · Randhir Singh'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/85 mt-1">
                  {lang === 'hi'
                    ? 'वैदिक अंक ज्योतिष विशेषज्ञ · नाड़ी एवं घड़ी विज्ञान के अध्येता · श्रीविद्या साधक · शांभवी साधक · प्रति-प्रसव साधना साधक'
                    : 'Vedic Numerologist · Pulse Horology Expert · Spiritual Healer · Sri Vidya Sadhak · Shambhavi Sadhak · Prati-Prasav Sadhana Sadhak'}
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

          <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Formal Portrait Card */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-64 sm:w-72 aspect-4/5 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg group bg-stone-900">
                <img
                  src="/assets/aistudio/Randhir_Singh_8dc81223.png"
                  alt="Numerologist & Healer · Randhir Singh Formal Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 inset-x-3 bg-stone-950/85 backdrop-blur-xs border border-amber-400/50 p-2 rounded-lg text-center">
                  <span className="text-xs font-bold text-amber-200 block">Numerologist & Healer · Randhir Singh</span>
                  <span className="text-[10px] text-stone-300">
                    {lang === 'hi' ? 'न्यूमेरोलॉजिस्ट और हीलर · जयपुर' : 'Numerologist & Healer · Jaipur'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Biography & Pillars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2.5">
                {lang === 'hi' ? (
                  <>
                    <p>
                      <strong>रणधीर सिंह</strong> जयपुर, राजस्थान के प्रतिष्ठित वैदिक अंक ज्योतिष विशेषज्ञ, नाड़ी एवं घड़ी विज्ञान के अध्येता, आध्यात्मिक हीलर तथा समर्पित <strong>श्रीविद्या साधक, शांभवी साधक और प्रति-प्रसव साधना साधक</strong> हैं। वे देश-विदेश के साधकों, उद्यमियों, व्यवसायियों और परिवारों को अपनी सेवाएँ एवं मार्गदर्शन प्रदान करते हैं।
                    </p>
                    <p>
                      उनकी कार्यशैली में प्रामाणिक <strong>3×3 लो-शू मैजिक स्क्वायर (अंक वर्ग)</strong> के सिद्धांतों, पारंपरिक आध्यात्मिक साधनाओं और अवचेतन मन के अध्ययन का समन्वय देखने को मिलता है।
                    </p>
                    <p>
                      <strong>रॉयल स्किल्स अकादमी</strong> द्वारा आयोजित दीक्षांत समारोह में उन्हें प्रतिष्ठित दीक्षांत सम्मान एवं शैक्षणिक परिधान (Convocation Regalia) से सम्मानित किया गया। इसके अतिरिक्त, रेडिसन ब्लू में आयोजित <strong>द्वितीय मेगा दीक्षांत समारोह (2nd Mega Convocation)</strong> में उन्हें मुख्य वक्ता के रूप में भी सम्मान प्राप्त हुआ। इस सम्मान का पंजीकरण क्रमांक <strong>10115</strong> है।
                    </p>
                    <p>
                      रणधीर सिंह विशेष रूप से अपनी विशिष्ट कार्य-पद्धतियों <strong>हॉरोलॉजिकल पल्स रेज़ोनेंस (Wristwatch Therapy – कलाई घड़ी एवं नाड़ी विश्लेषण आधारित पद्धति)</strong> और <strong>सेंधा नमक आभामंडल संरक्षण (Sendha Rock Salt Aura Shielding)</strong> के लिए पहचाने जाते हैं।
                    </p>
                    <p>
                      उनका उद्देश्य वैदिक अंक ज्योतिष, पारंपरिक साधना, आध्यात्मिक चिंतन और विशिष्ट हीलिंग पद्धतियों के माध्यम से लोगों को आत्म-जागरूकता, सकारात्मक सोच, मानसिक शांति और जीवन में संतुलन की दिशा में प्रेरित करना है।
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Randhir Singh</strong> is a distinguished Vedic Numerologist, Pulse Horology Expert, Spiritual Healer, and dedicated <strong>Sri Vidya Sadhak, Shambhavi Sadhak, and Prati-Prasav Sadhana Sadhak</strong>, based in Jaipur, Rajasthan, India. Serving spiritual seekers, entrepreneurs, business founders, and families worldwide, his approach brings together the traditional principles of the authentic <strong>3×3 Lo-Shu Magic Square</strong>, ancient spiritual sadhana, and the study of subconscious science.
                    </p>
                    <p>
                      Honored with the prestigious <strong>Royal Skills Academy Convocation Regalia (Registration No. 10115)</strong> and recognized as a <strong>Keynote Speaker at the 2nd Mega Convocation held at Radisson Blu</strong>, Randhir Singh continues to explore the intersection of numerology, spirituality, and holistic wellness.
                    </p>
                    <p>
                      He is particularly associated with his specialized approaches, <strong>Horological Pulse Resonance (Wristwatch Therapy)</strong> and <strong>Sendha Rock Salt Aura Shielding</strong>, which reflect his distinctive interest in the relationship between timekeeping, pulse analysis, traditional practices, and energetic well-being.
                    </p>
                  </>
                )}
              </div>

              {/* Spiritual Sadhana Identity Strip */}
              <div className="bg-gradient-to-r from-amber-950/5 via-amber-50/90 to-amber-950/5 border border-amber-300/80 rounded-2xl p-3.5 sm:p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>
                    {lang === 'hi'
                      ? 'आध्यात्मिक साधना एवं दर्शन (Spiritual Sadhana & Philosophy)'
                      : 'Spiritual Sadhana & Philosophy (आध्यात्मिक साधना)'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs">
                    <span className="text-amber-600">✦</span>
                    <span>{lang === 'hi' ? 'श्रीविद्या साधक' : 'श्रीविद्या साधक (Sri Vidya Sadhak)'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs">
                    <span className="text-amber-600">✦</span>
                    <span>{lang === 'hi' ? 'शांभवी साधक' : 'शांभवी साधक (Shambhavi Sadhak)'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs">
                    <span className="text-amber-600">✦</span>
                    <span>{lang === 'hi' ? 'प्रति-प्रसव साधना साधक' : 'प्रति-प्रसव साधना साधक (Prati-Prasav Sadhana Sadhak)'}</span>
                  </span>
                </div>
              </div>

              {/* 3 Key Pillars Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? '16 प्रमुख सेवाएं' : '16 Core Services'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'जन्मतिथि से लेकर सिद्ध यंत्र और लकी क्रिस्टल्स' : 'From DOB analysis to consecrated yantras & crystals'}
                  </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? 'कलाई घड़ी विशेषज्ञ' : 'Watch Therapy Master'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'डायल, रंग और नब्ज से धन व शांति का संचार' : 'Radial pulse diagnosis & custom prescription dials'}
                  </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{lang === 'hi' ? 'रविवार फ्री सेवा' : 'Sunday Free Gift'}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'hi' ? 'हर रविवार पहले 5 लोगों को बिल्कुल फ्री सलाह' : 'First 5 seekers receive free 20-min consultation'}
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
                      <span>{lang === 'hi' ? 'समय: सुबह 9:00 से शाम 6:00 बजे तक' : 'Timings: 9:00 AM – 6:00 PM'}</span>
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
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Session'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Spiritual Sadhana & Philosophy Block */}
          <div className="border-t-2 border-amber-200/90 bg-gradient-to-b from-[#fffdf8] via-[#fdf7eb] to-[#faf2e1] p-5 sm:p-7 space-y-5">
            {/* Block Heading & Intro */}
            <div className="max-w-4xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === 'hi'
                    ? 'आध्यात्मिक साधना एवं दर्शन (Spiritual Sadhana & Philosophy)'
                    : 'Spiritual Sadhana & Philosophy (आध्यात्मिक साधना एवं दर्शन)'}
                </span>
              </div>

              <h3 className="font-sacred text-xl sm:text-2xl font-extrabold text-stone-900">
                {lang === 'hi'
                  ? 'आध्यात्मिक साधना एवं दर्शन (Spiritual Sadhana & Philosophy)'
                  : 'Spiritual Sadhana & Philosophy'}
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {lang === 'hi' ? (
                  <>
                    <strong>न्यूमरोलॉजिस्ट एवं हीलर · रणधीर सिंह (Randhir Singh)</strong> एक समर्पित आध्यात्मिक साधक हैं, जो भारतीय सनातन परंपरा, वैदिक दर्शन, योग, तंत्र एवं चेतना-विज्ञान के गहन अध्ययन और साधना से जुड़े हुए हैं। उनकी आध्यात्मिक यात्रा में <strong>श्रीविद्या साधना</strong>, <strong>शांभवी साधना</strong> और <strong>प्रति-प्रसव साधना</strong> का विशेष स्थान है।
                  </>
                ) : (
                  <>
                    His spiritual journey encompasses three profound traditions:
                  </>
                )}
              </p>
            </div>

            {/* 3 Sadhana Traditions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Sri Vidya Sadhana */}
              <div className="bg-white rounded-2xl border border-amber-300/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-2.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-900 text-amber-200 font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h4 className="font-sacred font-bold text-sm sm:text-base text-amber-950 leading-snug">
                      {lang === 'hi'
                        ? 'श्रीविद्या साधना (Sri Vidya Sadhana)'
                        : 'Sri Vidya Sadhana'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {lang === 'hi'
                      ? 'श्रीविद्या साधना शक्ति उपासना की एक अत्यंत गहन एवं प्राचीन तांत्रिक परंपरा है। इसका केंद्रबिंदु आदिशक्ति माँ ललिता त्रिपुरसुंदरी की आराधना और शिव-शक्ति के अद्वैत स्वरूप का अनुभव करना है। श्रीचक्र, मंत्र, ध्यान, उपासना और गुरु-परंपरा इस साधना के महत्वपूर्ण अंग हैं। इसका आध्यात्मिक उद्देश्य साधक को बाहरी जगत से आगे बढ़ाकर अपने भीतर विद्यमान दिव्य चेतना और शक्ति के बोध की ओर ले जाना है।'
                      : 'A traditional Shakta path devoted to the Divine Mother, Sri Chakra, and the understanding of Shiva–Shakti consciousness.'}
                  </p>
                </div>
              </div>

              {/* 2. Shambhavi Sadhana */}
              <div className="bg-white rounded-2xl border border-amber-300/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-2.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-900 text-amber-200 font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h4 className="font-sacred font-bold text-sm sm:text-base text-amber-950 leading-snug">
                      {lang === 'hi'
                        ? 'शांभवी साधना (Shambhavi Sadhana)'
                        : 'Shambhavi Sadhana'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {lang === 'hi'
                      ? 'शांभवी साधना का संबंध ध्यान, एकाग्रता, अंतर्मुखी जागरूकता और साक्षीभाव से है। इसमें साधक मन के विचारों और भावनाओं को बिना उनसे प्रभावित हुए देखने का अभ्यास करता है। इसका मूल भाव अपनी चेतना के वास्तविक स्वरूप को पहचानना और आंतरिक शांति, स्थिरता एवं जागरूकता विकसित करना है।'
                      : 'A path of meditation, inner awareness, witnessing, and the exploration of pure consciousness.'}
                  </p>
                </div>
              </div>

              {/* 3. Prati-Prasav Sadhana */}
              <div className="bg-white rounded-2xl border border-amber-300/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-2.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-900 text-amber-200 font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h4 className="font-sacred font-bold text-sm sm:text-base text-amber-950 leading-snug">
                      {lang === 'hi'
                        ? 'प्रति-प्रसव साधना (Prati-Prasav Sadhana)'
                        : 'Prati-Prasav Sadhana'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {lang === 'hi'
                      ? 'प्रति-प्रसव की अवधारणा महर्षि पतंजलि के योगदर्शन से संबंधित है। योगसूत्र के अनुसार, प्रति-प्रसव का अर्थ है विकारों और क्लेशों को उनके मूल कारणों तक समझते हुए उनके प्रभाव से मुक्त होना। अविद्या, अस्मिता, राग, द्वेष और अभिनिवेश जैसे मानसिक क्लेशों की जड़ों को पहचानना इस प्रक्रिया का महत्वपूर्ण भाग है। इसका उद्देश्य चित्त की अशुद्धियों और बंधनों से मुक्ति तथा विवेकख्याति की प्राप्ति की दिशा में आगे बढ़ना है।'
                      : 'A yogic approach rooted in Patanjali\'s philosophy, focused on understanding the subtle roots of mental afflictions and moving towards inner freedom.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy & Purpose of Life Synthesis */}
            <div className="bg-white rounded-2xl border border-amber-300/90 p-4 sm:p-6 shadow-xs space-y-3.5">
              {lang === 'hi' ? (
                <>
                  <h4 className="font-sacred text-base sm:text-lg font-extrabold text-amber-950 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>आध्यात्मिक दर्शन एवं जीवन का उद्देश्य</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    इन तीनों साधना परंपराओं का अध्ययन और अभ्यास आध्यात्मिक विकास के अलग-अलग आयामों को समझने का अवसर प्रदान करता है:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-stone-800">
                    <li className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 leading-relaxed">
                      <strong className="text-amber-950 block mb-0.5">✦ श्रीविद्या:</strong>
                      <span>शक्ति उपासना, भक्ति, समर्पण और शिव-शक्ति के अद्वैत का बोध।</span>
                    </li>
                    <li className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 leading-relaxed">
                      <strong className="text-amber-950 block mb-0.5">✦ शांभवी:</strong>
                      <span>ध्यान, साक्षीभाव, जागरूकता और आत्मचेतना का अनुभव।</span>
                    </li>
                    <li className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 leading-relaxed">
                      <strong className="text-amber-950 block mb-0.5">✦ प्रति-प्रसव:</strong>
                      <span>मन के मूल संस्कारों, क्लेशों और बंधनों को समझकर उनसे मुक्ति की दिशा में अग्रसर होना।</span>
                    </li>
                  </ul>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    इन साधनाओं का मूल संदेश है कि वास्तविक परिवर्तन केवल बाहरी परिस्थितियों को बदलने से नहीं, बल्कि स्वयं के भीतर जागरूकता, संतुलन, आत्मचिंतन और सकारात्मक चेतना विकसित करने से आता है।
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border border-amber-500/40 text-amber-100 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-amber-300">उनका आध्यात्मिक दृष्टिकोण: </strong>
                    <span>आत्मज्ञान, आंतरिक शांति, चेतना का विकास और जीवन में संतुलन की स्थापना।</span>
                  </div>
                </>
              ) : (
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border border-amber-500/40 text-amber-100 text-xs sm:text-sm leading-relaxed">
                  Through his work, Randhir Singh aims to inspire self-awareness, inner balance, spiritual growth, clarity, and a more harmonious approach to life.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
