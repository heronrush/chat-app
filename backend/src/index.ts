import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    // when the type is join
    if (parsedMessage.type === "join") {
      console.log("user joined room " + parsedMessage.payload.roomId);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    // when the type is chat
    if (parsedMessage.type === "chat") {
      console.log("user want to chat");

      // checks if the user who sent "chat" type is already in the Users array or not
      const currentUserRoom = allSockets.find((x) => x.socket == socket);

      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room == currentUserRoom?.room) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
