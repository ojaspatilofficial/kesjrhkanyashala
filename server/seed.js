// Fills an empty database with the school's starting content.
// Runs automatically when the server starts. Run `npm run seed:reset` to wipe and reload everything.
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
} from '../src/data/mockData.ts';
import { resources, Settings, Admin } from './models.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_DIR = path.join(__dirname, 'uploads', 'samples');

// Drop the demo ids ("n-1", "s-2" …) — MongoDB creates its own.
const withoutIds = (items) => items.map(({ id, ...rest }) => rest);

/** Writes a simple one-page placeholder PDF so demo download buttons work. Returns its URL. */
function samplePdf(title) {
  fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const file = path.join(SAMPLE_DIR, `${slug}.pdf`);
  if (!fs.existsSync(file)) {
    const esc = (s) => s.replace(/[^\x20-\x7E]/g, '').replace(/[\\()]/g, (m) => '\\' + m);
    const content = [
      `BT /F1 18 Tf 60 750 Td (${esc('K.E.S. Smt. J.R.H. Kanyashala, Alibag')}) Tj ET`,
      `BT /F1 13 Tf 60 715 Td (${esc(title).slice(0, 75)}) Tj ET`,
      `BT /F1 10 Tf 60 690 Td (${esc('Sample document. Upload the real file from the Admin dashboard.')}) Tj ET`,
    ].join('\n');
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [];
    objects.forEach((obj, i) => {
      offsets.push(Buffer.byteLength(pdf));
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
    });
    const xref = Buffer.byteLength(pdf);
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    pdf += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    fs.writeFileSync(file, pdf);
  }
  return `/uploads/samples/${slug}.pdf`;
}

const startingContent = () => ({
  notices: withoutIds(mockNotices).map((n) => ({
    ...n,
    attachment_url: n.attachment_name ? samplePdf(n.attachment_name.replace(/\.pdf$/i, '').replace(/_/g, ' ')) : '',
  })),
  events: withoutIds(mockEvents),
  staff: withoutIds(mockStaff).map((s, i) => ({ ...s, order_index: i + 1 })),
  results: withoutIds(mockResults),
  downloads: withoutIds(mockDownloads).map((d) => ({ ...d, download_url: samplePdf(d.title) })),
  gallery: withoutIds(mockGallery),
  alumni: withoutIds(mockAlumni),
  achievements: withoutIds(mockAchievements),
  facilities: withoutIds(mockFacilities),
  testimonials: withoutIds(mockTestimonials),
});

export async function seedDatabase({ reset = false } = {}) {
  let content;
  for (const [name, { model }] of Object.entries(resources)) {
    if (reset) await model.deleteMany({});
    const count = await model.countDocuments();
    if (count === 0) {
      content ??= startingContent();
      await model.insertMany(content[name]);
      console.log(`  • Added starting ${name} (${content[name].length})`);
    }
  }

  if (reset) await Settings.deleteMany({});
  if ((await Settings.countDocuments()) === 0) {
    await Settings.create(defaultSettings);
    console.log('  • Added school settings');
  }

  // Create the first admin account from the .env file (only if no admin exists yet).
  if ((await Admin.countDocuments()) === 0) {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      console.warn('  ! ADMIN_PASSWORD is not set in .env — no admin account was created.');
    } else {
      await Admin.create({ username, password_hash: await bcrypt.hash(password, 10) });
      console.log(`  • Created admin account "${username}" (password from .env)`);
    }
  }
}

// Allow running directly: `node server/seed.js --reset`
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('server/seed.js')) {
  const { default: mongoose } = await import('mongoose');
  await import('dotenv/config');
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kes_kanyashala';
  await mongoose.connect(uri);
  console.log(`Seeding ${uri} ...`);
  await seedDatabase({ reset: process.argv.includes('--reset') });
  await mongoose.disconnect();
  console.log('Done.');
}
