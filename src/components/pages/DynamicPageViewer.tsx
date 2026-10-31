import React, { useState, useEffect } from 'react';
import { CMSPage, PageBlock, Language } from '../../types';
import { getPageBySlug } from '../../lib/cmsService';
import {
  ArrowLeft,
  Calendar,
  Share2,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Video,
  ChevronRight,
  Clock,
  Eye
} from 'lucide-react';

interface DynamicPageViewerProps {
  slug: string;
  lang: Language;
  onNavigateHome: () => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const DynamicPageViewer: React.FC<DynamicPageViewerProps> = ({
  slug,
  lang,
  onNavigateHome,
  onOpenBooking
}) => {
  const [page, setPage] = useState<CMSPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      setError(null);
      try {
        const found = await getPageBySlug(slug);
        if (!found) {
          setError('Page not found or is currently an unpublished draft.');
        } else {
          setPage(found);
          // Set browser document title and SEO meta
          if (found.seoTitle) {
            document.title = `${found.seoTitle} | Randhir Singh Jaipur`;
          } else {
            document.title = `${found.title} | Numerologist & Healer Randhir Singh`;
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load page content.');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: page?.title || document.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const isHindi = lang === 'hi' || lang === 'hindi';

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-[#fdfbf7]">
        <div className="w-12 h-12 border-3 border-amber-600/20 border-t-amber-600 rounded-full animate-spin mb-4" />
        <p className="text-stone-600 text-sm font-serif">
          {isHindi ? 'पेज लोड हो रहा है...' : 'Loading divine page content...'}
        </p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-[#fdfbf7] text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
          {isHindi ? 'पेज नहीं मिला' : 'Page Not Found'}
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
          {error || (isHindi ? 'यह पेज मौजूद नहीं है या अभी ड्राफ्ट में है।' : 'The requested page does not exist or has not been published yet.')}
        </p>
        <button
          onClick={onNavigateHome}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
        >
          {isHindi ? 'मुख्य पृष्ठ पर वापस जाएँ' : 'Return to Home'}
        </button>
      </div>
    );
  }

  const displayTitle = isHindi && page.titleHi ? page.titleHi : page.title;

  const rawBlocks = page.blocks;
  let blocksList: PageBlock[] = [];
  if (Array.isArray(rawBlocks)) {
    blocksList = rawBlocks;
  } else if (typeof rawBlocks === 'string') {
    try {
      blocksList = JSON.parse(rawBlocks);
    } catch {
      blocksList = [];
    }
  }

  return (
    <article className="min-h-screen bg-[#fdfbf7] text-stone-900 pb-20">
      {/* Breadcrumbs Header */}
      <div className="bg-amber-50/80 border-b border-amber-200/50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <button
              onClick={onNavigateHome}
              className="hover:text-amber-800 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isHindi ? 'होम' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">{isHindi ? 'विशेष लेख व मार्गदर्शन' : 'Articles & Guidance'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-amber-900 truncate max-w-[200px] sm:max-w-xs">
              {displayTitle}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200/70 text-xs text-stone-700 hover:text-amber-800 hover:border-amber-300 transition shadow-2xs cursor-pointer"
          >
            {copiedShare ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">{isHindi ? 'लिंक कॉपी हुआ' : 'Link Copied'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-700" />
                <span>{isHindi ? 'शेयर करें' : 'Share'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Blocks Rendering Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {blocksList && blocksList.length > 0 ? (
          blocksList.map((block) => (
            <div key={block.id} className="transition-all">
              {/* HERO BLOCK */}
              {block.type === 'hero' && (
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-stone-100 p-8 sm:p-14 shadow-2xl">
                  {block.imageUrl && (
                    <div
                      className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
                      style={{ backgroundImage: `url(${block.imageUrl})` }}
                    />
                  )}
                  <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Divine Vedic Guidance
                    </span>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-amber-200 tracking-tight leading-tight">
                      {block.title}
                    </h1>
                    {block.subtitle && (
                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                        {block.subtitle}
                      </p>
                    )}
                    {block.buttonText && (
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            if (block.buttonLink?.startsWith('#')) {
                              const el = document.getElementById(block.buttonLink.replace('#', ''));
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            } else if (block.buttonLink?.startsWith('http')) {
                              window.open(block.buttonLink, '_blank');
                            } else {
                              onOpenBooking(page.title);
                            }
                          }}
                          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 transition cursor-pointer"
                        >
                          {block.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* HEADING BLOCK */}
              {block.type === 'heading' && (
                <div className="text-center pt-4 pb-2 max-w-2xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p className="text-amber-800 text-sm sm:text-base mt-2 font-medium">
                      {block.subtitle}
                    </p>
                  )}
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
                </div>
              )}

              {/* RICH TEXT PARAGRAPH BLOCK */}
              {block.type === 'text' && (
                <div className="bg-white/70 border border-amber-900/10 rounded-2xl p-6 sm:p-8 shadow-xs">
                  <div className="prose prose-stone max-w-none text-stone-800 text-base leading-relaxed whitespace-pre-line font-sans space-y-4">
                    {block.content}
                  </div>
                </div>
              )}

              {/* SINGLE IMAGE BLOCK */}
              {block.type === 'image' && (
                <div className="text-center space-y-2">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-amber-900/10 bg-white">
                    <img
                      src={block.imageUrl}
                      alt={block.imageAlt || page.title}
                      className="w-full max-h-[550px] object-cover mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Certificate Celebration Ceremony.png';
                      }}
                    />
                  </div>
                  {block.title && (
                    <p className="text-xs text-stone-600 italic font-serif">
                      {block.title}
                    </p>
                  )}
                </div>
              )}

              {/* MULTI-IMAGE GALLERY BLOCK */}
              {block.type === 'gallery' && (
                <div className="space-y-4">
                  {block.title && (
                    <h3 className="font-serif font-bold text-xl text-stone-900 text-center">
                      {block.title}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(block.images || []).map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden shadow border border-amber-900/10 bg-white group"
                      >
                        <img
                          src={img.url}
                          alt={img.alt || `Gallery Image ${i + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {img.caption && (
                          <div className="p-2.5 text-xs text-stone-600 bg-stone-50 border-t border-stone-100">
                            {img.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIDEO PLAYER / EMBED BLOCK */}
              {block.type === 'video' && (
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-amber-900/10 bg-stone-950 aspect-video flex items-center justify-center">
                    {block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
                      <iframe
                        src={block.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title="Video Guide"
                      />
                    ) : block.videoUrl?.endsWith('.mp4') || block.videoUrl?.startsWith('/uploads/') ? (
                      <video
                        src={block.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8 text-stone-400">
                        <Video className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold">{block.videoCaption || 'Vedic Video Guide'}</p>
                      </div>
                    )}
                  </div>
                  {block.videoCaption && (
                    <p className="text-xs text-stone-600 text-center font-medium">
                      {block.videoCaption}
                    </p>
                  )}
                </div>
              )}

              {/* LIST / HIGHLIGHTS BLOCK */}
              {block.type === 'list' && (
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                  {block.title && (
                    <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      {block.title}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(block.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/90 p-4 rounded-xl border border-amber-200/60 shadow-2xs flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-amber-600 text-stone-950 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                          <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CALL TO ACTION BUTTON BLOCK */}
              {block.type === 'button' && (
                <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-stone-100 text-center space-y-4 shadow-xl border border-stone-800">
                  {block.title && (
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-amber-200">
                      {block.title}
                    </h3>
                  )}
                  <div>
                    <a
                      href={block.buttonLink || 'https://wa.me/919414071000'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5 ${
                        block.buttonStyle === 'whatsapp'
                          ? 'bg-[#25D366] hover:bg-[#20bd5a] text-stone-950'
                          : block.buttonStyle === 'call'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950'
                      }`}
                    >
                      {block.buttonStyle === 'whatsapp' ? (
                        <MessageCircle className="w-4 h-4" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                      <span>{block.buttonText || 'Connect Directly with Randhir Singh'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* SACRED QUOTE / MANTRA BLOCK */}
              {block.type === 'quote' && (
                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-100/70 via-amber-50 to-amber-100/50 border-l-6 border-amber-600 shadow-sm text-center max-w-2xl mx-auto space-y-2">
                  {block.title && (
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-widest pb-1 font-serif">
                      {block.title}
                    </p>
                  )}
                  <p className="font-serif italic text-stone-800 text-lg sm:text-xl leading-relaxed">
                    "{block.content}"
                  </p>
                </div>
              )}

              {/* CONSULTATION BOOKING CARD BLOCK */}
              {block.type === 'booking-card' && (
                <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-stone-100 shadow-2xl border border-amber-500/40 text-center space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> {isHindi ? 'व्यक्तिगत वैदिक परामर्श सत्र' : 'Personal Vedic Consultation Session'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                    {block.title || 'Personalized Vedic Consultation'}
                  </h3>
                  {block.subtitle && (
                    <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                      {block.subtitle}
                    </p>
                  )}
                  <div className="py-2">
                    <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                      {block.price || '₹5,100'}
                    </div>
                    {block.duration && (
                      <p className="text-xs text-stone-400 mt-1 font-medium flex items-center justify-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{block.duration}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => onOpenBooking(block.title || page.title)}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/60 transition cursor-pointer"
                    >
                      {block.buttonText || (isHindi ? 'अभी स्लॉट बुक करें' : 'Book Consultation Slot')}
                    </button>
                  </div>
                </div>
              )}

              {/* VEDIC DIVIDER BLOCK */}
              {block.type === 'divider' && (
                <div className="text-center py-4 flex items-center justify-center gap-4 max-w-2xl mx-auto">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-amber-600/80 flex-1" />
                  <span className="font-sacred text-amber-800 text-xl font-bold px-2 select-none">
                    {block.title || '॥ ॐ ॥'}
                  </span>
                  <div className="h-px bg-gradient-to-l from-transparent via-amber-400/60 to-amber-600/80 flex-1" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-stone-500">
            {isHindi ? 'इस पेज पर अभी कोई सामग्री नहीं है।' : 'No content blocks published on this page yet.'}
          </div>
        )}

        {/* Global Bottom Consultation Card */}
        <div className="pt-8 border-t border-amber-900/10">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif font-bold text-xl text-amber-200">
                {isHindi ? 'व्यक्तिगत परामर्श के लिए संपर्क करें' : 'Personalized Consultation with Randhir Singh'}
              </h3>
              <p className="text-xs text-stone-300">
                {isHindi
                  ? 'अंक ज्योतिष, कलाई घड़ी विश्लेषण व हीलिंग परामर्श · जयपुर, राजस्थान'
                  : 'Vedic Numerology, Watch Therapy & Energy Remedies · Jaipur, Rajasthan'}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenBooking(page.title)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition cursor-pointer"
              >
                {isHindi ? 'परामर्श बुक करें' : 'Book Session'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
