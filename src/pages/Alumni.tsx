import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Users, Award, Heart, UserPlus, Quote, MapPin, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { dataService, type AlumniRegistrationPayload } from '../services/dataService';
import type { AlumniItem } from '../data/mockData';
import { useToast } from '../components/shared/ToastContext';

const Alumni: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniItem[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<AlumniRegistrationPayload>({
    full_name: '',
    maiden_name: '',
    batch_year: 2020,
    stream: 'Science',
    current_city: '',
    profession: '',
    organization: '',
    email: '',
    phone: '',
    memories: '',
    willing_to_mentor: true
  });

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const data = await dataService.getAlumni();
        setAlumni(data);
      } catch (err) {
        console.error('Error fetching alumni:', err);
      }
    };
    fetchAlumni();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.batch_year) {
      showToast('Incomplete Form', 'Please enter your Full Name, Email, and Passing Batch Year.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await dataService.submitAlumniRegistration(formData);
      if (res.success) {
        showToast('Registration Successful!', res.message, 'success');
        setFormData({
          full_name: '',
          maiden_name: '',
          batch_year: 2020,
          stream: 'Science',
          current_city: '',
          profession: '',
          organization: '',
          email: '',
          phone: '',
          memories: '',
          willing_to_mentor: true
        });
      } else {
        showToast('Error', res.message, 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'An error occurred.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero eyebrow="Everlasting Bonds" title="Kanyashala Alumnae Network" description="Uniting generations of visionary women leaders, doctors, civil servants, innovators, and changemakers who once walked our corridors." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* Notable Alumnae Spotlight */}
      <div className="container-custom">
        <SectionTitle title="Hall of Fame" subtitle="Notable Alumnae Achievements" center />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((alum) => (
            <div
              key={alum.id}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-primary-100/70 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-primary-100">
                  <img
                    src={alum.photo_url || "/images/placeholder-person.svg"}
                    alt={alum.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent"></div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold-400 text-primary-950">
                    Batch of {alum.batch_year}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif font-bold text-base">{alum.name}</h4>
                    <p className="text-xs text-gold-300 mt-0.5">{alum.designation}</p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Briefcase size={14} className="text-primary-700 shrink-0" />
                    <span>{alum.organization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin size={14} className="text-gold-600 shrink-0" />
                    <span>{alum.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-100">
                    "{alum.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni Registration Form */}
      <div className="container-custom">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-primary-100/70 max-w-3xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mx-auto mb-3">
              <UserPlus size={24} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Join the Alumnae Association
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Re-connect with classmates, mentor current students, and receive reunion invitations.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Your current full name"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Maiden / School Name</label>
                <input
                  type="text"
                  value={formData.maiden_name}
                  onChange={(e) => setFormData({ ...formData, maiden_name: e.target.value })}
                  placeholder="Name during school days"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Passing Batch (Year) *</label>
                <input
                  type="number"
                  required
                  min="1945"
                  max="2026"
                  value={formData.batch_year}
                  onChange={(e) => setFormData({ ...formData, batch_year: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Stream / Standard</label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  className="form-input"
                >
                  <option value="SSC (Class 10)">SSC (Class 10)</option>
                  <option value="Science">HSC Science</option>
                  <option value="Commerce">HSC Commerce</option>
                  <option value="Arts">HSC Arts</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alumna@example.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Current City / Country</label>
                <input
                  type="text"
                  value={formData.current_city}
                  onChange={(e) => setFormData({ ...formData, current_city: e.target.value })}
                  placeholder="e.g. Mumbai, India / London, UK"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Current Profession / Role</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder="e.g. Doctor, Professor, Architect"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Organization / Hospital / Firm</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. AIIMS / TCS / Freelance"
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Cherished School Memories</label>
              <textarea
                rows={3}
                value={formData.memories}
                onChange={(e) => setFormData({ ...formData, memories: e.target.value })}
                placeholder="Share a message or favorite memory from your time at Kanyashala..."
                className="form-input"
              ></textarea>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={formData.willing_to_mentor}
                  onChange={(e) => setFormData({ ...formData, willing_to_mentor: e.target.checked })}
                  className="accent-primary-700 w-4 h-4"
                />
                <span>I am happy to participate as a mentor for career guidance sessions for current girls.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4"
            >
              {submitting ? (
                <span>Registering Profile...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Submit Alumnae Registration</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Alumni;
