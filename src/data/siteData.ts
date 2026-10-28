import { Users, Building, Trophy, BookOpen } from 'lucide-react';

export const siteData = {
  schoolName: "K.E.S. SMT. J.R.H. KANYASHALA, ALIBAG",
  shortName: "KES Kanyashala",
  tagline: "Empowering young women since 1939 with modern excellence and heritage.",
  contact: {
    address: "K.E.S. SMT. J.R.H. KANYASHALA, Alibag, Raigad, Maharashtra 402201",
    phone: "+91 2141 222045",
    email: "info@keskanyashala.org",
    officeHours: "Monday - Friday: 8:00 AM - 3:00 PM"
  },
  stats: [
    { label: "Students", value: "2,500+", icon: Users },
    { label: "Teachers", value: "85+", icon: BookOpen },
    { label: "Years of Heritage", value: "84+", icon: Building },
    { label: "Pass Percentage", value: "100%", icon: Trophy }
  ],
  notices: [
    { id: 1, title: "Admissions Open for 2024-25", date: "2024-03-01", isNew: true, category: "Admissions" },
    { id: 2, title: "Final Exam Schedule Announced", date: "2024-02-28", isNew: true, category: "Academics" },
    { id: 3, title: "Annual Sports Meet Registration", date: "2024-02-25", isNew: false, category: "Sports" },
    { id: 4, title: "Parent-Teacher Meeting", date: "2024-02-20", isNew: false, category: "Events" }
  ],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Notices", href: "/notices" },
    { name: "Calendar", href: "/calendar" },
    { name: "Staff", href: "/staff" },
    { name: "Student Life", href: "/student-life" },
    { name: "Gallery", href: "/gallery" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Results", href: "/results" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" }
  ]
};
