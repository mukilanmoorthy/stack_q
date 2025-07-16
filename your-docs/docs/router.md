---
sidebar_position: 5
sidebar_label: 'router'
---
## 🚀 App Structure

The main application (`App.jsx`) wraps your pages with a number of providers for data fetching, theming, and UI behavior.

```jsx
<QueryClientProvider client={queryClient}>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <TooltipProvider>
      <Toaster richColors position="top-right" />
      <Routes>
        <!-- Route definitions go here -->
      </Routes>
    </TooltipProvider>
  </ThemeProvider>
</QueryClientProvider>
````

---

## 📌 Routes Breakdown

| **Path**        | **Component** | **Purpose**                                       |
| --------------- | ------------- | ------------------------------------------------- |
| `/`             | `Index`       | Home or landing page                              |
| `/create`       | `CreatePost`  | Page to create a new blog post                    |
| `/blog`         | `BlogFeed`    | Blog feed showing all posts                       |
| `/blog/:id`     | `BlogPost`    | Dynamic page for viewing a single blog post by ID |
| `/life-tracker` | `LifeTracker` | Personal dashboard/life tracker tool              |
| `/auth`         | `Auth`        | Authentication page for login/signup              |
| `/profile`      | `UserProfile` | Profile page for logged-in users                  |
| `*`             | `NotFound`    | Catch-all route for 404 Not Found                 |

---

## 📂 Components Used

* **`Toaster`**: Shows toast notifications (from `sonner`)
* **`TooltipProvider`**: Provides tooltips across the app
* **`QueryClientProvider`**: Enables React Query for server-state management
* **`ThemeProvider`**: Supports dark/light theme switching
* **`EditProfileDialog`**: A reusable component to edit user profiles (optional)

---

## 🧠 Dynamic Routing Example

The blog post route uses a dynamic segment `:id`:

```jsx
<Route path="/blog/:id" element={<BlogPost />} />
```

This allows you to navigate to URLs like:

* `/blog/123`
* `/blog/my-post-title`

Inside the `BlogPost` component, you can access the ID like this:

```js
import { useParams } from "react-router-dom";
const { id } = useParams();
```

---

## ❌ Not Found (404) Handling

This route ensures users see a friendly message when visiting an unknown route:

```jsx
<Route path="*" element={<NotFound />} />
```

---

## 🧰 Tools and Libraries

| Tool                    | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `react-router-dom`      | Navigation and routing                       |
| `@tanstack/react-query` | Data fetching, caching, and synchronization  |
| `next-themes`           | Theme switching between light and dark modes |
| `sonner`                | Toast notification UI                        |

---

## ✅ Summary

* All routes are managed inside the `<Routes>` component.
* Each path is linked to a component that renders the UI.
* Common providers wrap the app for theme, tooltips, toast messages, and data fetching.

