import React, { useState } from 'react';
import { Image as ImageIcon, Video, Play, X, Eye, Sparkles, Clock, CheckCircle2, ArrowRight, Filter, ZoomIn, MessageCircle } from 'lucide-react';
import { PHOTO_GALLERY, VIDEO_SHOWCASE, PhotoItem, VideoItem } from '../data/mediaData';
import { Language } from '../types';

interface MediaGallerySectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const MediaGallerySection: React.FC<MediaGallerySectionProps> = ({
  lang,
  onOpenBooking
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'videos'>('photos');
  const [photoCategory, setPhotoCategory] = useState<string>('all');

  // Lightbox Modal state
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Video Player Modal state
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const [videoCategory, setVideoCategory] = useState<string>('all');

  const filteredPhotos = PHOTO_GALLERY.filter((p) => {
    if (photoCategory === 'all') return true;
    return p.category === photoCategory;
  });

  const filteredVideos = VIDEO_SHOWCASE.filter((v) => {
    if (videoCategory === 'all') return true;
    return v.category === videoCategory;
  });

  return (
    <section id="media-gallery" className="py-12 sm:py-16 bg-[#fcfaf5] border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Visual Glimpses &amp; Masterclasses</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            PHOTOS &amp; VIDEO SHOWCASE
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2">
            Inside the Jaipur Sanctuary · Therapy Watches · Healing Demonstrations
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'हमारे जयपुर केंद्र की पावन झलकियाँ, थेरेपी घड़ियों का प्रत्यक्ष प्रदर्शन, नमक शुद्धि विधान एवं वैदिक अंक ज्योतिष के ज्ञानवर्धक वीडियो व्याख्यान।'
              : 'Explore our Jaipur spiritual clinic, consecrated Bhojpatra yantras, custom therapy watches, and video masterclasses by Numerologist & Healer · Randhir Singh.'}
          </p>
        </div>

        {/* Media Type Switcher: Photos vs Videos */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-200/70 p-1 rounded-xl flex items-center gap-1 border border-stone-300">
            <button
              onClick={() => setActiveMediaTab('photos')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeMediaTab === 'photos'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Photo Gallery ({PHOTO_GALLERY.length})</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('videos')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeMediaTab === 'videos'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>Video Masterclasses ({VIDEO_SHOWCASE.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PHOTO GALLERY */}
        {/* ========================================================================= */}
        {activeMediaTab === 'photos' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'portraits', label: 'Master Portraits' },
                { id: 'cards', label: 'Visiting Cards (Front & Back)' },
                { id: 'convocation', label: 'Mega Convocation' },
                { id: 'awards', label: 'Awards & Accreditations' },
                { id: 'certificates', label: 'Official Certificates' },
                { id: 'watches', label: 'Therapy Watches' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setPhotoCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    photoCategory === c.id
                      ? 'bg-amber-900 text-white shadow-2xs ring-1 ring-amber-700'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-900 flex items-center justify-center">
                    <img
                      src={photo.imageUrl}
                      alt={photo.titleEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                        {photo.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-amber-800/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-sm">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>View</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sacred text-base font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                        {lang === 'hi' ? photo.titleHi : photo.titleEn}
                      </h3>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {lang === 'hi' ? photo.descriptionHi : photo.descriptionEn}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                      {photo.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: VIDEO SHOWCASE */}
        {/* ========================================================================= */}
        {activeMediaTab === 'videos' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Video Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                { id: 'all', label: 'All Videos' },
                { id: 'convocation', label: '2nd Mega Convocation & Keynotes' },
                { id: 'watch', label: 'Therapy Watches' },
                { id: 'masterclass', label: 'Vedic Numerology' },
                { id: 'salt', label: 'Salt Cleansing' },
                { id: 'crystals', label: 'Crystal Guidance' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setVideoCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    videoCategory === c.id
                      ? 'bg-amber-900 text-white shadow-2xs ring-1 ring-amber-700'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div
                    onClick={() => setSelectedVideo(video)}
                    className="relative aspect-16/9 overflow-hidden bg-stone-900 cursor-pointer group"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.titleEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                        {video.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded">
                        ⏱ {video.duration}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-300 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded">
                        👁 {video.views}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sacred text-base sm:text-lg font-bold text-stone-900 leading-snug">
                        {lang === 'hi' ? video.titleHi : video.titleEn}
                      </h3>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {lang === 'hi' ? video.descriptionHi : video.descriptionEn}
                      </p>

                      <div className="mt-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-950 block">
                          Key Insights in this Video:
                        </span>
                        <ul className="text-xs text-stone-700 space-y-1">
                          {video.keyTakeaways.map((k, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Masterclass</span>
                      </button>

                      <button
                        onClick={() => onOpenBooking(video.titleEn)}
                        className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors"
                      >
                        <span>Consult on this Topic</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL FOR FULL-SIZE PHOTO */}
        {/* ========================================================================= */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[90vh] flex flex-col">
              <div className="relative max-h-[60vh] bg-stone-950 flex items-center justify-center shrink-0 p-3 overflow-hidden">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[55vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-xl"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <div className="flex gap-1.5">
                    {selectedPhoto.tags.map((t, i) => (
                      <span key={i} className="text-[11px] text-stone-500 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-sacred text-xl font-bold text-stone-900">
                  {lang === 'hi' ? selectedPhoto.titleHi : selectedPhoto.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {lang === 'hi' ? selectedPhoto.descriptionHi : selectedPhoto.descriptionEn}
                </p>

                <div className="pt-4 mt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-stone-500">
                    Jaipur Spiritual Clinic · H.No. 45, Mahadev Nagar, Jagatpura
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      onOpenBooking(selectedPhoto.titleEn);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-sm hover:from-amber-800"
                  >
                    <MessageCircle className="w-4 h-4 text-amber-300" />
                    <span>Inquire About This Service</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIDEO PLAYER MODAL */}
        {/* ========================================================================= */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-stone-950 text-stone-100 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border-2 border-amber-400 max-h-[92vh] flex flex-col">
              <div className="p-4 bg-stone-900 flex items-center justify-between border-b border-stone-800 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    {selectedVideo.categoryLabel}
                  </span>
                  <h3 className="font-sacred text-sm sm:text-base font-bold text-white truncate max-w-md">
                    {lang === 'hi' ? selectedVideo.titleHi : selectedVideo.titleEn}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Display Screen */}
              <div className="relative aspect-16/9 bg-black flex items-center justify-center shrink-0">
                {/* Clean embedded presentation player */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <span className="text-xs font-mono text-amber-300 uppercase tracking-widest font-bold">
                      Masterclass Preview Stream
                    </span>
                    <h4 className="font-sacred text-base sm:text-xl font-bold text-white mt-1 max-w-lg">
                      {lang === 'hi' ? selectedVideo.titleHi : selectedVideo.titleEn}
                    </h4>
                    <span className="text-xs text-stone-400 mt-1">
                      Duration: {selectedVideo.duration} · High Definition 1080p
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Details & Takeaways */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {lang === 'hi' ? selectedVideo.descriptionHi : selectedVideo.descriptionEn}
                </p>

                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Core Wisdom Points:
                  </span>
                  <ul className="text-xs text-stone-300 space-y-1.5">
                    {selectedVideo.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-stone-400">
                    Presented by <strong>Randhir Singh</strong> (Jaipur, Rajasthan)
                  </span>
                  <button
                    onClick={() => {
                      setSelectedVideo(null);
                      onOpenBooking(selectedVideo.titleEn);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold py-2.5 px-5 rounded-xl text-xs shadow-md hover:from-amber-300"
                  >
                    <MessageCircle className="w-4 h-4 text-stone-900" />
                    <span>Book 1-on-1 Consultation on this Topic</span>
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
