export interface NoticeItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Academics' | 'Exams' | 'Sports' | 'Events' | 'Circulars';
  publish_date: string;
  is_new?: boolean;
  is_pinned?: boolean;
  description: string;
  attachment_url?: string;
  attachment_name?: string;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Holiday' | 'Sports' | 'Cultural' | 'PTM';
  start_date: string; // YYYY-MM-DD
  end_date?: string;
  time?: string;
  venue?: string;
  description?: string;
  is_holiday?: boolean;
}

export interface StaffItem {
  id: string;
  name: string;
  designation: string;
  department: 'Leadership' | 'Languages' | 'Science & Math' | 'Social Sciences' | 'Commerce' | 'Arts & Sports';
  qualification: string;
  experience_years: number;
  email: string;
  photo_url: string;
  subjects?: string[];
  bio?: string;
  order_index?: number;
}

export interface ResultItem {
  id: string;
  academic_year: string;
  exam_type: string;
  total_appeared: number;
  passed: number;
  distinction_count: number;
  first_class_count: number;
  pass_percentage: number;
  toppers: {
    rank: number;
    name: string;
    percentage: number;
    stream?: string;
    photo_url: string;
  }[];
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Admission Forms' | 'Syllabus' | 'Guidelines' | 'Exam Time-Table' | 'Reports';
  file_size: string;
  file_type: string;
  publish_date: string;
  download_url: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Science Exhibition' | 'Cultural' | 'Annual Gathering' | 'Classrooms';
  image_url: string;
  description: string;
  event_date: string;
}

export interface AlumniItem {
  id: string;
  name: string;
  batch_year: number;
  designation: string;
  organization: string;
  location: string;
  photo_url: string;
  quote: string;
}

export const mockNotices: NoticeItem[] = [
  {
    id: 'n-1',
    title: 'Admissions Open for Academic Year 2025-2026 (Classes 5th to 12th)',
    category: 'Admissions',
    publish_date: '2025-03-01',
    is_new: true,
    is_pinned: true,
    description: 'Online and offline application forms are now being accepted for Grades V to XII (Science, Commerce, Arts). Merit-based scholarships available for eligible girls.',
    attachment_name: 'Admissions_Brochure_2025-26.pdf',
    attachment_url: '#'
  },
  {
    id: 'n-2',
    title: 'Maharashtra SSC & HSC Board Final Examination Schedule Announced',
    category: 'Exams',
    publish_date: '2025-02-28',
    is_new: true,
    is_pinned: true,
    description: 'The Maharashtra State Board has released the official timetable for the upcoming SSC (10th) and HSC (12th) examinations. Students can download the hall ticket guidelines and subject schedule below.',
    attachment_name: 'Board_Exam_Timetable_2025.pdf',
    attachment_url: '#'
  },
  {
    id: 'n-3',
    title: 'Annual Science & Innovation Exhibition "Pratibha 2025"',
    category: 'Events',
    publish_date: '2025-02-20',
    is_new: true,
    is_pinned: false,
    description: 'Over 120 STEM projects, eco-friendly models, and robotics demonstrations created by our students will be showcased in the school auditorium.',
    attachment_name: 'Science_Fair_Schedule.pdf',
    attachment_url: '#'
  },
  {
    id: 'n-4',
    title: 'Raigad District Inter-School Athletics Championship - 14 Gold Medals Won',
    category: 'Sports',
    publish_date: '2025-02-15',
    is_new: false,
    is_pinned: false,
    description: 'Congratulations to our school track and field team for bagging the Overall Championship trophy at the district level meet.',
    attachment_name: 'Sports_Winners_List.pdf',
    attachment_url: '#'
  },
  {
    id: 'n-5',
    title: 'Parent-Teacher Meeting (PTM) for Grades IX and XI',
    category: 'Academics',
    publish_date: '2025-02-10',
    is_new: false,
    is_pinned: false,
    description: 'Term-end performance reviews and academic progress counseling will be conducted on Saturday from 9:00 AM to 1:00 PM.',
    attachment_name: 'PTM_Circular_Feb2025.pdf',
    attachment_url: '#'
  },
  {
    id: 'n-6',
    title: 'Government Scholarship Schemes for Meritorious Girl Students',
    category: 'Circulars',
    publish_date: '2025-01-25',
    is_new: false,
    is_pinned: false,
    description: 'Eligible students from reserved categories and economically backward sections are requested to submit the DBT scholarship application with required documents.',
    attachment_name: 'Scholarship_Guidelines.pdf',
    attachment_url: '#'
  }
];

export const mockEvents: CalendarEventItem[] = [
  {
    id: 'e-1',
    title: 'New Academic Session Orientation & Welcome Ceremony',
    category: 'Academic',
    start_date: '2025-06-16',
    time: '08:30 AM - 12:30 PM',
    venue: 'Main School Auditorium',
    description: 'Welcoming new admissions and commencing the new academic year with an inspiring assembly and orientation for students and parents.'
  },
  {
    id: 'e-2',
    title: 'Guru Purnima Celebration & Cultural Assembly',
    category: 'Cultural',
    start_date: '2025-07-10',
    time: '09:00 AM - 11:30 AM',
    venue: 'Assembly Ground',
    description: 'Honoring teachers through traditional performances, speeches, and student felicitations.'
  },
  {
    id: 'e-3',
    title: 'First Unit Test (Grades V - XII)',
    category: 'Examination',
    start_date: '2025-07-28',
    end_date: '2025-08-02',
    time: '08:00 AM - 11:30 AM',
    venue: 'Classrooms',
    description: 'Assessment covering the initial first term curriculum modules.'
  },
  {
    id: 'e-4',
    title: 'Independence Day Celebrations & Flag Hoisting',
    category: 'Holiday',
    start_date: '2025-08-15',
    time: '07:30 AM - 10:30 AM',
    venue: 'School Ground',
    description: 'Patriotic parades, cultural dances, Scouts & Guides march-past, and flag hoisting by the Chief Guest.',
    is_holiday: true
  },
  {
    id: 'e-5',
    title: 'Ganesh Chaturthi Vacations',
    category: 'Holiday',
    start_date: '2025-08-27',
    end_date: '2025-09-02',
    venue: 'School Closed',
    description: 'Festival holidays for Ganesh Utsav.',
    is_holiday: true
  },
  {
    id: 'e-6',
    title: 'Mid-Term Semester Examinations',
    category: 'Examination',
    start_date: '2025-10-10',
    end_date: '2025-10-22',
    time: '09:00 AM - 12:00 PM',
    venue: 'Classrooms',
    description: 'Comprehensive mid-term evaluations for all academic standards.'
  },
  {
    id: 'e-7',
    title: 'Diwali Vacations',
    category: 'Holiday',
    start_date: '2025-10-27',
    end_date: '2025-11-12',
    venue: 'School Closed',
    description: 'Diwali festive recess for students and staff.',
    is_holiday: true
  },
  {
    id: 'e-8',
    title: 'Annual Sports Meet & Athletic Championship "Udaan"',
    category: 'Sports',
    start_date: '2025-12-18',
    end_date: '2025-12-20',
    time: '08:00 AM - 04:00 PM',
    venue: 'K.E.S. Sports Complex Ground',
    description: 'Three days of inter-house track, field, kabaddi, kho-kho, volleyball, and martial arts competitions.'
  },
  {
    id: 'e-9',
    title: 'Annual Social Gathering & Cultural Festival "Tarang"',
    category: 'Cultural',
    start_date: '2026-01-12',
    end_date: '2026-01-13',
    time: '04:30 PM - 09:30 PM',
    venue: 'Open Air Amphitheatre',
    description: 'Grand showcase of Maharashtra folk dance, drama, musical orchestra, and academic prize distribution.'
  },
  {
    id: 'e-10',
    title: 'Republic Day & Annual NCC/Scouts Parade',
    category: 'Holiday',
    start_date: '2026-01-26',
    time: '07:30 AM - 10:30 AM',
    venue: 'School Ground',
    description: 'Flag hoisting ceremony, patriotic speeches, and award distributions for exceptional service.',
    is_holiday: true
  },
  {
    id: 'e-11',
    title: 'SSC & HSC Board Final Examinations',
    category: 'Examination',
    start_date: '2026-02-18',
    end_date: '2026-03-20',
    time: '11:00 AM - 02:00 PM',
    venue: 'Designated Examination Center Halls',
    description: 'Maharashtra State Board Secondary & Higher Secondary Board Examinations.'
  }
];

export const mockStaff: StaffItem[] = [
  {
    id: 's-1',
    name: 'Mrs. Sanjeevwani Kini',
    designation: 'Principal & Head of Institution',
    department: 'Leadership',
    qualification: 'M.Sc. (Physics), M.Ed., Ph.D. (Hon.)',
    experience_years: 28,
    email: 'principal@keskanyashala.org',
    photo_url: '/images/people/principal_kini.jpg',
    subjects: ['Institutional Governance', 'Senior Physics'],
    bio: 'Dedicated educator with over 28 years in girl-child empowerment, curriculum innovation, and holistic education development.'
  },
  {
    id: 's-2',
    name: 'Mr. Ravindra Patil',
    designation: 'Vice-Principal (Junior College)',
    department: 'Leadership',
    qualification: 'M.Com, M.Ed., SET',
    experience_years: 24,
    email: 'rpatil@keskanyashala.org',
    photo_url: '/images/people/vp_patil.jpg',
    subjects: ['Book Keeping & Accountancy', 'Economics'],
    bio: 'Pioneer of practical financial literacy and commerce stream development with distinguished academic results.'
  },
  {
    id: 's-3',
    name: 'Mrs. Anuradha Deshmukh',
    designation: 'Head of Department - Sciences',
    department: 'Science & Math',
    qualification: 'M.Sc. (Chemistry), B.Ed.',
    experience_years: 19,
    email: 'adeshmukh@keskanyashala.org',
    photo_url: '/images/people/hod_anuradha_deshmukh.jpg',
    subjects: ['Organic Chemistry', 'General Science'],
    bio: 'State science exhibition mentor with multiple state-winning student innovations.'
  },
  {
    id: 's-4',
    name: 'Mr. Suresh Mhatre',
    designation: 'Senior Lecturer - Mathematics',
    department: 'Science & Math',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    experience_years: 17,
    email: 'smhatre@keskanyashala.org',
    photo_url: '/images/people/prof_suresh_mhatre.jpg',
    subjects: ['Higher Mathematics & Statistics', 'Algebra'],
    bio: 'Specialist in simplifying mathematical concepts and coaching for competitive math Olympiads.'
  },
  {
    id: 's-5',
    name: 'Dr. Vasudha Joshi',
    designation: 'Head of Department - Languages',
    department: 'Languages',
    qualification: 'M.A. (Marathi Literature), M.A. (Sanskrit), Ph.D.',
    experience_years: 21,
    email: 'vjoshi@keskanyashala.org',
    photo_url: '/images/people/dr_vasudha_joshi.jpg',
    subjects: ['Marathi Literature', 'Sanskrit Grammar'],
    bio: 'Author and cultural mentor nurturing creative writing, debate, and Marathi heritage.'
  },
  {
    id: 's-6',
    name: 'Mrs. Neha Kulkarni',
    designation: 'Senior Faculty - English Language',
    department: 'Languages',
    qualification: 'M.A. (English), B.Ed., CELTA',
    experience_years: 14,
    email: 'nkulkarni@keskanyashala.org',
    photo_url: '/images/people/prof_neha_kulkarni.jpg',
    subjects: ['English Language & Composition', 'Elocution'],
    bio: 'Focuses on communication excellence, phonetics, and public speaking confidence for students.'
  },
  {
    id: 's-7',
    name: 'Mr. Prakash Rane',
    designation: 'Lecturer - Computer Science & IT',
    department: 'Science & Math',
    qualification: 'M.C.A., B.Sc. (Computer Science)',
    experience_years: 12,
    email: 'prane@keskanyashala.org',
    photo_url: '/images/people/prof_prakash_rane.jpg',
    subjects: ['Information Technology', 'Coding & Web Design'],
    bio: 'Directs the school digital lab, robotics club, and coding workshops for junior college.'
  },
  {
    id: 's-8',
    name: 'Mrs. Sujata Raut',
    designation: 'Faculty - Social Sciences & History',
    department: 'Social Sciences',
    qualification: 'M.A. (History & Political Science), B.Ed.',
    experience_years: 16,
    email: 'sraut@keskanyashala.org',
    photo_url: '/images/people/prof_sujata_raut.jpg',
    subjects: ['History of Maharashtra', 'Civics & Political Science'],
    bio: 'Passionate about historical research, field trips to Raigad forts, and civic responsibility.'
  },
  {
    id: 's-9',
    name: 'Mrs. Meenakshi Bhagat',
    designation: 'Faculty - Commerce & Economics',
    department: 'Commerce',
    qualification: 'M.Com, B.Ed., NET',
    experience_years: 11,
    email: 'mbhagat@keskanyashala.org',
    photo_url: '/images/people/prof_meenakshi_bhagat.jpg',
    subjects: ['Secretarial Practice', 'Organisation of Commerce'],
    bio: 'Guides students in business case studies, entrepreneurship workshops, and career planning.'
  },
  {
    id: 's-10',
    name: 'Mr. Arvind Gaikwad',
    designation: 'Physical Education Director & Sports Coach',
    department: 'Arts & Sports',
    qualification: 'M.P.Ed., NIS Coach (Athletics)',
    experience_years: 18,
    email: 'agaikwad@keskanyashala.org',
    photo_url: '/images/people/coach_arvind_gaikwad.jpg',
    subjects: ['Athletics', 'Self Defense for Girls', 'Kho-Kho'],
    bio: 'Has trained multiple state and national level athletes in sprint and martial arts.'
  }
];

export const mockResults: ResultItem[] = [
  {
    id: 'res-1',
    academic_year: '2023-2024',
    exam_type: 'Maharashtra SSC Board (Class 10)',
    total_appeared: 342,
    passed: 342,
    distinction_count: 218,
    first_class_count: 104,
    pass_percentage: 100,
    toppers: [
      {
        rank: 1,
        name: 'Tanvi Shailesh Patil',
        percentage: 98.40,
        photo_url: '/images/people/topper_tanvi_patil.jpg'
      },
      {
        rank: 2,
        name: 'Pranjal Makarand Joshi',
        percentage: 97.80,
        photo_url: '/images/people/topper_pranjal_joshi.jpg'
      },
      {
        rank: 3,
        name: 'Aishwarya Rajesh Deshmukh',
        percentage: 97.20,
        photo_url: '/images/people/topper_aishwarya_deshmukh.jpg'
      }
    ]
  },
  {
    id: 'res-2',
    academic_year: '2023-2024',
    exam_type: 'HSC Junior College (Science Stream)',
    total_appeared: 180,
    passed: 180,
    distinction_count: 124,
    first_class_count: 52,
    pass_percentage: 100,
    toppers: [
      {
        rank: 1,
        name: 'Shruti Vijay Mhatre',
        percentage: 96.67,
        stream: 'Science (PCMB)',
        photo_url: '/images/people/topper_shruti_mhatre.jpg'
      },
      {
        rank: 2,
        name: 'Riddhi Santosh Raut',
        percentage: 95.83,
        stream: 'Science (PCM+IT)',
        photo_url: '/images/people/topper_riddhi_raut.jpg'
      }
    ]
  },
  {
    id: 'res-3',
    academic_year: '2023-2024',
    exam_type: 'HSC Junior College (Commerce Stream)',
    total_appeared: 165,
    passed: 165,
    distinction_count: 98,
    first_class_count: 58,
    pass_percentage: 100,
    toppers: [
      {
        rank: 1,
        name: 'Kalyani Nitin Bhagat',
        percentage: 95.50,
        stream: 'Commerce (Accountancy & Maths)',
        photo_url: '/images/people/topper_kalyani_bhagat.jpg'
      }
    ]
  },
  {
    id: 'res-4',
    academic_year: '2022-2023',
    exam_type: 'Maharashtra SSC Board (Class 10)',
    total_appeared: 328,
    passed: 328,
    distinction_count: 204,
    first_class_count: 108,
    pass_percentage: 100,
    toppers: [
      {
        rank: 1,
        name: 'Gauri Mangesh Thakur',
        percentage: 97.60,
        photo_url: '/images/people/topper_tanvi_patil.jpg'
      },
      {
        rank: 2,
        name: 'Sayali Devendra Patil',
        percentage: 96.80,
        photo_url: '/images/people/topper_pranjal_joshi.jpg'
      }
    ]
  },
  {
    id: 'res-5',
    academic_year: '2022-2023',
    exam_type: 'HSC Junior College (Science & Commerce)',
    total_appeared: 310,
    passed: 308,
    distinction_count: 196,
    first_class_count: 94,
    pass_percentage: 99.35,
    toppers: [
      {
        rank: 1,
        name: 'Akshata Sunil Gaikwad',
        percentage: 96.17,
        stream: 'Science (PCMB)',
        photo_url: '/images/people/topper_shruti_mhatre.jpg'
      }
    ]
  },
  {
    id: 'res-6',
    academic_year: '2021-2022',
    exam_type: 'Maharashtra SSC Board (Class 10)',
    total_appeared: 315,
    passed: 315,
    distinction_count: 198,
    first_class_count: 102,
    pass_percentage: 100,
    toppers: [
      {
        rank: 1,
        name: 'Bhakti Ramesh Sawant',
        percentage: 98.20,
        photo_url: '/images/people/topper_aishwarya_deshmukh.jpg'
      }
    ]
  }
];

export const mockDownloads: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Admissions Prospectus & Information Brochure (2025-26)',
    category: 'Admission Forms',
    file_size: '3.4 MB',
    file_type: 'PDF',
    publish_date: '2025-02-28',
    download_url: '#'
  },
  {
    id: 'dl-2',
    title: 'Student Admission & Registration Form (Printable Format)',
    category: 'Admission Forms',
    file_size: '1.2 MB',
    file_type: 'PDF',
    publish_date: '2025-02-28',
    download_url: '#'
  },
  {
    id: 'dl-3',
    title: 'Academic Syllabus & Curriculum Blueprint (Grades 5th - 10th)',
    category: 'Syllabus',
    file_size: '4.8 MB',
    file_type: 'PDF',
    publish_date: '2025-01-15',
    download_url: '#'
  },
  {
    id: 'dl-4',
    title: 'Junior College (Class 11 & 12) Stream Subject Options & Syllabi',
    category: 'Syllabus',
    file_size: '2.9 MB',
    file_type: 'PDF',
    publish_date: '2025-01-15',
    download_url: '#'
  },
  {
    id: 'dl-5',
    title: 'Annual Student Code of Conduct, Rules & Uniform Guidelines',
    category: 'Guidelines',
    file_size: '1.6 MB',
    file_type: 'PDF',
    publish_date: '2024-12-10',
    download_url: '#'
  },
  {
    id: 'dl-6',
    title: 'Student Leave / Absence Application Form',
    category: 'Guidelines',
    file_size: '450 KB',
    file_type: 'PDF',
    publish_date: '2024-11-20',
    download_url: '#'
  },
  {
    id: 'dl-7',
    title: 'Maharashtra SSC Board Model Question Papers & Solution Sets',
    category: 'Exam Time-Table',
    file_size: '6.2 MB',
    file_type: 'PDF',
    publish_date: '2025-01-20',
    download_url: '#'
  },
  {
    id: 'dl-8',
    title: 'Mandatory Public Disclosure & Accreditation Report',
    category: 'Reports',
    file_size: '2.1 MB',
    file_type: 'PDF',
    publish_date: '2024-10-05',
    download_url: '#'
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Annual Social Gathering "Tarang" Cultural Dance',
    category: 'Annual Gathering',
    image_url: '/images/gallery/gallery_tarang_dance.jpg',
    description: 'Students performing traditional Lavani and classical Bharatnatyam dances during the annual social gathering.',
    event_date: '2025-01-12'
  },
  {
    id: 'g-2',
    title: 'State-of-the-Art Chemistry & Biotechnology Laboratory',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'High school students conducting titration and analytical chemistry experiments under expert supervision.',
    event_date: '2025-01-20'
  },
  {
    id: 'g-3',
    title: 'Annual Science & Tech Fair "Pratibha"',
    category: 'Science Exhibition',
    image_url: '/images/gallery/gallery_science_fair.jpg',
    description: 'Display of working robotics models, solar water purification systems, and eco-friendly sensors.',
    event_date: '2025-02-20'
  },
  {
    id: 'g-4',
    title: 'Inter-House 4x100m Relay Track Race',
    category: 'Sports',
    image_url: '/images/gallery/gallery_sports_relay.jpg',
    description: 'Exciting track events during the Annual Sports Day at the KES Sports Arena.',
    event_date: '2024-12-19'
  },
  {
    id: 'g-5',
    title: 'Modern IT & Computer Center',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Fully networked computer lab with 60+ workstations, fiber internet, and programming software.',
    event_date: '2024-11-15'
  },
  {
    id: 'g-6',
    title: 'Independence Day Scouts & Guides March Past',
    category: 'Cultural',
    image_url: '/images/gallery/gallery_scouts_parade.jpg',
    description: 'Disciplined parade and salute during the national flag hoisting celebration.',
    event_date: '2024-08-15'
  },
  {
    id: 'g-7',
    title: 'Central Library & Silent Reading Room',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious reading hall housing over 18,000 reference books, journals, and digital periodicals.',
    event_date: '2024-10-10'
  },
  {
    id: 'g-8',
    title: 'Girls Self-Defense & Karate Workshop',
    category: 'Sports',
    image_url: '/images/gallery/gallery_self_defense.jpg',
    description: 'Empowering students with practical self-defense techniques and martial arts discipline.',
    event_date: '2024-09-25'
  }
];

export const mockAlumni: AlumniItem[] = [
  {
    id: 'alm-1',
    name: 'Dr. Smita R. Patil',
    batch_year: 1998,
    designation: 'Senior Cardiothoracic Surgeon',
    organization: 'Tata Memorial Hospital, Mumbai',
    location: 'Mumbai, India',
    photo_url: '/images/people/alumni_dr_smita_patil.jpg',
    quote: 'The scientific foundation and moral discipline instilled at Kanyashala shaped my journey into medicine.'
  },
  {
    id: 'alm-2',
    name: 'Adv. Manasi Deshmukh',
    batch_year: 2004,
    designation: 'High Court Advocate & Legal Activist',
    organization: 'Bombay High Court',
    location: 'Mumbai, India',
    photo_url: '/images/people/alumni_adv_manasi_deshmukh.jpg',
    quote: 'The school debating society gave me the voice and fearlessness to advocate for justice and women rights.'
  },
  {
    id: 'alm-3',
    name: 'Priyanka Mhatre, IAS',
    batch_year: 2011,
    designation: 'Deputy District Magistrate',
    organization: 'Government of Maharashtra',
    location: 'Pune, India',
    photo_url: '/images/people/alumni_priyanka_mhatre_ias.jpg',
    quote: 'Kanyashala taught us that no aspiration is beyond reach for a dedicated girl with sincere effort.'
  },
  {
    id: 'alm-4',
    name: 'Ketaki Joshi',
    batch_year: 2016,
    designation: 'Software Architect & Tech Founder',
    organization: 'NextGen Solutions',
    location: 'Bengaluru / San Jose',
    photo_url: '/images/people/alumni_ketaki_joshi.jpg',
    quote: 'My first lines of code were written in the Kanyashala computer lab. Today I lead global engineering teams.'
  }
];

export const mockHouses = [
  {
    name: 'Ahilyabai Holkar House',
    motto: 'Wisdom, Courage & Just Governance',
    color: 'from-amber-500 to-yellow-600',
    accent: '#d97706',
    desc: 'Inspired by Maharani Ahilyabai Holkar, known for valor, philanthropy, and visionary administration.'
  },
  {
    name: 'Rani Laxmibai House',
    motto: 'Bravery, Strength & Fearless Spirit',
    color: 'from-red-600 to-rose-700',
    accent: '#e11d48',
    desc: 'Inspired by the warrior queen of Jhansi, championing resilience and patriotic dedication.'
  },
  {
    name: 'Savitribai Phule House',
    motto: 'Enlightenment, Equality & Compassion',
    color: 'from-emerald-600 to-teal-700',
    accent: '#059669',
    desc: 'Honoring India’s pioneer female educator who spearheaded the revolution of women’s education.'
  },
  {
    name: 'Rajmata Jijabai House',
    motto: 'Character, Leadership & Cultural Pride',
    color: 'from-blue-600 to-indigo-700',
    accent: '#2563eb',
    desc: 'Inspired by the visionary mother who instilled unshakeable values of Swarajya and righteous ethics.'
  }
];

export const mockClubs = [
  {
    name: 'Eco & Nature Club "Vasundhara"',
    icon: 'Leaf',
    desc: 'Active tree plantation drives, coastal cleanup campaigns along Alibag beach, rainwater harvesting, and waste segregation.'
  },
  {
    name: 'STEM & Robotics Club "Kalam"',
    icon: 'Cpu',
    desc: 'Hands-on training with microcontrollers, 3D printing concepts, physics experiments, and national science olympiads.'
  },
  {
    name: 'Literary & Debating Society',
    icon: 'BookOpen',
    desc: 'Marathi and English elocution, poetry recitation, creative storytelling, school magazine editorial board, and Model UN.'
  },
  {
    name: 'Cultural & Performing Arts Club',
    icon: 'Music',
    desc: 'Classical music, folk dance, theater, street plays highlighting social causes, and painting exhibitions.'
  },
  {
    name: 'Bharat Scouts & Guides Unit',
    icon: 'Compass',
    desc: 'National building, outdoor survival camps, first aid training, discipline, and community disaster relief readiness.'
  },
  {
    name: 'Sports & Martial Arts Academy',
    icon: 'Trophy',
    desc: 'Rigorous coaching in Athletics, Kho-Kho, Kabaddi, Volleyball, Karate, and self-defense for all standards.'
  }
];

/* ------------------------------------------------------------------ */
/* Additional editable content (managed from the Admin dashboard)      */
/* ------------------------------------------------------------------ */

export interface AchievementItem {
  id: string;
  title: string;
  award: string;
  year: string;
  description: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  icon: 'Lab' | 'Computer' | 'Library' | 'Classroom' | 'Sports' | 'Health' | 'Building';
  description: string;
  image_url: string;
  specs: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface SiteSettings {
  school_name: string;
  short_name: string;
  tagline: string;
  address: string;
  phone: string;
  phone_alt: string;
  email: string;
  office_hours: string;
  admission_year: string;
  affiliation_no: string;
  ticker_enabled: boolean;
  ticker_title: string;
  ticker_text: string;
  ticker_link: string;
  stat_students: string;
  stat_teachers: string;
  stat_years: string;
  stat_pass_rate: string;
  principal_name: string;
  principal_title: string;
  principal_qualification: string;
  principal_photo: string;
  principal_message: string;
  principal_quote: string;
  calendar_pdf_url: string;
  prospectus_pdf_url: string;
}

export const defaultSettings: SiteSettings = {
  school_name: 'K.E.S. Smt. J.R.H. Kanyashala, Alibag',
  short_name: 'KES Kanyashala',
  tagline: 'Empowering young women since 1939 with modern excellence and heritage.',
  address: 'K.E.S. Smt. J.R.H. Kanyashala, Post Alibag, Dist. Raigad, Maharashtra 402201',
  phone: '+91 2141 222045',
  phone_alt: '+91 2141 222180',
  email: 'info@keskanyashala.org',
  office_hours: 'Monday – Saturday: 8:00 AM – 3:30 PM',
  admission_year: '2025-26',
  affiliation_no: 'MH-RAI-1939',
  ticker_enabled: true,
  ticker_title: 'Admissions Open 2025-26',
  ticker_text: 'Online applications for Grades V to XII (Science, Commerce & Arts) are now active.',
  ticker_link: '/admissions',
  stat_students: '2,500+',
  stat_teachers: '85+',
  stat_years: '85+',
  stat_pass_rate: '100%',
  principal_name: 'Mrs. Sanjeevwani Kini',
  principal_title: 'Principal & Head of Institution',
  principal_qualification: 'M.Sc., M.Ed., Ph.D. (Hon.) • 28+ Yrs Experience',
  principal_photo: '/images/people/principal_kini.jpg',
  principal_message:
    'Welcome to K.E.S. Smt. J.R.H. Kanyashala, an esteemed cornerstone of women’s education in Alibag and the Raigad district. Since 1939, our institution has stood steadfast in its mission to offer quality, value-based, and futuristic education for girls.\n\nHere, traditional cultural values harmonize with 21st-century learning — from physics, chemistry, and IT laboratories to arts, athletics, and leadership training. We cultivate an inclusive ecosystem where every student feels seen, inspired, and empowered to excel in board examinations, competitive entrances, and beyond.',
  principal_quote: 'When you educate a girl, you empower a family, an entire community, and the nation.',
  calendar_pdf_url: '',
  prospectus_pdf_url: '',
};

export const mockAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Raigad District Athletic Meet (Under-17)',
    award: 'Overall Championship Trophy & 14 Gold Medals',
    year: '2024-25',
    description: 'Top honors in 100m sprint, 4x100m relay, long jump, and shot put.',
  },
  {
    id: 'ach-2',
    title: 'State Level Inter-School Kho-Kho Championship',
    award: 'First Runners-Up Trophy',
    year: '2024-25',
    description: 'Competed among 36 district winner teams across Maharashtra.',
  },
  {
    id: 'ach-3',
    title: 'National Science Fair "Inspire Award"',
    award: 'National Bronze & State Gold Winner',
    year: '2023-24',
    description: 'Project on "Solar Powered Smart Irrigation Sensor" created by Class IX students.',
  },
  {
    id: 'ach-4',
    title: 'Maharashtra Rajya Natya Spardha (Drama)',
    award: 'Best Script & Ensemble Acting Award',
    year: '2023-24',
    description: 'Social drama highlighting girl child education and environmental conservation.',
  },
];

export const mockFacilities: FacilityItem[] = [
  {
    id: 'fac-1',
    title: 'Advanced Science Laboratories',
    category: 'STEM & Research',
    icon: 'Lab',
    description:
      'Independent, fully equipped Physics, Chemistry, and Biology practical laboratories with analytical apparatus, safety stations, and individual experimentation desks.',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['60+ Student Capacity Per Lab', 'Fume Hoods & Eye Wash Safety', 'Digital Microscopes & Titration Sets'],
  },
  {
    id: 'fac-2',
    title: 'IT & Digital Computer Center',
    category: 'Technology',
    icon: 'Computer',
    description:
      'Two air-conditioned computer centers with 75+ workstations, high-speed fiber-optic connectivity, and licensed programming & office software.',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['1:1 Student Computer Ratio', 'Gigabit Dedicated Leased Line', 'Robotics & Python Coding Suites'],
  },
  {
    id: 'fac-3',
    title: 'Central Library & Reading Hall',
    category: 'Knowledge Hub',
    icon: 'Library',
    description:
      'A sanctuary of learning holding over 18,000 reference volumes, state board guides, competitive exam books (MPSC/UPSC/NEET), encyclopedias, and Marathi literary classics.',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['18,000+ Printed Titles', 'National & Regional Periodicals', 'Digital E-Library Terminal'],
  },
  {
    id: 'fac-4',
    title: 'Smart Digital Classrooms',
    category: 'Interactive Learning',
    icon: 'Classroom',
    description:
      'Spacious, well-ventilated classrooms fitted with interactive flat panels, HD projection systems, audio setups, and ergonomic seating.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['Interactive Touch Displays', 'Natural Daylighting & Cross-Ventilation', 'CCTV & Public Address Speakers'],
  },
  {
    id: 'fac-5',
    title: 'K.E.S. Sports Ground & Arena',
    category: 'Athletics',
    icon: 'Sports',
    description:
      'Expansive outdoor playground with a 200-meter athletic track, standard Kho-Kho court, Kabaddi arena, Volleyball ground, and table tennis facilities.',
    image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['200m Running Track', 'Kho-Kho & Volleyball Courts', 'NIS Certified Coaches'],
  },
  {
    id: 'fac-6',
    title: 'Campus Safety & Health Infirmary',
    category: 'Wellbeing',
    icon: 'Health',
    description:
      'A secure, walled campus protected by 24x7 security personnel and 48 HD CCTV cameras. An on-campus medical room with a full-time nurse and doctor-on-call facility.',
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: ['48 HD CCTV Surveillance', 'First-Aid & Rest Beds', 'Sanitary Pad Dispensers & Incinerators'],
  },
];

export const mockTestimonials: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'The values of discipline, self-reliance, and public service I learned at K.E.S. Kanyashala continue to guide my work as a doctor every single day.',
    author: 'Dr. Smita R. Patil',
    role: 'Senior Cardiothoracic Surgeon (Batch 1998)',
  },
  {
    id: 't-2',
    quote:
      "As a parent, I have witnessed tremendous growth in my daughter's confidence, scientific curiosity, and leadership. Truly the best school in Raigad.",
    author: 'Makarand Joshi',
    role: 'Parent of SSC Board Topper',
  },
  {
    id: 't-3',
    quote:
      'The teachers never allowed us to doubt ourselves. They encouraged us to speak, lead, debate, and excel in competitive examinations.',
    author: 'Priyanka Mhatre, IAS',
    role: 'Deputy District Magistrate (Batch 2011)',
  },
];
