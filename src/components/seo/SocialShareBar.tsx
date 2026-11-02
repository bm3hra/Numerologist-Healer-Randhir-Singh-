import React, { useState } from 'react';
import { Share2, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface SocialShareBarProps {
  title?: string;
  description?: string;
  url?: string;
  lang?: string;
  className?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title = 'Numerologist & Healer · Randhir Singh Ji Jaipur',
  description = 'Decode your Date of Birth, Lo-Shu Grid, and Watch Therapy with Randhir Singh Ji.',
  url,
  lang = 'en',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  // Determine current absolute canonical URL
  const currentUrl =
    url ||
    (typeof window !== 'undefined'
      ? window.location.href.split('?')[0]
      : 'https://decodeyourdestiny.in');

  const shareText = encodeURIComponent(`${title}\n${description}\n\n`);
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const input = document.createElement('input');
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title,
          text: description,
          url: currentUrl
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-stone-900/90 via-amber-950/40 to-stone-900/90 border border-amber-500/25 shadow-lg backdrop-blur-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Share2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-200">
              {lang === 'hi' ? 'मित्रों व परिजनों के साथ साझा करें' : 'Share with Family & Friends'}
            </h4>
            <p className="text-[11px] text-stone-400">
              {lang === 'hi'
                ? 'वैदिक ज्ञान एवं जन्मतिथि डिकोडर दूसरों तक पहुँचाएँ'
                : 'Spread Vedic wisdom and numerical clarity with one tap'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* WhatsApp Direct Share */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/90 hover:bg-[#1877F2] text-white text-xs font-semibold shadow-xs transition-colors"
            title="Share on Facebook"
          >
            <span className="font-bold">f</span>
            <span>Facebook</span>
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}&hashtags=Numerology,VedicAstrology,RandhirSingh`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 shadow-xs transition-colors"
            title="Share on X"
          >
            <span className="font-bold text-[11px]">𝕏</span>
            <span>Post</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A66C2]/90 hover:bg-[#0A66C2] text-white text-xs font-semibold shadow-xs transition-colors"
            title="Share on LinkedIn"
          >
            <span className="font-bold text-[11px]">in</span>
            <span>LinkedIn</span>
          </a>

          {/* Native Web Share / Copy Link */}
          <button
            type="button"
            onClick={handleNativeShare}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-amber-500/30'
            }`}
            title="Copy URL or Native Share"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'लिंक कॉपी' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
