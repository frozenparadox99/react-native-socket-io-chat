const io = require("socket.io")();
const messageHandler = require("./handlers/message.handler");

const userIds = {};
let currentUserId = 2;

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  userIds[socket.id] = currentUserId++;
  messageHandler.handleMessage(socket, userIds);
});

io.listen(3001);
