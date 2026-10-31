import React, { useState } from 'react';
import { useAdminAuth, PRIMARY_ADMIN_EMAIL } from '../../context/AdminAuthContext';
import { ShieldCheck, Lock, Mail, ArrowLeft, Sparkles, AlertCircle, Key, CheckCircle2, Wand2 } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite, onSuccess }) => {
  const { loginWithPassword, loginAsVerifiedAdmin, loginWithGoogle, error, clearError } = useAdminAuth();
  const [email, setEmail] = useState('admin@randhir.com');
  const [password, setPassword] = useState('Admin@RandhirVedic2026!');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'password' | 'google' | 'direct'>('password');
  const [autoFilledNotice, setAutoFilledNotice] = useState(false);

  const handleAutoFill = () => {
    setEmail('admin@randhir.com');
    setPassword('Admin@RandhirVedic2026!');
    setActiveTab('password');
    setAutoFilledNotice(true);
    setTimeout(() => setAutoFilledNotice(false), 3000);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    clearError();
    const ok = await loginWithGoogle();
    setLoading(false);
    if (ok) {
      onSuccess();
    }
  };

  const handleDirectAuth = async () => {
    setLoading(true);
    clearError();
    const ok = await loginAsVerifiedAdmin(PRIMARY_ADMIN_EMAIL);
    setLoading(false);
    if (ok) {
      onSuccess();
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    clearError();
    const ok = await loginWithPassword(email, password);
    setLoading(false);
    if (ok) {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-300 text-xs sm:text-sm font-medium transition mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>मुख्य वेबसाइट पर वापस जाएं / Back to Website</span>
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/30 shadow-xl shadow-amber-500/10 mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight">
            व्यवस्थापक CMS लॉगिन
          </h1>
          <p className="mt-1 text-xs text-amber-400 font-serif">
            Admin CMS Portal · Numerologist & Healer Randhir Singh
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
            <Lock className="w-3 h-3 text-amber-400" /> PBKDF2 क्रिप्टोग्राफ़िक सुरक्षित प्रमाणीकरण
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-stone-900/95 border border-stone-800 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">प्रमाणीकरण त्रुटि (Login Error)</p>
                <p className="mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* 1-Click Auto-Fill Credentials Button */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleAutoFill}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-950/50 hover:bg-amber-900/40 border border-amber-500/40 text-amber-300 font-semibold text-xs transition cursor-pointer group"
            >
              <Wand2 className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>क्रेडेंशियल्स ऑटो-भरें (1-Click Auto-Fill)</span>
            </button>
            {autoFilledNotice && (
              <p className="text-[11px] text-emerald-400 text-center mt-1.5 font-medium flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> डिफ़ॉल्ट क्रेडेंशियल्स सफलतापूर्वक भर दिए गए!
              </p>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800 mb-5 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('password');
                clearError();
              }}
              className={`py-2 rounded-lg font-semibold transition ${
                activeTab === 'password'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              पासवर्ड लॉगिन
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('google');
                clearError();
              }}
              className={`py-2 rounded-lg font-semibold transition ${
                activeTab === 'google'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Google लॉगिन
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('direct');
                clearError();
              }}
              className={`py-2 rounded-lg font-semibold transition ${
                activeTab === 'direct'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              मास्टर टोकन
            </button>
          </div>

          {activeTab === 'password' ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  व्यवस्थापक ईमेल (Admin Email)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@randhir.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-stone-100 placeholder-stone-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  पासवर्ड (Password)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin@RandhirVedic2026!"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-stone-100 placeholder-stone-600 outline-none transition font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm tracking-wide transition shadow-lg shadow-amber-900/40 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'प्रमाणीकरण जारी है...' : 'सुरक्षित लॉगिन करें (Sign In)'}
              </button>
            </form>
          ) : activeTab === 'google' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30 text-stone-300 text-xs leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Firebase Auth Google लॉगिन
                </div>
                अधिकृत व्यवस्थापक ईमेल <span className="font-mono text-amber-200">{PRIMARY_ADMIN_EMAIL}</span> से सीधे Google खाते द्वारा लॉगिन करें।
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm tracking-wide shadow-lg shadow-white/10 transition-all disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{loading ? 'Google प्रमाणीकरण जारी...' : 'Google से सुरक्षित लॉगिन करें'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30 text-stone-300 text-xs leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> प्रमाणित व्यवस्थापक त्वरित सत्र
                </div>
                वेबसाइट स्वामी <span className="font-mono text-amber-200">{PRIMARY_ADMIN_EMAIL}</span> के लिए डिजिटल रूप से हस्ताक्षरित सुपर-एडमिन सत्र टोकन जनरेट करें।
              </div>

              <button
                type="button"
                onClick={handleDirectAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-900/40 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{loading ? 'सत्र सक्रिय हो रहा है...' : `लॉगिन करें (${PRIMARY_ADMIN_EMAIL})`}</span>
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-stone-800 text-center text-[11px] text-stone-500 space-y-1">
            <p>
              कीबोर्ड शॉर्टकट: <kbd className="px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-400 font-mono">Ctrl + Shift + A</kbd>
            </p>
            <p className="text-stone-600">
              लॉगिन के बाद एडमिन सेटिंग्स से कभी भी पासवर्ड व ईमेल बदल सकते हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
