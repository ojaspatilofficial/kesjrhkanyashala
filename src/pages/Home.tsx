import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Calendar as CalendarIcon,
  Award,
  UserPlus,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Quote,
  Compass,
  Users,
  Building,
  Trophy,
  Paperclip,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/shared/SectionTitle';
import schoolBuilding from '../assets/JRH-school-building.jpg';
import { dataService } from '../services/dataService';
import { useSettings } from '../components/shared/SettingsContext';
import { parseDate, todayISO } from '../lib/api';
import type { NoticeItem, CalendarEventItem, TestimonialItem } from '../data/mockData';

const academicStreams = [
  {
    title: 'Secondary School (SSC)',
    grades: 'Grades V to X',
    desc: 'Maharashtra State Board curriculum emphasizing strong foundations in sciences, mathematics, languages, social values, and digital literacy.',
    badge: '100% Pass Rate',
  },
  {
    title: 'Junior College – Science',
    grades: 'Grades XI & XII',
    desc: 'Physics, Chemistry, Biology, Mathematics & IT with integrated preparation for MHT-CET, NEET, and JEE foundation.',
    badge: 'Advanced STEM Labs',
  },
  {
    title: 'Junior College – Commerce',
    grades: 'Grades XI & XII',
    desc: 'Book Keeping, Accountancy, Economics, Secretarial Practice & Computer Applications with practical financial literacy workshops.',
    badge: 'High Distinction Ratio',
  },
  {
    title: 'Junior College – Arts',
    grades: 'Grades XI & XII',
    desc: 'Literature, History, Political Science, Psychology and Sociology cultivating critical thinking for civil services and law aspirants.',
    badge: 'Eminent Faculty',
  },
];

const campusFeatures = [
  {
    title: 'The 4 House System',
    desc: 'Ahilyabai Holkar, Rani Laxmibai, Savitribai Phule, and Jijabai houses fostering teamwork and leadership.',
    icon: ShieldCheck,
    to: '/student-life',
  },
  {
    title: 'STEM & Robotics Lab',
    desc: 'Equipped with digital IoT modules, physics kits, and coding workstations.',
    icon: BookOpen,
    to: '/infrastructure',
  },
  {
    title: 'Self-Defense & Sports',
    desc: 'Compulsory self-defense workshops, kho-kho, kabaddi, volleyball, and track events.',
    icon: Award,
    to: '/student-life',
  },
  {
    title: 'Scouts & Cultural Fests',
    desc: 'Annual "Tarang" cultural festival, classical dance, Marathi theatre, and community service.',
    icon: Compass,
    to: '/student-life',
  },
];

const dateBadge = (value: string) => {
  const d = parseDate(value);
  return {
    day: d ? d.getDate() : '–',
    month: d ? d.toLocaleString('en-IN', { month: 'short' }) : '',
  };
};

const Home: React.FC = () => {
  const settings = useSettings();
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [eventsAreUpcoming, setEventsAreUpcoming] = useState(true);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    Promise.all([dataService.getNotices(), dataService.getEvents(), dataService.getTestimonials()]).then(
      ([noticesData, eventsData, testimonialData]) => {
        setNotices(noticesData.slice(0, 4));
        const today = todayISO();
        const upcoming = eventsData.filter((e) => (e.end_date || e.start_date) >= today);
        if (upcoming.length > 0) {
          setEvents(upcoming.slice(0, 3));
          setEventsAreUpcoming(true);
        } else {
          setEvents(eventsData.slice(-3).reverse());
          setEventsAreUpcoming(false);
        }
        setTestimonials(testimonialData.slice(0, 3));
      }
    );
  }, []);

  const stats = [
    { label: 'Students', value: settings.stat_students, icon: Users },
    { label: 'Teachers', value: settings.stat_teachers, icon: BookOpen },
    { label: 'Years of Heritage', value: settings.stat_years, icon: Building },
    { label: 'Pass Percentage', value: settings.stat_pass_rate, icon: Trophy },
  ];

  const principalParagraphs = settings.principal_message.split(/\n\s*\n/).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center text-white overflow-hidden bg-primary-950">
        <img
          src={schoolBuilding}
          alt="K.E.S. Kanyashala campus building"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-950/75 to-primary-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />

        <div className="container-custom relative z-10 pt-16 pb-36 md:pt-24 md:pb-44">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gold-400/15 text-gold-300 font-semibold text-xs md:text-sm mb-6 border border-gold-300/40 backdrop-blur-md">
              <Sparkles size={16} />
              <span>Empowering Girls Since 1939 • Alibag, Raigad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] mb-6">
              Nurturing Intellect. Inspiring <span className="text-gold-300">Leadership</span>.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-50/90 mb-8 leading-relaxed max-w-2xl">
              Konkan Education Society's premier institution for girls — fostering academic excellence, modern science
              education, sports, and moral values for over 85 years.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/admissions" className="btn-gold group shadow-xl">
                <UserPlus size={18} />
                Admission Enquiry {settings.admission_year}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-outline-light">
                Explore Our Legacy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-20 md:-mt-24 pb-4">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  key={stat.label}
                  className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex flex-col items-center text-center border-b-4 border-gold-400 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-700 mb-3">
                    <Icon size={24} />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-primary-800 font-serif mb-1">{stat.value}</p>
                  <p className="text-slate-600 font-medium text-xs md:text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal's Desk */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold-200 to-primary-200 rotate-2" aria-hidden />
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5] relative border-4 border-white bg-primary-100">
                {settings.principal_photo && (
                  <img src={settings.principal_photo} alt={settings.principal_name} className="w-full h-full object-cover object-top" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif font-bold text-lg leading-snug">{settings.principal_name}</p>
                  <p className="text-xs text-gold-300 font-medium">{settings.principal_title}</p>
                  <p className="text-[11px] text-primary-100/80 mt-0.5">{settings.principal_qualification}</p>
                </div>
              </div>
              {settings.principal_quote && (
                <div className="absolute -bottom-8 -right-4 bg-primary-800 text-white p-5 rounded-2xl shadow-xl max-w-[15rem] hidden sm:block border-2 border-white">
                  <p className="text-[11px] font-bold text-gold-300 uppercase tracking-wider mb-1">Our Core Ethos</p>
                  <p className="text-xs leading-relaxed text-primary-50">“{settings.principal_quote}”</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <SectionTitle title="Welcome to K.E.S. Kanyashala" subtitle="Principal's Desk" />

              <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
                {principalParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-primary-100 shadow-card">
                  <ShieldCheck className="text-brand-accent shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Safe & Supportive Campus</p>
                    <p className="text-xs text-slate-500">24x7 CCTV, security, medical room & dedicated counseling.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-primary-100 shadow-card">
                  <Award className="text-primary-700 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Academic Distinction</p>
                    <p className="text-xs text-slate-500">Consistent board results with top district rankers.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-primary">
                  Read Our History
                </Link>
                <Link to="/staff" className="text-sm font-semibold text-primary-700 hover:text-primary-900 inline-flex items-center gap-1">
                  Meet Our Faculty <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="section-padding bg-white border-y border-primary-100/70">
        <div className="container-custom">
          <SectionTitle title="Academic Wings & Streams" subtitle="Curriculum Progression" center />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicStreams.map((stream, idx) => (
              <motion.div
                key={stream.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-brand-light rounded-3xl p-6 border border-primary-100 hover:border-primary-300 hover:shadow-card flex flex-col group transition-all"
              >
                <span className="self-start text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-100 text-primary-800 mb-4">
                  {stream.badge}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 group-hover:text-primary-700 transition-colors">
                  {stream.title}
                </h3>
                <p className="text-xs font-semibold text-gold-700 mb-3">{stream.grades}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{stream.desc}</p>
                <Link to="/academics" className="mt-auto inline-flex items-center text-sm font-semibold text-primary-700">
                  View Subjects
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/academics" className="btn-secondary">
              Explore Complete Academic Framework
            </Link>
          </div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <SectionTitle title="Announcements & Circulars" subtitle="Stay Informed" />
            <Link to="/notices" className="btn-secondary !py-2 !px-5 mb-10">
              View All Notices
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {notices.map((notice) => {
                const d = dateBadge(notice.publish_date);
                return (
                  <Link
                    to="/notices"
                    key={notice.id}
                    className="p-5 rounded-2xl bg-white shadow-card border border-primary-100/70 hover:border-primary-300 transition-all flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-50 text-primary-700 rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:bg-primary-700 group-hover:text-white transition-colors">
                      <span className="text-lg font-bold leading-none">{d.day}</span>
                      <span className="text-[10px] font-semibold uppercase">{d.month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {notice.category}
                        </span>
                        {notice.is_new && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">NEW</span>
                        )}
                        {notice.is_pinned && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800">PINNED</span>
                        )}
                        {notice.attachment_url && <Paperclip size={13} className="text-slate-400" aria-label="Has attachment" />}
                      </div>
                      <h3 className="font-sans font-semibold text-slate-800 text-sm md:text-base group-hover:text-primary-700 transition-colors line-clamp-1">
                        {notice.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{notice.description}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-700 shrink-0 self-center" />
                  </Link>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold-400/20" aria-hidden />
                <div className="relative">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 mb-3">
                    Admissions {settings.admission_year}
                  </span>
                  <h3 className="text-2xl font-serif font-bold mb-2">Join K.E.S. Kanyashala</h3>
                  <p className="text-sm text-primary-100 leading-relaxed mb-6">
                    Enrolling students for Grades 5 to 12. Merit scholarships and fee concessions available for eligible girls.
                  </p>
                  <Link to="/admissions" className="btn-gold !py-2.5 !px-5">
                    Apply Online Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <CalendarIcon size={18} className="text-primary-700" />
                    {eventsAreUpcoming ? 'Upcoming Events' : 'Recent Events'}
                  </h3>
                  <Link to="/calendar" className="text-xs font-bold text-primary-700 hover:underline">
                    Full Calendar
                  </Link>
                </div>
                <div className="space-y-3">
                  {events.map((evt) => {
                    const d = dateBadge(evt.start_date);
                    return (
                      <div key={evt.id} className="p-3 rounded-xl bg-gold-50/70 border border-gold-100 flex items-start gap-3">
                        <div className="w-11 h-11 rounded-lg bg-white text-gold-800 border border-gold-200 flex flex-col items-center justify-center shrink-0">
                          <span className="text-sm font-bold leading-none">{d.day}</span>
                          <span className="text-[9px] font-semibold uppercase">{d.month}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800 text-sm line-clamp-1">{evt.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{evt.time || evt.venue}</p>
                        </div>
                      </div>
                    );
                  })}
                  {events.length === 0 && <p className="text-sm text-slate-500">No events scheduled yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life (was a navy block; now a warm band that matches the palette) */}
      <section className="section-padding bg-gradient-to-br from-gold-50 via-brand-cream to-primary-50 border-y border-gold-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <SectionTitle title="Vibrant Campus Life & Holistic Growth" subtitle="Beyond Academics" center />
            <p className="text-sm md:text-base text-slate-600 -mt-4 mb-12">
              Developing well-rounded personalities through four houses, specialized clubs, self-defense karate, and
              state-level athletic training.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.to}
                  className="p-6 rounded-3xl bg-white border border-gold-100 shadow-card hover:-translate-y-1 hover:border-gold-300 transition-all flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-gold-300 flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{feature.desc}</p>
                  <span className="mt-auto text-sm font-semibold text-primary-700 inline-flex items-center gap-1">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionTitle title="Voices of Our Community" subtitle="Alumnae & Parent Testimonials" center />

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <figure key={item.id} className="card p-8 flex flex-col">
                  <Quote size={32} className="text-gold-400 mb-4" />
                  <blockquote className="text-sm text-slate-700 italic leading-relaxed mb-6">“{item.quote}”</blockquote>
                  <figcaption className="mt-auto pt-4 border-t border-primary-100">
                    <p className="font-bold text-slate-900 text-sm">{item.author}</p>
                    <p className="text-xs text-primary-700 font-medium mt-0.5">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/alumni" className="btn-secondary">
                View Notable Alumnae
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:22px_22px]" aria-hidden />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Ready to Begin Your Educational Journey?</h2>
              <p className="text-sm md:text-base text-primary-100 max-w-2xl leading-relaxed">
                Download the official {settings.admission_year} prospectus or submit an online admission enquiry. Our
                admissions desk is here to assist every parent.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-4">
              <Link to="/admissions" className="btn-gold">
                <UserPlus size={18} />
                Apply for Admission
              </Link>
              <Link to="/downloads" className="btn-outline-light">
                <Download size={18} />
                Download Prospectus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
