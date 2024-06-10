const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const httpInstance = http.createServer(app);

const socketHandle = socketIo(httpInstance);

app.use(express.static("public"));

// connection to ws server
socketHandle.on("connection", (client) => {
    const room = Math.random() > 0.5 ? "A" : "B";
    client.join(room);
    socketHandle.to(room).emit(room, { content: `your room name is ${room}` });

    console.log("new client:", client.id);
    console.log(client.handshake.query.token);

    client.on('disconnect', () => {
        console.log('client disconnected:', client.id);
    });
});

httpInstance.listen(3000, () => {
    console.log("listening on 3000");
});