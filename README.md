# K.E.S. Smt. J.R.H. Kanyashala — School Website

Student-outreach website for K.E.S. Smt. J.R.H. Kanyashala, Alibag, with a private admin dashboard.

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express (`server/`)
- **Database:** MongoDB (via Mongoose)

## Running it

1. Make sure the **MongoDB** service is running (default: `mongodb://127.0.0.1:27017`).
2. Copy `.env.example` to `.env` (already done on this computer) and set `ADMIN_PASSWORD` and `JWT_SECRET`.
3. Install and start:

```bash
npm install
npm run dev
```

This starts both the API (port 5000) and the website (http://localhost:5173).
The first start fills the database with the school's starting content and creates the admin account from `.env`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Website + API together for development |
| `npm run build` | Builds the website into `dist/` |
| `npm start` | Runs the API and serves the built website on http://localhost:5000 |
| `npm run seed:reset` | **Deletes all website content** and reloads the original demo content |

## Deploying to Vercel

The website and the API both run on Vercel: `api/index.js` wraps the Express app as a serverless
function, and `vercel.json` routes `/api/*` and `/uploads/*` to it.

1. **Database:** create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), add a database user,
   and under *Network Access* allow `0.0.0.0/0` (Vercel has no fixed IP). Copy the connection string
   (`mongodb+srv://...`) and add the database name, e.g. `.../kes_kanyashala?retryWrites=true&w=majority`.
2. **Import the repo** at [vercel.com/new](https://vercel.com/new). The Vite settings are picked up from `vercel.json`.
3. **Environment variables** (Project → Settings → Environment Variables):
   `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.
4. **File uploads:** Project → Storage → create a **Blob** store and connect it. This adds `BLOB_READ_WRITE_TOKEN`.
   On Vercel each upload must be under 4 MB.
5. **Redeploy** (Deployments → ⋯ → Redeploy) so the new variables take effect.

The first request fills the empty database with the starting content and creates the admin account.

## Admin dashboard

Open **http://localhost:5173/admin** (it is not linked anywhere on the public site).
Log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`. The password can be changed inside the dashboard
(School Information → Change admin password).

What the admin can manage (add / edit / delete):

| Dashboard section | Shown on |
| --- | --- |
| Notice Board (with PDF attachments) | Notices page, Home page |
| Events Calendar | Calendar page, Home page |
| Teachers & Staff (photos, qualifications, order) | Faculty page |
| Results & Toppers (marks, photos per year) | Results page |
| Photo Gallery | Gallery page |
| Downloads (PDFs & forms) | Downloads page |
| Alumni Hall of Fame | Alumni page |
| Trophies & Achievements | Results page |
| Campus Facilities | Infrastructure page |
| Testimonials | Home page |
| School Information (contact details, announcement bar, principal’s message, home page numbers, prospectus / calendar PDFs) | Whole site |
| Messages & Enquiries (admission enquiries, contact messages, alumni sign-ups) | Read-only inbox |

Uploaded photos and documents are saved in `server/uploads/` (on Vercel: in Vercel Blob storage).

## Project structure

```
server/            Express API
  index.js         routes (content, uploads, login, forms)
  models.js        MongoDB collections
  seed.js          starting content + first admin account
src/
  pages/           public website pages
  admin/           admin dashboard (loaded only at /admin)
  components/      header, footer, page banner, shared UI
  services/        dataService — loads content from the API
  data/mockData.ts starting content (also used if the API is offline)
```

## Theme

Colours come from the school logo — "Heritage Maroon & Marigold": crimson `#A51C30`, deep maroon `#5E1422`,
marigold `#F5B534`, leaf green `#2E7D32`, warm cream background `#FBF8F4`. They are defined in `tailwind.config.js`
(`primary-*`, `gold-*`, `brand-*`).
