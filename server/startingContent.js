// Shared starting content from src/data/mockData.ts.
// Locally Node runs the .ts file directly; on Vercel it is compiled to .js first.
let content;
try {
  content = await import('../src/data/mockData.js');
} catch (err) {
  if (err.code !== 'ERR_MODULE_NOT_FOUND') throw err;
  content = await import('../src/data/mockData.ts');
}

export const {
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
} = content;
