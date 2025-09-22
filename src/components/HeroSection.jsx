// src/components/HeroSection.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { ref, onValue, off } from "firebase/database";

const toISODate = (date) => new Date(date).toLocaleDateString("en-CA");

const HeroSection = () => {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [totalHabits, setTotalHabits] = useState(0);
  const [completedHabits, setCompletedHabits] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [greeting, setGreeting] = useState("Hello");
  const [loading, setLoading] = useState(true);

  // Greeting based on time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) setGreeting("Good Morning");
    else if (hours >= 12 && hours < 17) setGreeting("Good Afternoon");
    else if (hours >= 17 && hours < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  // Fetch user + habits
  useEffect(() => {
    if (!user?.uid) {
      setUsername("");
      setTotalHabits(0);
      setCompletedHabits(0);
      setCurrentStreak(0);
      setLoading(false);
      return;
    }

    const userRef = ref(db, "users/" + user.uid);

    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUsername(data.username || "");

        if (data.habits) {
          const habits = Object.values(data.habits);
          setTotalHabits(habits.length);

          const todayStr = toISODate(new Date());

          // ✅ Completed today
          const completedToday = habits.filter(
            (h) => Boolean(h?.history?.[todayStr])
          ).length;
          setCompletedHabits(completedToday);

          // ✅ Streak calc
          let maxStreak = 0;
          habits.forEach((h) => {
            if (h.history) {
              let streak = 0;
              const dates = Object.keys(h.history).sort().reverse();
              if (dates.length > 0) {
                let lastDate = new Date(dates[0]);
                for (let i = 0; i < dates.length; i++) {
                  const current = new Date(dates[i]);
                  const expected = new Date(lastDate);
                  expected.setDate(lastDate.getDate() - i);

                  if (current.toDateString() === expected.toDateString()) {
                    streak++;
                  } else break;
                }
              }
              maxStreak = Math.max(maxStreak, streak);
            }
          });

          setCurrentStreak(maxStreak);
        } else {
          setTotalHabits(0);
          setCompletedHabits(0);
          setCurrentStreak(0);
        }
      }
      setLoading(false);
    });

    return () => off(userRef); // cleanup listener
  }, [user]);

  return (
    <section className="relative mx-4 sm:mx-6 my-6 sm:my-8 rounded-2xl overflow-hidden shadow-xl border border-violet-600/30 bg-gradient-to-br from-[#1a1a2e]/90 to-[#2a003f]/90 backdrop-blur-xl p-6 sm:p-8">
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-70" />

      {/* Greeting */}
      <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
        {greeting}, {username || "Explorer"} ✦
      </h2>
      <p className="mt-2 text-gray-300 text-sm sm:text-base">
        Here’s a quick overview of your habits today.
      </p>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {/* Total Habits */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition">
            <p className="text-gray-400 text-sm">Total Habits</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-300">
              {totalHabits}
            </h3>
          </div>

          {/* Completed Today */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/40 shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition">
            <p className="text-gray-400 text-sm">Completed Today</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-300">
              {completedHabits}
            </h3>
          </div>

          {/* Streak */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-pink-600/30 to-red-600/30 border border-pink-500/40 shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition">
            <p className="text-gray-400 text-sm">Best Streak</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-pink-300">
              {currentStreak} days
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
