import { useEffect, useRef, useState } from "react";
import { ChatContainer, SendMessage } from "./ChatContainer";
import { useAtom } from "jotai";
import { messagesAtom } from "./store/messagesAtom";

function App() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [inputMessage, setInputMessage] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

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
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAF9F6]">
      {/* contains the chat display component and the message sending component */}
      <div className="flex h-full w-[70%] flex-col gap-10 pt-10 pb-20">
        <div className="h-[80%] rounded-md border border-gray-400 shadow-md">
          <ChatContainer messages={messages} />
        </div>
        <SendMessage
          // to send the chat payload
          onClick={() => {
            wsRef.current?.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputMessage,
                },
              }),
            );
          }}
          // to capture the chat payload
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
