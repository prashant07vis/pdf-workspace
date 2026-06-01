# PDF Workspace

A professional, Canva-like PDF editor built with Next.js 15, Supabase, Fabric.js, and PDF.js.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. In **Authentication > Providers**, enable Google OAuth (optional)
4. In **Storage**, the SQL script creates the required buckets

### 4. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles & CSS variables
│   ├── login/page.tsx          # Login page
│   ├── register/page.tsx       # Register page
│   ├── auth/callback/route.ts  # OAuth callback handler
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard shell with sidebar
│   │   └── page.tsx            # Projects dashboard
│   ├── editor/
│   │   └── page.tsx            # PDF editor page
│   └── settings/
│       ├── layout.tsx          # Settings shell with tabs
│       ├── page.tsx            # Profile settings
│       ├── billing/page.tsx    # Billing & plans
│       └── security/page.tsx   # Password & 2FA
│
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── avatar.tsx
│   │   ├── tooltip.tsx
│   │   ├── separator.tsx
│   │   └── accordion.tsx
│   ├── landing/                # Landing page sections
│   │   ├── navbar.tsx
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── faq-section.tsx
│   │   └── footer.tsx
│   ├── dashboard/              # Dashboard UI
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── project-card.tsx
│   │   ├── create-project-dialog.tsx
│   │   └── upload-dropzone.tsx
│   └── editor/                 # Editor UI
│       ├── toolbar.tsx
│       ├── pages-sidebar.tsx
│       ├── canvas.tsx
│       └── properties-panel.tsx
│
├── hooks/
│   ├── useAuth.ts              # Auth state & actions
│   ├── useProjects.ts          # Projects CRUD
│   ├── useEditor.ts            # Editor state machine
│   └── useLocalStorage.ts      # Persistent local state
│
├── services/
│   ├── auth.service.ts         # Supabase auth wrapper
│   └── projects.service.ts     # Projects data layer
│
├── lib/
│   ├── utils.ts                # cn(), formatters, validators
│   ├── constants.ts            # Pricing, features, FAQ data
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client
│       └── middleware.ts       # Auth session middleware
│
├── types/
│   ├── index.ts                # All app TypeScript types
│   └── database.ts             # Supabase table types
│
└── middleware.ts               # Next.js route protection
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth & DB | Supabase |
| PDF Rendering | PDF.js (pdfjs-dist) |
| Canvas Editing | Fabric.js |
| PDF Export | pdf-lib |
| File Upload | react-dropzone |
| Icons | lucide-react |

---

## 🎨 Pages

### Landing Page (`/`)
- Hero with animated editor mockup
- Features section (6 cards)
- How it works (4-step process)
- Pricing (3 plans, monthly/yearly toggle)
- FAQ (accordion)
- Footer with full link structure

### Auth Pages (`/login`, `/register`)
- Split-screen layout with decorative panel
- Google OAuth sign-in
- Email/password form
- Password strength indicator (register)
- Form validation & error states

### Dashboard (`/dashboard`)
- Stat cards (projects, edits, exports)
- Project grid with thumbnail cards
- Create project dialog
- Upload PDF dropzone dialog
- Search projects
- User profile menu with dropdown

### Editor (`/editor?project=ID`)
- Left: pages sidebar with thumbnails
- Top: full toolbar (tools, undo/redo, zoom, save, export)
- Center: canvas workspace with document preview
- Right: properties panel (context-aware)

### Settings (`/settings`)
- Profile: name, avatar, bio, plan info
- Billing: current plan, plan comparison, invoices
- Security: password change, 2FA, sessions, danger zone

---

## 🔌 Implementing PDF Logic (Next Steps)

The foundation is ready. Here's the roadmap for wiring up actual PDF functionality:

### 1. PDF Rendering with PDF.js

```typescript
// In src/components/editor/canvas.tsx
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const loadPdf = async (url: string) => {
  const doc = await pdfjsLib.getDocument(url).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  // render to canvas...
};
```

### 2. Fabric.js Canvas Overlay

```typescript
// In src/components/editor/canvas.tsx
import { fabric } from "fabric";

const canvas = new fabric.Canvas("editor-canvas", {
  width: 794,
  height: 1123,
});
```

### 3. PDF Export with pdf-lib

```typescript
// In src/services/export.service.ts
import { PDFDocument } from "pdf-lib";

const exportPdf = async (originalUrl: string, annotations: Annotation[]) => {
  const pdfBytes = await fetch(originalUrl).then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(pdfBytes);
  // apply annotations...
  return pdfDoc.save();
};
```

---

## 🧩 Supabase Setup Checklist

- [ ] Create Supabase project
- [ ] Run `supabase/schema.sql` in SQL Editor
- [ ] Enable Email auth provider
- [ ] (Optional) Enable Google OAuth
- [ ] Verify `pdfs` and `thumbnails` storage buckets were created
- [ ] Copy URL and anon key to `.env.local`

---

## 📦 Key Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables from `.env.local`
4. Deploy!

---

Built with ❤️ using Next.js 15, Supabase, Tailwind CSS, PDF.js, and Fabric.js.
