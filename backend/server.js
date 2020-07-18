const io = require("socket.io")();
const { v1: uuidv1 } = require("uuid");
const messageHandler = require("./handlers/message.handler");

const users = {};
let currentUserId = 2;

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);

  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter((u) => u.username !== undefined);

  return onlyWithUsernames;
}

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  users[socket.id] = { userId: uuidv1() };
  socket.on("join", (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    delete users[socket.id];
    io.emit("action", {
      type: "users_online",
      data: createUsersOnline(),
    });
  });

  socket.on("action", (action) => {
    switch (action.type) {
      case "server/hello":
        console.log("Got hello event", action.data);
        socket.emit("action", { type: "message", data: "Good Day!" });
        break;
      case "server/join":
        console.log("Got Join event", action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();

        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        });
        break;
    }
  });
});

io.listen(3001);
