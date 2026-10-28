import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Trophy, Award, Star, Medal, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { ResultItem, AchievementItem } from '../data/mockData';

const shortExamName = (name: string) =>
  name
    .replace(/Maharashtra /i, '')
    .replace(/Junior College /i, '')
    .replace(/(Class 10)/i, '')
    .replace(/[()]/g, '')
    .trim();

const Results: React.FC = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    Promise.all([dataService.getResults(), dataService.getAchievements()])
      .then(([resultData, achievementData]) => {
        setResults(resultData);
        setAchievements(achievementData);
      })
      .finally(() => setLoading(false));
  }, []);

  // Year tabs come from the data, newest first, so new years added by the admin appear automatically.
  const sessionYears = Array.from(new Set(results.map((r) => r.academic_year))).sort().reverse();
  const activeYear = selectedYear || sessionYears[0] || 'All Sessions';
  const years = [...sessionYears, 'All Sessions'];

  const filteredResults = activeYear === 'All Sessions' ? results : results.filter((r) => r.academic_year === activeYear);
  const groupedYears = Array.from(new Set(filteredResults.map((r) => r.academic_year)));

  // Headline banner: latest session's pass rates + overall distinction ratio.
  const latest = results.filter((r) => r.academic_year === sessionYears[0]);
  const appeared = latest.reduce((sum, r) => sum + r.total_appeared, 0);
  const distinctions = latest.reduce((sum, r) => sum + r.distinction_count, 0);
  const highlights = [
    ...latest.slice(0, 3).map((r) => ({ value: `${r.pass_percentage}%`, label: shortExamName(r.exam_type) })),
    ...(appeared > 0 ? [{ value: `${Math.round((distinctions / appeared) * 100)}%`, label: 'Distinction Ratio' }] : []),
  ];

  return (
    <div>
      <PageHero eyebrow="Academic & Co-Curricular Glory" title="Results & Achievements" description="Celebrating a proud history of board examination success, state merit ranks, and prestigious sporting trophies." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* Headline Banner */}
      {highlights.length > 0 && (
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold-400/15" aria-hidden />
            <p className="relative text-center text-xs font-bold uppercase tracking-[0.18em] text-gold-300 mb-6">
              Board Results {sessionYears[0]}
            </p>
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {highlights.map((h) => (
                <div key={h.label}>
                  <span className="text-4xl md:text-5xl font-serif font-bold text-gold-300 block">{h.value}</span>
                  <span className="text-xs font-semibold text-primary-100 uppercase tracking-wider mt-2 block">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Board Results by Stream & Toppers */}
      <div className="container-custom space-y-10">
        <SectionTitle title="Board Examination Merits" subtitle="Academic Performance Breakdown" center />

        {/* Academic Year Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`chip ${
                activeYear === year
                  ? 'chip-active'
                  : 'chip-idle'
              }`}
            >
              {year === 'All Sessions' ? year : `Session ${year}`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading examination results...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedYears.map((year) => {
              const yearItems = filteredResults.filter(r => r.academic_year === year);
              return (
                <div key={year} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
                      Academic Session {year}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({yearItems.length} Examination {yearItems.length === 1 ? 'Division' : 'Divisions'})
                    </span>
                  </div>

                  <div className="grid gap-8">
                    {yearItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl p-8 shadow-card border border-primary-100/70 space-y-6"
                      >
                        {/* Stream Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                          <div>
                            <span className="text-[11px] font-semibold text-gold-700 uppercase tracking-wider block">
                              State Board Examination
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                              {item.exam_type}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 bg-brand-light px-4 py-2.5 rounded-2xl border border-primary-100 text-xs">
                            <div>
                              <span className="text-slate-500 block">Appeared / Passed:</span>
                              <strong className="text-slate-900 tabular-nums text-sm">{item.total_appeared} / {item.passed}</strong>
                            </div>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                              <span className="text-slate-500 block">Distinctions:</span>
                              <strong className="text-primary-700 tabular-nums text-sm">{item.distinction_count}</strong>
                            </div>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                              <span className="text-slate-500 block">Pass Rate:</span>
                              <strong className="text-brand-accent tabular-nums text-sm">{item.pass_percentage}%</strong>
                            </div>
                          </div>
                        </div>

                        {/* Toppers Cards */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                            <Trophy size={14} className="text-gold-500" /> School Rank Holders & Merit Toppers
                          </h4>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {item.toppers.map((topper) => (
                              <div
                                key={topper.rank}
                                className="bg-brand-light rounded-2xl p-5 border border-primary-100 flex items-center gap-4 group hover:bg-white hover:shadow-card transition-all"
                              >
                                <div className="relative shrink-0">
                                  <img
                                    src={topper.photo_url || "/images/placeholder-person.svg"}
                                    alt={topper.name}
                                    className="w-16 h-16 rounded-2xl object-cover object-top"
                                  />
                                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gold-400 text-primary-950 font-bold text-xs flex items-center justify-center shadow">
                                    #{topper.rank}
                                  </span>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h5 className="font-serif font-bold text-slate-900 text-sm truncate">{topper.name}</h5>
                                  {topper.stream && (
                                    <p className="text-[11px] text-slate-500 truncate">{topper.stream}</p>
                                  )}
                                  <div className="text-lg font-bold font-serif text-primary-700 mt-1">
                                    {topper.percentage}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sports & Extra-Curricular Hall of Fame */}
      <div className="container-custom">
        <SectionTitle title="Trophies & Championships" subtitle="Sports & Cultural Honors" center />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-card border border-primary-100/70 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center mb-4">
                  <Medal size={22} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {ach.year}
                </span>
                <h4 className="font-serif font-bold text-slate-900 text-base mt-2 mb-1">{ach.title}</h4>
                <p className="text-xs font-bold text-primary-700 mb-2">{ach.award}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Results;
