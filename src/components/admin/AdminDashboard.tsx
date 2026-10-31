import React, { useState, useEffect } from 'react';
import { useAdminAuth, PRIMARY_ADMIN_EMAIL } from '../../context/AdminAuthContext';
import { CMSPage, CMSMediaItem } from '../../types';
import {
  getAdminStats,
  getAllPages,
  deletePage,
  savePage
} from '../../lib/cmsService';
import { PageBuilder } from './PageBuilder';
import { MediaLibrary } from './MediaLibrary';
import { AdminSettings } from './AdminSettings';
import {
  FileText,
  Globe,
  Plus,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Clock,
  CheckCircle,
  Eye,
  ShieldCheck,
  Search,
  RefreshCw,
  FolderOpen,
  Settings,
  HardDrive,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onViewLivePage: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onViewLivePage
}) => {
  const { adminUser, logout } = useAdminAuth();

  // Metrics
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
    totalImages: 0,
    totalVideos: 0,
    diskUsage: { bytes: 0, formatted: '0.00 MB' },
    recentPages: [] as CMSPage[]
  });
  const [pagesList, setPagesList] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'homepage' | 'dedicated' | 'service' | 'custom'>('all');

  // Modes: dashboard | builder | media | settings
  const [viewMode, setViewMode] = useState<'dashboard' | 'builder' | 'media' | 'settings'>('dashboard');
  const [pageToEdit, setPageToEdit] = useState<CMSPage | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, pages] = await Promise.all([getAdminStats(), getAllPages()]);
      setStats({
        ...statsData,
        diskUsage: statsData.diskUsage || { bytes: 0, formatted: '0.77 MB' }
      });
      setPagesList(pages);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPage = () => {
    setPageToEdit(null);
    setViewMode('builder');
  };

  const handleEditPage = (page: CMSPage) => {
    setPageToEdit(page);
    setViewMode('builder');
  };

  const handleDuplicatePage = async (page: CMSPage) => {
    const cloneTitle = `${page.title} (Copy)`;
    const cloneSlug = `${page.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;
    try {
      await savePage({
        ...page,
        id: undefined,
        title: cloneTitle,
        slug: cloneSlug,
        category: 'custom',
        isSystemPage: false,
        status: 'draft',
        createdAt: undefined,
        updatedAt: undefined
      });
      await loadDashboardData();
    } catch (err: any) {
      alert(`Duplicate failed: ${err.message}`);
    }
  };

  const handleDeletePage = async (page: CMSPage) => {
    if (page.isSystemPage) {
      alert('यह मुख्य वेबसाइट का अनिवार्य पृष्ठ/अनुभाग है। इसे हटाया नहीं जा सकता, केवल संपादित या अपडेट किया जा सकता है।');
      return;
    }
    if (!window.confirm(`Delete page "${page.title}" (/pages/${page.slug})? This cannot be undone.`)) {
      return;
    }
    try {
      await deletePage(page.id);
      await loadDashboardData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filteredPages = pagesList.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'homepage' && p.category === 'homepage') ||
      (filterCategory === 'dedicated' && p.category === 'dedicated') ||
      (filterCategory === 'service' && p.category === 'service') ||
      (filterCategory === 'custom' && (p.category === 'custom' || !p.category));

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.titleHi && p.titleHi.includes(searchQuery));
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const homepageCount = pagesList.filter((p) => p.category === 'homepage').length;
  const dedicatedCount = pagesList.filter((p) => p.category === 'dedicated').length;
  const serviceCount = pagesList.filter((p) => p.category === 'service').length;
  const customCount = pagesList.filter((p) => p.category === 'custom' || !p.category).length;

  // Render PageBuilder when in 'builder' view
  if (viewMode === 'builder') {
    return (
      <PageBuilder
        initialPage={pageToEdit}
        onBack={() => {
          setViewMode('dashboard');
          loadDashboardData();
        }}
        onPageSaved={() => {
          loadDashboardData();
        }}
        onViewLive={(slug) => onViewLivePage(slug)}
      />
    );
  }

  // Render MediaLibrary when in 'media' view
  if (viewMode === 'media') {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full mx-auto mb-4">
          <button
            onClick={() => setViewMode('dashboard')}
            className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs font-medium cursor-pointer"
          >
            ← Back to Admin Dashboard / डैशबोर्ड
          </button>
        </div>
        <div className="max-w-6xl w-full mx-auto flex-1">
          <MediaLibrary isModal={false} />
        </div>
      </div>
    );
  }

  // Render AdminSettings when in 'settings' view
  if (viewMode === 'settings') {
    return (
      <AdminSettings
        onBack={() => {
          setViewMode('dashboard');
          loadDashboardData();
        }}
        diskUsage={stats.diskUsage}
        adminEmail={adminUser?.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e11] text-stone-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-stone-100 tracking-tight flex items-center gap-2">
              <span>Admin CMS Portal</span>
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/30 text-[10px] font-mono">
                PBKDF2 Secured
              </span>
            </h1>
            <p className="text-xs text-stone-400 flex items-center gap-1.5">
              <span>Numerologist & Healer · Randhir Singh</span>
              <span className="text-stone-600">·</span>
              <span className="text-amber-400 font-mono text-[11px]">{adminUser?.email || PRIMARY_ADMIN_EMAIL}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setViewMode('settings')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
            title="सेटिंग्स व बैकअप (Settings & Backup)"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">सेटिंग्स व बैकअप</span>
          </button>

          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Website</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold transition cursor-pointer"
            title="लॉगआउट करें (Sign Out)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">लॉगआउट</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Metric Cards Banner (5 Cards including Storage) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">कुल पेज (Total)</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {stats.totalPages}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">असीमित वेब पेज</p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">प्रकाशित (Live)</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">
              {stats.publishedPages}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">सार्वजनिक URL पर लाइव</p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">ड्राफ्ट (Drafts)</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
              {stats.draftPages}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">अप्रकाशित मसौदे</p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">मीडिया फ़ाइलें</span>
              <ImageIcon className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {stats.totalMedia}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              {stats.totalImages} फोटो · {stats.totalVideos} वीडियो
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">डिस्क स्टोरेज</span>
              <HardDrive className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-cyan-400">
              {stats.diskUsage?.formatted || '0.77 MB'}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">/public/uploads/</p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800">
          <div>
            <h2 className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
              <span>त्वरित CMS कार्य (Quick Actions)</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              तुरंत नया पेज बनाएं, फोटो/वीडियो अपलोड करें या डेटाबेस बैकअप डाउनलोड करें
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setViewMode('settings')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition cursor-pointer shadow-sm"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span>सेटिंग्स व बैकअप</span>
            </button>

            <button
              onClick={() => setViewMode('media')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition cursor-pointer shadow-sm"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span>मीडिया लाइब्रेरी</span>
            </button>

            <button
              onClick={handleCreateNewPage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition shadow-lg shadow-amber-950/50 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>नया पेज बनाएँ (Create Page)</span>
            </button>
          </div>
        </div>

        {/* All Website Pages Editing Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-900/30 border border-amber-500/30 text-xs text-stone-200 flex items-start gap-3.5 shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300 text-sm">
              ✨ वेबसाइट के सभी पृष्ठ एवं अनुभाग अब सीधे एडमिन पैनल से संपादन योग्य हैं!
            </p>
            <p className="text-stone-300 leading-relaxed text-xs">
              आप मुख्य पृष्ठ (Hero Banner, कलाई घड़ी विश्लेषण, सॉल्ट थेरेपी, सर्टिफिकेट्स, टैरिफ), 5 विस्तृत पृष्ठों और 16 दिव्य सेवाओं में से किसी भी पेज पर <strong className="text-amber-200">"संपादित करें"</strong> दबाकर उसके टेक्स्ट, फोटो, वीडियो और लिंक को अपनी पसंद से बदल सकते हैं।
            </p>
          </div>
        </div>

        {/* Website Pages Management Table */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header & Controls */}
          <div className="p-5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 bg-stone-950/40">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                सभी वेबसाइट पेज ({filteredPages.length})
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                वेबसाइट के किसी भी भाग के टेक्स्ट, फोटो या वीडियो को संपादित करने के लिए नीचे सूची से चुनें
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="शीर्षक, स्लग या 'Watch', 'घड़ी' खोजें..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterStatus === 'all'
                      ? 'bg-amber-600 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  सभी ({pagesList.length})
                </button>
                <button
                  onClick={() => setFilterStatus('published')}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterStatus === 'published'
                      ? 'bg-amber-600 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  प्रकाशित ({pagesList.filter((p) => p.status === 'published').length})
                </button>
                <button
                  onClick={() => setFilterStatus('draft')}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterStatus === 'draft'
                      ? 'bg-amber-600 text-stone-950 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  ड्राफ्ट ({pagesList.filter((p) => p.status === 'draft').length})
                </button>
              </div>

              <button
                onClick={loadDashboardData}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                title="रिफ्रेश करें"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-5 pt-3 pb-3 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none bg-stone-950/20">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'all'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>🌟 सभी पृष्ठ</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
                {pagesList.length}
              </span>
            </button>
            <button
              onClick={() => setFilterCategory('homepage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'homepage'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>🏡 मुख्य पृष्ठ अनुभाग</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
                {homepageCount}
              </span>
            </button>
            <button
              onClick={() => setFilterCategory('dedicated')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'dedicated'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>📜 5 विस्तृत पृष्ठ</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
                {dedicatedCount}
              </span>
            </button>
            <button
              onClick={() => setFilterCategory('service')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'service'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>🔮 16 वैदिक सेवाएँ</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
                {serviceCount}
              </span>
            </button>
            <button
              onClick={() => setFilterCategory('custom')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filterCategory === 'custom'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>✨ कस्टम पेजेस</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
                {customCount}
              </span>
            </button>
          </div>

          {/* Table List */}
          {loading ? (
            <div className="py-16 text-center text-stone-500 text-xs">
              डेटाबेस से पेज लोड हो रहे हैं...
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <FileText className="w-10 h-10 text-stone-700 mx-auto mb-2" />
              <p className="text-sm font-medium text-stone-300">कोई पेज नहीं मिला</p>
              <p className="text-xs text-stone-500 mt-1">
                {searchQuery
                  ? 'आपकी खोज के अनुसार कोई पेज उपलब्ध नहीं है।'
                  : 'नया पेज बनाएँ बटन दबाकर अपना पहला वैदिक पेज तैयार करें।'}
              </p>
              <button
                onClick={handleCreateNewPage}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-600 text-stone-950 font-bold text-xs"
              >
                नया पेज बनाएँ
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-800/80">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-950/40 transition group"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Category Badge */}
                      {page.category === 'homepage' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                          🏡 मुख्य पृष्ठ अनुभाग
                        </span>
                      ) : page.category === 'dedicated' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
                          📜 मुख्य विस्तृत पृष्ठ
                        </span>
                      ) : page.category === 'service' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-500/40">
                          🔮 वैदिक सेवा पृष्ठ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                          ✨ कस्टम CMS पेज
                        </span>
                      )}

                      <h4 className="font-semibold text-stone-100 text-sm truncate">
                        {page.titleHi || page.title}
                      </h4>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          page.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-800/50'
                        }`}
                      >
                        {page.status === 'published' ? 'लाइव प्रकाशित' : 'ड्राफ्ट (Draft)'}
                      </span>
                    </div>

                    {page.titleHi && page.title !== page.titleHi && (
                      <p className="text-xs text-stone-400 truncate">
                        {page.title}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-0.5 flex-wrap">
                      <span className="font-mono text-amber-400/80">
                        {page.category === 'homepage'
                          ? `#${page.sectionId || page.slug}`
                          : page.category === 'dedicated' || page.category === 'service'
                          ? `/${page.slug}`
                          : `/pages/${page.slug}`}
                      </span>
                      <span>·</span>
                      <span>{page.blocks?.length || 0} ब्लॉक्स</span>
                      <span>·</span>
                      <span>अपडेट: {new Date(page.updatedAt).toLocaleDateString()}</span>
                      {page.viewCount !== undefined && (
                        <>
                          <span>·</span>
                          <span>{page.viewCount} व्यूज़</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (page.category === 'homepage') {
                          onViewLivePage(page.sectionId || page.slug);
                        } else if (page.category === 'dedicated' || page.category === 'service') {
                          onViewLivePage(page.slug);
                        } else {
                          onViewLivePage(`pages/${page.slug}`);
                        }
                      }}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 transition cursor-pointer"
                      title="वेबसाइट पर देखें"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEditPage(page)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition cursor-pointer shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>संपादित करें</span>
                    </button>

                    {!page.isSystemPage && (
                      <button
                        onClick={() => handleDuplicatePage(page)}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                        title="पेज की प्रतिलिपि (Duplicate) बनाएं"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeletePage(page)}
                      disabled={page.isSystemPage}
                      className={`p-2 rounded-xl transition ${
                        page.isSystemPage
                          ? 'bg-stone-900 text-stone-600 cursor-not-allowed opacity-40'
                          : 'bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-400 cursor-pointer'
                      }`}
                      title={
                        page.isSystemPage
                          ? 'मुख्य वेबसाइट का अनिवार्य पृष्ठ (हटाया नहीं जा सकता)'
                          : 'पेज डिलीट करें'
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
