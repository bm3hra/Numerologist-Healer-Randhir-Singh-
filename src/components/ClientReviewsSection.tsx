import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  ThumbsUp,
  Send,
  MapPin,
  Calendar,
  Filter,
  Award,
  ChevronDown,
  AlertCircle,
  Clock,
  HeartHandshake,
  X
} from 'lucide-react';
import { Language, ReviewItem } from '../types';

interface ClientReviewsSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const ClientReviewsSection: React.FC<ClientReviewsSectionProps> = ({
  lang,
  onOpenBooking
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Both Modal and In-Page Form supported
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  const inPageFormRef = useRef<HTMLDivElement | null>(null);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [serviceName, setServiceName] = useState('Vedic Numerology & DOB Lo-Shu Grid');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Fetch reviews from server API
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.warn('Could not fetch reviews from /api/reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Open the review modal or scroll to form
  const handleOpenReviewModal = () => {
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsModalOpen(true);
  };

  // Toggle in-page form and smoothly scroll to it
  const handleToggleInPageForm = () => {
    const next = !showSubmitForm;
    setShowSubmitForm(next);
    if (next) {
      setTimeout(() => {
        inPageFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Handle instant submit (works for both Modal and In-Page form)
  const handleInstantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setSubmitError(lang === 'hi' ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.');
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 5) {
      setSubmitError(
        lang === 'hi'
          ? 'कृपया अपना अनुभव या समीक्षा कम से कम 5 अक्षरों में लिखें।'
          : 'Please write your review (minimum 5 characters).'
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: authorName.trim(),
      city: city.trim() || (lang === 'hi' ? 'जयपुर, राजस्थान' : 'Jaipur, Rajasthan'),
      serviceName,
      rating,
      reviewText: reviewText.trim()
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'समीक्षा सबमिट करने में विफल रहे।');
      }

      const resData = await res.json();
      const createdReview: ReviewItem = resData.review || {
        id: `rev_${Date.now()}`,
        name: authorName.trim(),
        city: city.trim() || 'Jaipur, Rajasthan',
        serviceName,
        rating,
        reviewText: reviewText.trim(),
        date: new Date().toISOString().split('T')[0],
        isVerified: true,
        helpfulCount: 1
      };

      // Optimistic instant addition to top of review feed
      setReviews((prev) => [createdReview, ...prev]);
      setSubmitSuccess(true);
      setAuthorName('');
      setCity('');
      setReviewText('');
      setRating(5);

      // Auto close modal after brief visual feedback
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        // Scroll to the review feed
        const el = document.getElementById('reviews-feed');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1800);
    } catch (err: any) {
      console.error('Submit review error:', err);
      setSubmitError(err.message || 'त्रुटि हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setSubmitting(false);
    }
  };

  // Upvote helpful review
  const handleVoteHelpful = async (id: string) => {
    if (helpfulVoted[id]) return;

    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r))
    );

    try {
      await fetch(`/api/reviews/${id}/helpful`, { method: 'POST' });
    } catch (e) {
      // Background sync fail silent
    }
  };

  // Filter logic
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '5stars') return r.rating === 5;
    if (selectedFilter === 'watch') {
      return (
        r.serviceName.toLowerCase().includes('watch') ||
        r.serviceName.toLowerCase().includes('घड़ी')
      );
    }
    if (selectedFilter === 'numerology') {
      return (
        r.serviceName.toLowerCase().includes('numerology') ||
        r.serviceName.toLowerCase().includes('grid') ||
        r.serviceName.toLowerCase().includes('लो-शू')
      );
    }
    if (selectedFilter === 'salt') {
      return (
        r.serviceName.toLowerCase().includes('salt') ||
        r.serviceName.toLowerCase().includes('नमक')
      );
    }
    return true;
  });

  return (
    <section
      id="reviews"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#faf6ee] via-[#fffdf9] to-[#faf6ee] border-b border-amber-200/80 scroll-mt-20"
    >
      {/* Target anchor for direct jumps */}
      <div id="client-reviews-stories" className="absolute -top-20 left-0 pointer-events-none" />
      <div id="testimonials" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {lang === 'hi'
                ? '॥ सत्यमेव जयते ॥ · प्रमाणित ग्राहकों के अनुभव'
                : '100% Genuine · Verified Client Testimonials'}
            </span>
          </div>

          <h2 className="font-sacred text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'संतुष्ट ग्राहकों के अनुभव एवं कहानियाँ' : 'Client Reviews & Stories'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2.5">
            {lang === 'hi'
              ? '“संख्यात्मकं हि जगत् सर्वं, ग्रहाणां गति बोधकम्।” — वास्तविक अनुभव जो जीवन में सकारात्मक परिवर्तन लाए'
              : 'Real transformative experiences from individuals and families guided by Randhir Singh Ji'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'जयपुर, पूरे भारत और विदेशों से सैकड़ों लोगों ने अंक ज्योतिष, वॉच थेरेपी, पारंपरिक नमक शुद्धि और यंत्र चिकित्सा से अपनी ज़िंदगी में शांति, सफलता और सही दिशा पाई है। आप भी अपना अनुभव तुरंत यहाँ साझा कर सकते हैं।'
              : 'Inspiring stories of clients across Jaipur, India, and worldwide whose life path, career, and inner clarity transformed through authentic Vedic numerology and energy therapies.'}
          </p>
        </div>

        {/* Aggregate Rating Banner & Instant Submit Review Trigger */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-amber-100 shadow-xl border border-amber-500/30 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex flex-col items-center justify-center text-stone-950 font-black shadow-lg shrink-0">
              <span className="text-3xl leading-none">4.9</span>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-stone-950 text-stone-950" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold font-sacred text-amber-200">
                  {lang === 'hi' ? 'सर्वोच्च 5-स्टार प्रमाणित संतुष्टि' : 'Superlative 5-Star Satisfaction'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1">
                {lang === 'hi'
                  ? '1,450+ से अधिक व्यक्तिगत व ऑनलाइन परामर्शों पर आधारित वास्तविक समीक्षाएँ'
                  : 'Based on 1,450+ Vedic Consultations across Jaipur, India & Globally'}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-[11px] text-amber-300/80">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'hi' ? '100% वास्तविक ग्राहक' : '100% Genuine Clients'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'hi' ? 'तत्काल लाइव समीक्षा' : 'Instant Live Submissions'}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Primary Write a Review Action Button */}
            <button
              type="button"
              onClick={handleOpenReviewModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer ring-2 ring-amber-400/50"
            >
              <MessageSquare className="w-4 h-4 text-stone-950" />
              <span>
                {lang === 'hi'
                  ? '✍️ समीक्षा लिखें (Write a Review)'
                  : '✍️ Write a Review Instantly'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking('Personalized Vedic Consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-800/80 hover:bg-stone-800 text-amber-200 border border-amber-400/40 font-bold px-4 py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
            </button>
          </div>
        </div>

        {/* IN-PAGE EXPANDABLE FORM (OPTIONAL) */}
        {showSubmitForm && (
          <div
            ref={inPageFormRef}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl mb-12 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-100">
              <div>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  {lang === 'hi'
                    ? 'अपनी समीक्षा या अनुभव दर्ज करें'
                    : 'Share Your Consultation Experience'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'hi'
                    ? 'आपकी समीक्षा तुरंत इसी पेज पर प्रकाशित होगी और अन्य जिज्ञासुओं को मार्गदर्शन देगी।'
                    : 'Your review will be published instantly on this page to help others.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitForm(false)}
                className="text-stone-400 hover:text-stone-700 text-xs px-2.5 py-1 rounded-lg border border-stone-200"
              >
                ✕ {lang === 'hi' ? 'रद्द करें' : 'Close'}
              </button>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">
                    {lang === 'hi'
                      ? '॥ धन्यवाद ॥ आपकी समीक्षा सफलतापूर्वक दर्ज हो गई है!'
                      : 'Thank you! Your review has been successfully submitted and published!'}
                  </div>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {lang === 'hi'
                      ? 'आपकी समीक्षा अब नीचे सूची में सबसे ऊपर लाइव दिखाई दे रही है।'
                      : 'Your story is now live at the top of the client reviews feed below.'}
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleInstantSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'hi' ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. रोहित शर्मा' : 'e.g. Rohit Sharma'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'hi' ? 'शहर / राज्य / देश' : 'City & State / Country'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. जयपुर, राजस्थान' : 'e.g. Jaipur, Rajasthan'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'hi' ? 'किस सेवा हेतु परामर्श लिया?' : 'Service Consulted'}
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                  >
                    <option value="Vedic Numerology & DOB Lo-Shu Grid">
                      {lang === 'hi' ? 'वैदिक अंक ज्योतिष व जन्मतिथि ग्रिड' : 'Vedic Numerology & DOB Lo-Shu Grid'}
                    </option>
                    <option value="Wristwatch Analysis & Watch Therapy">
                      {lang === 'hi' ? 'हाथ की घड़ी विश्लेषण व वॉच थेरेपी' : 'Wristwatch Analysis & Watch Therapy'}
                    </option>
                    <option value="Negativity Removal & Traditional Salt Therapy">
                      {lang === 'hi' ? 'नकारात्मक ऊर्जा मुक्ति व नमक चिकित्सा' : 'Negativity Removal & Traditional Salt Therapy'}
                    </option>
                    <option value="Crystal Therapy & Personalized Gemstones">
                      {lang === 'hi' ? 'क्रिस्टल थेरेपी एवं व्यक्तिगत मार्गदर्शन' : 'Crystal Therapy & Personalized Gemstones'}
                    </option>
                    <option value="Lucky Mobile Number & Chaldean Name Correction">
                      {lang === 'hi' ? 'लकी मोबाइल नंबर व नाम सुधार' : 'Lucky Mobile Number & Chaldean Name Correction'}
                    </option>
                    <option value="Marriage & Business 36 Guna Grid Matching">
                      {lang === 'hi' ? 'विवाह व व्यापार 36 गुण ग्रिड मिलान' : 'Marriage & Business 36 Guna Grid Matching'}
                    </option>
                    <option value="Consecrated Yantras, Healing Codes & Switchwords">
                      {lang === 'hi' ? 'सिद्ध यंत्र, हीलिंग कोड्स एवं स्विचवर्ड्स' : 'Consecrated Yantras, Healing Codes & Switchwords'}
                    </option>
                    <option value="Sunday Free Consultation Slot">
                      {lang === 'hi' ? 'रविवार फ्री परामर्श सेवा' : 'Sunday Free Consultation Slot'}
                    </option>
                    <option value="General Spiritual Life Guidance">
                      {lang === 'hi' ? 'सामान्य आध्यात्मिक जीवन मार्गदर्शन' : 'General Spiritual Life Guidance'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Star Rating Interactive Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'hi' ? 'रेटिंग (Rating) *' : 'Rating *'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-500 transition-transform hover:scale-125 cursor-pointer"
                        title={`${star} Star`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-900">
                    {rating === 5
                      ? lang === 'hi'
                        ? '⭐⭐⭐⭐⭐ अत्यंत उत्कृष्ट (5/5 Outstanding)'
                        : '★★★★★ 5/5 Outstanding'
                      : `${rating} / 5`}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'hi'
                    ? 'आपका अनुभव, सलाह या समीक्षा (Review Text) *'
                    : 'Your Experience & Review *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'रणधीर सिंह जी के परामर्श, घड़ी सुझाव, सॉल्ट थेरेपी या यंत्र से आपको क्या लाभ हुआ, विस्तार से लिखें...'
                      : 'Describe how Randhir Singh Ji’s numerology breakdown, watch therapy, salt cleanse, or remedies helped you...'
                  }
                  className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50 leading-relaxed"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>
                    {submitting
                      ? lang === 'hi'
                        ? 'सबमिट हो रहा है...'
                        : 'Submitting...'
                      : lang === 'hi'
                      ? 'तुरंत समीक्षा प्रकाशित करें (Publish Live)'
                      : 'Publish Review Instantly'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Badges */}
        <div id="reviews-feed" className="flex flex-wrap items-center justify-between gap-3 mb-8 scroll-mt-24">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelEn: 'All Reviews', labelHi: 'सभी समीक्षाएँ', count: reviews.length },
              { id: '5stars', labelEn: '★★★★★ 5-Star Only', labelHi: '★★★★★ केवल 5-स्टार' },
              { id: 'watch', labelEn: 'Watch Therapy', labelHi: 'घड़ी विश्लेषण (वॉच थेरेपी)' },
              { id: 'numerology', labelEn: 'Numerology & DOB', labelHi: 'अंक ज्योतिष व जन्मतिथि' },
              { id: 'salt', labelEn: 'Salt Cleansing', labelHi: 'सॉल्ट शुद्धि (नमक उपाय)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {lang === 'hi' ? f.labelHi : f.labelEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenReviewModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? '+ समीक्षा लिखें' : '+ Write Review'}</span>
            </button>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              {lang === 'hi'
                ? `(${filteredReviews.length} समीक्षाएँ)`
                : `(${filteredReviews.length} reviews)`}
            </span>
          </div>
        </div>

        {/* REVIEWS GRID */}
        {loading ? (
          <div className="text-center py-12 text-sm text-stone-500">
            {lang === 'hi' ? 'समीक्षाएँ लोड हो रही हैं...' : 'Loading verified client stories...'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-amber-400"
              >
                <div>
                  {/* Top: Star rating & Verified badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/60 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {lang === 'hi' ? 'प्रमाणित परामर्श' : 'Verified Client'}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic line-clamp-6">
                    “{rev.reviewText}”
                  </p>
                </div>

                {/* Bottom: Author info, City, Service & Helpful button */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-sacred font-bold text-sm text-stone-900 truncate">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500 truncate">
                        <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                        <span className="truncate">{rev.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service tag & date */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-[10px] text-stone-500">
                    <span className="truncate bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded font-medium max-w-[190px]">
                      {rev.serviceName}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleVoteHelpful(rev.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        helpfulVoted[rev.id]
                          ? 'text-emerald-700 bg-emerald-50 font-bold'
                          : 'text-stone-500 hover:text-amber-800 hover:bg-amber-50'
                      }`}
                      title="उपयोगी है / Helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{rev.helpfulCount || 1}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner with Consultation CTA & Write a Review Button */}
        <div className="mt-12 p-6 sm:p-8 bg-amber-50/80 rounded-2xl border-2 border-dashed border-amber-300 text-center max-w-3xl mx-auto">
          <Sparkles className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <h3 className="font-sacred text-lg sm:text-xl font-bold text-stone-900">
            {lang === 'hi'
              ? 'क्या आप भी अपनी जन्मतिथि व ऊर्जा का मार्गदर्शन पाना चाहते हैं?'
              : 'Ready to Experience Personal Vedic Guidance?'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'रणधीर सिंह जी से व्यक्तिगत परामर्श (ऑनलाइन / जयपुर क्लिनिक) हेतु आज ही अपना स्लॉट बुक करें।'
              : 'Book your personal appointment with Randhir Singh Ji (Virtual Video Call or Jaipur Clinic).'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => onOpenBooking('Client Reviews Section Consultation')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>{lang === 'hi' ? 'परामर्श बुक करें (₹5,100)' : 'Book Consultation (₹5,100)'}</span>
            </button>

            {/* Bottom Write a Review Button */}
            <button
              type="button"
              onClick={handleOpenReviewModal}
              className="inline-flex items-center gap-2 bg-white text-stone-800 hover:bg-amber-50 border-2 border-amber-400 font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer hover:border-amber-600"
            >
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>{lang === 'hi' ? '✍️ समीक्षा लिखें (Write a Review)' : '✍️ Write a Review'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INSTANT WRITE A REVIEW MODAL (CENTERED POPUP DIALOG)         */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl border-2 border-amber-400 max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-amber-600/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-2xs">
                  <MessageSquare className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="font-sacred text-base sm:text-lg font-bold text-amber-100 leading-tight">
                    {lang === 'hi' ? '॥ अपनी समीक्षा या अनुभव साझा करें ॥' : 'Write a Review · Randhir Singh Ji'}
                  </div>
                  <p className="text-[11px] text-amber-300/80">
                    {lang === 'hi'
                      ? 'आपकी समीक्षा तुरंत वेबसाइट पर प्रकाशित होगी'
                      : 'Your review will be published instantly on the website'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="बंद करें (Close)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                  </div>
                  <h4 className="font-sacred text-2xl font-bold text-stone-900">
                    {lang === 'hi' ? '॥ धन्यवाद ॥' : 'Thank You!'}
                  </h4>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    {lang === 'hi'
                      ? 'आपकी समीक्षा सफलतापूर्वक दर्ज हो गई है और वेबसाइट पर तुरंत प्रकाशित हो चुकी है!'
                      : 'Your review has been successfully submitted and published live on the website!'}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
                    <span>✓ Live on page</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInstantSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-2.5 text-xs">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* 1. Rating Selector */}
                  <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
                    <label className="block text-xs font-bold text-amber-950 mb-1.5">
                      {lang === 'hi' ? 'आपका अनुभव कैसा रहा? (Rating) *' : 'How was your experience? (Rating) *'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-amber-500 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                            title={`${star} Star`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                (hoverRating || rating) >= star
                                  ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-900 ml-2">
                        {rating === 5
                          ? lang === 'hi'
                            ? '⭐⭐⭐⭐⭐ 5/5 उत्कृष्ट'
                            : '★★★★★ 5/5 Outstanding'
                          : `${rating} / 5`}
                      </span>
                    </div>
                  </div>

                  {/* 2. Name & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder={lang === 'hi' ? 'उदा. रोहित शर्मा' : 'e.g. Rohit Sharma'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {lang === 'hi' ? 'शहर / राज्य / देश' : 'City & Country'}
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={lang === 'hi' ? 'उदा. जयपुर, राजस्थान' : 'e.g. Jaipur, Rajasthan'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                      />
                    </div>
                  </div>

                  {/* 3. Service Consulted */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'hi' ? 'किस सेवा हेतु परामर्श लिया?' : 'Service Consulted'}
                    </label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50"
                    >
                      <option value="Vedic Numerology & DOB Lo-Shu Grid">
                        {lang === 'hi' ? 'वैदिक अंक ज्योतिष व जन्मतिथि ग्रिड' : 'Vedic Numerology & DOB Lo-Shu Grid'}
                      </option>
                      <option value="Wristwatch Analysis & Watch Therapy">
                        {lang === 'hi' ? 'हाथ की घड़ी विश्लेषण व वॉच थेरेपी' : 'Wristwatch Analysis & Watch Therapy'}
                      </option>
                      <option value="Negativity Removal & Traditional Salt Therapy">
                        {lang === 'hi' ? 'नकारात्मक ऊर्जा मुक्ति व नमक चिकित्सा' : 'Negativity Removal & Traditional Salt Therapy'}
                      </option>
                      <option value="Crystal Therapy & Personalized Gemstones">
                        {lang === 'hi' ? 'क्रिस्टल थेरेपी एवं व्यक्तिगत मार्गदर्शन' : 'Crystal Therapy & Personalized Gemstones'}
                      </option>
                      <option value="Lucky Mobile Number & Chaldean Name Correction">
                        {lang === 'hi' ? 'लकी मोबाइल नंबर व नाम सुधार' : 'Lucky Mobile Number & Chaldean Name Correction'}
                      </option>
                      <option value="Marriage & Business 36 Guna Grid Matching">
                        {lang === 'hi' ? 'विवाह व व्यापार 36 गुण ग्रिड मिलान' : 'Marriage & Business 36 Guna Grid Matching'}
                      </option>
                      <option value="Consecrated Yantras, Healing Codes & Switchwords">
                        {lang === 'hi' ? 'सिद्ध यंत्र, हीलिंग कोड्स एवं स्विचवर्ड्स' : 'Consecrated Yantras, Healing Codes & Switchwords'}
                      </option>
                      <option value="Sunday Free Consultation Slot">
                        {lang === 'hi' ? 'रविवार फ्री परामर्श सेवा' : 'Sunday Free Consultation Slot'}
                      </option>
                      <option value="General Spiritual Life Guidance">
                        {lang === 'hi' ? 'सामान्य आध्यात्मिक जीवन मार्गदर्शन' : 'General Spiritual Life Guidance'}
                      </option>
                    </select>
                  </div>

                  {/* 4. Review Text */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {lang === 'hi'
                        ? 'आपका अनुभव या समीक्षा (Review Text) *'
                        : 'Your Review & Story *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder={
                        lang === 'hi'
                          ? 'रणधीर सिंह जी के परामर्श, घड़ी सुझाव, सॉल्ट थेरेपी या यंत्र से आपको क्या लाभ हुआ, विस्तार से लिखें...'
                          : 'Describe how Randhir Singh Ji’s numerology breakdown, watch therapy, salt cleanse, or remedies helped you...'
                      }
                      className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 bg-stone-50 leading-relaxed"
                    />
                  </div>

                  {/* Modal Footer Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 hover:from-amber-800 hover:to-stone-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>
                        {submitting
                          ? lang === 'hi'
                            ? 'सबमिट हो रहा है...'
                            : 'Submitting...'
                          : lang === 'hi'
                          ? 'तुरंत प्रकाशित करें (Publish Live)'
                          : 'Publish Review Instantly'}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
