import React, { useState, useEffect } from 'react';
import { CMSPage, PageBlock, PageBlockType, CMSMediaItem } from '../../types';
import { savePage, deletePage, getPageBySlug, uploadMediaItem } from '../../lib/cmsService';
import { MediaLibrary } from './MediaLibrary';
import {
  ArrowLeft,
  Save,
  Globe,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Image as ImageIcon,
  Video,
  FileText,
  Heading,
  List,
  Sparkles,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Layers,
  Settings,
  Sliders,
  Type,
  X,
  CreditCard,
  Minus,
  Smartphone,
  Tablet,
  Monitor,
  Search,
  Share2,
  Upload,
  Play,
  Bold,
  Italic,
  ListOrdered,
  Quote,
  Check,
  RefreshCw,
  ZoomIn
} from 'lucide-react';

interface PageBuilderProps {
  initialPage?: CMSPage | null;
  onBack: () => void;
  onPageSaved: (savedPage: CMSPage) => void;
  onViewLive: (slug: string) => void;
}

// Video embed converter helper
export const getEmbedVideoUrl = (url?: string): string | null => {
  if (!url) return null;
  const clean = url.trim();
  const ytMatch = clean.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = clean.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return null;
};

export const PageBuilder: React.FC<PageBuilderProps> = ({
  initialPage,
  onBack,
  onPageSaved,
  onViewLive
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Core Page Data
  const [pageId, setPageId] = useState<string>(initialPage?.id || '');
  const [title, setTitle] = useState(initialPage?.title || '');
  const [titleHi, setTitleHi] = useState(initialPage?.titleHi || '');
  const [slug, setSlug] = useState(initialPage?.slug || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialPage?.status || 'draft');
  const [seoTitle, setSeoTitle] = useState(initialPage?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPage?.seoDescription || '');
  const [focusKeywords, setFocusKeywords] = useState(initialPage?.focusKeywords || '');
  const [ogImage, setOgImage] = useState(initialPage?.ogImage || '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialPage?.canonicalUrl || '');
  const [noIndex, setNoIndex] = useState(initialPage?.noIndex ?? false);
  const [inSitemap, setInSitemap] = useState(initialPage?.inSitemap ?? true);
  const [changefreq, setChangefreq] = useState<CMSPage['changefreq']>(initialPage?.changefreq || 'weekly');
  const [priority, setPriority] = useState<number>(initialPage?.priority ?? 0.8);
  const [showInNav, setShowInNav] = useState(initialPage?.showInNav ?? false);
  const [navOrder, setNavOrder] = useState<number>(initialPage?.navOrder ?? 0);

  // Text preview mode (per text block id)
  const [textPreviewMode, setTextPreviewMode] = useState<Record<string, 'edit' | 'preview'>>({});
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);

  // Blocks
  const [blocks, setBlocks] = useState<PageBlock[]>(
    initialPage?.blocks && initialPage.blocks.length > 0
      ? initialPage.blocks
      : [
          {
            id: `block_hero_${Date.now()}`,
            type: 'hero',
            title: 'Your Page Headline / मुख्य शीर्षक',
            subtitle: 'Compelling spiritual or numerological subtitle',
            imageUrl: '/Certificate Celebration Ceremony.png',
            buttonText: 'Book Divine Consultation / परामर्श बुक करें',
            buttonLink: '#tariff',
            buttonStyle: 'primary'
          },
          {
            id: `block_text_${Date.now()}`,
            type: 'text',
            content:
              'Write your in-depth content here. You can add paragraphs, Vedic wisdom, explanations, and details.'
          }
        ]
  );

  // Media picker modal state (supports block, field, and gallery index)
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{
    blockId: string;
    field: 'imageUrl' | 'videoUrl' | 'gallery';
    galleryIndex?: number;
  } | null>(null);

  // Auto-generate slug when title changes (if new page)
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!initialPage) {
      const generatedSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  // Block Manipulation
  const handleAddBlock = (type: PageBlockType) => {
    const newBlock: PageBlock = {
      id: `block_${type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type
    };

    switch (type) {
      case 'hero':
        newBlock.title = 'New Hero Headline / मुख्य बैनर';
        newBlock.subtitle = 'Subtitle describing this section';
        newBlock.imageUrl = '/Certificate Celebration Ceremony.png';
        newBlock.buttonText = 'Take Action / परामर्श लें';
        newBlock.buttonLink = '#tariff';
        newBlock.buttonStyle = 'primary';
        break;
      case 'heading':
        newBlock.title = 'Key Section Heading / मुख्य हेडिंग';
        newBlock.subtitle = 'Optional context or Hindi translation';
        break;
      case 'text':
        newBlock.content = 'Enter your detailed article text, instructions, or divine guidance.';
        break;
      case 'image':
        newBlock.imageUrl = '/Certificate Celebration Ceremony.png';
        newBlock.imageAlt = 'Descriptive Alt Tag';
        newBlock.title = 'Image Caption';
        newBlock.alignment = 'center';
        break;
      case 'gallery':
        newBlock.title = 'Visual Gallery / फोटो गैलरी';
        newBlock.columns = 3;
        newBlock.images = [
          { url: '/Certificate Celebration Ceremony.png', caption: 'Convocation Ceremony' },
          { url: '/Randhir Singh.png', caption: 'Portrait of Randhir Singh' }
        ];
        break;
      case 'video':
        newBlock.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        newBlock.videoCaption = 'Watch Masterclass Video';
        break;
      case 'list':
        newBlock.title = '3-Column Features & Highlights / मुख्य विशेषताएँ';
        newBlock.items = [
          { title: '1. Date of Birth Analysis', description: 'Examining Driver & Conductor numbers' },
          { title: '2. Watch Therapy Diagnostics', description: 'Assessing timepiece dial shape and vibration' },
          { title: '3. Customized Vedic Remedies', description: 'Personalized gemstone, salt cleansing and yantras' }
        ];
        break;
      case 'button':
        newBlock.title = 'Consult Directly with Randhir Singh';
        newBlock.buttonText = 'WhatsApp +91 95095 93150';
        newBlock.buttonLink = 'https://wa.me/919509593150';
        newBlock.buttonStyle = 'whatsapp';
        break;
      case 'quote':
        newBlock.title = '॥ ॐ श्री गणेशाय नमः ॥';
        newBlock.content = '“संख्यात्मकं हि जगत् सर्वं, ग्रहाणां गति बोधकम्।” — Numbers are the cosmic language through which destiny reveals itself.';
        break;
      case 'booking-card':
        newBlock.title = 'Personalized Vedic Consultation / व्यक्तिगत परामर्श';
        newBlock.subtitle = 'Date of Birth, Watch Therapy & Pranic Energy Remedies';
        newBlock.price = '₹5,100';
        newBlock.duration = '45-60 Minutes (Online / Jaipur Clinic)';
        newBlock.buttonText = 'Book Slot / अभी स्लॉट बुक करें';
        break;
      case 'divider':
        newBlock.title = '॥ ॐ ॥';
        break;
    }

    setBlocks([...blocks, newBlock]);
  };

  const handleUpdateBlock = (id: string, updates: Partial<PageBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIndex, 0, moved);
    setBlocks(newBlocks);
  };

  const handleDuplicateBlock = (index: number) => {
    const original = blocks[index];
    const clone: PageBlock = {
      ...JSON.parse(JSON.stringify(original)),
      id: `block_${original.type}_${Date.now()}`
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, clone);
    setBlocks(newBlocks);
  };

  // Direct File Upload from within Block (Photos & Videos)
  const handleDirectFileUpload = async (
    file: File,
    blockId: string,
    field: 'imageUrl' | 'videoUrl' | 'gallery',
    galleryIndex?: number
  ) => {
    if (!file) return;
    setUploadingBlockId(blockId);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const isVideo = file.type.startsWith('video/') || Boolean(file.name.match(/\.(mp4|webm|mov)$/i));
        const uploaded = await uploadMediaItem({
          fileName: file.name,
          fileData: base64Data,
          type: isVideo ? 'video' : 'image',
          alt: file.name.replace(/\.[^/.]+$/, ''),
          caption: `Uploaded from Page Builder: ${file.name}`
        });

        if (uploaded && uploaded.url) {
          if (field === 'gallery' && galleryIndex !== undefined) {
            const blk = blocks.find((b) => b.id === blockId);
            if (blk && blk.images) {
              const newImgs = [...blk.images];
              newImgs[galleryIndex] = {
                ...newImgs[galleryIndex],
                url: uploaded.url,
                caption: newImgs[galleryIndex]?.caption || file.name.replace(/\.[^/.]+$/, '')
              };
              handleUpdateBlock(blockId, { images: newImgs });
            }
          } else {
            handleUpdateBlock(blockId, { [field]: uploaded.url });
          }
        }
        setUploadingBlockId(null);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Direct file upload error:', err);
      setUploadingBlockId(null);
    }
  };

  // Rich Text Quick Formatter
  const applyTextFormatting = (
    blockId: string,
    format: 'bold' | 'italic' | 'h2' | 'h3' | 'bullet' | 'number' | 'quote' | 'divider' | 'om'
  ) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;
    const current = block.content || '';
    let updated = current;
    switch (format) {
      case 'bold':
        updated = current ? `${current} **महत्वपूर्ण**` : '**महत्वपूर्ण शब्द**';
        break;
      case 'italic':
        updated = current ? `${current} *विशेष*` : '*विशेष शब्द*';
        break;
      case 'h2':
        updated = current ? `${current}\n\n## मुख्य उप-शीर्षक (H2)\n` : '## मुख्य उप-शीर्षक\n';
        break;
      case 'h3':
        updated = current ? `${current}\n\n### उप-बिंदु (H3)\n` : '### उप-बिंदु\n';
        break;
      case 'bullet':
        updated = current ? `${current}\n• बिंदु 1\n• बिंदु 2\n• बिंदु 3` : '• बिंदु 1\n• बिंदु 2\n• बिंदु 3';
        break;
      case 'number':
        updated = current ? `${current}\n1. पहला चरण\n2. दूसरा चरण\n3. तीसरा चरण` : '1. पहला चरण\n2. दूसरा चरण\n3. तीसरा चरण';
        break;
      case 'quote':
        updated = current
          ? `${current}\n\n> "पवित्र विचार एवं आध्यात्मिक परामर्श जीवन को नई दिशा देते हैं।"\n`
          : '> "पवित्र विचार एवं आध्यात्मिक परामर्श जीवन को नई दिशा देते हैं।"\n';
        break;
      case 'divider':
        updated = current ? `${current}\n\n---\n\n` : '---\n';
        break;
      case 'om':
        updated = current ? `${current} ॐ ` : 'ॐ नमः शिवाय ';
        break;
    }
    handleUpdateBlock(blockId, { content: updated });
  };

  // Save logic
  const handleSave = async (publishNow?: boolean) => {
    if (!title.trim()) {
      setError('कृपया पेज का शीर्षक (Title) दर्ज करें।');
      return;
    }
    if (!slug.trim()) {
      setError('कृपया पेज का URL स्लग (Slug) दर्ज करें।');
      return;
    }

    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    const finalStatus = publishNow !== undefined ? (publishNow ? 'published' : 'draft') : status;

    const pagePayload: Partial<CMSPage> & { title: string; slug: string } = {
      id: pageId || undefined,
      title: title.trim(),
      titleHi: titleHi.trim(),
      slug: slug.trim().toLowerCase(),
      status: finalStatus,
      category: initialPage?.category,
      sectionId: initialPage?.sectionId,
      isSystemPage: initialPage?.isSystemPage,
      featuredImage: initialPage?.featuredImage,
      description: initialPage?.description,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim(),
      focusKeywords: focusKeywords.trim(),
      ogImage: ogImage.trim(),
      canonicalUrl: canonicalUrl.trim(),
      noIndex,
      inSitemap,
      changefreq,
      priority: Number(priority) || 0.8,
      blocks,
      showInNav,
      navOrder: Number(navOrder) || 0
    };

    try {
      const saved = await savePage(pagePayload);
      setPageId(saved.id);
      setStatus(saved.status);
      setSaveSuccess(true);
      onPageSaved(saved);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'पेज सेव करने में त्रुटि हुई।');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top Builder Header */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
            title="डैशबोर्ड पर वापस जाएं"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-bold text-stone-100 truncate max-w-[200px] sm:max-w-md">
                {title || 'नया डायनामिक पेज'}
              </h1>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  status === 'published'
                    ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                    : 'bg-amber-950 border border-amber-500/40 text-amber-300'
                }`}
              >
                {status === 'published' ? 'प्रकाशित (Live)' : 'ड्राफ्ट (Draft)'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono">
              /pages/{slug || 'url-slug'}
            </p>
          </div>
        </div>

        {/* Builder View Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'content'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> ब्लॉक्स एडिटर
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'seo'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> SEO व Google स्निपेट
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'preview'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> लाइव प्रीव्यू
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {status === 'published' && slug && (
            <button
              onClick={() => onViewLive(slug)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> लाइव देखें
            </button>
          )}

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-3 sm:px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs transition cursor-pointer"
          >
            ड्राफ्ट सहेजें
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition shadow-md shadow-amber-900/40 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{saving ? 'प्रकाशित हो रहा है...' : 'लाइव प्रकाशित करें'}</span>
          </button>
        </div>
      </header>

      {/* Notifications Bar */}
      {saveSuccess && (
        <div className="bg-emerald-950 border-b border-emerald-800 px-6 py-2 text-xs text-emerald-300 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          पेज सफलतापूर्वक सहेजा गया और सर्वर पर अपडेट हो गया!
        </div>
      )}
      {error && (
        <div className="bg-red-950 border-b border-red-800 px-6 py-2 text-xs text-red-300 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          {error}
        </div>
      )}

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-stone-800 bg-stone-950 text-xs font-medium">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2.5 text-center border-b-2 ${
            activeTab === 'content'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400'
          }`}
        >
          ब्लॉक्स
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex-1 py-2.5 text-center border-b-2 ${
            activeTab === 'seo'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400'
          }`}
        >
          SEO व स्निपेट
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2.5 text-center border-b-2 ${
            activeTab === 'preview'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400'
          }`}
        >
          प्रीव्यू
        </button>
      </div>

      {/* Main Tab Views */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* TAB 1: BLOCKS EDITOR */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Title & Slug Header Card */}
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  पेज का मुख्य शीर्षक (Title - English) *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Vedic Watch Therapy Mastery"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  पेज का हिन्दी शीर्षक (Title - Hindi)
                </label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  placeholder="e.g., वैदिक कलाई घड़ी विश्लेषण एवं उपचार"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Blocks List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  सामग्री ब्लॉक्स ({blocks.length} Blocks)
                </h3>
                <span className="text-xs text-stone-500">
                  तीर के निशान (▲ / ▼) से ब्लॉक्स का क्रम बदलें
                </span>
              </div>

              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm space-y-4 relative group"
                >
                  {/* Block Header */}
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-stone-800 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-600/30 text-xs font-semibold uppercase">
                        {block.type === 'hero' && '🌟 मुख्य बैनर (Hero)'}
                        {block.type === 'heading' && '📝 हेडिंग (Heading)'}
                        {block.type === 'text' && '📝 लेख (Rich Text)'}
                        {block.type === 'image' && '🖼️ एकल चित्र (Photo)'}
                        {block.type === 'gallery' && '🗂️ फोटो गैलरी (Grid)'}
                        {block.type === 'video' && '🎬 वीडियो प्लेयर (Video)'}
                        {(block.type === 'list' || block.type === 'features') && '📋 3 स्तम्भ विशेषताएँ (Features)'}
                        {block.type === 'button' && '🔘 एक्शन बटन (CTA)'}
                        {block.type === 'quote' && '🕉️ वैदिक मंत्र / उद्धरण (Mantra)'}
                        {(block.type === 'booking-card' || block.type === 'consultation') && '💳 परामर्श बुकिंग कार्ड'}
                        {block.type === 'divider' && '⚜️ वैदिक विभाजक (Divider)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 transition cursor-pointer"
                        title="ऊपर ले जाएं (Move Up ▲)"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveBlock(index, 'down')}
                        disabled={index === blocks.length - 1}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 transition cursor-pointer"
                        title="नीचे ले जाएं (Move Down ▼)"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateBlock(index)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                        title="प्रतिलिपि बनाएं (Duplicate / Clone)"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlock(block.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition cursor-pointer"
                        title="ब्लॉक हटाएं (Delete)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* BLOCK FORM FIELDS ACCORDING TO TYPE */}
                  {/* 1. Hero Block */}
                  {block.type === 'hero' && (
                    <div className="space-y-4">
                      {/* Live Image Preview & Upload Card */}
                      <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span>हीरो पृष्ठभूमि चित्र (Hero Background Image)</span>
                          </label>
                          {block.imageUrl && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full font-medium">
                              ✓ चित्र सक्रिय (Image Active)
                            </span>
                          )}
                        </div>

                        {block.imageUrl ? (
                          <div className="flex flex-col sm:flex-row items-center gap-3 bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                            <div className="w-28 h-20 rounded-lg bg-black border border-stone-700 overflow-hidden shrink-0 shadow-md">
                              <img
                                src={block.imageUrl}
                                alt={block.imageAlt || block.title || 'Hero Preview'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-left w-full sm:w-auto">
                              <p className="text-xs font-mono text-stone-200 truncate">{block.imageUrl}</p>
                              <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                                {block.title || 'Hero Banner Headline'}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <button
                                  type="button"
                                  onClick={() => setMediaPickerTarget({ blockId: block.id, field: 'imageUrl' })}
                                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium cursor-pointer border border-stone-700"
                                >
                                  लाइब्रेरी से बदलें
                                </button>
                                <label className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold cursor-pointer inline-flex items-center gap-1 shadow-sm">
                                  <Upload className="w-3 h-3" />
                                  <span>नया अपलोड</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleDirectFileUpload(e.target.files[0], block.id, 'imageUrl');
                                      }
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBlock(block.id, { imageUrl: '' })}
                                  className="px-2 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs cursor-pointer"
                                >
                                  हटाएं
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-stone-900/60 rounded-xl border border-dashed border-stone-700 text-center sm:text-left">
                            <div className="text-xs text-stone-400">
                              <span className="font-bold text-stone-300 block mb-0.5">कोई चित्र चयनित नहीं है</span>
                              <span>मीडिया लाइब्रेरी से चुनें अथवा सीधे अपने कम्प्यूटर से फोटो अपलोड करें</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ blockId: block.id, field: 'imageUrl' })}
                                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium cursor-pointer"
                              >
                                मीडिया लाइब्रेरी
                              </button>
                              <label className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold cursor-pointer flex items-center gap-1">
                                <Upload className="w-3.5 h-3.5" />
                                <span>अपलोड करें</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleDirectFileUpload(e.target.files[0], block.id, 'imageUrl');
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { imageUrl: e.target.value })}
                            placeholder="सीधा इमेज URL दर्ज करें (जैसे /assets/... या https://...)"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">मुख्य शीर्षक (Headline)</label>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">उप-शीर्षक (Subheadline)</label>
                        <input
                          type="text"
                          value={block.subtitle || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">एक्शन बटन लेबल (CTA Button Text)</label>
                          <input
                            type="text"
                            value={block.buttonText || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { buttonText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">बटन लिंक URL (Link URL)</label>
                          <input
                            type="text"
                            value={block.buttonLink || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { buttonLink: e.target.value })}
                            placeholder="#tariff या /contact"
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. Heading Block */}
                  {block.type === 'heading' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">सेक्शन हेडिंग (Heading Text)</label>
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 font-serif"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">उप-शीर्षक (Subtitle / Translation)</label>
                          <input
                            type="text"
                            value={block.subtitle || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span>अलाइनमेंट:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateBlock(block.id, { alignment: 'center' })}
                            className={`px-2.5 py-1 rounded text-xs cursor-pointer ${
                              (block.alignment || 'center') === 'center'
                                ? 'bg-amber-600 text-white font-bold'
                                : 'bg-stone-800 text-stone-300'
                            }`}
                          >
                            केंद्रित (Center)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateBlock(block.id, { alignment: 'left' })}
                            className={`px-2.5 py-1 rounded text-xs cursor-pointer ${
                              block.alignment === 'left'
                                ? 'bg-amber-600 text-white font-bold'
                                : 'bg-stone-800 text-stone-300'
                            }`}
                          >
                            बायाँ (Left)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Text Block with Rich Formatting Toolbar & Live Preview */}
                  {block.type === 'text' && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                        <label className="text-xs text-stone-300 font-semibold flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>विस्तृत लेख व विवरण संपादक (Text & Content Editor)</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-stone-400 font-mono">
                            {(block.content || '').trim().split(/\s+/).filter(Boolean).length} शब्द · {(block.content || '').length} अक्षर
                          </span>
                          <div className="flex bg-stone-900 rounded-lg p-0.5 border border-stone-800 text-[11px]">
                            <button
                              type="button"
                              onClick={() =>
                                setTextPreviewMode((prev) => ({ ...prev, [block.id]: 'edit' }))
                              }
                              className={`px-2 py-0.5 rounded cursor-pointer ${
                                (textPreviewMode[block.id] || 'edit') === 'edit'
                                  ? 'bg-amber-600 text-white font-bold'
                                  : 'text-stone-400 hover:text-stone-200'
                              }`}
                            >
                              एडिटर (Edit)
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setTextPreviewMode((prev) => ({ ...prev, [block.id]: 'preview' }))
                              }
                              className={`px-2 py-0.5 rounded cursor-pointer ${
                                textPreviewMode[block.id] === 'preview'
                                  ? 'bg-amber-600 text-white font-bold'
                                  : 'text-stone-400 hover:text-stone-200'
                              }`}
                            >
                              प्रिव्यू (Preview)
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Formatting Toolbar */}
                      {(textPreviewMode[block.id] || 'edit') === 'edit' && (
                        <div className="flex flex-wrap items-center gap-1 p-1.5 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300">
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'bold')}
                            className="p-1.5 rounded hover:bg-stone-800 text-stone-200 cursor-pointer font-bold"
                            title="Bold (**बोल्ड**)"
                          >
                            <Bold className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'italic')}
                            className="p-1.5 rounded hover:bg-stone-800 text-stone-200 cursor-pointer italic"
                            title="Italic (*इटैलिक*)"
                          >
                            <Italic className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-[1px] h-4 bg-stone-700 mx-1" />
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'h2')}
                            className="px-2 py-1 rounded hover:bg-stone-800 text-[11px] font-bold text-amber-300 cursor-pointer"
                            title="Heading 2 (##)"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'h3')}
                            className="px-2 py-1 rounded hover:bg-stone-800 text-[11px] font-bold text-amber-300 cursor-pointer"
                            title="Heading 3 (###)"
                          >
                            H3
                          </button>
                          <div className="w-[1px] h-4 bg-stone-700 mx-1" />
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'bullet')}
                            className="p-1.5 rounded hover:bg-stone-800 text-stone-200 cursor-pointer"
                            title="Bullet List (• सूची)"
                          >
                            <List className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'number')}
                            className="p-1.5 rounded hover:bg-stone-800 text-stone-200 cursor-pointer"
                            title="Numbered List (1. 2. 3.)"
                          >
                            <ListOrdered className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'quote')}
                            className="p-1.5 rounded hover:bg-stone-800 text-stone-200 cursor-pointer"
                            title="Quote (> उद्धरण)"
                          >
                            <Quote className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'divider')}
                            className="px-2 py-1 rounded hover:bg-stone-800 text-[11px] text-stone-300 cursor-pointer"
                            title="Divider Line (---)"
                          >
                            विभाजक (---)
                          </button>
                          <div className="w-[1px] h-4 bg-stone-700 mx-1" />
                          <button
                            type="button"
                            onClick={() => applyTextFormatting(block.id, 'om')}
                            className="px-2 py-1 rounded bg-amber-950/70 hover:bg-amber-900 text-amber-300 text-xs font-bold cursor-pointer border border-amber-600/40"
                            title="पवित्र ॐ प्रतीक डालें"
                          >
                            ॐ
                          </button>
                        </div>
                      )}

                      {/* Textarea or Formatted Preview */}
                      {(textPreviewMode[block.id] || 'edit') === 'edit' ? (
                        <textarea
                          rows={7}
                          value={block.content || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                          placeholder="शास्त्रीय विवरण, उपाय या लेख दर्ज करें... (हिन्दी एवं English दोनों लिख सकते हैं)"
                          className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 leading-relaxed focus:border-amber-500 outline-none font-sans"
                        />
                      ) : (
                        <div className="p-4 rounded-xl bg-stone-950 border border-amber-400/40 min-h-[160px] text-sm text-stone-200 leading-relaxed space-y-2 whitespace-pre-wrap">
                          {block.content ? (
                            block.content
                          ) : (
                            <span className="text-stone-500 italic">यहाँ कोई सामग्री दर्ज नहीं की गई है...</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. Single Image Block with Live Visual Card & Instant Upload */}
                  {block.type === 'image' && (
                    <div className="space-y-3 p-3.5 bg-stone-950 rounded-xl border border-stone-800">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                          <span>चित्र प्रबंधन (Image Asset Manager)</span>
                        </label>
                        {block.imageUrl && (
                          <span className="text-[10px] text-emerald-400 font-mono font-medium">
                            सक्रिय URL
                          </span>
                        )}
                      </div>

                      {/* Live Image Preview Card */}
                      {block.imageUrl ? (
                        <div className="flex flex-col sm:flex-row items-center gap-3 bg-stone-900/90 p-3 rounded-xl border border-stone-700">
                          <div className="w-24 sm:w-32 aspect-video sm:aspect-square rounded-lg bg-black border border-stone-700 overflow-hidden shrink-0 flex items-center justify-center shadow-md">
                            <img
                              src={block.imageUrl}
                              alt={block.imageAlt || 'Preview'}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left w-full sm:w-auto">
                            <span className="text-xs font-mono text-stone-200 block truncate">{block.imageUrl}</span>
                            <span className="text-[11px] text-stone-400 block mt-0.5 truncate">
                              कैप्शन: {block.title || 'शीर्षक रहित'}
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2.5">
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ blockId: block.id, field: 'imageUrl' })}
                                className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium cursor-pointer border border-stone-700"
                              >
                                मीडिया से बदलें
                              </button>
                              <label className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold cursor-pointer inline-flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                <span>नया अपलोड</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleDirectFileUpload(e.target.files[0], block.id, 'imageUrl');
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => handleUpdateBlock(block.id, { imageUrl: '' })}
                                className="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs cursor-pointer"
                              >
                                हटाएं
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-stone-900/60 rounded-xl border border-dashed border-stone-700 text-center sm:text-left">
                          <div className="text-xs text-stone-400">
                            <span className="font-bold text-stone-300 block mb-0.5">कोई फोटो नहीं चुनी गई है</span>
                            <span>कम्प्यूटर से अपलोड करें या मीडिया लाइब्रेरी से चुनें</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ blockId: block.id, field: 'imageUrl' })}
                              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium cursor-pointer"
                            >
                              मीडिया लाइब्रेरी
                            </button>
                            <label className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold cursor-pointer flex items-center gap-1">
                              <Upload className="w-3.5 h-3.5" />
                              <span>फ़ोटो अपलोड</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDirectFileUpload(e.target.files[0], block.id, 'imageUrl');
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-xs text-stone-400 mb-1">चित्र URL (Image URL)</label>
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { imageUrl: e.target.value })}
                            placeholder="/assets/... या https://..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">ऑल्ट टैग (SEO Alt)</label>
                          <input
                            type="text"
                            value={block.imageAlt || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { imageAlt: e.target.value })}
                            placeholder="सटीक फोटो विवरण"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">चित्र कैप्शन (Caption)</label>
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            placeholder="फोटो के नीचे दिखने वाला कैप्शन"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">संरेखण (Alignment)</label>
                          <select
                            value={block.alignment || 'center'}
                            onChange={(e) => handleUpdateBlock(block.id, { alignment: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          >
                            <option value="center">केंद्रित (Centered - Max 800px)</option>
                            <option value="full">पूर्ण चौड़ाई (Full Width Container)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Gallery Block with Photo Previews & Per-Image Pickers */}
                  {block.type === 'gallery' && (
                    <div className="space-y-4 p-3.5 bg-stone-950 rounded-xl border border-stone-800">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-amber-400" />
                          <span>फोटो गैलरी प्रबंधक (Photo Gallery Manager)</span>
                        </label>
                        <span className="text-[10px] text-amber-400 bg-amber-950/70 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
                          {(block.images || []).length} चित्र शामिल
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">दीर्घा शीर्षक (Gallery Title)</label>
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1">कॉलम संख्या (Columns Layout)</label>
                          <select
                            value={block.columns || 3}
                            onChange={(e) => handleUpdateBlock(block.id, { columns: Number(e.target.value) as any })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                          >
                            <option value={2}>2 कॉलम ग्रिड</option>
                            <option value={3}>3 कॉलम ग्रिड</option>
                            <option value={4}>4 कॉलम ग्रिड</option>
                          </select>
                        </div>
                      </div>

                      {/* Individual Gallery Images List */}
                      <div className="space-y-2.5">
                        <label className="block text-xs text-stone-400">दीर्घा के चित्र (Gallery Photos):</label>
                        {(block.images || []).map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-center gap-2.5"
                          >
                            {/* Photo Thumbnail */}
                            <div className="w-16 h-16 rounded-lg bg-black border border-stone-700 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                              {img.url ? (
                                <img src={img.url} alt={img.caption || 'Gallery photo'} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-6 h-6 text-stone-600" />
                              )}
                            </div>

                            {/* Inputs */}
                            <div className="flex-1 w-full space-y-1.5">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={img.url}
                                  onChange={(e) => {
                                    const newImgs = [...(block.images || [])];
                                    newImgs[imgIdx] = { ...newImgs[imgIdx], url: e.target.value };
                                    handleUpdateBlock(block.id, { images: newImgs });
                                  }}
                                  placeholder="Image URL"
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMediaPickerTarget({
                                      blockId: block.id,
                                      field: 'gallery',
                                      galleryIndex: imgIdx
                                    })
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] shrink-0 font-medium cursor-pointer"
                                  title="मीडिया से चुनें"
                                >
                                  मीडिया
                                </button>
                                <label className="px-2 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-[11px] font-bold cursor-pointer shrink-0 inline-flex items-center gap-1">
                                  <Upload className="w-3 h-3" />
                                  <span>अपलोड</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleDirectFileUpload(e.target.files[0], block.id, 'gallery', imgIdx);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              <input
                                type="text"
                                value={img.caption || ''}
                                onChange={(e) => {
                                  const newImgs = [...(block.images || [])];
                                  newImgs[imgIdx] = { ...newImgs[imgIdx], caption: e.target.value };
                                  handleUpdateBlock(block.id, { images: newImgs });
                                }}
                                placeholder="कैप्शन (Caption / विवरण)"
                                className="w-full px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const newImgs = (block.images || []).filter((_, i) => i !== imgIdx);
                                handleUpdateBlock(block.id, { images: newImgs });
                              }}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer self-end sm:self-center"
                              title="फोटो हटाएं"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = [
                              ...(block.images || []),
                              { url: '/Certificate Celebration Ceremony.png', caption: 'नया चित्र' }
                            ];
                            handleUpdateBlock(block.id, { images: newImgs });
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-1 cursor-pointer font-medium p-2 rounded-xl bg-stone-900 border border-dashed border-stone-700 w-full justify-center hover:bg-stone-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> गैलरी में नई फोटो जोड़ें (Add Photo to Gallery)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 6. Video Block with Embedded Player & Direct Upload */}
                  {block.type === 'video' && (() => {
                    const embedUrl = getEmbedVideoUrl(block.videoUrl);
                    const isDirectVideo =
                      block.videoUrl?.match(/\.(mp4|webm|mov)$/i) || block.videoUrl?.includes('/uploads/');

                    return (
                      <div className="space-y-4 p-3.5 bg-stone-950 rounded-xl border border-stone-800">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5 text-amber-400" />
                            <span>वीडियो प्लेयर प्रबंधन (Video Player Manager)</span>
                          </label>
                          {block.videoUrl && (
                            <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span>वीडियो सक्रिय</span>
                            </span>
                          )}
                        </div>

                        {/* Live Responsive Video Player Preview */}
                        <div className="bg-stone-900 rounded-xl p-3 border border-stone-800">
                          <span className="text-[11px] text-stone-400 font-semibold mb-2 block">
                            लाइव प्लेयर प्रिव्यू (Live Embedded Player Preview):
                          </span>
                          {embedUrl ? (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-stone-700 shadow-md">
                              <iframe
                                src={embedUrl}
                                title={block.videoCaption || 'Video Preview'}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : isDirectVideo && block.videoUrl ? (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-stone-700 shadow-md">
                              <video controls className="w-full h-full object-contain">
                                <source src={block.videoUrl} />
                                Your browser does not support HTML5 video.
                              </video>
                            </div>
                          ) : (
                            <div className="aspect-video w-full rounded-lg bg-stone-950 border border-dashed border-stone-800 flex flex-col items-center justify-center p-4 text-center">
                              <Play className="w-8 h-8 text-amber-500/70 mb-2" />
                              <span className="text-xs font-bold text-stone-300">
                                यूट्यूब / विमियो अथवा MP4 वीडियो URL दर्ज करें
                              </span>
                              <span className="text-[11px] text-stone-500 mt-1 max-w-sm">
                                URL दर्ज करते ही लाइव वीडियो प्लेयर यहाँ सक्रिय हो जाएगा।
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Inputs & Direct Upload */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-stone-400 mb-1">
                              वीडियो URL (यूट्यूब / विमियो / डायरेक्ट MP4 फ़ाइल)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={block.videoUrl || ''}
                                onChange={(e) => handleUpdateBlock(block.id, { videoUrl: e.target.value })}
                                placeholder="https://www.youtube.com/watch?v=... अथवा /uploads/video.mp4"
                                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ blockId: block.id, field: 'videoUrl' })}
                                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs shrink-0 cursor-pointer font-medium"
                              >
                                मीडिया से चुनें
                              </button>
                              <label className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs shrink-0 font-bold cursor-pointer inline-flex items-center gap-1 shadow-sm">
                                <Upload className="w-3.5 h-3.5" />
                                <span>अपलोड</span>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleDirectFileUpload(e.target.files[0], block.id, 'videoUrl');
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1">वीडियो शीर्षक / विवरण (Caption)</label>
                            <input
                              type="text"
                              value={block.videoCaption || ''}
                              onChange={(e) => handleUpdateBlock(block.id, { videoCaption: e.target.value })}
                              placeholder="वीडियो के नीचे दिखने वाला कैप्शन या शीर्षक"
                              className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 7. Features / 3-Column Highlights Block */}
                  {(block.type === 'list' || block.type === 'features') && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">फ़ीचर्स हेडिंग (Section Title)</label>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        {(block.items || []).map((item, itemIdx) => (
                          <div key={itemIdx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...(block.items || [])];
                                newItems[itemIdx] = { ...newItems[itemIdx], title: e.target.value };
                                handleUpdateBlock(block.id, { items: newItems });
                              }}
                              placeholder="कार्ड का शीर्षक"
                              className="w-1/3 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                            />
                            <input
                              type="text"
                              value={item.description || ''}
                              onChange={(e) => {
                                const newItems = [...(block.items || [])];
                                newItems[itemIdx] = { ...newItems[itemIdx], description: e.target.value };
                                handleUpdateBlock(block.id, { items: newItems });
                              }}
                              placeholder="कार्ड का विवरण"
                              className="flex-1 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = (block.items || []).filter((_, i) => i !== itemIdx);
                                handleUpdateBlock(block.id, { items: newItems });
                              }}
                              className="p-1.5 text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [
                              ...(block.items || []),
                              { title: 'नया स्तम्भ', description: 'विशेषता विवरण' }
                            ];
                            handleUpdateBlock(block.id, { items: newItems });
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> नया कार्ड जोड़ें
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 8. Call To Action Button Block */}
                  {block.type === 'button' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">बटन का नाम (Button Label)</label>
                        <input
                          type="text"
                          value={block.buttonText || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { buttonText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">लिंक (URL / WhatsApp)</label>
                        <input
                          type="text"
                          value={block.buttonLink || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { buttonLink: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">बटन का रंग व शैली</label>
                        <select
                          value={block.buttonStyle || 'primary'}
                          onChange={(e) => handleUpdateBlock(block.id, { buttonStyle: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        >
                          <option value="primary">वैदिक स्वर्णिम (Gold Button)</option>
                          <option value="whatsapp">व्हाट्सएप हरा (WhatsApp Green)</option>
                          <option value="call">कॉल नीला (Phone Call)</option>
                          <option value="secondary">सूक्ष्म बॉर्डर</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* 9. Vedic Mantra / Sacred Quote Block */}
                  {block.type === 'quote' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">वैदिक श्लोक, मंत्र अथवा विचार</label>
                        <textarea
                          rows={2}
                          value={block.content || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                          className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-sm font-serif italic text-amber-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">मंत्र शीर्षक अथवा स्रोत</label>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                          placeholder="e.g., ॥ ॐ नमः शिवाय ॥"
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 font-serif"
                        />
                      </div>
                    </div>
                  )}

                  {/* 10. Consultation Booking Card Block */}
                  {(block.type === 'booking-card' || block.type === 'consultation') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">परामर्श का नाम</label>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">शुल्क (Fee)</label>
                        <input
                          type="text"
                          value={block.price || '₹5,100'}
                          onChange={(e) => handleUpdateBlock(block.id, { price: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">परामर्श अवधि (Duration)</label>
                        <input
                          type="text"
                          value={block.duration || '45-60 मिनट'}
                          onChange={(e) => handleUpdateBlock(block.id, { duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">बटन का नाम</label>
                        <input
                          type="text"
                          value={block.buttonText || 'स्लॉट बुक करें'}
                          onChange={(e) => handleUpdateBlock(block.id, { buttonText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                        />
                      </div>
                    </div>
                  )}

                  {/* 11. Vedic Divider Block */}
                  {block.type === 'divider' && (
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">विभाजक प्रतीक (Divider Symbol)</label>
                      <input
                        type="text"
                        value={block.title || '॥ ॐ ॥'}
                        onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                        className="w-full max-w-xs px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-400 font-serif text-center"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Block Selector Panel */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-stone-800 bg-stone-900/40 text-center">
                <p className="text-xs font-semibold text-stone-300 mb-3">
                  + नया सामग्री ब्लॉक जोड़ें (Add Content Block to Page)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddBlock('hero')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 🌟 मुख्य बैनर (Hero)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('heading')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Heading className="w-3.5 h-3.5 text-amber-400" /> 📝 हेडिंग (H2)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('text')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> 📝 लेख (Rich Text)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('image')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> 🖼️ एकल चित्र (Photo)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('gallery')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" /> 🗂️ फोटो गैलरी (Grid)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('video')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5 text-amber-400" /> 🎬 वीडियो प्लेयर (Video)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('quote')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 🕉️ वैदिक मंत्र / उद्धरण
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('list')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <List className="w-3.5 h-3.5 text-amber-400" /> 📋 3 स्तम्भ विशेषताएँ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('booking-card')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" /> 💳 बुकिंग कार्ड (₹5,100)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('button')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> 🔘 एक्शन बटन (CTA)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('divider')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5 text-amber-400" /> ⚜️ वैदिक विभाजक (ॐ)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAGE & SEO SETTINGS WITH GOOGLE SNIPPET PREVIEW */}
        {activeTab === 'seo' && (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-300">
                URL स्लग, Google SEO व सोशल कार्ड सेटिंग्स
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Google Search Result स्निपेट और WhatsApp/Facebook शेयरिंग इमेज सेट करें
              </p>
            </div>

            {/* Google Search Result Live Snippet Preview Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1 mb-2">
                <Search className="w-3 h-3 text-amber-400" />
                Google Search Result पूर्वावलोकन (Live Snippet Preview)
              </span>
              <p className="text-[12px] text-stone-400 font-mono truncate">
                https://numerologywithrandhirsingh.vercel.app › pages › {slug || 'your-slug'}
              </p>
              <h4 className="text-base text-blue-400 font-medium hover:underline cursor-pointer truncate">
                {seoTitle || title || 'Untitled Vedic Guidance Page'} | Randhir Singh Jaipur
              </h4>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                {seoDescription ||
                  'अपनी जन्मतिथि और कलाई घड़ी के रहस्यों को समझें। वैदिक अंक ज्योतिष, वॉच थेरेपी, और ऊर्जा उपचार परामर्श · रणधीर सिंह | जयपुर।'}
              </p>
            </div>

            <div className="space-y-4">
              {/* URL Slug */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  स्थायी URL स्लग (Auto-accessible at /pages/{slug || '...'}) *
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 rounded-l-xl bg-stone-950 border border-r-0 border-stone-800 text-xs font-mono text-stone-500">
                    /pages/
                  </span>
                  <input
                    type="text"
                    required
                    readOnly={Boolean(initialPage?.isSystemPage)}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                    placeholder="my-vedic-remedies"
                    className={`flex-1 px-3.5 py-2.5 rounded-r-xl bg-stone-950 border border-stone-800 text-xs font-mono outline-none ${
                      initialPage?.isSystemPage ? 'text-stone-400 cursor-not-allowed' : 'text-amber-300 focus:border-amber-500'
                    }`}
                  />
                </div>
                {initialPage?.isSystemPage && (
                  <p className="text-[11px] text-amber-400/80 mt-1 flex items-center gap-1">
                    <span>🔒</span>
                    <span>यह वेबसाइट का कोर सिस्टम सेक्शन है (Core System Route)। इसका URL सुरक्षित और स्थायी है।</span>
                  </p>
                )}
              </div>

              {/* Meta Title with Character Counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Google Meta Title (ब्राउज़र टैब व गूगल में दिखने वाला शीर्षक)
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      seoTitle.length > 60 ? 'text-amber-400' : 'text-stone-500'
                    }`}
                  >
                    {seoTitle.length} / 60 वर्ण
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g., Vedic Watch Therapy Guidance | Randhir Singh Jaipur"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              {/* Meta Description with Character Counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Google Meta Description (खोज परिणाम का संक्षिप्त विवरण)
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      seoDescription.length > 160 ? 'text-amber-400' : 'text-stone-500'
                    }`}
                  >
                    {seoDescription.length} / 160 वर्ण
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="गूगल सर्च के लिए 120-160 वर्णों का संक्षिप्त, आकर्षक व स्पष्ट विवरण..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:border-amber-500 outline-none"
                />
              </div>

              {/* Focus Keywords */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  फोकस कीवर्ड्स (Focus Keywords - अल्पविराम से अलग करें)
                </label>
                <input
                  type="text"
                  value={focusKeywords}
                  onChange={(e) => setFocusKeywords(e.target.value)}
                  placeholder="e.g., watch therapy, numerology jaipur, randhir singh, loshu grid"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              {/* Social Sharing Image */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  सोशल शेयरिंग कार्ड (WhatsApp / Facebook OG Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="/Certificate Celebration Ceremony.png या मीडिया लाइब्रेरी का URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:border-amber-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget({ blockId: 'seo', field: 'imageUrl' })}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium shrink-0 cursor-pointer"
                  >
                    मीडिया से चुनें
                  </button>
                </div>
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  कैनोनिकल URL (Canonical URL - वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://decodeyourdestiny.in/pages/your-page (रिक्त छोड़ने पर स्वतः उत्पन्न होगा)"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-200 focus:border-amber-500 outline-none"
                />
              </div>

              {/* Indexing & Sitemap Controls */}
              <div className="pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Index / Noindex Toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                  <input
                    type="checkbox"
                    id="noIndexToggle"
                    checked={noIndex}
                    onChange={(e) => setNoIndex(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-stone-900 border-stone-700 cursor-pointer"
                  />
                  <label htmlFor="noIndexToggle" className="text-xs text-stone-200 cursor-pointer">
                    <span className="font-semibold block text-stone-100">सर्च इंजन से छिपाएँ (noindex)</span>
                    <span className="text-stone-400">Googlebot को इस पेज को इंडेक्स करने से रोकें</span>
                  </label>
                </div>

                {/* XML Sitemap Inclusion Toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                  <input
                    type="checkbox"
                    id="inSitemapToggle"
                    checked={inSitemap}
                    onChange={(e) => setInSitemap(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-900 border-stone-700 cursor-pointer"
                  />
                  <label htmlFor="inSitemapToggle" className="text-xs text-stone-200 cursor-pointer">
                    <span className="font-semibold block text-stone-100">XML साइटमैप में शामिल करें</span>
                    <span className="text-stone-400">sitemap.xml में स्वचालित रूप से जोड़ें</span>
                  </label>
                </div>
              </div>

              {/* Sitemap Priority and Change Frequency */}
              {inSitemap && !noIndex && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      साइटमैप प्राथमिकता (Sitemap Priority: 0.1 - 1.0)
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200"
                    >
                      <option value={1.0}>1.0 (सर्वोच्च प्राथमिकता)</option>
                      <option value={0.9}>0.9 (उच्च प्राथमिकता - सेवाएं व गणना)</option>
                      <option value={0.8}>0.8 (सामान्य प्राथमिकता - मानक पेज)</option>
                      <option value={0.6}>0.6 (मध्यम प्राथमिकता)</option>
                      <option value={0.4}>0.4 (निम्न प्राथमिकता)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      बदलाव की आवृत्ति (Change Frequency)
                    </label>
                    <select
                      value={changefreq}
                      onChange={(e) => setChangefreq(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200"
                    >
                      <option value="daily">Daily (प्रतिदिन)</option>
                      <option value="weekly">Weekly (साप्ताहिक)</option>
                      <option value="monthly">Monthly (मासिक)</option>
                      <option value="yearly">Yearly (वार्षिक)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Options */}
              <div className="pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                  <input
                    type="checkbox"
                    id="showInNav"
                    checked={showInNav}
                    onChange={(e) => setShowInNav(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-900 border-stone-700 cursor-pointer"
                  />
                  <label htmlFor="showInNav" className="text-xs text-stone-200 cursor-pointer">
                    <span className="font-semibold block text-stone-100">वेबसाइट नेविगेशन मेन्यू में दिखाएँ</span>
                    हेडर के "विशेष पृष्ठ" मेन्यू में यह लिंक स्वतः शामिल हो जाएगा
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    मेन्यू क्रम प्राथमिकता (Nav Order Priority)
                  </label>
                  <input
                    type="number"
                    value={navOrder}
                    onChange={(e) => setNavOrder(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE PREVIEW WITH RESPONSIVE DEVICE SWITCHER */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            {/* Device Switcher Bar */}
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-stone-900 border border-stone-800 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  previewDevice === 'desktop'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  previewDevice === 'tablet'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" /> Tablet
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  previewDevice === 'mobile'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>

            {/* Simulated Device Frame Container */}
            <div className="flex justify-center transition-all">
              <div
                className={`border border-stone-800 rounded-3xl overflow-hidden bg-[#fdfbf7] text-stone-900 shadow-2xl transition-all duration-300 ${
                  previewDevice === 'mobile'
                    ? 'w-[390px]'
                    : previewDevice === 'tablet'
                    ? 'w-[768px]'
                    : 'w-full'
                }`}
              >
                {/* Simulated browser bar */}
                <div className="bg-stone-900 text-stone-400 px-4 py-2 text-xs flex items-center justify-between border-b border-stone-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="px-3 py-1 rounded bg-stone-950 font-mono text-[11px] text-amber-300 border border-stone-800 truncate max-w-sm">
                    https://decodeyourdestiny.com/pages/{slug || 'preview'}
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">
                    {previewDevice}
                  </span>
                </div>

                {/* Rendered Page Blocks */}
                <div className="divide-y divide-amber-900/10">
                  {blocks.map((block) => (
                    <div key={block.id} className="p-6 sm:p-10">
                      {/* Hero */}
                      {block.type === 'hero' && (
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-stone-100 p-8 sm:p-12 text-center">
                          {block.imageUrl && (
                            <div
                              className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                              style={{ backgroundImage: `url(${block.imageUrl})` }}
                            />
                          )}
                          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                              🌟 Vedic Guidance
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-200">
                              {block.title}
                            </h2>
                            {block.subtitle && (
                              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                                {block.subtitle}
                              </p>
                            )}
                            {block.buttonText && (
                              <div className="pt-2">
                                <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg">
                                  {block.buttonText}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Heading */}
                      {block.type === 'heading' && (
                        <div className="text-center max-w-2xl mx-auto">
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                            {block.title}
                          </h2>
                          {block.subtitle && (
                            <p className="text-amber-800 text-sm mt-1">{block.subtitle}</p>
                          )}
                          <div className="w-16 h-1 bg-amber-600 mx-auto mt-3 rounded-full" />
                        </div>
                      )}

                      {/* Rich Text */}
                      {block.type === 'text' && (
                        <div className="max-w-3xl mx-auto text-stone-800 text-base leading-relaxed whitespace-pre-line font-sans">
                          {block.content}
                        </div>
                      )}

                      {/* Image */}
                      {block.type === 'image' && (
                        <div className="max-w-3xl mx-auto text-center">
                          {block.imageUrl && (
                            <img
                              src={block.imageUrl}
                              alt={block.imageAlt || 'Page media'}
                              className={`rounded-2xl shadow-xl border border-amber-900/10 mx-auto ${
                                block.alignment === 'full'
                                  ? 'w-full max-h-[600px] object-cover'
                                  : 'max-w-xl max-h-[450px] object-contain'
                              }`}
                            />
                          )}
                          {block.title && (
                            <p className="text-xs text-stone-600 mt-2 italic font-serif">
                              {block.title}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Gallery */}
                      {block.type === 'gallery' && (
                        <div className="max-w-4xl mx-auto space-y-4">
                          {block.title && (
                            <h3 className="font-serif font-bold text-xl text-stone-900 text-center">
                              {block.title}
                            </h3>
                          )}
                          <div
                            className={`grid gap-4 ${
                              block.columns === 2
                                ? 'grid-cols-2'
                                : block.columns === 4
                                ? 'grid-cols-2 sm:grid-cols-4'
                                : 'grid-cols-1 sm:grid-cols-3'
                            }`}
                          >
                            {(block.images || []).map((img, i) => (
                              <div
                                key={i}
                                className="rounded-xl overflow-hidden shadow border border-amber-900/10 bg-white"
                              >
                                <img
                                  src={img.url}
                                  alt={img.caption || `Gallery ${i + 1}`}
                                  className="w-full h-40 object-cover"
                                />
                                {img.caption && (
                                  <div className="p-2 text-xs text-stone-600 bg-stone-50 border-t border-stone-100">
                                    {img.caption}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3-Column Feature Cards */}
                      {block.type === 'list' && (
                        <div className="max-w-3xl mx-auto">
                          {block.title && (
                            <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">
                              {block.title}
                            </h3>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {(block.items || []).map((it, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 shadow-2xs"
                              >
                                <h4 className="font-bold text-stone-900 text-sm">{it.title}</h4>
                                <p className="text-xs text-stone-700 mt-1">{it.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Consultation Booking Card */}
                      {block.type === 'booking-card' && (
                        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-stone-100 shadow-xl border border-amber-500/30 text-center space-y-3">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                            व्यक्तिगत परामर्श (Consultation)
                          </span>
                          <h3 className="text-xl font-serif font-bold text-amber-200">
                            {block.title}
                          </h3>
                          <div className="text-3xl font-serif font-bold text-amber-300">
                            {block.price || '₹5,100'}
                          </div>
                          <p className="text-xs text-stone-300">{block.duration}</p>
                          <span className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider">
                            {block.buttonText || 'अभी स्लॉट बुक करें'}
                          </span>
                        </div>
                      )}

                      {/* Vedic Quote / Mantra */}
                      {block.type === 'quote' && (
                        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-amber-100/60 border-l-4 border-amber-600 text-center">
                          {block.title && (
                            <p className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-2 font-serif">
                              {block.title}
                            </p>
                          )}
                          <p className="font-serif italic text-stone-800 text-lg">
                            "{block.content}"
                          </p>
                        </div>
                      )}

                      {/* Divider */}
                      {block.type === 'divider' && (
                        <div className="text-center py-2 flex items-center justify-center gap-4">
                          <div className="h-px bg-amber-300 flex-1 max-w-xs" />
                          <span className="font-sacred text-amber-800 text-lg font-bold">
                            {block.title || '॥ ॐ ॥'}
                          </span>
                          <div className="h-px bg-amber-300 flex-1 max-w-xs" />
                        </div>
                      )}

                      {/* CTA Button */}
                      {block.type === 'button' && (
                        <div className="max-w-xl mx-auto text-center py-2">
                          <span className="inline-block px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md">
                            {block.buttonText || 'Connect on WhatsApp'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Media Selector Modal */}
      {mediaPickerTarget && (
        <MediaLibrary
          isModal={true}
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          onSelectMedia={(item) => {
            if (mediaPickerTarget.blockId === 'seo') {
              setOgImage(item.url);
            } else if (mediaPickerTarget.field === 'gallery' && mediaPickerTarget.galleryIndex !== undefined) {
              const currentBlock = blocks.find((b) => b.id === mediaPickerTarget.blockId);
              if (currentBlock && currentBlock.images) {
                const updatedImages = [...currentBlock.images];
                if (updatedImages[mediaPickerTarget.galleryIndex]) {
                  updatedImages[mediaPickerTarget.galleryIndex] = {
                    ...updatedImages[mediaPickerTarget.galleryIndex],
                    url: item.url,
                    caption: updatedImages[mediaPickerTarget.galleryIndex].caption || item.caption || item.name
                  };
                  handleUpdateBlock(mediaPickerTarget.blockId, { images: updatedImages });
                }
              }
            } else {
              if (mediaPickerTarget.field === 'imageUrl') {
                handleUpdateBlock(mediaPickerTarget.blockId, {
                  imageUrl: item.url,
                  imageAlt: item.alt || item.name
                });
              } else if (mediaPickerTarget.field === 'videoUrl') {
                handleUpdateBlock(mediaPickerTarget.blockId, {
                  videoUrl: item.url,
                  videoCaption: item.caption || item.name
                });
              }
            }
            setMediaPickerTarget(null);
          }}
        />
      )}
    </div>
  );
};
