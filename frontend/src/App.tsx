import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState(["hi there"]);
  const [inputMessage, setInputMessage] = useState("");
  const wsRef = useRef("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };

    // to store the ws variable is wsRef
    wsRef.current = ws;

    // after there is a connection with the ws server, join the room
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
  }, []);

  return (
    <div className="bg-black h-screen text-white">
      {/* renders the messages */}
      <div className="h-[95vh]">
        {messages.map((message) => (
          <div className="bg-white text-black rounded p-4 mx-5 my-3">
            {message}
          </div>
        ))}
      </div>

      <div className="w-full bg-white text-black flex">
        <input
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          type="text"
          className="flex-1 p-4"
        />
        <button
          onClick={() => {
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputMessage,
                },
              })
            );
          }}
          className="bg-purple-600 text-white"
        >
          Send message
        </button>
      </div>
    </div>
  );
}

export default App;
