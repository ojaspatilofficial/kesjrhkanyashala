import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { BookOpen, CheckCircle, Award, Compass, Cpu, Layers, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'secondary' | 'science' | 'commerce' | 'arts'>('secondary');

  const curriculumTabs = [
    { id: 'secondary', label: 'Secondary (SSC 5th-10th)' },
    { id: 'science', label: 'Jr. College - Science' },
    { id: 'commerce', label: 'Jr. College - Commerce' },
    { id: 'arts', label: 'Jr. College - Arts' }
  ];

  return (
    <div>
      <PageHero eyebrow="Academic Excellence" title="Curriculum, Streams & Pedagogy" description="Comprehensive education under the Maharashtra State Board, blending conceptual foundations with practical lab mastery and competitive entrance readiness." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* Curriculum Streams Interactive Tabs */}
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {curriculumTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`chip ${
                activeTab === tab.id
                  ? 'chip-active'
                  : 'chip-idle'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Secondary SSC (5th - 10th) */}
        {activeTab === 'secondary' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-primary-100/70 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-primary-50 text-primary-700">
                Grades V to X • Maharashtra SSC Board
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Foundational & High School Education
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The secondary program builds deep conceptual clarity across core disciplines while encouraging creative expression, logical reasoning, and linguistic proficiency in Marathi, English, Hindi, and Sanskrit.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Key Subjects Offered:</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ First Language (Marathi / English)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Mathematics (Algebra & Geometry)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Science & Technology (Physics, Chemistry, Biology)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Social Sciences (History, Geography, Civics)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Sanskrit / Hindi Composite</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Information Technology & Drawing</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="btn-primary">
                  Admissions for Grade 5-10
                </Link>
                <Link to="/downloads" className="btn-secondary">
                  Download SSC Syllabus
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-primary-50 rounded-3xl p-6 border border-primary-100 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-primary-700 text-lg mb-3">Highlights of SSC Wing</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-brand-accent mt-0.5 shrink-0" size={16} />
                    <span><strong>100% SSC Results:</strong> Unbroken track record of cent-percent passing in board exams.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-brand-accent mt-0.5 shrink-0" size={16} />
                    <span><strong>Continuous Comprehensive Evaluation (CCE):</strong> Regular unit assessments and practical project work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-brand-accent mt-0.5 shrink-0" size={16} />
                    <span><strong>Science Fair & Olympiad Mentorship:</strong> Dedicated coaching for National Talent Search (NTS) and Math Olympiads.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-primary-200">
                <p className="text-xs text-primary-700 font-bold uppercase tracking-wider">Medium of Instruction</p>
                <p className="text-xs text-slate-600 mt-0.5">Marathi & Semi-English (Maths & Science in English)</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Junior College Science */}
        {activeTab === 'science' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-primary-100/70 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-gold-100 text-gold-800">
                Class XI & XII • HSC Science Stream
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Science & Technological Research Wing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Designed for ambitious female scholars aiming for engineering, medicine, pharmacy, biotechnology, architecture, and computer science careers. High emphasis on experimental laboratory practicals and entrance test foundations.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Subject Combinations:</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Physics (Theory + Lab Practicals)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Chemistry (Organic & Analytical Lab)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Biology (Botany & Zoology)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Higher Mathematics & Statistics</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Information Technology (IT) / Computer Science</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ English & Environmental Education</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="btn-primary">
                  Apply for Science Stream
                </Link>
                <Link to="/infrastructure" className="btn-secondary">
                  Explore Science Labs
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gold-50 rounded-3xl p-6 border border-gold-200 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-primary-700 text-lg mb-3">Specialized Science Facilities</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-gold-600 mt-0.5 shrink-0" size={16} />
                    <span><strong>Full-Scale Dedicated Labs:</strong> Independent Physics, Chemistry, and Biology laboratories equipped with modern apparatus.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-gold-600 mt-0.5 shrink-0" size={16} />
                    <span><strong>MHT-CET & NEET Guidance:</strong> In-house faculty doubt-clearing sessions and mock test series.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Junior College Commerce */}
        {activeTab === 'commerce' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-primary-100/70 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Class XI & XII • HSC Commerce Stream
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Commerce, Finance & Entrepreneurship
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Empowering students with analytical, accounting, and financial management skills for Chartered Accountancy (CA), Company Secretary (CS), banking, corporate management, and business leadership.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Commerce Subjects:</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Book Keeping & Accountancy</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Organisation of Commerce & Management (OCM)</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Business Economics</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Secretarial Practice (SP) / Mathematics</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Information Technology / Marathi</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ English & Environmental Education</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="btn-primary">
                  Apply for Commerce Stream
                </Link>
                <Link to="/results" className="btn-secondary">
                  View Commerce Toppers
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-emerald-800 text-lg mb-3">Commerce Excellence</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-emerald-600 mt-0.5 shrink-0" size={16} />
                    <span><strong>CA Foundation Readiness:</strong> Conceptual depth in accounts and business mathematics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-emerald-600 mt-0.5 shrink-0" size={16} />
                    <span><strong>Practical Financial Literacy:</strong> Stock market simulations, banking visits, and GST fundamentals.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Junior College Arts */}
        {activeTab === 'arts' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-primary-100/70 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-orange-100 text-orange-900">
                Class XI & XII • HSC Arts & Humanities
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Humanities, Social Sciences & Civil Services
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nurturing inquisitive minds in literature, history, political philosophy, sociology, and psychology for careers in UPSC/MPSC civil services, law, journalism, academia, and social policy.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Arts Subjects:</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ History of India & World</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Political Science & Constitution</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Economics</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Marathi Literature / Sanskrit</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ Sociology / Psychology</div>
                  <div className="p-3 bg-brand-light rounded-xl border border-primary-100">▸ English & Environmental Education</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="btn-primary">
                  Apply for Arts Stream
                </Link>
                <Link to="/staff" className="btn-secondary">
                  Meet Humanities Faculty
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-orange-50 rounded-3xl p-6 border border-orange-100 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-orange-900 text-lg mb-3">Humanities Opportunities</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-orange-700 mt-0.5 shrink-0" size={16} />
                    <span><strong>MPSC/UPSC Guidance Cell:</strong> Early awareness workshops and current affairs forums.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-orange-700 mt-0.5 shrink-0" size={16} />
                    <span><strong>Literary and Debate Mentorship:</strong> State and national level elocution and essay championships.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Teaching Pedagogy & Assessment Matrix */}
      <div className="container-custom">
        <SectionTitle title="Our Pedagogical Framework" subtitle="Teaching & Learning Approach" center />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Experiential & Lab Learning',
              desc: 'Concepts are reinforced through hands-on experiments, field visits to biodiversity zones and historical sites in Raigad.',
              icon: Cpu
            },
            {
              title: 'Continuous Assessment',
              desc: 'Periodic unit assessments, surprise quizzes, open-book worksheets, and detailed diagnostic parent feedbacks.',
              icon: Layers
            },
            {
              title: 'Mentorship & Remedial Care',
              desc: 'Dedicated remedial coaching for students requiring extra academic support after regular school hours.',
              icon: HelpCircle
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-card border border-primary-100/70">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Academics;
