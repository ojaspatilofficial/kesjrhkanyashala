import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Download, CheckCircle, Calculator, UserPlus, Calendar, ShieldCheck, ArrowRight, Clock, FileText } from 'lucide-react';
import { dataService, type AdmissionEnquiryPayload } from '../services/dataService';
import { useToast } from '../components/shared/ToastContext';
import { useSettings } from '../components/shared/SettingsContext';
import { Link } from 'react-router-dom';

const Admissions: React.FC = () => {
  const { showToast } = useToast();
  const settings = useSettings();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<AdmissionEnquiryPayload>({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    grade_applying: 'Grade 5',
    previous_school: '',
    academic_year: settings.admission_year,
    message: ''
  });

  // Fee Calculator State
  const [calcGrade, setCalcGrade] = useState<'secondary' | 'sci' | 'comm' | 'arts'>('secondary');
  const [needBus, setNeedBus] = useState(false);
  const [needUniformSet, setNeedUniformSet] = useState(false);

  const feeData = {
    secondary: { tuition: 4500, term: 1200, lab: 800, name: 'Secondary (Class 5th - 10th)' },
    sci: { tuition: 8500, term: 2000, lab: 3500, name: 'Jr. College Science (11th & 12th)' },
    comm: { tuition: 6500, term: 1800, lab: 1500, name: 'Jr. College Commerce (11th & 12th)' },
    arts: { tuition: 5500, term: 1500, lab: 1000, name: 'Jr. College Arts (11th & 12th)' }
  };

  const selectedFee = feeData[calcGrade];
  const busFee = needBus ? 3500 : 0;
  const uniformFee = needUniformSet ? 1800 : 0;
  const totalAnnualFee = selectedFee.tuition + selectedFee.term + selectedFee.lab + busFee + uniformFee;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name || !formData.parent_name || !formData.phone || !formData.email) {
      showToast('Missing Details', 'Please complete all required fields (Student Name, Parent Name, Phone, Email).', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await dataService.submitAdmissionEnquiry(formData);
      if (res.success) {
        showToast('Enquiry Submitted!', res.message, 'success');
        setFormData({
          student_name: '',
          parent_name: '',
          email: '',
          phone: '',
          grade_applying: 'Grade 5',
          previous_school: '',
          academic_year: settings.admission_year,
          message: ''
        });
      } else {
        showToast('Submission Issue', res.message, 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'An unexpected error occurred.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero eyebrow={`Admissions ${settings.admission_year}`} title="Begin Your Journey at Kanyashala" description="Transparent, merit-based, and student-focused admissions for Grades V through XII. We welcome parents and students to join our legacy of excellence." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* 4-Step Application Timeline */}
      <div className="container-custom">
        <SectionTitle title="Admission Roadmap" subtitle="Simple 4-Step Process" center />

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Online Enquiry / Form', desc: 'Submit the online enquiry form below or collect physical registration forms from the school admissions counter.' },
            { step: '02', title: 'Document Verification', desc: 'Submit previous academic marksheets, birth certificate, transfer certificate (original), and photo identity.' },
            { step: '03', title: 'Counseling & Interaction', desc: 'A friendly interaction with the Principal and academic coordinators to assess interests and stream selection.' },
            { step: '04', title: 'Enrollment & Fee Token', desc: 'Formal confirmation of seat allotment and payment of government-subsidized nominal term fees.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-card border border-primary-100/70 relative overflow-hidden group hover:border-primary-300 transition-all">
              <span className="text-4xl font-serif font-bold text-gold-400 group-hover:text-primary-700 transition-colors">
                {item.step}
              </span>
              <h3 className="font-serif font-bold text-slate-900 text-lg mt-2 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Online Form & Documents Checklist */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Online Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-card border border-primary-100/70">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                <UserPlus size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Online Admission Enquiry Form</h3>
                <p className="text-xs text-slate-500">Direct submission to school admissions database</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="e.g. Ananya Suresh Patil"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    placeholder="e.g. Suresh M. Patil"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Grade / Stream Applying For *</label>
                  <select
                    value={formData.grade_applying}
                    onChange={(e) => setFormData({ ...formData, grade_applying: e.target.value })}
                    className="form-input"
                  >
                    <option value="Grade 5">Grade 5 (Middle School)</option>
                    <option value="Grade 6">Grade 6 (Middle School)</option>
                    <option value="Grade 7">Grade 7 (Middle School)</option>
                    <option value="Grade 8">Grade 8 (Secondary)</option>
                    <option value="Grade 9">Grade 9 (Secondary)</option>
                    <option value="Grade 10">Grade 10 (SSC)</option>
                    <option value="Class 11 - Science">Class 11 - Science Stream</option>
                    <option value="Class 11 - Commerce">Class 11 - Commerce Stream</option>
                    <option value="Class 11 - Arts">Class 11 - Arts Stream</option>
                    <option value="Class 12 - Science">Class 12 - Science Stream</option>
                    <option value="Class 12 - Commerce">Class 12 - Commerce Stream</option>
                    <option value="Class 12 - Arts">Class 12 - Arts Stream</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Previous School Name</label>
                  <input
                    type="text"
                    value={formData.previous_school}
                    onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                    placeholder="e.g. Alibag Primary School"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Additional Notes / Queries</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention any specific scholarship requirements, transport needs, or questions..."
                  className="form-input"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Submit Admission Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Required Documents & Important Dates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-gold p-8">
              <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2 text-primary-900">
                <FileText size={20} className="text-gold-600" />
                Required Documents Checklist
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {[
                  'Original Birth Certificate (for 5th standard admissions)',
                  'Original School Leaving Certificate (T.C.) countersigned',
                  'Previous Academic Year Marksheet & Report Card',
                  'Aadhar Card copy (Student & Parents)',
                  '4 Recent Passport Sized Color Photographs',
                  'Caste / Income Certificate (for Govt. Scholarship DBT)',
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5">
                    <CheckCircle size={17} className="text-gold-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gold-200">
                {settings.prospectus_pdf_url ? (
                  <a href={settings.prospectus_pdf_url} target="_blank" rel="noreferrer" className="btn-primary w-full">
                    <Download size={16} />
                    Download Admissions Prospectus (PDF)
                  </a>
                ) : (
                  <Link to="/downloads" className="btn-primary w-full">
                    <Download size={16} />
                    Admission Forms & Prospectus
                  </Link>
                )}
              </div>
            </div>

            <div className="card p-8">
              <h4 className="font-serif font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Clock size={18} className="text-primary-700" />
                Admission Desk Timings
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                The admissions office is open Monday to Saturday for walk-in parent interactions and counseling.
              </p>
              <dl className="text-sm space-y-2 text-slate-700 bg-brand-light p-4 rounded-2xl border border-primary-100">
                <div className="flex justify-between gap-3"><dt>Morning slot</dt><dd className="font-semibold">08:30 AM – 12:30 PM</dd></div>
                <div className="flex justify-between gap-3"><dt>Afternoon slot</dt><dd className="font-semibold">01:30 PM – 04:00 PM</dd></div>
                <div className="flex justify-between gap-3">
                  <dt>Helpline</dt>
                  <dd className="font-semibold">
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-primary-700 hover:underline">{settings.phone}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Fee Structure & Estimate Calculator */}
      <div className="container-custom">
        <div className="card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-700 via-gold-400 to-primary-700" aria-hidden />
          <div className="max-w-2xl mb-8">
            <span className="eyebrow mb-2">Transparency & Affordability</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-900">Annual Fee Structure & Estimator</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              As a government-aided heritage institution under Konkan Education Society, fees are highly subsidized to make premier education accessible to every young woman.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="form-label">Select educational wing / stream</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { id: 'secondary', label: 'Secondary (5th – 10th)' },
                    { id: 'sci', label: 'Jr. College (Science)' },
                    { id: 'comm', label: 'Jr. College (Commerce)' },
                    { id: 'arts', label: 'Jr. College (Arts)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCalcGrade(opt.id as typeof calcGrade)}
                      className={`p-3.5 rounded-2xl text-sm font-semibold text-left border-2 transition-all ${
                        calcGrade === opt.id
                          ? 'bg-primary-50 border-primary-600 text-primary-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="form-label">Optional add-on facilities</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-light border border-slate-200 cursor-pointer hover:border-primary-300">
                    <input type="checkbox" checked={needBus} onChange={(e) => setNeedBus(e.target.checked)} className="accent-primary-700 w-4 h-4" />
                    <span className="text-sm text-slate-700">School Bus Transport (+₹3,500/yr)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-light border border-slate-200 cursor-pointer hover:border-primary-300">
                    <input
                      type="checkbox"
                      checked={needUniformSet}
                      onChange={(e) => setNeedUniformSet(e.target.checked)}
                      className="accent-primary-700 w-4 h-4"
                    />
                    <span className="text-sm text-slate-700">Uniform & Blazer Kit (+₹1,800)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary-50 to-gold-50 rounded-3xl p-6 border border-primary-100 space-y-4">
              <div>
                <h4 className="font-serif font-bold text-primary-900 text-base">Estimated Annual Fee Summary</h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedFee.name}</p>
              </div>

              <div className="space-y-2 text-sm text-slate-700 border-b border-primary-200 pb-4">
                {(
                  [
                    ['Tuition & Examination Fee', selectedFee.tuition],
                    ['Term & Library Maintenance', selectedFee.term],
                    ['Science / Computer Lab Fee', selectedFee.lab],
                    ...(needBus ? [['School Transport Service', busFee]] : []),
                    ...(needUniformSet ? [['Uniform & House Badges', uniformFee]] : []),
                  ] as [string, number][]
                ).map(([label, amount]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <span>{label}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-end justify-between pt-1 gap-3">
                <div>
                  <span className="text-sm font-semibold text-slate-700">Total Estimated Annual Fee</span>
                  <p className="text-xs text-brand-accent">Payable in 2 easy term installments</p>
                </div>
                <div className="text-3xl font-bold font-serif text-primary-800 tabular-nums">₹{totalAnnualFee.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admissions;
