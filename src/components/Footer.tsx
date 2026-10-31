import React from 'react';
import { Compass, Phone, Mail, MapPin, Clock, MessageCircle, Heart, ShieldCheck, CreditCard, Star } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/languages';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenBooking }) => {
  const t = getTranslation(lang);

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
                  href="#tariff"
                  onClick={(e) => { e.preventDefault(); onNavigate('tariff'); }}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{lang === 'hi' ? 'परामर्श एवं हीलिंग सेवाएं फीस (Tariff)' : 'Consultancy & Healing Services Fees'}</span>
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
                  href="#services"
                  onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'सभी 16 पवित्र सेवाएँ' : 'All 16 Divine Services'}
                </a>
              </li>
              <li>
                <a
                  href="#awards"
                  onClick={(e) => { e.preventDefault(); onNavigate('awards'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'पुरस्कार एवं राष्ट्रीय सम्मान' : 'Honors & National Awards'}
                </a>
              </li>
              <li>
                <a
                  href="#assets"
                  onClick={(e) => { e.preventDefault(); onNavigate('assets'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'आधिकारिक प्रमाण-पत्र एवं सम्मान' : 'Official Certificates & Assets'}
                </a>
              </li>
              <li>
                <a
                  href="#media"
                  onClick={(e) => { e.preventDefault(); onNavigate('media'); }}
                  className="hover:text-amber-300 transition-colors block"
                >
                  {lang === 'hi' ? 'फ़ोटो व वीडियो गैलरी' : 'Photos & Video Showcase'}
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
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                <div className="text-amber-300 font-bold text-xs">
                  {lang === 'hi' ? 'व्हाट्सएप / कॉल व UPI:' : 'WhatsApp / Call & UPI:'}
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  +91-9509593150
                </div>
                <div className="text-[10px] text-stone-400">
                  PhonePe · GPay · Paytm · BHIM
                </div>
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-200" />
                <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
              </button>

              <button
                onClick={() => onNavigate('tariff')}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-950/80 hover:bg-stone-900 text-amber-300 hover:text-white font-bold py-2 px-3 rounded-lg text-xs border border-amber-500/40 transition-colors shadow-2xs mt-1.5 cursor-pointer"
                title={lang === 'hi' ? 'परामर्श एवं हीलिंग सेवाएं फीस' : 'Consultancy & Healing Services Fees'}
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'परामर्श व हीलिंग फीस सूची' : 'Consultancy & Healing Fees'}</span>
              </button>
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
