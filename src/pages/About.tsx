import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import PageHero from '../components/shared/PageHero';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Heart, BookOpen, Compass, CheckCircle2, Building, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import schoolBuilding from '../assets/JRH-school-building.jpg';

const About: React.FC = () => {
  const milestones = [
    {
      year: '1939',
      title: 'Foundation of Kanyashala',
      desc: 'Established under the visionary patronage of Konkan Education Society to provide dedicated, accessible, and dignified secondary education for girls in Alibag.'
    },
    {
      year: '1965',
      title: 'Science Wing Expansion',
      desc: 'Inauguration of modern physics and chemistry laboratories, pioneering scientific curiosity among young female scholars in the Konkan belt.'
    },
    {
      year: '1988',
      title: 'Introduction of Junior College',
      desc: 'Expanded into Higher Secondary Certificate (HSC) education with dedicated Science, Commerce, and Arts streams.'
    },
    {
      year: '2005',
      title: 'IT & Digital Education Modernization',
      desc: 'Established a full-fledged computer and information technology laboratory with fiber-optic connectivity and digital classrooms.'
    },
    {
      year: 'Present Day',
      title: 'A Modern Center of Excellence',
      desc: 'Over 2,500 students, 100% board passing record, advanced STEM research initiatives, and state-of-the-art sports facilities.'
    }
  ];

  const values = [
    {
      title: 'Empowerment & Courage',
      desc: 'Nurturing self-reliance, moral conviction, and confidence in every girl to lead in modern society.',
      icon: ShieldCheck
    },
    {
      title: 'Academic Rigor & Inquiry',
      desc: 'Fostering conceptual mastery, scientific curiosity, and continuous intellectual excellence.',
      icon: BookOpen
    },
    {
      title: 'Cultural Heritage & Integrity',
      desc: 'Rooted in the timeless ethical values, linguistic pride, and rich traditions of Maharashtra.',
      icon: Heart
    },
    {
      title: 'Holistic Character Development',
      desc: 'Harmonizing sportsmanship, empathy, environmental consciousness, and community service.',
      icon: Compass
    }
  ];

  return (
    <div>
      <PageHero
        eyebrow="Since 1939"
        title="Our Heritage & Guiding Vision"
        description="For over eight decades, K.E.S. Smt. J.R.H. Kanyashala has been a beacon of learning, transforming generations of young girls into doctors, leaders, educators, and innovators."
      />
    <div className="section-padding space-y-16 md:space-y-24">
      {/* Main Story Grid */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-900 leading-tight">
              A Legacy of Women's Educational Revolution in Konkan
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Founded under the visionary stewardship of the <strong>Konkan Education Society (KES)</strong>, Smt. J.R.H. Kanyashala was born out of a profound social imperative: to eliminate barriers to female literacy and establish an institution where girls could pursue academic distinction with utmost security, pride, and self-worth.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              From humble beginnings with a handful of enthusiastic students, the school has blossomed into a premier landmark in Alibag. Today, our expansive campus blends historical architectural charm with contemporary smart classrooms, advanced computer centers, and cutting-edge science labs.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/staff" className="btn-primary">
                Meet Our Faculty & Leadership
              </Link>
              <Link to="/infrastructure" className="btn-secondary">
                View Campus Infrastructure
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border-4 border-white bg-primary-100">
              <img
                src={schoolBuilding}
                alt="K.E.S. Smt. J.R.H. School Campus Heritage Building"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-800 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block border-2 border-white">
              <p className="text-3xl font-bold font-serif text-gold-300 mb-1">85+ Years</p>
              <p className="text-xs text-primary-100 font-medium">Of uncompromised commitment to female education and character building.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-tint p-8 md:p-10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-primary-700 flex items-center justify-center mb-6 text-gold-300">
              <Compass size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Our Vision</h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-5">
              To be an institution of preeminent educational excellence that nurtures intellectually capable, morally upright, culturally grounded, and socially responsible young women who lead and inspire in a dynamic global society.
            </p>
            <p className="text-sm text-primary-800 font-semibold border-l-4 border-gold-400 pl-3">
              "विद्या विनयेन शोभते — Knowledge Shines Through Humility and Character"
            </p>
          </div>

          <div className="card-gold p-8 md:p-10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center mb-6 text-white">
              <Award size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Our Mission</h3>
            <ul className="space-y-3 text-sm md:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-gold-600 shrink-0 mt-0.5" />
                <span>Deliver student-centered pedagogy promoting critical inquiry, scientific temperament, and analytical depth.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-gold-600 shrink-0 mt-0.5" />
                <span>Provide equal opportunity and financial support through scholarships for rural and underprivileged girls.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-gold-600 shrink-0 mt-0.5" />
                <span>Cultivate leadership through sports, martial arts self-defense, public speaking, and community outreach.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-16 border-y border-primary-100/70">
        <div className="container-custom">
          <SectionTitle title="Our Core Values" subtitle="Ethical Foundation" center />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="bg-brand-light rounded-3xl p-6 border border-primary-100 flex flex-col justify-between hover:shadow-card hover:border-primary-200 transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-serif font-bold text-slate-900 text-base mb-2">{v.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Heritage Timeline */}
      <div className="container-custom">
        <SectionTitle title="A Journey of 85+ Years" subtitle="Historical Milestones" center />

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-200 before:via-gold-300 before:to-primary-200">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex items-start gap-6 md:gap-0 ${
                idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Timeline Center Node */}
              <div className="w-9 h-9 rounded-full bg-primary-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md border-4 border-white z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                {idx + 1}
              </div>

              {/* Content Card */}
              <div className="w-full md:w-[45%] card p-6">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-gold-100 text-gold-800 mb-2">
                  {item.year}
                </span>
                <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliation & Public Disclosures */}
      <div className="container-custom">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary-50 to-gold-50 border border-primary-100 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="eyebrow">Governance & Affiliation</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-900">
              Affiliated with Maharashtra State Board
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              K.E.S. Smt. J.R.H. Kanyashala is recognized by the Education Department of Maharashtra and permanently affiliated with the Maharashtra State Board of Secondary & Higher Secondary Education (Pune Board).
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link to="/downloads" className="btn-primary">
              Mandatory Public Disclosure
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact School Office
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
