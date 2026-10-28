// K.E.S. Kanyashala website API (Express + MongoDB)
// Public:  GET content, POST forms.   Admin (login required): add / edit / delete, uploads, inbox.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resources, forms, Settings, Admin } from './models.js';
import { seedDatabase } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.API_PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kes_kanyashala';
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const DIST_DIR = path.join(__dirname, '..', 'dist');

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is not set in .env — admin logins will reset whenever the server restarts.');
}
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

// Small helper so async route errors become JSON responses.
const handle = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => {
    const status = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500;
    if (status === 500) console.error(err);
    res.status(status).json({ error: status === 400 ? friendlyError(err) : 'Something went wrong on the server.' });
  });

function friendlyError(err) {
  if (err.name === 'ValidationError') {
    return Object.values(err.errors)
      .map((e) => (e.kind === 'required' ? `"${e.path.replace(/_/g, ' ')}" is required.` : e.message))
      .join(' ');
  }
  return 'That item could not be found.';
}

/* ---------------------------- Authentication ---------------------------- */

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Please log in again.' });
  }
}

// Slow down password guessing: 8 wrong tries locks that address for 10 minutes.
const failedLogins = new Map();

app.post(
  '/api/auth/login',
  handle(async (req, res) => {
    const key = req.ip;
    const record = failedLogins.get(key);
    if (record && record.count >= 8 && Date.now() < record.until) {
      return res.status(429).json({ error: 'Too many wrong attempts. Please wait 10 minutes and try again.' });
    }

    const { username = '', password = '' } = req.body || {};
    const admin = await Admin.findOne({ username: String(username).trim() });
    const ok = admin && (await bcrypt.compare(String(password), admin.password_hash));
    if (!ok) {
      const count = (record?.count || 0) + 1;
      failedLogins.set(key, { count, until: Date.now() + 10 * 60 * 1000 });
      return res.status(401).json({ error: 'Wrong username or password.' });
    }

    failedLogins.delete(key);
    const token = jwt.sign({ id: String(admin._id), username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username: admin.username });
  })
);

app.get('/api/auth/me', requireAdmin, (req, res) => res.json({ username: req.admin.username }));

app.post(
  '/api/auth/change-password',
  requireAdmin,
  handle(async (req, res) => {
    const { current_password = '', new_password = '' } = req.body || {};
    const admin = await Admin.findById(req.admin.id);
    if (!admin || !(await bcrypt.compare(String(current_password), admin.password_hash))) {
      return res.status(400).json({ error: 'Your current password is not correct.' });
    }
    if (String(new_password).length < 8) {
      return res.status(400).json({ error: 'The new password must be at least 8 characters long.' });
    }
    admin.password_hash = await bcrypt.hash(String(new_password), 10);
    await admin.save();
    res.json({ ok: true });
  })
);

/* ------------------------------- Uploads -------------------------------- */

const allowedTypes = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) => {
      const base = path
        .parse(file.originalname)
        .name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40);
      cb(null, `${Date.now()}-${base || 'file'}${allowedTypes[file.mimetype]}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  // Skip files of other types (the route below explains why). Rejecting with an error here
  // would cut the connection before the browser receives the message.
  fileFilter: (req, file, cb) => {
    if (allowedTypes[file.mimetype]) return cb(null, true);
    req.rejectedFile = true;
    cb(null, false);
  },
});

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

app.post('/api/upload', requireAdmin, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE' ? 'The file is too big. Please keep it under 15 MB.' : err.message;
      return res.status(400).json({ error: message });
    }
    if (req.rejectedFile) {
      return res.status(400).json({ error: 'Only photos (JPG, PNG, WEBP) and documents (PDF, Word, Excel) can be uploaded.' });
    }
    if (!req.file) return res.status(400).json({ error: 'No file was received.' });
    res.json({
      url: `/uploads/${req.file.filename}`,
      name: req.file.originalname,
      size: formatSize(req.file.size),
      type: path.extname(req.file.filename).slice(1).toUpperCase(),
    });
  });
});

/* ---------------------------- Site settings ----------------------------- */

app.get(
  '/api/settings',
  handle(async (_req, res) => {
    const settings = (await Settings.findOne()) || (await Settings.create({}));
    res.json(settings);
  })
);

app.put(
  '/api/settings',
  requireAdmin,
  handle(async (req, res) => {
    const settings = (await Settings.findOne()) || new Settings();
    const { id, _id, createdAt, updatedAt, ...changes } = req.body || {};
    settings.set(changes);
    await settings.save();
    res.json(settings);
  })
);

/* ------------------------- Content (CRUD routes) ------------------------ */

function getResource(req, res) {
  const resource = resources[req.params.resource];
  if (!resource) res.status(404).json({ error: 'Unknown section.' });
  return resource;
}

function cleanBody(body = {}) {
  const { id, _id, createdAt, updatedAt, ...rest } = body;
  return rest;
}

app.get(
  '/api/content/:resource',
  handle(async (req, res) => {
    const resource = getResource(req, res);
    if (!resource) return;
    const items = await resource.model.find().sort(resource.sort);
    res.json(items);
  })
);

app.post(
  '/api/content/:resource',
  requireAdmin,
  handle(async (req, res) => {
    const resource = getResource(req, res);
    if (!resource) return;
    const item = new resource.model(cleanBody(req.body));
    await item.save();
    res.status(201).json(item);
  })
);

app.put(
  '/api/content/:resource/:id',
  requireAdmin,
  handle(async (req, res) => {
    const resource = getResource(req, res);
    if (!resource) return;
    const item = await resource.model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'That item no longer exists.' });
    item.set(cleanBody(req.body));
    await item.save();
    res.json(item);
  })
);

app.delete(
  '/api/content/:resource/:id',
  requireAdmin,
  handle(async (req, res) => {
    const resource = getResource(req, res);
    if (!resource) return;
    await resource.model.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  })
);

/* ------------------------- Public form submissions ---------------------- */

const formLimits = { maxFields: 20, maxLength: 3000 };

app.post(
  '/api/forms/:type',
  handle(async (req, res) => {
    const Model = forms[req.params.type];
    if (!Model) return res.status(404).json({ error: 'Unknown form.' });
    const entries = Object.entries(req.body || {}).slice(0, formLimits.maxFields);
    const data = {};
    for (const [key, value] of entries) {
      if (['status', '_id', 'id'].includes(key)) continue;
      data[key] = typeof value === 'string' ? value.slice(0, formLimits.maxLength) : value;
    }
    await Model.create({ ...data, status: 'new' });
    res.status(201).json({ ok: true });
  })
);

app.get(
  '/api/forms/:type',
  requireAdmin,
  handle(async (req, res) => {
    const Model = forms[req.params.type];
    if (!Model) return res.status(404).json({ error: 'Unknown form.' });
    res.json(await Model.find().sort({ createdAt: -1 }));
  })
);

app.patch(
  '/api/forms/:type/:id',
  requireAdmin,
  handle(async (req, res) => {
    const Model = forms[req.params.type];
    if (!Model) return res.status(404).json({ error: 'Unknown form.' });
    const item = await Model.findByIdAndUpdate(req.params.id, { status: String(req.body?.status || 'read') }, { new: true });
    res.json(item);
  })
);

app.delete(
  '/api/forms/:type/:id',
  requireAdmin,
  handle(async (req, res) => {
    const Model = forms[req.params.type];
    if (!Model) return res.status(404).json({ error: 'Unknown form.' });
    await Model.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  })
);

/* ---------------------------- Dashboard stats --------------------------- */

app.get(
  '/api/admin/stats',
  requireAdmin,
  handle(async (_req, res) => {
    const counts = {};
    for (const [name, { model }] of Object.entries(resources)) counts[name] = await model.countDocuments();
    const unread = {};
    for (const [name, Model] of Object.entries(forms)) unread[name] = await Model.countDocuments({ status: 'new' });
    res.json({ counts, unread });
  })
);

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

/* --------------- Serve the built website (after `npm run build`) -------- */

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

/* -------------------------------- Start --------------------------------- */

try {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB: ${MONGODB_URI}`);
  await seedDatabase();
  app.listen(PORT, () => console.log(`School API running on http://localhost:${PORT}`));
} catch (err) {
  console.error('Could not connect to MongoDB. Is the MongoDB service running?\n', err.message);
  process.exit(1);
}
