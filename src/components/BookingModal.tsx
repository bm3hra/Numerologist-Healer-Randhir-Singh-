import React, { useState } from 'react';
import { X, MessageCircle, Phone, Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultPrice?: string;
  lang: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Vedic Numerology & Lo-Shu Consultation',
  defaultPrice,
  lang
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [service, setService] = useState(defaultService);
  const [mode, setMode] = useState<'whatsapp_video' | 'in_person_jaipur'>('whatsapp_video');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const isSundayFree = service.toLowerCase().includes('sunday') || service.toLowerCase().includes('free');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Namaste Randhir Ji, I would like to schedule an appointment on DecodeYourDestiny:
- Name: ${name || 'Seeker'}
- Date of Birth: ${dob || 'Not provided'}
- Phone/WhatsApp: ${phone || 'Not provided'}
- Selected Service: ${service}
- Mode: ${mode === 'whatsapp_video' ? 'Virtual (WhatsApp Audio/Video)' : 'In-Person (Jaipur Clinic - Jagatpura)'}
- Preferred Date: ${preferredDate || 'Earliest available'}
${notes ? `- Note: ${notes}` : ''}
Please confirm my appointment and let me know the available time slot.`;

    const encoded = encodeURIComponent(message);
    const link = document.createElement('a');
    link.href = `https://wa.me/919509593150?text=${encoded}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-2 border-amber-300 max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 p-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              {isSundayFree ? (lang === 'hi' ? 'रविवार फ्री ऑफर' : 'Special Sunday Offer') : (lang === 'hi' ? 'सीधी बुकिंग' : 'Direct Booking')}
            </span>
            <h3 className="font-sacred text-lg sm:text-xl font-bold text-white mt-0.5">
              {lang === 'hi' ? 'रणधीर सिंह जी से परामर्श' : 'Consultation with Randhir Singh Ji'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {isSundayFree && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>{lang === 'hi' ? 'रविवार सेवा:' : 'Sunday Privilege:'}</strong> {lang === 'hi' ? 'पहले 5 कंसल्टेशन बिल्कुल फ्री हैं!' : 'First 5 consultations are FREE on appointment!'}
              </span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
              {lang === 'hi' ? 'आपका पूरा नाम (Full Name) *' : 'Your Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'hi' ? 'व्हाट्सएप नंबर (WhatsApp Number) *' : 'WhatsApp Number *'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91-XXXXXXXXXX"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'hi' ? 'जन्मतिथि (Date of Birth) *' : 'Date of Birth *'}
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
              {lang === 'hi' ? 'सेवा चुनें (Select Service)' : 'Select Service'}
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
            >
              <option value="Sunday Free Consultation">{lang === 'hi' ? 'रविवार फ्री कंसल्टेशन (पहले 5 स्लॉट)' : 'Sunday Free Consultation (First 5 Slots)'}</option>
              <option value="Vedic Numerology & Lo-Shu Blueprint">{lang === 'hi' ? 'अंक ज्योतिष व जन्मतिथि ग्रिड विश्लेषण' : 'Comprehensive Vedic Numerology & Lo-Shu Grid'}</option>
              <option value="Watch Analysis & Therapeutic Watch Consultation">{lang === 'hi' ? 'हाथ की घड़ी (वॉच थेरेपी गाइडेंस)' : 'Watch Analysis & Therapy Watch Guidance'}</option>
              <option value="Negativity Removal & Salt Therapy">{lang === 'hi' ? 'सॉल्ट थेरेपी (सेंधा नमक से नेगेटिविटी दूर करें)' : 'Negativity Removal & Salt Therapy'}</option>
              <option value="Personalized Crystal Guidance">{lang === 'hi' ? 'करियर व धन के लिए क्रिस्टल थेरेपी' : 'Crystal Therapy for Profession & Growth'}</option>
              <option value="Lucky Mobile Number Analysis">{lang === 'hi' ? 'लकी मोबाइल नंबर की जांच व चयन' : 'Lucky Mobile Number Analysis & Selection'}</option>
              <option value="Chaldean Name Correction">{lang === 'hi' ? 'नाम की सही स्पेलिंग सुधार' : 'Name Analysis & Spelling Correction'}</option>
              <option value="Grid Matching (Marriage/Business)">{lang === 'hi' ? 'शादी व बिजनेस पार्टनर ग्रिड मिलान' : 'Grid Matching (Marriage / Business Partners)'}</option>
              <option value="Divine Yantras & Healing Codes">{lang === 'hi' ? 'सिद्ध यंत्र व हीलिंग कोड' : 'Divine Yantras & Healing Codes'}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'hi' ? 'बातचीत का माध्यम (Mode)' : 'Consultation Mode'}
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
              >
                <option value="whatsapp_video">{lang === 'hi' ? 'व्हाट्सएप वीडियो / ऑडियो कॉल' : 'WhatsApp Video / Audio (Worldwide)'}</option>
                <option value="in_person_jaipur">{lang === 'hi' ? 'जयपुर क्लिनिक में मिलकर (जगतपुरा)' : 'In-Person Clinic (Jaipur, Rajasthan)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'hi' ? 'पसंदीदा दिन या तारीख' : 'Preferred Date / Day'}
              </label>
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="e.g. Next Sunday morning"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
              {lang === 'hi' ? 'आपका मुख्य सवाल या समस्या (वैकल्पिक)' : 'Your Specific Question / Note (Optional)'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === 'hi' ? 'उदा. करियर में तरक्की, शादी की बात, या नया काम शुरू करना...' : 'e.g. Career promotion, marriage matching, or new business launch...'}
              className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <div className="flex items-center justify-between font-bold text-stone-800">
              <span>UPI / Direct Phone:</span>
              <span className="font-mono text-amber-800">+91-9509593150</span>
            </div>
            <p>Jaipur Clinic: H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, PIN-302017</p>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर भेजें (+91-9509593150)' : 'Confirm & Send on WhatsApp (+91-9509593150)'}</span>
            </button>

            <a
              href="tel:+919509593150"
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-stone-800 border border-stone-300 hover:border-amber-400 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'सीधा फोन कॉल करें: +91-9509593150' : 'Direct Phone Call: +91-9509593150'}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
