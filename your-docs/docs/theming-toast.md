---
sidebar_position: 8
sidebar_label: 'Theme & Toasts'
---

# 🎨 Theme & Toast Notifications

Stackquae uses modern UI enhancements to create a smooth, responsive, and accessible user experience. Two key parts of this are:

- 🌗 Light/Dark Theme toggle  
- 🔔 Toast notifications & tooltips

---

## 🌗 Theme Support with `next-themes`

We use [`next-themes`](https://github.com/pacocoursey/next-themes) to allow users to switch between **light** and **dark** mode.

### How it works

In your main app:

```jsx
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {/* App content */}
</ThemeProvider>
