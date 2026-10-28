import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, ExternalLink, Loader2, Inbox } from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '../components/shared/ToastContext';
import { dataService } from '../services/dataService';
import FieldInput from './FieldInput';
import { Modal, ConfirmDelete, Spinner } from './ui';
import type { Item, Section } from './sections';

const ResourceManager: React.FC<{ section: Section }> = ({ section }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const [editing, setEditing] = useState<Item | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);

  const [toDelete, setToDelete] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.get<Item[]>(`/content/${section.key}`));
    } catch (err) {
      showToast('Could not load', err instanceof Error ? err.message : 'Please refresh the page.', 'error');
    } finally {
      setLoading(false);
    }
  }, [section.key, showToast]);

  useEffect(() => {
    setQuery('');
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [section.display.title(i), section.display.subtitle?.(i) || ''].join(' ').toLowerCase().includes(q)
    );
  }, [items, query, section]);

  const openNew = () => {
    setEditing(section.defaults());
    setMissing([]);
    setFormKey((k) => k + 1);
  };

  const openEdit = (item: Item) => {
    setEditing({ ...item });
    setMissing([]);
    setFormKey((k) => k + 1);
  };

  const save = async () => {
    if (!editing) return;
    const current = editing;
    const empty = section.fields.filter((f) => f.required && (current[f.name] === undefined || current[f.name] === '' || current[f.name] === null));
    if (section.key === 'results' && Array.isArray(current.toppers) && current.toppers.some((t: { name?: string }) => !t.name?.trim())) {
      showToast('Topper name missing', 'Please type a name for every topper, or remove the empty row.', 'error');
      return;
    }
    if (empty.length) {
      setMissing(empty.map((f) => f.name));
      showToast('Please fill in the required boxes', empty.map((f) => f.label).join(', '), 'error');
      return;
    }

    setSaving(true);
    try {
      if (current.id) {
        await api.put(`/content/${section.key}/${current.id}`, current);
        showToast('Saved', `The ${section.singular} has been updated on the website.`, 'success');
      } else {
        await api.post(`/content/${section.key}`, current);
        showToast('Added', `The new ${section.singular} is now live on the website.`, 'success');
      }
      dataService.clearCache();
      setEditing(null);
      load();
    } catch (err) {
      showToast('Could not save', err instanceof Error ? err.message : 'Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete?.id) return;
    setDeleting(true);
    try {
      await api.delete(`/content/${section.key}/${toDelete.id}`);
      showToast('Deleted', `The ${section.singular} was removed from the website.`, 'success');
      dataService.clearCache();
      setItems((list) => list.filter((i) => i.id !== toDelete.id));
      setToDelete(null);
    } catch (err) {
      showToast('Could not delete', err instanceof Error ? err.message : 'Please try again.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const Icon = section.icon;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-700 text-gold-300 flex items-center justify-center shrink-0">
            <Icon size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-900">{section.label}</h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">{section.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={section.publicPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-primary-300"
          >
            <ExternalLink size={16} /> See on website
          </a>
          <button onClick={openNew} className="btn-primary !rounded-xl !py-3">
            <Plus size={18} /> Add new {section.singular}
          </button>
        </div>
      </div>

      {/* Search */}
      {items.length > 5 && (
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${section.label.toLowerCase()}…`}
            className="form-input !pl-11 !rounded-full"
          />
        </div>
      )}

      {/* List */}
      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <Inbox className="mx-auto text-slate-300 mb-3" size={40} />
          <p className="font-semibold text-slate-700">{query ? 'Nothing matches your search.' : 'Nothing here yet.'}</p>
          {!query && (
            <button onClick={openNew} className="btn-primary !rounded-xl mt-5">
              <Plus size={18} /> Add the first {section.singular}
            </button>
          )}
        </div>
      ) : section.grid ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[4/3] bg-slate-100">
                {section.display.image?.(item) && (
                  <img src={section.display.image(item)} alt="" loading="lazy" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{section.display.title(item)}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{section.display.subtitle?.(item)}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-primary-800 bg-primary-50 hover:bg-primary-100"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setToDelete(item)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-red-700 bg-red-50 hover:bg-red-100"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {filtered.map((item) => {
            const image = section.display.image?.(item);
            const badges = section.display.badges?.(item) || [];
            return (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-brand-light/70">
                {section.display.image && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {image && <img src={image} alt="" loading="lazy" className="w-full h-full object-cover object-top" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900 line-clamp-1">{section.display.title(item)}</p>
                    {badges.map((b) => (
                      <span key={b} className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800">
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{section.display.subtitle?.(item)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold text-primary-800 bg-primary-50 hover:bg-primary-100"
                  >
                    <Pencil size={15} /> <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => setToDelete(item)}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100"
                  >
                    <Trash2 size={15} /> <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!loading && items.length > 0 && (
        <p className="text-xs text-slate-500">
          Showing {filtered.length} of {items.length}
        </p>
      )}

      {/* Add / Edit form */}
      <Modal
        open={!!editing}
        wide
        title={editing?.id ? `Edit ${section.singular}` : `Add a new ${section.singular}`}
        onClose={() => !saving && setEditing(null)}
        footer={
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              onClick={() => setEditing(null)}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button onClick={save} disabled={saving} className="btn-primary !rounded-xl !py-3 disabled:opacity-60">
              {saving && <Loader2 size={16} className="animate-spin" />}
              {editing?.id ? 'Save changes' : `Add ${section.singular}`}
            </button>
          </div>
        }
      >
        {editing && (
          <div key={formKey} className="grid sm:grid-cols-2 gap-5">
            {section.fields.map((field) => (
              <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                <FieldInput
                  field={field}
                  item={editing}
                  error={missing.includes(field.name)}
                  onChange={(patch) => {
                    setEditing((cur) => (cur ? { ...cur, ...patch } : cur));
                    setMissing((m) => m.filter((n) => !(n in patch)));
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ConfirmDelete
        open={!!toDelete}
        name={toDelete ? section.display.title(toDelete) : ''}
        busy={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ResourceManager;
