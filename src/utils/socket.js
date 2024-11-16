const { Server } = require("socket.io");
let io;
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://datn-u1l6.onrender.com",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Lắng nghe sự kiện gọi video
    socket.on("start-video-call", (data) => {
      io.emit("video-call-started", data); // Phát sóng cuộc gọi mới
    });

    // Lắng nghe sự kiện người tham gia cuộc gọi
    socket.on("join-video-call", (data) => {
      io.emit("user-joined", data); // Phát sóng người tham gia
    });

    // Kết thúc cuộc gọi
    socket.on("end-video-call", (data) => {
      io.emit("video-call-ended", data); // Phát sóng cuộc gọi kết thúc
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
// Hàm truy cập đối tượng io
const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io chưa được khởi tạo!");
  }
  return io;
};

module.exports = { initSocket, getIoInstance };
