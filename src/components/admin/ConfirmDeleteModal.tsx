import React from 'react';
import { AlertTriangle, Trash2, X, Check, ShieldAlert } from 'lucide-react';

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  subMessage?: string;
  itemDetails?: Array<{ label: string; value: string }>;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  message,
  subMessage,
  itemDetails,
  confirmText = 'हाँ, हटाएं (Yes, Delete)',
  cancelText = 'नहीं, रद्द करें (No, Cancel)',
  isDestructive = true,
  loading = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-stone-800 p-6 sm:p-7 shadow-2xl space-y-5 text-stone-100">
        {/* Header Icon + Close */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                isDestructive
                  ? 'bg-red-950/60 border-red-500/40 text-red-400'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
              }`}
            >
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                पुष्टि की आवश्यकता है (Confirmation Required)
              </span>
              <h3 id="confirm-modal-title" className="font-serif font-bold text-lg sm:text-xl text-stone-100">
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            title="रद्द करें (Cancel)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Body */}
        <div className="space-y-3">
          <p className="text-sm text-stone-200 leading-relaxed font-medium">
            {message}
          </p>
          {subMessage && (
            <p className="text-xs text-stone-400 leading-relaxed bg-stone-900/80 p-3 rounded-xl border border-stone-800/80">
              {subMessage}
            </p>
          )}

          {/* Details Table (if any) */}
          {itemDetails && itemDetails.length > 0 && (
            <div className="rounded-xl bg-stone-950 border border-stone-800 p-3.5 space-y-2 text-xs">
              {itemDetails.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 border-b border-stone-800/60 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-stone-400 font-medium">{item.label}:</span>
                  <span className="text-amber-300 font-mono font-semibold truncate max-w-[240px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: YES / NO */}
        <div className="pt-3 border-t border-stone-800/80 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          {/* NO Button */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4 text-stone-400" />
            <span>{cancelText}</span>
          </button>

          {/* YES Button */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
              isDestructive
                ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-red-950/50'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-amber-950/50'
            } disabled:opacity-50`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
