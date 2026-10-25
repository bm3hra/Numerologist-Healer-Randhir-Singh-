import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SundaySpecialBanner } from './components/SundaySpecialBanner';
import { DobCalculator } from './components/DobCalculator';
import { LunarNumerologySection } from './components/LunarNumerologySection';
import { WatchAnalysisSection } from './components/WatchAnalysisSection';
import { SaltTherapySection } from './components/SaltTherapySection';
import { CrystalTherapySection } from './components/CrystalTherapySection';
import { MobileAndNameAnalyzer } from './components/MobileAndNameAnalyzer';
import { GridMatchingTool } from './components/GridMatchingTool';
import { SwitchwordsAndYantras } from './components/SwitchwordsAndYantras';
import { AllServicesSection } from './components/AllServicesSection';
import { AboutRandhirSinghSection } from './components/AboutRandhirSinghSection';
import { AboutAndTariffSection } from './components/AboutAndTariffSection';
import { AwardsSection } from './components/AwardsSection';
import { AssetsCertificatesSection } from './components/AssetsCertificatesSection';
import { FaqSection } from './components/FaqSection';
import { MediaGallerySection } from './components/MediaGallerySection';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

// 5 Dedicated Detailed Pages
import { YantraHealingsPage } from './components/pages/YantraHealingsPage';
import { SpecialYantrasPage } from './components/pages/SpecialYantrasPage';
import { AndMoreRemediesPage } from './components/pages/AndMoreRemediesPage';
import { DobYantrasPage } from './components/pages/DobYantrasPage';
import { KundliMilanPage } from './components/pages/KundliMilanPage';
import { IndividualServicePage } from './components/pages/IndividualServicePage';

import {
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  Briefcase,
  Heart,
  Grid,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language, ServiceItem, NumerologyProfile } from './types';
import { triggerFullSiteTranslation } from './i18n/translator';

const DEDICATED_PAGES = [
  'yantra-healings',
  'special-yantras',
  'and-more',
  'dob-yantras',
  'kundli-milan',
  'about-randhir',
  ...Array.from({ length: 16 }, (_, i) => `service-${i + 1}`)
];

export default function App() {
  const [lang, setLangState] = useState<string>(() => {
    try {
      return localStorage.getItem('dyd_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang: string) => {
    setLangState(newLang);
    triggerFullSiteTranslation(newLang);
  };

  React.useEffect(() => {
    document.documentElement.lang = lang;
    if (lang && lang !== 'en') {
      triggerFullSiteTranslation(lang);
    }
  }, [lang]);

  const [currentTab, setCurrentTab] = useState<string>('home');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>(
    'Personalized Spiritual Consultation'
  );
  const [selectedPriceForBooking, setSelectedPriceForBooking] = useState<string | undefined>();

  const handleOpenBooking = (serviceName?: string, price?: string) => {
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    }
    if (price) {
      setSelectedPriceForBooking(price);
    }
    setIsBookingOpen(true);
  };

  const SECTION_MAP: Record<string, string> = {
    home: 'home',
    dob: 'dob-calculator',
    'dob-calculator': 'dob-calculator',
    lunar: 'lunar-numerology',
    'lunar-numerology': 'lunar-numerology',
    watch: 'watch-analysis',
    'watch-analysis': 'watch-analysis',
    salt: 'salt-therapy',
    'salt-therapy': 'salt-therapy',
    crystal: 'crystal-therapy',
    'crystal-therapy': 'crystal-therapy',
    mobile_name: 'mobile-name',
    'mobile-name': 'mobile-name',
    compatibility: 'grid-matching',
    'grid-matching': 'grid-matching',
    remedies: 'yantras-codes',
    'yantras-codes': 'yantras-codes',
    services: 'all-services',
    'all-services': 'all-services',
    media: 'media-gallery',
    'media-gallery': 'media-gallery',
    awards: 'awards-recognition',
    'awards-recognition': 'awards-recognition',
    assets: 'assets-certificates',
    'assets-certificates': 'assets-certificates',
    faq: 'faq-section',
    'faq-section': 'faq-section',
    tariff: 'tariff-about',
    'tariff-about': 'tariff-about',
    about: 'about-randhir',
    'about-randhir': 'about-randhir',
    'randhir-singh': 'about-randhir'
  };

  const handleNavigate = (sectionId: string, updateUrl: boolean = true) => {
    let cleanSection = sectionId.toLowerCase().trim();
    if (cleanSection.startsWith('service/') || cleanSection.startsWith('service_')) {
      cleanSection = cleanSection.replace('service/', 'service-').replace('service_', 'service-');
    }
    setCurrentTab(cleanSection);

    // Update browser URL hash so all links are real working, bookmarkable URLs
    if (updateUrl) {
      const cleanHash = cleanSection === 'home' ? '' : `#${cleanSection}`;
      try {
        if (window.history.pushState) {
          window.history.pushState(null, '', cleanHash || window.location.pathname);
        } else {
          window.location.hash = cleanHash;
        }
      } catch {
        window.location.hash = cleanHash;
      }
    }

    // If navigating to one of the dedicated pages (including all 16 individual services) or home, scroll to top
    if (cleanSection === 'home' || DEDICATED_PAGES.includes(cleanSection) || cleanSection.startsWith('service-')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Otherwise scroll to the section anchor
    const targetId = SECTION_MAP[cleanSection] || cleanSection;
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // Synchronize browser URL hash on initial page load and on back/forward browser buttons
  React.useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (rawHash) {
        handleNavigate(rawHash, false);
      } else {
        setCurrentTab('home');
      }
    };

    window.addEventListener('hashchange', handleHash);

    // Initial mount check
    if (window.location.hash) {
      setTimeout(handleHash, 150);
    }

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectServiceFrom16 = (service: ServiceItem) => {
    handleOpenBooking(service.titleEn);
  };

  const handleBookPersonalizedReading = (profile: NumerologyProfile) => {
    handleOpenBooking(
      `Full Destiny Reading (Mulank ${profile.driverNumber}, Bhagyank ${profile.conductorNumber})`
    );
  };

  // Check if currentTab is one of the 5 dedicated pages
  const isDedicatedPage = DEDICATED_PAGES.includes(currentTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900">
      {/* Subtle Viewport Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onNavigate={handleNavigate}
        lang={lang as Language}
        setLang={setLang}
        onOpenBooking={(svc) => handleOpenBooking(svc)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ROUTE 1: Yantra Healings Detailed Page */}
        {currentTab === 'yantra-healings' && (
          <YantraHealingsPage
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToPage={(p) => handleNavigate(p)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* ROUTE 2: Special Yantras for Business, Job, Special Desires */}
        {currentTab === 'special-yantras' && (
          <SpecialYantrasPage
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToPage={(p) => handleNavigate(p)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* ROUTE 3: Yantras as per Date of Birth */}
        {currentTab === 'dob-yantras' && (
          <DobYantrasPage
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToPage={(p) => handleNavigate(p)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* ROUTE 4: Kundli Milan as per Numerology */}
        {currentTab === 'kundli-milan' && (
          <KundliMilanPage
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToPage={(p) => handleNavigate(p)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* ROUTE 5: And More.... (Remedies & Holistic Vault) */}
        {currentTab === 'and-more' && (
          <AndMoreRemediesPage
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToPage={(p) => handleNavigate(p)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* ROUTE 6: About Numerologist & Healer · Randhir Singh Dedicated Page (18 Photos & Credentials) */}
        {currentTab === 'about-randhir' && (
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-4 py-2 rounded-xl hover:bg-amber-200 transition-colors shadow-2xs"
              >
                <span>← {lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Main Page'}</span>
              </button>
            </div>
            <AboutRandhirSinghSection
              lang={lang as Language}
              onOpenBooking={(svc) => handleOpenBooking(svc)}
            />
          </div>
        )}

        {/* ROUTE 7: Individual Dedicated Pages for All 16 Sacred Services */}
        {currentTab.startsWith('service-') && (
          <IndividualServicePage
            serviceId={parseInt(currentTab.replace('service-', ''), 10) || 1}
            lang={lang as Language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToService={(id) => handleNavigate(`service-${id}`)}
            onOpenBooking={(svc, price) => handleOpenBooking(svc, price)}
          />
        )}

        {/* ROUTE 6: Standard Homepage with All Interactive Sections */}
        {!isDedicatedPage && (
          <>
            {/* Hero Section with 24 Language Selector & Launches */}
            <HeroSection
              lang={lang}
              setLang={setLang}
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking('Personalized Spiritual Consultation', '₹5,100')}
            />

            {/* Global Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Sunday Special Offer Banner (Card Highlight) */}
              <SundaySpecialBanner
                lang={lang as Language}
                onClaim={() => handleOpenBooking('Sunday Free Consultation', 'FREE')}
              />

              {/* 5 Dedicated In-Depth Detailed Portals Showcase Banner */}
              <div className="my-8 p-6 sm:p-8 bg-gradient-to-br from-[#fbf8f0] via-white to-amber-50/60 rounded-3xl border-2 border-amber-300 shadow-lg">
                <div className="text-center max-w-3xl mx-auto mb-6">
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-2 border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{lang === 'hi' ? 'विशेष विस्तृत अनुभाग एवं पोर्टल' : 'Dedicated Specialized In-Depth Portals'}</span>
                  </div>
                  <h2 className="font-sacred text-2xl sm:text-3xl font-black text-stone-900">
                    {lang === 'hi' ? 'विशिष्ट उपचारात्मक पोर्टल' : 'Explore Numerologist & Healer · Randhir Singh’s Core Portals'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    {lang === 'hi'
                      ? 'गहन अध्ययन, गणना एवं सिद्ध उपायों हेतु नीचे दिए गए किसी भी पोर्टल पर क्लिक करें:'
                      : 'Click any portal below for deep technical calculations, sacred matrices, and personalized solutions:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {/* Card 1: Yantra Healings */}
                  <div
                    onClick={() => handleNavigate('yantra-healings')}
                    className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4 text-amber-800" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Detailed Page
                      </span>
                      <h3 className="font-sacred font-bold text-stone-900 text-sm mt-1.5 group-hover:text-amber-900 leading-snug">
                        {lang === 'hi' ? 'यंत्र हीलिंग विज्ञान' : 'Yantra Healings'}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {lang === 'hi' ? '6 प्रमुख उपचारात्मक यंत्र, बीज मंत्र एवं ऊर्जा चिकित्सा।' : '6 healing yantras, sonic frequencies & Prana Pratishtha.'}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <span>{lang === 'hi' ? 'पृष्ठ देखें →' : 'View Page →'}</span>
                    </div>
                  </div>

                  {/* Card 2: Special Yantras */}
                  <div
                    onClick={() => handleNavigate('special-yantras')}
                    className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Briefcase className="w-4 h-4 text-amber-800" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Business &amp; Job
                      </span>
                      <h3 className="font-sacred font-bold text-stone-900 text-sm mt-1.5 group-hover:text-amber-900 leading-snug">
                        {lang === 'hi' ? 'व्यापार, नौकरी व मनोरथ' : 'Special Yantras'}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {lang === 'hi' ? 'व्यापार वृद्धि, कुबेर 72 योग, सरकारी नौकरी एवं सर्व कार्य सिद्धि।' : 'Vyapar Vridhi, Kuber Matrix 72, Govt Job & Siddhi.'}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <span>{lang === 'hi' ? 'पृष्ठ देखें →' : 'View Page →'}</span>
                    </div>
                  </div>

                  {/* Card 3: DOB Yantras */}
                  <div
                    onClick={() => handleNavigate('dob-yantras')}
                    className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Calendar className="w-4 h-4 text-amber-800" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        DOB Calculator
                      </span>
                      <h3 className="font-sacred font-bold text-stone-900 text-sm mt-1.5 group-hover:text-amber-900 leading-snug">
                        {lang === 'hi' ? 'जन्मतिथि अनुसार यंत्र' : 'Yantras per DOB'}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {lang === 'hi' ? 'मूलांक व भाग्यांक से अपना व्यक्तिगत 3x3 मैजिक मैट्रिक्स जानें।' : 'Calculate your custom planetary 3x3 Magic Square.'}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <span>{lang === 'hi' ? 'गणना करें →' : 'Calculate →'}</span>
                    </div>
                  </div>

                  {/* Card 4: Kundli Milan */}
                  <div
                    onClick={() => handleNavigate('kundli-milan')}
                    className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Heart className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        36 Guna Milan
                      </span>
                      <h3 className="font-sacred font-bold text-stone-900 text-sm mt-1.5 group-hover:text-amber-900 leading-snug">
                        {lang === 'hi' ? 'अंक कुंडली मिलान' : 'Kundli Milan'}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {lang === 'hi' ? 'विवाह व व्यापार साझेदार हेतु 36-बिंदु वैज्ञानिक मिलान।' : '36-point compatibility index & dual Lo-Shu synastry.'}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <span>{lang === 'hi' ? 'मिलान करें →' : 'Match Now →'}</span>
                    </div>
                  </div>

                  {/* Card 5: And More.... */}
                  <div
                    onClick={() => handleNavigate('and-more')}
                    className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-600 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4 text-amber-800" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Remedies Vault
                      </span>
                      <h3 className="font-sacred font-bold text-stone-900 text-sm mt-1.5 group-hover:text-amber-900 leading-snug">
                        {lang === 'hi' ? 'और भी... (रेमेडीज)' : 'And More....'}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {lang === 'hi' ? 'स्विच वर्ड्स, हीलिंग कोड्स, सिद्ध रुद्राक्ष एवं कॉपर पिरामिड।' : 'Switchwords, Grabovoi codes, Rudraksha & Pyramids.'}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <span>{lang === 'hi' ? 'खोजें →' : 'Explore Vault →'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Date of Birth & Lo-Shu Magic Grid Calculator */}
            <DobCalculator
              lang={lang as Language}
              onBookPersonalizedReading={handleBookPersonalizedReading}
            />

            {/* 2. Lunar Cycles & Personal Numerological Guidance */}
            <LunarNumerologySection
              lang={lang as Language}
              onOpenBooking={(svc) => handleOpenBooking(svc)}
            />

            {/* 3. Signature Specialty: Watch Analysis & Therapy Watches */}
            <WatchAnalysisSection
              lang={lang as Language}
              onBookWatchConsultation={() =>
                handleOpenBooking('Watch Analysis & Therapeutic Watch Consultation', '₹1,800')
              }
            />

            {/* 4. Negativity Removal & Traditional Salt Therapy */}
            <SaltTherapySection
              lang={lang as Language}
              onBookSaltSession={() =>
                handleOpenBooking('Negativity Removal & Salt Therapy', '₹5,100')
              }
            />

            {/* 5. Crystal Therapy & Personalized Guidance */}
            <CrystalTherapySection
              lang={lang as Language}
              onBookCrystalSession={(name) =>
                handleOpenBooking(name ? `Crystal Guidance: ${name}` : 'Personalized Crystal Guidance')
              }
            />

            {/* 6. Lucky Mobile Numbers & Chaldean Name Corrections */}
            <MobileAndNameAnalyzer
              lang={lang as Language}
              onBookConsultation={(svc) => handleOpenBooking(svc)}
            />

            {/* 7. Grid Matching (Marriage, Business Partners, Employees) */}
            <GridMatchingTool
              lang={lang as Language}
              onBookMatchingSession={(type) => handleOpenBooking(type)}
            />

            {/* 8. Sacred Yantras, Healing Codes & Switchwords with 108 Japa Counter */}
            <SwitchwordsAndYantras
              lang={lang as Language}
              onBookYantraGuidance={(yantraName) =>
                handleOpenBooking(yantraName ? `Sacred Yantra: ${yantraName}` : 'Consecrated Bhojpatra Yantra')
              }
            />

            {/* 9. All 16 Services Catalog from Visiting Card & Flyer */}
            <AllServicesSection
              lang={lang as Language}
              onSelectService={(svc) => handleNavigate(`service-${svc.id}`)}
              onNavigateToService={(svcId) => handleNavigate(`service-${svcId}`)}
              onOpenBooking={(svcName) => handleOpenBooking(svcName)}
            />

            {/* 10. Dedicated About Numerologist & Healer · Randhir Singh Section (Featuring 18 Photos & Credentials) */}
            <AboutRandhirSinghSection
              lang={lang as Language}
              onOpenBooking={(svc) => handleOpenBooking(svc)}
            />

            {/* 11. Spiritual Guidance & Healing Tariff */}
            <AboutAndTariffSection
              lang={lang as Language}
              onBookService={(title, price) => handleOpenBooking(title, price)}
            />

            {/* 11. Prestigious Honors & Felicitations */}
            <AwardsSection
              lang={lang as Language}
              onOpenBooking={() => handleOpenBooking('Personalized Spiritual Consultation', '₹5,100')}
            />

            {/* 12. Official Certificates & Assets Vault (featuring the 4 new certificates) */}
            <AssetsCertificatesSection
              lang={lang as Language}
              onOpenBooking={(svc, price) => handleOpenBooking(svc, price)}
            />

            {/* 13. Photos & Video Showcase */}
            <MediaGallerySection
              lang={lang as Language}
              onOpenBooking={(svc) => handleOpenBooking(svc)}
            />

            {/* 14. Frequently Asked Questions */}
            <FaqSection
              lang={lang as Language}
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}
      </main>

      {/* Footer with Jaipur address, timings, disclaimer, copyright */}
      <Footer
        lang={lang as Language}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Appointment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={selectedServiceForBooking}
        defaultPrice={selectedPriceForBooking}
        lang={lang as Language}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <aside aria-label="Mobile quick actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf7f0]/95 backdrop-blur-md border-t border-amber-300/80 px-3 py-2 shadow-2xl">
        <div className="flex items-center justify-between gap-1.5 max-w-lg mx-auto">
          {/* 1-Tap Base Language Switcher */}
          <div className="flex items-center bg-amber-100/80 p-0.5 rounded-lg border border-amber-300/70 text-[11px] font-bold shrink-0">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'en'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:text-black'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'hi'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:text-black'
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
          </div>

          {/* Call direct */}
          <a
            href="tel:+919509593150"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 py-2 px-2 rounded-lg text-xs font-semibold border border-stone-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span className="hidden xs:inline">{lang === 'hi' ? 'कॉल' : 'Call'}</span>
          </a>

          {/* WhatsApp direct */}
          <a
            href="https://wa.me/919509593150?text=Hello%20Randhir%20Ji%2C%20I%20would%20like%20to%20consult%20regarding%20Numerology%20and%20healing."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-2 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* Book Consultation */}
          <button
            onClick={() => handleOpenBooking()}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white py-2 px-2 rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span className="truncate">{lang === 'hi' ? 'बुक करें' : 'Book'}</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
