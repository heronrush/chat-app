import type { ChangeEvent, MouseEventHandler } from "react";

export function ChatContainer({ messages }: { messages: string[] }) {
  return (
    <div className="e flex h-[650px] w-2/5 flex-col justify-between rounded-md border border-gray-300 bg-gray-300 p-10 text-black">
      <div className="flex h-full flex-col overflow-y-auto py-5">
        {messages.map((message, id) => (
          <ReceiverMessage key={id} message={message} />
        ))}
      </div>
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
        className="flex-1 p-4 outline-none"
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
function ReceiverMessage({ message }: { message: string }) {
  return (
    <span className="mx-5 my-3 rounded-2xl bg-black p-4 text-white">
      {message}
    </span>
  );
}
