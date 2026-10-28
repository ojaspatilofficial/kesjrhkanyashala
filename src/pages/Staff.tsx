import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Search, Mail, Award, BookOpen, User, GraduationCap, Briefcase } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { StaffItem } from '../data/mockData';

const Staff: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const departments = ['All', 'Leadership', 'Science & Math', 'Languages', 'Social Sciences', 'Commerce', 'Arts & Sports'];

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const data = await dataService.getStaff(selectedDept);
        setStaffList(data);
      } catch (err) {
        console.error('Error fetching staff:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [selectedDept]);

  const filteredStaff = staffList.filter((s) => {
    const query = searchQuery.toLowerCase();
    const matchesName = s.name.toLowerCase().includes(query);
    const matchesSubject = s.subjects && s.subjects.some((sub) => sub.toLowerCase().includes(query));
    const matchesQual = s.qualification.toLowerCase().includes(query);
    return matchesName || matchesSubject || matchesQual;
  });

  return (
    <div>
      <PageHero eyebrow="Our Experienced Faculty" title="Meet Our Mentors & Educators" description="Over 85 seasoned, passionate teachers and state award-winning educators committed to cultivating academic depth and character in every student." />
    <div className="section-padding space-y-12">

      {/* Filter and Search Bar */}
      <div className="container-custom">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-primary-100/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`chip ${
                  selectedDept === dept
                    ? 'chip-active'
                    : 'chip-idle'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by teacher name or subject..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none bg-brand-light"
            />
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading faculty profiles...</p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-soft">
            <User size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-slate-700 text-lg">No faculty members found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another department or resetting the search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-primary-100/70 hover:shadow-xl hover:border-primary-300 transition-all flex flex-col group"
              >
                {/* Photo Header with Department Tag */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={staff.photo_url || "/images/placeholder-person.svg"}
                    alt={staff.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent"></div>
                  
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-primary-800 backdrop-blur-md">
                    {staff.department}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-serif font-bold leading-tight">
                      {staff.name}
                    </h3>
                    <p className="text-xs text-gold-300 font-medium mt-0.5">
                      {staff.designation}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <GraduationCap size={15} className="text-primary-700 shrink-0 mt-0.5" />
                      <span>{staff.qualification}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Briefcase size={15} className="text-primary-700 shrink-0" />
                      <span>{staff.experience_years} Years Teaching Experience</span>
                    </div>

                    {staff.subjects && staff.subjects.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Specialization</p>
                        <div className="flex flex-wrap gap-1.5">
                          {staff.subjects.map((sub, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {staff.bio && (
                      <p className="text-xs text-slate-500 leading-relaxed italic pt-1">
                        "{staff.bio}"
                      </p>
                    )}
                  </div>

                  {staff.email && (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={`mailto:${staff.email}`}
                        className="text-xs font-semibold text-primary-700 hover:underline flex items-center gap-1.5"
                      >
                        <Mail size={14} />
                        <span>{staff.email}</span>
                      </a>
                    </div>
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

export default Staff;
