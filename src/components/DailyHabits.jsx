// src/components/DailyHabits.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";
import HabitCard from "./HabitCard";
import {
  requestNotificationPermission,
  showReminderNotification,
} from "../utils/notificationUtils";

const DailyHabits = () => {
  const { user } = useSelector((state) => state.auth);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    requestNotificationPermission();

    const habitsRef = ref(db, `users/${user.uid}/habits`);
    const unsubscribe = onValue(habitsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const habitsList = Object.entries(data).map(([id, habit]) => ({
          id,
          ...habit,
        }));
        setHabits(habitsList);
      } else {
        setHabits([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ Reminder checker
  useEffect(() => {
    if (habits.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}`;

      habits.forEach((habit) => {
        if (habit.reminderTime === currentTime) {
          showReminderNotification(habit.name);
        }
      });
    }, 60000); // check every 1 min

    return () => clearInterval(interval);
  }, [habits]);

  // ✅ Group habits by category
  const groupedHabits = habits.reduce((acc, habit) => {
    const category = habit.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(habit);
    return acc;
  }, {});

  return (
    <section className="relative my-6 mx-4 sm:mx-6 rounded-2xl overflow-hidden border border-violet-600/30 bg-gradient-to-br from-[#1a1a2e]/90 to-[#2a003f]/90 backdrop-blur-xl shadow-xl p-4 sm:p-6">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-70" />

      <h2 className="text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow">
        📅 This Week’s Habits
      </h2>

      {habits.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedHabits).map(([category, habitsInCategory]) => (
            <div key={category}>
              {/* Category Heading */}
              <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-2">
                {category}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {habitsInCategory.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 italic text-sm sm:text-base">
          No habits added yet. Start tracking!
        </p>
      )}
    </section>
  );
};

export default DailyHabits;
