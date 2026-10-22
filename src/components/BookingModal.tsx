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
              {isSundayFree ? 'Special Sunday Offer' : 'Direct Booking'}
            </span>
            <h3 className="font-sacred text-lg sm:text-xl font-bold text-white mt-0.5">
              Consultation with Randhir Singh Ji
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
                <strong>Sunday Privilege:</strong> First 5 consultations are FREE on appointment!
              </span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
              Your Full Name (पूरा नाम) *
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
                WhatsApp Number *
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
                Date of Birth (जन्म तिथि) *
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
              Select Service (सेवा का चयन)
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
            >
              <option value="Sunday Free Consultation">Sunday Free Consultation (First 5 Slots)</option>
              <option value="Vedic Numerology & Lo-Shu Blueprint">Comprehensive Vedic Numerology &amp; Lo-Shu Grid</option>
              <option value="Signature Watch Analysis & Therapy Watch">Watch Analysis &amp; Therapy Watches</option>
              <option value="Negativity Removal & Salt Therapy">Negativity Removal &amp; Salt Therapy</option>
              <option value="Personalized Crystal Guidance">Crystal Therapy for Profession &amp; Growth</option>
              <option value="Lucky Mobile Number Analysis">Mobile Number Analysis &amp; Selection</option>
              <option value="Chaldean Name Correction">Name Analysis &amp; Chaldean Correction</option>
              <option value="Grid Matching (Marriage/Business)">Grid Matching (Marriage / Business Partners)</option>
              <option value="Sacred Yantras & Healing Codes">Sacred Yantras &amp; Healing Codes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                Consultation Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:ring-1 focus:ring-amber-500"
              >
                <option value="whatsapp_video">WhatsApp Video / Audio (Worldwide)</option>
                <option value="in_person_jaipur">In-Person Clinic (Jaipur, Rajasthan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                Preferred Date / Day
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
              Your Specific Question / Note (वैकल्पिक)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Career promotion delays, marriage matching, or new business launch..."
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
              <span>Confirm &amp; Send on WhatsApp (+91-9509593150)</span>
            </button>

            <a
              href="tel:+919509593150"
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-stone-800 border border-stone-300 hover:border-amber-400 font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Direct Phone Call: +91-9509593150</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
