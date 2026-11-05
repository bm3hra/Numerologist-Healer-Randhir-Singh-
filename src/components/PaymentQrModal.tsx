import React, { useState } from 'react';
import { X, Check, Copy, QrCode, ShieldCheck, Smartphone, ExternalLink, MessageCircle, Phone, Sparkles, ZoomIn } from 'lucide-react';
import { Language } from '../types';

export interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTab?: 'all' | 'paytm' | 'gpay' | 'phonepe';
}

export interface UpiChannel {
  id: 'paytm' | 'gpay' | 'phonepe';
  appName: string;
  appNameHi: string;
  upiId: string;
  qrImage: string;
  accountName: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  buttonLabel: string;
  buttonLabelHi: string;
}

export const UPI_CHANNELS: UpiChannel[] = [
  {
    id: 'phonepe',
    appName: 'PhonePe',
    appNameHi: 'फोनपे (PhonePe)',
    upiId: '9509593150-3@ybl',
    qrImage: '/assets/aistudio/phonepe_4220b648.jpeg',
    accountName: 'RANDHIR SINGH',
    accentBg: 'from-purple-950 to-indigo-950',
    accentBorder: 'border-purple-300',
    accentBadge: 'bg-purple-600 text-white',
    buttonLabel: 'Pay via PhonePe',
    buttonLabelHi: 'PhonePe से भुगतान करें'
  },
  {
    id: 'gpay',
    appName: 'Google Pay (GPay)',
    appNameHi: 'गूगल पे (GPay)',
    upiId: 'randhirjpr-6@okicici',
    qrImage: '/assets/aistudio/randhir-upi_60fbe7e9.jpg',
    accountName: 'A NUMEROLOGIST AND HEALER. RANDHIR SINGH',
    accentBg: 'from-blue-950 to-sky-950',
    accentBorder: 'border-blue-300',
    accentBadge: 'bg-blue-600 text-white',
    buttonLabel: 'Pay via Google Pay',
    buttonLabelHi: 'Google Pay से भुगतान करें'
  },
  {
    id: 'paytm',
    appName: 'Paytm UPI',
    appNameHi: 'पेटीएम (Paytm UPI)',
    upiId: 'randhir.150@ptyes',
    qrImage: '/assets/aistudio/paytm-upi_fe2f911c.jpg',
    accountName: 'RANDHIR SINGH',
    accentBg: 'from-sky-950 to-cyan-950',
    accentBorder: 'border-cyan-300',
    accentBadge: 'bg-cyan-600 text-white',
    buttonLabel: 'Pay via Paytm',
    buttonLabelHi: 'Paytm से भुगतान करें'
  }
];

export const PaymentQrModal: React.FC<PaymentQrModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTab = 'all'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'all' | 'phonepe' | 'gpay' | 'paytm'>(initialTab);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string; upiId: string } | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const displayedChannels = activeTab === 'all'
    ? UPI_CHANNELS
    : UPI_CHANNELS.filter(c => c.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-2 border-amber-300 max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-amber-400/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  {lang === 'hi' ? 'ऑफिशियल अधिकृत पेमेंट' : 'Official Verified Payment'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> {lang === 'hi' ? 'सत्यापित' : 'Verified'}
                </span>
              </div>
              <h3 className="font-sacred text-base sm:text-xl font-bold text-white mt-0.5">
                {lang === 'hi' ? 'बैंक एवं UPI पेमेंट डिटेल्स (QR कोड)' : 'Bank & UPI Payment Details (QR Codes)'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#faf8f5]">
          {/* Quick Info Banner */}
          <div className="bg-amber-900/10 border border-amber-300/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                {lang === 'hi' ? 'खाता धारक का नाम:' : 'Account Holder Name:'} <span className="text-stone-900 font-extrabold">RANDHIR SINGH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-700">{lang === 'hi' ? 'ऑफिशियल मोबाइल/UPI नंबर:' : 'Official Mobile / UPI Number:'}</span>
                <span className="font-mono font-bold text-amber-900 text-sm">+91-9509593150</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy('9509593150', 'mobile')}
                className="inline-flex items-center gap-1 bg-white hover:bg-amber-50 text-amber-900 font-bold px-3 py-1.5 rounded-lg border border-amber-300 text-xs shadow-2xs transition-colors cursor-pointer"
              >
                {copiedKey === 'mobile' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'नंबर कॉपी करें' : 'Copy Number'}</span>
                  </>
                )}
              </button>
              <a
                href="tel:+919509593150"
                className="inline-flex items-center gap-1 bg-amber-900 hover:bg-amber-950 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'कॉल' : 'Call'}</span>
              </a>
            </div>
          </div>

          {/* Channel Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200 pb-2">
            {[
              { id: 'all', label: lang === 'hi' ? 'सभी 3 QR कोड' : 'All 3 QR Codes' },
              { id: 'phonepe', label: 'PhonePe' },
              { id: 'gpay', label: 'Google Pay' },
              { id: 'paytm', label: 'Paytm UPI' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-300 hover:border-amber-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* QR Code Cards Grid */}
          <div className={`grid gap-4 ${activeTab === 'all' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-md mx-auto'}`}>
            {displayedChannels.map((channel) => (
              <div
                key={channel.id}
                className="bg-white rounded-xl border-2 border-stone-200 hover:border-amber-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${channel.accentBadge}`}>
                      {channel.appName}
                    </span>
                    <button
                      onClick={() => setZoomedImage({ src: channel.qrImage, title: channel.appName, upiId: channel.upiId })}
                      className="text-stone-400 hover:text-stone-700 p-1 rounded hover:bg-stone-100 transition-colors cursor-pointer"
                      title={lang === 'hi' ? 'बड़ा देखें' : 'Enlarge QR'}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* QR Image Box */}
                  <div
                    onClick={() => setZoomedImage({ src: channel.qrImage, title: channel.appName, upiId: channel.upiId })}
                    className="relative bg-stone-50 border border-stone-200 rounded-lg p-2 mb-3 cursor-pointer group overflow-hidden"
                  >
                    <img
                      src={channel.qrImage}
                      alt={`${channel.appName} QR Code - Randhir Singh`}
                      className="w-full h-48 sm:h-44 object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" /> {lang === 'hi' ? 'बड़ा करें' : 'Click to Zoom'}
                      </span>
                    </div>
                  </div>

                  {/* UPI ID Info */}
                  <div className="space-y-1 mb-3">
                    <span className="text-[10px] font-bold uppercase text-stone-500 block">
                      {lang === 'hi' ? 'UPI आईडी:' : 'UPI ID:'}
                    </span>
                    <div className="bg-stone-100 p-2 rounded-md border border-stone-200 font-mono text-xs font-bold text-stone-900 break-all select-all flex items-center justify-between gap-1">
                      <span>{channel.upiId}</span>
                      <button
                        onClick={() => handleCopy(channel.upiId, channel.id)}
                        className="text-stone-500 hover:text-amber-800 p-1 rounded hover:bg-white transition-colors shrink-0 cursor-pointer"
                        title={lang === 'hi' ? 'UPI आईडी कॉपी करें' : 'Copy UPI ID'}
                      >
                        {copiedKey === channel.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    {copiedKey === channel.id && (
                      <span className="text-[10px] text-emerald-600 font-semibold block text-center">
                        ✓ {lang === 'hi' ? 'UPI आईडी कॉपी हो गई!' : 'UPI ID Copied to Clipboard!'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 border-t border-stone-100">
                  <a
                    href={`upi://pay?pa=${channel.upiId}&pn=Randhir%20Singh&cu=INR`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-amber-900 text-white font-bold py-2 px-2.5 rounded-lg text-[11px] shadow-2xs transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'hi' ? channel.buttonLabelHi : channel.buttonLabel}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Step-by-Step Payment Instructions */}
          <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 text-xs text-stone-700 space-y-2">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'hi' ? 'भुगतान एवं अपॉइंटमेंट पक्का करने की सरल विधि:' : 'Easy 4-Step Verification Process:'}</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-stone-700 text-[11px] sm:text-xs leading-relaxed">
              <li>
                <strong>{lang === 'hi' ? 'भुगतान करें:' : 'Make Payment:'}</strong> {lang === 'hi' ? 'ऊपर दिए गए किसी भी QR कोड को PhonePe, GPay, Paytm या BHIM से स्कैन करें अथवा UPI ID पर फीस भेजें।' : 'Scan any QR code using PhonePe, GPay, Paytm, or BHIM app, or transfer to the UPI ID.'}
              </li>
              <li>
                <strong>{lang === 'hi' ? 'स्क्रीनशॉट लें:' : 'Save Receipt:'}</strong> {lang === 'hi' ? 'सफल भुगतान के बाद रसीद (UTR / Transaction ID सहित) का स्क्रीनशॉट ले लें।' : 'Take a screenshot of the completed payment showing the UTR / Ref number.'}
              </li>
              <li>
                <strong>{lang === 'hi' ? 'व्हाट्सएप पर भेजें:' : 'Send on WhatsApp:'}</strong> {lang === 'hi' ? 'स्क्रीनशॉट, अपना पूरा नाम और जन्मतिथि (+91-9509593150) पर भेजें।' : 'Share the screenshot with your Full Name & Date of Birth to +91-9509593150.'}
              </li>
              <li>
                <strong>{lang === 'hi' ? 'स्लॉट पक्का:' : 'Slot Confirmed:'}</strong> {lang === 'hi' ? 'रणधीर सिंह जी की टीम तुरंत आपका समय स्लॉट सुरक्षित कर कन्फर्मेशन संदेश भेज देगी।' : 'Our sanctuary desk will promptly verify and lock in your priority appointment slot.'}
              </li>
            </ol>
          </div>

          {/* Direct WhatsApp Confirmation Button */}
          <a
            href="https://wa.me/919509593150?text=Namaste%20Randhir%20Ji%2C%20I%20have%20completed%20the%20payment%20via%20UPI.%20Here%20are%20my%20details%3A%0A-%20Name%3A%20%0A-%20Date%20of%20Birth%3A%20%0A-%20Service%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>{lang === 'hi' ? 'व्हाट्सएप पर पेमेंट स्क्रीनशॉट भेजें (+91-9509593150)' : 'Send Payment Receipt on WhatsApp (+91-9509593150)'}</span>
          </a>
        </div>
      </div>

      {/* High-Resolution Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-sm w-full text-center relative border-2 border-amber-300 shadow-2xl">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-sacred text-base font-bold text-stone-900 mb-1">
              {zoomedImage.title}
            </h4>
            <p className="text-[11px] text-stone-500 mb-3">
              {lang === 'hi' ? 'किसी भी UPI ऐप से स्कैन करें' : 'Scan with any UPI application'}
            </p>
            <div className="bg-stone-50 border-2 border-stone-200 rounded-xl p-2 mb-3">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="w-full h-64 object-contain mx-auto"
              />
            </div>
            <div className="bg-stone-100 p-2 rounded-lg font-mono text-xs font-bold text-stone-800 mb-3 select-all">
              {zoomedImage.upiId}
            </div>
            <button
              onClick={() => handleCopy(zoomedImage.upiId, 'zoomed')}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-900 hover:bg-amber-950 text-white font-bold py-2 rounded-lg text-xs cursor-pointer"
            >
              {copiedKey === 'zoomed' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'UPI आईडी कॉपी करें' : 'Copy UPI ID'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
