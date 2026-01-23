# CAPE LMS Frontend

CAPE LMS Frontend is a modern **Next.js 15.5.9 App Router** application built for the **CAPE UTP (Centre for Advanced and Professional Education)** platform.
It serves as the frontend layer for enterprise learner and admin experiences, integrating closely with the CAPE Backend API and LearnWorlds.

This project is designed to be **scalable, maintainable, and developer-friendly**, following modern React and Next.js best practices.

---

## 🧱 Tech Stack Overview

- **Framework**: Next.js 15.5.9 (App Router)
- **Language**: TypeScript
- **UI & Styling**:
  - Tailwind CSS v4
  - Radix UI (accessible primitives)
  - shadcn-style component patterns
- **State Management**:
  - Redux Toolkit (global auth / app state)
  - TanStack React Query (server state & API caching)
- **Forms & Validation**:
  - React Hook Form
  - Zod
- **Authentication & Security**:
  - JWT handling via `jose`
  - Password hashing via `bcrypt`
- **HTTP & Utilities**:
  - Axios
  - nanoid
- **UX Enhancements**:
  - Sonner (toast notifications)
  - Lucide & React Icons
  - React Spinners

---

## 📂 Project Structure (High Level)
