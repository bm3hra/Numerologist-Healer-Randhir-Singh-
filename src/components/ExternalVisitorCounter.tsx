import React from 'react';

interface ExternalVisitorCounterProps {
  refreshKey?: number;
  className?: string;
}

/**
 * Renders the user-configured FreeVisitorCounters widget inside a same-origin iframe
 * so synchronous document.write() scripts execute reliably inside React without warnings.
 */
export const ExternalVisitorCounter: React.FC<ExternalVisitorCounterProps> = ({
  refreshKey = 0,
  className = ''
}) => {
  const widgetSrc =
    refreshKey > 0
      ? `/visitor-counter-widget.html?r=${refreshKey}`
      : '/visitor-counter-widget.html';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-black px-4 py-2 rounded-xl border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] ${className}`}
    >
      <iframe
        key={refreshKey}
        src={widgetSrc}
        title="Live Visitor Counter"
        scrolling="no"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-[210px] h-[64px] border-0 overflow-hidden bg-transparent block"
      />
    </div>
  );
};
