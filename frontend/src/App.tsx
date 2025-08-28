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
        }),
      );
    };
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      {/* renders the messages */}
      <div className="h-[95vh]">
        {messages.map((message) => (
          <div className="mx-5 my-3 rounded bg-white p-4 text-black">
            {message}
          </div>
        ))}
      </div>

      <div className="flex w-full bg-white text-black">
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
              }),
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
