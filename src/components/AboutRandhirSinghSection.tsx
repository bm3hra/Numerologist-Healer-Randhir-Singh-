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
    <section id="about-randhir" className="relative py-14 sm:py-20 bg-[#fdfbf7] border-b border-amber-200/80">
      {/* Anchor targets for direct URL hash jumps */}
      <div id="about" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="randhir-singh" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
                  Numerologist & Healer · Randhir Singh (रणधीर सिंह)
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
                  Vedic Numerologist · Watch Analysis Consultant · Pranic &amp; Crystal Healer
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
              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
                <p>
                  {lang === 'hi' ? (
                    <>
                      <strong>न्यूमेरोलॉजिस्ट और हीलर · रणधीर सिंह</strong> जयपुर (राजस्थान) के जाने-माने वैदिक अंक ज्योतिषी (न्यूमेरोलॉजिस्ट) और आध्यात्मिक हीलर हैं। कई वर्षों से वे देश-विदेश के हजारों लोगों, बिजनेसमैन और परिवारों को जन्मतिथि विश्लेषण, करियर में तरक्की, शादी और पैसों की स्थिरता के लिए सही और सरल मार्गदर्शन दे रहे हैं।
                    </>
                  ) : (
                    <>
                      <strong>Numerologist & Healer · Randhir Singh</strong> is a celebrated Vedic Numerologist, Pulse Horology Expert, and Spiritual Healer based in Jaipur, Rajasthan. Serving seekers, business founders, and families worldwide, his practice synthesizes authentic 3x3 Lo-Shu magic square vibrations with modern subconscious science.
                    </>
                  )}
                </p>

                <p>
                  {lang === 'hi' ? (
                    <>
                      रॉयल स्किल्स एकेडमी (पंजीकरण सं. 10115) से सम्मानित रणधीर सिंह जी विशेष रूप से <strong>थेरेपी वॉच (कलाई घड़ी और नब्ज का विश्लेषण)</strong> और <strong>सेंधा नमक द्वारा नेगेटिविटी हटाने</strong> में माहिर हैं। उनके सिद्ध यंत्र और हीलिंग कोड्स जीवन में तरक्की के नए रास्ते खोलते हैं।
                    </>
                  ) : (
                    <>
                      Honored with the prestigious Royal Skills Academy convocation regalia (Regd. No. 10115) and keynote speaker recognition at the 2nd Mega Convocation at Radisson Blu, Numerologist & Healer · Randhir Singh is internationally renowned for his pioneer breakthroughs in <strong>Horological Pulse Resonance (Wristwatch Therapy)</strong> and <strong>Sendha Rock Salt Aura Shielding</strong>.
                    </>
                  )}
                </p>
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
        </div>
      </div>
    </section>
  );
};
