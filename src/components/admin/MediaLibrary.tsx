import React, { useState, useEffect, useRef } from 'react';
import { CMSMediaItem } from '../../types';
import { getAllMedia, uploadMediaItem, deleteMediaItem } from '../../lib/cmsService';
import {
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  X,
  FileText,
  AlertCircle,
  Eye,
  Plus
} from 'lucide-react';

interface MediaLibraryProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectMedia?: (media: CMSMediaItem) => void;
  isModal?: boolean;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  isOpen = true,
  onClose,
  onSelectMedia,
  isModal = false
}) => {
  const [mediaList, setMediaList] = useState<CMSMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'image' | 'video'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload modal / detail state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<CMSMediaItem | null>(null);

  // New Upload Form State
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getAllMedia();
      setMediaList(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load media assets');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Size check: max 25MB
      if (file.size > 25 * 1024 * 1024) {
        setError('Selected file exceeds maximum limit of 25MB.');
        return;
      }
      setFileToUpload(file);
      setAltText(file.name.replace(/\.[^/.]+$/, ''));
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileToUpload) return;
    setUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const isVideo = fileToUpload.type.startsWith('video/') || fileToUpload.name.match(/\.(mp4|webm)$/i);
          const uploaded = await uploadMediaItem({
            fileName: fileToUpload.name,
            fileData: base64Data,
            type: isVideo ? 'video' : 'image',
            alt: altText || fileToUpload.name,
            caption: caption || ''
          });

          setMediaList((prev) => [uploaded, ...prev]);
          setShowUploadForm(false);
          setFileToUpload(null);
          setFilePreviewUrl(null);
          setAltText('');
          setCaption('');
        } catch (err: any) {
          setError(err.message || 'Failed to upload media item');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(fileToUpload);
    } catch (err: any) {
      setError(err.message || 'Error processing file');
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteMediaItem(id);
      setMediaList((prev) => prev.filter((m) => m.id !== id));
      if (previewMedia?.id === id) {
        setPreviewMedia(null);
      }
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const content = (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col h-full max-h-[88vh]">
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-300 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            Media Library & Assets Vault
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Manage high-resolution images, videos, alt tags, and persistent storage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadForm(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition cursor-pointer shadow"
          >
            <Upload className="w-4 h-4" /> Upload Media
          </button>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="px-6 py-3 border-b border-stone-800 bg-stone-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by file name, alt text, or caption..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-lg transition ${
              selectedFilter === 'all'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All ({mediaList.length})
          </button>
          <button
            onClick={() => setSelectedFilter('image')}
            className={`px-3 py-1 rounded-lg transition ${
              selectedFilter === 'image'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Images ({mediaList.filter((m) => m.type === 'image').length})
          </button>
          <button
            onClick={() => setSelectedFilter('video')}
            className={`px-3 py-1 rounded-lg transition ${
              selectedFilter === 'video'
                ? 'bg-amber-600 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Videos ({mediaList.filter((m) => m.type === 'video').length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 overflow-y-auto flex-1">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-stone-500 text-sm">
            Loading media assets...
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-stone-800 rounded-2xl bg-stone-950/40">
            <ImageIcon className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-stone-300 font-medium text-sm">No media items found</h3>
            <p className="text-stone-500 text-xs mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'No media matches your search query. Try clearing your filters.'
                : 'Your media library is empty. Upload images or videos to use them on your pages.'}
            </p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Upload Your First Asset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group relative bg-stone-950 border border-stone-800 hover:border-amber-500/60 rounded-xl overflow-hidden flex flex-col transition shadow-sm hover:shadow-amber-500/10"
              >
                {/* Media Preview Thumbnail */}
                <div className="aspect-square bg-stone-900 relative overflow-hidden flex items-center justify-center">
                  {item.type === 'video' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-950 text-amber-400">
                      <Video className="w-8 h-8 mb-1" />
                      <span className="text-[10px] text-stone-400 font-mono">VIDEO</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Certificate Celebration Ceremony.png';
                      }}
                    />
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-stone-900/80 backdrop-blur border border-stone-700 text-[10px] text-amber-300 font-medium uppercase">
                    {item.type}
                  </div>

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    {onSelectMedia && (
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] shadow transition cursor-pointer"
                        title="Use this image"
                      >
                        Select
                      </button>
                    )}
                    <button
                      onClick={() => setPreviewMedia(item)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 transition"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata caption */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-medium text-stone-200 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1">
                    <span>{Math.round(item.size / 1024)} KB</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal Drawer */}
      {showUploadForm && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
              <h3 className="font-serif font-bold text-base text-stone-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                Upload New Image or Video
              </h3>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  setFileToUpload(null);
                  setFilePreviewUrl(null);
                }}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {/* File Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-700 hover:border-amber-500/80 rounded-xl p-6 text-center cursor-pointer bg-stone-950/50 transition group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,video/mp4,video/webm"
                  className="hidden"
                />

                {filePreviewUrl ? (
                  <div className="space-y-2">
                    <img
                      src={filePreviewUrl}
                      alt="Upload preview"
                      className="max-h-36 mx-auto rounded-lg object-contain"
                    />
                    <p className="text-xs text-amber-300 font-medium">{fileToUpload?.name}</p>
                    <p className="text-[11px] text-stone-500">
                      Click to choose a different file ({Math.round((fileToUpload?.size || 0) / 1024)} KB)
                    </p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-10 h-10 text-stone-500 group-hover:text-amber-400 mx-auto mb-2 transition" />
                    <p className="text-xs font-semibold text-stone-200">
                      Click to browse or drag and drop files
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      PNG, JPG, WEBP, SVG, MP4, WEBM (Max 25MB)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g., Randhir Singh Watch Therapy Consultation"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Caption / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Descriptive details for website caption..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!fileToUpload || uploading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  {uploading ? 'Storing in Cloud Storage...' : 'Upload & Save to Library'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Media Details Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Visual preview */}
            <div className="md:w-1/2 bg-stone-950 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-800">
              {previewMedia.type === 'video' ? (
                <video
                  src={previewMedia.url}
                  controls
                  className="max-h-72 w-full rounded-lg"
                />
              ) : (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.alt}
                  className="max-h-72 w-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/30 text-[10px] font-mono uppercase">
                    {previewMedia.type}
                  </span>
                  <button
                    onClick={() => setPreviewMedia(null)}
                    className="text-stone-400 hover:text-stone-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-stone-100 text-sm break-all">
                    {previewMedia.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Uploaded: {new Date(previewMedia.createdAt).toLocaleString()} by {previewMedia.uploadedBy}
                  </p>
                </div>

                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 text-xs space-y-1">
                  <p className="text-stone-400">
                    <strong className="text-stone-300">File Size:</strong> {Math.round(previewMedia.size / 1024)} KB
                  </p>
                  <p className="text-stone-400">
                    <strong className="text-stone-300">Alt Tag:</strong> {previewMedia.alt || 'None'}
                  </p>
                  {previewMedia.caption && (
                    <p className="text-stone-400">
                      <strong className="text-stone-300">Caption:</strong> {previewMedia.caption}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Public URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={previewMedia.url}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] font-mono text-amber-300"
                    />
                    <button
                      onClick={() => handleCopyUrl(previewMedia.url, previewMedia.id)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200"
                    >
                      {copiedId === previewMedia.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-800 mt-4">
                <button
                  onClick={() => handleDelete(previewMedia.id, previewMedia.name)}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Delete Asset
                </button>
                {onSelectMedia && (
                  <button
                    onClick={() => {
                      onSelectMedia(previewMedia);
                      setPreviewMedia(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Select for Page
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-5xl h-[85vh]">{content}</div>
      </div>
    );
  }

  return content;
};
