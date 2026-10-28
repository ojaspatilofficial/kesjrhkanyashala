import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Loader2, Plus, Trash2, ImagePlus } from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '../components/shared/ToastContext';
import type { Field, Item } from './sections';

interface UploadResult {
  url: string;
  name: string;
  size: string;
  type: string;
}

async function uploadFile(file: File): Promise<UploadResult> {
  const body = new FormData();
  body.append('file', file);
  return api.post<UploadResult>('/upload', body);
}

/** Button that opens the file picker and uploads the chosen file to the server. */
const UploadButton: React.FC<{
  accept: string;
  label: string;
  onUploaded: (result: UploadResult) => void;
  icon?: React.ReactNode;
  small?: boolean;
}> = ({ accept, label, onUploaded, icon, small }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { showToast } = useToast();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      onUploaded(await uploadFile(file));
    } catch (err) {
      showToast('Upload failed', err instanceof Error ? err.message : 'Please try again.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className={`inline-flex items-center gap-2 rounded-xl font-semibold border-2 border-dashed border-primary-300 text-primary-700 bg-primary-50/50 hover:bg-primary-50 hover:border-primary-500 transition disabled:opacity-60 ${
          small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
        }`}
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : icon || <Upload size={16} />}
        {busy ? 'Uploading…' : label}
      </button>
    </>
  );
};

/** Comma-separated list box: keeps what the admin types, saves it as a list. */
const TagsInput: React.FC<{ value: unknown; placeholder?: string; className: string; onChange: (v: string[]) => void }> = ({
  value,
  placeholder,
  className,
  onChange,
}) => {
  const [text, setText] = useState(() => (Array.isArray(value) ? (value as string[]).join(', ') : String(value ?? '')));
  return (
    <input
      className={className}
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(
          e.target.value
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        );
      }}
    />
  );
};

interface Topper {
  rank: number;
  name: string;
  percentage: number;
  stream?: string;
  photo_url?: string;
}

const ToppersEditor: React.FC<{ value: Topper[]; onChange: (v: Topper[]) => void }> = ({ value, onChange }) => {
  const toppers = value || [];
  const update = (index: number, patch: Partial<Topper>) =>
    onChange(toppers.map((t, i) => (i === index ? { ...t, ...patch } : t)));

  return (
    <div className="space-y-3">
      {toppers.length === 0 && (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
          No toppers added yet.
        </p>
      )}
      {toppers.map((t, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/60">
          <div className="flex sm:flex-col items-center gap-2 shrink-0">
            <img
              src={t.photo_url || '/images/placeholder-person.svg'}
              alt=""
              className="w-16 h-16 rounded-xl object-cover object-top border border-slate-200 bg-white"
            />
            <UploadButton small accept="image/*" label="Photo" icon={<ImagePlus size={14} />} onUploaded={(r) => update(index, { photo_url: r.url })} />
          </div>
          <div className="grid sm:grid-cols-6 gap-3 flex-1">
            <label className="sm:col-span-1">
              <span className="form-label">Rank</span>
              <input type="number" min={1} className="form-input" value={t.rank ?? ''} onChange={(e) => update(index, { rank: Number(e.target.value) })} />
            </label>
            <label className="sm:col-span-3">
              <span className="form-label">Student name *</span>
              <input className="form-input" value={t.name || ''} onChange={(e) => update(index, { name: e.target.value })} />
            </label>
            <label className="sm:col-span-2">
              <span className="form-label">Marks (%)</span>
              <input
                type="number"
                step="0.01"
                min={0}
                max={100}
                className="form-input"
                value={t.percentage ?? ''}
                onChange={(e) => update(index, { percentage: Number(e.target.value) })}
              />
            </label>
            <label className="sm:col-span-5">
              <span className="form-label">Stream (optional)</span>
              <input className="form-input" placeholder="e.g. Science (PCMB)" value={t.stream || ''} onChange={(e) => update(index, { stream: e.target.value })} />
            </label>
            <div className="sm:col-span-1 flex items-end">
              <button
                type="button"
                onClick={() => onChange(toppers.filter((_, i) => i !== index))}
                className="w-full inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100"
                aria-label="Remove topper"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...toppers, { rank: toppers.length + 1, name: '', percentage: 0, stream: '', photo_url: '' }])}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100"
      >
        <Plus size={16} /> Add a topper
      </button>
    </div>
  );
};

interface FieldInputProps {
  field: Field;
  item: Item;
  onChange: (patch: Item) => void;
  error?: boolean;
}

const FieldInput: React.FC<FieldInputProps> = ({ field, item, onChange, error }) => {
  const value = item[field.name];
  const set = (v: unknown) => onChange({ [field.name]: v });
  const errorRing = error ? ' !border-red-400 ring-2 ring-red-100' : '';

  const label = (
    <span className="form-label text-sm">
      {field.label}
      {field.required && <span className="text-red-600"> *</span>}
    </span>
  );
  const help = field.help && <span className="block text-xs text-slate-500 mt-1.5">{field.help}</span>;

  switch (field.type) {
    case 'checkbox':
      return (
        <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-primary-300">
          <input type="checkbox" className="w-5 h-5 accent-primary-700" checked={!!value} onChange={(e) => set(e.target.checked)} />
          <span className="text-sm font-medium text-slate-700">{field.label}</span>
        </label>
      );

    case 'textarea':
      return (
        <label className="block">
          {label}
          <textarea
            rows={4}
            className={`form-input${errorRing}`}
            placeholder={field.placeholder}
            value={(value as string) ?? ''}
            onChange={(e) => set(e.target.value)}
          />
          {help}
        </label>
      );

    case 'select':
      return (
        <label className="block">
          {label}
          <select className={`form-input${errorRing}`} value={(value as string) ?? ''} onChange={(e) => set(e.target.value)}>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {help}
        </label>
      );

    case 'number':
      return (
        <label className="block">
          {label}
          <input
            type="number"
            className={`form-input${errorRing}`}
            value={value === undefined || value === null ? '' : String(value)}
            onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {help}
        </label>
      );

    case 'tags':
      return (
        <label className="block">
          {label}
          <TagsInput value={value} placeholder={field.placeholder} className={`form-input${errorRing}`} onChange={set} />
          {help}
        </label>
      );

    case 'image': {
      const url = (value as string) || '';
      return (
        <div>
          {label}
          <div className={`flex items-center gap-4 p-4 rounded-2xl border bg-white ${error ? 'border-red-400' : 'border-slate-200'}`}>
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
              {url ? <img src={url} alt="" className="w-full h-full object-cover object-top" /> : <ImagePlus className="text-slate-300" size={28} />}
            </div>
            <div className="space-y-2">
              <UploadButton accept="image/*" label={url ? 'Change photo' : 'Upload photo'} onUploaded={(r) => set(r.url)} />
              {url && (
                <button type="button" onClick={() => set('')} className="flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline">
                  <X size={13} /> Remove photo
                </button>
              )}
              <p className="text-xs text-slate-500">JPG or PNG, up to 15 MB.</p>
            </div>
          </div>
          {help}
        </div>
      );
    }

    case 'file': {
      const url = (value as string) || '';
      const fileName = field.fileNameField && !field.fileNameField.startsWith('__') ? (item[field.fileNameField] as string) : '';
      return (
        <div>
          {label}
          <div className={`flex flex-wrap items-center gap-3 p-4 rounded-2xl border bg-white ${error ? 'border-red-400' : 'border-slate-200'}`}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 text-primary-800 text-sm font-medium max-w-full"
              >
                <FileText size={16} className="shrink-0" />
                <span className="truncate">{fileName || url.split('/').pop()}</span>
              </a>
            ) : (
              <span className="text-sm text-slate-500">No file chosen yet.</span>
            )}
            <UploadButton
              accept={field.accept || '*'}
              label={url ? 'Replace file' : 'Choose file'}
              onUploaded={(r) => {
                const patch: Item = { [field.name]: r.url };
                if (field.fileNameField === '__title_if_empty') {
                  if (!item.title) patch.title = r.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
                } else if (field.fileNameField) patch[field.fileNameField] = r.name;
                if (field.fileSizeField) patch[field.fileSizeField] = r.size;
                if (field.fileTypeField) patch[field.fileTypeField] = r.type;
                onChange(patch);
              }}
            />
            {url && !field.required && (
              <button
                type="button"
                onClick={() => onChange({ [field.name]: '', ...(field.fileNameField && !field.fileNameField.startsWith('__') ? { [field.fileNameField]: '' } : {}) })}
                className="flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline"
              >
                <X size={13} /> Remove file
              </button>
            )}
          </div>
          {help}
        </div>
      );
    }

    case 'toppers':
      return (
        <div>
          {label}
          <ToppersEditor value={(value as Topper[]) || []} onChange={set} />
        </div>
      );

    default:
      return (
        <label className="block">
          {label}
          <input
            type={field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
            className={`form-input${errorRing}`}
            placeholder={field.placeholder}
            value={(value as string) ?? ''}
            onChange={(e) => set(e.target.value)}
          />
          {help}
        </label>
      );
  }
};

export default FieldInput;
