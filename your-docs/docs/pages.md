---
sidebar_position: 4
sidebar_label: 'App Pages'
---

# 📄 Pages in Stackquae

Stackquae is designed as a **Single Page Application (SPA)** using **React Router**, meaning each URL path leads to a different **page component** without reloading the browser.

Below is a breakdown of all the routes/pages in Stackquae, what each one does, **why it exists**, and how it supports the platform.

---

## 🏠 `/` — **Home (Index Page)**

### ✅ Purpose:
- This is the **landing page** users see when they visit your site.
- Provides a quick **overview of the app**, links to key actions (like “create post”, “sign in”, or “view blog feed”).

### 🧠 Why it's important:
- Helps **first-time visitors** understand what Stackquae is about.
- Gives returning users a **friendly entry point** to start using the app again.

---

## 📝 `/create` — **CreatePost Page**

### ✅ Purpose:
- This is the **blog editor**.
- Allows users to **write new blog posts**, including:
  - Title
  - Body/content (can be rich text or Markdown)
  - Optional cover image

- Includes buttons to:
  - ✅ **Publish**
  - 💾 **Save as Draft**

### 🧠 Why it's important:
- This is the **core writing experience** of Stackquae.
- Saving as draft allows users to **write without pressure** and finish later.
- Publishing makes content **visible in the Blog Feed**.

---

## 📚 `/blog` — **BlogFeed Page**

### ✅ Purpose:
- Displays a **list of all published blog posts**.
- Users can:
  - Browse by newest or most popular
  - See previews (title, excerpt, likes, views)

### 🧠 Why it's important:
- This is the **content discovery area**.
- Encourages **engagement** by letting users read, like, or comment.
- Gives creators **visibility** and feedback.

---

## 📖 `/blog/:id` — **BlogPost Page**

### ✅ Purpose:
- Displays a **full blog post** in a reader-friendly layout.
- Shows:
  - Title & cover image
  - Author info
  - Full content
  - Likes, views, and comment section

### 🧠 Why it's important:
- Focuses on **readability**.
- Drives interaction (users can like or comment).
- Handles **individual blog routes dynamically** using `:id`.

---

## 📅 `/life-tracker` — **LifeTracker Page**

### ✅ Purpose:
- A productivity tool built into Stackquae.
- Users can:
  - Add **daily tasks**, **goals**, or **habits**
  - Mark items as **completed or pending**
  - Track progress daily

### 🧠 Why it's important:
- Adds **real value beyond blogging**.
- Makes Stackquae a place for **habit-building and personal growth**.
- Combines productivity + expression in one app.

---

## 🔐 `/auth` — **Auth Page**

### ✅ Purpose:
- This page handles **authentication** using **Firebase Auth**.
- Allows users to:
  - Sign in using **Google**
  - (Optionally) get redirected to their previous page or homepage

### 🧠 Why it's important:
- Ensures **secure access** to protected features (like writing, editing, life tracking).
- Auth integration allows **personalized experiences** (profile, saved posts, etc.).

---

## 👤 `/profile` — **UserProfile Page**

### ✅ Purpose:
- Lets users view and manage their **personal information**, including:
  - Name
  - Bio
  - Avatar (profile image)

- Includes the **EditProfileDialog** component to update info.

### 🧠 Why it's important:
- Gives users **a sense of identity** inside Stackquae.
- Profiles make content feel **more personal** and build community vibes.

---

## ❌ `*` — **NotFound Page (404)**

### ✅ Purpose:
- A fallback route when the user enters a non-existing path.
- Shows a friendly 404 message or redirect option.

### 🧠 Why it's important:
- Improves UX by preventing confusing blank pages or crashes.
- Maintains app structure and polish even for incorrect URLs.

---

## ✅ Summary Table

| Route             | Page Component   | Description                                   |
|------------------|------------------|-----------------------------------------------|
| `/`              | `Index`          | Home/landing page                             |
| `/create`        | `CreatePost`     | Blog editor for new posts                     |
| `/blog`          | `BlogFeed`       | Feed of all published blogs                   |
| `/blog/:id`      | `BlogPost`       | Reader view for individual blog post          |
| `/life-tracker`  | `LifeTracker`    | Task & routine tracker                        |
| `/auth`          | `Auth`           | Google Sign-In with Firebase                  |
| `/profile`       | `UserProfile`    | View and edit user profile                    |
| `*`              | `NotFound`       | Custom 404 page for invalid URLs              |

---

