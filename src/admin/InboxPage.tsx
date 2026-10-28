import React, { useCallback, useEffect, useState } from 'react';
import { Mail, Phone, Trash2, CheckCircle2, Inbox as InboxIcon, MailOpen } from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '../components/shared/ToastContext';
import { ConfirmDelete, Spinner } from './ui';

type Submission = Record<string, unknown> & { id: string; status: string; createdAt: string };

const tabs = [
  { key: 'admissions', label: 'Admission enquiries', nameOf: (s: Submission) => String(s.student_name || 'Unnamed student') },
  { key: 'contact', label: 'Contact messages', nameOf: (s: Submission) => `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'Visitor' },
  { key: 'alumni', label: 'Alumni sign-ups', nameOf: (s: Submission) => String(s.full_name || 'Alumna') },
];

const labels: Record<string, string> = {
  student_name: 'Student',
  parent_name: 'Parent / Guardian',
  grade_applying: 'Applying for',
  previous_school: 'Previous school',
  academic_year: 'Academic year',
  subject: 'Subject',
  maiden_name: 'Name in school',
  batch_year: 'Batch',
  stream: 'Stream',
  current_city: 'City',
  profession: 'Profession',
  organization: 'Organisation',
  willing_to_mentor: 'Happy to mentor',
};
const hidden = new Set(['id', 'status', 'createdAt', 'updatedAt', 'email', 'phone', 'message', 'memories', 'first_name', 'last_name', 'full_name']);

const InboxPage: React.FC<{ onChanged?: () => void }> = ({ onChanged }) => {
  const { showToast } = useToast();
  const [tab, setTab] = useState(tabs[0]);
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<Submission | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.get<Submission[]>(`/forms/${tab.key}`));
    } catch (err) {
      showToast('Could not load', err instanceof Error ? err.message : '', 'error');
    } finally {
      setLoading(false);
    }
  }, [tab.key, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (item: Submission, status: string) => {
    await api.patch(`/forms/${tab.key}/${item.id}`, { status });
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, status } : i)));
    onChanged?.();
  };

  const remove = async () => {
    if (!toDelete) return;
    await api.delete(`/forms/${tab.key}/${toDelete.id}`);
    setItems((list) => list.filter((i) => i.id !== toDelete.id));
    setToDelete(null);
    showToast('Deleted', 'The message was removed.', 'success');
    onChanged?.();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-700 text-gold-300 flex items-center justify-center shrink-0">
          <InboxIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-900">Messages & Enquiries</h1>
          <p className="text-sm text-slate-600 mt-1">Forms filled in by parents and visitors on the website. New ones are highlighted.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t)} className={`chip !text-sm ${tab.key === t.key ? 'chip-active' : 'chip-idle'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <MailOpen className="mx-auto text-slate-300 mb-3" size={40} />
          No {tab.label.toLowerCase()} yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const isNew = item.status === 'new';
            const details = Object.entries(item).filter(([k, v]) => !hidden.has(k) && v !== '' && v !== null && v !== undefined);
            const longText = (item.message || item.memories) as string | undefined;
            return (
              <article
                key={item.id}
                className={`bg-white rounded-3xl border p-5 md:p-6 ${isNew ? 'border-gold-300 ring-2 ring-gold-100' : 'border-slate-200'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 text-lg">{tab.nameOf(item)}</h3>
                      {isNew && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800">NEW</span>}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Received {new Date(item.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => markRead(item, isNew ? 'read' : 'new')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                    >
                      <CheckCircle2 size={15} /> {isNew ? 'Mark as done' : 'Mark as new'}
                    </button>
                    <button
                      onClick={() => setToDelete(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                  {item.email ? (
                    <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1.5 text-primary-700 hover:underline">
                      <Mail size={15} /> {String(item.email)}
                    </a>
                  ) : null}
                  {item.phone ? (
                    <a href={`tel:${item.phone}`} className="inline-flex items-center gap-1.5 text-primary-700 hover:underline">
                      <Phone size={15} /> {String(item.phone)}
                    </a>
                  ) : null}
                </div>

                {details.length > 0 && (
                  <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-sm">
                    {details.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-slate-500">{labels[k] || k.replace(/_/g, ' ')}</dt>
                        <dd className="text-slate-800 font-medium">{typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {longText && <p className="mt-4 text-sm text-slate-700 bg-brand-light rounded-2xl p-4 whitespace-pre-line">{longText}</p>}
              </article>
            );
          })}
        </div>
      )}

      <ConfirmDelete open={!!toDelete} name={toDelete ? tab.nameOf(toDelete) : ''} onCancel={() => setToDelete(null)} onConfirm={remove} />
    </div>
  );
};

export default InboxPage;
