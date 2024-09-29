const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);
console.log('hola');

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function (socket) {

    socket.on("joinRoom", function (username, roomId) {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("update", username + "joined the conversation: " + roomId);
    });

    socket.on("chat", function (message, roomId) {
        socket.broadcast.to(roomId).emit("chat", message);
        console.log(roomId);
    });
})

server.listen(4000);