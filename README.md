# 🅿️ ParkZone – Smart Parking Management System

## About

**ParkZone** is a modern, user-friendly parking management system that simplifies the parking experience. It provides real-time slot availability tracking across multiple zones and floors, streamlined booking workflows, and comprehensive admin controls. Built with React and localStorage, it delivers a fast, responsive, and intuitive interface for both users and administrators to manage parking operations efficiently.

---

## Prerequisite

- **Node.js** (v16 or higher) — download from https://nodejs.org
- **npm** (comes with Node.js)

---

## How to Run

### Step 1 — Open Terminal / Command Prompt

Navigate to this folder:

```
cd parkzone
```

### Step 2 — Install dependencies (only once)

```
npm install
```

This will take 1–2 minutes the first time.

### Step 3 — Start the app

```
npm start
```

The app will open automatically at **http://localhost:3000**

---

## Login Credentials

### Admin Panel

- **Email:** admin@parkzone.com
- **Password:** Admin@123

### Regular Users

- Sign up with any email & password (6+ characters)

---

## Features

### User Side

- Sign up / Log in
- 3-step booking: Select Zone → Select Floor → Select Block
- Live slot availability (green = free, red = occupied)
- My Bookings tab — view and cancel reservations
- One active booking per user

### Admin Panel

- Overview dashboard with occupancy stats
- All Bookings — view every booking + force-release any slot
- Zone Detail — inspect every zone, floor, and slot in real time
- Dark / Light mode toggle

### 4 Parking Zones

| Zone       | Floors            | Total Slots |
| ---------- | ----------------- | ----------- |
| Zone Alpha | 3                 | 24          |
| Zone Beta  | 2                 | 12          |
| Zone Gamma | 4 (incl. Rooftop) | 36          |
| Zone Delta | 2                 | 16          |

---

## Notes

- All data is stored in your browser's **localStorage** — no server needed
- Data persists across browser refreshes
- To reset all data, open browser DevTools → Application → Local Storage → Clear

---

## Future Enhancements – AI & ML Integrations

ParkZone is designed for future extensibility with intelligent automation features:

### 🤖 Planned AI/ML Integrations

- **Predictive Occupancy Analytics** — ML models to forecast parking demand based on time, location, and historical trends
- **Smart Slot Recommendation Engine** — AI-driven suggestions for optimal parking slots based on user preferences and proximity
- **Automated Dynamic Pricing** — Machine learning algorithms to adjust pricing based on real-time demand and availability
- **Anomaly Detection** — AI system to identify suspicious booking patterns and optimize slot allocation
- **Computer Vision Integration** — Real-time vehicle detection and license plate recognition for automated entry/exit
- **Natural Language Processing** — Chatbot support for queries and booking assistance
- **Predictive Maintenance Alerts** — ML models to predict infrastructure maintenance needs across zones

These features are planned for future releases to make parking management smarter, faster, and more efficient.

---

## Deploying to Vercel

This project is a static SPA built with Create React App and can be deployed to Vercel.

Steps:

1. Install the Vercel CLI (optional):

```bash
npm i -g vercel
```

2. From the project root run:

```bash
npm install
npm run vercel-build
vercel --prod
```

Vercel will run `npm run vercel-build` and serve the `build/` directory. The included `vercel.json` config ensures SPA routing.
