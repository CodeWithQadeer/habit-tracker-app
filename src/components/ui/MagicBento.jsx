// src/components/ui/MagicBento.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Import all homepage components
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import AddHabitForm from "../AddHabitForm";
import DailyHabits from "../DailyHabits";
import ProgressCharts from "../ProgressCharts";
import Streak from "../Streak";
import Challenges from "../Challenges";
import Achievements from "../Achievements";
import Footer from "../Footer";

// ---------------- Particle Card (Optional Bento Item) ----------------
const ParticleCard = ({ title, description }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const createParticle = (e) => {
      const particle = document.createElement("div");
      particle.className = "particle";
      card.appendChild(particle);

      const rect = card.getBoundingClientRect();
      particle.style.left = `${e.clientX - rect.left}px`;
      particle.style.top = `${e.clientY - rect.top}px`;

      gsap.to(particle, {
        x: "random(-100,100)",
        y: "random(-100,100)",
        opacity: 0,
        scale: 0,
        duration: 1,
        onComplete: () => particle.remove(),
      });
    };

    card.addEventListener("mouseenter", createParticle);
    return () => {
      card.removeEventListener("mouseenter", createParticle);
    };
  }, []);

  return (
    <div ref={cardRef} className="particle-card">
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
    </div>
  );
};

// ---------------- Global Spotlight Effect ----------------
const GlobalSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;

    const handleMove = (e) => {
      gsap.to(spotlight, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={spotlightRef} className="global-spotlight" />;
};

// ---------------- Magic Bento Wrapper ----------------
const MagicBento = () => {
  return (
    <div className="magicbento-wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Spotlight */}
      <GlobalSpotlight />

      {/* Homepage Sections in Bento Layout */}
      <div className="homepage-sections">
        <div className="section-card" id="hero">
          <HeroSection />
        </div>
        <div className="section-card" id="habits">
          <DailyHabits />
        </div>
        <div className="section-card">
          <AddHabitForm />
        </div>
        <div className="section-card" id="progress">
          <ProgressCharts />
        </div>
        <div className="section-card">
          <Streak />
        </div>
        <div className="section-card" id="achievements">
          <Achievements />
        </div>
        <div className="section-card" id="achievements">
          <Challenges />
        </div>
      </div>

      <Footer />

      {/* Styling */}
      <style jsx>{`
        .magicbento-wrapper {
          min-height: 100vh;
          background: #0a0a14;
          padding: 1.5rem; /* reduced */
        }

        .homepage-sections {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem; /* tighter spacing */
        }

        .section-card {
          background: linear-gradient(135deg, #1a1a2e, #2a003f);
          border-radius: 16px; /* slightly smaller */
          padding: 1 rem; /* reduced padding */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5),
            0 0 15px rgba(147, 51, 234, 0.4); /* softer glow */
          color: white;
        }

        /* Responsive tweaks */
        @media (min-width: 768px) {
          .section-card {
            padding: 1.5rem; /* bigger on desktop */
            border-radius: 20px;
          }
        }

        /* Spotlight */
        .global-spotlight {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.25),
            transparent 70%
          );
          filter: blur(80px);
          z-index: 0;
        }

        /* Particle Effect */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default MagicBento;
