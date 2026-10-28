// MongoDB collections (Mongoose models) for the school website.
import mongoose from 'mongoose';
import { defaultSettings } from './startingContent.js';

const { Schema } = mongoose;

// Send `id` instead of `_id` to the browser and hide internal fields.
const jsonOptions = {
  timestamps: true,
  toJSON: {
    virtuals: false,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = String(ret._id);
      delete ret._id;
      return ret;
    },
  },
};

const NoticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Circulars' },
    publish_date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    is_new: { type: Boolean, default: true },
    is_pinned: { type: Boolean, default: false },
    description: { type: String, default: '' },
    attachment_url: { type: String, default: '' },
    attachment_name: { type: String, default: '' },
  },
  jsonOptions
);

const EventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Academic' },
    start_date: { type: String, required: true },
    end_date: { type: String, default: '' },
    time: { type: String, default: '' },
    venue: { type: String, default: '' },
    description: { type: String, default: '' },
    is_holiday: { type: Boolean, default: false },
  },
  jsonOptions
);

const StaffSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: '' },
    department: { type: String, default: 'Languages' },
    qualification: { type: String, default: '' },
    experience_years: { type: Number, default: 0 },
    email: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    subjects: { type: [String], default: [] },
    bio: { type: String, default: '' },
    order_index: { type: Number, default: 100 },
  },
  jsonOptions
);

const TopperSchema = new Schema(
  {
    rank: { type: Number, default: 1 },
    name: { type: String, required: true, trim: true },
    percentage: { type: Number, default: 0 },
    stream: { type: String, default: '' },
    photo_url: { type: String, default: '' },
  },
  { _id: false }
);

const ResultSchema = new Schema(
  {
    academic_year: { type: String, required: true },
    exam_type: { type: String, required: true },
    total_appeared: { type: Number, default: 0 },
    passed: { type: Number, default: 0 },
    distinction_count: { type: Number, default: 0 },
    first_class_count: { type: Number, default: 0 },
    pass_percentage: { type: Number, default: 0 },
    toppers: { type: [TopperSchema], default: [] },
  },
  jsonOptions
);
// Work out the pass percentage automatically from appeared / passed.
ResultSchema.pre('save', function (next) {
  if (this.total_appeared > 0) {
    this.pass_percentage = Math.round((this.passed / this.total_appeared) * 10000) / 100;
  }
  next();
});

const DownloadSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Guidelines' },
    file_size: { type: String, default: '' },
    file_type: { type: String, default: 'PDF' },
    publish_date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    download_url: { type: String, default: '' },
  },
  jsonOptions
);

const GallerySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Campus' },
    image_url: { type: String, required: true },
    description: { type: String, default: '' },
    event_date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  },
  jsonOptions
);

const AlumniSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    batch_year: { type: Number, default: 2000 },
    designation: { type: String, default: '' },
    organization: { type: String, default: '' },
    location: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    quote: { type: String, default: '' },
  },
  jsonOptions
);

const AchievementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    award: { type: String, default: '' },
    year: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  jsonOptions
);

const FacilitySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    icon: { type: String, default: 'Building' },
    description: { type: String, default: '' },
    image_url: { type: String, default: '' },
    specs: { type: [String], default: [] },
  },
  jsonOptions
);

const TestimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, default: '' },
  },
  jsonOptions
);

// Settings: one document holding school-wide details. Fields come from defaultSettings.
const settingsFields = {};
for (const [key, value] of Object.entries(defaultSettings)) {
  settingsFields[key] = { type: typeof value === 'boolean' ? Boolean : String, default: value };
}
const SettingsSchema = new Schema(settingsFields, jsonOptions);

// Form submissions from the public website (admissions, contact, alumni sign-ups).
const submissionOptions = { ...jsonOptions, strict: false };
const SubmissionFields = { status: { type: String, default: 'new' } };

const AdminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password_hash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Notice = mongoose.model('Notice', NoticeSchema);
export const Event = mongoose.model('Event', EventSchema);
export const Staff = mongoose.model('Staff', StaffSchema);
export const Result = mongoose.model('Result', ResultSchema);
export const Download = mongoose.model('Download', DownloadSchema);
export const Gallery = mongoose.model('Gallery', GallerySchema);
export const Alumni = mongoose.model('Alumni', AlumniSchema);
export const Achievement = mongoose.model('Achievement', AchievementSchema);
export const Facility = mongoose.model('Facility', FacilitySchema);
export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export const Settings = mongoose.model('Settings', SettingsSchema);
export const AdmissionEnquiry = mongoose.model('AdmissionEnquiry', new Schema(SubmissionFields, submissionOptions));
export const ContactMessage = mongoose.model('ContactMessage', new Schema(SubmissionFields, submissionOptions));
export const AlumniRegistration = mongoose.model('AlumniRegistration', new Schema(SubmissionFields, submissionOptions));
export const Admin = mongoose.model('Admin', AdminSchema);

/** Content types the admin can add / edit / delete, with their display order. */
export const resources = {
  notices: { model: Notice, sort: { is_pinned: -1, publish_date: -1, _id: -1 } },
  events: { model: Event, sort: { start_date: 1, _id: 1 } },
  staff: { model: Staff, sort: { order_index: 1, _id: 1 } },
  results: { model: Result, sort: { academic_year: -1, _id: 1 } },
  downloads: { model: Download, sort: { publish_date: -1, _id: -1 } },
  gallery: { model: Gallery, sort: { event_date: -1, _id: -1 } },
  alumni: { model: Alumni, sort: { batch_year: 1, _id: 1 } },
  achievements: { model: Achievement, sort: { year: -1, _id: 1 } },
  facilities: { model: Facility, sort: { _id: 1 } },
  testimonials: { model: Testimonial, sort: { _id: 1 } },
};

/** Public form submissions, readable only by the admin. */
export const forms = {
  admissions: AdmissionEnquiry,
  contact: ContactMessage,
  alumni: AlumniRegistration,
};
