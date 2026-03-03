APS Security Platform – Frontend Implementation

This project is my implementation of the Fenrir Security Frontend Design Challenge.
The goal was to accurately recreate three product screens from a B2B cybersecurity SaaS platform using React, with full dark/light theme support, navigation, responsiveness, and interactive behavior.

🚀 Live Demo

Deployed on: Vercel
(Replace this with your deployed URL)

🧰 Tech Stack

React (Vite)

Tailwind CSS

React Hooks (useState, useEffect, useMemo, useContext)

Context API (for global theme management)

Lucide React (icons)

Local mock JSON data (no backend integration)

📦 Features Implemented
1. Authentication Screen (Sign Up)

Split layout with gradient marketing panel

Fully styled form inputs (no default browser styles)

Form validation (first name, last name, email, password length)

Password visibility toggle

Loading state on submit

Social login UI (Apple, Google, Meta)

Global theme toggle

2. Dashboard (Scan List Overview)

Persistent sidebar navigation

Organization-level statistics section

Severity summary cards (Critical, High, Medium, Low)

Search functionality (filter by name/type)

Pagination

Reusable status chips (Completed, Scheduled, Failed)

Vulnerability badges with severity colors

Interactive buttons (Filter, Column, Export Report, Stop Scan)

Toast notifications for actions

Fully responsive layout

3. Active Scan Detail (Live Console)

Circular SVG progress indicator

Dynamic step tracker (Spidering → Reporting)

Metadata grid section

Tabbed console (Activity Log / Verification Loops)

Auto-scroll console behavior

Finding log with reusable severity badges

Bottom status bar with runtime metrics

Global theme consistency

🎨 Design Considerations

Implemented class-based dark mode using Tailwind.

Accent color (#0CC8A8) used consistently for active states and highlights.

Severity colors strictly mapped:

Critical → Red

High → Orange

Medium → Amber

Low → Green

All UI primitives (badges, chips, progress indicators) are reusable components.

Spacing and typography follow a consistent scale across screens.

📂 Project Structure
src/
 ├─ components/
 │   ├─ layout/        (Sidebar)
 │   ├─ ui/            (Badges, Chips, Toast, Toggle)
 ├─ pages/
 │   ├─ LoginPage.jsx
 │   ├─ DashboardPage.jsx
 │   └─ ScanDetailPage.jsx
 ├─ context/
 │   └─ ThemeContext.jsx
 ├─ data/
 │   └─ mockData.js

The architecture separates layout components, reusable UI components, and screen-level logic to keep the code modular and maintainable.

🧪 Mock Data

All screens are powered by structured mock data stored in mockData.js.
No backend integration is used, as per the challenge requirements.

Mock data includes:

Scan entries

Severity statistics

Activity logs

Verification loops

Finding logs

Scan metadata

🛠 Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd <repo-name>
2. Install dependencies
npm install
3. Start development server
npm run dev

The app will run at:

http://localhost:5173
📱 Responsiveness

Sidebar collapses into a mobile drawer.

Tables support horizontal scrolling on small screens.

Console and finding panels stack vertically on smaller viewports.

Tested at 375px (mobile) and 1280px+ (desktop).


