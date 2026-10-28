import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Download, FileText, Search, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { DownloadItem } from '../data/mockData';
import { formatDate } from '../lib/api';

const Downloads: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Admission Forms', 'Syllabus', 'Guidelines', 'Exam Time-Table', 'Reports'];

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const data = await dataService.getDownloads(selectedCategory);
        setDownloads(data);
      } catch (err) {
        console.error('Error fetching downloads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, [selectedCategory]);

  const filteredDownloads = downloads.filter((d) => {
    const query = searchQuery.toLowerCase();
    return d.title.toLowerCase().includes(query) || d.category.toLowerCase().includes(query);
  });

  return (
    <div>
      <PageHero eyebrow="Document Repository" title="Downloads & Resources" description="Access official printable admission registration forms, subject syllabi, examination question patterns, student handbooks, and public disclosures." />
    <div className="section-padding space-y-12">

      {/* Filter and Search Bar */}
      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-primary-100/70 flex flex-col md:flex-row items-center justify-between gap-4">
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

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search document name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none bg-brand-light"
            />
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading document repository...</p>
          </div>
        ) : filteredDownloads.length === 0 ? (
          <div className="text-center py-20 card">
            <FileText size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-slate-700 text-lg">No documents found</h3>
            <p className="text-xs text-slate-500 mt-1">Try another category or clear your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredDownloads.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 shadow-card border border-primary-100/70 hover:border-primary-300 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 border border-primary-100">
                    <FileText size={22} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {[doc.file_type, doc.file_size, formatDate(doc.publish_date)].filter(Boolean).join(" • ")}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-slate-900 text-sm md:text-base group-hover:text-primary-700 transition-colors">
                      {doc.title}
                    </h4>
                  </div>
                </div>

                {doc.download_url ? (
                  <a
                    href={doc.download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-primary-50 hover:bg-primary-700 hover:text-white text-primary-700 transition-colors shrink-0"
                    title="Download file"
                    aria-label={"Download " + doc.title}
                  >
                    <Download size={18} />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 shrink-0">Coming soon</span>
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

export default Downloads;
