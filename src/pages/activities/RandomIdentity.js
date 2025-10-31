import { useState } from "react";
import "../../styles/pages/activities/RandomIdentity.css";

const zodiacData = {
  aries: { name: "Aries ♈", traits: ["Bold", "Energetic", "Starter"], message: "Start the thing. Your fire is useful today." },
  taurus: { name: "Taurus ♉", traits: ["Grounded", "Patient", "Steady"], message: "Go slow and solid. Comfort-first is okay." },
  gemini: { name: "Gemini ♊", traits: ["Curious", "Expressive", "Adaptable"], message: "Talk it out. A convo will unlock clarity." },
  cancer: { name: "Cancer ♋", traits: ["Caring", "Intuitive", "Protective"], message: "Nurture your circle. Your care will be noticed." },
  leo: { name: "Leo ♌", traits: ["Confident", "Creative", "Warm"], message: "Show your light. You’re the main character today." },
  virgo: { name: "Virgo ♍", traits: ["Detail-loving", "Helpful", "Practical"], message: "Fix one tiny thing. You’ll feel aligned right away." },
  libra: { name: "Libra ♎", traits: ["Balanced", "Charming", "Fair"], message: "Choose harmony, not speed. People will support you." },
  scorpio: { name: "Scorpio ♏", traits: ["Intense", "Loyal", "Deep"], message: "Go deeper, not wider. Depth will give you power." },
  sagittarius: { name: "Sagittarius ♐", traits: ["Adventurous", "Optimistic", "Honest"], message: "Say yes to something new — expansion wants you." },
  capricorn: { name: "Capricorn ♑", traits: ["Ambitious", "Disciplined", "Patient"], message: "Keep building. Quiet consistency will pay off." },
  aquarius: { name: "Aquarius ♒", traits: ["Original", "Big-picture", "Humanitarian"], message: "Share the weird idea. That’s the one people need." },
  pisces: { name: "Pisces ♓", traits: ["Empathic", "Dreamy", "Creative"], message: "Create from what you feel. Soft does not mean weak." },
};

function getZodiac(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  return "pisces";
}

export default function RandomIdentity() {
  const [date, setDate] = useState("");
  const [zodiac, setZodiac] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!date) return;
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const zKey = getZodiac(month, day);
    setZodiac(zodiacData[zKey]);
    setShowResult(false);
    setConfettiKey((k) => k + 1);
    setTimeout(() => setShowResult(true), 15);
  }

  return (
    <div className="identity-light-container with-anim">
      <div className="id-bubble id-b1"></div>
      <div className="id-bubble id-b2"></div>
      <div className="id-bubble id-b3"></div>

      {showResult && (
        <div key={confettiKey} className="party-layer">
          <div className="party-bomber left-bomber"></div>
          <div className="party-bomber right-bomber"></div>
          <div className="party-confetti c1"></div>
          <div className="party-confetti c2"></div>
          <div className="party-confetti c3"></div>
          <div className="party-confetti c4"></div>
        </div>
      )}

      <div className="identity-card-light">
        <h2 className="identity-title-light">Your Zodiac Vibe ✨</h2>
        <p className="identity-sub-light">Enter your birth date to see your sign, traits, and today’s message.</p>

        <form className="identity-form" onSubmit={handleSubmit}>
          <input
            type="date"
            className="identity-date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
          />
          <button type="submit" className="identity-btn-rect">
            Reveal
          </button>
        </form>

        {showResult && zodiac && (
          <div className="identity-result pop-in glow">
            <p className="identity-label">Your zodiac sign</p>
            <h3 className="identity-zodiac-name">{zodiac.name}</h3>
            <div className="identity-traits">
              {zodiac.traits.map((t) => (
                <span key={t} className="identity-pill">
                  {t}
                </span>
              ))}
            </div>
            <p className="identity-message">{zodiac.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
