---
sidebar_position: 7
title: Blog Posts
---

# 📝 Blog Posts System – Stackquae

This section explains how blog posts work in Stackquae—from creating and saving drafts to publishing them with a cover image.

---

## 🛠️ Features of the Blog System

- ✅ Create new blog posts (title, content, cover image)
- 💾 Save posts as **drafts** or **publish**
- 🖼️ Upload cover images (using Supabase Storage)
- ✏️ Edit or delete existing posts
- 📅 Show when it was created or updated

---

## 📂 Firestore Structure (Blogs)

Each blog is stored in the `blogs` collection:

```json
blogs/
  blogId123/
    title: "Why React is Awesome"
    content: "Long form markdown or HTML"
    createdAt: timestamp
    updatedAt: timestamp
    isPublished: true
    authorId: "user123"
    coverImageUrl: "https://..."
    likes: 0
    views: 0
    tags: ["React", "Frontend"]

✍️ Creating a Blog Post
User fills out:

Blog title

Blog content

(Optional) Upload a cover image

Chooses to either:

Save as Draft

Publish Now

Post is saved to Firestore under blogs/ with its metadata.

🗂️ Drafts vs Published
Drafts:

Not visible to the public

Can be edited anytime

Published:

Visible to all users

Triggers updates like views, likes, and comments

🖼️ Cover Image Upload (Supabase Storage)
User uploads an image via file input.

Image is stored in Supabase Storage under cover-images/.

A public URL is generated and saved in the blog's coverImageUrl field.