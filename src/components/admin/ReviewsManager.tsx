import React, { useState, useEffect } from 'react';
import { ReviewItem } from '../../types';
import {
  getAdminReviews,
  updateReviewStatus,
  updateAdminReview,
  createAdminReview,
  deleteAdminReview
} from '../../lib/cmsService';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  MapPin,
  Calendar,
  ThumbsUp,
  Trash2,
  Edit,
  Plus,
  Search,
  RefreshCw,
  ArrowLeft,
  Send,
  Sparkles,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface ReviewsManagerProps {
  onBack: () => void;
  onReviewsUpdated?: () => void;
}

const SERVICE_OPTIONS = [
  'Vedic Numerology & DOB Lo-Shu Grid',
  'Wristwatch Analysis & Watch Therapy',
  'Negativity Removal & Traditional Salt Therapy',
  'Crystal Therapy & Personalized Gemstones',
  'Lucky Mobile Number & Chaldean Name Correction',
  'Marriage & Business 36 Guna Grid Matching',
  'Consecrated Yantras, Healing Codes & Switchwords',
  'Tarot Reading & Pranic Energy Healing',
  'Life Guidance & Chakra Alignment',
  'Sunday Free Consultation Slot',
  'General Spiritual Life Guidance'
];

export const ReviewsManager: React.FC<ReviewsManagerProps> = ({
  onBack,
  onReviewsUpdated
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [counts, setCounts] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Add new review panel state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('Jaipur, Rajasthan');
  const [newService, setNewService] = useState(SERVICE_OPTIONS[0]);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newStatus, setNewStatus] = useState<'approved' | 'pending'>('approved');
  const [creating, setCreating] = useState(false);

  // Edit existing review state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    city: '',
    serviceName: '',
    rating: 5,
    reviewText: ''
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete confirmation modal state
  const [reviewToDelete, setReviewToDelete] = useState<ReviewItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const loadReviews = async (autoSwitchPending = false) => {
    setLoading(true);
    try {
      const data = await getAdminReviews();
      setReviews(data.reviews);
      setCounts(data.counts);
      if (autoSwitchPending && data.counts.pending > 0) {
        setStatusFilter('pending');
      }
    } catch (err: any) {
      showToast('error', err.message || 'समीक्षाएं लोड करने में त्रुटि।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(true);
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setActionLoadingId(id);
    try {
      const res = await updateReviewStatus(id, status);
      showToast('success', res.message);
      await loadReviews(false);
      onReviewsUpdated?.();
    } catch (err: any) {
      showToast('error', err.message || 'स्थिति अपडेट करने में त्रुटि।');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim().length < 2) {
      showToast('error', 'कृपया कम से कम 2 अक्षरों का नाम दर्ज करें।');
      return;
    }
    if (newText.trim().length < 5) {
      showToast('error', 'कृपया कम से कम 5 अक्षरों की समीक्षा लिखें।');
      return;
    }

    setCreating(true);
    try {
      const res = await createAdminReview({
        name: newName.trim(),
        city: newCity.trim() || 'Jaipur, Rajasthan',
        serviceName: newService,
        rating: newRating,
        reviewText: newText.trim(),
        status: newStatus
      });
      showToast('success', res.message || 'समीक्षा सफलतापूर्वक जोड़ी गई।');
      setNewName('');
      setNewCity('Jaipur, Rajasthan');
      setNewText('');
      setNewRating(5);
      setShowAddForm(false);
      await loadReviews(false);
      onReviewsUpdated?.();
    } catch (err: any) {
      showToast('error', err.message || 'समीक्षा जोड़ने में विफल।');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (rev: ReviewItem) => {
    setEditingId(rev.id);
    setEditForm({
      name: rev.name,
      city: rev.city,
      serviceName: rev.serviceName,
      rating: rev.rating,
      reviewText: rev.reviewText
    });
  };

  const handleSaveEdit = async (id: string) => {
    setSavingEdit(true);
    try {
      await updateAdminReview(id, editForm);
      showToast('success', 'समीक्षा विवरण सफलतापूर्वक अपडेट किया गया।');
      setEditingId(null);
      await loadReviews(false);
      onReviewsUpdated?.();
    } catch (err: any) {
      showToast('error', err.message || 'समीक्षा संपादित करने में त्रुटि।');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteAdminReview(reviewToDelete.id);
      showToast('success', `"${reviewToDelete.name}" की समीक्षा सफलतापूर्वक हटा दी गई।`);
      setReviewToDelete(null);
      await loadReviews(false);
      onReviewsUpdated?.();
    } catch (err: any) {
      showToast('error', err.message || 'समीक्षा हटाने में त्रुटि।');
    } finally {
      setDeleteLoading(false);
    }
  };

  const sortedAndFiltered = reviews
    .filter((r) => {
      const normalizedStatus = r.status || 'approved';
      const matchesStatus = statusFilter === 'all' || normalizedStatus === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q) ||
        r.reviewText.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const order: Record<string, number> = { pending: 0, approved: 1, rejected: 2 };
      const diff = (order[a.status || 'approved'] ?? 1) - (order[b.status || 'approved'] ?? 1);
      if (diff !== 0) return diff;
      return (b.date || '').localeCompare(a.date || '');
    });

  return (
    <div className="min-h-screen bg-[#0e0e11] text-stone-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>डैशबोर्ड (Dashboard)</span>
          </button>

          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-stone-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>✍️ समीक्षा लेख एवं अनुमोदन प्रबंधक (Reviews & Approval)</span>
            </h1>
            <p className="text-xs text-stone-400">
              वेबसाइट से प्राप्त नई समीक्षाओं को स्वीकृत (Approve), अस्वीकृत या संपादित करें
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadReviews(false)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">रिफ्रेश</span>
          </button>

          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs transition shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>✍️ नई समीक्षा लिखें (Add Review)</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Toast Feedback */}
        {toast && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium shadow-lg ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => setStatusFilter('pending')}
            className={`text-left rounded-2xl p-4 sm:p-5 border transition cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/40'
                : 'bg-stone-900/80 border-stone-800 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">लंबित (Pending)</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              {counts.pending}
            </p>
            <p className="text-[11px] text-amber-200/70 mt-1">अनुमोदन हेतु प्रतीक्षारत</p>
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`text-left rounded-2xl p-4 sm:p-5 border transition cursor-pointer ${
              statusFilter === 'approved'
                ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/40'
                : 'bg-stone-900/80 border-stone-800 hover:border-emerald-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">स्वीकृत (Approved)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">
              {counts.approved}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">वेबसाइट पर लाइव प्रकाशित</p>
          </button>

          <button
            onClick={() => setStatusFilter('rejected')}
            className={`text-left rounded-2xl p-4 sm:p-5 border transition cursor-pointer ${
              statusFilter === 'rejected'
                ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/40'
                : 'bg-stone-900/80 border-stone-800 hover:border-rose-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">अस्वीकृत (Rejected)</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-rose-400">
              {counts.rejected}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">सार्वजनिक साइट से छिपी हुई</p>
          </button>

          <button
            onClick={() => setStatusFilter('all')}
            className={`text-left rounded-2xl p-4 sm:p-5 border transition cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-stone-800 border-amber-400/60 shadow-lg'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between text-stone-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">कुल समीक्षाएँ (Total)</span>
              <MessageSquare className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {counts.total}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">डेटाबेस में कुल प्रविष्टियाँ</p>
          </button>
        </div>

        {/* Add Review Form inside Admin Panel */}
        {showAddForm && (
          <form
            onSubmit={handleCreateReview}
            className="bg-stone-900 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="font-serif font-bold text-base text-amber-300">
                  ✍️ एडमिन पैनल से नई समीक्षा लिखें (Write & Publish Review)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  ग्राहक का नाम (Client Name) *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="उदा. अमित शर्मा"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  शहर / राज्य (City & State)
                </label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Jaipur, Rajasthan"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  परामर्श सेवा (Service)
                </label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:border-amber-500 outline-none"
                >
                  {SERVICE_OPTIONS.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  स्टार रेटिंग (Rating)
                </label>
                <div className="flex items-center gap-1.5 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-0.5 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          newRating >= star ? 'fill-amber-400 text-amber-400' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2">{newRating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  प्रकाशन स्थिति (Initial Status)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setNewStatus('approved')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      newStatus === 'approved'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    ✓ सीधे लाइव प्रकाशित करें (Approved)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStatus('pending')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      newStatus === 'pending'
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    ⏳ लंबित रखें (Pending)
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                समीक्षा पाठ (Review Content) *
              </label>
              <textarea
                required
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="ग्राहक का अनुभव या समीक्षा लिखें..."
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-xs sm:text-sm text-stone-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{creating ? 'सहेजा जा रहा है...' : 'समीक्षा सहेजें (Save Review)'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar & List */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-950/50">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'pending' as const, label: `⏳ लंबित अनुमोदन (${counts.pending})` },
                { id: 'approved' as const, label: `✓ स्वीकृत लाइव (${counts.approved})` },
                { id: 'rejected' as const, label: `✕ अस्वीकृत (${counts.rejected})` },
                { id: 'all' as const, label: `सभी (${counts.total})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[230px]">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="नाम, शहर, सेवा या समीक्षा खोजें..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-stone-400 text-xs">
              समीक्षाएं लोड हो रही हैं...
            </div>
          ) : sortedAndFiltered.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-2">
              <MessageSquare className="w-10 h-10 text-stone-700 mx-auto" />
              <p className="text-sm font-semibold text-stone-300">
                {statusFilter === 'pending'
                  ? 'कोई लंबित समीक्षा (Pending Review) शेष नहीं है!'
                  : 'इस श्रेणी में कोई समीक्षा नहीं मिली।'}
              </p>
              <p className="text-xs text-stone-500">
                जब कोई विज़िटर वेबसाइट पर "✍️ समीक्षा लेख (एक समीक्षा लिखें)" से समीक्षा भेजेगा, तो वह अनुमोदन हेतु यहाँ दिखाई देगी।
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-800/80">
              {sortedAndFiltered.map((rev) => {
                const currentStatus = rev.status || 'approved';
                const isEditing = editingId === rev.id;
                const isBusy = actionLoadingId === rev.id;

                return (
                  <div
                    key={rev.id}
                    className={`p-4 sm:p-5 transition ${
                      currentStatus === 'pending'
                        ? 'bg-amber-950/15 hover:bg-amber-950/25'
                        : 'hover:bg-stone-950/40'
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-3 bg-stone-950 p-4 rounded-xl border border-amber-500/40">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="नाम"
                            className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={editForm.city}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                            placeholder="शहर"
                            className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={editForm.serviceName}
                            onChange={(e) =>
                              setEditForm({ ...editForm, serviceName: e.target.value })
                            }
                            placeholder="सेवा"
                            className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-500"
                          />
                        </div>
                        <textarea
                          rows={3}
                          value={editForm.reviewText}
                          onChange={(e) => setEditForm({ ...editForm, reviewText: e.target.value })}
                          className="w-full p-3 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-500"
                        />
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setEditForm({ ...editForm, rating: star })}
                                className="p-0.5 cursor-pointer"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    editForm.rating >= star
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-stone-600'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs cursor-pointer"
                            >
                              रद्द करें
                            </button>
                            <button
                              type="button"
                              disabled={savingEdit}
                              onClick={() => handleSaveEdit(rev.id)}
                              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{savingEdit ? 'सहेज रहा है...' : 'अपडेट सहेजें'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          {/* Status + Stars + Meta */}
                          <div className="flex items-center gap-2.5 flex-wrap">
                            {currentStatus === 'pending' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                <Clock className="w-3 h-3" />
                                <span>लंबित अनुमोदन (Pending Approval)</span>
                              </span>
                            ) : currentStatus === 'approved' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>लाइव स्वीकृत (Approved)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                <XCircle className="w-3 h-3" />
                                <span>अस्वीकृत (Rejected)</span>
                              </span>
                            )}

                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                                  }`}
                                />
                              ))}
                            </div>

                            <span className="text-xs font-bold text-stone-100">{rev.name}</span>

                            <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
                              <MapPin className="w-3 h-3 text-amber-500/80" />
                              {rev.city}
                            </span>

                            <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                              <Calendar className="w-3 h-3" />
                              {rev.date}
                            </span>
                          </div>

                          {/* Review Quote */}
                          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-950/70 p-3 rounded-xl border border-stone-800/80 italic">
                            “{rev.reviewText}”
                          </p>

                          {/* Service Tag & Helpful */}
                          <div className="flex items-center gap-3 flex-wrap text-[11px]">
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-700/40 font-medium">
                              {rev.serviceName}
                            </span>
                            <span className="inline-flex items-center gap-1 text-stone-400">
                              <ThumbsUp className="w-3 h-3 text-stone-500" />
                              <span>{rev.helpfulCount || 1} उपयोगी वोट</span>
                            </span>
                          </div>
                        </div>

                        {/* Moderation Buttons */}
                        <div className="flex flex-wrap lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
                          {currentStatus !== 'approved' && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleStatusChange(rev.id, 'approved')}
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-xs transition cursor-pointer shadow-sm disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>✓ अनुमोदित करें (Approve)</span>
                            </button>
                          )}

                          {currentStatus !== 'rejected' && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleStatusChange(rev.id, 'rejected')}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-700/50 text-rose-300 font-semibold text-xs transition cursor-pointer disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>अस्वीकार करें (Reject)</span>
                            </button>
                          )}

                          <div className="flex items-center gap-1.5">
                            {currentStatus !== 'pending' && (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => handleStatusChange(rev.id, 'pending')}
                                className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] font-semibold transition cursor-pointer disabled:opacity-50"
                                title="लंबित (Pending) स्थिति में रखें"
                              >
                                <Clock className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => startEdit(rev)}
                              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                              title="समीक्षा संपादित करें (Edit)"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setReviewToDelete(rev)}
                              className="p-2 rounded-xl bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-400 transition cursor-pointer"
                              title="समीक्षा हटाएं (Delete)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <ConfirmDeleteModal
        isOpen={Boolean(reviewToDelete)}
        title="समीक्षा हटाने की पुष्टि करें (Delete Review)"
        message={`क्या आप वाकई "${reviewToDelete?.name}" की समीक्षा को स्थायी रूप से हटाना चाहते हैं?`}
        subMessage="यह क्रिया अपरिवर्तनीय है। हटाने के बाद यह समीक्षा डेटाबेस और वेबसाइट से हमेशा के लिए हट जाएगी।"
        itemDetails={[
          { label: 'ग्राहक (Name)', value: reviewToDelete?.name || '' },
          { label: 'सेवा (Service)', value: reviewToDelete?.serviceName || '' },
          { label: 'रेटिंग', value: `${reviewToDelete?.rating || 5} / 5` }
        ]}
        confirmText="हाँ, हटाएं (Yes, Delete)"
        cancelText="नहीं, रद्द करें (No, Cancel)"
        isDestructive={true}
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setReviewToDelete(null)}
      />
    </div>
  );
};
