// Describes every editable section of the website for the admin dashboard.
// Each section lists the fields the admin fills in; the dashboard builds the forms from this.
import {
  Bell,
  CalendarDays,
  Users,
  Trophy,
  Image as ImageIcon,
  FileDown,
  GraduationCap,
  Medal,
  Building2,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react';
import { todayISO } from '../lib/api';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'email'
  | 'select'
  | 'checkbox'
  | 'image'
  | 'file'
  | 'tags'
  | 'toppers';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[];
  /** Show the field at half width on large screens. */
  half?: boolean;
  /** For `file` fields: other fields to fill in automatically after uploading. */
  fileNameField?: string;
  fileSizeField?: string;
  fileTypeField?: string;
  accept?: string;
}

export type Item = Record<string, unknown> & { id?: string };

export interface Section {
  key: string;
  label: string;
  /** Singular name used on buttons: "Add a new ___". */
  singular: string;
  description: string;
  icon: LucideIcon;
  /** Public page where this content appears. */
  publicPath: string;
  fields: Field[];
  defaults: () => Item;
  /** How to show each item in the list. */
  display: {
    title: (item: Item) => string;
    subtitle?: (item: Item) => string;
    image?: (item: Item) => string | undefined;
    badges?: (item: Item) => string[];
  };
  grid?: boolean;
}

const s = (v: unknown) => (v == null ? '' : String(v));

export const sections: Section[] = [
  {
    key: 'notices',
    label: 'Notice Board',
    singular: 'notice',
    description: 'Post circulars and announcements. New notices appear at the top of the Notices page and on the Home page.',
    icon: Bell,
    publicPath: '/notices',
    defaults: () => ({ category: 'Circulars', publish_date: todayISO(), is_new: true, is_pinned: false }),
    fields: [
      { name: 'title', label: 'Notice title', type: 'text', required: true, placeholder: 'e.g. Parent-Teacher Meeting on Saturday' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Admissions', 'Academics', 'Exams', 'Sports', 'Events', 'Circulars'],
        half: true,
      },
      { name: 'publish_date', label: 'Date', type: 'date', required: true, half: true },
      { name: 'description', label: 'Details', type: 'textarea', placeholder: 'Write the full notice here...' },
      {
        name: 'attachment_url',
        label: 'Attach a PDF (optional)',
        type: 'file',
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        fileNameField: 'attachment_name',
        help: 'Parents can download this file from the notice.',
      },
      { name: 'is_new', label: 'Show the "NEW" badge', type: 'checkbox', half: true },
      { name: 'is_pinned', label: 'Pin this notice to the top', type: 'checkbox', half: true },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => `${s(i.category)} • ${s(i.publish_date)}${i.attachment_url ? ' • PDF attached' : ''}`,
      badges: (i) => [i.is_pinned ? 'Pinned' : '', i.is_new ? 'New' : ''].filter(Boolean),
    },
  },
  {
    key: 'events',
    label: 'Events Calendar',
    singular: 'event',
    description: 'Exams, holidays, sports days and celebrations shown on the Calendar page and the Home page.',
    icon: CalendarDays,
    publicPath: '/calendar',
    defaults: () => ({ category: 'Academic', start_date: todayISO(), is_holiday: false }),
    fields: [
      { name: 'title', label: 'Event name', type: 'text', required: true, placeholder: 'e.g. Annual Sports Day' },
      {
        name: 'category',
        label: 'Type of event',
        type: 'select',
        options: ['Academic', 'Examination', 'Holiday', 'Sports', 'Cultural', 'PTM'],
      },
      { name: 'start_date', label: 'Start date', type: 'date', required: true, half: true },
      { name: 'end_date', label: 'End date (if more than one day)', type: 'date', half: true },
      { name: 'time', label: 'Time', type: 'text', placeholder: 'e.g. 09:00 AM – 12:00 PM', half: true },
      { name: 'venue', label: 'Place / Venue', type: 'text', placeholder: 'e.g. School Ground', half: true },
      { name: 'description', label: 'Short description', type: 'textarea' },
      { name: 'is_holiday', label: 'This is a school holiday', type: 'checkbox' },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => `${s(i.category)} • ${s(i.start_date)}${i.end_date ? ` to ${s(i.end_date)}` : ''}`,
      badges: (i) => (i.is_holiday ? ['Holiday'] : []),
    },
  },
  {
    key: 'staff',
    label: 'Teachers & Staff',
    singular: 'teacher / staff member',
    description: 'Principal, teachers and staff shown on the Faculty page. Use "Position in list" to change the order.',
    icon: Users,
    publicPath: '/staff',
    defaults: () => ({ department: 'Languages', experience_years: 1, subjects: [], order_index: 100 }),
    fields: [
      { name: 'photo_url', label: 'Photo', type: 'image', help: 'A clear passport-style photo works best.' },
      { name: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'e.g. Mrs. Anjali Patil', half: true },
      { name: 'designation', label: 'Designation / Post', type: 'text', placeholder: 'e.g. Senior Teacher – English', half: true },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        options: ['Leadership', 'Languages', 'Science & Math', 'Social Sciences', 'Commerce', 'Arts & Sports'],
        half: true,
      },
      { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'e.g. M.A., B.Ed.', half: true },
      { name: 'experience_years', label: 'Years of experience', type: 'number', half: true },
      { name: 'email', label: 'Email (optional)', type: 'email', half: true },
      { name: 'subjects', label: 'Subjects taught', type: 'tags', help: 'Separate subjects with commas, e.g. English, Elocution' },
      { name: 'bio', label: 'Short introduction', type: 'textarea' },
      { name: 'order_index', label: 'Position in list', type: 'number', help: '1 shows first. The Principal should be 1.', half: true },
    ],
    display: {
      title: (i) => s(i.name),
      subtitle: (i) => [i.designation, i.department].filter(Boolean).map(s).join(' • '),
      image: (i) => s(i.photo_url) || '/images/placeholder-person.svg',
    },
  },
  {
    key: 'results',
    label: 'Results & Toppers',
    singular: 'exam result',
    description: 'Board exam results for each year with the toppers, their photos and marks. Shown on the Results page.',
    icon: Trophy,
    publicPath: '/results',
    defaults: () => ({ academic_year: '', exam_type: '', toppers: [] }),
    fields: [
      { name: 'academic_year', label: 'Academic year', type: 'text', required: true, placeholder: 'e.g. 2024-2025', half: true },
      {
        name: 'exam_type',
        label: 'Exam / Stream',
        type: 'text',
        required: true,
        placeholder: 'e.g. Maharashtra SSC Board (Class 10)',
        half: true,
      },
      { name: 'total_appeared', label: 'Students appeared', type: 'number', half: true },
      { name: 'passed', label: 'Students passed', type: 'number', half: true, help: 'Pass percentage is worked out automatically.' },
      { name: 'distinction_count', label: 'Distinctions (75% and above)', type: 'number', half: true },
      { name: 'first_class_count', label: 'First class (60% – 75%)', type: 'number', half: true },
      { name: 'toppers', label: 'Toppers (students with highest marks)', type: 'toppers' },
    ],
    display: {
      title: (i) => s(i.exam_type),
      subtitle: (i) =>
        `Year ${s(i.academic_year)} • ${s(i.passed)}/${s(i.total_appeared)} passed • ${
          Array.isArray(i.toppers) ? i.toppers.length : 0
        } topper(s)`,
      badges: (i) => (i.pass_percentage ? [`${s(i.pass_percentage)}% pass`] : []),
    },
  },
  {
    key: 'gallery',
    label: 'Photo Gallery',
    singular: 'photo',
    description: 'Photos of events and the campus shown on the Gallery page.',
    icon: ImageIcon,
    publicPath: '/gallery',
    grid: true,
    defaults: () => ({ category: 'Campus', event_date: todayISO() }),
    fields: [
      { name: 'image_url', label: 'Photo', type: 'image', required: true },
      { name: 'title', label: 'Photo title', type: 'text', required: true, placeholder: 'e.g. Republic Day Parade' },
      {
        name: 'category',
        label: 'Album',
        type: 'select',
        options: ['Campus', 'Sports', 'Science Exhibition', 'Cultural', 'Annual Gathering', 'Classrooms'],
        half: true,
      },
      { name: 'event_date', label: 'Date', type: 'date', half: true },
      { name: 'description', label: 'Caption', type: 'textarea' },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => `${s(i.category)} • ${s(i.event_date)}`,
      image: (i) => s(i.image_url),
    },
  },
  {
    key: 'downloads',
    label: 'Downloads (PDFs & Forms)',
    singular: 'document',
    description: 'Forms, syllabus, timetables and reports parents can download from the Downloads page.',
    icon: FileDown,
    publicPath: '/downloads',
    defaults: () => ({ category: 'Guidelines', publish_date: todayISO(), file_type: 'PDF' }),
    fields: [
      {
        name: 'download_url',
        label: 'Upload the file',
        type: 'file',
        required: true,
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png',
        fileSizeField: 'file_size',
        fileTypeField: 'file_type',
        fileNameField: '__title_if_empty',
      },
      { name: 'title', label: 'Document name', type: 'text', required: true, placeholder: 'e.g. Admission Form 2025-26' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Admission Forms', 'Syllabus', 'Guidelines', 'Exam Time-Table', 'Reports'],
        half: true,
      },
      { name: 'publish_date', label: 'Date', type: 'date', half: true },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => [i.category, i.file_type, i.file_size, i.publish_date].filter(Boolean).map(s).join(' • '),
    },
  },
  {
    key: 'alumni',
    label: 'Alumni Hall of Fame',
    singular: 'alumna',
    description: 'Notable former students shown on the Alumni page.',
    icon: GraduationCap,
    publicPath: '/alumni',
    defaults: () => ({ batch_year: new Date().getFullYear() - 10 }),
    fields: [
      { name: 'photo_url', label: 'Photo', type: 'image' },
      { name: 'name', label: 'Full name', type: 'text', required: true, half: true },
      { name: 'batch_year', label: 'Passing year (batch)', type: 'number', half: true },
      { name: 'designation', label: 'Profession / Post', type: 'text', placeholder: 'e.g. Doctor', half: true },
      { name: 'organization', label: 'Organisation', type: 'text', half: true },
      { name: 'location', label: 'City', type: 'text', half: true },
      { name: 'quote', label: 'Her message / quote', type: 'textarea' },
    ],
    display: {
      title: (i) => s(i.name),
      subtitle: (i) => `Batch ${s(i.batch_year)} • ${s(i.designation)}`,
      image: (i) => s(i.photo_url) || '/images/placeholder-person.svg',
    },
  },
  {
    key: 'achievements',
    label: 'Trophies & Achievements',
    singular: 'achievement',
    description: 'Sports, science and cultural awards shown on the Results page.',
    icon: Medal,
    publicPath: '/results',
    defaults: () => ({}),
    fields: [
      { name: 'title', label: 'Competition name', type: 'text', required: true, placeholder: 'e.g. District Kho-Kho Championship' },
      { name: 'award', label: 'Award won', type: 'text', placeholder: 'e.g. First Prize Trophy', half: true },
      { name: 'year', label: 'Year', type: 'text', placeholder: 'e.g. 2024-25', half: true },
      { name: 'description', label: 'Short description', type: 'textarea' },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => `${s(i.award)} • ${s(i.year)}`,
    },
  },
  {
    key: 'facilities',
    label: 'Campus Facilities',
    singular: 'facility',
    description: 'Labs, library, sports ground and other facilities shown on the Infrastructure page.',
    icon: Building2,
    publicPath: '/infrastructure',
    defaults: () => ({ icon: 'Building', specs: [] }),
    fields: [
      { name: 'image_url', label: 'Photo', type: 'image' },
      { name: 'title', label: 'Facility name', type: 'text', required: true, half: true },
      { name: 'category', label: 'Label', type: 'text', placeholder: 'e.g. Technology', half: true },
      {
        name: 'icon',
        label: 'Icon',
        type: 'select',
        options: ['Lab', 'Computer', 'Library', 'Classroom', 'Sports', 'Health', 'Building'],
        half: true,
      },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'specs', label: 'Key features', type: 'tags', help: 'Separate with commas, e.g. 60 computers, Wi-Fi, Projector' },
    ],
    display: {
      title: (i) => s(i.title),
      subtitle: (i) => s(i.category),
      image: (i) => s(i.image_url) || undefined,
    },
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    singular: 'testimonial',
    description: 'Quotes from parents and alumnae shown on the Home page (the first three are shown).',
    icon: MessageSquareQuote,
    publicPath: '/',
    defaults: () => ({}),
    fields: [
      { name: 'quote', label: 'What they said', type: 'textarea', required: true },
      { name: 'author', label: 'Name', type: 'text', required: true, half: true },
      { name: 'role', label: 'Who they are', type: 'text', placeholder: 'e.g. Parent of a Class 10 student', half: true },
    ],
    display: {
      title: (i) => s(i.author),
      subtitle: (i) => s(i.quote),
    },
  },
];

export const sectionByKey = (key?: string) => sections.find((sec) => sec.key === key);
