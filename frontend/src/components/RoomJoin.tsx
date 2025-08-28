import { getRandomRoomId } from "../roomId";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { randomRoomIdAtom } from "../store/messagesAtom";

type RoomJoinCmpType = {
  wsRef: React.RefObject<WebSocket | null>;
};

export function RoomJoin({ wsRef }: RoomJoinCmpType) {
  const [randomRoomId, setRandomRoomId] = useAtom(randomRoomIdAtom);

  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-4xl font-semibold">
        A Temporary Real Time Chat Room
      </h1>
      <div className="w-[45%] rounded-md border border-gray-400 px-5 py-10">
        <button
          onClick={() => {
            setRandomRoomId(getRandomRoomId());
          }}
          className="mb-2 w-full cursor-pointer rounded-md bg-neutral-950 p-3 text-2xl font-semibold text-white transition duration-300 hover:bg-neutral-700"
        >
          Create New Room
        </button>
        <Input
          value={randomRoomId}
          placeholder=""
          className="w-full p-3 text-xl tracking-widest"
        />

        {/* join room */}
        <div className="mt-15 flex w-full items-center justify-center space-x-5">
          <Input
            placeholder="Enter your room id"
            className="grow-4 items-center p-3 align-middle text-xl tracking-widest"
          />

          <button
            onClick={() => {
              wsRef.current?.send(
                JSON.stringify({
                  type: "join",
                  payload: {
                    roomId: randomRoomId,
                  },
                }),
              );

              navigate("/chat");
            }}
            className="flex cursor-pointer items-center justify-center rounded-md bg-neutral-950 p-2 px-3 align-middle text-2xl font-semibold text-white transition duration-300 hover:bg-neutral-700"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

type InputType = {
  placeholder: string;
  className?: string;
  value?: string;
};

function Input({ placeholder, className, value }: InputType) {
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className={`rounded-md border border-gray-300 transition duration-300 focus:border-gray-500 focus:outline-none ${className} `}
    />
  );
}
