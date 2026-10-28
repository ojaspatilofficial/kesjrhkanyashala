import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && val && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase at:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedNotices = [
  {
    title: 'Admissions Open for Academic Year 2025-2026 (Classes 5th to 12th)',
    category: 'Admissions',
    publish_date: '2025-03-01',
    is_new: true,
    is_pinned: true,
    description: 'Online and offline application forms are now being accepted for Grades V to XII (Science, Commerce, Arts). Merit-based scholarships available for eligible girls.',
    attachment_url: '#'
  },
  {
    title: 'Maharashtra SSC & HSC Board Final Examination Schedule Announced',
    category: 'Exams',
    publish_date: '2025-02-28',
    is_new: true,
    is_pinned: true,
    description: 'The Maharashtra State Board has released the official timetable for the upcoming SSC (10th) and HSC (12th) examinations. Students can download the hall ticket guidelines and subject schedule below.',
    attachment_url: '#'
  },
  {
    title: 'Annual Science & Innovation Exhibition "Pratibha 2025"',
    category: 'Events',
    publish_date: '2025-02-20',
    is_new: true,
    is_pinned: false,
    description: 'Over 120 STEM projects, eco-friendly models, and robotics demonstrations created by our students will be showcased in the school auditorium.',
    attachment_url: '#'
  },
  {
    title: 'Raigad District Inter-School Athletics Championship - 14 Gold Medals Won',
    category: 'Sports',
    publish_date: '2025-02-15',
    is_new: false,
    is_pinned: false,
    description: 'Congratulations to our school track and field team for bagging the Overall Championship trophy at the district level meet.',
    attachment_url: '#'
  },
  {
    title: 'Parent-Teacher Meeting (PTM) for Grades IX and XI',
    category: 'Academics',
    publish_date: '2025-02-10',
    is_new: false,
    is_pinned: false,
    description: 'Term-end performance reviews and academic progress counseling will be conducted on Saturday from 9:00 AM to 1:00 PM.',
    attachment_url: '#'
  },
  {
    title: 'Government Scholarship Schemes for Meritorious Girl Students',
    category: 'Circulars',
    publish_date: '2025-01-25',
    is_new: false,
    is_pinned: false,
    description: 'Eligible students from reserved categories and economically backward sections are requested to submit the DBT scholarship application with required documents.',
    attachment_url: '#'
  }
];

const seedEvents = [
  {
    title: 'New Academic Session Orientation & Welcome Ceremony',
    category: 'Academic',
    start_date: '2025-06-16',
    time: '08:30 AM - 12:30 PM',
    venue: 'Main School Auditorium',
    description: 'Welcoming new admissions and commencing the new academic year with an inspiring assembly and orientation for students and parents.',
    is_holiday: false
  },
  {
    title: 'Guru Purnima Celebration & Cultural Assembly',
    category: 'Cultural',
    start_date: '2025-07-10',
    time: '09:00 AM - 11:30 AM',
    venue: 'Assembly Ground',
    description: 'Honoring teachers through traditional performances, speeches, and student felicitations.',
    is_holiday: false
  },
  {
    title: 'First Unit Test (Grades V - XII)',
    category: 'Examination',
    start_date: '2025-07-28',
    end_date: '2025-08-02',
    time: '08:00 AM - 11:30 AM',
    venue: 'Classrooms',
    description: 'Assessment covering the initial first term curriculum modules.',
    is_holiday: false
  },
  {
    title: 'Independence Day Celebrations & Flag Hoisting',
    category: 'Holiday',
    start_date: '2025-08-15',
    time: '07:30 AM - 10:30 AM',
    venue: 'School Ground',
    description: 'Patriotic parades, cultural dances, Scouts & Guides march-past, and flag hoisting by the Chief Guest.',
    is_holiday: true
  },
  {
    title: 'Annual Sports Meet & Athletic Championship "Udaan"',
    category: 'Sports',
    start_date: '2025-12-18',
    end_date: '2025-12-20',
    time: '08:00 AM - 04:00 PM',
    venue: 'K.E.S. Sports Complex Ground',
    description: 'Three days of inter-house track, field, kabaddi, kho-kho, volleyball, and martial arts competitions.',
    is_holiday: false
  }
];

const seedStaff = [
  {
    name: 'Mrs. Sanjeevwani Kini',
    designation: 'Principal & Head of Institution',
    department: 'Leadership',
    qualification: 'M.Sc. (Physics), M.Ed., Ph.D. (Hon.)',
    experience_years: 28,
    email: 'principal@keskanyashala.org',
    photo_url: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    order_index: 1
  },
  {
    name: 'Mr. Ravindra Patil',
    designation: 'Vice-Principal (Junior College)',
    department: 'Leadership',
    qualification: 'M.Com, M.Ed., SET',
    experience_years: 24,
    email: 'rpatil@keskanyashala.org',
    photo_url: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    order_index: 2
  },
  {
    name: 'Mrs. Anuradha Deshmukh',
    designation: 'Head of Department - Sciences',
    department: 'Science & Math',
    qualification: 'M.Sc. (Chemistry), B.Ed.',
    experience_years: 19,
    email: 'adeshmukh@keskanyashala.org',
    photo_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    order_index: 3
  },
  {
    name: 'Mr. Suresh Mhatre',
    designation: 'Senior Lecturer - Mathematics',
    department: 'Science & Math',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    experience_years: 17,
    email: 'smhatre@keskanyashala.org',
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    order_index: 4
  },
  {
    name: 'Dr. Vasudha Joshi',
    designation: 'Head of Department - Languages',
    department: 'Languages',
    qualification: 'M.A. (Marathi Literature), M.A. (Sanskrit), Ph.D.',
    experience_years: 21,
    email: 'vjoshi@keskanyashala.org',
    photo_url: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    order_index: 5
  }
];

const seedResults = [
  {
    academic_year: '2023-2024',
    exam_type: 'Maharashtra SSC Board (Class 10)',
    total_appeared: 342,
    passed: 342,
    distinction_count: 218,
    pass_percentage: 100,
    toppers: [
      { rank: 1, name: 'Tanvi Shailesh Patil', percentage: 98.4, photo_url: 'https://images.unsplash.com/photo-1621252179027-94459d278660?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { rank: 2, name: 'Pranjal Makarand Joshi', percentage: 97.8, photo_url: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    academic_year: '2023-2024',
    exam_type: 'HSC Junior College (Science Stream)',
    total_appeared: 180,
    passed: 180,
    distinction_count: 124,
    pass_percentage: 100,
    toppers: [
      { rank: 1, name: 'Shruti Vijay Mhatre', percentage: 96.67, stream: 'Science (PCMB)', photo_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

const seedDownloads = [
  {
    title: 'Admissions Prospectus & Information Brochure (2025-26)',
    category: 'Admission Forms',
    file_size: '3.4 MB',
    file_type: 'PDF',
    publish_date: '2025-02-28',
    file_url: '#'
  },
  {
    title: 'Student Admission & Registration Form (Printable Format)',
    category: 'Admission Forms',
    file_size: '1.2 MB',
    file_type: 'PDF',
    publish_date: '2025-02-28',
    file_url: '#'
  },
  {
    title: 'Academic Syllabus & Curriculum Blueprint (Grades 5th - 10th)',
    category: 'Syllabus',
    file_size: '4.8 MB',
    file_type: 'PDF',
    publish_date: '2025-01-15',
    file_url: '#'
  }
];

const seedGallery = [
  {
    title: 'Annual Social Gathering "Tarang" Dance Performance',
    category: 'Annual Gathering',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Students performing traditional Lavani and classical Bharatnatyam dances during the annual social gathering.',
    event_date: '2025-01-12'
  },
  {
    title: 'State-of-the-Art Chemistry & Biotechnology Laboratory',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'High school students conducting titration and analytical chemistry experiments under expert supervision.',
    event_date: '2025-01-20'
  },
  {
    title: 'Annual Science & Tech Fair "Pratibha"',
    category: 'Science Exhibition',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Display of working robotics models, solar water purification systems, and eco-friendly sensors.',
    event_date: '2025-02-20'
  }
];

async function runSeeder() {
  console.log('Seeding Supabase Database tables...');

  async function seedTable(tableName, data) {
    try {
      const { error } = await supabase.from(tableName).upsert(data);
      if (error) {
        console.warn(`[${tableName}] Notice: ${error.message} (code: ${error.code})`);
      } else {
        console.log(`✅ Table [${tableName}] updated successfully with ${data.length} records.`);
      }
    } catch (err) {
      console.error(`❌ Table [${tableName}] seed failed:`, err.message);
    }
  }

  await seedTable('notices', seedNotices);
  await seedTable('events_calendar', seedEvents);
  await seedTable('staff_members', seedStaff);
  await seedTable('board_results', seedResults);
  await seedTable('downloads', seedDownloads);
  await seedTable('gallery_items', seedGallery);

  console.log('\n--- Seeding Process Finished ---');
}

runSeeder();
