const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server);

  // Lắng nghe sự kiện kết nối
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Lắng nghe và xử lý các sự kiện từ client
    registerVideoCallEvents(socket);

    // Lắng nghe sự kiện disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

const registerVideoCallEvents = (socket) => {
  // Sự kiện bắt đầu cuộc gọi video
  socket.on("start-video-call", (data) => {
    console.log("Video call started:", data);
    io.emit("video-call-started", data); // Gửi thông báo đến tất cả client
  });

  // Sự kiện tham gia cuộc gọi video
  socket.on("join-video-call", (data) => {
    console.log("User joined video call:", data);
    io.emit("user-joined", data); // Gửi thông báo đến tất cả client
  });

  // Sự kiện kết thúc cuộc gọi video
  socket.on("end-video-call", (data) => {
    console.log("Video call ended:", data);
    io.emit("video-call-ended", data); // Gửi thông báo đến tất cả client
  });
};

/**
 * Trả về instance của Socket.IO
 */
const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.IO chưa được khởi tạo!");
  }
  return io;
};

module.exports = { initSocket, getIoInstance };
