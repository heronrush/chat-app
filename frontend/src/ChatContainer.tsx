import { motion } from "motion/react";
import type { ChangeEvent, MouseEventHandler } from "react";

export function ChatContainer({ messages }: { messages: string[] }) {
  return (
    <div className="no-scrollbar flex h-full flex-col overflow-y-scroll scroll-smooth pt-5 pb-20">
      {messages.map((message, id) => (
        <ReceivedMessage key={id} message={message} />
      ))}
    </div>
  );
}

// component to capture the message in a useState varaible and send it
export function SendMessage({
  onClick,
  onChange,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-5 flex bg-white text-black">
      <input
        type="text"
        className="flex-1 border border-gray-400 p-4 outline-none"
        placeholder="Type your message here..."
        onChange={onChange}
      />
      <button
        onClick={onClick}
        className="cursor-pointer bg-neutral-900 p-2 text-white hover:bg-neutral-800"
      >
        Send message
      </button>
    </div>
  );
}

// message displayed as a banner
function ReceivedMessage({ message }: { message: string }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="mx-5 my-3 rounded-2xl bg-black p-4 text-white"
    >
      {message}
    </motion.span>
  );
}
