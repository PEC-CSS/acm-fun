import React, { useRef, useEffect, useState } from "react";


export default function FlappyBird() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  const [state, setState] = useState("menu"); 
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState(30);
  const [remaining, setRemaining] = useState(duration);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("flappy_high")) || 0
  );

 
  const birdRef = useRef({ x: 80, y: 200, vy: 0, r: 14 });
  const pipesRef = useRef([]);
  const spawnTimerRef = useRef(0);
  const startTimeRef = useRef(0);
  const scoredPipesRef = useRef(new Set());

  
  const settings = {
    Easy: { gravity: 0.35, jump: -8.2, speed: 1.8, gap: 180, spawn: 1500 },
    Medium: { gravity: 0.5, jump: -9.0, speed: 2.4, gap: 150, spawn: 1300 },
    Hard: { gravity: 0.65, jump: -10, speed: 3.3, gap: 120, spawn: 1000 },
  };


  function reset() {
    const c = canvasRef.current;
    birdRef.current = { x: 80, y: (c?.height || 400) / 2, vy: 0, r: 14 };
    pipesRef.current = [];
    spawnTimerRef.current = 0;
    scoredPipesRef.current = new Set();
    setScore(0);
    setRemaining(duration);
  }


  function startGame() {
    reset();
    setState("playing");
    lastTimeRef.current = performance.now();
    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
  }


  function endGame() {
    setState("finished");
    setHighScore((prev) => {
      const next = Math.max(prev, score);
      localStorage.setItem("flappy_high", String(next));
      return next;
    });
    cancelAnimationFrame(rafRef.current);
  }


  function flap() {
    birdRef.current.vy = settings[difficulty].jump;
  }


  function spawnPipe(w, h, gap) {
    const pipeW = 60;
    const minTop = 40;
    const maxTop = h - gap - 140;
    const top = Math.floor(minTop + Math.random() * (maxTop - minTop));
    const bottom = h - top - gap - 80;
    const id = Math.random().toString(36).slice(2);
    pipesRef.current.push({ id, x: w + 20, w: pipeW, top, bottom });
  }


  function collides(cx, cy, r, rx, ry, rw, rh) {
    const x = Math.max(rx, Math.min(cx, rx + rw));
    const y = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - x;
    const dy = cy - y;
    return dx * dx + dy * dy < r * r;
  }


  function loop(t) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = settings[difficulty];
    const dt = Math.min(40, t - lastTimeRef.current);
    lastTimeRef.current = t;


    const elapsed = (t - startTimeRef.current) / 1000;
    const remain = Math.max(0, Math.ceil(duration - elapsed));
    setRemaining(remain);
    if (elapsed >= duration) {
      endGame();
      return;
    }


    const bird = birdRef.current;
    bird.vy += s.gravity * (dt / 16.67);
    bird.y += bird.vy * (dt / 16.67);

 
    spawnTimerRef.current += dt;
    if (spawnTimerRef.current >= s.spawn) {
      spawnTimerRef.current = 0;
      spawnPipe(canvas.width, canvas.height, s.gap);
    }


    pipesRef.current.forEach((p) => (p.x -= s.speed));
    pipesRef.current = pipesRef.current.filter((p) => p.x + p.w > -10);


    pipesRef.current.forEach((p) => {
      if (!scoredPipesRef.current.has(p.id) && p.x + p.w < bird.x - bird.r) {
        scoredPipesRef.current.add(p.id);
        setScore((v) => v + 1);
      }
    });


    const groundY = canvas.height - 80;
    if (bird.y + bird.r > groundY) {
      endGame();
      return;
    }
    for (const p of pipesRef.current) {
      if (
        collides(bird.x, bird.y, bird.r, p.x, 0, p.w, p.top) ||
        collides(bird.x, bird.y, bird.r, p.x, canvas.height - p.bottom - 80, p.w, p.bottom)
      ) {
        endGame();
        return;
      }
    }


    draw(ctx, canvas.width, canvas.height, bird, pipesRef.current, score, remain);
    rafRef.current = requestAnimationFrame(loop);
  }

  function draw(ctx, w, h, bird, pipes, score, time) {

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#9be7f0");
    grad.addColorStop(1, "#70c5ce");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);


    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < 40; i++) {
      const x = (i * 100 + (Date.now() / 20) % 1000) % w;
      ctx.fillRect(x, (i * 30) % h, 2, 2);
    }


    ctx.fillStyle = "#2e8b57";
    pipes.forEach((p) => {
      ctx.fillRect(p.x, 0, p.w, p.top);
      ctx.fillRect(p.x, h - p.bottom - 80, p.w, p.bottom);
      ctx.fillStyle = "#245e43";
      ctx.fillRect(p.x - 3, p.top - 8, p.w + 6, 8);
      ctx.fillRect(p.x - 3, h - p.bottom - 80, p.w + 6, 8);
      ctx.fillStyle = "#2e8b57";
    });


    ctx.fillStyle = "#d9c17a";
    ctx.fillRect(0, h - 80, w, 80);


    ctx.beginPath();
    ctx.fillStyle = "#ffcc00";
    ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(bird.x + 6, bird.y - 4, 3, 0, Math.PI * 2);
    ctx.fill();
 
    ctx.fillStyle = "#fff";
    ctx.font = "20px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 15, 30);
    ctx.textAlign = "right";
    ctx.fillText("Time: " + time + "s", w - 15, 30);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);


  useEffect(() => {
    const onPress = (e) => {
      if (e.code === "Space") e.preventDefault();
      if (state === "menu") startGame();
      else if (state === "playing") flap();
      else if (state === "finished") setState("menu");
    };
    window.addEventListener("keydown", onPress);
    window.addEventListener("mousedown", onPress);
    window.addEventListener("touchstart", onPress);
    return () => {
      window.removeEventListener("keydown", onPress);
      window.removeEventListener("mousedown", onPress);
      window.removeEventListener("touchstart", onPress);
    };
  }, [state, difficulty, duration]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: 720,
        margin: "24px auto",
        textAlign: "center",
        fontFamily: "system-ui",
      }}
    >
      <h2 style={{ marginBottom: 10, color: "#333" }}>Flappy Bird – Timed Challenge</h2>

  
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ marginRight: 6 }}>Difficulty:</label>
          <select
            value={difficulty}
            disabled={state === "playing"}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: 6 }}>Duration:</label>
          <select
            value={duration}
            disabled={state === "playing"}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={20}>20s</option>
            <option value={30}>30s</option>
            <option value={45}>45s</option>
          </select>
        </div>
        <div>🏆 {highScore}</div>
      </div>

   
      <div
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 6px 30px rgba(0,0,0,0.2)",
          background: "linear-gradient(180deg,#9be7f0,#70c5ce)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: 500,
            display: "block",
            cursor: "pointer",
            borderRadius: 12,
          }}
          onClick={() => {
            if (state === "menu") startGame();
            else if (state === "playing") flap();
            else if (state === "finished") setState("menu");
          }}
        />

      
        {state !== "playing" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.92)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity 0.4s ease",
              padding: 20,
            }}
          >
            {state === "menu" && (
              <>
                <h3>Welcome to Flappy Bird</h3>
                <p>Press or click anywhere to flap and avoid the pipes.</p>
                <p>Survive until the timer ends!</p>
                <button
                  style={btn}
                  onClick={() => startGame()}
                >
                  Start Game
                </button>
              </>
            )}
            {state === "finished" && (
              <>
                <h3>Game Over</h3>
                <p>Score: <b>{score}</b></p>
                <p>High Score: <b>{highScore}</b></p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={btn} onClick={() => setState("menu")}>Menu</button>
                  <button style={btn} onClick={() => startGame()}>Play Again</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <p style={{ marginTop: 8, color: "#555" }}>
        Controls: Click or press Space to flap.
      </p>
    </div>
  );
}


const btn = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(90deg,#4aa8ff,#0077ff)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};
