// src/pages/activities/RandomIdentity.jsx
import { useState } from "react";
import "../../styles/pages/activities/RandomIdentity.css";

const identities = [
  "🦊 Sly Fox — clever, quick, slightly chaotic",
  "🐢 Chill Turtle — slow today, still winning",
  "🐼 Cozy Panda — productivity is optional",
  "🐧 Focused Penguin — cute but on task",
  "🐱 Curious Cat — click everything, learn everything",
  "🐯 Tiger Mode — roar through your to-do list",
  "🐤 Soft Chick — be gentle with yourself",
  "🦁 King Lion — confidence level: 100",
  "🦄 Rainbow Unicorn — unique, unbothered, magical",
  "🐙 Octo-Tasker — doing 8 things at once",
  "🦥 Lazy Sloth — rest is a feature, not a bug",
  "🐝 Busy Bee — buzzing with ideas",
  "🦖 Dino Dev — old school but powerful",
  "🦜 Parrot Pro — repeating good habits",
  "🦔 Spiky Hedgehog — cute but don’t test me",
  "🦋 Glow Butterfly — transformation era",
  "🦚 Peacock Vibes — you look good today",
  "🐸 Frog Jumper — hop over problems",
  "🐕 Loyal Doggo — supportive teammate energy",
  "🐍 Sneaky Python — silent, smart, sssssharp",
  "🪽 Soft Angel Mode — kindness first",
  "🌊 Ocean Brain — calm but deep",
  "🔥 Hot Streak — everything is working today",
  "🌙 Night Coder — 2 AM productivity unlocked"
];

export default function RandomIdentity() {
  const [text, setText] = useState(identities[0]);

  function changeIdentity() {
    const random = Math.floor(Math.random() * identities.length);
    setText(identities[random]);
  }

  return (
    <div className="identity-wrapper">
      <div className="identity-glow"></div>
      <div className="identity-card">
        <h2 className="identity-title">Today’s Random Identity ✨</h2>
        <p className="identity-sub">Click to find today’s vibe</p>
        <p className="identity-box">{text}</p>
        <button onClick={changeIdentity} className="identity-btn">
          Give me another
        </button>
        <p className="identity-hint">Tip: keep clicking till it feels right 😌</p>
      </div>
    </div>
  );
}
