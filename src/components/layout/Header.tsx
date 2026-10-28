import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, GraduationCap } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import SearchModal from '../shared/SearchModal';
import { useSettings } from '../shared/SettingsContext';

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Student Life', href: '/student-life' },
];

const exploreLinks = [
  { name: 'News & Notices', href: '/notices', desc: 'Latest circulars & announcements' },
  { name: 'Academic Calendar', href: '/calendar', desc: 'Term dates, exams & events' },
  { name: 'Faculty & Staff', href: '/staff', desc: 'Meet our experienced teachers' },
  { name: 'Campus Infrastructure', href: '/infrastructure', desc: 'Labs, library & sports facilities' },
  { name: 'Photo Gallery', href: '/gallery', desc: 'Campus memories & celebrations' },
  { name: 'Results & Toppers', href: '/results', desc: 'Board results & achievements' },
  { name: 'Downloads & Forms', href: '/downloads', desc: 'Syllabus, forms & guidelines' },
  { name: 'Alumnae Network', href: '/alumni', desc: 'Hall of fame & alumni community' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-2.5 2xl:px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
    isActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-slate-700 hover:text-primary-700 hover:bg-primary-50/60'
  }`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  const settings = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ctrl/Cmd + K opens search from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const exploreActive = exploreLinks.some((l) => l.href === location.pathname);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled ? 'border-primary-100 shadow-md py-2' : 'border-transparent shadow-sm py-3'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden p-1 border-2 border-gold-300 group-hover:scale-105 transition-transform shrink-0">
              <img src={logoImage} alt="K.E.S. School Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-serif font-bold text-primary-700 leading-tight whitespace-nowrap">
                K.E.S. Smt. J.R.H.
              </p>
              <p className="text-[11px] md:text-xs font-semibold text-gold-700 tracking-[0.12em] uppercase whitespace-nowrap">
                Kanyashala, Alibag <span className="hidden sm:inline xl:hidden 2xl:inline text-slate-400">• Estd. 1939</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1" aria-label="Main">
            {mainLinks.map((link) => (
              <NavLink key={link.href} to={link.href} end={link.href === '/'} className={navClass}>
                {link.name}
              </NavLink>
            ))}

            <div className="relative group">
              <button
                className={`px-2.5 2xl:px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                  exploreActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-slate-700 hover:text-primary-700 hover:bg-primary-50/60'
                }`}
                aria-haspopup="true"
              >
                Campus & Media
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 pt-2 w-[34rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                <div className="bg-white rounded-2xl shadow-2xl p-3 border border-primary-100 grid grid-cols-2 gap-1">
                  {exploreLinks.map((link) => {
                    const active = location.pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`p-3 rounded-xl transition-colors flex flex-col ${
                          active ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-gold-50'
                        }`}
                      >
                        <span className="text-sm font-semibold">{link.name}</span>
                        <span className="text-xs text-slate-500">{link.desc}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>

            <button
              onClick={() => setSearchModalOpen(true)}
              className="ml-1 p-2 rounded-full text-slate-600 hover:text-primary-700 hover:bg-primary-50 border border-slate-200 transition-colors"
              title="Search website (Ctrl+K)"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <Link to="/admissions" className="btn-primary !py-2.5 !px-4 2xl:!px-5 ml-1.5 whitespace-nowrap">
              <GraduationCap size={16} />
              Apply Online
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 xl:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-full text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              aria-label="Search"
            >
              <Search size={21} />
            </button>
            <button
              className="p-2.5 rounded-full text-slate-800 hover:bg-primary-50"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`xl:hidden absolute left-0 right-0 top-full bg-white border-t border-primary-100 shadow-xl overflow-y-auto transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container-custom py-4 flex flex-col gap-1">
            {[...mainLinks, { name: 'Contact Us', href: '/contact' }].map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `text-base font-medium py-3 px-3 rounded-xl ${isActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-slate-800 hover:bg-slate-50'}`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mt-3 mb-2 px-3">Campus & Media</p>
            <div className="grid grid-cols-2 gap-2">
              {exploreLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-sm py-2.5 px-3 rounded-xl font-medium border ${
                      isActive ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-brand-light border-slate-100 text-slate-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <Link to="/admissions" className="btn-primary w-full mt-4">
              <GraduationCap size={18} />
              Apply for Admission ({settings.admission_year})
            </Link>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};

export default Header;
