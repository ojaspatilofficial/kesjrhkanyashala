import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Calendar as CalendarIcon, Clock, MapPin, Download, Filter, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { CalendarEventItem } from '../data/mockData';
import { formatDate } from '../lib/api';
import { useSettings } from '../components/shared/SettingsContext';

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const settings = useSettings();

  const categories = ['All', 'Academic', 'Examination', 'Holiday', 'Sports', 'Cultural', 'PTM'];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await dataService.getEvents(selectedCategory);
        setEvents(data);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory]);

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'holiday':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'examination':
        return 'bg-primary-50 text-primary-800 border-primary-200';
      case 'sports':
        return 'bg-gold-50 text-gold-800 border-gold-200';
      case 'cultural':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'academic':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div>
      <PageHero eyebrow="Academic Planner 2025-26" title="Annual Calendar & Schedules" description="Comprehensive yearly schedule for term openings, unit tests, state board examinations, cultural festivals, vacations, and parent-teacher meetings." />
    <div className="section-padding space-y-12">

      {/* Filter and Export Bar */}
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

          {settings.calendar_pdf_url && (
            <a
              href={settings.calendar_pdf_url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !py-2.5 !px-5 w-full md:w-auto shrink-0"
            >
            <Download size={15} />
            <span>Download Annual Calendar (PDF)</span>
          </a>
          )}
        </div>
      </div>

      {/* Events List / Timeline */}
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading academic calendar events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 card">
            <CalendarIcon size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-slate-700 text-lg">No events in this category</h3>
            <p className="text-xs text-slate-500 mt-1">Please select "All" to view full yearly schedule.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl p-6 shadow-card border border-primary-100/70 hover:border-primary-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getCategoryColor(evt.category)}`}>
                      {evt.category}
                    </span>
                    <span className="text-xs font-bold text-primary-700 text-right">
                      {formatDate(evt.start_date)}
                      {evt.end_date && (
                        <span>
                          {' '}
                          –{' '}
                          {formatDate(evt.end_date)}
                        </span>
                      )}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    {evt.title}
                  </h3>

                  {evt.description && (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {evt.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  {evt.time && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock size={14} className="text-primary-700" />
                      {evt.time}
                    </span>
                  )}
                  {evt.venue && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin size={14} className="text-gold-600" />
                      {evt.venue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CalendarPage;
