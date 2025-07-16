---
sidebar_position: 6
sidebar_label: 'Storage'
---
---

### ✅ Save this as: `your-docs/docs/supabase-storage.md`

````md
---
sidebar_position: 4
sidebar_label: 'Supabase Storage'
---

# 🗂️ Supabase in Stackquae (for Data & Storage)

Stackquae uses two services to manage backend logic:

- 🔐 **Firebase** → handles user authentication (login with Google)
- 📦 **Supabase** → stores blog posts, user profiles, and images

This makes it easy to build faster and more securely.

---

## 🔗 How Firebase and Supabase Work Together

1. A user logs in using **Firebase Google Sign-In**
2. The user's **UID** from Firebase is used to identify them in Supabase
3. We save all user-related data (blogs, profile info) in Supabase using that UID
4. We upload blog cover images and profile pictures to **Supabase Storage**

---

## 📄 Supabase Tables

### `posts` table

Stores blog content:

```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  content TEXT,
  cover_url TEXT,
  author_uid TEXT,
  is_draft BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
````

* `id`: unique blog post ID
* `title`: post title
* `content`: post body
* `cover_url`: URL of the blog cover image
* `author_uid`: Firebase UID of the blog author
* `is_draft`: true = saved, false = published
* `created_at`: when the blog was created

---

### `profiles` table

Stores user info:

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  bio TEXT,
  avatar_url TEXT
);
```

* `id`: Firebase UID
* `name`: user's name
* `bio`: short user description
* `avatar_url`: link to profile image

---

## 🖼️ Supabase Storage (Image Uploads)

Images are saved in a bucket named `images`.

Folder structure:

```
images/
 ┣ blog-covers/
 ┃ ┗ post-id.jpg
 ┣ profile-avatars/
 ┃ ┗ user-uid.jpg
```

### Upload example

```js
await supabase.storage
  .from("images")
  .upload(`blog-covers/${postId}.jpg`, file, {
    upsert: true,
  });

const { data } = supabase
  .storage
  .from("images")
  .getPublicUrl(`blog-covers/${postId}.jpg`);
```

You can store this `publicUrl` in your Supabase `posts` table.

---

## 🔐 Firebase UID in Supabase

After Firebase login:

```js
const user = auth.currentUser;

await supabase.from("profiles").upsert({
  id: user.uid,
  name: user.displayName,
  bio: "",
  avatar_url: user.photoURL
});
```

We use `user.uid` to link Firebase and Supabase together.

---

## ✅ Summary

| Feature       | Tool Used        |
| ------------- | ---------------- |
| Login/Auth    | Firebase Auth    |
| Blog Posts    | Supabase         |
| User Profiles | Supabase         |
| Image Uploads | Supabase Storage |

This setup keeps login simple and data management powerful.

