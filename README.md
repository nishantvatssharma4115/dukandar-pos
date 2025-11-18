# DukanDar – Smart Kirana POS with Real-time Inventory Management & Bill Generation

A mobile-first Point of Sale (POS) system built specifically for Indian kirana stores. Replace pen & paper with a 10-second billing experience, automatic stock updates, real-time profit tracking, and low-stock alerts.

## Problem Statement

India has **over 10 crore kirana stores**, but **90% still rely on pen and paper**.

Common pain points:
- Billing takes too much time
- Stock count is often incorrect
- Daily profit is never calculated
- No alert when items are running low

**DukanDar solves all of this** by letting shopkeepers:
- Generate bills in 10 seconds
- Automatically update stock
- View real-time profit and low-stock alerts
- Print or share PDF bills

A practical, India-first solution built for real kirana stores.

## System Architecture
[ React Frontend – Progressive Web App (PWA) ]
↓ (Axios + JWT)
[ Node.js + Express Backend ]
↓ (MongoDB + Pandas Logic)
[ Python Flask Microservice ]
↓
[ MongoDB Atlas ]

**Data Flow (Bill Generation)**:  
POS → Node.js (`/api/bill`) → Python (Pandas) → Update Stock → Calculate Profit → Generate PDF → Return to Frontend

### Hosting Plan
| Component            | Platform         |
|----------------------|------------------|
| Frontend (PWA)       | Vercel           |
| Node.js Backend      | Render           |
| Python Microservice  | Railway          |
| Database             | MongoDB Atlas    |

## Key Features

| Category                     | Features                                                                                           |
|------------------------------|----------------------------------------------------------------------------------------------------|
| Authentication & Authorization | Phone OTP login (MSG91), JWT-protected routes                                                     |
| CRUD Operations              | Create, Read, Update, Delete inventory items                                                      |
| Searching, Sorting, Filtering, Pagination | • Search by name or barcode<br>• Filter by category & low stock<br>• Sort (name, price, stock)<br>• Pagination (10 items/page) |
| Dynamic Data Fetching        | Live data everywhere (no page reload):<br>• Instant search/filter on Inventory<br>• Auto-suggest on POS<br>• Dashboard auto-refresh every 30s<br>• Live total on Bill page |
| Bill Generation              | Select items → Auto total → Download/Share PDF bill                                               |
| Auto Stock Update            | Stock decreases automatically on bill confirmation                                                |
| Pandas Analytics             | Accurate profit calculation + low-stock alerts using Pandas + NumPy                               |
| Deployment                   | All services live with public URLs                                                                 |

## Tech Stack

| Layer               | Technologies                                              |
|---------------------|-----------------------------------------------------------|
| Frontend            | React.js, React Router, React Query, Tailwind CSS, jsPDF |
| Backend             | Node.js, Express.js                                       |
| Database            | MongoDB (NoSQL)                                           |
| Authentication      | JWT + Phone OTP (MSG91)                                   |
| Analytics Engine    | Python Flask + Pandas + NumPy                             |
| Hosting             | Vercel, Render, Railway, MongoDB Atlas                    |

## API Overview

| Endpoint                    | Method | Description                                               | Access       |
|-----------------------------|--------|-----------------------------------------------------------|--------------|
| `/api/auth/send-otp`        | POST   | Send OTP to phone                                         | Public       |
| `/api/auth/verify-otp`      | POST   | Verify OTP & login (returns JWT)                          | Public       |
| `/api/inventory`            | GET    | Dynamic list with query params<br>`?search=...&category=...&lowStock=true&sort=...&page=...&limit=...` | Authenticated |
| `/api/inventory`            | POST   | Add new item                                              | Authenticated |
| `/api/inventory/:id`        | PUT    | Update item                                               | Authenticated |
| `/api/inventory/:id`        | DELETE | Delete item                                               | Authenticated |
| `/api/bill`                 | POST   | Generate bill → update stock → calculate profit → PDF     | Authenticated |

## Bonus Highlights

- Built for real-world impact on **10 crore+ kirana stores**
- Accurate profit & stock logic powered by **Pandas + NumPy**
- Fully deployed with **3 live public URLs** (Frontend + Backend + Python service)
- Startup-ready MVP – can be tested in actual shops today

### Live Demo
- Frontend: https://dukandar-pos.vercel.app/
- Backend: https://dukandar-pos.onrender.com

