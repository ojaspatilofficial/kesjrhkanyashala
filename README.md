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

Uploaded photos and documents are saved in `server/uploads/`.

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
