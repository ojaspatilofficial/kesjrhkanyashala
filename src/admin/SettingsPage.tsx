import React, { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Loader2, KeyRound, Save } from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '../components/shared/ToastContext';
import FieldInput from './FieldInput';
import { Spinner } from './ui';
import type { Field, Item } from './sections';

const groups: { title: string; description: string; fields: Field[] }[] = [
  {
    title: 'Announcement bar',
    description: 'The thin strip at the very top of every page. Use it for the most important news.',
    fields: [
      { name: 'ticker_enabled', label: 'Show the announcement bar', type: 'checkbox' },
      { name: 'ticker_title', label: 'Headline', type: 'text', placeholder: 'e.g. Admissions Open 2025-26', half: true },
      {
        name: 'ticker_link',
        label: 'Where "Learn more" goes',
        type: 'select',
        options: ['/admissions', '/notices', '/calendar', '/results', '/downloads', '/contact', '/gallery'],
        half: true,
      },
      { name: 'ticker_text', label: 'Short message', type: 'text' },
    ],
  },
  {
    title: 'School contact details',
    description: 'Shown in the footer and on the Contact page.',
    fields: [
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'phone', label: 'Main phone number', type: 'text', half: true },
      { name: 'phone_alt', label: 'Second phone number', type: 'text', half: true },
      { name: 'email', label: 'Email address', type: 'email', half: true },
      { name: 'office_hours', label: 'Office hours', type: 'text', half: true },
      { name: 'admission_year', label: 'Current admission year', type: 'text', placeholder: 'e.g. 2026-27', half: true },
      { name: 'affiliation_no', label: 'Affiliation number', type: 'text', half: true },
      { name: 'tagline', label: 'School tagline (footer)', type: 'text' },
    ],
  },
  {
    title: "Principal's message (Home page)",
    description: 'The photo, name and welcome message in the Principal’s Desk section.',
    fields: [
      { name: 'principal_photo', label: 'Principal’s photo', type: 'image' },
      { name: 'principal_name', label: 'Name', type: 'text', half: true },
      { name: 'principal_title', label: 'Title', type: 'text', half: true },
      { name: 'principal_qualification', label: 'Qualification line', type: 'text' },
      { name: 'principal_message', label: 'Welcome message', type: 'textarea', help: 'Leave an empty line between paragraphs.' },
      { name: 'principal_quote', label: 'Short quote', type: 'text' },
    ],
  },
  {
    title: 'Numbers on the Home page',
    description: 'The four highlight boxes below the big school photo.',
    fields: [
      { name: 'stat_students', label: 'Students', type: 'text', placeholder: 'e.g. 2,500+', half: true },
      { name: 'stat_teachers', label: 'Teachers', type: 'text', placeholder: 'e.g. 85+', half: true },
      { name: 'stat_years', label: 'Years of heritage', type: 'text', placeholder: 'e.g. 85+', half: true },
      { name: 'stat_pass_rate', label: 'Pass percentage', type: 'text', placeholder: 'e.g. 100%', half: true },
    ],
  },
  {
    title: 'Important PDFs',
    description: 'Buttons on the Admissions and Calendar pages. Leave empty to hide the button.',
    fields: [
      { name: 'prospectus_pdf_url', label: 'Admissions prospectus (PDF)', type: 'file', accept: '.pdf' },
      { name: 'calendar_pdf_url', label: 'Annual calendar (PDF)', type: 'file', accept: '.pdf' },
    ],
  },
];

const ChangePassword: React.FC = () => {
  const { showToast } = useToast();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      showToast('Passwords do not match', 'Please type the same new password in both boxes.', 'error');
      return;
    }
    setBusy(true);
    try {
      await api.post('/auth/change-password', { current_password: current, new_password: next });
      showToast('Password changed', 'Use your new password the next time you log in.', 'success');
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      showToast('Could not change password', err instanceof Error ? err.message : 'Please try again.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
      <h2 className="text-lg font-serif font-bold text-primary-900 flex items-center gap-2">
        <KeyRound size={20} className="text-gold-600" /> Change admin password
      </h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">Use at least 8 characters.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <label>
          <span className="form-label text-sm">Current password</span>
          <input type="password" autoComplete="current-password" className="form-input" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        </label>
        <label>
          <span className="form-label text-sm">New password</span>
          <input type="password" autoComplete="new-password" className="form-input" value={next} onChange={(e) => setNext(e.target.value)} minLength={8} required />
        </label>
        <label>
          <span className="form-label text-sm">Type new password again</span>
          <input type="password" autoComplete="new-password" className="form-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={8} required />
        </label>
      </div>
      <button type="submit" disabled={busy} className="btn-secondary !rounded-xl mt-5 disabled:opacity-60">
        {busy && <Loader2 size={16} className="animate-spin" />}
        Change password
      </button>
    </form>
  );
};

const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<Item | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get<Item>('/settings')
      .then(setSettings)
      .catch((err) => showToast('Could not load', err.message, 'error'));
  }, [showToast]);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      setSettings(await api.put<Item>('/settings', settings));
      showToast('Saved', 'School information has been updated on the website.', 'success');
    } catch (err) {
      showToast('Could not save', err instanceof Error ? err.message : 'Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <Spinner />;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-700 text-gold-300 flex items-center justify-center shrink-0">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-900">School Information</h1>
          <p className="text-sm text-slate-600 mt-1">
            Details used across the whole website. Change what you need, then press <strong>Save changes</strong> at the bottom.
          </p>
        </div>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-serif font-bold text-primary-900">{group.title}</h2>
          <p className="text-sm text-slate-500 mt-1 mb-5">{group.description}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {group.fields.map((field) => (
              <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                <FieldInput field={field} item={settings} onChange={(patch) => setSettings((s) => ({ ...s, ...patch }))} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <ChangePassword />

      {/* Sticky save bar */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-72 z-30 bg-white/95 backdrop-blur border-t border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-end gap-3">
        <span className="hidden sm:inline text-sm text-slate-500">Changes appear on the website as soon as you save.</span>
        <button onClick={save} disabled={saving} className="btn-primary !rounded-xl !py-3 disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
