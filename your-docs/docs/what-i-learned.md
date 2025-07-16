---
sidebar_position: 9
sidebar_label: 'Learnings Summary'
---

# 📘 What I Learned new – Quick Summary

While building **Stackquae**, I learned so many new, real-world dev skills. Here's a quick, easy-to-read list:

---

## 🔴 Supabase

- Saved blog posts (title, content, is_draft)
- Created and used a `comments` table
- Used Supabase **Storage** to upload:
  - Blog cover images
  - User profile pictures
- Got **public URLs** for uploaded images
- Filtered blogs (e.g. `WHERE is_draft = false`)
- Connected Supabase rows with Firebase UID

---

## 🔴 Firebase Auth

- Integrated **Google login** using Firebase
- Grabbed user `uid`, `displayName`, `photoURL`
- Used UID to link with blog posts and profiles

---

---

## 🔴 React Query

- Used `useQuery` to fetch blogs, profiles
- Used `useMutation` to create/update data
- Auto-refreshed UI with `invalidateQueries`

---



## 🔴 Other Cool Things

- Uploaded files with `<input type="file" />` and previewed images
- Stored **view counts**, **likes**, and **comments**
- Saved blogs as **drafts** and published later
- Used timestamps (`created_at`) to show post dates
- Designed mobile-friendly layouts using `sm:`, `md:` in Tailwind

---

> ✨ I didn’t just build a project —  
> I learned how to connect frontend, backend, storage, and auth in one full-stack app.
