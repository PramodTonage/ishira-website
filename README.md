# Ishira House of Fashion — Website

Luxury ethnic wear e-commerce website for Ishira House of Fashion, Hassan, Karnataka.

## Project Structure

```
src/
  firebase.js        ← Firebase init + all Firestore/Storage/Auth functions
  AppContext.jsx      ← Global state + all handlers (React Context)
  Components.jsx      ← All UI components
  App.jsx             ← Root component, wires everything together
  main.jsx            ← React entry point
index.html
vite.config.js
package.json
.env                  ← Your Firebase config (never commit this)
.env.example          ← Template for .env
```

## Local Development Setup

### Step 1 — Install Node.js

Download from [nodejs.org](https://nodejs.org) (version 18 or higher)

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure Firebase

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase config values.
Get them from: **Firebase Console → Project Settings → Your Apps → Config**

### Step 4 — Run locally

```bash
npm run dev
```

Open http://localhost:3000

### Step 5 — Build for production

```bash
npm run build
```

This creates a `dist/` folder ready to deploy.

---

## Deployment to Vercel (Recommended — Free)

### Option A: Deploy via CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add all VITE_ variables from your .env file.

### Option B: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. In Vercel dashboard → Settings → Environment Variables → add all VITE_ variables
4. Click Deploy

### CRITICAL after deployment:

1. Firebase Console → Authentication → Settings → Authorized Domains
2. Add your Vercel domain (e.g. `ishira-fashion.vercel.app`)
3. If you have a custom domain, add that too
4. **Without this step, user login will NOT work on the live site**

---

## Deployment to Netlify (Alternative — Free)

```bash
npm run build
```

Drag the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

Add environment variables in: **Netlify Dashboard → Site Settings → Environment Variables**

Same Firebase authorized domains step applies.

---

## Custom Domain Setup

### On Vercel:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain → follow DNS instructions
3. SSL is automatic (free)

### On Netlify:

1. Netlify Dashboard → Domain Settings → Add domain
2. Follow DNS instructions
3. SSL is automatic (free)

---

## Firebase Setup Checklist

- [ ] Create project at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Enable Authentication → Email/Password
- [ ] Enable Firestore Database (region: asia-south1)
- [ ] Enable Storage (same region)
- [ ] Copy config to `.env` file
- [ ] Set Firestore security rules (see below)
- [ ] Set Storage security rules (see below)
- [ ] After deployment: add domain to Auth → Authorized Domains

### Firestore Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{id} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /wishlists/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /messages/{id} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

### Storage Rules

```firestore
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Admin Panel Access

- Click the **ISHIRA logo 5 times** (in navbar or footer)
- Enter password (set in `.env` as `VITE_ADMIN_PASSWORD`)
- Default: `ishira@admin2024` — **change this before giving to client**

## WhatsApp Number

Set in `.env`: `VITE_WHATSAPP_NUMBER=919876543210`

Format: country code (91 for India) + 10-digit number, **no spaces or + sign**

---

## Support

- **Firebase issues:** [console.firebase.google.com](https://console.firebase.google.com)
- **Vercel issues:** [vercel.com/docs](https://vercel.com/docs)
- **Domain issues:** Check your domain registrar's DNS settings
