import React, { useEffect, useState } from 'react';
import { Building, Monitor, BookOpen, HeartPulse, Trophy, FlaskConical, Presentation, CheckCircle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import { dataService } from '../services/dataService';
import type { FacilityItem } from '../data/mockData';

const icons: Record<string, React.ElementType> = {
  Lab: FlaskConical,
  Computer: Monitor,
  Library: BookOpen,
  Classroom: Presentation,
  Sports: Trophy,
  Health: HeartPulse,
  Building: Building,
};

const Infrastructure: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService
      .getFacilities()
      .then(setFacilities)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="State-of-the-Art Facilities"
        title="Campus Infrastructure"
        description="Modern STEM laboratories, digital smart classrooms, high-speed IT centers, and green open athletic grounds designed to provide an optimal learning sanctuary."
      />

      <div className="section-padding space-y-16 md:space-y-20">
        {/* Facilities Grid */}
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-slate-500">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Loading campus facilities...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((fac) => {
                const Icon = icons[fac.icon] || Building;
                return (
                  <article key={fac.id} className="card overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                    <div className="relative h-52 overflow-hidden bg-primary-100">
                      {fac.image_url && (
                        <img
                          src={fac.image_url}
                          alt={fac.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {fac.category && (
                        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-primary-800 backdrop-blur-md">
                          {fac.category}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                          <Icon size={18} />
                        </div>
                        <h3 className="font-serif font-bold text-slate-900 text-lg leading-snug">{fac.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{fac.description}</p>
                    </div>

                    {fac.specs?.length > 0 && (
                      <ul className="mx-6 mb-6 pt-4 border-t border-primary-100 space-y-2">
                        {fac.specs.map((spec) => (
                          <li key={spec} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle size={14} className="text-brand-accent shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Green Campus Banner (was a dark navy block) */}
        <div className="container-custom">
          <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-emerald-50 via-brand-cream to-gold-50 border border-emerald-100 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                <Leaf size={14} /> Eco-Friendly & Sustainable
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-900">
                Green Campus & Solar Power Infrastructure
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our campus is powered by a 25kW rooftop solar array, rainwater recharging pits, tree-canopied courtyards,
                and zero-plastic waste recycling protocols.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link to="/gallery" className="btn-primary">
                View Campus Photo Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
