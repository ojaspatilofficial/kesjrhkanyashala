-- ================================================================
-- K.E.S. Smt. J.R.H. Kanyashala, Alibag
-- Supabase PostgreSQL Schema & Seed Data
-- ================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admissions Enquiries Table
CREATE TABLE IF NOT EXISTS admissions_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    grade_applying VARCHAR(50) NOT NULL,
    previous_school VARCHAR(255),
    academic_year VARCHAR(20) DEFAULT '2025-2026',
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, admitted, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Alumni Registrations Table
CREATE TABLE IF NOT EXISTS alumni_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    maiden_name VARCHAR(255),
    batch_year INTEGER NOT NULL,
    stream VARCHAR(100),
    current_city VARCHAR(150),
    profession VARCHAR(150),
    organization VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    memories TEXT,
    willing_to_mentor BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Admissions, Academics, Exams, Sports, Events, Circulars
    publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_new BOOLEAN DEFAULT TRUE,
    is_pinned BOOLEAN DEFAULT FALSE,
    description TEXT,
    attachment_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Events Calendar Table
CREATE TABLE IF NOT EXISTS events_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Academic, Examination, Holiday, Sports, Cultural, PTM
    start_date DATE NOT NULL,
    end_date DATE,
    time VARCHAR(100),
    venue VARCHAR(255) DEFAULT 'School Campus',
    description TEXT,
    is_holiday BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Staff Members Table
CREATE TABLE IF NOT EXISTS staff_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL, -- Leadership, Languages, Science & Math, Social Sciences, Commerce, Arts & Sports
    qualification VARCHAR(255) NOT NULL,
    experience_years INTEGER,
    email VARCHAR(255),
    photo_url VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Board Results & Achievements Table
CREATE TABLE IF NOT EXISTS board_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    exam_type VARCHAR(50) NOT NULL, -- SSC (Class 10), HSC Science, HSC Commerce, HSC Arts
    total_appeared INTEGER NOT NULL,
    passed INTEGER NOT NULL,
    distinction_count INTEGER NOT NULL,
    pass_percentage NUMERIC(5,2) NOT NULL,
    toppers JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Downloadable Documents Table
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Admission Forms, Syllabus, Guidelines, Exam Time-Table, Reports
    file_size VARCHAR(50),
    file_type VARCHAR(20) DEFAULT 'PDF',
    file_url VARCHAR(500),
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Campus, Sports, Science Exhibition, Cultural, Annual Gathering
    image_url VARCHAR(500) NOT NULL,
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE admissions_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to informational tables
CREATE POLICY "Public Read Notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON events_calendar FOR SELECT USING (true);
CREATE POLICY "Public Read Staff" ON staff_members FOR SELECT USING (true);
CREATE POLICY "Public Read Results" ON board_results FOR SELECT USING (true);
CREATE POLICY "Public Read Downloads" ON downloads FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery_items FOR SELECT USING (true);

-- Allow public insert access for user submissions
CREATE POLICY "Public Insert Admissions" ON admissions_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Alumni" ON alumni_registrations FOR INSERT WITH CHECK (true);
