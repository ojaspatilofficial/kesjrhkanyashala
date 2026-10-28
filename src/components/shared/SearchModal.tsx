import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, User, Download, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { NoticeItem, StaffItem, DownloadItem, CalendarEventItem } from '../../data/mockData';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchData {
  notices: NoticeItem[];
  staff: StaffItem[];
  downloads: DownloadItem[];
  events: CalendarEventItem[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchData>({ notices: [], staff: [], downloads: [], events: [] });

  useEffect(() => {
    if (!isOpen) return;
    Promise.all([dataService.getNotices(), dataService.getStaff(), dataService.getDownloads(), dataService.getEvents()]).then(
      ([notices, staff, downloads, events]) => setData({ notices, staff, downloads, events })
    );
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const has = (value?: string) => !!value && value.toLowerCase().includes(trimmed);

  const filteredNotices = trimmed ? data.notices.filter((n) => has(n.title) || has(n.description)) : [];
  const filteredStaff = trimmed
    ? data.staff.filter((s) => has(s.name) || has(s.department) || has(s.designation) || (s.subjects || []).some(has))
    : [];
  const filteredDownloads = trimmed ? data.downloads.filter((d) => has(d.title) || has(d.category)) : [];
  const filteredEvents = trimmed ? data.events.filter((e) => has(e.title) || has(e.description)) : [];

  const hasResults =
    filteredNotices.length > 0 ||
    filteredStaff.length > 0 ||
    filteredDownloads.length > 0 ||
    filteredEvents.length > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 md:pt-24 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full z-10 border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <Search className="text-slate-400 shrink-0 ml-2" size={22} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notices, faculty, downloads, calendar, admissions..."
              autoFocus
              className="w-full bg-transparent border-none text-slate-800 placeholder:text-slate-400 text-base md:text-lg focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close search" className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Results / Suggestions */}
          <div className="p-6 overflow-y-auto space-y-6">
            {!query && (
              <div className="text-center py-8">
                <p className="text-sm font-medium text-slate-500 mb-3">Quick Navigation Shortcuts</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { label: 'Admissions', to: '/admissions' },
                    { label: 'Fee Structure', to: '/admissions' },
                    { label: 'Notice Board', to: '/notices' },
                    { label: 'Faculty Directory', to: '/staff' },
                    { label: 'Academic Calendar', to: '/calendar' },
                    { label: '100% Board Results', to: '/results' },
                    { label: 'Download Syllabus', to: '/downloads' }
                  ].map((quick) => (
                    <Link
                      key={quick.label}
                      to={quick.to}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary-700 text-xs font-medium text-slate-700 transition-colors"
                    >
                      {quick.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {query && !hasResults && (
              <div className="text-center py-12 text-slate-500">
                <p className="text-base font-semibold text-slate-700">No matching results found</p>
                <p className="text-xs text-slate-500 mt-1">Try searching for "Admission", "Exam", "Staff", "Calendar", or "Physics"</p>
              </div>
            )}

            {/* Notices Results */}
            {filteredNotices.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <FileText size={14} /> Notices & Announcements ({filteredNotices.length})
                </h4>
                <div className="space-y-2">
                  {filteredNotices.map((notice) => (
                    <Link
                      key={notice.id}
                      to="/notices"
                      onClick={onClose}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:border-primary-200 border border-slate-100 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-primary-50 text-primary-700 mr-2">
                          {notice.category}
                        </span>
                        <h5 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors text-sm inline">
                          {notice.title}
                        </h5>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Staff Results */}
            {filteredStaff.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <User size={14} /> Faculty & Staff ({filteredStaff.length})
                </h4>
                <div className="space-y-2">
                  {filteredStaff.map((staff) => (
                    <Link
                      key={staff.id}
                      to="/staff"
                      onClick={onClose}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:border-primary-200 border border-slate-100 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img src={staff.photo_url} alt={staff.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h5 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors text-sm">
                            {staff.name}
                          </h5>
                          <p className="text-xs text-slate-500">{staff.designation} • {staff.department}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads Results */}
            {filteredDownloads.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Download size={14} /> Downloads & Resources ({filteredDownloads.length})
                </h4>
                <div className="space-y-2">
                  {filteredDownloads.map((dl) => (
                    <Link
                      key={dl.id}
                      to="/downloads"
                      onClick={onClose}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:border-primary-200 border border-slate-100 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h5 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors text-sm">
                          {dl.title}
                        </h5>
                        <p className="text-xs text-slate-500">{dl.category} • {dl.file_size}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events Results */}
            {filteredEvents.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Calendar size={14} /> Calendar Events ({filteredEvents.length})
                </h4>
                <div className="space-y-2">
                  {filteredEvents.map((evt) => (
                    <Link
                      key={evt.id}
                      to="/calendar"
                      onClick={onClose}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50 hover:border-primary-200 border border-slate-100 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h5 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors text-sm">
                          {evt.title}
                        </h5>
                        <p className="text-xs text-slate-500">{formatDate(evt.start_date)} • {evt.category}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-between px-6">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">ESC</kbd> to exit</span>
            <span className="font-medium text-primary-700">K.E.S. Smt. J.R.H. Kanyashala</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
