import React from 'react';
import { Gift, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUNDAY_SPECIAL_OFFER } from '../data/servicesData';
import { Language } from '../types';

interface SundaySpecialBannerProps {
  lang: Language;
  onClaim: () => void;
}

export const SundaySpecialBanner: React.FC<SundaySpecialBannerProps> = ({ lang, onClaim }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-50 p-5 sm:p-7 shadow-lg my-6">
      {/* Decorative subtle background accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4 text-left">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 shadow-md">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'रविवार की फ्री सेवा' : 'Weekly Free Service'}</span>
            </div>
            <h3 className="font-sacred text-lg sm:text-2xl font-bold text-amber-100 tracking-wide">
              {lang === 'hi' ? SUNDAY_SPECIAL_OFFER.titleHi : SUNDAY_SPECIAL_OFFER.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl">
              {lang === 'hi'
                ? 'हर रविवार रणधीर सिंह जी पहले 5 लोगों को 20 मिनट का कंसल्टेशन बिल्कुल फ्री देते हैं (पहले से बुकिंग जरूरी)। अपनी जन्मतिथि और ग्रिड की पूरी जांच करवाएँ।'
                : 'Numerologist & Healer · Randhir Singh offers 5 free 20-minute consultation slots every Sunday (advance booking required). Get your Date of Birth and grid analyzed.'}
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs text-amber-300/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? 'पूरी लो-शू ग्रिड जांच' : 'Complete Lo-Shu Grid Check'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? 'आसान उपाय और सही घड़ी की सलाह' : 'Simple Remedies & Watch Guidance'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? 'ऑनलाइन या जयपुर क्लिनिक में' : 'Online or Jaipur Clinic'}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center sm:items-end w-full sm:w-auto">
          <button
            onClick={onClaim}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
          >
            <Calendar className="w-4 h-4 text-stone-900" />
            <span>{lang === 'hi' ? 'रविवार का फ्री स्लॉट बुक करें' : 'Claim Free Sunday Slot'}</span>
            <ArrowRight className="w-4 h-4 text-stone-900" />
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
            <span className="text-[11px] text-amber-300/70 text-center sm:text-right">
              {lang === 'hi' ? 'व्हाट्सएप या कॉल: +91-9509593150' : 'Via WhatsApp or Call: +91-9509593150'}
            </span>
            <span className="hidden sm:inline text-amber-400/40">·</span>
            <a
              href="#tariff"
              className="text-[11px] text-amber-300 hover:text-white underline underline-offset-2 transition-colors font-medium"
            >
              {lang === 'hi' ? 'नियमित परामर्श फीस देखें (Tariff)' : 'View Regular Consultation Fees'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
