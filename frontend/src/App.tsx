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

  // new component
  return (
    <div>
      <ChatContainer messages={messages} />
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
  );
}

export default App;
