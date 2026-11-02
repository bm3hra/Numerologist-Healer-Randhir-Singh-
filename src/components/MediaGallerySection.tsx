import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, MessageCircle, X, ZoomIn, Award } from 'lucide-react';
import { VIDEO_SHOWCASE, VideoItem } from '../data/mediaData';
import { Language } from '../types';

interface MediaGallerySectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const MediaGallerySection: React.FC<MediaGallerySectionProps> = ({
  lang,
  onOpenBooking
}) => {
  // Modal state for full-size photo & certificate inspection
  const [selectedItem, setSelectedItem] = useState<VideoItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredItems = VIDEO_SHOWCASE.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  return (
    <section id="media-gallery" className="py-12 sm:py-16 bg-[#fcfaf5] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'आधिकारिक प्रमाण-पत्र एवं फोटो शोकेस' : 'Official Certificates & Photo Showcase'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'फोटो एवं सर्टिफिकेट्स शोकेस' : 'PHOTOS AND CERTIFICATE SHOWCASE'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            {lang === 'hi'
              ? 'जयपुर केंद्र से सीधे · थेरेपी वॉच · नमक शुद्धि विधान · सिद्ध यंत्र व प्रमाण-पत्र'
              : 'Direct from Jaipur Sanctuary · Watch Therapy · Salt Aura Cleansing · Certificates'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह जी के अधिकृत कोर्स सर्टिफिकेट्स, प्रतिष्ठित राष्ट्रीय कन्वोकेशन भाषण, कलाई घड़ी विश्लेषण एवं पावन उपचारों की प्रामाणिक फोटो गैलरी।'
              : 'Explore official verified course certificates, convocation keynote achievements, consecrated precision therapy watches, and authentic remedy credentials by Numerologist & Healer · Randhir Singh.'}
          </p>
        </div>

        {/* Categories Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी फोटो व सर्टिफिकेट्स' : 'All Photos & Certificates' },
            { id: 'convocation', label: lang === 'hi' ? 'कन्वोकेशन व सम्मान' : 'Convocation & Honors' },
            { id: 'masterclass', label: lang === 'hi' ? 'अंक ज्योतिष सर्टिफिकेट' : 'Numerology Certificate' },
            { id: 'watch', label: lang === 'hi' ? 'थेरेपी घड़ियाँ' : 'Therapy Watches' },
            { id: 'crystals', label: lang === 'hi' ? 'नेम करेक्शन सर्टिफिकेट' : 'Name Correction' },
            { id: 'salt', label: lang === 'hi' ? 'सॉल्ट थेरेपी व सेवाएँ' : 'Salt Therapy & Services' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === c.id
                  ? 'bg-amber-900 text-white shadow-2xs ring-1 ring-amber-700'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Clean Photos & Certificate Grid (without video play symbols or duration badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Photo Display Container */}
              <div
                onClick={() => setSelectedItem(item)}
                className="relative aspect-4/3 overflow-hidden bg-stone-950 cursor-pointer flex items-center justify-center"
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-amber-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-sm border border-amber-500/40">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'hi' ? 'बड़ा देखें' : 'View Full'}</span>
                  </span>
                </div>
              </div>

              {/* Photo Description & Takeaways */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sacred text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {lang === 'hi' ? item.descriptionHi : item.descriptionEn}
                  </p>

                  <div className="mt-3.5 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-950 block">
                      {lang === 'hi' ? 'मुख्य प्रमाण व विवरण:' : 'Key Information:'}
                    </span>
                    <ul className="text-xs text-stone-700 space-y-1">
                      {item.keyTakeaways.map((k, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{k}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-700" />
                    <span>{lang === 'hi' ? 'फोटो व विवरण' : 'View Photo'}</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking(item.titleEn)}
                    className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    <span>{lang === 'hi' ? 'परामर्श लें' : 'Consult'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Size High-Resolution Photo Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[92vh] flex flex-col">
              {/* Image Preview Area */}
              <div className="relative max-h-[62vh] bg-stone-950 flex items-center justify-center shrink-0 p-3 overflow-hidden">
                <img
                  src={selectedItem.thumbnailUrl}
                  alt={selectedItem.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[58vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/75 hover:bg-black text-white transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo & Certificate Details */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    {selectedItem.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-500">
                    Jaipur Sanctuary · Numerologist & Healer · Randhir Singh
                  </span>
                </div>

                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'hi' ? selectedItem.titleHi : selectedItem.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {lang === 'hi' ? selectedItem.descriptionHi : selectedItem.descriptionEn}
                </p>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                    {lang === 'hi' ? 'आधिकारिक प्रमाण-पत्र एवं विवरण:' : 'Official Credential & Verification Highlights:'}
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1.5">
                    {selectedItem.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
                  <span className="text-xs text-stone-500">
                    Direct Consultation: <strong>+91-9509593150</strong> · Jaipur, Rajasthan
                  </span>
                  <button
                    onClick={() => {
                      const title = selectedItem.titleEn;
                      setSelectedItem(null);
                      onOpenBooking(title);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md hover:from-amber-800 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'hi' ? 'इस विषय पर परामर्श बुक करें' : 'Book Consultation on this Topic'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
