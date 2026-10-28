import React from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { mockHouses, mockClubs } from '../data/mockData';
import { ShieldCheck, Award, Sparkles, Compass, Users, Heart, Trophy, Leaf, Cpu, BookOpen, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentLife: React.FC = () => {
  const getClubIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf size={24} />;
      case 'Cpu':
        return <Cpu size={24} />;
      case 'BookOpen':
        return <BookOpen size={24} />;
      case 'Music':
        return <Music size={24} />;
      case 'Compass':
        return <Compass size={24} />;
      default:
        return <Trophy size={24} />;
    }
  };

  return (
    <div>
      <PageHero eyebrow="Holistic Growth & Community" title="Student Life & Leadership" description="Beyond academic classrooms, Kanyashala provides an empowering arena of clubs, martial arts self-defense, house sports leagues, and cultural festivals." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* The 4 Houses System */}
      <div className="container-custom">
        <SectionTitle
          title="The Four House System"
          subtitle="Tradition, Camaraderie & Healthy Competition"
          center
        />

        <p className="text-sm md:text-base text-slate-600 text-center max-w-2xl mx-auto -mt-4 mb-12">
          Every girl is inducted into one of our four iconic houses named after great women leaders of Indian history, instilling lifelong values of honor, courage, and service.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockHouses.map((house, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-card border border-primary-100/70 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all"
            >
              <div className={`h-2.5 w-full absolute top-0 left-0 bg-gradient-to-r ${house.color}`}></div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mb-4 border border-primary-100">
                  <ShieldCheck size={26} style={{ color: house.accent }} />
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-1">{house.name}</h3>
                <p className="text-xs font-semibold text-primary-700 mb-3">"{house.motto}"</p>
                <p className="text-sm text-slate-600 leading-relaxed">{house.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>House Captains & Prefects</span>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: house.accent }}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clubs & Extra-Curricular Societies */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-gold-50 via-brand-cream to-primary-50 border-y border-gold-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionTitle title="Student Clubs & Activity Wings" subtitle="Co-Curricular Exploration" center />
            <p className="text-sm md:text-base text-slate-600 -mt-4">
              Passions outside textbooks turn into real-world projects, artistic masterpieces, and ecological initiatives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gold-100 shadow-card hover:border-gold-300 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-gold-300 mb-4">
                    {getClubIcon(club.icon)}
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{club.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{club.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagship Annual Events */}
      <div className="container-custom">
        <SectionTitle title="Flagship Annual Gatherings" subtitle="Tradition & Celebrations" center />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tarang */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-primary-100/70 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-100 text-primary-800">
                Cultural Extravaganza
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Annual Social Gathering "Tarang"
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A 2-day gala showcasing classical Bharatnatyam, traditional Marathi Lavani, theatrical dramas addressing social reform, musical orchestra, and the annual academic and co-curricular prize distribution ceremony.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link to="/gallery" className="btn-secondary !py-2.5 !px-5">
                View Gathering Photos
              </Link>
            </div>
          </div>

          {/* Udaan */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-primary-100/70 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-100 text-gold-800">
                Sports & Athletics Meet
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Annual Sports Championship "Udaan"
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Three days of spirited athletic competitions featuring 100m/200m/400m sprint tracks, relay races, inter-house Kho-Kho, Kabaddi, Volleyball, Chess, and mass self-defense karate demonstrations.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link to="/results" className="btn-secondary !py-2.5 !px-5">
                View Sports Trophies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentLife;
