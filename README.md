# 🅿️ ParkZone – Smart Parking Management System

## Prerequisites
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
| Zone | Floors | Total Slots |
|------|--------|-------------|
| Zone Alpha | 3 | 24 |
| Zone Beta | 2 | 12 |
| Zone Gamma | 4 (incl. Rooftop) | 36 |
| Zone Delta | 2 | 16 |

---

## Notes
- All data is stored in your browser's **localStorage** — no server needed
- Data persists across browser refreshes
- To reset all data, open browser DevTools → Application → Local Storage → Clear
