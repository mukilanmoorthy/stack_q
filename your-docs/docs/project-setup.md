---
sidebar_position: 2
title: Project Setup
---

# 🛠️ Project Setup – Stackquae

Welcome to the Stackquae setup guide!  
Let’s get your local development environment ready in a few easy steps.

---

## ⚙️ Tech Stack Overview

Here’s what Stackquae uses:

- **Frontend**: React (with Vite)
- **Styling**: Tailwind CSS + Shadcn UI
- **Authentication**: Firebase (or Supabase)
- **Database**: Firestore (Cloud NoSQL)
- **Storage**: Supabase Storage (for images like blog covers & profile pics)
- **Routing**: React Router
- **UI State/Data Fetching**: React Query

---

## 📁 Folder Structure

stackquae/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── hooks/
│ └── lib/
├── .env
├── index.html
└── package.json

yaml
Copy code

---



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stackquae.git
cd stackquae
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file at the root and add your Firebase/Supabase keys:

env
Copy code
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
📝 Use .env.example as a reference if available.

4. Start the Development Server
bash
Copy code
npm run dev
This will open the app at http://localhost:5173 (or similar).