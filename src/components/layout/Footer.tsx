import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Award } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import { useToast } from '../shared/ToastContext';
import { useSettings } from '../shared/SettingsContext';

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useToast();
  const settings = useSettings();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address to subscribe.', 'error');
      return;
    }
    showToast('Subscribed!', 'Thank you for subscribing to K.E.S. Kanyashala updates & circulars.', 'success');
    setNewsletterEmail('');
  };

  const column = (title: string, links: { name: string; href: string }[]) => (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] mb-4 text-gold-300 font-sans">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.href} className="text-primary-100/80 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-400" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-700 via-gold-400 to-primary-700" />
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1 border-2 border-gold-300">
                <img src={logoImage} alt="School Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-lg font-serif font-bold text-white leading-tight">K.E.S. Smt. J.R.H.</p>
                <p className="text-xs font-semibold text-gold-300 tracking-wider uppercase">Kanyashala, Alibag</p>
              </div>
            </Link>

            <p className="text-primary-100/80 text-sm leading-relaxed max-w-sm">{settings.tagline}</p>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gold-300 border border-white/10 text-xs font-medium">
              <Award size={14} /> Maharashtra State Board Affiliated
            </span>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-100/80 mb-2">Subscribe to School Circulars</p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Parent email address"
                  aria-label="Email address"
                  className="bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-primary-100/50 focus:outline-none focus:border-gold-300 w-full"
                />
                <button type="submit" className="btn-gold !px-4 !py-2.5 shrink-0">
                  <Send size={14} />
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            {column('Academics & Info', [
              { name: 'About Our Heritage', href: '/about' },
              { name: 'Academic Curriculum', href: '/academics' },
              { name: `Admissions ${settings.admission_year}`, href: '/admissions' },
              { name: 'Faculty & Staff', href: '/staff' },
              { name: 'Student Life', href: '/student-life' },
            ])}
          </div>

          <div className="lg:col-span-3">
            {column('Media & Resources', [
              { name: 'Notice Board', href: '/notices' },
              { name: 'Academic Calendar', href: '/calendar' },
              { name: 'Results & Toppers', href: '/results' },
              { name: 'Campus Infrastructure', href: '/infrastructure' },
              { name: 'Photo Gallery', href: '/gallery' },
              { name: 'Downloads & Forms', href: '/downloads' },
              { name: 'Alumnae Association', href: '/alumni' },
            ])}
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] mb-4 text-gold-300 font-sans">Contact Office</h3>
            <ul className="space-y-3.5 text-sm text-primary-100/80">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="text-gold-400 shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {settings.phone}
                  {settings.phone_alt && ` / ${settings.phone_alt}`}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="text-gold-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:text-white break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} className="text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.office_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-100/60 text-center">
          <p>© {new Date().getFullYear()} Konkan Education Society's Smt. J.R.H. Kanyashala. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-white transition-colors">Affiliation & Accreditation</Link>
            <Link to="/downloads" className="hover:text-white transition-colors">Mandatory Disclosure</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Helplines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
