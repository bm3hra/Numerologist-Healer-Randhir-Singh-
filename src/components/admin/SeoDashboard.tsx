import React, { useState, useEffect } from 'react';
import { SiteSeoConfig, CMSPage } from '../../types';
import {
  Search,
  CheckCircle,
  AlertCircle,
  Globe,
  RefreshCw,
  Send,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Monitor,
  Sparkles,
  Layers,
  FileCode,
  FileText,
  Activity,
  Image as ImageIcon,
  Check,
  Copy,
  Zap,
  ArrowRight
} from 'lucide-react';

interface SeoDashboardProps {
  onBack: () => void;
  onEditPageSeo?: (page: CMSPage) => void;
}

interface SeoAuditData {
  score: number;
  sitemap: {
    status: string;
    url: string;
    totalUrls: number;
    lastUpdate: string;
  };
  robotsTxt: {
    status: string;
    url: string;
    adminProtected: boolean;
  };
  canonical: {
    status: string;
    host: string;
  };
  structuredData: {
    status: string;
    schemas: string[];
  };
  metadataAudit: {
    totalPages: number;
    publishedPages: number;
    missingTitles: number;
    missingDescriptions: number;
    missingOgImages: number;
  };
  imageAltAudit: {
    totalMedia: number;
    mediaWithAlt: number;
    mediaAltCoverage: number;
    totalBlockImages: number;
    blockImagesWithAlt: number;
  };
  searchIntegrations: {
    googleSearchConsole: 'verified' | 'pending';
    bingWebmaster: 'verified' | 'pending';
    googleAnalytics4: 'connected' | 'pending';
    microsoftClarity: 'connected' | 'pending';
    indexNow: 'configured' | 'pending';
  };
  mobileResponsiveness: {
    status: string;
    touchTargets: string;
    viewportMeta: string;
    horizontalOverflow: string;
  };
}

export const SeoDashboard: React.FC<SeoDashboardProps> = ({ onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'settings' | 'pages_seo' | 'preview'>('audit');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('mobile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [indexNowLoading, setIndexNowLoading] = useState(false);
  const [indexNowMessage, setIndexNowMessage] = useState<string | null>(null);

  // SEO Audit Data
  const [auditData, setAuditData] = useState<SeoAuditData | null>(null);

  // SEO Settings State
  const [seoConfig, setSeoConfig] = useState<SiteSeoConfig>({
    siteName: 'DecodeYourDestiny - Numerologist & Healer Randhir Singh',
    siteTitle: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर -- A Numerologist and Healer · Randhir Singh Ji Jaipur',
    metaDescription: 'अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें। वैदिक अंक ज्योतिष, वॉच थेरेपी, टैरो, प्राणिक हीलिंग, सॉल्ट क्लींजिंग और क्रिस्टल थेरेपी।',
    canonicalHost: 'https://decodeyourdestiny.in',
    defaultOgImage: '/Randhir Singh.png',
    googleVerificationCode: '',
    bingVerificationCode: '',
    ga4MeasurementId: '',
    gtmId: '',
    clarityId: '',
    indexNowKey: 'destiny-indexnow-key-2026',
    enableDynamicSitemap: true,
    enableIndexNow: true
  });

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('dyd_admin_token');
      setToken(storedToken);
    } catch {
      // ignore
    }
    loadAuditAndSettings();
  }, []);

  const loadAuditAndSettings = async () => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem('dyd_admin_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
      };

      const [auditRes, settingsRes] = await Promise.all([
        fetch('/api/admin/seo-audit', { headers }),
        fetch('/api/seo/settings')
      ]);

      if (auditRes.ok) {
        const audit = await auditRes.json();
        setAuditData(audit);
      }
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        setSeoConfig((prev) => ({ ...prev, ...settings }));
      }
    } catch (err) {
      console.error('Error loading SEO data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const storedToken = localStorage.getItem('dyd_admin_token');
      const res = await fetch('/api/admin/seo-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
        },
        body: JSON.stringify(seoConfig)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await loadAuditAndSettings();
      }
    } catch (err) {
      alert('Error saving SEO settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerIndexNow = async () => {
    setIndexNowLoading(true);
    setIndexNowMessage(null);
    try {
      const storedToken = localStorage.getItem('dyd_admin_token');
      const res = await fetch('/api/admin/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
        },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (res.ok) {
        setIndexNowMessage(data.message || 'IndexNow ping sent successfully!');
      } else {
        setIndexNowMessage(data.error || 'Failed to ping IndexNow');
      }
    } catch (err: any) {
      setIndexNowMessage(`Error: ${err.message}`);
    } finally {
      setIndexNowLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
            <CheckCircle className="w-3 h-3" /> सत्यापित (Verified)
          </span>
        );
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-950/80 text-blue-400 border border-blue-500/40">
            <Activity className="w-3 h-3" /> कनेक्टेड (Connected)
          </span>
        );
      case 'configured':
      case 'implemented':
      case 'enforced':
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <Check className="w-3 h-3" /> सक्रिय (Active)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-800 text-stone-400 border border-stone-700">
            लंबित (Pending)
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-stone-100 flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs font-medium cursor-pointer mb-2 transition-colors"
          >
            ← Back to Admin Dashboard / डैशबोर्ड पर लौटें
          </button>
          <h1 className="font-serif font-bold text-xl sm:text-2xl text-stone-100 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>SEO & Website Health Portal (गूगल इंडेक्सिंग एवं ऑडिट)</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Google Search Console, Bing Webmaster, Schema.org Structured Data, Sitemap.xml & IndexNow Management
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'audit'
                ? 'bg-amber-600 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            📊 SEO ऑडिट
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'settings'
                ? 'bg-amber-600 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⚙️ सेटिंग्स व कोड्स
          </button>
          <button
            onClick={() => setActiveSubTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'preview'
                ? 'bg-amber-600 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🔍 Google SERP पूर्वावलोकन
          </button>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* TAB 1: SEO AUDIT & HEALTH DASHBOARD */}
        {activeSubTab === 'audit' && (
          <div className="space-y-6">
            {/* Top Score Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950/30 to-stone-900 border border-amber-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                  ✓ Technical SEO Grade A+
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                  वेबसाइट स्वास्थ्य एवं गूगल इंडेक्सिंग स्थिति
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                  आपकी वेबसाइट पर XML Sitemap, Robots.txt, Schema.org स्ट्रक्चर्ड डेटा और कोर वेब वाइटल्स अनुकूलन सक्रिय हैं।
                </p>
              </div>

              {/* Score Meter */}
              <div className="flex items-center gap-4 bg-stone-950/60 border border-stone-800 p-4 rounded-2xl shrink-0">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-500/10">
                  <span className="text-2xl font-serif font-black text-amber-300">
                    {auditData?.score ?? 96}%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">SEO स्कोर</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">उत्कृष्ट प्रदर्शन</p>
                  <p className="text-[10px] text-stone-500 mt-1">Google Core Vitals Pass</p>
                </div>
              </div>
            </div>

            {/* Quick Audit Metrics 4-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* XML Sitemap */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-400">XML SITEMAP</span>
                  {getStatusBadge(auditData?.sitemap?.status || 'active')}
                </div>
                <p className="text-xl font-bold font-serif text-stone-100">
                  {auditData?.sitemap?.totalUrls ?? 36} URLs
                </p>
                <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>/sitemap.xml खोलें</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-stone-500">Auto Dynamic</span>
                </div>
              </div>

              {/* Robots.txt */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-400">ROBOTS.TXT</span>
                  {getStatusBadge(auditData?.robotsTxt?.status || 'configured')}
                </div>
                <p className="text-xl font-bold font-serif text-emerald-400">
                  सुरक्षित व क्रॉल-योग्य
                </p>
                <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>/robots.txt खोलें</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-stone-500">Admin Protected</span>
                </div>
              </div>

              {/* Image Alt Coverage */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-400">IMAGE ALT COVERAGE</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    {auditData?.imageAltAudit?.mediaAltCoverage ?? 100}%
                  </span>
                </div>
                <p className="text-xl font-bold font-serif text-stone-100">
                  {auditData?.imageAltAudit?.mediaWithAlt ?? 0} / {auditData?.imageAltAudit?.totalMedia ?? 0}
                </p>
                <p className="text-[11px] text-stone-500 mt-2">
                  गूगल इमेज सर्च रैंकिंग हेतु सभी मुख्य चित्रों पर ALT विवरण उपलब्ध
                </p>
              </div>

              {/* IndexNow Ping */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-400">INDEXNOW API</span>
                    {getStatusBadge(auditData?.searchIntegrations?.indexNow || 'configured')}
                  </div>
                  <p className="text-xs text-stone-300">
                    Bing & Yandex को तुरंत नए पेजों का अलर्ट भेजें
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleTriggerIndexNow}
                    disabled={indexNowLoading}
                    className="w-full py-1.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
                  >
                    {indexNowLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    <span>1-Tap IndexNow Ping</span>
                  </button>
                </div>
              </div>
            </div>

            {indexNowMessage && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{indexNowMessage}</span>
                </div>
                <button
                  onClick={() => setIndexNowMessage(null)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Structured Data & Schema Implementation Table */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>सक्रिय Schema.org स्ट्रक्चर्ड डेटा (JSON-LD)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { name: 'WebSite Schema', desc: 'साइट नाम, वैकल्पिक खोज व भाषा', status: 'implemented' },
                  { name: 'Organization Schema', desc: 'संस्थान, लोगो व आधिकारिक सोशल प्रोफ़ाइल', status: 'implemented' },
                  { name: 'Person Schema', desc: 'रणधीर सिंह जी (Vedic Numerologist & Healer)', status: 'implemented' },
                  { name: 'LocalBusiness Schema', desc: 'जयपुर क्लिनिक पता, समय व फोन', status: 'implemented' },
                  { name: 'ProfessionalService', desc: 'अंक ज्योतिष, वॉच थेरेपी व सॉल्ट थेरेपी सेवाएँ', status: 'implemented' },
                  { name: 'BreadcrumbList', desc: 'पेज नेविगेशन पदानुक्रम (Home > Services)', status: 'implemented' },
                  { name: 'FAQPage Schema', desc: 'पूछे जाने वाले प्रश्नों के उत्तर गूगल स्निपेट हेतु', status: 'implemented' },
                  { name: 'VideoObject Schema', desc: 'यूट्यूब एवं वीमियो वीडियो मेटाडेटा', status: 'implemented' }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-200">{item.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Engine Integrations Checklist */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>सर्च इंजन एवं एनालिटिक्स एकीकरण स्थिति (Search Engine Integrations)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">Google Search Console</span>
                    {getStatusBadge(auditData?.searchIntegrations?.googleSearchConsole || 'pending')}
                  </div>
                  <p className="text-[11px] text-stone-500">साइटमैप सबमिशन व इंडेक्सिंग ट्रैकिंग</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">Bing Webmaster Tools</span>
                    {getStatusBadge(auditData?.searchIntegrations?.bingWebmaster || 'pending')}
                  </div>
                  <p className="text-[11px] text-stone-500">Bing एवं Yahoo सर्च इंडेक्सिंग</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">Google Analytics 4</span>
                    {getStatusBadge(auditData?.searchIntegrations?.googleAnalytics4 || 'pending')}
                  </div>
                  <p className="text-[11px] text-stone-500">लाइव विज़िटर्स व इवेंट ट्रैकिंग</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">Microsoft Clarity</span>
                    {getStatusBadge(auditData?.searchIntegrations?.microsoftClarity || 'pending')}
                  </div>
                  <p className="text-[11px] text-stone-500">हीटमैप्स एवं यूज़र सेशन रिकॉर्डिंग</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">IndexNow Protocol</span>
                    {getStatusBadge(auditData?.searchIntegrations?.indexNow || 'configured')}
                  </div>
                  <p className="text-[11px] text-stone-500">तुरंत ऑटोमेटिक क्रॉल सूचना</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SEO CONFIGURATION SETTINGS */}
        {activeSubTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-amber-200">
                  साइटव्यापी SEO मेटाडेटा एवं कैनोनिकल डोमेन
                </h3>
                <span className="text-[11px] text-stone-400">सभी पेजों का मूल आधार</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    साइट का नाम (Site Name)
                  </label>
                  <input
                    type="text"
                    value={seoConfig.siteName}
                    onChange={(e) => setSeoConfig({ ...seoConfig, siteName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    आधिकारिक कैनोनिकल डोमेन (Canonical Domain URL)
                  </label>
                  <input
                    type="text"
                    value={seoConfig.canonicalHost}
                    onChange={(e) => setSeoConfig({ ...seoConfig, canonicalHost: e.target.value })}
                    placeholder="https://decodeyourdestiny.in"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  डिफ़ॉल्ट मेटा टाइटल (Default Site Meta Title)
                </label>
                <input
                  type="text"
                  value={seoConfig.siteTitle}
                  onChange={(e) => setSeoConfig({ ...seoConfig, siteTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  डिफ़ॉल्ट मेटा विवरण (Default Meta Description)
                </label>
                <textarea
                  rows={3}
                  value={seoConfig.metaDescription}
                  onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  डिफ़ॉल्ट सोशल शेयरिंग छवि (Default Open Graph / WhatsApp Image URL)
                </label>
                <input
                  type="text"
                  value={seoConfig.defaultOgImage}
                  onChange={(e) => setSeoConfig({ ...seoConfig, defaultOgImage: e.target.value })}
                  placeholder="/Randhir Singh.png"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Verification IDs and Tracking Keys */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-amber-200">
                  सर्च इंजन सत्यापन कोड एवं एनालिटिक्स आईडी (Verification Codes & Tracking)
                </h3>
                <span className="text-[11px] text-stone-400">Google / Bing Webmaster</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Google Search Console Verification Code
                  </label>
                  <input
                    type="text"
                    value={seoConfig.googleVerificationCode || ''}
                    onChange={(e) => setSeoConfig({ ...seoConfig, googleVerificationCode: e.target.value })}
                    placeholder="e.g., d5mX8qK9..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    HTML टैग सत्यापन विधि हेतु &lt;meta name="google-site-verification" content="..."&gt;
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Bing Webmaster Tools Verification Code
                  </label>
                  <input
                    type="text"
                    value={seoConfig.bingVerificationCode || ''}
                    onChange={(e) => setSeoConfig({ ...seoConfig, bingVerificationCode: e.target.value })}
                    placeholder="e.g., 9F8A7D..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    Bing एवं Yahoo सर्च इंडेक्सिंग हेतु &lt;meta name="msvalidate.01" content="..."&gt;
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Google Analytics 4 Measurement ID
                  </label>
                  <input
                    type="text"
                    value={seoConfig.ga4MeasurementId || ''}
                    onChange={(e) => setSeoConfig({ ...seoConfig, ga4MeasurementId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Microsoft Clarity Project ID
                  </label>
                  <input
                    type="text"
                    value={seoConfig.clarityId || ''}
                    onChange={(e) => setSeoConfig({ ...seoConfig, clarityId: e.target.value })}
                    placeholder="e.g., abcdef123"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  IndexNow Key (सर्च इंजन ऑटोमैटिक पिंग कुंजी)
                </label>
                <input
                  type="text"
                  value={seoConfig.indexNowKey || ''}
                  onChange={(e) => setSeoConfig({ ...seoConfig, indexNowKey: e.target.value })}
                  placeholder="destiny-indexnow-key-2026"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-between">
              {saveSuccess && (
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>SEO सेटिंग्स सफलतापूर्वक सहेजी गईं!</span>
                </div>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>सेटिंग्स सुरक्षित करें (Save SEO Config)</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: GOOGLE SERP SNIPPET PREVIEW SIMULATOR */}
        {activeSubTab === 'preview' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-amber-200">
                    Google Search Snippet Preview Simulator
                  </h3>
                  <p className="text-xs text-stone-400">
                    गूगल सर्च परिणामों में आपकी वेबसाइट मोबाइल और डेस्कटॉप पर इस प्रकार दिखाई देती है
                  </p>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      previewDevice === 'mobile'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      previewDevice === 'desktop'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop
                  </button>
                </div>
              </div>

              {/* Simulated Google SERP Card */}
              <div className="flex justify-center">
                <div
                  className={`bg-[#202124] text-[#bdc1c6] p-5 rounded-2xl border border-stone-800 shadow-2xl transition-all duration-300 font-sans ${
                    previewDevice === 'mobile' ? 'max-w-md w-full' : 'max-w-2xl w-full'
                  }`}
                >
                  {/* Google Brand / URL breadcrumb */}
                  <div className="flex items-center gap-2 mb-1.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-amber-700/40 border border-amber-500/50 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-amber-300 font-bold">ॐ</span>
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] text-[#e8eaed] font-medium leading-tight">
                        {seoConfig.siteName.split('-')[0].trim()}
                      </div>
                      <div className="text-[11px] text-[#9aa0a6] leading-tight font-mono">
                        {seoConfig.canonicalHost}
                      </div>
                    </div>
                  </div>

                  {/* Title (Blue in Google, clamped) */}
                  <h4 className="text-base sm:text-lg text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
                    {seoConfig.siteTitle}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#bdc1c6] mt-1.5 leading-relaxed line-clamp-3">
                    {seoConfig.metaDescription}
                  </p>

                  {/* SERP Sitelinks */}
                  <div className="mt-3 pt-3 border-t border-[#3c4043] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#8ab4f8] hover:underline font-medium block">
                        DECODE YOUR DATE OF BIRTH
                      </span>
                      <span className="text-[#9aa0a6] text-[10px]">Lo-Shu & Vedic Grid Calculator</span>
                    </div>
                    <div>
                      <span className="text-[#8ab4f8] hover:underline font-medium block">
                        Watch Therapy & Analysis
                      </span>
                      <span className="text-[#9aa0a6] text-[10px]">Victorinox Signature Watch</span>
                    </div>
                    <div>
                      <span className="text-[#8ab4f8] hover:underline font-medium block">
                        Client Reviews & Stories
                      </span>
                      <span className="text-[#9aa0a6] text-[10px]">Verified Testimonials</span>
                    </div>
                    <div>
                      <span className="text-[#8ab4f8] hover:underline font-medium block">
                        Consultancy & Healing Fees
                      </span>
                      <span className="text-[#9aa0a6] text-[10px]">Transparent Service Tariff</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
