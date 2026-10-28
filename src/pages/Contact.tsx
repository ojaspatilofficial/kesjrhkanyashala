import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { useSettings } from '../components/shared/SettingsContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { dataService, type ContactMessagePayload } from '../services/dataService';
import { useToast } from '../components/shared/ToastContext';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const settings = useSettings();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<ContactMessagePayload>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.email || !formData.message) {
      showToast('Missing Fields', 'Please provide your Name, Email, and Message.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await dataService.submitContactMessage(formData);
      if (res.success) {
        showToast('Message Sent!', res.message, 'success');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          subject: 'General Enquiry',
          message: ''
        });
      } else {
        showToast('Error', res.message, 'error');
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Failed to send message.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero eyebrow="Get In Touch" title="Contact School Administration" description="We welcome inquiries regarding admissions, student counseling, academic verification, and community partnerships." />
    <div className="section-padding space-y-16 md:space-y-24">

      {/* Main Grid: Contact Info & Form */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Contact Details & Office Schedule */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-primary-100/70 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                School Office & Address
              </h3>

              <div className="space-y-5 text-sm text-slate-600">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Location Address</h4>
                    <p className="leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Telephone Lines</h4>
                    <p className="leading-relaxed">{settings.phone}{settings.phone_alt ? " / " + settings.phone_alt : ""}</p>
                    <p className="text-xs text-slate-400">Office Ext: 101, 102</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Email Communications</h4>
                    <p className="leading-relaxed">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Public Visiting Hours</h4>
                    <p className="leading-relaxed">{settings.office_hours}</p>
                    <p className="text-xs text-slate-400">Principal Meeting: 11:30 AM – 01:00 PM (By Appointment)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Contacts Box */}
            <div className="card-gold p-6 space-y-3">
              <h4 className="font-serif font-bold text-primary-900 text-base">Key Department Direct Lines</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between gap-3 border-b border-gold-200 pb-2">
                  <span>Admissions & Verification Desk:</span>
                  <span className="font-semibold text-slate-900 whitespace-nowrap">+91 2141 222045</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-gold-200 pb-2">
                  <span>Accounts & Fee Subsidies:</span>
                  <span className="font-semibold text-slate-900 whitespace-nowrap">+91 2141 222180</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Junior College Office (HSC):</span>
                  <span className="font-semibold text-slate-900 whitespace-nowrap">+91 2141 222181</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-card border border-primary-100/70">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Send an Official Message</h3>
                <p className="text-xs text-slate-500">Inquiries are reviewed by school administrators</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="e.g. Rahul"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="e.g. Mhatre"
                    className="form-input"
                  />
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
                    placeholder="parent@example.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subject Matter *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                >
                  <option value="General Enquiry">General School Enquiry</option>
                  <option value="Admissions 2025-26">Admissions 2025-26 Inquiry</option>
                  <option value="Scholarship & Concessions">Scholarship & DBT Schemes</option>
                  <option value="Certificate / Verification">Leaving Certificate / Marksheet Verification</option>
                  <option value="Feedback / Suggestions">Parent Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please write your detailed query or requirement here..."
                  className="form-input"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message to Administration</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="container-custom">
        <div className="bg-primary-50 rounded-3xl h-80 md:h-96 overflow-hidden relative shadow-card border-4 border-white">
          <iframe
            src="https://maps.google.com/maps?q=K.E.S.+SMT.+J.R.H.+KANYASHALA,+Alibag,+Maharashtra&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
