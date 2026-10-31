import React, { useState } from 'react';
import { changeAdminPassword, exportBackupJson, restoreBackupJson } from '../../lib/cmsService';
import {
  ShieldCheck,
  Key,
  Mail,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  HardDrive,
  Database,
  ArrowLeft,
  RefreshCw,
  Lock
} from 'lucide-react';

interface AdminSettingsProps {
  onBack: () => void;
  diskUsage?: { bytes: number; formatted: string };
  adminEmail?: string;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  onBack,
  diskUsage,
  adminEmail
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState(adminEmail || 'admin@randhir.com');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Backup restore state
  const [restoring, setRestoring] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'पासवर्ड कम से कम 8 वर्णों का होना चाहिए।' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await changeAdminPassword({
        currentPassword,
        newPassword,
        newEmail
      });
      setMessage({ type: 'success', text: res.message || 'पासवर्ड एवं प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'पासवर्ड बदलने में त्रुटि हुई।' });
    } finally {
      setLoading(false);
    }
  };

  const handleExportBackup = async () => {
    try {
      const data = await exportBackupJson();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `randhir_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`बैकअप डाउनलोड विफल: ${err.message}`);
    }
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm('क्या आप निश्चित हैं? मौजूदा पेजों का डेटा इस बैकअप से बदल दिया जाएगा।')) {
      return;
    }

    setRestoring(true);
    setRestoreMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const json = JSON.parse(reader.result as string);
        const res = await restoreBackupJson(json);
        setRestoreMessage(res.message || 'डेटा सफलतापूर्वक पुनर्स्थापित हो गया।');
      } catch (err: any) {
        setRestoreMessage(`पुनर्स्थापना विफल: ${err.message}`);
      } finally {
        setRestoring(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition"
              title="डैशबोर्ड पर वापस जाएं"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-serif font-bold text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                CMS सेटिंग्स व बैकअप प्रबंधन (Settings & Backup)
              </h1>
              <p className="text-xs text-stone-400 mt-0.5">
                सुरक्षा क्रेडेंशियल्स, PBKDF2 एन्क्रिप्शन और संपूर्ण डेटाबेस बैकअप
              </p>
            </div>
          </div>
        </div>

        {/* Server Storage Disk Usage Card */}
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
              <HardDrive className="w-4 h-4" />
              <span>सर्वर स्थायी डिस्क स्टोरेज (Persistent Cloud Disk)</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              सभी मीडिया फ़ाइलें <span className="font-mono text-amber-200">/public/uploads/</span> डायरेक्टरी में स्थायी रूप से संग्रहीत हैं और हमेशा उपलब्ध रहती हैं।
            </p>
          </div>
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
              वर्तमान उपयोग (Disk Usage)
            </span>
            <span className="text-xl font-mono font-bold text-amber-300">
              {diskUsage?.formatted || '0.77 MB'}
            </span>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-stone-800 pb-3">
            <h2 className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              व्यवस्थापक क्रेडेंशियल्स व पासवर्ड परिवर्तन (Change Password)
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              PBKDF2 हैशिंग (100,000 पुनरावृत्ति) के साथ सुरक्षित रूप से नया पासवर्ड सेट करें
            </p>
          </div>

          {message && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                message.type === 'success'
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                  : 'bg-red-950/70 border-red-800 text-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                व्यवस्थापक ईमेल (Admin Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                वर्तमान पासवर्ड (Current Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="वर्तमान पासवर्ड दर्ज करें (डिफ़ॉल्ट: Admin@RandhirVedic2026!)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  नया पासवर्ड (New Password)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="न्यूनतम 8 वर्ण"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  पासवर्ड की पुष्टि (Confirm)
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="नया पासवर्ड दोबारा लिखें"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition shadow cursor-pointer disabled:opacity-50"
            >
              {loading ? 'अपडेट हो रहा है...' : 'क्रेडेंशियल्स अपडेट करें (Save Credentials)'}
            </button>
          </form>
        </div>

        {/* Complete JSON Backup & Restore Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="border-b border-stone-800 pb-3">
            <h2 className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              वेबसाइट डेटाबेस बैकअप एवं पुनर्स्थापना (JSON Backup & Restore)
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              सभी पेजों, मीडिया सूचियों व सेटिंग्स का 1-क्लिक बैकअप डाउनलोड करें या बैकअप से पुनर्स्थापित करें
            </p>
          </div>

          {restoreMessage && (
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-600/40 text-amber-200 text-xs">
              {restoreMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Download Backup */}
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                बैकअप निर्यात करें (Export Full JSON)
              </h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                वेबसाइट के सभी पेजों, ब्लॉक्स, और मीडिया मेटाडेटा को एक सुरक्षित `.json` फ़ाइल के रूप में अपने कंप्यूटर पर सहेजें।
              </p>
              <button
                type="button"
                onClick={handleExportBackup}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-300 font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> बैकअप डाउनलोड करें (.json)
              </button>
            </div>

            {/* Restore Backup */}
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                बैकअप से पुनर्स्थापित करें (Restore JSON)
              </h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                पहले डाउनलोड की गई `.json` बैकअप फ़ाइल चुनकर सभी पेजों और डेटा को तुरंत रीस्टोर करें।
              </p>
              <label className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{restoring ? 'डेटा रीस्टोर हो रहा है...' : 'JSON फ़ाइल चुनें व रीस्टोर करें'}</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleRestoreFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
