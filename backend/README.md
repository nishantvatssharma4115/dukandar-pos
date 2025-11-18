## DukanDar Platform

This repository now houses both the existing Express/Mongo backend (`backend/`) and a new React + Vite frontend (`backend/frontend/`) that consumes the `/api/users/*` endpoints for registration and login workflows.

### Backend

```bash
cd backend
npm install
npm run server
```

Environment variables required in `backend/.env`:

- `MONGODB_URI`
- `JWT_SECRET`
- `PORT` (optional, defaults to `3000`)

### Frontend

```bash
cd backend/frontend
npm install
npm run dev
```

Configure the API base URL by copying `env.example` to `.env` inside `backend/frontend` and adjusting `VITE_API_URL`. The default assumes the backend runs at `http://localhost:3000/api`.

