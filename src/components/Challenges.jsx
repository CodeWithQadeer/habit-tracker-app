import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { ref, onValue, push } from "firebase/database";

const Challenges = () => {
  const { user } = useSelector((state) => state.auth);
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState("");

  useEffect(() => {
    if (!user?.uid) return;

    const challengesRef = ref(db, `users/${user.uid}/challenges`);
    const unsubscribe = onValue(challengesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const challengesList = Object.entries(data).map(([id, challenge]) => ({
          id,
          ...challenge,
        }));
        setChallenges(challengesList);
      } else {
        setChallenges([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const addChallenge = async () => {
    if (!user?.uid || !newChallenge.trim()) return;

    try {
      const challengesRef = ref(db, `users/${user.uid}/challenges`);
      await push(challengesRef, {
        title: newChallenge,
        completed: false,
      });
      setNewChallenge(""); // clear input
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  return (
    <section className="relative mx-4 sm:mx-6 my-6 sm:my-8 rounded-2xl overflow-hidden shadow-xl border border-violet-600/30 bg-gradient-to-br from-[#1a1a2e]/90 to-[#2a003f]/90 backdrop-blur-xl p-5 sm:p-8">
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-70" />

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
        🎯 Challenges
      </h2>

      {/* Input to add challenge */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
          placeholder="Enter challenge title..."
          className="flex-grow p-3 rounded-xl bg-[#1a1a2e]/70 border border-indigo-500/40 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 shadow-inner text-sm sm:text-base"
        />
        <button
          onClick={addChallenge}
          className="px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition text-sm sm:text-base"
        >
          Add
        </button>
      </div>

      {challenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 shadow-lg text-gray-200 hover:scale-[1.02] sm:hover:scale-105 transition break-words"
            >
              {challenge.title}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-sm sm:text-base">
          No challenges yet. Add one above!
        </p>
      )}
    </section>
  );
};

export default Challenges;
