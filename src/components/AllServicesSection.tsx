import React, { useState } from 'react';
import { Sparkles, Watch, Calendar, Clock, Baby, PhoneCall, ShieldAlert, FileSignature, HeartHandshake, Users, Volume2, Sun, Binary, Grid, Trophy, Gem, ArrowRight, Search, CreditCard } from 'lucide-react';
import { ALL_SERVICES } from '../data/servicesData';
import { Language, ServiceItem } from '../types';

interface AllServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onNavigateToService?: (serviceId: number) => void;
  onOpenBooking?: (serviceName?: string) => void;
}

export const AllServicesSection: React.FC<AllServicesSectionProps> = ({
  lang,
  onSelectService,
  onNavigateToService,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Watch': return Watch;
      case 'Calendar': return Calendar;
      case 'Clock': return Clock;
      case 'Baby': return Baby;
      case 'PhoneCall': return PhoneCall;
      case 'ShieldAlert': return ShieldAlert;
      case 'FileSignature': return FileSignature;
      case 'HeartHandshake': return HeartHandshake;
      case 'Users': return Users;
      case 'Volume2': return Volume2;
      case 'Sun': return Sun;
      case 'Binary': return Binary;
      case 'Grid': return Grid;
      case 'Trophy': return Trophy;
      case 'Gem': return Gem;
      default: return Sparkles;
    }
  };

  const filteredServices = ALL_SERVICES.filter((svc) => {
    if (selectedFilter !== 'all' && svc.category !== selectedFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        svc.titleEn.toLowerCase().includes(q) ||
        svc.titleHi.toLowerCase().includes(q) ||
        svc.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCardClick = (service: ServiceItem) => {
    if (onNavigateToService) {
      onNavigateToService(service.id);
    } else {
      onSelectService(service);
    }
  };

  return (
    <section id="all-services" className="relative py-12 sm:py-16 bg-[#fbf9f4] border-b border-amber-200/80">
      {/* Target anchor for direct #services URL navigation */}
      <div id="services" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'रणधीर सिंह जी की संपूर्ण 16 प्रमाणित सेवाएँ' : 'Complete Visiting Card Portfolio · Randhir Singh'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ' : 'ALL 16 DIVINE SERVICES'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi' ? 'अपनी जन्मतिथि के रहस्यों को जानें · अपने जीवन को समझें और अपने भविष्य को नई दिशा दें।' : 'Decode Your Date of Birth · Change Your Life and Destiny'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'अंक ज्योतिष, घड़ी विश्लेषण एवं थेरेपी, पारंपरिक नमक शुद्धिकरण, पवित्र यंत्र, हीलिंग कोड्स और आध्यात्मिक परामर्श सहित सभी 16 विशेष सेवाओं का अनुभव करें। प्रत्येक सेवा के लिए एक समर्पित अलग पृष्ठ उपलब्ध है, जहाँ आप उससे जुड़ी जानकारी, उसकी विशेषताओं और संबंधित प्रक्रिया के बारे में विस्तार से जान सकते हैं।'
              : 'Explore the complete repertoire of divine numerology, watch therapy, traditional salt clearing, yantras, and healing services. Each service features its own dedicated individual page.'}
          </p>
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300/80 px-3 py-1 rounded-full text-[11px] font-bold text-amber-900">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>{lang === 'hi' ? 'किसी भी सेवा कार्ड पर क्लिक करके उसका व्यक्तिगत संपूर्ण पृष्ठ देखें' : 'Click any service below to open its comprehensive individual page'}</span>
            </div>
            <a
              href="#tariff"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-white px-3.5 py-1 rounded-full text-[11px] font-bold border border-amber-600/50 shadow-2xs transition-all hover:scale-102"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'परामर्श एवं हीलिंग सेवाएं फीस (Tariff)' : 'Consultancy & Healing Services Fees'}</span>
            </a>
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', labelEn: 'All 16 Services', labelHi: 'सभी 16 सेवाएँ' },
              { id: 'numerology', labelEn: 'Numerology & DOB', labelHi: 'अंक ज्योतिष व जन्म तिथि' },
              { id: 'watch', labelEn: 'Watch Consultation', labelHi: 'घड़ी का विश्लेषण' },
              { id: 'salt', labelEn: 'Negativity Removal & Salt Therapy', labelHi: 'नमक चिकित्सा (सॉल्ट थेरेपी)' },
              { id: 'crystal', labelEn: 'Crystals', labelHi: 'क्रिस्टल थेरेपी' },
              { id: 'yantra', labelEn: 'Yantras', labelHi: 'पवित्र यंत्र' },
              { id: 'healing', labelEn: 'Healings & Codes', labelHi: 'हीलिंग एवं कोड्स' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === f.id
                    ? 'bg-amber-900 text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                }`}
              >
                {lang === 'hi' ? f.labelHi : f.labelEn}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'सेवा खोजें...' : 'Search service...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Services Grid (Numbered 1 to 16 matching visiting card!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-stone-200 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center font-mono">
                      {service.id < 10 ? `0${service.id}` : service.id}
                    </span>

                    {service.badge && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {lang === 'hi' ? (() => {
                          const badgeMap: Record<string, string> = {
                            'Popular': 'अत्यधिक लोकप्रिय',
                            'Signature Specialist': 'विशेषज्ञता प्राप्त',
                            'Core Foundation': 'मूल आधार',
                            'Unique Remedy': 'अद्वितीय उपाय',
                            'Family Blessing': 'पारिवारिक वरदान',
                            'High Impact': 'उच्च प्रभाव',
                            'Divine Cleansing': 'पवित्र शुद्धि',
                            'Holistic Shield': 'ऊर्जा कवच',
                            'Empowerment': 'आत्म-उत्थान',
                            'Direct Healing': 'प्रत्यक्ष उपचार',
                            'Frequency Code': 'ऊर्जा कोड',
                            'Vedic Matrix': 'वैदिक यंत्र',
                            'Divine Word': 'दिव्य शब्द',
                            'Chakra Stone': 'चक्र रत्न',
                            'Divine Aura': 'दिव्य आभामंडल',
                            'Vedic Healing': 'वैदिक उपचार'
                          };
                          return badgeMap[service.badge] || service.badge;
                        })() : service.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-amber-100 transition-all">
                    <Icon className="w-5 h-5 text-amber-800" />
                  </div>

                  <h3 className="font-sacred font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-amber-900 transition-colors">
                    {lang === 'hi' ? service.titleHi : service.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-900 group-hover:underline flex items-center gap-1">
                    <span>{lang === 'hi' ? 'विस्तृत पृष्ठ देखें' : 'Dedicated Page'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenBooking) {
                        onOpenBooking(service.titleEn);
                      } else {
                        onSelectService(service);
                      }
                    }}
                    className="text-[11px] font-bold text-stone-600 hover:text-white bg-stone-100 hover:bg-amber-800 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {lang === 'hi' ? 'परामर्श' : 'Consult Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
