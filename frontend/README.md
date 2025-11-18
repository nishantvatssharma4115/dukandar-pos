# DukanDar Frontend

React + Vite single-page application that talks to the existing DukanDar backend. It provides registration and login experiences backed by `/api/users/register` and `/api/users/login`, stores the returned JWT + user profile locally, and shows a lightweight dashboard once authenticated.

## Quick start

```bash
cd frontend
npm install
npm run dev
```

The app expects the backend to be running locally (default `http://localhost:3000`). For deployments, copy `env.example` to `.env` and set `VITE_API_URL=https://<your-backend-domain>/api` (no trailing slash). Remember to configure the same environment variable with your hosting provider so `vite build` emits the correct base URL.

## Project structure

- `src/context/AuthContext.jsx` – manages auth state + localStorage sync
- `src/services/api.js` – helper for hitting backend routes
- `src/components/AuthForm.jsx` – reusable form that supports login/register
- `src/pages/AuthPage.jsx` and `src/pages/DashboardPage.jsx` – top-level screens

Vite handles bundling, hot reloading, and build outputs.

