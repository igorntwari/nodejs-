import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:9000";

// function isUserEvent(Message) {
//   const parsedMessage = JSON.parse(Message.data);
//   return parsedMessage.type === "userevent";
// }

// function isDocumentEvent(message) {
//   const parsedMessage = JSON.parse(message.data);
//   return parsedMessage.type === "contentchange";
// }

function HomePage() {
  const [joinBoard, setJoinBoard] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [username,] = useState(""); // Define username state here

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: "userevent",
      });
    }
  }, [username, sendJsonMessage, readyState]);

  const handleBoard = (name) => {
    console.log(name);
    setNames([...names, joinBoard?.trim()]);
    setJoinBoard("");
  };
  return (
    <div className="text-black flex gap-10">
      <div className="border-2 border-black flex flex-col gap-4 justify-center px-4 m-10 align-items-start w-60 h-60 rounded-md">
        <button
          onClick={() => handleBoard(joinBoard)}
          className="bg-blue-700 p-y-2 px-4 rounded-sm border-2 border-black"
        >
          join board
        </button>
        <input
          onChange={(e) => setJoinBoard(e.target.value)}
          value={joinBoard}
          className="border-2 border-black"
          type="text"
        />
        {names.length > 0 ? (
          <ul typeof="circle">
            {names.map((name, index) => (
              <li key={index}>{name} joined the board</li>
            ))}
          </ul>
        ) : (
          <p>no people on the board</p>
        )}
      </div>
      <div className="border-black border-2 w-1/2 h-96 flex flex-col gap-4 px-4 m-10 justify-center items-center">
        <h1>Enter your Message</h1>
        <textarea
          className="border-2 border-black w-96"
          name="code"
          id=""
          cols={20}
          rows={10}
        ></textarea>
        <button className="bg-blue-700 p-y-2 px-4 rounded-sm border-2 border-black w-36 justify-center items-center">
          Run Code
        </button>
      </div>
    </div>
  );
}

export default HomePage;
