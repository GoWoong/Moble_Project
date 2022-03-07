const SocketIo = require("socket.io");

module.exports = (server) => {
  const io = SocketIo(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속!", ip, socket.id);

    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });

    socket.on("error", (error) => {
      console.log(error);
    });

    socket.on("reply", (data) => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
