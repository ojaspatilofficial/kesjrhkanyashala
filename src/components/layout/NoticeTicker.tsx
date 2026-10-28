import React, { useState } from 'react';
import { Bell, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../shared/SettingsContext';

/** Thin announcement bar above the header. Text is edited from Admin → School Information. */
const NoticeTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const settings = useSettings();

  if (!isVisible || !settings.ticker_enabled || !settings.ticker_title) return null;

  const link = settings.ticker_link || '/notices';
  const isExternal = /^https?:\/\//.test(link);

  return (
    <div className="bg-primary-900 text-white text-xs md:text-sm py-2 relative z-50">
      <div className="container-custom flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400 text-primary-950 font-bold text-[11px] uppercase tracking-wider shrink-0">
            <Bell size={12} />
            Notice
          </span>
          <p className="truncate text-primary-100 min-w-0">
            <span className="font-semibold text-white">{settings.ticker_title}</span>
            {settings.ticker_text && <span className="hidden sm:inline"> — {settings.ticker_text}</span>}
          </p>
          {isExternal ? (
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center text-gold-300 hover:text-white font-semibold shrink-0">
              Learn more <ChevronRight size={14} />
            </a>
          ) : (
            <Link to={link} className="inline-flex items-center text-gold-300 hover:text-white font-semibold shrink-0">
              Learn more <ChevronRight size={14} />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs text-primary-200">
          {settings.affiliation_no && <span className="hidden lg:inline">Affiliation No: {settings.affiliation_no}</span>}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full text-primary-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;
