import React, { useEffect, useRef, useState } from "react";

export default function Gaming() {
  const initialBallState = { x: 300, y: 200, speedX: 5, speedY: 5 };
  const initialPaddleState = { left: 150, right: 150 };
  const [ball, setBall] = useState(initialBallState);
  const [paddles, setPaddles] = useState(initialPaddleState);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const ballRef = useRef(null);

  useEffect(() => {
    if (gameRunning) {
      const updateGame = () => {
        setBall((prevBall) => ({
          ...prevBall,
          x: prevBall.x + prevBall.speedX,
          y: prevBall.y + prevBall.speedY,
        }));

        const ballRect = ballRef.current.getBoundingClientRect();
        const paddleLeftRect = document.getElementById("paddle-left").getBoundingClientRect();
        const paddleRightRect = document.getElementById("paddle-right").getBoundingClientRect();

        // Check for collisions with paddles
        if (
          (ballRect.left <= paddleLeftRect.right &&
            ballRect.right >= paddleLeftRect.left &&
            ballRect.top <= paddleLeftRect.bottom &&
            ballRect.bottom >= paddleLeftRect.top) ||
          (ballRect.left <= paddleRightRect.right &&
            ballRect.right >= paddleRightRect.left &&
            ballRect.top <= paddleRightRect.bottom &&
            ballRect.bottom >= paddleRightRect.top)
        ) {
          setBall((prevBall) => ({ ...prevBall, speedX: -prevBall.speedX }));
        }

        // Check for collisions with top and bottom walls
        if (ball.y <= 0 || ball.y >= 380) {
          setBall((prevBall) => ({ ...prevBall, speedY: -prevBall.speedY }));
        }

        // Check for game over
        if (ball.x < 0 || ball.x > 600) {
          setGameOver(true);
          pauseGame();
        }
      };

      const intervalId = setInterval(updateGame, 50);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameRunning, ball]);

  const startGame = () => {
    setGameRunning(true);
  };

  const restartGame = () => {
    setBall(initialBallState);
    setPaddles(initialPaddleState);
    setGameOver(false);
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  return (
    <div className="bg-black h-screen text-white ping-pong" tabIndex={0}>
      <h1 className="text-3xl font-extrabold text-center py-4">PingPog By Igor Ntwali</h1>
      <div className="border-2 border-white h-5/6 flex">
        {/* player one div */}
        <div className={`paddle paddle-container w-1/2 h-full relative border-r-2 border-dashed ${gameRunning ? "" : "paused"}`}>
          <div id="paddle-left" className="absolute bg-white w-4 h-20 bottom-20 left-0" />
        </div>
        {/* player two div */}
        <div className="w-1/2 h-full relative">
          <div id="paddle-right" className="absolute bg-white w-4 h-20 bottom-20 right-0" />
        </div>
      </div>
      {/* Render Ball */}
      <div ref={ballRef} className="absolute w-4 h-4 bg-white" style={{ left: ball.x, top: ball.y }} />
      {/* Render Scores */}
      <div className="flex justify-between text-xl font-bold mt-4 px-8">
        <div>Player 1: 0</div>
        <div>Player 2: 0</div>
      </div>
      {/* Render Game Over */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-4xl font-bold text-white">Game Over!</div>
          <button onClick={restartGame} className="bg-white text-black font-bold px-4 py-2 mt-4 rounded">Restart</button>
        </div>
      )}
      {/* Render Start Button */}
      {!gameRunning && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <button onClick={startGame} className="bg-white text-black font-bold px-8 py-4 rounded">Start Game</button>
        </div>
      )}
    </div>
  );
}
