import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  Copy,
  FileText,
  Image as ImageIcon,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Layers,
  ArrowRight,
  Award,
  User,
  Watch,
  Filter,
  Eye,
  CheckSquare,
  Square
} from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface DuplicateImageGroup {
  hash: string;
  size: number;
  sizeFormatted: string;
  primary: { relPath: string; url: string };
  duplicates: Array<{ relPath: string; url: string; size: number }>;
  totalWastedBytes: number;
}

interface DuplicatePageItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  reason: string;
}

export interface MultiPublishedLocation {
  pageId: string;
  pageTitle: string;
  pageSlug: string;
  type: string;
  blockId?: string;
  blockTitle?: string;
}

export interface MultiPublishedItem {
  url: string;
  name: string;
  category: 'certificate' | 'photo' | 'watch' | 'general';
  totalCount: number;
  primaryLocation: MultiPublishedLocation;
  duplicateLocations: MultiPublishedLocation[];
}

interface DuplicateScanResult {
  duplicateImageGroups: DuplicateImageGroup[];
  totalDuplicateImages: number;
  totalWastedImageBytes: number;
  totalWastedFormatted: string;
  duplicatePages: DuplicatePageItem[];
  totalDuplicatePages: number;
  multiPublishedMedia?: MultiPublishedItem[];
  totalMultiPublishedCount?: number;
}

interface DuplicateCleanerProps {
  onBack: () => void;
  onRefreshData?: () => void;
}

export const DuplicateCleaner: React.FC<DuplicateCleanerProps> = ({
  onBack,
  onRefreshData
}) => {
  const [loading, setLoading] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [scanResult, setScanResult] = useState<DuplicateScanResult | null>(null);

  // Active tab: certificates & photos multi-publish is primary
  const [activeTab, setActiveTab] = useState<'multipublish' | 'images' | 'pages'>('multipublish');

  // Multi-publish filter (all, certificates, photos, watches)
  const [multiFilter, setMultiFilter] = useState<'all' | 'certificate' | 'photo' | 'watch'>('all');

  // Selected duplicate files on disk
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  // Selected duplicate pages
  const [selectedPageIds, setSelectedPageIds] = useState<Set<string>>(new Set());

  // Selected multi-publish locations: Map of URL -> Set of target location key (pageId:type:blockId)
  const [selectedMultiLocations, setSelectedMultiLocations] = useState<Map<string, Set<string>>>(new Map());

  // Confirmation Modal state for YES / NO decision
  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    subMessage: string;
    itemDetails: Array<{ label: string; value: string }>;
    actionType: 'diskFiles' | 'pages' | 'multiPublish';
    payload?: any;
  }>({
    isOpen: false,
    title: '',
    message: '',
    subMessage: '',
    itemDetails: [],
    actionType: 'diskFiles'
  });

  const [cleanupSuccessMessage, setCleanupSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    runScan();
  }, []);

  const runScan = async () => {
    setLoading(true);
    setCleanupSuccessMessage(null);
    try {
      const storedToken = localStorage.getItem('dyd_admin_token');
      const res = await fetch('/api/admin/duplicates/scan', {
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
        }
      });
      if (res.ok) {
        const data: DuplicateScanResult = await res.json();
        setScanResult(data);

        // Pre-select disk duplicate files for easy cleanup
        const allDupPaths = new Set<string>();
        data.duplicateImageGroups.forEach((g) => {
          g.duplicates.forEach((d) => allDupPaths.add(d.relPath));
        });
        setSelectedPaths(allDupPaths);

        // Pre-select duplicate pages
        const allDupPageIds = new Set<string>();
        data.duplicatePages.forEach((p) => allDupPageIds.add(p.id));
        setSelectedPageIds(allDupPageIds);

        // Initialize multi-publish selections: select all duplicate locations by default for quick cleanup
        const multiLocMap = new Map<string, Set<string>>();
        (data.multiPublishedMedia || []).forEach((item) => {
          const locSet = new Set<string>();
          item.duplicateLocations.forEach((loc) => {
            locSet.add(`${loc.pageId}:::${loc.type}:::${loc.blockId || ''}`);
          });
          multiLocMap.set(item.url, locSet);
        });
        setSelectedMultiLocations(multiLocMap);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePathSelection = (relPath: string) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(relPath)) {
        next.delete(relPath);
      } else {
        next.add(relPath);
      }
      return next;
    });
  };

  const togglePageSelection = (id: string) => {
    setSelectedPageIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleMultiLocation = (url: string, locKey: string) => {
    setSelectedMultiLocations((prev) => {
      const next = new Map(prev);
      const currentSet = new Set(next.get(url) || []);
      if (currentSet.has(locKey)) {
        currentSet.delete(locKey);
      } else {
        currentSet.add(locKey);
      }
      next.set(url, currentSet);
      return next;
    });
  };

  const selectAllMultiForUrl = (item: MultiPublishedItem, select: boolean) => {
    setSelectedMultiLocations((prev) => {
      const next = new Map(prev);
      if (select) {
        const fullSet = new Set<string>();
        item.duplicateLocations.forEach((loc) => {
          fullSet.add(`${loc.pageId}:::${loc.type}:::${loc.blockId || ''}`);
        });
        next.set(item.url, fullSet);
      } else {
        next.set(item.url, new Set());
      }
      return next;
    });
  };

  // ==========================================
  // CONFIRMATION MODAL TRIGGER FUNCTIONS
  // ==========================================

  // 1. Trigger confirmation for Multi-Published item cleanup
  const handleConfirmUnpublishItem = (item: MultiPublishedItem) => {
    const selectedKeys = selectedMultiLocations.get(item.url) || new Set();
    if (selectedKeys.size === 0) {
      alert('कृपया हटाने हेतु कम से कम एक अतिरिक्त प्रकाशन स्थान चुनें।');
      return;
    }

    const targetLocations = item.duplicateLocations
      .filter((loc) => selectedKeys.has(`${loc.pageId}:::${loc.type}:::${loc.blockId || ''}`))
      .map((loc) => ({
        pageId: loc.pageId,
        pageTitle: loc.pageTitle,
        type: loc.type,
        blockId: loc.blockId
      }));

    setConfirmModalData({
      isOpen: true,
      title: `अतिरिक्त प्रकाशन हटाने की पुष्टि (Confirm Unpublish)`,
      message: `क्या आप वाकई "${item.name}" को चयनित ${targetLocations.length} अतिरिक्त पेजों से हटाना चाहते हैं?`,
      subMessage: `यह क्रिया केवल अतिरिक्त (duplicate) पेजों से इस छवि को हटाएगी। इसका मुख्य और मूल स्थान "${item.primaryLocation.pageTitle}" पर यह पूरी तरह सुरक्षित और प्रकाशित रहेगा।`,
      itemDetails: [
        { label: 'फ़ाइल का नाम', value: item.name },
        { label: 'मूल स्थान (सुरक्षित रहेगा)', value: `${item.primaryLocation.pageTitle} (${item.primaryLocation.type})` },
        { label: 'हटने वाले अतिरिक्त स्थान', value: `${targetLocations.length} पेजों से Unpublish होगा` }
      ],
      actionType: 'multiPublish',
      payload: { url: item.url, targetLocations }
    });
  };

  // 2. Trigger confirmation for Duplicate Disk Files cleanup
  const handleConfirmDiskFilesCleanup = () => {
    if (selectedPaths.size === 0) {
      alert('कृपया हटाने हेतु कम से कम एक डुप्लीकेट इमेज फ़ाइल चुनें।');
      return;
    }

    setConfirmModalData({
      isOpen: true,
      title: 'डुप्लीकेट इमेज फाइलें हटाने की पुष्टि (Confirm Image Deletion)',
      message: `क्या आप वाकई चयनित ${selectedPaths.size} डुप्लीकेट इमेज फ़ाइलों को डिस्क से स्थायी रूप से हटाना चाहते हैं?`,
      subMessage: 'यह क्रिया केवल अतिरिक्त (redundant) फाइलों को डिस्क से हटाएगी। मूल प्राथमिक फ़ाइल (Original Primary) सुरक्षित रहेगी और वेबसाइट पर कोई लिंक नहीं टूटेगा।',
      itemDetails: [
        { label: 'चयनित डुप्लीकेट फ़ाइलें', value: `${selectedPaths.size} फाइलें` },
        { label: 'मुक्त होने वाली डिस्क स्पेस', value: scanResult?.totalWastedFormatted || '0.00 MB' }
      ],
      actionType: 'diskFiles',
      payload: { removePaths: Array.from(selectedPaths) }
    });
  };

  // 3. Trigger confirmation for Duplicate Pages cleanup
  const handleConfirmPagesCleanup = () => {
    if (selectedPageIds.size === 0) {
      alert('कृपया हटाने हेतु कम से कम एक डुप्लीकेट पेज चुनें।');
      return;
    }

    setConfirmModalData({
      isOpen: true,
      title: 'डुप्लीकेट पेज हटाने की पुष्टि (Confirm Page Deletion)',
      message: `क्या आप वाकई चयनित ${selectedPageIds.size} डुप्लीकेट/कॉपी पेजों को हटाना चाहते हैं?`,
      subMessage: 'यह क्रिया केवल चयनित दोहरे या प्रतिलिपि पृष्ठों को CMS से हटाएगी। मूल पृष्ठ अप्रभावित रहेंगे।',
      itemDetails: [
        { label: 'चयनित डुप्लीकेट पेज', value: `${selectedPageIds.size} पृष्ठ` }
      ],
      actionType: 'pages',
      payload: { removePageIds: Array.from(selectedPageIds) }
    });
  };

  // ==========================================
  // EXECUTE CLEANUP ACTIONS (AFTER YES CLICK)
  // ==========================================
  const handleExecuteConfirmedAction = async () => {
    setCleaning(true);
    const storedToken = localStorage.getItem('dyd_admin_token');

    try {
      if (confirmModalData.actionType === 'multiPublish') {
        const res = await fetch('/api/admin/duplicates/unpublish-media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
          },
          body: JSON.stringify({
            url: confirmModalData.payload.url,
            targetLocations: confirmModalData.payload.targetLocations,
            confirm: true
          })
        });

        const data = await res.json();
        if (res.ok) {
          setCleanupSuccessMessage(data.message || 'अतिरिक्त प्रकाशन सफलतापूर्वक हटा दिए गए!');
          setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
          await runScan();
          if (onRefreshData) onRefreshData();
        } else {
          alert(data.error || 'अतिरिक्त प्रकाशन हटाने में त्रुटि।');
        }
      } else {
        // Disk files or pages cleanup
        const res = await fetch('/api/admin/duplicates/clean', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
          },
          body: JSON.stringify({
            removePaths: confirmModalData.payload?.removePaths || [],
            removePageIds: confirmModalData.payload?.removePageIds || [],
            confirm: true
          })
        });

        const data = await res.json();
        if (res.ok) {
          setCleanupSuccessMessage(data.message || 'डुप्लीकेट सफलतापूर्वक हटा दिए गए!');
          setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
          await runScan();
          if (onRefreshData) onRefreshData();
        } else {
          alert(data.error || 'हटाने में त्रुटि हुई।');
        }
      }
    } catch (err: any) {
      alert(`त्रुटि: ${err.message}`);
    } finally {
      setCleaning(false);
    }
  };

  // Filtered multi-published items
  const filteredMultiMedia = (scanResult?.multiPublishedMedia || []).filter((item) => {
    if (multiFilter === 'all') return true;
    return item.category === multiFilter;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'certificate':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Award className="w-3 h-3 text-amber-400" /> प्रमाण-पत्र (Certificate)
          </span>
        );
      case 'photo':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <User className="w-3 h-3 text-cyan-400" /> व्यक्तिगत फ़ोटो (Photo)
          </span>
        );
      case 'watch':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Watch className="w-3 h-3 text-emerald-400" /> थेरेपी वॉच (Watch)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-700/50 text-stone-300 border border-stone-600/40">
            <ImageIcon className="w-3 h-3 text-stone-400" /> मीडिया फ़ाइल
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
            <Copy className="w-6 h-6 text-amber-400" />
            <span>प्रमाण-पत्र, फ़ोटो एवं डुप्लीकेट क्लीनर (Certificate & Duplicate Manager)</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            मल्टी-पब्लिश प्रमाण-पत्र, दोहरी छवियाँ और डुप्लीकेट पेज सुरक्षित रूप से खोजें और हाँ/नहीं विकल्प के साथ हटाएं
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={runScan}
            disabled={loading || cleaning}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
            <span>पुनः स्कैन करें (Rescan)</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Success Banner */}
        {cleanupSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{cleanupSuccessMessage}</span>
            </div>
            <button
              onClick={() => setCleanupSuccessMessage(null)}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setActiveTab('multipublish')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'multipublish'
                ? 'bg-amber-950/30 border-amber-500/60 ring-2 ring-amber-500/20'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">मल्टी-पब्लिश प्रमाण-पत्र व फ़ोटो</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              {scanResult?.totalMultiPublishedCount ?? 0}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              अनेक पेजों/सेक्शनों में बार-बार प्रकाशित फ़ाइलें
            </p>
          </div>

          <div
            onClick={() => setActiveTab('images')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'images'
                ? 'bg-cyan-950/30 border-cyan-500/60 ring-2 ring-cyan-500/20'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">डिस्क पर डुप्लीकेट फाइल्स</span>
              <HardDrive className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-cyan-400">
              {scanResult?.totalDuplicateImages ?? 0} प्रतियां ({scanResult?.totalWastedFormatted ?? '0 MB'})
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              {scanResult?.duplicateImageGroups.length ?? 0} समरूप फाइल समूह (हटाने योग्य)
            </p>
          </div>

          <div
            onClick={() => setActiveTab('pages')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'pages'
                ? 'bg-purple-950/30 border-purple-500/60 ring-2 ring-purple-500/20'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">डुप्लीकेट / कॉपी पेज</span>
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {scanResult?.totalDuplicatePages ?? 0}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              अनावश्यक प्रतिलिपियाँ व दोहरे ड्राफ्ट
            </p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
          <div className="flex flex-wrap items-center bg-stone-950 border border-stone-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('multipublish')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'multipublish'
                  ? 'bg-amber-600 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              📜 मल्टी-पब्लिश फ़ोटो व सर्टिफिकेट ({scanResult?.totalMultiPublishedCount ?? 0})
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'images'
                  ? 'bg-amber-600 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🖼️ डिस्क डुप्लीकेट छवियाँ ({scanResult?.totalDuplicateImages ?? 0})
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'pages'
                  ? 'bg-amber-600 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              📄 डुप्लीकेट पेज ({scanResult?.totalDuplicatePages ?? 0})
            </button>
          </div>

          {/* Contextual Action Buttons */}
          {activeTab === 'images' && (
            <button
              type="button"
              onClick={handleConfirmDiskFilesCleanup}
              disabled={selectedPaths.size === 0 || cleaning}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              <span>चयनित डुप्लीकेट फ़ाइलें हटाएं ({selectedPaths.size})</span>
            </button>
          )}

          {activeTab === 'pages' && (
            <button
              type="button"
              onClick={handleConfirmPagesCleanup}
              disabled={selectedPageIds.size === 0 || cleaning}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              <span>चयनित डुप्लीकेट पेज हटाएं ({selectedPageIds.size})</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: MULTI-PUBLISHED CERTIFICATES & PHOTOS (USER FOCUS) */}
        {/* ========================================================================= */}
        {activeTab === 'multipublish' && (
          <div className="space-y-5">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>फ़िल्टर करें:</span>
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={() => setMultiFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      multiFilter === 'all'
                        ? 'bg-stone-800 text-amber-300 border border-amber-500/40'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    सभी ({scanResult?.multiPublishedMedia?.length ?? 0})
                  </button>
                  <button
                    onClick={() => setMultiFilter('certificate')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      multiFilter === 'certificate'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    📜 प्रमाण-पत्र ({scanResult?.multiPublishedMedia?.filter((m) => m.category === 'certificate').length ?? 0})
                  </button>
                  <button
                    onClick={() => setMultiFilter('photo')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      multiFilter === 'photo'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    👤 फ़ोटोज़ ({scanResult?.multiPublishedMedia?.filter((m) => m.category === 'photo').length ?? 0})
                  </button>
                  <button
                    onClick={() => setMultiFilter('watch')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      multiFilter === 'watch'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    ⌚ वॉचेस ({scanResult?.multiPublishedMedia?.filter((m) => m.category === 'watch').length ?? 0})
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-stone-400">
                सुरक्षा गारंटी: <span className="text-emerald-400 font-semibold">मूल प्राथमिक स्थान हमेशा सुरक्षित रहेगा</span>
              </div>
            </div>

            {/* List of multi-published items */}
            {filteredMultiMedia.length === 0 && !loading && (
              <div className="p-12 text-center rounded-3xl bg-stone-900/50 border border-stone-800">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-stone-200">
                  कोई मल्टी-पब्लिश आइटम नहीं मिला!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  सभी प्रमाण-पत्र व फ़ोटोज़ अपने सही स्थान पर एकल रूप से प्रकाशित हैं।
                </p>
              </div>
            )}

            {filteredMultiMedia.map((item, idx) => {
              const selectedLocs = selectedMultiLocations.get(item.url) || new Set();
              const isAllSelected = selectedLocs.size === item.duplicateLocations.length && item.duplicateLocations.length > 0;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-stone-900/90 border border-stone-800 p-5 space-y-4 hover:border-stone-700 transition"
                >
                  {/* Item Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-stone-950 border border-stone-800 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getCategoryBadge(item.category)}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/30">
                            {item.totalCount} जगह प्रकाशित (Multi-Published)
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-stone-100 font-mono">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-stone-400 font-mono truncate max-w-md">
                          {item.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => selectAllMultiForUrl(item, !isAllSelected)}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition"
                      >
                        {isAllSelected ? 'सभी अचयनित करें' : 'सभी अतिरिक्त चुनें'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmUnpublishItem(item)}
                        disabled={selectedLocs.size === 0 || cleaning}
                        className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition disabled:opacity-40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>अतिरिक्त हटाएं ({selectedLocs.size})</span>
                      </button>
                    </div>
                  </div>

                  {/* Primary Location (Safe) */}
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-500/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-md bg-emerald-950 text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          प्राथमिक मुख्य स्थान (Primary - यह सुरक्षित रहेगा)
                        </span>
                        <p className="text-xs font-semibold text-stone-200">
                          {item.primaryLocation.pageTitle}
                        </p>
                        <p className="text-[10px] text-stone-500 font-mono">
                          /pages/{item.primaryLocation.pageSlug} · {item.primaryLocation.type}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                      मूल प्रकाशन (Protected)
                    </span>
                  </div>

                  {/* Duplicate Locations List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        अतिरिक्त / दोहरे प्रकाशन स्थान ({item.duplicateLocations.length})
                      </span>
                      <span className="text-[11px] text-stone-500">
                        चेक करें और "अतिरिक्त हटाएं" दबाएं (हाँ/नहीं पुष्टि उपलब्ध होगी)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {item.duplicateLocations.map((dupLoc, locIdx) => {
                        const locKey = `${dupLoc.pageId}:::${dupLoc.type}:::${dupLoc.blockId || ''}`;
                        const isSelected = selectedLocs.has(locKey);

                        return (
                          <div
                            key={locIdx}
                            onClick={() => toggleMultiLocation(item.url, locKey)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition ${
                              isSelected
                                ? 'bg-red-950/30 border-red-500/40 text-stone-200'
                                : 'bg-stone-950/40 border-stone-800 text-stone-400'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by parent onClick
                                className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-stone-900 border-stone-700 cursor-pointer"
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-stone-200 truncate">
                                  {dupLoc.pageTitle}
                                </p>
                                <p className="text-[10px] text-stone-500 font-mono truncate">
                                  /pages/{dupLoc.pageSlug} · {dupLoc.type}{dupLoc.blockTitle ? ` · ${dupLoc.blockTitle}` : ''}
                                </p>
                              </div>
                            </div>

                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30 shrink-0 font-medium">
                              डुप्लीकेट
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DUPLICATE IMAGE FILES ON DISK */}
        {/* ========================================================================= */}
        {activeTab === 'images' && (
          <div className="space-y-4">
            {(!scanResult?.duplicateImageGroups || scanResult.duplicateImageGroups.length === 0) && !loading && (
              <div className="p-12 text-center rounded-3xl bg-stone-900/50 border border-stone-800">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-stone-200">
                  कोई डुप्लीकेट छवि नहीं मिली!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  आपकी वेबसाइट की सभी छवियाँ विशिष्ट (unique) हैं और कोई अनावश्यक दोहरी फ़ाइल मौजूद नहीं है।
                </p>
              </div>
            )}

            {scanResult?.duplicateImageGroups.map((group, gIdx) => (
              <div
                key={gIdx}
                className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                      {gIdx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-200 font-mono">
                        {group.primary.relPath}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        प्रत्येक फ़ाइल का आकार: <span className="text-amber-400 font-mono">{group.sizeFormatted}</span> ·{' '}
                        {group.duplicates.length + 1} प्रतियां पाई गईं
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                    {group.duplicates.length} डुप्लीकेट हटाने योग्य
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Primary Version (Kept Safe) */}
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-500/30 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-stone-900 overflow-hidden shrink-0 border border-stone-800 flex items-center justify-center">
                      <img
                        src={group.primary.url}
                        alt="Primary"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-1">
                        <ShieldCheck className="w-3 h-3" /> मूल (Original) · सुरक्षित रखी जाएगी
                      </span>
                      <p className="text-xs text-stone-200 font-mono truncate" title={group.primary.relPath}>
                        {group.primary.relPath}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">प्राथमिक स्रोत फ़ाइल</p>
                    </div>
                  </div>

                  {/* Redundant Duplicates (Can be removed) */}
                  <div className="space-y-2">
                    {group.duplicates.map((dup, dIdx) => {
                      const isSelected = selectedPaths.has(dup.relPath);
                      return (
                        <div
                          key={dIdx}
                          onClick={() => togglePathSelection(dup.relPath)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition ${
                            isSelected
                              ? 'bg-red-950/30 border-red-500/50 text-stone-200'
                              : 'bg-stone-950/60 border-stone-800 text-stone-400'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // handled by parent onClick
                              className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-stone-900 border-stone-700 cursor-pointer"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30 inline-block mb-0.5">
                                डुप्लीकेट (Duplicate)
                              </span>
                              <p className="text-xs font-mono truncate" title={dup.relPath}>
                                {dup.relPath}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-stone-500 shrink-0">
                            {(dup.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DUPLICATE PAGES LIST */}
        {/* ========================================================================= */}
        {activeTab === 'pages' && (
          <div className="space-y-4">
            {(!scanResult?.duplicatePages || scanResult.duplicatePages.length === 0) && !loading && (
              <div className="p-12 text-center rounded-3xl bg-stone-900/50 border border-stone-800">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-stone-200">
                  कोई डुप्लीकेट या कॉपी पेज नहीं मिला!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  सभी पृष्ठों के URL स्लग विशिष्ट और प्रामाणिक हैं।
                </p>
              </div>
            )}

            {scanResult?.duplicatePages.map((page) => {
              const isSelected = selectedPageIds.has(page.id);
              return (
                <div
                  key={page.id}
                  onClick={() => togglePageSelection(page.id)}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition ${
                    isSelected
                      ? 'bg-red-950/30 border-red-500/50'
                      : 'bg-stone-900/80 border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-stone-900 border-stone-700 cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30">
                          {page.reason}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">
                          /pages/{page.slug}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-200 truncate">
                        {page.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs text-stone-400 capitalize px-2 py-1 rounded bg-stone-950 border border-stone-800">
                    {page.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* UNIVERSAL YES / NO CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <ConfirmDeleteModal
        isOpen={confirmModalData.isOpen}
        title={confirmModalData.title}
        message={confirmModalData.message}
        subMessage={confirmModalData.subMessage}
        itemDetails={confirmModalData.itemDetails}
        confirmText="हाँ, हटाएं (Yes, Delete/Unpublish)"
        cancelText="नहीं, रद्द करें (No, Cancel)"
        isDestructive={true}
        loading={cleaning}
        onConfirm={handleExecuteConfirmedAction}
        onCancel={() => setConfirmModalData((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
