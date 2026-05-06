# 🩸 Blood Trace — Visual Blood Donor Locator System

> A web-based application that lets users find nearby blood donors on an interactive map, filter by blood group, and send emergency requests — all from a clean, minimal interface built for high-pressure situations.

---

## 🖥️ Live Preview

> Open https://blood-trace-design.vercel.app/ in your browser to launch the app. No build step required for the frontend.

---

## 📌 About the Project

**Blood Trace** is a frontend web application developed to solve a real problem in Pakistan — finding blood donors during emergencies is slow, stressful, and unstructured. People rely on WhatsApp groups and phone calls with no way to visually locate nearby donors.

Blood Trace replaces that chaos with a **map-based donor locator** where donors appear as color-coded markers on a city map. Users can filter by blood group, set a distance radius, view donor profiles, and fire off emergency requests — all within a few clicks.

---

## ✨ Features

### 🗺️ Interactive Map Interface
The core of the app. All registered donors are displayed as pins on a **Leaflet.js-powered city map**. Users can pan, zoom, and interact with the map to explore donors in any area.

### 🔴 Color-Coded Donor Markers
Every marker on the map carries meaning at a glance:

| Color | Meaning |
|---|---|
| 🟢 Green | Available — exact or compatible blood type |
| 🔵 Blue | Compatible — available now |
| 🟡 Yellow | Available — lower compatibility |
| 🔴 Red | Unavailable / recently donated |

No reading required. Users understand donor status instantly from color alone.

### 🔍 Blood Group Filter Panel
A prominent filter panel lets users select any blood group (A+, A−, B+, B−, O+, O−, AB+, AB−). The map instantly updates to highlight only matching and compatible donors, hiding irrelevant ones.

### 📏 Distance Radius Selector
Users can define a search radius (e.g., 5 km, 10 km) using a draggable control on the map. Only donors within that radius are shown, making the result set immediately relevant to the user's location.

### 👤 Donor Profile Card
Clicking any donor marker opens a popup info card showing:
- Name and blood group
- Distance from user
- Last donation date
- Current availability status
- Contact options — Call, Message, WhatsApp

### 🚨 Emergency Request Form
A dedicated **Emergency Request** button opens a form where users can submit urgent blood requirements. The system highlights all matching and compatible donors on the map immediately after submission, making it obvious who to contact first.

### 🔄 Donor Availability Status Toggle
Registered donors can set their own availability status:
- **Active** — ready to donate
- **Occupied** — temporarily unavailable
- **Unavailable** — ineligible (e.g., recently donated)

This prevents users from wasting time contacting donors who cannot donate.

### 📝 Donor Registration
New donors can register directly through the app by providing their name, blood group, area, and contact number. Once registered, they appear as a marker on the map.

### ♿ Accessibility Support
- High-contrast mode
- Adjustable text sizes
- Screen reader compatible markup

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Interactivity | JavaScript (ES6+) |
| Framework | React.js |
| Map Rendering | Leaflet.js |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Version Control | Git & GitHub |
| Editor | Visual Studio Code |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blood-trace.git
cd blood-trace

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your MongoDB URI and any API keys

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 👨‍💻 Team

**Course Instructor:** Muhammad Kamran

| Name | Student ID | Section |
|---|---|---|
| Umer Karamat | 23L-0873 | BCS-6A |
| Umer Mujahid | 23L-0774 | BCS-6A |
| M. Basim Irfan | 23L-0846 | BCS-6A |

**Institution:** National University of Computer and Emerging Sciences (FAST-NUCES)  
**Department:** Computer Science · Lahore, Pakistan

---

## 📄 License

This project is developed for academic purposes at FAST-NUCES. All rights reserved by the project authors.

---

<div align="center">
  Built with ❤️ at FAST-NUCES Lahore &nbsp;·&nbsp; <em>"Save lives."</em>
</div>
