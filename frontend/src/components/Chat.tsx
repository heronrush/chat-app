import { useAtom } from "jotai";
import { ChatContainer, SendMessage } from "../ChatContainer";
import { messagesAtom } from "../store/messagesAtom";
import { useState } from "react";

type ChatCompType = {
  wsRef: React.RefObject<WebSocket | null>;
  messages?: string[];
};

export function Chat({ wsRef }: ChatCompType) {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [inputMessage, setInputMessage] = useState("");

  wsRef.current!.onmessage = (event) => {
    setMessages((m) => [...m, event.data]);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAF9F6]">
      <h1 className="mt-3 text-4xl">Chat box</h1>
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
