---
sidebar_position: 3
sidebar_label: 'Authentication'
---

# 🔐 Authentication in Stackquae

Stackquae uses **Firebase Authentication** to handle user login — fast, secure, and easy to integrate.

We currently support:
- ✅ **Google Sign-In** (with 1-click login)
- 🚫 No email/password or OAuth flows (to keep it simple for now)

---

## 👥 Why Do We Need Authentication?

Authentication allows users to:
- Have a **personalized account** (with name, avatar, and bio)
- **Create and save blogs** under their name
- **Like, comment**, and interact with content
- Save **drafts privately**
- Access their own **routine/task tracker**

Without authentication, we'd have no way to tell **who is who**, or save content per user.

---

## 🔧 Firebase Auth Setup (Code + Explanation)

In `firebase.js`, we initialize Firebase and set up auth like this:

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  // other config...
};

const app = initializeApp(firebaseConfig); // 🔸 Starts your Firebase app

const auth = getAuth(app);                 // 🔐 Firebase Auth service
const provider = new GoogleAuthProvider(); // 🧩 Google login popup

export { auth, provider };
