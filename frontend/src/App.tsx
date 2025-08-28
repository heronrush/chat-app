import { useEffect, useRef } from "react";
import { RoomJoin } from "./components/RoomJoin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chat } from "./components/Chat";

function App() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    // to store the ws variable is wsRef
    wsRef.current = ws;
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoomJoin wsRef={wsRef} />} />
          <Route path="/chat" element={<Chat wsRef={wsRef} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
