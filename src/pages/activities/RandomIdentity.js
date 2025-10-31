import { useState } from "react";
import "../../styles/pages/activities/RandomIdentity.css";

const identities = [
  "🦊 Sly Fox — clever, quick, slightly chaotic",
  "🐢 Chill Turtle — slow today, still winning",
  "🐼 Cozy Panda — productivity is optional",
  "🐧 Focused Penguin — cute but on task",
  "🐱 Curious Cat — click everything, learn everything",
  "🐯 Tiger Mode — roar through your to-do list",
  "🦄 Rainbow Unicorn — unique, unbothered, magical",
  "🦥 Lazy Sloth — rest is a feature, not a bug",
  "🐝 Busy Bee — buzzing with ideas",
  "🦋 Glow Butterfly — transformation era",
  "🦚 Peacock Vibes — you look good today",
  "🐸 Frog Jumper — hop over problems",
  "🐕 Loyal Doggo — supportive teammate energy",
  "🌊 Ocean Brain — calm but deep",
  "🔥 Hot Streak — everything is working today",
  "🌙 Night Coder — 2 AM productivity unlocked",
  "🧋 Boba Thinker — sweet, but overthinks sometimes",
  "🍕 Pizza Brain — full of ideas (and cheese)",
  "🎧 Chill DJ — vibing through chaos",
  "📚 Wise Owl — silent but deadly (with notes)"
];

export default function RandomIdentity() {
  const [identity, setIdentity] = useState(identities[0]);

  function handleClick() {
    const random = Math.floor(Math.random() * identities.length);
    setIdentity(identities[random]);
  }

  return (
    <div className="identity-light-container">
      <div className="identity-card-light">
        <h2 className="identity-title-light">Today’s Random Identity ✨</h2>
        <p className="identity-text-light">{identity}</p>
        <button onClick={handleClick} className="identity-btn-light">
          Give me another
        </button>
      </div>
    </div>
  );
}
