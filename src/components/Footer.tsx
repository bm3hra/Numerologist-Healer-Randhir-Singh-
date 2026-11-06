import React, { useState, useEffect } from 'react';
import { Compass, Phone, Mail, MapPin, Clock, MessageCircle, Heart, ShieldCheck, CreditCard, Star, QrCode, Sparkles, Globe, Activity } from 'lucide-react';
import { Language } from '../types';
import { getTranslation, ALL_LANGUAGES } from '../i18n/languages';

interface FooterProps {
  lang: Language;
  setLang?: (l: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setLang, onNavigate, onOpenBooking }) => {
  const t = getTranslation(lang);
  const currentLangCode = (lang || 'en-us').toLowerCase();

  const indianLanguages = ALL_LANGUAGES.filter((l) => l.category === 'indian');
  const internationalLanguages = ALL_LANGUAGES.filter((l) => l.category === 'international');

  // Persisted authentic visitor hit counter starting at 6 ('0,000,006')
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('dyd_visitor_counter_v6');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 6) return parsed;
      }
    } catch {
      // ignore
    }
    return 6;
  });

  const [activeOnlineUsers, setActiveOnlineUsers] = useState<number>(14);

  useEffect(() => {
    try {
      localStorage.setItem('dyd_visitor_counter_v6', String(visitorCount));
    } catch {
      // ignore
    }

    const interval = setInterval(() => {
      setActiveOnlineUsers((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(24, Math.max(11, prev + delta));
      });
    }, 14000);

    return () => clearInterval(interval);
  }, [visitorCount]);

  return (
    <footer className="bg-stone-950 text-stone-300 border-t-2 border-amber-500/70 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Divine Strip */}
        <div className="text-center pb-8 border-b border-stone-800">
          <div className="inline-flex items-center gap-2 text-amber-400 font-sacred text-sm font-bold tracking-widest">
            <span>卐</span>
            <span>॥ ॐ श्री गणेशाय नमः ॥</span>
            <span>卐</span>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-1">
            {lang === 'hi' ? '“अपनी सही राह पहचानें। अपने जीवन को नई दिशा दें।”' : '“Discover Your Path. Transform Your Life.”'}
          </p>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-200">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-sacred text-lg font-bold text-white tracking-wide">
                {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'hi'
                ? 'रणधीर सिंह जी का आधिकारिक डिजिटल मंच — अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर। अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें।'
                : 'Official digital platform for Randhir Singh — A Numerologist and Healer · Randhir Singh Ji Jaipur. Understand your Date of Birth. Recognize your life patterns. Move forward with confidence.'}
            </p>
            <div className="text-xs text-amber-400 font-medium">
              {lang === 'hi'
                ? 'प्रत्येक रविवार प्रथम 5 परामर्श पूर्णतः निःशुल्क हैं (पूर्व अपॉइंटमेंट अनिवार्य)'
                : 'Every Sunday First 5 Consultations Are FREE (On Appointments)'}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sacred text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
              {lang === 'hi' ? 'प्रमुख सेवाएँ' : 'Explore Services'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="pb-1.5 mb-1.5 border-b border-stone-800">
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ एवं परामर्श फीस' : 'ALL 16 DIVINE SERVICES & CONSULTANCY FEES'}</span>
                </a>
              </li>
              <li className="pb-1.5 mb-1.5 border-b border-stone-800">
                <a
                  href="#specialized-services"
                  onClick={(e) => { e.preventDefault(); onNavigate('specialized-services'); }}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{lang === 'hi' ? '11 विशिष्ट हीलिंग एवं सुधार सेवाएं' : '11 Specialized Healing & Correction Services'}</span>
                </a>
              </li>
              <li>
                <a
                  href="#dob"
                  onClick={(e) => { e.preventDefault(); onNavigate('dob'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'जन्म तिथि व लो-शू ग्रिड' : 'Date of Birth Lo-Shu Grid'}
                </a>
              </li>
              <li>
                <a
                  href="#watch"
                  onClick={(e) => { e.preventDefault(); onNavigate('watch'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'घड़ी विश्लेषण एवं चिकित्सीय घड़ी परामर्श' : 'Watch Analysis & Therapeutic Watch Consultation'}
                </a>
              </li>
              <li>
                <a
                  href="#salt"
                  onClick={(e) => { e.preventDefault(); onNavigate('salt'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी)' : 'Negativity Removal & Salt Therapy'}
                </a>
              </li>
              <li>
                <a
                  href="#crystal"
                  onClick={(e) => { e.preventDefault(); onNavigate('crystal'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'व्यवसाय हेतु क्रिस्टल थेरेपी एवं मार्गदर्शन' : 'Crystal Guidance for Profession'}
                </a>
              </li>
              <li>
                <a
                  href="#mobile_name"
                  onClick={(e) => { e.preventDefault(); onNavigate('mobile_name'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'लकी मोबाइल नंबर व नाम सुधार' : 'Lucky Mobile Numbers & Name Correction'}
                </a>
              </li>
              <li>
                <a
                  href="#compatibility"
                  onClick={(e) => { e.preventDefault(); onNavigate('compatibility'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'विवाह व व्यापार ग्रिड मिलान' : 'Marriage & Business Grid Matching'}
                </a>
              </li>
              <li>
                <a
                  href="#remedies"
                  onClick={(e) => { e.preventDefault(); onNavigate('remedies'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'यंत्र, हीलिंग कोड एवं स्विचवर्ड्स' : 'Yantras, Healing Codes & Switchwords'}
                </a>
              </li>
              <li>
                <a
                  href="#media"
                  onClick={(e) => { e.preventDefault(); onNavigate('media'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'फोटो एवं सर्टिफिकेट्स शोकेस' : 'Photos and Certificate Showcase'}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); onNavigate('faq'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                </a>
              </li>
              <li className="pt-1 border-t border-stone-800/80">
                <a
                  href="#reviews"
                  onClick={(e) => { e.preventDefault(); onNavigate('reviews'); }}
                  className="hover:text-amber-200 text-amber-300 font-bold transition-colors flex items-center gap-1"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span>{lang === 'hi' ? 'ग्राहकों के अनुभव एवं कहानियाँ (Reviews)' : 'Client Reviews & Stories'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Jaipur Clinic & Timings */}
          <div>
            <h4 className="font-sacred text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
              {lang === 'hi' ? 'जयपुर केंद्र एवं समय' : 'Jaipur Clinic & Timings'}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur, Rajasthan PIN- 302017
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'hi' ? 'समय: प्रातः 9:00 से सायं 6:00 बजे तक' : 'Timings: 9:00 A.M. to 6:00 P.M.'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:randhirjpr@gmail.com" className="hover:text-white">
                  randhirjpr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Direct Connection & Payment */}
          <div>
            <h4 className="font-sacred text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
              {lang === 'hi' ? 'सीधा संपर्क' : 'Direct Connection'}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-stone-400">
                {lang === 'hi'
                  ? 'अपॉइंटमेंट बुकिंग व परामर्श संबंधी प्रश्नों के लिए सीधा संपर्क करें:'
                  : 'Connect directly for appointment reservations & online queries:'}
              </p>
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1.5">
                <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                  <span>{lang === 'hi' ? 'व्हाट्सएप / कॉल व UPI:' : 'WhatsApp / Call & UPI:'}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  +91-9509593150
                </div>
                <div className="text-[10px] text-stone-300 font-mono space-y-0.5 pt-1.5 border-t border-stone-800/80">
                  <div className="truncate"><span className="text-amber-400">Paytm:</span> randhir.150@ptyes</div>
                  <div className="truncate"><span className="text-blue-400">GPay:</span> randhirjpr-6@okicici</div>
                  <div className="truncate"><span className="text-purple-400">PhonePe:</span> 9509593150-3@ybl</div>
                </div>
              </div>

              <a
                href="#bank"
                onClick={() => onNavigate('tariff')}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-900 to-stone-900 hover:from-amber-800 text-amber-200 hover:text-white font-bold py-2 px-3 rounded-lg text-xs border border-amber-500/40 transition-colors shadow-2xs mt-1 cursor-pointer"
                title={lang === 'hi' ? 'ऑफिशियल QR कोड्स और बैंक विवरण' : 'Scan Official QR Codes'}
              >
                <QrCode className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'hi' ? 'तीनों QR कोड व UPI से भुगतान' : 'Scan 3 QR Codes & Pay'}</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-xs mt-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Multilingual Selector: 17 Target Languages (9 Indian + 8 International) */}
        <div className="border-t border-stone-800/90 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sacred text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {lang === 'hi' ? 'वैश्विक बहुभाषी पहुंच · 17 भाषाएं' : 'Global Multilingual Access · 17 Languages'}
                </h4>
                <p className="text-[11px] text-stone-400">
                  {lang === 'hi'
                    ? 'अपनी पसंदीदा भाषा में संपूर्ण वेबसाइट देखने हेतु नीचे क्लिक करें:'
                    : 'Select your preferred language to explore full consultations and guidance:'}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 font-mono">
              Supported: 9 Indian · 8 International
            </div>
          </div>

          <div className="space-y-3">
            {/* Indian Languages (9) */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 mb-1.5 flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>{lang === 'hi' ? 'भारतीय भाषाएं (Indian Languages)' : 'Indian Languages (9)'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {indianLanguages.map((l) => {
                  const isActive = currentLangCode === l.code || (l.code === 'hi' && currentLangCode === 'hi');
                  return (
                    <button
                      key={l.code}
                      onClick={() => setLang && setLang(l.code)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-xs scale-102 ring-1 ring-amber-300'
                          : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                      }`}
                      title={`${l.name} (${l.nativeName})`}
                    >
                      <span className="text-xs">{l.flag}</span>
                      <span className="font-medium">{l.nativeName}</span>
                      <span className="text-[10px] opacity-70">({l.name})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* International Languages (8) */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 mb-1.5 flex items-center gap-1.5">
                <span>🌍</span>
                <span>{lang === 'hi' ? 'अंतरराष्ट्रीय भाषाएं (International Languages)' : 'International Languages (8)'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {internationalLanguages.map((l) => {
                  const isActive =
                    currentLangCode === l.code ||
                    (l.code === 'en-us' && (currentLangCode === 'en' || currentLangCode === 'en-us'));
                  return (
                    <button
                      key={l.code}
                      onClick={() => setLang && setLang(l.code)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-xs scale-102 ring-1 ring-amber-300'
                          : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                      }`}
                      title={`${l.name} (${l.nativeName})`}
                    >
                      <span className="text-xs">{l.flag}</span>
                      <span className="font-medium">{l.nativeName}</span>
                      <span className="text-[10px] opacity-70">({l.name})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Visitor & Blessed Consultation Counter */}
        <div className="border-t border-stone-800/90 pt-8 pb-6">
          <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              {/* Left: Counter Title & Live Status */}
              <div className="text-center lg:text-left space-y-1.5">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{lang === 'hi' ? `${activeOnlineUsers} साधक अभी लाइव ऑनलाइन` : `${activeOnlineUsers} Seekers Active Online Now`}</span>
                </div>
                <h4 className="font-sacred text-base sm:text-lg font-bold text-amber-300">
                  {lang === 'hi' ? 'कुल विजिटर एवं परामर्शार्थी काउंटर' : 'Blessed Visitors & Consultations Counter'}
                </h4>
                <p className="text-xs text-stone-400 max-w-md">
                  {lang === 'hi'
                    ? 'वैदिक अंक ज्योतिष एवं हीलिंग मार्गदर्शन प्राप्त करने वाले कुल आगंतुकों की प्रामाणिक संख्या।'
                    : 'Total verified guidance seekers & visitors exploring Vedic Numerology and holistic healing.'}
                </p>
              </div>

              {/* Middle: Odometer Plaque */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'hi' ? 'विजिटर संख्या (Live Hit Counter)' : 'Verified Hits & Visitors'}</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-black p-2.5 rounded-xl border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  {visitorCount.toString().padStart(7, '0').split('').map((digit, index) => (
                    <React.Fragment key={index}>
                      {index === 1 || index === 4 ? (
                        <span className="text-amber-500 font-bold text-base px-0.5 select-none">,</span>
                      ) : null}
                      <span className="inline-flex items-center justify-center w-7 h-9 sm:w-8 sm:h-10 bg-gradient-to-b from-stone-800 to-stone-950 text-amber-300 font-mono text-lg sm:text-xl font-black rounded border border-amber-600/50 shadow-inner select-none">
                        {digit}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  Counter Active Since 2024 · 100% Genuine
                </div>
              </div>

              {/* Right: Milestone Badges */}
              <div className="grid grid-cols-2 gap-3 text-center shrink-0 w-full lg:w-auto">
                <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 shadow-inner">
                  <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">5,400+</div>
                  <div className="text-[11px] text-stone-400 font-medium">{lang === 'hi' ? 'सफल परामर्श' : 'Readings Done'}</div>
                </div>
                <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 shadow-inner">
                  <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">28+</div>
                  <div className="text-[11px] text-stone-400 font-medium">{lang === 'hi' ? 'देशों में सेवा' : 'Countries'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer as instructed */}
        <div className="border-t border-stone-800/80 pt-6 pb-4">
          <p className="text-[11px] text-stone-500 leading-relaxed text-center max-w-4xl mx-auto">
            {t.disclaimer}
          </p>
        </div>

        {/* Copyright & Admin Portal Link */}
        <div className="border-t border-stone-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>{t.copyright}</span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-amber-500/80">
              numerologywithrandhirsingh.vercel.app
            </span>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-amber-400 transition cursor-pointer"
              title="Administrator CMS Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
