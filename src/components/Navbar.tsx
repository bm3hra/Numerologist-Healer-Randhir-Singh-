import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Phone, MessageCircle, Clock, Menu, X, Compass, ShieldCheck, ChevronDown, FileText, CreditCard } from 'lucide-react';
import { Language, CMSPage } from '../types';
import { getPublishedPages } from '../lib/cmsService';

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
  const [dynamicNavPages, setDynamicNavPages] = useState<CMSPage[]>([]);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Load published pages dynamically for navbar
  useEffect(() => {
    async function loadNavPages() {
      try {
        const pages = await getPublishedPages();
        setDynamicNavPages(pages.filter((p) => p.showInNav));
      } catch (e) {
        // Soft fallback
      }
    }
    loadNavPages();
  }, []);

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
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'tariff', labelEn: 'Fees & Tariff', labelHi: 'परामर्श व फीस' },
    { id: 'about-randhir', labelEn: 'About Randhir Singh', labelHi: 'रणधीर सिंह जी' },
    { id: 'dob', labelEn: 'DOB & Lo-Shu', labelHi: 'जन्मतिथि और ग्रिड' },
    { id: 'watch', labelEn: 'Watch Therapy', labelHi: 'हाथ की घड़ी (वॉच थेरेपी)' },
    { id: 'awards', labelEn: 'Honors & Awards', labelHi: 'अवॉर्ड और सम्मान' },
    { id: 'salt', labelEn: 'Salt & Crystals', labelHi: 'सॉल्ट थेरेपी व क्रिस्टल', hideOnLg: true },
    { id: 'services', labelEn: 'All Services', labelHi: 'सभी 16 सेवाएँ', hideOnLg: true },
  ];

  // Secondary navigation tabs placed in "More" dropdown on desktop
  const secondaryNavLinks = [
    { id: 'tariff', labelEn: '💳 Consultancy & Healing Services Fees (Complete Tariff)', labelHi: '💳 परामर्श एवं हीलिंग सेवाएं फीस (सम्पूर्ण टैरिफ)' },
    { id: 'about-randhir', labelEn: '★ About Numerologist & Healer · Randhir Singh (18 Photos)', labelHi: '★ रणधीर सिंह जी का परिचय (18 फोटो)' },
    { id: 'services', labelEn: '★ All 16 Divine Services (Individual Pages)', labelHi: '★ सभी 16 सेवाएँ (विस्तार से)' },
    { id: 'yantra-healings', labelEn: '★ Yantra Healings (Detailed Page)', labelHi: '★ सिद्ध यंत्र और हीलिंग' },
    { id: 'special-yantras', labelEn: '★ Special Yantras (Business, Job, Desires)', labelHi: '★ खास यंत्र (व्यापार, नौकरी, मनोकामना)' },
    { id: 'dob-yantras', labelEn: '★ Yantras as per Date of Birth', labelHi: '★ जन्मतिथि के अनुसार लकी यंत्र' },
    { id: 'kundli-milan', labelEn: '★ Kundli Milan as per Numerology', labelHi: '★ अंक ज्योतिष कुंडली मिलान' },
    { id: 'and-more', labelEn: '★ And More.... (Remedies Vault)', labelHi: '★ और भी सरल उपाय...' },
    { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नेगेटिविटी हटाएँ (सॉल्ट थेरेपी)' },
    { id: 'services', labelEn: 'All 16 Divine Services', labelHi: 'सभी 16 सेवाएँ', showOnLgOnly: true },
    { id: 'lunar', labelEn: 'Lunar Energy & Numerology', labelHi: 'चंद्रमा और अंक ज्योतिष' },
    { id: 'crystal', labelEn: 'Crystal Therapy Guidance', labelHi: 'क्रिस्टल थेरेपी की सलाह' },
    { id: 'mobile_name', labelEn: 'Lucky Mobile & Name Correction', labelHi: 'लकी मोबाइल नंबर व नाम सुधार' },
    { id: 'compatibility', labelEn: '3x3 Grid Compatibility', labelHi: '3x3 ग्रिड से मैचिंग' },
    { id: 'remedies', labelEn: 'Yantras, Codes & Switchwords', labelHi: 'यंत्र, हीलिंग कोड और स्विचवर्ड्स' },
    { id: 'assets', labelEn: 'Official Certificates & Assets Vault', labelHi: 'सर्टिफिकेट्स व डिग्री' },
    { id: 'media', labelEn: 'Photos & Video Masterclasses', labelHi: 'फोटो और वीडियो क्लास' },
    { id: 'faq', labelEn: 'Frequently Asked Questions', labelHi: 'अक्सर पूछे जाने वाले सवाल (FAQ)' },
    { id: 'client-reviews-stories', labelEn: '★ Client Reviews & Stories (Instant Submit)', labelHi: '★ ग्राहकों के अनुभव एवं कहानियाँ' },
  ];

  // All links combined for the full mobile menu
  const allNavLinks = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'tariff', labelEn: '💳 Consultancy & Healing Services Fees', labelHi: '💳 परामर्श एवं हीलिंग सेवाएं फीस' },
    { id: 'about-randhir', labelEn: 'About Randhir Singh (18 Photos)', labelHi: 'रणधीर सिंह जी (18 फोटो)' },
    { id: 'dob', labelEn: 'DOB & Lo-Shu Grid', labelHi: 'जन्मतिथि और ग्रिड' },
    { id: 'yantra-healings', labelEn: 'Yantra Healings Page', labelHi: 'सिद्ध यंत्र और हीलिंग' },
    { id: 'special-yantras', labelEn: 'Special Yantras (Business/Job)', labelHi: 'खास यंत्र (व्यापार/नौकरी)' },
    { id: 'dob-yantras', labelEn: 'Yantras as per DOB', labelHi: 'जन्मतिथि अनुसार लकी यंत्र' },
    { id: 'kundli-milan', labelEn: 'Kundli Milan (36 Guna)', labelHi: 'कुंडली मिलान' },
    { id: 'and-more', labelEn: 'And More.... (Remedies)', labelHi: 'और भी उपाय...' },
    { id: 'watch', labelEn: 'Watch Therapy & Guidance', labelHi: 'हाथ की घड़ी (वॉच थेरेपी)' },
    { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'सॉल्ट थेरेपी (नमक के उपाय)' },
    { id: 'crystal', labelEn: 'Crystal Guidance', labelHi: 'क्रिस्टल थेरेपी' },
    { id: 'mobile_name', labelEn: 'Mobile & Name Correction', labelHi: 'लकी मोबाइल व नाम सुधार' },
    { id: 'compatibility', labelEn: 'Grid Matching', labelHi: 'ग्रिड मिलान' },
    { id: 'remedies', labelEn: 'Yantras, Codes & Switchwords', labelHi: 'यंत्र, हीलिंग कोड और स्विचवर्ड्स' },
    { id: 'awards', labelEn: 'Honors & Awards', labelHi: 'पुरस्कार व सम्मान' },
    { id: 'assets', labelEn: 'Certificates & Assets', labelHi: 'सर्टिफिकेट्स' },
    { id: 'services', labelEn: 'All 16 Divine Services', labelHi: 'सभी 16 सेवाएँ' },
    { id: 'faq', labelEn: 'FAQs', labelHi: 'अक्सर पूछे जाने वाले सवाल' },
    { id: 'client-reviews-stories', labelEn: 'Client Reviews & Stories (Submit)', labelHi: 'ग्राहकों के अनुभव एवं समीक्षाएँ' },
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
      {/* Top divine invocation strip */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-100 text-xs py-1 px-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Divine Ganesh Invocation & Brand Location */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <span className="font-sacred text-amber-300 font-bold tracking-wider text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
              ॥ ॐ श्री गणेशाय नमः ॥
            </span>
            <span className="hidden md:inline text-amber-200/70">·</span>
            <span className="hidden md:inline text-amber-200/90 font-medium text-xs truncate">
              {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}
            </span>
          </div>

          {/* Sunday Free Highlight & Language Switcher (Guaranteed to stay within screen boundaries) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Free Sunday consultation highlight - compact on mobile */}
            <button
              onClick={() => onOpenBooking('Sunday Free Consultation')}
              className="hidden xs:inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 px-1.5 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-colors shrink-0 whitespace-nowrap"
              title={lang === 'hi' ? 'रविवार: पहले 5 कंसल्टेशन फ्री' : 'Sunday: First 5 Consultations FREE'}
            >
              <Clock className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? 'रविवार: पहले 5 कंसल्टेशन फ्री' : 'Sunday: First 5 Consultations FREE'}
              </span>
              <span className="sm:hidden">
                {lang === 'hi' ? 'रविवार: 5 फ्री' : 'Sunday 5 Free'}
              </span>
            </button>

            {/* Direct Fees Link in Top Bar */}
            <a
              href="#tariff"
              onClick={(e) => handleNavClick('tariff', e)}
              className="inline-flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white border border-amber-400/50 px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-all shrink-0 whitespace-nowrap shadow-2xs"
              title={lang === 'hi' ? 'परामर्श एवं हीलिंग सेवाएं फीस (Consultancy & Healing Services Fees)' : 'Consultancy & Healing Services Fees'}
            >
              <CreditCard className="w-3 h-3 text-amber-300 shrink-0" />
              <span>{lang === 'hi' ? 'सेवा फीस (Tariff)' : 'Fees & Tariff'}</span>
            </a>

            {/* Direct Admin Access Button */}
            <a
              href="#admin"
              onClick={(e) => handleNavClick('admin', e)}
              className="inline-flex items-center gap-1 bg-amber-950/80 hover:bg-stone-950 text-amber-300 hover:text-amber-200 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-all shrink-0 whitespace-nowrap shadow-2xs group"
              title="व्यवस्थापक CMS पैनल खोलें (/admin)"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Admin</span>
            </a>

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
                {lang === 'hi' ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर' : 'A Numerologist and Healer · Randhir Singh Ji Jaipur'}
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-800/80 font-medium tracking-wide truncate hidden md:block">
                {lang === 'hi' ? 'अपनी जन्मतिथि को समझें, अपनी ज़िंदगी और भविष्य को बेहतर बनाएँ।' : 'DECODE YOUR DATE OF BIRTH. CHANGE YOUR LIFE AND DESTINY.'}
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

            {/* Dedicated "विशेष पृष्ठ (Pages)" Dropdown */}
            {dynamicNavPages.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(true)}
                  className="inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 text-xs font-semibold rounded-md text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 transition-all whitespace-nowrap shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>{lang === 'hi' ? 'विशेष पृष्ठ' : 'Pages'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <ChevronDown className="w-3 h-3 text-amber-700" />
                </button>
              </div>
            )}

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
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-amber-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                  {dynamicNavPages.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 text-[10px] font-bold text-amber-900/90 uppercase tracking-wider bg-amber-50/70 border-b border-amber-200/50 flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-amber-700" />
                        <span>{lang === 'hi' ? 'विशेष नए पेज व लेख' : 'Published Articles & Guides'}</span>
                      </div>
                      {dynamicNavPages.map((page) => (
                        <a
                          key={page.id}
                          href={`#pages/${page.slug}`}
                          onClick={(e) => handleNavClick(`pages/${page.slug}`, e)}
                          className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between block ${
                            currentTab === `pages/${page.slug}`
                              ? 'bg-amber-100/70 text-amber-950 font-bold'
                              : 'text-amber-900 font-medium hover:bg-amber-50/80'
                          }`}
                        >
                          <span className="truncate">{lang === 'hi' && page.titleHi ? page.titleHi : page.title}</span>
                          <span className="text-[10px] text-amber-600 font-mono">/page</span>
                        </a>
                      ))}
                    </>
                  )}

                  <div className="px-3 py-1.5 text-[10px] font-bold text-amber-900/70 uppercase tracking-wider border-b border-stone-100">
                    {lang === 'hi' ? 'खास टूल्स और सेवाएँ' : 'Specialized Tools & Vault'}
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

                  <div className="pt-2 mt-2 border-t border-stone-100 px-3">
                    <a
                      href="#admin"
                      onClick={(e) => handleNavClick('admin', e)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-stone-900 hover:bg-amber-950 text-amber-300 text-xs font-semibold flex items-center justify-between transition"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        Admin CMS Portal
                      </span>
                      <span className="text-[10px] text-amber-400/80">/admin</span>
                    </a>
                  </div>
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

          {dynamicNavPages.length > 0 && (
            <div className="mb-3 p-2 bg-amber-50/70 rounded-xl border border-amber-200/60">
              <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-amber-700" />
                <span>{lang === 'hi' ? 'विशेष नए लेख व पेज' : 'Published Articles & Guides'}</span>
              </div>
              <div className="space-y-1">
                {dynamicNavPages.map((page) => (
                  <a
                    key={page.id}
                    href={`#pages/${page.slug}`}
                    onClick={(e) => handleNavClick(`pages/${page.slug}`, e)}
                    className="block text-xs font-medium text-amber-950 hover:text-amber-800 py-1 px-1.5 rounded hover:bg-amber-100/50 truncate"
                  >
                    • {lang === 'hi' && page.titleHi ? page.titleHi : page.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mb-2">
            <a
              href="#admin"
              onClick={(e) => handleNavClick('admin', e)}
              className="w-full py-2 px-3 rounded-lg bg-stone-900 text-amber-300 text-xs font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin CMS Portal
              </span>
              <span className="text-[10px] text-amber-400 font-mono">/admin</span>
            </a>
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
