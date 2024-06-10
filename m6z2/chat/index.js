const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const httpInstance = http.createServer(app);

const io = socketIo(httpInstance);

app.use(express.static("public"));

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const users = {};
io.on("connection", (client) => {
    const broadcast = (eventName, eventData) => {
        client.broadcast.emit(eventName, eventData); // to all clients except the sender
        client.emit(eventName, eventData); // to the sender
    };

    // połączenie nowego użytkownika i rozesłanie o tym wiadomości
    client.on('newUser', (name) => {
        console.log(name)
        users[client.id] = {
            name,
            color: getRandomColor()
        };
        broadcast('user', users);
    })

    client.on("message", (message) => {
        if (users[client.id].name !== message.name) {
            users[client.id].name = message.name;
            broadcast("user", users);
        }

        broadcast("message", {
            ...message,
            color: users[client.id].color,
        });
    });

    client.on("disconnect", () => {
        delete users[client.id];
        client.broadcast.emit("user", users);
    });
});

httpInstance.listen(3000, () => {
    console.log("listening");
});