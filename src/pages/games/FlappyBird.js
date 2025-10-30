import React, { useRef, useState, useEffect } from "react";


const styles = {
  container: {
    fontFamily: "'Trebuchet MS', sans-serif",
    background: "linear-gradient(135deg, #00b4d8 0%, #90e0ef 100%)",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  screen: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    padding: "32px 38px",
    minWidth: "340px",
    textAlign: "center",
    animation: "fadeInScreen 0.7s"
  },
  btn: {
    margin: "12px",
    padding: "10px 28px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(90deg,#00b4d8,#48cae4)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background .2s"
  },
  canvasBox: {
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(68,202,228,0.12)",
  },
};

const DIFF_SETTINGS = {
  Easy:   { pipeGap: 170, pipeSpeed: 2, duration: 45 },
  Medium: { pipeGap: 140, pipeSpeed: 2.6, duration: 40 },
  Hard:   { pipeGap: 110, pipeSpeed: 3.6, duration: 35 },
};

const CANVAS_WIDTH = 420;
const CANVAS_HEIGHT = 500;

function randomPipeY(gap) {

  return 80 + Math.random() * (CANVAS_HEIGHT - gap - 120);
}

const welcomeText = (
  <div>
    <h2>Welcome to Flappy Bird!</h2>
    <div style={{ fontSize: 18, marginBottom: 12 }}>
      <b>How To Play:</b><br />
      Tap/press <b>Space</b> or click to make the bird .<br />
      Avoid hitting pipes — survive as long as you can.<br />
      Game lasts for a set duration depending on difficulty.<br />
      <span style={{ color: "#00b4d8", fontWeight: 700 }}>Score points for passing pipes!</span>
    </div>
  </div>
);


function FlappyBirdGame({ difficulty, onGameEnd }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(DIFF_SETTINGS[difficulty].duration);


  const bird = useRef({
    x: 70,
    y: CANVAS_HEIGHT/2,
    vy: 0,
    radius: 18
  });

  const pipes = useRef([
    { x: CANVAS_WIDTH + 40, y: randomPipeY(DIFF_SETTINGS[difficulty].pipeGap) }
  ]);


  useEffect(() => {

    let timer = setInterval(() => {
      setSecondsLeft(sec => {
        if (sec > 0 && isRunning) return sec - 1;
        return sec;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [difficulty, isRunning]);
  
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setTimeout(() => onGameEnd(score), 530);
    }
  }, [secondsLeft, isRunning, onGameEnd, score]);

 
  useEffect(() => {
    const jump = () => {
      if (isRunning) bird.current.vy = -4.8;
    };
    window.addEventListener('keydown', e => {
      if (e.code === 'Space') jump();
    });
    window.addEventListener('mousedown', jump);
    return () => {
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('mousedown', () => {});
    };
  }, [isRunning]);


  useEffect(() => {
    let requestId;
    const ctx = canvasRef.current.getContext("2d");
    let lastPassed = 0; 

    function draw() {
     
      ctx.fillStyle = "#caf0f8";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

     
      for (let c=0; c<3; ++c) {
        ctx.globalAlpha = 0.39 + 0.25*Math.cos(Date.now()/700 + c*2);
        ctx.beginPath();
        ctx.arc((c*140+50 + Date.now()/c)/1.8 % CANVAS_WIDTH, 60+36*c, 36+c*10, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.globalAlpha = 1;
      }

    
      ctx.save();
      ctx.shadowColor = "#90e0ef80";
      ctx.shadowBlur = 12;
      pipes.current.forEach((pipe,i) => {
        ctx.fillStyle = "#00b4d8";

        ctx.fillRect(pipe.x, 0, 52, pipe.y);
        ctx.strokeStyle = "#90e0ef";
        ctx.strokeRect(pipe.x, 0, 52, pipe.y);
     
        ctx.fillRect(pipe.x, pipe.y + DIFF_SETTINGS[difficulty].pipeGap, 52, CANVAS_HEIGHT - pipe.y - DIFF_SETTINGS[difficulty].pipeGap);
        ctx.strokeRect(pipe.x, pipe.y + DIFF_SETTINGS[difficulty].pipeGap, 52, CANVAS_HEIGHT - pipe.y - DIFF_SETTINGS[difficulty].pipeGap);
      });
      ctx.restore();

      
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(bird.current.x, bird.current.y + 18, bird.current.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#888";
      ctx.fill();
      ctx.restore();

     
      ctx.save();
      ctx.beginPath();
      ctx.arc(bird.current.x, bird.current.y, bird.current.radius, 0, Math.PI*2);
      ctx.fillStyle = "#ffbe0b";
      ctx.strokeStyle = "#ffd60a";
      ctx.lineWidth = 3 + 2*Math.abs(Math.sin(Date.now()/400));
      ctx.fill();
      ctx.stroke();
 
      ctx.beginPath();
      ctx.arc(bird.current.x+8, bird.current.y-6, 4, 0, Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bird.current.x+10, bird.current.y-6, 1.5, 0, Math.PI*2);
      ctx.fillStyle = "#111";
      ctx.fill();
     
      ctx.beginPath();
      ctx.ellipse(bird.current.x-8, bird.current.y, 13, 7 + 8*Math.abs(Math.cos(Date.now()/260)), 0, 0, Math.PI*2);
      ctx.fillStyle = "#fdfcdc";
      ctx.fill();
      ctx.restore();


      ctx.save();
      ctx.font = "21px Trebuchet MS";
      ctx.fillStyle = "#0077b6";
      ctx.fillText(`Score: ${score}`, 24, 42);
      ctx.fillStyle = "#03045e";
      ctx.fillText(`Time: ${secondsLeft}s`, CANVAS_WIDTH-120, 42);
      ctx.restore();
    }

    function gameLoop() {
      if (!isRunning) return;
 
      pipes.current.forEach(pipe => pipe.x -= DIFF_SETTINGS[difficulty].pipeSpeed);


      if (pipes.current.length && pipes.current[0].x < -52) pipes.current.shift();
      let lastPipe = pipes.current[pipes.current.length - 1];
      if (lastPipe.x < CANVAS_WIDTH - 180) {
        pipes.current.push({
          x: CANVAS_WIDTH + 44,
          y: randomPipeY(DIFF_SETTINGS[difficulty].pipeGap)
        });
      }

 
      bird.current.vy += 0.34;
      bird.current.y += bird.current.vy;

   
      if (bird.current.y > CANVAS_HEIGHT- bird.current.radius) {
        bird.current.y = CANVAS_HEIGHT- bird.current.radius;
        bird.current.vy = 0;
        setIsRunning(false);
        setTimeout(()=>onGameEnd(score),450);
      }
      if (bird.current.y < bird.current.radius) {
        bird.current.y = bird.current.radius + 3;
        bird.current.vy = 0.5;git 
      }


      for (let i=0; i<pipes.current.length; ++i) {
        let pipe = pipes.current[i];
        let cx = bird.current.x, cy = bird.current.y, r = bird.current.radius;
        let pipeX = pipe.x, pipeW = 52;
        let gapY = pipe.y, gapH = DIFF_SETTINGS[difficulty].pipeGap;
     
        if (cx + r > pipeX && cx - r < pipeX + pipeW) {
          if (cy - r < gapY || cy + r > gapY + gapH) {
            setIsRunning(false);
            setTimeout(()=>onGameEnd(score),480);
            break;
          }
        }
      }

   
      pipes.current.forEach((pipe,idx) => {
        if (!pipe.passed && bird.current.x > pipe.x + 52) {
          pipe.passed = true;
          setScore(s => s + 1);
        }
      });

      draw();
      requestId = requestAnimationFrame(gameLoop);
    }

    draw();
    requestId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(requestId);
  }, [difficulty, isRunning, onGameEnd, score, secondsLeft]);

  return (
    <div style={styles.canvasBox}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ display:"block", background:"#caf0f8", borderRadius:14, margin:"auto" }}
      />
    </div>
  );
}


export default function FlappyBirdMiniGame() {
  const [screen, setScreen] = useState("welcome");
  const [difficulty, setDifficulty] = useState(null);
  const [lastScore, setLastScore] = useState(0);

  return (
    <div style={styles.container}>
      {screen === "welcome" &&
        <div style={styles.screen}>
          {welcomeText}
          <div style={{ marginTop:16 }}>
            <b>Select Difficulty:</b>
            <div>
              {Object.keys(DIFF_SETTINGS).map(diff => (
                <button
                  key={diff}
                  style={styles.btn}
                  onClick={() => {
                    setDifficulty(diff);
                    setScreen("game");
                  }}
                >{diff}</button>
              ))}
            </div>
          </div>
        </div>
      }
      {screen === "game" &&
        <FlappyBirdGame
          difficulty={difficulty}
          onGameEnd={score => {
            setLastScore(score);
            setScreen("result");
          }}
        />
      }
      {screen === "result" &&
        <div style={styles.screen}>
          <h2>Game Over!</h2>
          <div style={{ fontSize:22, fontWeight:600, color:'#0096c7', margin:"14px 0" }}>
            Final Score: {lastScore}
          </div>
          <div>Ready for another round?</div>
          <button
            style={styles.btn}
            onClick={() => setScreen("welcome")}
          >Play Again</button>
        </div>
      }
      <style>
        {`
        @keyframes fadeInScreen {
          from { opacity: 0; transform: scale(.98);}
          to { opacity: 1; transform: scale(1);}
        }
        `}
      </style>
    </div>
  );
}
