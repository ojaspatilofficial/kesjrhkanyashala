// Loads website content from the MongoDB-backed API.
// If the API server is not running, the built-in demo content is shown instead.
import { api } from '../lib/api';
import {
  mockNotices,
  mockEvents,
  mockStaff,
  mockResults,
  mockDownloads,
  mockGallery,
  mockAlumni,
  mockAchievements,
  mockFacilities,
  mockTestimonials,
  defaultSettings,
  type NoticeItem,
  type CalendarEventItem,
  type StaffItem,
  type ResultItem,
  type DownloadItem,
  type GalleryItem,
  type AlumniItem,
  type AchievementItem,
  type FacilityItem,
  type TestimonialItem,
  type SiteSettings,
} from '../data/mockData';

export interface AdmissionEnquiryPayload {
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  grade_applying: string;
  previous_school?: string;
  academic_year?: string;
  message?: string;
}

export interface ContactMessagePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AlumniRegistrationPayload {
  full_name: string;
  maiden_name?: string;
  batch_year: number;
  stream?: string;
  current_city?: string;
  profession?: string;
  organization?: string;
  email: string;
  phone?: string;
  memories?: string;
  willing_to_mentor?: boolean;
}

// Cache each list for the visit so moving between pages is instant.
const cache = new Map<string, Promise<unknown>>();

function load<T>(resource: string, fallback: T[]): Promise<T[]> {
  if (!cache.has(resource)) {
    const promise = api.get<T[]>(`/content/${resource}`).catch((err) => {
      console.warn(`Using built-in ${resource} (API unavailable):`, err.message);
      cache.delete(resource);
      return fallback;
    });
    cache.set(resource, promise);
  }
  return cache.get(resource) as Promise<T[]>;
}

const byCategory = <T extends { category: string }>(items: T[], category?: string) =>
  category && category !== 'All' ? items.filter((i) => i.category.toLowerCase() === category.toLowerCase()) : items;

async function submit(type: string, payload: object, successMessage: string) {
  try {
    await api.post(`/forms/${type}`, payload);
    return { success: true, message: successMessage };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Could not send the form. Please try again later.',
    };
  }
}

export const dataService = {
  /** Forget cached lists so the next page visit shows the latest content. */
  clearCache: () => cache.clear(),

  async getNotices(category?: string): Promise<NoticeItem[]> {
    return byCategory(await load('notices', mockNotices), category);
  },
  async getEvents(category?: string): Promise<CalendarEventItem[]> {
    return byCategory(await load('events', mockEvents), category);
  },
  async getStaff(department?: string): Promise<StaffItem[]> {
    const staff = await load('staff', mockStaff);
    return department && department !== 'All' ? staff.filter((s) => s.department === department) : staff;
  },
  getResults: (): Promise<ResultItem[]> => load('results', mockResults),
  async getDownloads(category?: string): Promise<DownloadItem[]> {
    return byCategory(await load('downloads', mockDownloads), category);
  },
  async getGallery(category?: string): Promise<GalleryItem[]> {
    return byCategory(await load('gallery', mockGallery), category);
  },
  getAlumni: (): Promise<AlumniItem[]> => load('alumni', mockAlumni),
  getAchievements: (): Promise<AchievementItem[]> => load('achievements', mockAchievements),
  getFacilities: (): Promise<FacilityItem[]> => load('facilities', mockFacilities),
  getTestimonials: (): Promise<TestimonialItem[]> => load('testimonials', mockTestimonials),

  async getSettings(): Promise<SiteSettings> {
    try {
      return { ...defaultSettings, ...(await api.get<Partial<SiteSettings>>('/settings')) };
    } catch {
      return defaultSettings;
    }
  },

  submitAdmissionEnquiry: (payload: AdmissionEnquiryPayload) =>
    submit('admissions', payload, 'Admission enquiry submitted successfully! Our office will contact you shortly.'),
  submitContactMessage: (payload: ContactMessagePayload) =>
    submit('contact', payload, 'Thank you! Your message has been sent. We will respond within 24 hours.'),
  submitAlumniRegistration: (payload: AlumniRegistrationPayload) =>
    submit('alumni', payload, 'Welcome back! Your alumnae profile has been registered with the Kanyashala network.'),
};
