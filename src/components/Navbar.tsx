import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Phone, MessageCircle, Clock, Menu, X, Compass, ShieldCheck, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onNavigate: (sectionId: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onNavigate,
  lang,
  setLang,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation tabs shown on 1024px+ screens
  const primaryNavLinks = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { id: 'about-randhir', labelEn: 'About Randhir Singh', labelHi: 'रणधीर सिंह जी' },
    { id: 'dob', labelEn: 'DOB & Lo-Shu', labelHi: 'जन्म तिथि व ग्रिड' },
    { id: 'watch', labelEn: 'Watch Analysis', labelHi: 'घड़ी का विश्लेषण' },
    { id: 'awards', labelEn: 'Honors & Awards', labelHi: 'पुरस्कार व सम्मान' },
    { id: 'salt', labelEn: 'Salt & Crystals', labelHi: 'नमक शुद्धि व क्रिस्टल', hideOnLg: true },
    { id: 'services', labelEn: 'All Services', labelHi: 'सभी सेवाएँ', hideOnLg: true },
  ];

  // Secondary navigation tabs placed in "More" dropdown on desktop
  const secondaryNavLinks = [
    { id: 'about-randhir', labelEn: '★ About Numerologist & Healer · Randhir Singh (18 Photos)', labelHi: '★ अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह परिचय (18 फ़ोटो)' },
    { id: 'services', labelEn: '★ All 16 Sacred Services (Individual Pages)', labelHi: '★ सभी 16 पवित्र सेवाएँ (व्यक्तिगत पृष्ठ)' },
    { id: 'yantra-healings', labelEn: '★ Yantra Healings (Detailed Page)', labelHi: '★ यंत्र हीलिंग विज्ञान (विस्तृत पृष्ठ)' },
    { id: 'special-yantras', labelEn: '★ Special Yantras (Business, Job, Desires)', labelHi: '★ विशेष यंत्र (व्यापार, नौकरी, मनोरथ)' },
    { id: 'dob-yantras', labelEn: '★ Yantras as per Date of Birth', labelHi: '★ जन्मतिथि अनुसार यंत्र विधान' },
    { id: 'kundli-milan', labelEn: '★ Kundli Milan as per Numerology', labelHi: '★ अंक ज्योतिष कुंडली मिलान' },
    { id: 'and-more', labelEn: '★ And More.... (Remedies Vault)', labelHi: '★ और भी... (वैदिक उपाय एवं हीलिंग)' },
    { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नमक चिकित्सा (सॉल्ट थेरेपी)' },
    { id: 'services', labelEn: 'All 16 Sacred Services', labelHi: 'सभी 16 पवित्र सेवाएँ', showOnLgOnly: true },
    { id: 'lunar', labelEn: 'Lunar Energy & Numerology', labelHi: 'चंद्र व अंक ज्योतिष' },
    { id: 'crystal', labelEn: 'Crystal Therapy Guidance', labelHi: 'क्रिस्टल थेरेपी' },
    { id: 'mobile_name', labelEn: 'Lucky Mobile & Name Correction', labelHi: 'मोबाइल व नाम सुधार' },
    { id: 'compatibility', labelEn: '3x3 Grid Compatibility', labelHi: 'ग्रिड मिलान' },
    { id: 'remedies', labelEn: 'Yantras, Codes & Switchwords', labelHi: 'यंत्र, हीलिंग कोड एवं स्विचवर्ड्स' },
    { id: 'assets', labelEn: 'Official Certificates & Assets Vault', labelHi: 'प्रमाण-पत्र एवं सम्मान' },
    { id: 'media', labelEn: 'Photos & Video Masterclasses', labelHi: 'फ़ोटो व वीडियो' },
    { id: 'faq', labelEn: 'Frequently Asked Questions', labelHi: 'अक्सर पूछे जाने वाले सवाल' },
  ];

  // All links combined for the full mobile menu
  const allNavLinks = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { id: 'about-randhir', labelEn: 'About Randhir Singh (18 Photos)', labelHi: 'रणधीर सिंह परिचय (18 फ़ोटो)' },
    { id: 'dob', labelEn: 'DOB & Lo-Shu', labelHi: 'जन्म तिथि व ग्रिड' },
    { id: 'yantra-healings', labelEn: 'Yantra Healings Page', labelHi: 'यंत्र हीलिंग पृष्ठ' },
    { id: 'special-yantras', labelEn: 'Special Yantras (Business/Job)', labelHi: 'विशेष यंत्र (व्यापार/नौकरी)' },
    { id: 'dob-yantras', labelEn: 'Yantras as per DOB', labelHi: 'जन्मतिथि अनुसार यंत्र' },
    { id: 'kundli-milan', labelEn: 'Kundli Milan (36 Guna)', labelHi: 'कुंडली मिलान' },
    { id: 'and-more', labelEn: 'And More.... (Remedies)', labelHi: 'और भी... (वैदिक उपाय)' },
    { id: 'watch', labelEn: 'Watch Analysis & Consultation', labelHi: 'घड़ी का विश्लेषण एवं चिकित्सीय परामर्श' },
    { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नमक चिकित्सा (सॉल्ट थेरेपी)' },
    { id: 'crystal', labelEn: 'Crystal Guidance', labelHi: 'क्रिस्टल थेरेपी' },
    { id: 'mobile_name', labelEn: 'Mobile & Name', labelHi: 'मोबाइल व नाम' },
    { id: 'compatibility', labelEn: 'Grid Matching', labelHi: 'ग्रिड मिलान' },
    { id: 'remedies', labelEn: 'Yantras, Codes & Switchwords', labelHi: 'यंत्र, हीलिंग कोड एवं स्विचवर्ड्स' },
    { id: 'awards', labelEn: 'Honors & Awards', labelHi: 'पुरस्कार व सम्मान' },
    { id: 'assets', labelEn: 'Certificates & Assets', labelHi: 'प्रमाण-पत्र' },
    { id: 'services', labelEn: 'All 16 Sacred Services', labelHi: 'सभी 16 पवित्र सेवाएँ' },
    { id: 'faq', labelEn: 'FAQs', labelHi: 'प्रश्नोत्तरी' },
  ];

  const handleNavClick = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    onNavigate(id);
  };

  const isSecondaryActive = secondaryNavLinks.some((l) => l.id === currentTab);

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f0]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs w-full">
      {/* Top sacred invocation strip */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-100 text-xs py-1 px-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Sacred Ganesh Invocation & Brand Location */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <span className="font-sacred text-amber-300 font-bold tracking-wider text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
              ॥ ॐ श्री गणेशाय नमः ॥
            </span>
            <span className="hidden md:inline text-amber-200/70">·</span>
            <span className="hidden md:inline text-amber-200/90 font-medium text-xs truncate">
              {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'Numerologist & Healer · Randhir Singh | Jaipur'}
            </span>
          </div>

          {/* Sunday Free Highlight & Language Switcher (Guaranteed to stay within screen boundaries) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Free Sunday consultation highlight - compact on mobile */}
            <button
              onClick={() => onOpenBooking('Sunday Free Consultation')}
              className="hidden xs:inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 px-1.5 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-colors shrink-0 whitespace-nowrap"
              title={lang === 'hi' ? 'रविवार: प्रथम 5 परामर्श निःशुल्क' : 'Sunday: First 5 Consultations FREE'}
            >
              <Clock className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? 'रविवार: प्रथम 5 परामर्श निःशुल्क' : 'Sunday: First 5 Consultations FREE'}
              </span>
              <span className="sm:hidden">
                {lang === 'hi' ? 'रविवार: 5 फ्री' : 'Sunday 5 Free'}
              </span>
            </button>

            {/* Language switch */}
            <div className="flex items-center bg-black/30 rounded p-0.5 border border-amber-500/30 text-[10px] sm:text-[11px] shrink-0">
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                  lang === 'en' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                  lang === 'hi' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:text-white'
                }`}
                aria-label="Switch to Hindi"
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 gap-2 sm:gap-3">
          {/* Logo / Brand Link to #home */}
          <a
            href="#home"
            onClick={(e) => handleNavClick('home', e)}
            className="flex items-center gap-2 sm:gap-2.5 text-left group min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-amber-100 shadow-md border border-amber-400/50 group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="font-sacred text-xs sm:text-base lg:text-lg font-bold tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors truncate">
                {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'Numerologist & Healer · Randhir Singh | Jaipur'}
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-800/80 font-medium tracking-wide truncate hidden md:block">
                {lang === 'hi' ? 'अपनी जन्मतिथि के रहस्यों को जानें। अपने जीवन को समझें और अपने भविष्य को नई दिशा दें।' : 'DECODE YOUR DATE OF BIRTH. CHANGE YOUR LIFE AND DESTINY.'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Items (Real anchor links with working URL hashes) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {primaryNavLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`px-2 xl:px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  link.hideOnLg ? 'hidden xl:inline-block' : 'inline-block'
                } ${
                  currentTab === link.id
                    ? 'text-amber-950 bg-amber-100/90 font-bold shadow-2xs border border-amber-300/60'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/80'
                }`}
              >
                {lang === 'hi' ? link.labelHi : link.labelEn}
              </a>
            ))}

            {/* "More / अन्य" Dropdown */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  isSecondaryActive
                    ? 'text-amber-950 bg-amber-100/90 font-bold border border-amber-300/60'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/80'
                }`}
              >
                <span>{lang === 'hi' ? 'अन्य सेवाएँ' : 'More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-amber-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-amber-900/70 uppercase tracking-wider border-b border-stone-100">
                    {lang === 'hi' ? 'अतिरिक्त विशेषताएँ' : 'Specialized Tools & Vault'}
                  </div>
                  {secondaryNavLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(link.id, e)}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between block ${
                        currentTab === link.id
                          ? 'bg-amber-50 text-amber-950 font-bold'
                          : 'text-stone-700 hover:bg-amber-50/50 hover:text-amber-900'
                      }`}
                    >
                      <span>{lang === 'hi' ? link.labelHi : link.labelEn}</span>
                      {currentTab === link.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Quick CTA Actions with safe margins so buttons never spill out */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 pl-1">
            {/* Phone link on wide screens (xl+) */}
            <a
              href="tel:+919509593150"
              className="hidden xl:inline-flex items-center gap-1 text-xs text-stone-700 hover:text-amber-900 px-2.5 py-1.5 border border-stone-200 hover:border-amber-400 rounded-lg transition-colors whitespace-nowrap bg-white/60"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="font-semibold">+91-9509593150</span>
            </a>

            {/* Main "Book Consultation" Button with elevated pop & safe boundaries */}
            <button
              onClick={() => onOpenBooking()}
              className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 hover:from-amber-800 hover:to-stone-900 text-white text-[11px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-5 py-2 rounded-xl shadow-md hover:shadow-lg shadow-amber-900/25 border border-amber-400/40 ring-1 ring-amber-500/30 transition-all active:scale-95 cursor-pointer"
              title={lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}
              </span>
              <span className="sm:hidden font-extrabold">
                {lang === 'hi' ? 'परामर्श बुक' : 'Book Now'}
              </span>
            </button>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-100 rounded-lg transition-colors shrink-0"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/80 bg-[#fbf7f0] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          {/* Mobile Base Language Switcher */}
          <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-amber-300">
            <span className="text-xs font-bold text-amber-950 flex items-center gap-1">
              <span>🌐</span> Base Language:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'hi'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
                }`}
              >
                🇮🇳 हिन्दी
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {allNavLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`text-left px-3 py-2 text-xs font-medium rounded-md transition-colors block ${
                  currentTab === link.id
                    ? 'bg-amber-200/70 text-amber-950 font-bold border border-amber-300'
                    : 'text-stone-700 hover:bg-amber-100/60'
                }`}
              >
                {lang === 'hi' ? link.labelHi : link.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-amber-200/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white py-2.5 rounded-lg text-sm font-bold shadow-xs hover:from-amber-800 hover:to-amber-950"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
            </button>

            <a
              href="https://wa.me/919509593150?text=Hello%20Randhir%20Ji%2C%20I%20would%20like%20to%20consult%20with%20you%20regarding%20Numerology%20and%20Destiny%20decoding."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-xs hover:bg-emerald-800"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>WhatsApp: +91-9509593150</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
