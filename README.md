# 🌌 Orbit – Habit Tracker App

Orbit is a **modern habit tracking web application** designed to help users build consistency and achieve personal growth.  
It combines **daily tracking, progress visualization, challenges, and streaks** with a sleek and optimized UI.  

This project also highlights **full-stack development skills** using **React, Redux Toolkit, Firebase, and advanced UI/UX principles**, making it both a **portfolio-ready project** and a **practical app** for daily use.

---

## ✨ Features

- 📅 **Daily Habit Reset** – Automatically resets habits every day at login.  
- ✅ **Habit Completion** – Mark habits as completed with one click.  
- 📊 **Progress Charts & Streaks** – Track performance and visualize progress.  
- 🎯 **Challenges & Motivation** – Stay on track with challenges and streaks.  
- ⚡ **Optimized Performance** – Batched Firestore writes, reduced re-renders.  
- 🌓 **Light/Dark Mode** – Smooth theme switching for better UX.  
- 🎨 **Modern UI/UX** – Responsive, animated, and mobile-first design.  
- 🔥 **Realtime Sync** – Firebase Firestore keeps everything live.  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** – UI library  
- **Redux Toolkit** – State management with async thunks  
- **TailwindCSS** – Modern utility-first styling  
- **GSAP + Particle Effects** – Animations  

### Backend / Database
- **Firebase Firestore** – Realtime NoSQL database  
- **Firebase Authentication** – Secure user management  

### Deployment
- **Vercel** – Fast, serverless deployment  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/orbit-habit-tracker.git
cd orbit-habit-tracker
2. Install Dependencies
bash
Copy code
npm install
3. Setup Firebase
Create a project in Firebase Console.

Enable Authentication and Firestore Database.

Add your Firebase config in src/firebase.js:

js
Copy code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
4. Run the App
bash
Copy code
npm run dev
Open http://localhost:5173 in your browser.

📂 Project Structure
php
Copy code
orbit-habit-tracker/
├── src/
│   ├── components/       # UI components (Navbar, Footer, etc.)
│   ├── features/         # Redux slices & async thunks
│   ├── pages/            # Main app pages (Home, Dashboard, Auth)
│   ├── utils/            # Helper utilities (date, formatters)
│   ├── App.jsx           # Root app component
│   ├── main.jsx          # Entry point
│   └── firebase.js       # Firebase setup
├── public/               # Static assets
├── package.json
└── README.md
📈 Optimizations
Performance: Batched writes to Firestore instead of multiple updateDoc calls.

Code Quality: Extracted reusable utils (like getToday()).

State Management: Normalized Redux state for O(1) habit lookups.

UI/UX: Reduced whitespace, optimized mobile-first layout.

Error Handling: Used rejectWithValue in thunks for cleaner error states.

🌐 Deployment
Push your repo to GitHub.

Connect it with Vercel.

Add Firebase config as environment variables in Vercel.

Deploy and share your live app! 🚀

Example:

Home Page

Habit Dashboard

Progress Charts

🤝 Contributing
Want to improve Orbit? Feel free to fork the repo and create pull requests.

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Built with ❤️ by Syed Abdul Qadeer
Currently learning Full-Stack Web Development @ Masai School.
#dailylearning #masaiverse