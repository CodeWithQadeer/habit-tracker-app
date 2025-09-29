🌌 Orbit – Habit Tracker App

Live Demo 🚀

Orbit is a modern habit tracking web application built to help users stay consistent and achieve personal growth.
It combines daily habit tracking, progress visualization, challenges, and streaks with a sleek, optimized UI.

This project also demonstrates full-stack development skills using React, Redux Toolkit, Firebase, and advanced UI/UX principles, making it both a portfolio-ready showcase and a practical tool for daily use.

✨ Features

📅 Daily Habit Reset – Automatically resets habits at login each day.

✅ Habit Completion – Mark habits as completed with a single click.

📊 Progress Charts & Streaks – Visualize your growth and track streaks.

🎯 Challenges & Motivation – Stay engaged with challenges and streak milestones.

⚡ Optimized Performance – Batched Firestore writes & reduced re-renders.

🌓 Light/Dark Mode – Smooth theme switching for a better user experience.

🎨 Modern UI/UX – Responsive, animated, and mobile-first design.

🔥 Realtime Sync – Firebase Firestore ensures live updates.

🛠️ Tech Stack
Frontend

React 18 – UI library

Redux Toolkit – State management with async thunks

TailwindCSS – Utility-first styling

GSAP + Particle Effects – Smooth animations

Backend / Database

Firebase Firestore – Realtime NoSQL database

Firebase Authentication – Secure user authentication

Deployment

Vercel – Serverless deployment with CI/CD

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/orbit-habit-tracker.git
cd orbit-habit-tracker

2. Install Dependencies
npm install

3. Setup Firebase

Create a project in Firebase Console.

Enable Authentication and Firestore Database.

Add your Firebase config in src/firebase.js:

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
npm run dev


Open http://localhost:5173
 in your browser.

📂 Project Structure
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

Performance: Batched Firestore writes instead of multiple updateDoc calls.

Code Quality: Extracted reusable utilities (e.g., getToday()).

State Management: Normalized Redux state for O(1) habit lookups.

UI/UX: Optimized for mobile-first layout with smooth animations.

Error Handling: Used rejectWithValue in thunks for clean error states.

🌐 Deployment

Push your repo to GitHub.

Connect it with Vercel.

Add Firebase config as environment variables in Vercel.

Deploy and share your live app! 🚀

👉 Live Demo Here

🤝 Contributing

Contributions are welcome! Fork the repo, make improvements, and open a pull request.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Built with ❤️ by Syed Abdul Qadeer
Currently pursuing Full-Stack Web Development @ Masai School
#dailylearning #masaiverse
