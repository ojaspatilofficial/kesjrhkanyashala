import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Search, FileText, Download, Calendar, Tag, Bell, Pin } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { NoticeItem } from '../data/mockData';
import { parseDate, formatDate } from '../lib/api';

const Notices: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Admissions', 'Academics', 'Exams', 'Sports', 'Events', 'Circulars'];

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await dataService.getNotices(selectedCategory);
        setNotices(data);
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [selectedCategory]);

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <PageHero eyebrow="Official Notice Board" title="News, Circulars & Announcements" description="Stay updated with official school schedules, examination circulars, government scholarship notices, and event announcements." />
    <div className="section-padding space-y-12">

      {/* Filter and Search Bar */}
      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-primary-100/70 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`chip ${
                  selectedCategory === cat
                    ? 'chip-active'
                    : 'chip-idle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars by keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none bg-brand-light"
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading latest official circulars...</p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-20 card">
            <Bell size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-slate-700 text-lg">No notices found</h3>
            <p className="text-xs text-slate-500 mt-1">Try choosing another category or clearing your search keywords.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl p-6 shadow-card border border-primary-100/70 hover:border-primary-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Date Block */}
                  <div className="w-14 h-14 bg-primary-50 text-primary-700 rounded-2xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-base font-bold leading-none">{parseDate(notice.publish_date)?.getDate()}</span>
                    <span className="text-[10px] font-semibold uppercase mt-0.5">
                      {parseDate(notice.publish_date)?.toLocaleString('en-IN', { month: 'short' })}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {notice.category}
                      </span>
                      {notice.is_pinned && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 flex items-center gap-1">
                          <Pin size={10} /> PINNED
                        </span>
                      )}
                      {notice.is_new && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                          NEW
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(notice.publish_date)}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-slate-900 text-base md:text-lg">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {notice.description}
                    </p>
                  </div>
                </div>

                {/* Attachment (PDF) */}
                {notice.attachment_url && (
                  <div className="shrink-0 w-full md:w-auto">
                    <a
                      href={notice.attachment_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full md:w-auto max-w-xs px-4 py-2.5 rounded-xl bg-primary-50 hover:bg-primary-700 hover:text-white border border-primary-100 text-primary-800 text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
                    >
                      <Download size={15} className="shrink-0" />
                      <span className="truncate">{notice.attachment_name || 'Download Circular (PDF)'}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Notices;
